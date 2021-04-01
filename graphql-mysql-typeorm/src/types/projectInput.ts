import { StringValueNode } from "graphql";
import { Field, InputType } from "type-graphql";
import Project from "../entity/Project";

@InputType()
export class ProjectInput implements Partial<Project> {
  @Field()
  title: string;

  @Field({ nullable: true })
  content?: string;
}

@InputType()
export class UpdateProjectInput implements Partial<Project> {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;
}