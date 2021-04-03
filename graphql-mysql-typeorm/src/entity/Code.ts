import { Int, ObjectType, Field } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity('tb_code')
export default class Code extends BaseEntity {
  @Field(() => Int )
  @PrimaryGeneratedColumn({ name: "code_id"})
  codeId: number;

  @Field()
  @Column({ name: "code" })
  code?: string;

  @Field()
  @Column({ name: "p_code" })
  pCode?: string;

  @Field()
  @Column({ name: "code_label" })
  codeLabel?: string;

  @Field()
  @Column({ name: "memo" })
  memo?: string;

  @Field()
  @CreateDateColumn()
  @Column({ name: "created_at" })
  createdAt?: string;

  @Field()
  @UpdateDateColumn()
  @Column({ name: "updated_at" })
  updatedAt?: string;

  @Field()
  @Column({ name: "used_fg", default: "1" })
  usedFg: string;

}