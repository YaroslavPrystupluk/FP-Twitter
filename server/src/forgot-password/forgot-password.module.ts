import { Module } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordController } from './forgot-password.controller';
import { MailerModule } from 'src/mailer/mailer.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MailerModule, UserModule],
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService],
})
export class ForgotPasswordModule {}
