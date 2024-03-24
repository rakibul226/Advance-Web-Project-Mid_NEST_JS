import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductmanagerEntity } from './Productmanager.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

import { RegistrationDTO } from './Productmanager.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto,UpdateProfileDTO } from './Productmanager.dto';
import { IsEmail } from 'class-validator';






  @Injectable()
  export class ProductmanagerService {
    constructor(
      @InjectRepository(ProductmanagerEntity)
      private ProductmanagerRepo: Repository<ProductmanagerEntity>,
     
    ) {}
    async register(registrationDTO: RegistrationDTO): Promise<ProductmanagerEntity> {
      const { name, email, password, phone, role } = registrationDTO;
      const hashedPassword = await bcrypt.hash(password, 10); // ensure bcrypt is installed and imported
  
      const newUser = this.ProductmanagerRepo.create({
        name,
        email,
        password: hashedPassword,
        phone,
       
      });
  
      await this.ProductmanagerRepo.save(newUser);
      return newUser;
    }

   

    async hashPassword(password: string): Promise<string> {
      return bcrypt.hash(password, 10); // The second parameter is the salt round
    }
    async verifyPassword(providedPassword: string, storedHash: string): Promise<boolean> {
      return bcrypt.compare(providedPassword, storedHash);
    }
    


    async login(email: string, password: string): Promise<ProductmanagerEntity | null> {
      const user = await this.ProductmanagerRepo.findOne({ where: { email } });
  
      if (user && await bcrypt.compare(password, user.password)) {
        return user; // Return the user data if the password is correct
      }
  
      return null; // Return null if the password is incorrect
    }
    async changePassword(email: string, changePasswordDto: ChangePasswordDto): Promise<void> {
      const user = await this.ProductmanagerRepo.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      const passwordValid = await bcrypt.compare(changePasswordDto.currentPassword, user.password);
      if (!passwordValid) {
        throw new BadRequestException('Invalid current password');
      }
  
      const newPasswordHash = await bcrypt.hash(changePasswordDto.newPassword, 10); // Hash the new password
      user.password = newPasswordHash; // Update the password
      await this.ProductmanagerRepo.save(user);
    }

    
    async getAllUsers(): Promise<ProductmanagerEntity[]> {
      return this.ProductmanagerRepo.find();
    }
  
  
    async findOne(id: number): Promise<ProductmanagerEntity | undefined> {
      return await this.ProductmanagerRepo.findOne({where:{id}});
    }
  
    async update(id: number, updateprofileDTO: UpdateProfileDTO): Promise<ProductmanagerEntity | undefined> {
      await this.ProductmanagerRepo.update(id,updateprofileDTO);
      return this.findOne(id);
    }
  











   /* async findById(id: number): Promise<ProductmanagerEntity | undefined> {
      return this.ProductmanagerRepo.findOneBy({ id });
    }
  
    async update(id: number, updateProfileDto: UpdateProfileDto): Promise<ProductmanagerEntity> {
      await this.ProductmanagerRepo.update(id, updateProfileDto);
      return this.findById(id);
    }*/
  }




   
  
    














/*
    async changePassword(email: string, changePasswordDto: ChangePasswordDto): Promise<void> {
      const user = await this.ProductmanagerRepo.findOne({ where: {  email } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
    
      const passwordValid = await this.verifyPassword(changePasswordDto.currentPassword, user.passwordHash);
      if (!passwordValid) {
        throw new BadRequestException('Invalid current password');
      }
    
      const newPasswordHash = await this.hashPassword(changePasswordDto.newPassword);
      user.passwordHash = newPasswordHash;
      await this.ProductmanagerRepo.save(user);
    }
   */ 



