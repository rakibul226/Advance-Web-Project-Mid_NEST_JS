import { Module } from '@nestjs/common';
import { ResidentService } from './resident.service';
import { residentController } from './resident.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResidentEntity } from './resident.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResidentEntity])],
  controllers: [residentController],
  providers: [ResidentService],
})
export class ResidentModule {}
