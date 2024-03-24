import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class ResidentEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  role: string;
}

//---------------------------------All book entity
@Entity('all_book')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  category: string;

  @Column()
  price: number;

  @Column()
  quantity: number;
}

//---------------------------------My book entity
@Entity('myBook')
export class MyBookEntity {
  @PrimaryColumn()
  Product_ID: number;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  category: string;

  @Column()
  price: number;
}
//---------------------------------ALL product entity
@Entity('allProduct')
export class AllProductEntity {
  @PrimaryColumn()
  product_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  quantity: number;
}

//---------------------------------myProduct entity
@Entity('myProduct')
export class MyProductEntity {
  @PrimaryColumn()
  product_id: number;

  @Column()
  name: string;

  @Column()
  totalPrice: number;

  @Column()
  quantity: number;

  // @ManyToOne(() => allProductEntity)
  // product: allProductEntity;
}
