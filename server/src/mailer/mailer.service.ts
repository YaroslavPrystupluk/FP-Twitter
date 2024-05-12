import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { MailerDto } from './dto/mailer.dto';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
  constructor(private configService: ConfigService) {}
  mailTransporter() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: Number(this.configService.get('MAIL_PORT')),
      secure: false,
      auth: {
        user: this.configService.get('MAIL_USERNAME'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
    });
    return transporter;
  }

  async sendEmail(mailerDto: MailerDto) {
    const { from, recipients, subject, html } = mailerDto;

    const options: Mail.Options = {
      from,
      to: recipients,
      subject,
      html,
    };
    const transporter = this.mailTransporter();
    try {
      const result = await transporter.sendMail(options);
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }
}
