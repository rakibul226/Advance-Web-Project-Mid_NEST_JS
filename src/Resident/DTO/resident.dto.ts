import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';

// ------------------------------------registration DTO
export class registrationDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty()
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  // @Matches(/(?=.*[A-Z])/, {
  // message: 'Password must contain at least one uppercase letter',
  // })
  password: string;

  @Matches(/^[0-9]+$/, { message: 'Phone number must contain only numbers' })
  phone: string;
}

// ------------------------------------Login DTO
export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
// -------------------------------------borrowBook DTO
export class borrowBookDTO {
  @IsNotEmpty()
  @IsString()
  bookName: string;
}
// -------------------------------------search DTO
export class SearchDTO {
  @IsString()
  name: string;
}

// -------------------------------------buy product DTO
export class BuyProductDTO {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}

// -------------------------------------Update product DTO

export class UpdateProductDTO {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}
