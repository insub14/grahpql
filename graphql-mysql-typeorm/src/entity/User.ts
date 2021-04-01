import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Project from "./Project";

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @Field(() => Int )
  @PrimaryGeneratedColumn({ name: "user_id" })
  userId: number;
  
  @Field()
  @Column({ name: "email" })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @CreateDateColumn()
  @Column('timestamp', { name: "created_at" })
  createdAt: string;

  @Field()
  @UpdateDateColumn()
  @Column('timestamp', { name: "updated_at" })
  updatedAt: string;

  @Field()
  @Column({ name: "used_fg", default: "1" })
  usedFg: string;

  @OneToMany(() => Project, (project) => project.user)
  @Field(() => [Project])
  projects: Project[];

}