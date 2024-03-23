import { IsNotEmpty, IsNumber, IsString } from "class-validator";

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
  