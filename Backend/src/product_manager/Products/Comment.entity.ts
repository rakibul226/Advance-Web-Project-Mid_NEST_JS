import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Productentity } from './Products.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Productentity, product => product.comments)
  product: Productentity;
}