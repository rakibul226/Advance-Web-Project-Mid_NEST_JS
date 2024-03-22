import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistrationEntity } from './Entity/registration.entity';
import { RegistrationDTO } from './DTO/registration.dto';

@Injectable()
export class LibraryService {

  constructor(
    @InjectRepository(RegistrationEntity)
    private libraryRepo: Repository<RegistrationEntity>,
  ) {}

  //--------------------------------user registration
  async registration(
    registrationDTO: RegistrationDTO,
  ): Promise<RegistrationEntity[]> {
    const newUser = new RegistrationEntity();
    newUser.name = registrationDTO.name;
    newUser.email = registrationDTO.email;
    newUser.password = registrationDTO.password;
    newUser.role = registrationDTO.role;
    const lib = await this.libraryRepo.save(newUser);
    return [lib];
  }

  async login(email: string, password: string): Promise<RegistrationEntity | null> {
    const user = await this.libraryRepo.findOne({
      where: { email, password },
    });
    return user || null;
  }
}