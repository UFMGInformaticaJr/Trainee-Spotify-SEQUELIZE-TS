import { Router, Request, Response, NextFunction } from 'express';
import { SongService } from'../services/SongService';
import { verifyJWT, checkRole } from '../../../middlewares/auth-middlewares';
import { statusCodes } from '../../../../utils/constants/status-codes';
import { userRoles } from '../../users/constants/userRoles';

export const router = Router();

router.post('/',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await SongService.create(req.body);
      res.status(statusCodes.CREATED).end();
    } catch (error) {
      next(error);
    }
  },
);

router.get('/',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try{
      const songs = await SongService.getAll();
      res.status(statusCodes.SUCCESS).json(songs);
    }catch (error){
      next(error);
    }
  },
);

router.get('/:id',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const song = await SongService.getById(req.params.id!);
      res.status(statusCodes.SUCCESS).json(song);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/song/random',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try{
      const song = await SongService.getRandomSong();
      res.status(statusCodes.SUCCESS).json(song);
    }catch (error){
      next(error);
    }
  },
);

router.get('/artist/:id',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try{
      const song = await SongService.getSongsByArtist(req.params.id!);
      res.status(statusCodes.SUCCESS).json(song);
    }catch (error){
      next(error);
    }
  },
);

router.put('/:id',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await SongService.update(req.params.id!, req.body);
      res.status(statusCodes.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id',
  verifyJWT,
  checkRole([userRoles.admin]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await SongService.delete(req.params.id!);
      res.status(statusCodes.NO_CONTENT).end();
    } catch (err) {
      next(err);
    }
  }
);

