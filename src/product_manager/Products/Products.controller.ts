import {
   Body,Controller,Get,Post,UsePipes,ValidationPipe,Put, Delete, Param, UploadedFile, UseInterceptors,ParseIntPipe
} from '@nestjs/common';
import { ProductService } from './Products.service';
import {CommentEntity}from './Comment.entity'
import { Productentity } from './Products.entity';
import { CreateProductDTO, UpdateProductDTO,ProductpictureDTO,PostCommentDTO ,GenerateReportDTO} from './Products.dto'; 
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';

@Controller('products') 
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(ValidationPipe)
  @Post('addProduct')
  @UsePipes(ValidationPipe) 
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





@Post(':productId/add-comment')
async addCommentToProduct(
  @Param('productId', ParseIntPipe) productId: number,
  @Body() commentDto: PostCommentDTO,
): Promise<CommentEntity> {
  return await this.productService.addCommentToProduct(productId, commentDto);
}



  @Post('report')
  async generateSalesReport(@Body() body: any): Promise<any> {
    
    return await this.productService.generateReport(new Date(body.startDate), new Date(body.endDate));
  }
}




  
