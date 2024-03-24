import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
// import { AdminEntity } from './admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResidentEntity } from 'src/Resident/ENTITY/resident.entity';
import { AdminAnnouncedEventEntity } from './admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResidentEntity,AdminAnnouncedEventEntity])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
