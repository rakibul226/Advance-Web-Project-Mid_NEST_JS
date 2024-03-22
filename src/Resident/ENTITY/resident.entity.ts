import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class ResidentEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  role: string;
}
