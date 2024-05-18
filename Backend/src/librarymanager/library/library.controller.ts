import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { LibraryService } from './library.service';
import { ChangePasswordDTO, LoginDtO, RegistrationDTO } from './DTO/registration.dto';
@Controller('librarian')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  //user registration (new user)
  @Post('registration')
  @UsePipes(ValidationPipe)
  registration(@Body() registrationDTO: RegistrationDTO): any {
    return this.libraryService.registration(registrationDTO);
  }

  //login
  @Post('login')
  async login(@Body() loginDtO: LoginDtO) {
    const { email, password } = loginDtO;
    const user = await this.libraryService.login(email, password);
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    return { message: 'Login successful' };

  }
  }
