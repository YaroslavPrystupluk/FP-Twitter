import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';
import { v4 as uuidv4 } from 'uuid';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
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

  async activate(activateLink: string) {
    await this.usersService.activate(activateLink);
  }

  async login(user: IUser) {
    const { id, email, isActivated } = user;

    if (!isActivated) throw new UnauthorizedException('Activate your account');

    const accessToken =
      'Bearer ' +
      this.jwtService.sign({
        id: user.id,
        email: user.email,
      });

    const refreshToken = await this.getRefreshToken(user);

    return {
      id,
      email,
      accessToken,
      refreshToken,
    };
  }

  private async getRefreshToken(user: IUser) {
    const { id } = user;

    return {
      id,
      refresh_token: this.jwtService.sign(
        { id: user.id, uuidv4: uuidv4() },
        { expiresIn: '30d' },
      ),
    };
  }
}
