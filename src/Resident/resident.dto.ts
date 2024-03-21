import { IsIn, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class AddResidentDTO {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @IsInt()
  age: number;

  @IsOptional()
  status: string;

}


