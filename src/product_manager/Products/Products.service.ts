import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Productentity ,ProductpictureEntity ,SaleEntity} from './Products.entity';
import {CommentEntity}from './Comment.entity'
import { Repository ,Between} from 'typeorm';
import {CreateProductDTO, UpdateProductDTO ,PostCommentDTO,GenerateReportDTO} from './Products.dto'
import { NotFoundException } from '@nestjs/common';




  @Injectable()
  export class ProductService {
   
    constructor(
      
      @InjectRepository(SaleEntity)
    private salesRepository: Repository<SaleEntity>,
      
      
      @InjectRepository(CommentEntity)
    private commentRepo: Repository<CommentEntity>,
      @InjectRepository(ProductpictureEntity)
    private productpicRepo: Repository<ProductpictureEntity>,
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




    async addEvent(myobj: ProductpictureEntity): Promise<ProductpictureEntity> {
      return await this.productpicRepo.save(myobj);
    }



    async addCommentToProduct(productId: number, commentDto: PostCommentDTO): Promise<CommentEntity> {
      const product = await this.productRepo.findOne({ where: { id: productId } });
      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }
      
      const comment = new CommentEntity();
      comment.content = commentDto.content;
      comment.product = product;
      
      return await this.commentRepo.save(comment);
    }



    async generateReport(startDate: Date, endDate: Date): Promise<any> {
      const sales = await this.salesRepository.find({
        where: {
          date: Between(startDate, endDate),
        },
      });
  
      const totalSales = sales.reduce((total, sale) => total + sale.amount, 0);
  
      return {
        totalSales,
        reportStartDate: startDate,
        reportEndDate: endDate,
      };
    }
  }

  

 