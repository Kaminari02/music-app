import {IRequest} from '../interfaces/IRequest';
import {NextFunction, Response} from 'express';
import {UserRole} from '../helpers/enums/UserRole.enum';

export const permitMiddleware = (...roles: UserRole[]) =>
  (req: IRequest, res: Response, next: NextFunction) => {
    if(!req.user) {
      res.sendStatus(401);
      return;
    }
    if(!roles.includes(req.user.role as UserRole)) {
      res.sendStatus(403);
      return;
    }
    next();
  };
