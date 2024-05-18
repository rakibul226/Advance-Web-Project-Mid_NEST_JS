import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Productmanagers')
export class ProductmanagerEntity {
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


}



