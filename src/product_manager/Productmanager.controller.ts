import {
  Body,
  Controller,
  BadRequestException,
  Post,
  Param,
  UsePipes,
  ValidationPipe,
  Get,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProductmanagerService } from './Productmanager.service';
import {
  ChangePasswordDto,
  LoginDTO,
  UpdateProfileDTO,
} from './Productmanager.dto';
import { RegistrationDTO } from './Productmanager.dto';
import * as bcrypt from 'bcrypt';
import { ProductmanagerEntity } from './Productmanager.entity';
@Controller('/Productmanager')
export class ProductmanagerController {
  constructor(private readonly ProductmanagerService: ProductmanagerService) {}

  @Post('register')
  async register(@Body() registrationDTO: RegistrationDTO) {
    return this.ProductmanagerService.register(registrationDTO);
  }

  @Post('login')
  async login(@Body() LoginDTO: LoginDTO) {
    const { email, password } = LoginDTO;
    const Productmanagers = await this.ProductmanagerService.login(
      email,
      password,
    );
    if (!Productmanagers) {
      throw new BadRequestException('Invalid email or password');
    }

    return { message: 'Login successful' };
  }

  @Post('change_password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    const { email, currentPassword, newPassword } = changePasswordDto;

    try {
      await this.ProductmanagerService.changePassword(email, changePasswordDto);
      return { message: 'Password changed successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    //   @UsePipes(new ValidationPipe())
    //   @Post('adduser')
    //   async addUser(@Body() myobj: ProductmanagerDTO): Promise<ProductmanagerDTO> {
    //     return this.ProductmanagerService.addUser(myobj);
    //   }
  }

  @Get('/getallusers')
  getAllUsers(): Promise<ProductmanagerEntity[]> {
    return this.ProductmanagerService.getAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductmanagerEntity | undefined> {
    return this.ProductmanagerService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateuserDto: UpdateProfileDTO,
  ): Promise<ProductmanagerEntity | undefined> {
    return this.ProductmanagerService.update(+id, updateuserDto);
  }

  /*
  @UseGuards(JwtAuthGuard)
  @Get('allusers')
  getProfile(@Request() req) {
    return this.ProductmanagerService.findById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put("allusers")
  updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
    return this.ProductmanagerService.update(req.user.id, updateProfileDto);
  }*/
}
