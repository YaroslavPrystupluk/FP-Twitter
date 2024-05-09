import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
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
    return { user };
  }
  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user #${updateUserDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
