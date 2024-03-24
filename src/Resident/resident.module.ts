import { Module } from '@nestjs/common';
import { ResidentService } from './resident.service';
import { residentController } from './resident.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AllProductEntity,
  BookEntity,
  MyBookEntity,
  MyProductEntity,
  ResidentEntity,
} from './ENTITY/resident.entity';
import { mailModule } from './Mail/mail.module';
// import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ResidentEntity,
      BookEntity,
      MyBookEntity,
      MyProductEntity,
      AllProductEntity,
      mailModule,
    ]),
  ],
  controllers: [residentController],
  providers: [ResidentService],
})
export class ResidentModule {}
