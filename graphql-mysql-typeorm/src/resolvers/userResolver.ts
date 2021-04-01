import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import User from "../entity/User";
import { UpdateUserInput, UserInput } from "../types/userInput";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getAllUsers() {
    return await User.find();
  }

  @Query(() => User, { nullable: true })
  async getUser(@Arg('userId') userId: number) {
    try {
      return await User.findOne({ where: {userId}});
    } catch (e) {
      return e;
    }
  }

  @Mutation(() => Boolean)
  async createUser(@Arg('data') data: UserInput) {
    try {
      const { email, password } = data;
      await User.insert({ email, password });
      return true;
    } catch (e) {
      return e;
    }
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg('userId') userId: number,
    @Arg('data') data: UpdateUserInput
  ) {
    try {
      const user = await User.findOne({ where: { userId } });
      if (!user) throw new Error(`user not found`);
      Object.assign(user, data);
      await user.save();
      return user;
    } catch (e) {
      return e;
    }
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('userId') userId: number) {
    try {
      const user = await User.findOne({ where: {userId} });
      if (!user) throw new Error(`user: ${userId} not found`);
      user.usedFg = '0';
      user.save();
      return true;
    } catch (e) {
      return e;
    }
  }
  
}