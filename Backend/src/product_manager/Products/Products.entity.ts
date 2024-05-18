import { Column, Entity, PrimaryGeneratedColumn,OneToMany,CreateDateColumn } from 'typeorm';
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

  @CreateDateColumn()
  date: Date;

  @Column()
  productName: string;

  @Column()
  quantity: number;

  @Column()
  totalPrice: number;
}






