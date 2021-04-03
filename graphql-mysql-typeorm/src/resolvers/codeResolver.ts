import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CodeInput, UpdateCodeInput } from "../types/codeInputs";
import Code from "../entity/Code";

@Resolver()
export class CodeResolver {
  @Query(() => [Code])
  async getCodeList() {
    try {
      return await Code.find();
    } catch (e) {
      return e;
    }
  }

  @Query(() => Code)
  async getCode(@Arg('codeId') codeId: number) {
    try {
      return await Code.findOne({ where: { codeId } });
    } catch (e) {
      return e;
    }
  }

  @Mutation(() => Boolean)
  async createCode(@Arg('data') data: CodeInput) {
    try {
      const { codeLabel, pCode, memo, code } = data;
      await Code.insert({ codeLabel, pCode, memo, code });
      return true;
    } catch (e) {
      return e;
    }
  }

  @Mutation(() => Boolean)
  async updateCode(
    @Arg('codeId') codeId: number,
    @Arg('data') data: UpdateCodeInput
  ) {
    try {
      const code = await Code.findOne({ where: { codeId } });
      if (!code) throw new Error(`code not found #${codeId}`);
      Object.assign(code, data);
      await code.save();
      return true;
    } catch (e) {
      return e;
    }
  } 

  @Mutation(() => Boolean)
  async deleteCode(@Arg('codeId') codeId: number) {
    try {
      const code = await Code.findOne({ where: { codeId } });
      if (!code) throw new Error(`code not found #${codeId}`);
      code.usedFg = '0';
      await code.save();
      return true;
    } catch (e) {
      return e;
    }
  }
}