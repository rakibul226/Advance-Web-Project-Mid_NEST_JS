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
  UpdateResidentDto,
  // uploadEntity,
} from './ENTITY/resident.entity';
import { BuyProductDTO, registrationDTO } from './DTO/resident.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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

    // @InjectRepository(uploadEntity)
    // private readonly uploadRepo: Repository<uploadEntity>,
  ) {}

  //--------------------------------user registration
  async registration(
    registrationDTO: registrationDTO,
  ): Promise<ResidentEntity[]> {
    const newUser = new ResidentEntity();
    newUser.name = registrationDTO.name;
    newUser.email = registrationDTO.email;
    const hashedPassword = await bcrypt.hash(registrationDTO.password, 10);
    newUser.password = hashedPassword;
    newUser.phone = registrationDTO.phone;
    const res = await this.residentRepo.save(newUser);
    return [res];
  }

  //--------------------------------Login
  async login(email: string, password: string): Promise<ResidentEntity> {
    const user = await this.residentRepo.findOne({
      where: { email },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return user;
  }

  //--------------------------------borrowBook
  async borrowBook(bookName: string): Promise<string> {
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
    await this.myBookRepo.save(myBook);

    return `${book.name} successfully borrowed`;
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
    return `Book ${name} has been deleted`;
  }

  //--------------------------------buy product
  // async buyProduct(buyProductDto: BuyProductDTO) {
  //   const { productName, quantity } = buyProductDto;
  //   const product = await this.allProductRepo.findOne({
  //     where: { name: productName },
  //   });
  //   if (!product) {
  //     throw new NotFoundException(`Product with name ${productName} not found`);
  //   }
  //   if (product.quantity < quantity) {
  //     throw new BadRequestException('Not enough quantity available');
  //   }
  //   product.quantity -= quantity;
  //   await this.allProductRepo.save(product);
  //   const totalPrice = product.price * quantity;

  //   const myProduct = new MyProductEntity();
  //   myProduct.product_id = product.product_id;
  //   myProduct.name = product.name;
  //   myProduct.quantity = quantity;
  //   myProduct.totalPrice = totalPrice;
  //   await this.myProductRepo.save(myProduct);

  //   return { message: 'Product purchased successfully', myProduct };
  // }

  async buyProduct(residentId: number, buyProductDto: BuyProductDTO) {
    const { productName, quantity } = buyProductDto;

    // Find the resident
    const resident = await this.residentRepo.findOne({
      where: { id: residentId },
    });
    if (!resident) {
      throw new NotFoundException(`Resident with ID ${residentId} not found`);
    }

    // Find the product
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

    // Calculate total price
    const totalPrice = product.price * quantity;

    // Save the purchased product
    const myProduct = new MyProductEntity();
    myProduct.product_id = product.product_id;
    myProduct.name = product.name;
    myProduct.quantity = quantity;
    myProduct.totalPrice = totalPrice;
    myProduct.resident = resident; // Associate resident with purchased product
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

  //10.---------------------------------view all product
  async viewAllProduct(): Promise<AllProductEntity[] | string> {
    const product = await this.allProductRepo.find();
    if (product.length === 0) {
      return 'No product Available';
    }
    return product;
  }

  //11.---------------------------------view all product
  async viewBoughtProduct(): Promise<MyProductEntity[] | string> {
    const product = await this.myProductRepo.find();
    if (product.length === 0) {
      return 'No product Available';
    }
    return product;
  }

  //12.----------------------------------cancel order
  async cancelOrder(productName: string): Promise<string> {
    const myProduct = await this.myProductRepo.findOne({
      where: { name: productName },
    });
    if (!myProduct) {
      throw new NotFoundException(
        `You haven't ordered the product ${productName}`,
      );
    }

    const allProduct = await this.allProductRepo.findOne({
      where: { name: productName },
    });
    if (!allProduct) {
      throw new NotFoundException(
        `Product ${productName} not found in the inventory to return`,
      );
    }
    allProduct.quantity += myProduct.quantity;

    await Promise.all([
      this.myProductRepo.remove(myProduct),
      this.allProductRepo.save(allProduct),
    ]);

    return `Order for ${productName} has been successfully canceled.`;
  }

  // async addEvent(myobj: uploadEntity): Promise<uploadEntity> {
  //   return await this.uploadRepo.save(myobj);
  // }

  //--------------------------------search product by name
  async searchProduct(name: string): Promise<string> {
    const book = await this.allProductRepo.findOne({ where: { name } });

    if (book) {
      return `Book "${name}" found.`;
    } else {
      return `Book "${name}" is not available.`;
    }
  }

  async updateResidentByEmail(
    email: string,
    updateResidentDto: UpdateResidentDto,
  ): Promise<ResidentEntity> {
    const resident = await this.residentRepo.findOne({
      where: { email },
    });

    if (!resident) {
      // Handle error when resident is not found
      throw new Error('Resident not found');
    }

    resident.name = updateResidentDto.name;
    resident.phone = updateResidentDto.phone;

    return await this.residentRepo.save(resident);
  }
}
