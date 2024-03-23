import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BookEntity,
  MyBookEntity,
  ResidentEntity,
} from './ENTITY/resident.entity';
import { registrationDTO } from './DTO/resident.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ResidentService {
  constructor(
    @InjectRepository(ResidentEntity)
    private residentRepo: Repository<ResidentEntity>,
    @InjectRepository(BookEntity)
    private bookRepo: Repository<BookEntity>,
    @InjectRepository(MyBookEntity)
    private myBookRepo: Repository<MyBookEntity>,
  ) {}

  //--------------------------------user registration
  async registration(
    registrationDTO: registrationDTO,
  ): Promise<ResidentEntity[]> {
    const newUser = new ResidentEntity();
    newUser.name = registrationDTO.name;
    newUser.email = registrationDTO.email;
    newUser.password = registrationDTO.password;
    newUser.phone = registrationDTO.phone;
    newUser.role = registrationDTO.role;
    const res = await this.residentRepo.save(newUser);
    return [res];
  }

  //--------------------------------user registration
  async login(email: string, password: string): Promise<ResidentEntity> {
    const user = await this.residentRepo.findOne({
      where: { email, password },
    });
    return user;
  }

  //--------------------------------user registration
  async buyBook(bookName: string): Promise<BookEntity | null> {
    const book = await this.bookRepo.findOne({
      where: { name: bookName },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }
    const myBook = new MyBookEntity();
    myBook.Product_ID = book.id;
    myBook.name = book.name;
    myBook.author = book.author;
    myBook.category = book.category;
    myBook.price = book.price;

    await this.myBookRepo.save(myBook);

    return book;
  }

  //--------------------------------user registration
  async findByName(name: string): Promise<string> {
    const book = await this.bookRepo.findOne({ where: { name } });

    if (book) {
      return `Book "${name}" found.`;
    } else {
      return `Book "${name}" is not available.`;
    }
  }

  //--------------------------------View
  async viewAllBooks(): Promise<BookEntity[]> {
    return this.bookRepo.find();
  }
}
