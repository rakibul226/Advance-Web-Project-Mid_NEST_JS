/// <reference types="multer" />
import { ResidentEntity } from 'src/Resident/ENTITY/resident.entity';
import { AdminService } from './admin.service';
import { AdminRegistrationDTO, AdminEventAnnouncementDTO, UserUpdateDTO } from './admin.dto';
import { registrationDTO } from 'src/Resident/DTO/resident.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    registration(adminRegistrationDTO: AdminRegistrationDTO): any;
    getAllUsers(): Promise<ResidentEntity[]>;
    getUserByEmail(email: string): object;
    deleteUserById(id: number): object;
    updateUserbyID(id: number, data: UserUpdateDTO): object;
    getUsersByName(name: string): Promise<ResidentEntity[]>;
    addUser(user: registrationDTO): Promise<registrationDTO>;
    addEvent(myobj: AdminEventAnnouncementDTO, myfile: Express.Multer.File): Promise<AdminEventAnnouncementDTO>;
}
