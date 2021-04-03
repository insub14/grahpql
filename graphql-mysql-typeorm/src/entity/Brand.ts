import { Int, ObjectType, Field } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity('tb_brand')
export default class Brand extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ name: 'brand_id' })
  brandId: number;

  @Field()
  @Column({ name: 'brand_name'})
  brandName: string;

  @Field()
  @Column({ name: 'brand_code' })
  brandCode: string;

  @Field()
  @Column()
  tag: string;

  @Field()
  @CreateDateColumn()
  @Column({ name: "created_at" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  @Column({ name: "updated_at" })
  updatedAt: Date;

  @Field()
  @Column({ name: "used_fg", default: "1" })
  usedFg: string;
}