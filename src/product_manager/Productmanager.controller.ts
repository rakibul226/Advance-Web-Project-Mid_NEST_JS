import {
   Body,
  Controller,
  BadRequestException,
     Post,
    UsePipes,
   ValidationPipe,
} from '@nestjs/common';
import { ProductmanagerService } from './Productmanager.service';
import { LoginDTO } from './Productmanager.dto';
@Controller('/Productmanager')
export class ProductmanagerController {
  constructor(private readonly ProductmanagerService: ProductmanagerService) {}
 

  @Post('login')
  async login(@Body() LoginDTO: LoginDTO) {
    const { email, password } = LoginDTO;
    const user = await this.ProductmanagerService.login(email, password);
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    return { message: 'Login successful' };
  }
  //   @UsePipes(new ValidationPipe())
  //   @Post('adduser')
  //   async addUser(@Body() myobj: ProductmanagerDTO): Promise<ProductmanagerDTO> {
  //     return this.ProductmanagerService.addUser(myobj);
  //   }
}
