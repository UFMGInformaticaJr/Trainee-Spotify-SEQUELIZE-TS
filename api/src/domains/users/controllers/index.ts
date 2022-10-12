import { Router, Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { loginMiddleware,
  verifyJWT,
  checkRole,
  notLoggedIn } from '../../../middlewares/auth-middlewares.js';
import { userRoles } from '../../users/constants/userRoles.js';
import { statusCodes } from '../../../../constants/statusCodes.js';

export const router = Router();

router.post('/login', notLoggedIn, loginMiddleware);

router.post('/logout',
verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie('jwt');
      res.status(statusCodes.noContent).end();
    } catch (error) {
      next(error);
    }
  },
);

router.post('/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserService.create(req.body);
      res.status(statusCodes.created).end();
    } catch (error) {
      next(error);
    }
  },
);

router.get('/',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserService.getAll();
      res.status(statusCodes.success).json(users);
    } catch(error){
      next(error);
    }
  },
);


router.get('/user',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user) { 
        const user = await UserService.getById(req.user.id);
        res.status(statusCodes.success).json(user);
      }
    } catch (error) {
      next(error);
    }
  },
  );


router.get('/:id',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserService.getById(req.params.id);

      res.status(statusCodes.success).json(user);
    } catch (error) {
      next(error);
    }
  },
);


router.put('/:id',
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserService.update(req.params.id, req.body, req.user);
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
      await UserService.delete(req.params.id, req.user.id);
      res.status(statusCodes.noContent).end();
    } catch (err) {
      next(err);
    }
  });

