import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  NotFoundException,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './responses/user.response';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return new UserResponse(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return new UserResponse(users);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('search/:idOrEmail')
  async findOne(@Param('idOrEmail') idOrEmail: string) {
    const user = await this.userService.findOne(idOrEmail);
    if (!user) throw new NotFoundException('User not found');
    return new UserResponse(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);
    return new UserResponse(user);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }

  @Post('upload/:userId')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('type') type: 'avatar' | 'banner',
    @Req() req,
  ) {
    const userId = req.user.id;
    return await this.userService.uploadFile(userId, file, type);
  }
}
