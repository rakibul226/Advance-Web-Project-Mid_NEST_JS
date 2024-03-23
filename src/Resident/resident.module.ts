import { Module } from '@nestjs/common';
import { ResidentService } from './resident.service';
import { residentController } from './resident.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity, ResidentEntity } from './ENTITY/resident.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResidentEntity, BookEntity])],
  controllers: [residentController],
  providers: [ResidentService],
})
export class ResidentModule {}
