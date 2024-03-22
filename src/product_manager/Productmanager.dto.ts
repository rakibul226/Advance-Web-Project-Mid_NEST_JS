import { IsString, IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class ProductmanagerDTO {
   
    name: string;

   

}

export class updatedProductmanagerDTO {
    id: number

    @IsString()
    username: string

    @IsString()
    fullname: string

    isActive: boolean
}
