// book.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './entity/book.entity';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async create(createBookDto:CreateBookDto): Promise<BookEntity> {
    return this.bookRepository.save(createBookDto);
  }

  async findAll(): Promise<BookEntity[]> {
    return this.bookRepository.find();
  }

  async findOne(id: number): Promise<BookEntity | undefined> {
    return await this.bookRepository.findOne({where:{id}});
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<BookEntity | undefined> {
    await this.bookRepository.update(id, updateBookDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
