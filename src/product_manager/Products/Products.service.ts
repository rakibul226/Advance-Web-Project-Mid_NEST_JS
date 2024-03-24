import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Productentity } from './Products.entity';

import { Repository } from 'typeorm';
import {CreateProductDTO, UpdateProductDTO } from './Products.dto'




  @Injectable()
  export class ProductService {
    constructor(
     
      @InjectRepository(Productentity)
      private productRepo: Repository<Productentity>,
    ) {}
   
    async create(createproductDTO: CreateProductDTO): Promise<Productentity> {
      return this.productRepo.save(createproductDTO);
    }
  
    async getAllUsers(): Promise<Productentity[]> {
      return this.productRepo.find();
    }
  
  
    async findOne(id: number): Promise<Productentity | undefined> {
      return await this.productRepo.findOne({where:{id}});
    }
  
    async update(id: number, updateproductDTO: UpdateProductDTO): Promise<Productentity | undefined> {
      await this.productRepo.update(id,updateproductDTO);
      return this.findOne(id);
    }
  
    async remove(id: number): Promise<void> {
      await this.productRepo.delete(id);
    }
  }

 