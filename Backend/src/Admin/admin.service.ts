import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { AdminEntity } from './admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResidentEntity } from 'src/Resident/ENTITY/resident.entity';
import { AdminRegistrationDTO, UserUpdateDTO } from './admin.dto';
import { Like } from 'typeorm';
import { registrationDTO } from 'src/Resident/DTO/resident.dto';
import { AdminAnnouncedEventEntity, AdminAnnouncedPostEntity, AdminEntity } from './admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminAnnouncedEventEntity)
    private adminRepo: Repository<AdminAnnouncedEventEntity>,
    @InjectRepository(ResidentEntity)
    private residentRepo: Repository<ResidentEntity>,
    @InjectRepository(AdminEntity)
    private adminRegistrationRepo: Repository<AdminEntity>,
    @InjectRepository(AdminAnnouncedPostEntity)
    private adminAnnouncedPostRepo: Repository<AdminAnnouncedPostEntity>,
  ) {}

  // registration
  async registration(
    adminRegistrationDTO: AdminRegistrationDTO,
  ): Promise<AdminEntity[]> {
    const newUser = new AdminEntity();
    newUser.name = adminRegistrationDTO.name;
    newUser.email = adminRegistrationDTO.email;
    const hashedPassword = await bcrypt.hash(adminRegistrationDTO.password, 10);
    newUser.password = hashedPassword;
    newUser.phone = adminRegistrationDTO.phone;
    const res = await this.adminRegistrationRepo.save(newUser);
    return [res];
  }

  //Login
  async login(email: string, password: string): Promise<AdminEntity> {
    const user = await this.adminRegistrationRepo.findOne({
      where: { email },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return user;
  } 

  // get all residents
  async getAllUsers(): Promise<ResidentEntity[]> {
    return this.residentRepo.find();
  }

  // get resident by email
  async getUserByEmail(email: string): Promise<ResidentEntity> {
    return this.residentRepo.findOneBy({ email: email });
  }

  // delete resident by id
  deleteUserById(id: number): object {
    return this.residentRepo.delete({id: id})
  }

  // update resident information by id
  async updateUserById(id: number, data: UserUpdateDTO): Promise<ResidentEntity> {
  await this.residentRepo.update(id, data);
  return this.residentRepo.findOneBy({ id });
  }


  // get residents by partial match(Search by name)
  getUsersByName(name:string): Promise<ResidentEntity[]>{
    return this.residentRepo.find({
        where: {
            name: Like(`%${name}%`),
        },
    });
  }

  // add new resident
  async addUser(user:registrationDTO):Promise<registrationDTO>{
    await this.residentRepo.save(user); 
    return user;  
  }

  // local event announcement
  async addEvent(myobj: AdminAnnouncedEventEntity): Promise<AdminAnnouncedEventEntity> {
    return await this.adminRepo.save(myobj);
  }

  // announcement
  async addPost(adminId: string, post: AdminAnnouncedPostEntity): Promise<AdminAnnouncedPostEntity> {
    console.log(adminId);
    const admin = await this.adminRegistrationRepo.findOneBy({adminId: adminId});
    post.admin = admin;
    return this.adminAnnouncedPostRepo.save(post);
  }

  // get all events
  async getAllEvents(): Promise<AdminAnnouncedEventEntity[]> {
    return this.adminRepo.find();
  }

  // get all announcements
  async getAllPosts(): Promise<AdminAnnouncedPostEntity[]> {
    return this.adminAnnouncedPostRepo.find();
  }
}
