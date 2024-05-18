import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsString()
    @IsNotEmpty()
    author: string;
    @IsString()
    @IsNotEmpty()
    category:string;
    @IsNumber()
    @IsNotEmpty()
    price:number;
    @IsNumber()
    @IsNotEmpty()
    quantity:number;

    
  }

  export class UpdateBookDto {
    @IsNotEmpty()
    @IsString()
    name?: string;
    @IsString()
    @IsNotEmpty()
    author?: string;
    @IsString()
    @IsNotEmpty()
    category?:string;
    @IsNumber()
    @IsNotEmpty()
    price?:number;
    @IsNumber()
    @IsNotEmpty()
    quantity?:number;
    
  }
// src/customer-orders/dto

export class CustomerOrderDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    author: string;
  
    @IsNotEmpty()
    @IsString()
    category: string;
  
    @IsNotEmpty()
    @IsNumber()
    price: number;
  
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
  }

export class LibraryCardDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
   @IsNotEmpty()
   @IsEmail()
   email:string;

  // Add more fields as needed
}


  