import { Entity, Column, PrimaryGeneratedColumn ,CreateDateColumn} from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  date: Date;

  @Column()
  productName: string;

  @Column()
  quantity: number;

  @Column()
  totalPrice: number;
}
