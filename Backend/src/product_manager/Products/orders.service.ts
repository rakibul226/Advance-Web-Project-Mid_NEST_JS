import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  findOne(id: number): Promise<Order> {
    return this.ordersRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async updateStatus(id: number, status: string): Promise<void> {
    await this.ordersRepository.update(id, { status });
  }

  async remove(id: number): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}
