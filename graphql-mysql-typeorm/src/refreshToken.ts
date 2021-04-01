import { Request, Response } from 'express';
import User from './entity/User';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from './lib/jwt';

export async function refreshToken(req: Request, res: Response) {
  const token = req.cookies.jid;
  if (!token) return res.send({ ok: false, accessToken: '' });
  let payload: any = null;
  try {
    payload = verifyRefreshToken(token);
  } catch (e) {
    return res.send({ ok: false, accessToken: '' });
  }
  const { userId, exp, tokenVersion } = payload;

  // user와 tokenVersion 유효성 검사
  const user = await User.findOne({ where: { id: userId } });
  if (!user || user.tokenVersion !== tokenVersion) {
    return res.send({ ok: false, accessToken: '' });
  }

  // refreshToken 재발급
  const afterOneDay = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
  if (exp < afterOneDay) {
    const newTokenVersion = user.tokenVersion + 1;
    res.cookie(
      'jid', 
      generateRefreshToken(user.userId, newTokenVersion),
      { httpOnly: true }
    );
    Object.assign(user, { tokenVersion: newTokenVersion });
    await user.save();
  }

  return res.send({
    ok: true,
    accessToken: generateAccessToken(userId)
  });
}