import { Injectable } from '@nestjs/common';
// import { AdminEntity } from './admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResidentEntity } from 'src/Resident/ENTITY/resident.entity';
import { UserUpdateDTO } from './admin.dto';
import { Like } from 'typeorm';
import { registrationDTO } from 'src/Resident/DTO/resident.dto';
import { AdminAnnouncedEventEntity } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminAnnouncedEventEntity)
    private adminRepo: Repository<AdminAnnouncedEventEntity>,
    @InjectRepository(ResidentEntity)
    private residentRepo: Repository<ResidentEntity>,
  ) {}

  // get all users
  async getAllUsers(): Promise<ResidentEntity[]> {
    return this.residentRepo.find();
  }

  // get user by email
  async getUserByEmail(email: string): Promise<ResidentEntity> {
    return this.residentRepo.findOneBy({ email: email });
  }

  // delete user by id
  deleteUserById(id: number): object {
    return this.residentRepo.delete({id: id})
  }

  // update user information by id
  async updateUserById(id: number, data: UserUpdateDTO): Promise<ResidentEntity> {
  await this.residentRepo.update(id, data);
  return this.residentRepo.findOneBy({ id });
  }

  // update user role by id(User Role Assignment)
  async updateUserRoleById(id: number, data: UserUpdateDTO): Promise<ResidentEntity> {
    await this.residentRepo.update(id, data);
    return this.residentRepo.findOneBy({ id });
  }

  // get users by partial match(Search by name)
  getUsersByName(name:string): Promise<ResidentEntity[]>{
    return this.residentRepo.find({
        where: {
            name: Like(`%${name}%`),
        },
    });
  }

  // add new user
  async addUser(user:registrationDTO):Promise<registrationDTO>{
    await this.residentRepo.save(user); 
    return user;  
  }

  async addEvent(myobj: AdminAnnouncedEventEntity): Promise<AdminAnnouncedEventEntity> {
    return await this.adminRepo.save(myobj);
  }
}
