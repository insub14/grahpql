import bcrypt, { compare } from 'bcrypt';
import { Request, Response } from 'express';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import User from "../entity/User";
import { generateAccessToken, generateRefreshToken } from '../lib/jwt';
import { isAuth } from '../middlewares/isAuthMiddleware';
import { Context } from '../types/context';
import { LoginInput, LoginResponse } from "../types/user";
import { UpdateUserInput, UserInput } from "../types/userInput";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getAllUsers() {
    try {
      return await User.find();
    } catch (e) {
      return e;
    }
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async getUser(@Ctx() { payload }: Context) {
    try {
      return await User.findOne({ where: { id: payload!.userId } });
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

  @Mutation(() => Boolean)
  async register(@Arg('data') data: LoginInput): Promise<Boolean> {
    try {
      const { email, password } = data;
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.insert({ email, password: hashedPassword });
      return true;
    } catch (e) {
      return e;
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('data') data: LoginInput,
    @Ctx() { res }: Context,
  ): Promise<LoginResponse> {
    try {
      const { email, password } = data;
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error(`user not found #${email}`);
      const valid = await compare(password, user.password);
      if (!valid) throw new Error(`password not matched`);
      res.cookie(
        'jid',
        generateRefreshToken(user.userId, user.tokenVersion),
        {
          httpOnly: true
        }
      )
      return { accessToken: generateAccessToken(user.userId) };
    } catch (e) {
      return e;
    }
  }
  
}