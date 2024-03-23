// book.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
