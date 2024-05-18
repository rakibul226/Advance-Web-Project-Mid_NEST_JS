import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResidentEntity } from 'src/Resident/ENTITY/resident.entity';
<<<<<<< HEAD:src/Admin/admin.module.ts
import { AdminAnnouncedEventEntity, AdminEntity } from './admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResidentEntity,AdminAnnouncedEventEntity, AdminEntity])],
=======
import { AdminAnnouncedEventEntity, AdminAnnouncedPostEntity, AdminEntity } from './admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResidentEntity,AdminAnnouncedEventEntity, AdminEntity, AdminAnnouncedPostEntity])],
>>>>>>> 487e2acaa3a940e2cb8b7e9ab5ef3d35972fc34b:Backend/src/Admin/admin.module.ts
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
