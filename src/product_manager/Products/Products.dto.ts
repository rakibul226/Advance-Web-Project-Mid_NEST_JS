import {
    IsEmail,
    IsIn,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
    IsOptional,
    IsDateString,
    IsNumber
  } from 'class-validator';
  import { Optional } from '@nestjs/common';

 

  export class CreateProductDTO {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
  }
  
  export class UpdateProductDTO extends CreateProductDTO {
    @IsNumber()
    id: number;
  }
  
  export class DeleteProductDTO {
    @IsNumber()
    id: number;
  }


  export class ProductpictureDTO {
    @Optional()
    id: number
    @IsNotEmpty()
    productname: string;
    filename: string
  }

  export class PostCommentDTO {
    @IsNotEmpty()
    @IsString()
    content: string;
  }


  export class GenerateReportDTO {
    @IsNotEmpty()
    @IsDateString()
    startDate: string;
  
    @IsNotEmpty()
    @IsDateString()
    endDate: string;
  }