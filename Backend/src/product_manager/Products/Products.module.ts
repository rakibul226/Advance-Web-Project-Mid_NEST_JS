import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './Products.controller';
import { ProductService } from './Products.service';
import{Productentity,ProductpictureEntity,SaleEntity} from './Products.entity'
import {CommentEntity}from './Comment.entity'
@Module({
  imports: [TypeOrmModule.forFeature([Productentity,ProductpictureEntity,CommentEntity,SaleEntity])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

