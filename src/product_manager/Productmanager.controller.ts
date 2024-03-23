import {
  //   Body,
  Controller,
  //   Post,
  //   UsePipes,
  //   ValidationPipe,
} from '@nestjs/common';
import { ProductmanagerService } from './Productmanager.service';

@Controller('/Productmanager')
export class ProductmanagerController {
  constructor(private readonly ProductmanagerService: ProductmanagerService) {}

  //   @UsePipes(new ValidationPipe())
  //   @Post('adduser')
  //   async addUser(@Body() myobj: ProductmanagerDTO): Promise<ProductmanagerDTO> {
  //     return this.ProductmanagerService.addUser(myobj);
  //   }
}
