import { Injectable } from "@nestjs/common";
import { ProductmanagerDTO } from "./Productmanager.dto";
import { Multer } from "multer";
import {updatedProductmanagerDTO} from "./Productmanager.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class ProductmanagerService {
    async addUser(myobj:ProductmanagerDTO):Promise<ProductmanagerDTO>{
        return myobj;   
    }

    getUsers(): object{
        return {message: "users"}
    }

    deleteUser(id: string): object {
        return { message: `User with id ${id} deleted` };
    }

    async updateUser(id: string, myobj: ProductmanagerDTO): Promise<ProductmanagerDTO> {

        return myobj;
    }

    async partialUpdateUser(id: string, myobj: Partial<ProductmanagerDTO>): Promise<ProductmanagerDTO> {

        return myobj as ProductmanagerDTO;
    }

    getUserById(id: string): object{
        return {message: "You id is " + id};
    }

    getUsersByNameAndId(name: string, id: string): object{
        return {message: "You id is " + id  +" and your name is "+ name};
    }
}
