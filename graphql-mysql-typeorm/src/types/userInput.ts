import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import User from "../entity/User";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(6, 12)
  password: string;

}

@InputType()
export class UpdateUserInput implements Partial<User> {
  @Field()
  @Length(6, 12)
  password: string;
}