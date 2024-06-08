import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existUser) throw new BadRequestException('This email already exists');

    const activateLink = uuidv4();

    if (createUserDto.password) {
      this.mailerService.sendEmail({
        recipients: createUserDto.email,
        subject: 'Activate your account',
        html: `<a href="http://localhost:3001/api/auth/activate/${activateLink}">Activate your account : ${activateLink}</a>`,
      });
    }

    const hashPassword = createUserDto.password
      ? bcrypt.hashSync(
          createUserDto.password,
          Number(this.configService.get('SALT_ROUNDS')),
        )
      : null;

    return await this.userRepository.save({
      email: createUserDto.email,
      password: hashPassword,
      displayname: createUserDto.displayname,
      activateLink,
      isActivated: createUserDto.password ? false : true,
      provider: createUserDto.provider,
      isRememberMe: createUserDto.isRememberMe,
      avatar: createUserDto.avatar,
      banner: createUserDto.banner,
    });
  }

  async findOne(idOrEmail: string): Promise<User | undefined> {
    const searchCondition =
      typeof idOrEmail === 'string' && idOrEmail.includes('@')
        ? { email: idOrEmail }
        : { id: idOrEmail };

    return await this.userRepository.findOne({
      where: searchCondition,
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('Usrer not found');
    }

    if (updateUserDto.displayname) {
      user.displayname = updateUserDto.displayname;
    }

    if (updateUserDto.password) {
      if (updateUserDto.password.length < 8) {
        throw new BadRequestException(
          'Password must be at least 8 characters long',
        );
      }

      if (updateUserDto.password != updateUserDto.confirmPassword) {
        throw new BadRequestException('Passwords do not match');
      }
      user.password = bcrypt.hashSync(
        updateUserDto.password,
        Number(this.configService.get('SALT_ROUNDS')),
      );
    }
    return await this.userRepository.save(user);
  }

  async remove(id: string) {
    if (!id) throw new NotFoundException('User not found');

    const userToRemove = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!userToRemove) throw new NotFoundException('User not found');

    await this.userRepository.remove(userToRemove);

    return { id };
  }

  async uploadFile(
    userId: string,
    file: Express.Multer.File,
    type: 'avatar' | 'banner',
  ) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) throw new NotFoundException('User not found');

    if (type === 'avatar') {
      user.avatar = file.filename;
    } else if (type === 'banner') {
      user.banner = file.filename;
    } else {
      throw new HttpException('Invalid type', HttpStatus.BAD_REQUEST);
    }

    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }
}
