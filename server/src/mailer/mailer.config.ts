import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const mailerConfig: MailerOptions = {
  transport: {
    host: process.env.IMAP_UKR,
    port: Number(process.env.PORT_UKR),
    secure: false,
    auth: {
      user: process.env.MAILER_USER_UKR,
      pass: process.env.MAILER_PASSWORD_UKR,
    },
  },
  defaults: {
    from: '"No Reply" <no-reply@localhost>',
  },
  preview: true,
  template: {
    dir: __dirname + '/templates',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
