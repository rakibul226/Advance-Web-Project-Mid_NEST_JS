import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ResidentEntity } from 'src/Resident/ENTITY/resident.entity';
import { AdminService } from './admin.service';
import { AdminEventAnnouncementDTO, UserUpdateDTO } from './admin.dto';
import { registrationDTO } from 'src/Resident/DTO/resident.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';

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

  // add user
  @Post('/adduser')
  @UsePipes(ValidationPipe)
  async addUser(@Body() user: registrationDTO): Promise<registrationDTO> {
    return this.adminService.addUser(user);
  }

  // local event announcement
  @Post('addevent')
    @UseInterceptors(FileInterceptor('myfile',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 3000000 },
            storage: diskStorage({
                destination: './upload',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    @UsePipes(new ValidationPipe)
    async addEvent(@Body() myobj: AdminEventAnnouncementDTO, @UploadedFile() myfile: Express.Multer.File): Promise<AdminEventAnnouncementDTO> {
        myobj.filename = myfile.filename;
        return this.adminService.addEvent(myobj);
    }
}
