import { Injectable } from "@nestjs/common";
import { AdminDTO } from "./admin.dto";
import { Multer } from "multer";
import {updatedAdminDTO} from "./admin.dto";
import { AdminEntity } from './admin.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity) 
        private adminRepo: Repository<AdminEntity>,
      )
      {}

    // create user
    async addUser(myobj:updatedAdminDTO):Promise<AdminEntity>{
        return this.adminRepo.save(myobj);   
    }

    // get user by partial match
    getUsers(name:string): Promise<AdminEntity[]>{
        return this.adminRepo.find({
            where: {
                fullname: Like(`%${name}%`),
            },
        });
    }

    // get user by username
    async getUserByUsername(username: string): Promise<AdminEntity> {
        return this.adminRepo.findOneBy({ username: username });
    }

    // delete user by username
    async deleteUserByUsername(username: string): Promise<void> {
        console.log(username);
        await this.adminRepo.delete({username: username})
    }

    /* deleteUser(id: string): object {
        return { message: `User with id ${id} deleted` };
    } */

    async updateUser(id: string, myobj: AdminDTO): Promise<AdminDTO> {

        return myobj;
    }

    async partialUpdateUser(id: string, myobj: Partial<AdminDTO>): Promise<AdminDTO> {

        return myobj as AdminDTO;
    }

    getUserById(id: string): object{
        return {message: "You id is " + id};
    }

    getUsersByNameAndId(name: string, id: string): object{
        return {message: "You id is " + id  +" and your name is "+ name};
    }

    /* uploadFile(file: Express.Multer.File): object {
        return {message: "Your file upload is complete" +file};
    } */
}