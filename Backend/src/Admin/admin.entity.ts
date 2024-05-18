import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn,} from "typeorm";


@Entity('admin')
export class AdminEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  adminId: string;

  @Column({ nullable: false })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @OneToMany(() => AdminAnnouncedPostEntity, post => post.admin, { cascade: true })
  posts: AdminAnnouncedPostEntity[];
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

@Entity("adminAnnouncedPost")
export class AdminAnnouncedPostEntity{

    @PrimaryGeneratedColumn() 
    id: number;
    @Column({ type: 'varchar', length: 100, })
    post: string
    @ManyToOne(() => AdminEntity, admin => admin.posts)
    admin: AdminEntity;


}