import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistrationEntity } from './Entity/registration.entity';
import {  RegistrationDTO } from './DTO/registration.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LibraryService {
  verifiPassword: any;
  constructor(
    @InjectRepository(RegistrationEntity)
    private libraryRepo: Repository<RegistrationEntity>,
  ) {}

  //--------------------------------user registration
  async registration(
    registrationDTO: RegistrationDTO,
  ): Promise<RegistrationEntity[]> {
    const hashedPassword = await bcrypt.hash(registrationDTO.password, 10);
    const newUser = new RegistrationEntity();
    newUser.name = registrationDTO.name;
    newUser.email = registrationDTO.email;
    newUser.password = hashedPassword; // Use hashed password
    const lib = await this.libraryRepo.save(newUser);
    return [lib];
  }
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10); 
  }
  async verifyPassword(providedPassword: string, storedHash: string): Promise<boolean> {
    return bcrypt.compare(providedPassword, storedHash);
  }

  async login(
    email: string,
    password: string,
  ): Promise<RegistrationEntity | null> {
    const user = await this.libraryRepo.findOne({
      where: { email,},
    });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return user || null;
  }
  
}



  
