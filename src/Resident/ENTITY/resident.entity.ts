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
