import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductmanagerEntity } from './Productmanager.entity';

//import { registrationDTO } from './Productmanager.dto';
import { Repository } from 'typeorm';



  @Injectable()
  export class ProductmanagerService {
    constructor(
      @InjectRepository(ProductmanagerEntity)
      private ProductmanagerRepo: Repository<ProductmanagerEntity>,
     
    ) {}
  




  async login(email: string, password: string): Promise<ProductmanagerEntity> {
    const user = await this.ProductmanagerRepo.findOne({
      where: { email, password },
    });
    return user;
  }


}
