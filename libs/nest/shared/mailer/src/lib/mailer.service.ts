import { SgMailerOptions } from '@dm/nest/shared/config';
import { Injectable } from '@nestjs/common';
import * as nodeMailer from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
  transporter: Mail;
  mailerOptions: SgMailerOptions;

  createTransport(mailerOptions: SgMailerOptions): void {
    this.mailerOptions = mailerOptions;
    this.transporter = nodeMailer.createTransport(mailerOptions);
  }

  async sendEmail(mailOptions: Mail.Options): Promise<void> {
    if (!this.transporter) {
      throw new Error('Mailer transporter is undefined.');
    }

    mailOptions.from = this.mailerOptions.auth.user;
    await this.transporter.sendMail(mailOptions);
  }
}
