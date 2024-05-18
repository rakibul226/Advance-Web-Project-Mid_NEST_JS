// book.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookEntity, CustomerOrderEntity, LibraryCardEntity } from './entity/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity,LibraryCardEntity,CustomerOrderEntity])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
