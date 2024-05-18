
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity, CustomerOrderEntity, LibraryCardEntity } from './entity/book.entity';
import { CreateBookDto, CustomerOrderDto, LibraryCardDto, UpdateBookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  customerOrder(customerOrderDto: CustomerOrderDto) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(LibraryCardEntity)
    private readonly libraryCardRepository: Repository<LibraryCardEntity>,
    @InjectRepository(CustomerOrderEntity)
    private readonly customerOrderRepository: Repository<CustomerOrderEntity>,
  
  
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

  async update(id: number, updateBookDto: UpdateBookDto): Promise<BookEntity> {
    const existingBook = await this.bookRepository.findOne({ where: { id} });
    if (!existingBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    existingBook.name = updateBookDto.name ?? existingBook.name;
    existingBook.author = updateBookDto.author ?? existingBook.author;
    existingBook.category = updateBookDto.category ?? existingBook.category;
    existingBook.price = updateBookDto.price ?? existingBook.price;
    existingBook.quantity = updateBookDto.quantity ?? existingBook.quantity;

    return this.bookRepository.save(existingBook);
  }
  async removeBook(id: number): Promise<void> {
    // Find the book by ID
    const bookToRemove = await this.bookRepository.findOne({ where: { id } });
    if (!bookToRemove) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    // Remove the book from the database
    await this.bookRepository.remove(bookToRemove);
  }
  async getCustomerOrderById(orderId: number): Promise<CustomerOrderEntity | undefined> {
    return this.customerOrderRepository.findOne({ where: { id: orderId } });
  
  }
  
  async libraryCard(libraryCardDto: LibraryCardDto): Promise<LibraryCardEntity> {
    return this.libraryCardRepository.save(libraryCardDto);
  }
}
