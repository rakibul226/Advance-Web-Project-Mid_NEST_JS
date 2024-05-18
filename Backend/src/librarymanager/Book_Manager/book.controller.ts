
import { Controller, Get, Post, Put, Delete, Param, Body,ValidationPipe, UsePipes, HttpException, HttpStatus, HttpCode, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { BookService } from './book.service';
import { BookEntity, CustomerOrderEntity, LibraryCardEntity } from './entity/book.entity';
import { CreateBookDto, CustomerOrderDto, LibraryCardDto, UpdateBookDto } from './dto/book.dto';

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
  async updateBook(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto
  ): Promise<BookEntity> {
    try {
      return await this.bookService.update(id, updateBookDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('Failed to update book');
    }
  }

  @Get('customerorder')
async getcustomerOrder(@Param('orderId') orderId: string): Promise<{ message: string, customerOrder: CustomerOrderEntity }> {
  const customerOrder = await this.bookService.getCustomerOrderById(+orderId);
  return { message: 'Customer order successfully', customerOrder };
}




  @Post('issue_librarycard')
  async libraryCard(@Body() libraryCardDto: LibraryCardDto): Promise<{ message: string, libraryCard: LibraryCardEntity }> {
    const libraryCard = await this.bookService.libraryCard(libraryCardDto);
    return { message: 'Library card successfully issued', libraryCard };
  }
  @Delete(':id')
   async removeBook(@Param('id') id: string): Promise<{ message: string }> {
  await this.bookService.removeBook(+id);
  return { message: 'Book deleted successfully' };
}
}
