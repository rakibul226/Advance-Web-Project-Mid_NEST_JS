import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity, ResidentEntity } from './ENTITY/resident.entity';
import { registrationDTO } from './DTO/resident.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ResidentService {
  constructor(
    @InjectRepository(ResidentEntity)
    private residentRepo: Repository<ResidentEntity>,
    @InjectRepository(BookEntity)
    private bookRepo: Repository<BookEntity>,
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

  async login(email: string, password: string): Promise<ResidentEntity> {
    const user = await this.residentRepo.findOne({
      where: { email, password },
    });
    return user;
  }

  async buyBook(bookName: string): Promise<BookEntity | null> {
    const book = await this.bookRepo.findOne({
      where: { name: bookName },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    // You can add additional logic here, like inserting the book into another table

    return book;
  }
}
