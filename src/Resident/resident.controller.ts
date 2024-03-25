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
  UseInterceptors,
  UploadedFile,
  NotFoundException,
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
  // uploadDTO,
} from './DTO/resident.dto';
import {
  AllProductEntity,
  BookEntity,
  MyBookEntity,
  MyProductEntity,
  UpdateResidentDto,
} from './ENTITY/resident.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';

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
  async borrowBook(@Body() borrowBookDTO: borrowBookDTO): Promise<string> {
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

  //7.--------------------------------Delete borrowed book
  @Delete('/delete/:name')
  async deleteBookByName(@Param('name') name: string): Promise<string> {
    const message = await this.residentService.deleteBookByName(name);
    return message;
  }

  //8.---------------------------------buy product
  // @Post('/buyProduct')
  // async buyProduct(@Body(ValidationPipe) buyProductDto: BuyProductDTO) {
  //   return await this.residentService.buyProduct(buyProductDto);
  // }

  @Post(':residentId/buyProduct')
  async buyProduct(
    @Param('residentId') residentId: number,
    @Body() buyProductDto: BuyProductDTO,
  ) {
    return await this.residentService.buyProduct(residentId, buyProductDto);
  }

  //9.---------------------------------update product
  @Put('/updateQuantity')
  async updateProduct(
    @Body(ValidationPipe) updateProductDto: UpdateProductDTO,
  ) {
    return this.residentService.updateProduct(
      updateProductDto.productName,
      updateProductDto.quantity,
    );
  }

  //10.---------------------------------view all product
  @Get('/view-all-product')
  async viewAllProduct(): Promise<AllProductEntity[] | string> {
    return await this.residentService.viewAllProduct();
  }

  //11.---------------------------------view bought product
  @Get('/viewBoughtProduct')
  async viewBoughtProduct(): Promise<MyProductEntity[] | string> {
    return await this.residentService.viewBoughtProduct();
  }

  //12.----------------------------------cancel order
  @Delete('/cancel-order/:name')
  async cancelOrder(@Param('name') name: string): Promise<string> {
    return this.residentService.cancelOrder(name);
  }

  //13.-----------------------------------upload profile pic
  // @Post('uploadPic')
  // @UseInterceptors(
  //   FileInterceptor('myfile', {
  //     fileFilter: (req, file, cb) => {
  //       if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
  //         cb(null, true);
  //       } else {
  //         cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
  //       }
  //     },
  //     limits: { fileSize: 3000000 },
  //     storage: diskStorage({
  //       destination: './upload',
  //       filename: (req, file, cb) => {
  //         cb(null, Date.now() + file.originalname);
  //       },
  //     }),
  //   }),
  // )
  // @UsePipes(new ValidationPipe())
  // async addEvent(
  //   @Body() myobj: uploadDTO,
  //   @UploadedFile() myfile: Express.Multer.File,
  // ): Promise<uploadDTO> {
  //   myobj.filename = myfile.filename;
  //   await this.residentService.addEvent(myobj);
  // }
  // @UsePipes(new ValidationPipe())
  // async addEvent(
  //   @Body() myobj: uploadDTO,
  //   @UploadedFile() myfile: Express.Multer.File,
  // ): Promise<uploadDTO> {
  //   myobj.filename = myfile.filename;
  //   return this.residentService.addEvent(myobj);
  // }

  // @Post('Productpic')
  // @UseInterceptors(
  //   FileInterceptor('myfile', {
  //     fileFilter: (req, file, cb) => {
  //       if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
  //         cb(null, true);
  //       else {
  //         cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
  //       }
  //     },
  //     limits: { fileSize: 3000000 },
  //     storage: diskStorage({
  //       destination: './upload',
  //       filename: function (req, file, cb) {
  //         cb(null, Date.now() + file.originalname);
  //       },
  //     }),
  //   }),
  // )
  // @UsePipes(new ValidationPipe())
  // async addEvent(
  //   @Body() myobj: ProductpictureDTO,
  //   @UploadedFile() myfile: Express.Multer.File,
  // ): Promise<ProductpictureDTO> {
  //   myobj.filename = myfile.filename;
  //   return this.residentService.addEvent(myobj);
  // }

  // @Post('upload-profile')
  // @UseInterceptors(
  //   FileInterceptor('myfile', {
  //     fileFilter: (req, file, cb) => {
  //       if (file.originalname.match(/\.(jpg|jpeg|png|PNG|webp)$/)) {
  //         cb(null, true);
  //       } else {
  //         cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
  //       }
  //     },
  //     limits: { fileSize: 30000 },
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, cb) => {
  //         cb(null, Date.now() + '-' + file.originalname);
  //       },
  //     }),
  //   }),
  // )
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   try {
  //     if (!file) {
  //       throw new Error('No file uploaded.');
  //     }
  //     console.log('Uploaded file:', file);
  //     return 'File uploaded successfully.';
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //     throw error;
  //   }
  // }

  //13.--------------------------------search product by name
  @Get('searchProduct/:name')
  @UsePipes(new ValidationPipe())
  async searchProduct(@Param() searchDTO: SearchDTO): Promise<string> {
    return this.residentService.searchProduct(searchDTO.name);
  }
  //14.
  @Put(':email')
  async updateResidentByEmail(
    @Param('email') email: string,
    @Body() updateResidentDto: UpdateResidentDto,
  ) {
    try {
      return await this.residentService.updateResidentByEmail(
        email,
        updateResidentDto,
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
