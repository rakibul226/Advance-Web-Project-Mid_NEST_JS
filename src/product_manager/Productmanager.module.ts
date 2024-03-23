import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductmanagerController } from './Productmanager.controller';
import { ProductmanagerService } from './Productmanager.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [ProductmanagerController],
  providers: [ProductmanagerService],
})
export class ProductmanagerModule {}
