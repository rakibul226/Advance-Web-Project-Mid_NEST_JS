import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn,} from "typeorm";


@Entity('admin')
export class AdminEntity {
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

@Entity("adminAnnouncedEvent")
export class AdminAnnouncedEventEntity{

    @PrimaryGeneratedColumn() 
    id: number;
    @Column({ type: 'varchar', length: 100, })
    eventName: string;
    @Column()
    filename: string;
}