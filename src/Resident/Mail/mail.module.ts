import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailService } from './mail.service';
import { mailController } from './mail.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'rakibul1779048226@gmail.com',
          pass: 'yquh rbwg yfpu vnjv',
        },
      },
    }),
  ],
  controllers: [mailController],
  providers: [mailService],
})
export class mailModule {}
