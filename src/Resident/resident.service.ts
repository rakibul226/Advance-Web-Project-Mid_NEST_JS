import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AllProductEntity,
  BookEntity,
  MyBookEntity,
  MyProductEntity,
  ResidentEntity,
} from './ENTITY/resident.entity';
import { BuyProductDTO, registrationDTO } from './DTO/resident.dto';
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

    @InjectRepository(AllProductEntity)
    private allProductRepo: Repository<AllProductEntity>,

    @InjectRepository(MyProductEntity)
    private myProductRepo: Repository<MyProductEntity>,
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

  //--------------------------------Login
  async login(email: string, password: string): Promise<ResidentEntity> {
    const user = await this.residentRepo.findOne({
      where: { email, password },
    });
    return user;
  }

  //--------------------------------borrowBook
  async borrowBook(bookName: string): Promise<BookEntity | null> {
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

  //--------------------------------Find Book By name
  async findByName(name: string): Promise<string> {
    const book = await this.bookRepo.findOne({ where: { name } });

    if (book) {
      return `Book "${name}" found.`;
    } else {
      return `Book "${name}" is not available.`;
    }
  }

  //--------------------------------View All Book
  async viewAllBooks(): Promise<BookEntity[] | string> {
    const books = await this.bookRepo.find();
    if (books.length === 0) {
      return 'No Books Available';
    }
    return books;
  }

  //--------------------------------View My Book
  async viewMyBooks(): Promise<MyBookEntity[] | string> {
    const books = await this.myBookRepo.find();
    if (books.length === 0) {
      return "You haven't Purchased any book";
    }
    return books;
  }

  //6.---------------------------------Delete borrowed book
  async deleteBookByName(name: string): Promise<string> {
    const product = await this.myBookRepo.findOne({ where: { name } });
    if (!product) {
      throw new NotFoundException(`You haven't borrowed the product ${name}`);
    }
    await this.myBookRepo.remove(product);
    return `Book "${name}" has been deleted from`;
  }

  //--------------------------------buy product
  async buyProduct(buyProductDto: BuyProductDTO) {
    const { productName, quantity } = buyProductDto;
    const product = await this.allProductRepo.findOne({
      where: { name: productName },
    });
    if (!product) {
      throw new NotFoundException(`Product with name ${productName} not found`);
    }
    if (product.quantity < quantity) {
      throw new BadRequestException('Not enough quantity available');
    }
    product.quantity -= quantity;
    await this.allProductRepo.save(product);
    const totalPrice = product.price * quantity;

    const myProduct = new MyProductEntity();
    myProduct.product_id = product.product_id;
    myProduct.name = product.name;
    myProduct.quantity = quantity;
    myProduct.totalPrice = totalPrice;
    await this.myProductRepo.save(myProduct);

    return { message: 'Product purchased successfully', myProduct };
  }

  //--------------------------------update product
  async updateProduct(productName: string, quantity: number) {
    const myProduct = await this.myProductRepo.findOne({
      where: { name: productName },
    });
    if (!myProduct) {
      return {
        message: `Product with name ${productName} not found in your products`,
      };
    }

    const product = await this.allProductRepo.findOne({
      where: { name: productName },
    });
    if (!product) {
      throw new BadRequestException(
        `Product with name ${productName} not found in all products`,
      );
    }

    if (product.quantity < quantity) {
      throw new BadRequestException('Not enough quantity available to update');
    }

    const quantityDifference = quantity - myProduct.quantity;

    myProduct.quantity = quantity;

    const totalPriceDifference = quantityDifference * product.price;
    myProduct.totalPrice += totalPriceDifference;

    await this.myProductRepo.save(myProduct);

    product.quantity -= quantityDifference;
    await this.allProductRepo.save(product);

    return { message: 'Product updated successfully' };
  }
}
