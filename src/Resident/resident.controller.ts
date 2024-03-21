import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ResidentService } from './resident.service';
import { AddResidentDTO } from './resident.dto';

@Controller('resident')
export class residentController {
  constructor(private readonly residentService: ResidentService) {}

  //create new user
  @Post('/createuser')
  @UsePipes(ValidationPipe)
  addResident(@Body() addResidentDTO: AddResidentDTO): any {
    return this.residentService.addResident(addResidentDTO);
  }
}
