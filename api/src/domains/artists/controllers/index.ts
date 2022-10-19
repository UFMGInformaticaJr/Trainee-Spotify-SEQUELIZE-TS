import { Router, Request, Response, NextFunction } from 'express';
import { ArtistService } from '../services/ArtistService';
import { verifyJWT, checkRole } from '../../../middlewares/auth-middlewares';
import { userRoles } from '../../users/constants/userRoles';
import { statusCodes } from '../../../../constants/statusCodes';

export const router = Router();

router.post('/',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ArtistService.create(req.body);
      res.status(statusCodes.created).end();
    } catch (error) {
      next(error);
    }
  },
);

router.get('/',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try{
      const artists = await ArtistService.getAll();
      res.status(statusCodes.success).json(artists);
    }catch (error ){
      next(error);
    }
  },
);

router.get('/:id',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const artist = await ArtistService.getById(req.params.id!);

      res.status(statusCodes.success).json(artist);
    } catch (error) {
      next(error);
    }
  },
);

router.put('/:id',
  verifyJWT,
  checkRole([userRoles.admin]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ArtistService.update(req.params.id!, req.body);

      res.status(statusCodes.noContent).end();
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
      await ArtistService.delete(req.params.id!);

      res.status(statusCodes.success).end();
    } catch (err) {
      next(err);
    }
  }
);