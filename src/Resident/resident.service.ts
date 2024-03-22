import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResidentEntity } from './ENTITY/resident.entity';
import { registrationDTO } from './DTO/resident.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ResidentService {
  constructor(
    @InjectRepository(ResidentEntity)
    private residentRepo: Repository<ResidentEntity>,
  ) {}

  //--------------------------------user registration
  async registration(
    registrationDTO: registrationDTO,
  ): Promise<ResidentEntity[]> {
    const newUser = new ResidentEntity();
    newUser.name = registrationDTO.name;
    newUser.email = registrationDTO.email;
    newUser.password = registrationDTO.password;
    newUser.phone = registrationDTO.phone;
    newUser.role = registrationDTO.role;
    const res = await this.residentRepo.save(newUser);
    return [res];
  }

  async login(email: string, password: string): Promise<ResidentEntity | null> {
    const user = await this.residentRepo.findOne({
      where: { email, password },
    });
    return user || null;
  }
}
