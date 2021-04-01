import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import Project from "../entity/Project";
import User from "../entity/User";
import { ProjectInput, UpdateProjectInput } from "../types/projectInput";

@Resolver()
export class ProjectResolver {
  @Query(() => [Project])
  async getProjects() {
    return await Project.find({ relations: ['user', 'user.projects']})
  }

  @Query(() => [Project])
  async getProjectsByUser(@Arg('userId') userId: number) {
    try {
      return await Project.find({ where: { ownerId: userId } });
    } catch (e) {
      return  e;
    }
  }

  @Query(() => Project)
  async getProject(@Arg('projectId') projectId: number) {
    try {
      return await Project.findOne({ where: { projectId } });
    } catch (e) {
      return e;
    }
  }

  @Mutation(() => Int)
  async createProject(
    @Arg('userId') userId: number, 
    @Arg('data') data: ProjectInput
  ) {
    try {
      const user = await User.findOne({ where: { userId } });
      if(!user) throw new Error(`${userId} user not found`);
      console.log('user');
      console.log(user);
      const { content, title } = data;
      const result = await Project.insert({ content, title, user: { userId } });
      console.log(result.identifiers);
      return result.identifiers[0].projectId;
    } catch (e) {
      return e;
    }
  }

  @Mutation(() => Int)
  async updateProject(
    @Arg('projectId') projectId: number,
    @Arg('data') data: UpdateProjectInput
  ) {
    try {
      const project = await Project.findOne({ where: { projectId } });
      if (!project) throw new Error(`#${projectId} project not found`);
      Object.assign(project, data);
      const result = await project.save();
      console.log(result.projectId);
      return result.projectId;
    } catch (e) {
      return e;
    }
  }

  @Mutation(() => Int)
  async deleteProject(@Arg('projectId') projectId: number) {
    try {
      const project = await Project.findOne({ where: { projectId } });
      if(!project) throw new Error(`#${projectId} project not found`);
      project.usedFg = '0';
      const result = await project.save();
      return result.projectId;
    } catch (e) {
      return e;
    }
  }

}