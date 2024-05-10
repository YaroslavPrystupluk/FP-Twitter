import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mailer/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existUser) throw new BadRequestException('This email already exists');

    if (createUserDto.password !== createUserDto.confirmPassword)
      throw new BadRequestException('Passwords do not match');

    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: bcrypt.hashSync(
        createUserDto.password,
        Number(this.configService.get('SALT_ROUNDS')),
      ),
    });

    await this.mailService.sendEmail(
      createUserDto.email,
      'Welcome',
      'Welcome to our site',
    );

    return { user };
  }
  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('Usrer not found');
    }
    user.email = updateUserDto.email;
    user.password = bcrypt.hashSync(
      updateUserDto.password,
      Number(this.configService.get('SALT_ROUNDS')),
    );
    await this.userRepository.save(user);
    return { user };
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException('Usrer not found');

    await this.userRepository.remove(user);

    return { message: 'User successfully deleted' };
  }
}
