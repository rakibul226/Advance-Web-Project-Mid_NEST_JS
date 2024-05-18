import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class mailService {
  constructor(private readonly mailService: MailerService) {}
  async sendMail(): Promise<string> {
    await this.mailService.sendMail({
      to: 'rakibul8226@mailinator.com',
      from: 'jonak@mailinator.com',
      subject: 'Mailer Testing',
      text: 'Hello, This is a test mail from NestJS application',
    });
    return 'Mail sent successfully';
  }
}
