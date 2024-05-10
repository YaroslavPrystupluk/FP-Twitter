import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(recriverEmail: string, subject: string, content: string) {
    await this.mailerService.sendMail({
      to: recriverEmail,
      subject: subject,
      html: content,
    });
    return true;
  }
}
