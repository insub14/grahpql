import { Int, ObjectType, Field } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "./User";

@ObjectType()
@Entity()
export default class Project extends BaseEntity {
  @Field(() => Int )
  @PrimaryGeneratedColumn({ name: "project_id"})
  projectId: number;

  @Field()
  @Column()
  title?: string;

  @Field()
  @Column()
  content?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: string;

  @ManyToOne(() => User, (user) => user.projects, {
    onDelete: 'CASCADE',
  })

  @Field(() => User)
  @JoinColumn({ name: "owner_id" })
  user?: User;

  @Field()
  @Column({ name: "used_fg" })
  usedFg: string;
}