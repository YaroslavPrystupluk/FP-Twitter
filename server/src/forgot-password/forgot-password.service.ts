import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MailerService } from 'src/mailer/mailer.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from 'src/user/user.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { IUser } from 'src/types/types';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
  ) {}

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userService.findOne(forgotPasswordDto.email);

    if (!user) throw new NotFoundException('User not found');

    if (!user.isActivated)
      throw new HttpException('User not activated', HttpStatus.BAD_REQUEST);

    const token = uuidv4();

    const forgotLink = `http://localhost:3001/api/auth/forgot-password?token=${token}`;

    this.mailerService.sendEmail({
      recipients: user.email,
      subject: 'Forgot password',
      html: `<a href="${forgotLink}">To reset your password for this account: ${forgotPasswordDto.email}</a>`,
    });

    return { message: 'Email sent' };
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
    user: IUser,
    email: string,
  ) {
    const userByEmail = await this.userService.findOne(email);

    const newPassword = bcrypt.hashSync(changePasswordDto.password, 7);

    userByEmail.password = newPassword;
    return this.userService.update(userByEmail.id, userByEmail);
  }
}
