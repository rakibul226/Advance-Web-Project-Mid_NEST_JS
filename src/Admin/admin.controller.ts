import { UseInterceptors, UploadedFile, Body, Controller, Get, Param, Post, Patch, Query, Put, Delete, UsePipes, ValidationPipe} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError , diskStorage } from "multer";
import { AdminDTO } from "./admin.dto";
import {updatedAdminDTO} from "./admin.dto";
import { ResidentEntity } from "src/Resident/ENTITY/resident.entity";

@Controller('/admin')
export class AdminController{
    constructor(private readonly adminService: AdminService){}

    // get all users
    @Get('/getallusers')
    getAllUsers(): Promise<ResidentEntity[]> {
        return this.adminService.getAllUsers()
    }

    // get user by email
    @Get('getuser/:email')
    getUserByEmail(@Param('email') email: string): object {
        return this.adminService.getUserByEmail(email);
    }
}