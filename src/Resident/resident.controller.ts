import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ResidentService } from './resident.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { registrationDTO } from './DTO/resident.dto';

@Controller('user')
export class residentController {
  constructor(private readonly residentService: ResidentService) {}

  //create new user
  @Post('/registration')
  @UsePipes(ValidationPipe)
  registration(@Body() registrationDTO: registrationDTO): any {
    return this.residentService.registration(registrationDTO);
  }
}
