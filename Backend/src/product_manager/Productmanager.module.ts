import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductmanagerController } from './Productmanager.controller';
import { ProductmanagerService } from './Productmanager.service';
import {ProductmanagerEntity} from './Productmanager.entity'
@Module({
  imports: [TypeOrmModule.forFeature([ProductmanagerEntity])],
  controllers: [ProductmanagerController],
  providers: [ProductmanagerService],
})
export class ProductmanagerModule {}
