import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('resident')
export class ResidentEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true })
  // @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @OneToMany(() => MyProductEntity, (myProduct) => myProduct.resident)
  products: MyProductEntity[];
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

  @ManyToOne(() => ResidentEntity, (resident) => resident.products)
  resident: ResidentEntity;

  // @ManyToOne(() => allProductEntity)
  // product: allProductEntity;
}

// @Entity('userProfile')
// export class uploadEntity {
//   @PrimaryGeneratedColumn()
//   id: number;
//   @Column({ type: 'varchar', length: 100 })
//   eventName: string;
//   @Column()
//   filename: string;
// }

export class UpdateResidentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
}
