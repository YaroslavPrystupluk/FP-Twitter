import {
  BadRequestException,
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
    this.mailerService.sendEmail({
      recipients: createUserDto.email,
      subject: 'Activate your account',
      html: `<a href="http://localhost:3001/api/auth/activate/${activateLink}">${activateLink}</a>`,
    });

    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: bcrypt.hashSync(
        createUserDto.password,
        Number(this.configService.get('SALT_ROUNDS')),
      ),
      activateLink,
      isActivated: false,
    });

    return { user };
  }
  async findOne(idOrEmail: string) {
    return await this.userRepository.findOne({
      where: {
        [idOrEmail.includes('@') ? 'email' : 'id']: idOrEmail,
      },
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
    user.email = updateUserDto.email;
    user.password = bcrypt.hashSync(
      updateUserDto.password,
      Number(this.configService.get('SALT_ROUNDS')),
    );
    await this.userRepository.save(user);
    return { user };
  }

  async remove(id: string) {
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
