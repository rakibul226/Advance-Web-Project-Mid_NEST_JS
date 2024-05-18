import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './Products.controller';
import { ProductService } from './Products.service';
import{Productentity,ProductpictureEntity,SaleEntity} from './Products.entity'
import {CommentEntity}from './Comment.entity'
import { SalesService } from './sales.service';
import { SalesController } from './Sales.controller';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './order.entity';
import { Sale } from './Sale.entity';
 
@Module({
  imports: [TypeOrmModule.forFeature([Productentity,ProductpictureEntity,SaleEntity,CommentEntity,Sale,Order])],
  controllers: [ProductController,OrdersController,SalesController],
  providers: [ProductService,OrdersService,SalesService],
})
export class ProductModule {}

