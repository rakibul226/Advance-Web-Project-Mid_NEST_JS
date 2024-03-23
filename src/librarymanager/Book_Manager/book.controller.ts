
import { Controller, Get, Post, Put, Delete, Param, Body,ValidationPipe, UsePipes } from '@nestjs/common';
import { BookService } from './book.service';
import { BookEntity } from './entity/book.entity';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}
 @UsePipes(ValidationPipe)
  @Post('addbook')
  async create(@Body() createBookDto: CreateBookDto): Promise<{ message: string, book: BookEntity }> {
    const book = await this.bookService.create(createBookDto);
    return { message: 'Book successfully added', book };
  }

  @Get()
  findAll(): Promise<BookEntity[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BookEntity | undefined> {
    return this.bookService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Promise<BookEntity | undefined> {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.bookService.remove(+id);
    return { message: 'Book deleted successfully' };
  }
}
