import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MailerService } from 'src/mailer/mailer.service';
import { UserService } from 'src/user/user.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userService.findOne(forgotPasswordDto.email);

    if (!user) throw new NotFoundException('User not found');

    if (!user.isActivated)
      throw new HttpException('User not activated', HttpStatus.BAD_REQUEST);

    const forgotLink = `http://localhost:3001/api/forgot-password/change-password/${forgotPasswordDto.email}`;

    this.mailerService.sendEmail({
      recipients: user.email,
      subject: 'Forgot password',
      html: `<a href="${forgotLink}">To reset your password for this account: ${forgotPasswordDto.email} click here</a>`,
    });

    return { message: 'Please check your email' };
  }

  async changePassword(changePasswordDto: ChangePasswordDto, email: string) {
    const user = await this.userService.findOne(email);
    if (!user) throw new NotFoundException('User not found');

    const newPassword = changePasswordDto.password;

    await this.userService.update(user.id, { password: newPassword });

    return { message: 'Password changed' };
  }
}
