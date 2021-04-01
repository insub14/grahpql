import { IsEmail, Length } from "class-validator";
import { ObjectType, Field, InputType } from "type-graphql";
import User from "../entity/User";

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;
}

@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(6, 12)
  password: string;
}