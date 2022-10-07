import { sign, verify, JwtPayload } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { User } from '../domains/users/models/User.js';
import { PermissionError } from '../../errors/PermissionError.js';
import { statusCodes } from '../../constants/statusCodes.js';
import { PayloadParams } from '../domains/users/types/PayloadParams';
import { Request, Response, NextFunction } from 'express';

function generateJWT(user: PayloadParams, res: Response) {
  const body = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = sign({ user: body }, process.env.SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRATION });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
  });
}

function cookieExtractor(req: Request) {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }

  return token;
}

export async function loginMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findOne({where: {email: req.body.email}});
    if (!user) {
      throw new PermissionError('E-mail e/ou senha incorretos!');
    } else {
      const matchingPassword = await compare(req.body.password, user.password);
      if (!matchingPassword) {
        throw new PermissionError('E-mail e/ou senha incorretos!');
      }
    }

    generateJWT(user, res);

    res.status(statusCodes.noContent).end();
  } catch (error) {
    next(error);
  }
}

export function notLoggedIn(req: Request, res: Response, next: NextFunction) {
  try {
    const token = cookieExtractor(req);

    if (token) {
      const decoded = verify(token, process.env.SECRET_KEY);
      if (decoded) {
        throw new PermissionError('Você já está logado no sistema!');
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
  try {
    const token = cookieExtractor(req);
    if (token) {
      const decoded = verify(token, process.env.SECRET_KEY) as any;
      req.user = decoded.user;
    }

    if (!req.user) {
      throw new PermissionError(
        'Você precisa estar logado para realizar essa ação!');
    }
    next();
  } catch (error) {
    next(error);
  }
}

export const checkRole = (roles) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      ! roles.includes(req.user.role) ? res.json('Você não possui permissão para realizar essa ação') : next();
    } catch(error){
      next(error);
    }

  };
};