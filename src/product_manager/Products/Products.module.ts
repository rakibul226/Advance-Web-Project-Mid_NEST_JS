import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './Products.controller';
import { ProductService } from './Products.service';
import{Productentity} from './Products.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Productentity])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

