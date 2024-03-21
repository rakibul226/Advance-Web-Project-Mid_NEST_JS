import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResidentEntity } from './ENTITY/resident.entity';
import { AddResidentDTO } from './DTO/resident.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ResidentService {
  constructor(
    @InjectRepository(ResidentEntity)
    private residentRepo: Repository<ResidentEntity>,
  ) {}

  //create new user
  async addResident(addResidentDTO: AddResidentDTO): Promise<ResidentEntity[]> {
    const newResident = new ResidentEntity();
    newResident.fullName = addResidentDTO.fullName;
    newResident.age = addResidentDTO.age;
    newResident.status = addResidentDTO.status;
    const res = await this.residentRepo.save(newResident);
    return [res];
  }
}
