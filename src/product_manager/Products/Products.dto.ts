import {
    IsEmail,
    IsIn,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
    IsOptional,
  
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