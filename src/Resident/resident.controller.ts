import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ResidentService } from './resident.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  BuyProductDTO,
  LoginDTO,
  SearchDTO,
  UpdateProductDTO,
  borrowBookDTO,
  registrationDTO,
} from './DTO/resident.dto';
import { BookEntity, MyBookEntity } from './ENTITY/resident.entity';

@Controller('user')
export class residentController {
  constructor(private readonly residentService: ResidentService) {}

  //1.---------------------------------user registration(create new user)
  @Post('/registration')
  @UsePipes(ValidationPipe)
  registration(@Body() registrationDTO: registrationDTO): any {
    return this.residentService.registration(registrationDTO);
  }

  //2.---------------------------------login
  @Post('login')
  async login(@Body() LoginDTO: LoginDTO) {
    const { email, password } = LoginDTO;
    const user = await this.residentService.login(email, password);
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    return { message: 'Login successful' };
  }

  //3---------------------------------buy book
  @Post('/borrow-book')
  async borrowBook(@Body() borrowBookDTO: borrowBookDTO): Promise<BookEntity> {
    return this.residentService.borrowBook(borrowBookDTO.bookName);
  }

  //4.---------------------------------find by name
  @Get('findbook/:name')
  @UsePipes(new ValidationPipe())
  async findBookByName(@Param() searchDTO: SearchDTO): Promise<string> {
    return this.residentService.findByName(searchDTO.name);
  }

  //5.---------------------------------view all book
  @Get('/view-all-books')
  async viewAllBooks(): Promise<BookEntity[] | string> {
    return await this.residentService.viewAllBooks();
  }

  //6.---------------------------------view borrow book
  @Get('/viewBorrowedBook')
  async viewMyBooks(): Promise<MyBookEntity[] | string> {
    return await this.residentService.viewMyBooks();
  }

  //6.--------------------------------Delete borrowed book
  @Delete('/delete/:name')
  async deleteBookByName(
    @Param('name') name: string,
  ): Promise<{ message: string }> {
    const message = await this.residentService.deleteBookByName(name);
    return { message };
  }

  //8.---------------------------------buy product
  @Post('/buyProduct')
  async buyProduct(@Body(ValidationPipe) buyProductDto: BuyProductDTO) {
    return await this.residentService.buyProduct(buyProductDto);
  }

  //9.---------------------------------update product
  @Put('updateProduct')
  async updateProduct(
    @Body(ValidationPipe) updateProductDto: UpdateProductDTO,
  ) {
    return this.residentService.updateProduct(
      updateProductDto.productName,
      updateProductDto.quantity,
    );
  }
}
