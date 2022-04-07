import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const verify = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (token) {
    const accessToken = token.split(' ')[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY as string, (err: any, user: any) => {
      if (err) {
        res.status(403).json('Token is not valid!');
      }
      next();
    });
  } else {
    res.status(401).json("You're not authenticated");
  }
};
interface User {
  id: string;
  role: number
}
export const generateAccessToken = (user: User) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_ACCESS_KEY as string,
    { expiresIn: '2h' }
  );
};

export default verify;
