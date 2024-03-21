import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('resident')
export class ResidentEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  fullName: string;

  @Column({ unsigned: true })
  age: number;
  @Column({ default: 'active', enum: ['active', 'inactive'] })
  status: string;
}
