
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductmanagerController } from "./Productmanager.controller";
import { ProductmanagerService } from "./Productmanager.service";
import { User } from "./user.entity"; // Adjust the path as necessary

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [ProductmanagerController],
  providers: [ProductmanagerService],
})
export class ProductmanagerModule {}
