import {
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("movies")
class Movie extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column()
  name: string;

  @Column()
  year: string;

  @Column()
  genre: string;

  @Column("text")
  description: string;

  @Column({ nullable: true })
  cover: string;

  @Column({ nullable: true })
  IMBd_id: string;

  @Column({ nullable: true })
  IMBd_rait: string;

  @Column({ nullable: true })
  IMBd_rait_update: string;

  @Column({
    array: true,
    default: [],
  })
  likes: string;

  @Column({
    array: true,
    default: [],
  })
  dislikes: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn({})
  updateAt: Date;
}

export default Movie;
