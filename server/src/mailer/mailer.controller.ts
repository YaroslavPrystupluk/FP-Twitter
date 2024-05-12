import { Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerDto } from './dto/mailer.dto';
import { Address } from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';

@Controller('mailer')
export class MailerController {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  @Post('send')
  async sendEmail(recipients: Address[], link: string) {
    const mailerDto: MailerDto = {
      from: {
        name: 'Activation Link for your account',
        address: this.configService.get('MAIL_USERNAME'),
      },
      recipients,
      subject:
        'Activation Link for your account' + this.configService.get('API_URL'),
      html: `
      <div>
      <H1>Activation Link for your account</H1>
      <a href="${link}">Activate your account: ${link}</a>
      </div>
      `,
    };
    return await this.mailerService.sendEmail(mailerDto);
  }
}
