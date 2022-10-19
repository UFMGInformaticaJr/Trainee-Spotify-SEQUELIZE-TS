import { Router, Request, Response, NextFunction } from 'express';
import { UserSongService } from '../services/UserSongService';
import { verifyJWT } from '../../../middlewares/auth-middlewares';
import { statusCodes } from '../../../../constants/statusCodes';

export const router = Router();

router.post('/:id',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserSongService.create(req.user.id, req.params.id!);
      res.status(statusCodes.created).end();
    } catch (error) {
      next(error);
    }
  },
);

router.get('/users/:id',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try{
      const songs = await UserSongService.getAllSongsByUser(req.params.id!);
      res.status(statusCodes.success).json(songs);
    }catch (error){
      next(error);
    }
  },
);

router.get('/songs/:id',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserSongService.getAllUsersBySong(req.params.id!);
      res.status(statusCodes.success).json(users);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/songs/:id',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserSongService.delete(req.user.id, req.params.id!);
      res.status(statusCodes.noContent).end();
    } catch (err) {
      next(err);
    }
  }
);