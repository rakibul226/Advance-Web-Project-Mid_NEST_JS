import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn,} from "typeorm";


@Entity("adminAnnouncedEvent")
export class AdminAnnouncedEventEntity{

    @PrimaryGeneratedColumn() 
    id: number;
    @Column({ type: 'varchar', length: 100, })
    eventName: string;
    @Column()
    filename: string;
}