import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BaseEntity } from 'typeorm';

@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    unsigned: true
  })
  id: number;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  fullName: string;

  @Column('bigint', { unsigned: true })
  phone: number;

  @BeforeInsert()
  setId() 
     {
      this.id = Math.floor(Math.random() * 1000);
  }
}
