import { Body, Controller, Get, Param, Post, Patch, Query, Put, Delete,UsePipes,ValidationPipe } from "@nestjs/common";
import { ProductmanagerService } from "./Productmanager.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError , diskStorage } from "multer";
import { ProductmanagerDTO } from "./Productmanager.dto";
import {updatedProductmanagerDTO} from "./Productmanager.dto";
@Controller('/Productmanager')
export class ProductmanagerController{
    constructor(private readonly ProductmanagerService: ProductmanagerService){}
    @UsePipes(new ValidationPipe)
    @Post('adduser')
   
    async addUser(@Body() myobj: ProductmanagerDTO): Promise<ProductmanagerDTO>{
        return this.ProductmanagerService.addUser(myobj);
    }

    @Get('getuser')
    getUsers(): object{
        return this.ProductmanagerService.getUsers();
    }

    @Delete('deleteuser/:id')
    deleteUser(@Param('id') id: string): object {
        return this.ProductmanagerService.deleteUser(id);
    }

    @Put('updateuser/:id')
    async updateUser(@Param('id') id: string, @Body() myobj: ProductmanagerDTO): Promise<ProductmanagerDTO> {
        return this.ProductmanagerService.updateUser(id, myobj);
    }

    @Patch('partialupdateuser/:id')
    async partialUpdateUser(@Param('id') id: string, @Body() myobj: Partial<ProductmanagerDTO>): Promise<ProductmanagerDTO> {
        return this.ProductmanagerService.partialUpdateUser(id, myobj);
    }

    @Get('getuser/:id')
    getUserById(@Param('id') id: string): object {
        return this.ProductmanagerService.getUserById(id);
    }

    @Get('getuser/')
    getUsersByNameAndId(@Query('name') name: string, @Query('id') id: string): object {
        return this.ProductmanagerService.getUsersByNameAndId(name, id);
    }
    
}
