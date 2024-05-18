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
  // uploadEntity,
} from './ENTITY/resident.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ResidentEntity,
      BookEntity,
      MyBookEntity,
      MyProductEntity,
      AllProductEntity,
      // uploadEntity,
    ]),
  ],
  controllers: [residentController],
  providers: [ResidentService],
})
export class ResidentModule {}
