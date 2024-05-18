import { Repository } from 'typeorm';
import { ResidentEntity } from 'src/Resident/ENTITY/resident.entity';
import { AdminRegistrationDTO, UserUpdateDTO } from './admin.dto';
import { registrationDTO } from 'src/Resident/DTO/resident.dto';
import { AdminAnnouncedEventEntity, AdminEntity } from './admin.entity';
export declare class AdminService {
    private adminRepo;
    private residentRepo;
    private adminRegistrationRepo;
    constructor(adminRepo: Repository<AdminAnnouncedEventEntity>, residentRepo: Repository<ResidentEntity>, adminRegistrationRepo: Repository<AdminEntity>);
    registration(adminDTO: AdminRegistrationDTO): Promise<AdminEntity[]>;
    getAllUsers(): Promise<ResidentEntity[]>;
    getUserByEmail(email: string): Promise<ResidentEntity>;
    deleteUserById(id: number): object;
    updateUserById(id: number, data: UserUpdateDTO): Promise<ResidentEntity>;
    getUsersByName(name: string): Promise<ResidentEntity[]>;
    addUser(user: registrationDTO): Promise<registrationDTO>;
    addEvent(myobj: AdminAnnouncedEventEntity): Promise<AdminAnnouncedEventEntity>;
}
