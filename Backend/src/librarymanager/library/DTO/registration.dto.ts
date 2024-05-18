import {
    IsEmail,
    IsIn,
    IsNotEmpty,
    IsString,
    MinLength,
  } from 'class-validator';
  
  // --registration DTO
  export class RegistrationDTO {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
    @IsNotEmpty()
    @MinLength(4, { message: 'Password must be at least 4 characters long' })
    password: string;
  }
  
  // ------------------------------------Login DTO
  export class LoginDtO {
    @IsNotEmpty()
    @IsString()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  }
  //change password
  export class ChangePasswordDTO {
    @IsNotEmpty()
    @IsString()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    currentPassword: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(4) 
    newPassword: string;
  }

