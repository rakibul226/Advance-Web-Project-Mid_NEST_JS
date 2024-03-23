import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ResidentEntity } from 'src/Resident/ENTITY/resident.entity';
import { AdminService } from './admin.service';
import { UserUpdateDTO } from './admin.dto';

@Controller('/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // get all users
  @Get('/getallusers')
  getAllUsers(): Promise<ResidentEntity[]> {
    return this.adminService.getAllUsers();
  }

  // get user by email
  @Get('getuser/:email')
  getUserByEmail(@Param('email') email: string): object {
    return this.adminService.getUserByEmail(email);
  }

  // delete user by id
  @Delete('deleteuser/:id')
  deleteUserById(@Param('id', ParseIntPipe) id: number): object {
    return this.adminService.deleteUserById(id);
  }

  // update user information by id
  @Put('/updateuser/:id')
  @UsePipes(new ValidationPipe())
  updateUserbyID(@Param('id', ParseIntPipe) id: number, @Body() data: UserUpdateDTO): object {
    return this.adminService.updateUserById(id, data);
  }

  // update user user role by id(User Role Assignment)
  @Patch('/updateuserrole/:id')
  @UsePipes(new ValidationPipe())
  updateUserRolebyID(@Param('id', ParseIntPipe) id: number, @Body() data: UserUpdateDTO): object {
    return this.adminService.updateUserRoleById(id, data);
  }

  // get users by partial match(Search by name)
  @Get('getusersbyname/:name')
  getUsersByName(@Param('name') name: string){
      return this.adminService.getUsersByName(name);
  }
}
