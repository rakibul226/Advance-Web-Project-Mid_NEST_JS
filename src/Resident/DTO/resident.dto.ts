import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
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

  @IsNotEmpty()
  @IsString()
  @IsIn(['admin', 'resident', 'librarian', 'manager'])
  role: string;
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
// -------------------------------------BuyBook DTO
export class BuyBookDTO {
  @IsNotEmpty()
  @IsString()
  bookName: string;
}
