import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './mailer.config';

@Module({
  imports: [MailerModule.forRoot(mailerConfig)],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailerModule, MailService],
})
export class MailModule {}
