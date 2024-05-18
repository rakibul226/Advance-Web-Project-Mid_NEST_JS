import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('librarian')
export class RegistrationEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
