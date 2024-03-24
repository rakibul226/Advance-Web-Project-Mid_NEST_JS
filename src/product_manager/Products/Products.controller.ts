import {
   Body,Controller,Get,Post,UsePipes,ValidationPipe,Put, Delete, Param, UploadedFile, UseInterceptors
} from '@nestjs/common';
import { ProductService } from './Products.service';

import { Productentity } from './Products.entity';
import { CreateProductDTO, UpdateProductDTO,ProductpictureDTO } from './Products.dto'; // Assuming you have a DTO for creating products
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';

@Controller('products') // Update the controller route to match the provided example
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(ValidationPipe) // Apply validation pipe for request body validation
  @Post('addProduct') // Use a consistent naming convention for endpoint URLs
  async create(@Body()  createproductDTO: CreateProductDTO): Promise<{ message: string, product: Productentity }> {
    const product = await this.productService.create(createproductDTO);
    return { message: 'Product successfully added', product };
  }

  @Get('/getallproducts')
  getAllUsers(): Promise<Productentity[]> {
    return this.productService.getAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Productentity | undefined> {
    return this.productService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateproductDto: UpdateProductDTO): Promise<Productentity | undefined> {
    return this.productService.update(+id, updateproductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.productService.remove(+id);
    return { message: 'product deleted successfully' };
  }

  @Post('Productpic')
  @UseInterceptors(FileInterceptor('myfile',
      {
          fileFilter: (req, file, cb) => {
              if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                  cb(null, true);
              else {
                  cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
              }
          },
          limits: { fileSize: 3000000 },
          storage: diskStorage({
              destination: './upload',
              filename: function (req, file, cb) {
                  cb(null, Date.now() + file.originalname)
              },
          })
      }
  ))

  @UsePipes(new ValidationPipe)
    async addEvent(@Body() myobj: ProductpictureDTO, @UploadedFile() myfile: Express.Multer.File): Promise<ProductpictureDTO> {
        myobj.filename = myfile.filename;
        return this.productService.addEvent(myobj);
    }
}




  
