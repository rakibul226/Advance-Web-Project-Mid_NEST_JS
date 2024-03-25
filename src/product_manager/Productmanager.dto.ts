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
  

  export class LoginDTO {
    @IsNotEmpty()
    @IsString()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  }

  export class RegistrationDTO {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsNotEmpty()
    password: string;
  
    @IsOptional()
    @IsString()
    phone?: string;
  
    @IsNotEmpty()
    @IsString()
    role: string;
  }

  export class ChangePasswordDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    readonly currentPassword: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly newPassword: string;



    
  }

  export class UpdateProfileDTO   {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsNotEmpty()
    password: string;
  
    @IsOptional()
    @IsString()
    phone?: string;
  
    @IsNotEmpty()
    @IsString()
    role: string;
  }

 

 



 /* export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    phone?: string;
  
    // 
  }*/


