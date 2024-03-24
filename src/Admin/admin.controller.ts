import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ResidentEntity } from 'src/Resident/ENTITY/resident.entity';
import { AdminService } from './admin.service';
import { AdminRegistrationDTO, AdminEventAnnouncementDTO, UserUpdateDTO } from './admin.dto';
import { registrationDTO } from 'src/Resident/DTO/resident.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';

@Controller('/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // register as admin
  @Post('/registration')
  @UsePipes(ValidationPipe)
  registration(@Body() adminRegistrationDTO: AdminRegistrationDTO): any {
    return this.adminService.registration(adminRegistrationDTO);
  }
  // get all residents
  @Get('/getallresidents')
  getAllUsers(): Promise<ResidentEntity[]> {
    return this.adminService.getAllUsers();
  }

  // get resident by email
  @Get('getresident/:email')
  getUserByEmail(@Param('email') email: string): object {
    return this.adminService.getUserByEmail(email);
  }

  // delete resident by id
  @Delete('deleteresident/:id')
  deleteUserById(@Param('id', ParseIntPipe) id: number): object {
    return this.adminService.deleteUserById(id);
  }

  // update resident information by id
  @Put('/updateresident/:id')
  @UsePipes(new ValidationPipe())
  updateUserbyID(@Param('id', ParseIntPipe) id: number, @Body() data: UserUpdateDTO): object {
    return this.adminService.updateUserById(id, data);
  }


  // get resident by partial match(Search by name)
  @Get('getresidentsbyname/:name')
  getUsersByName(@Param('name') name: string){
      return this.adminService.getUsersByName(name);
  }

  // add resident
  @Post('/addresident')
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
