import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { IUser } from 'src/types/types';
import { Public } from 'src/decorators/public.decorator';

@Public()
@Controller('forgot-password')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.forgotPasswordService.forgotPassword(forgotPasswordDto);
  }

  @UsePipes(new ValidationPipe())
  @Patch('/change-password:email')
  async changePassword(
    @Param('email') email: string,
    @Body() changePasswordDto: ChangePasswordDto,
    @GetUser() user: IUser,
  ) {
    return this.forgotPasswordService.changePassword(
      changePasswordDto,
      user,
      email,
    );
  }
}
