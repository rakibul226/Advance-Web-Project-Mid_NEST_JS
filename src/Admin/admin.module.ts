import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import {AdminEntity} from "./admin.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResidentEntity } from "src/Resident/ENTITY/resident.entity";


@Module({
    imports: [ TypeOrmModule.forFeature([AdminEntity,ResidentEntity]),],
    controllers: [AdminController],
    providers: [AdminService],
  })
  export class AdminModule {}
  