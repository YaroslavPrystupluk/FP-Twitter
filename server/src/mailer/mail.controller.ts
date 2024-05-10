import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('email')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendEmail(
    @Body() emailData: { to: string; subject: string; content: string },
  ) {
    const { to, subject, content } = emailData;
    const enailSend = await this.mailService.sendEmail(to, subject, content);

    if (enailSend) {
      return { massage: 'Email sent successfully' };
    } else {
      throw new BadRequestException('Email not sent');
    }
  }
}
