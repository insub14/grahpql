import { ObjectType, Field, InputType } from "type-graphql";
import Code from "../entity/Code";

@InputType()
export class CodeInput implements Partial<Code> {
  @Field()
  code: string;

  @Field()
  pCode: string;

  @Field()
  codeLabel: string;

  @Field({ nullable: true })
  memo?: string;

}

@InputType()
export class UpdateCodeInput implements Partial<Code> {
  @Field({ nullable: true })
  code?: string;

  @Field({ nullable: true })
  pCode?: string;

  @Field({ nullable: true })
  codeLabel?: string;

  @Field({ nullable: true })
  memo?: string;

}