import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';



@Entity('products')
export class Productentity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;
  
  @Column()
  quantity: number;
  // Add more fields as needed...
}



