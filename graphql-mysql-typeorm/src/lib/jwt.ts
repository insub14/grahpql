import { sign, verify } from "jsonwebtoken";

export function generateAccessToken(id: number) {
  return sign(
    { userId: id }, 
    process.env.JWT_ACCESS_TOKEN_SECRET!,
    { expiresIn: '7d' }
  );
}

export function generateRefreshToken(id: number, tokenVersion: number) {
  return sign(
    { userId: id, tokenVersion }, 
    process.env.JWT_SECRET_REFRESH!, 
    { expiresIn: '7d' }
  );
}

export function verifyAccessToken(token: string) {
  return verify(token, process.env.JWT_ACCESS_TOKEN_SECRET!)
}

export function verifyRefreshToken(token: string) {
  return verify(token, process.env.JWT_SECRET_REFRESH!);
}