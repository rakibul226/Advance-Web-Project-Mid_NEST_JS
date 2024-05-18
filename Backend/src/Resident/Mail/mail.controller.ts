import { Controller, Get, Post } from '@nestjs/common';
import SendmailTransport from 'nodemailer/lib/sendmail-transport';
import { mailService } from './mail.service';

@Controller('mail')
export class mailController {
  constructor(private readonly mailService: mailService) {}
  //   @Get()
  //   SendmailTransport(): Promise<void> {
  //     return this.mailService.sendMail();
  //   }

  @Post('sendMail')
  async sendMail(): Promise<string> {
    return this.mailService.sendMail();
  }
}
