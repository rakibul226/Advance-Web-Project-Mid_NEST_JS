import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  // Add more fields as needed...
}







