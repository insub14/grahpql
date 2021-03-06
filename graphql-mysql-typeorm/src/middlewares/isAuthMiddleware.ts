import { MiddlewareFn } from "type-graphql";
import { verifyAccessToken } from "../lib/jwt";
import { Context } from "../types/context";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  const { authorization } = context.req.headers;
  if (!authorization) throw new Error('not authenticated');
  try {
    const token = authorization.split(' ')[1];
    const payload = verifyAccessToken(token);
    context.payload = payload as any;
  } catch (e) {
    console.log(e)
    throw new Error('not authenticated');
  }
  return next();
}