import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class mailService {
  constructor(private readonly mailService: MailerService) {}
  async sendMail(): Promise<void> {
    await this.mailService.sendMail({
      to: 'jonak@gmail.com',
      from: 'rakibul@gmail.com',
      subject: 'testing mail',
      text: 'welcome  to everNeighbor',
      html: '<b>wellcome</b>',
    });
  }
}
