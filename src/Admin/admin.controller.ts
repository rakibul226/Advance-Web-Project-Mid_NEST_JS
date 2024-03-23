import { Controller, Get, Param } from '@nestjs/common';
import { ResidentEntity } from 'src/Resident/ENTITY/resident.entity';
import { AdminService } from './admin.service';

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
}
