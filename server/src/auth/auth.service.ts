import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';
import { v4 as uuidv4 } from 'uuid';
import { RegisterUserDto } from './dto/register-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { add } from 'date-fns';
import { LoginUserDto } from './dto/login-user.dto';
import { IToken } from 'src/types/token';
import { Provider } from 'src/enum/provider.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<IUser> {
    const user = await this.usersService.findOne(email);

    if (!user || !bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Wrong password or email');

    const passwordIsMatch = bcrypt.compareSync(password, user.password);

    if (user && passwordIsMatch) {
      return user;
    }
  }

  async register(registerUserDto: RegisterUserDto) {
    return this.usersService.create(registerUserDto);
  }
  async activate(activateLink: string): Promise<{ message: string }> {
    if (!activateLink)
      throw new HttpException('Activate link not found', HttpStatus.NOT_FOUND);
    const user = await this.userRepository.findOne({
      where: {
        activateLink,
      },
    });
    if (!user) throw new NotFoundException('Activate User not found');

    user.isActivated = true;
    await this.userRepository.save(user);
    return { message: 'User successfully activated' };
  }

  async login(loginUserDto: LoginUserDto, agent: string): Promise<IToken> {
    const user = await this.usersService.findOne(loginUserDto.email);

    const isActivated = user.isActivated;

    if (!isActivated) throw new UnauthorizedException('Activate your account');

    return this.generateTokens(user, agent);
  }

  async remember(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findOne(loginUserDto.email);
    if (!user) throw new NotFoundException('User not found');
    user.isRememberMe = true;
    await this.usersService.update(user.id, user);

    return user.isRememberMe;
  }

  private async generateTokens(user: IUser, agent: string): Promise<IToken> {
    const isRememberMe = user.isRememberMe;

    const accessToken =
      'Bearer ' +
      this.jwtService.sign(
        {
          id: user.id,
          email: user.email,
        },
        {
          expiresIn: isRememberMe ? '30d' : '7d',
        },
      );

    const refreshToken = await this.getRefreshToken(user, agent);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshToken: string, agent: string) {
    const tokens = await this.tokenRepository.findOne({
      relations: ['user'],
      where: {
        refreshToken,
      },
    });

    if (!tokens) throw new UnauthorizedException();

    await this.tokenRepository.remove(tokens);

    if (new Date(tokens.exp) < new Date()) throw new UnauthorizedException();

    if (!tokens.user)
      throw new UnauthorizedException('No user associated with the token');

    const user = await this.usersService.findOne(tokens.user.email);

    return this.generateTokens(user, agent);
  }

  private async getRefreshToken(user: IUser, agent: string): Promise<Token> {
    const { id } = user;

    const userId = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userId) throw new NotFoundException('User not found');

    await this.tokenRepository.delete({ user: userId, agent });

    const token = await this.tokenRepository.findOne({
      where: {
        user: userId,
        agent,
      },
    });

    if (!token) {
      return await this.tokenRepository.save({
        user: userId,
        refreshToken: uuidv4(),
        exp: add(new Date(), { months: 1 }),
        agent: agent,
      });
    }

    return await this.tokenRepository.save({
      ...token,
      refreshToken: uuidv4(),
      exp: add(new Date(), { months: 1 }),
    });
  }

  async logout(refreshToken: string) {
    return await this.tokenRepository.delete({ refreshToken });
  }

  async getUser(userId: string) {
    return await this.usersService.findOne(userId);
  }

  async providerAuth(
    email: string,
    name: string,
    picture: string,
    agent: string,
    provider: Provider,
  ) {
    const userExists = await this.usersService.findOne(email);
    if (userExists) {
      return await this.generateTokens(userExists, agent);
    }
    const user = await this.usersService.create({
      email,
      provider,
      displayname: name,
      avatar: picture,
      isRememberMe: true,
    });

    if (!user)
      throw new HttpException('User not created', HttpStatus.BAD_REQUEST);

    return await this.generateTokens(user, agent);
  }

  async removeUnconfirmedUsers() {
    const TIME = 15 * 60 * 1000;
    const unconfirmedUsers = await this.userRepository.find({
      where: {
        isActivated: false,
      },
    });

    const currentTime = new Date();
    unconfirmedUsers.forEach(async (user) => {
      if (currentTime.getTime() - user.createdAt.getTime() > TIME) {
        await this.userRepository.remove(user);
      }
    });
  }
}
