import { Controller, Get } from '@nestjs/common';
import { SalesService } from './sales.service';
import { Sale } from './Sale.entity';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  findAll(): Promise<Sale[]> {
    return this.salesService.findAll();
  }
}
