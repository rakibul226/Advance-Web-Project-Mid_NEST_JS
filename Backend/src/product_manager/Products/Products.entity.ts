import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import { CommentEntity } from './Comment.entity';

@Entity('Productpicture')
export class ProductpictureEntity{

    @PrimaryGeneratedColumn() 
    id: number;
    @Column({ type: 'varchar', length: 100, })
    productname: string;
    @Column()
    filename: string;
}

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
  
  @OneToMany(() => CommentEntity, comment => comment.product, { cascade: true })
  comments: CommentEntity[];
}

@Entity('sale')
export class SaleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  date: Date;

  // Other relevant fields like productId, quantity, etc.
}






