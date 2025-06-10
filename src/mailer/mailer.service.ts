
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shivam@gmail.com',
      pass: 'admin', 
    },
  });

  async sendWelcomeEmail(to: string, name: string) {
    const mailOptions = {
      from: '"Shivam" <shivam@gmail.com>',
      to,
      subject: 'Welcome to Our App!',
      text: `Hi ${name},\n\nWelcome to our platform! We're happy to have you on board.\n\nThanks,\nShivam Team`,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
