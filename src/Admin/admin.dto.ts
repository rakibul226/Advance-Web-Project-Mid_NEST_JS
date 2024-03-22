import { Contains, IsAlpha, IsEmail, IsInt, IsNotEmpty, IsPhoneNumber, IsString, Matches, isNotEmpty, IsNumber, IsBoolean } from "class-validator";

export class AdminDTO{
    @IsString()
    @IsAlpha()
    name:string;

    @IsInt()
    id:number;

    @IsEmail()
    @IsNotEmpty()
    @Matches(/^.*@.*\.xyz$/, {message: "email must contain @ and .xyz domain"})
    email:string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*\d).+/, {message: "Password must contain at least one numeric character"})
    password:string

    @IsString()
    @Matches(/^\d{13}$/, {message: "Nid numbers must be 13 digits"})
    nidNumber:string

    @IsString()
    @Matches(/^018-\d{7}$/)
    phoneNumber:string
}

export class updatedAdminDTO {
    id: number

    @IsString()
    username: string

    @IsString()
    fullname: string

    isActive: boolean
}
