import { Injectable } from '@nestjs/common';
// import { AdminEntity } from './admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResidentEntity } from 'src/Resident/ENTITY/resident.entity';

@Injectable()
export class AdminService {
  constructor(
    // @InjectRepository(AdminEntity)
    // private adminRepo: Repository<AdminEntity>,
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
}
