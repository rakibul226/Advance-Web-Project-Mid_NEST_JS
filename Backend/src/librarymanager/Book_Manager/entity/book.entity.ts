// book.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Timestamp, PrimaryColumn } from 'typeorm';

@Entity('all_book')
export class BookEntity {
  @PrimaryGeneratedColumn({unsigned:true})
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;
  @Column()
  category:string;
  @Column()
  price:number;
  @Column()
  quantity:number;
}
@Entity('library_cards')
export class LibraryCardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
  @Column()
  email:string;

}
//@Entity('myBook')
//export class MyBookEntity {
  //@PrimaryColumn()
  //Product_ID: number;
 
 // @Column()
  //name: string;
 
  //@Column()
  //author: string;
 
 // @Column()
 // category: string;
//}
// customer-orders/entity/

@Entity('customer_orders')
export class CustomerOrderEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  author: string;
  @Column()
  category: string;
 
}

