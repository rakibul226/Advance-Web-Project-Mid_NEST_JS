import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResidentEntity } from 'src/Resident/ENTITY/resident.entity';
import { AdminAnnouncedEventEntity, AdminAnnouncedPostEntity, AdminEntity } from './admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResidentEntity,AdminAnnouncedEventEntity, AdminEntity, AdminAnnouncedPostEntity])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
