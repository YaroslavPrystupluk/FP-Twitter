import { Address } from 'nodemailer/lib/mailer';

export class MailerDto {
  from?: Address;
  recipients: string | Address[];
  subject: string;
  html: string;
  text?: string;
  placeholdersRecipients?: Record<string, string>;
}
