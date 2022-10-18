/* eslint-disable no-unused-vars */
import { JsonWebTokenError } from 'jsonwebtoken';
import { NotAuthorizedError } from '../../errors/NotAuthorizedError';
import { InvalidParamError } from '../../errors/InvalidParamError';
import { TokenError } from '../../errors/TokenError';
import { QueryError } from '../../errors/QueryError';
import { statusCodes } from '../../constants/statusCodes';
import { Request, Response, NextFunction } from 'express';

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  let message = error.message;
  let status = statusCodes.internalServerError;

  if (error instanceof JsonWebTokenError ||
    error instanceof NotAuthorizedError) {
    status = statusCodes.forbidden;
  }

  if (error instanceof InvalidParamError) {
    status = statusCodes.badRequest;
  }

  if (error instanceof TokenError) {
    status = statusCodes.notFound;
  }

  if (error instanceof QueryError) {
    status = statusCodes.badRequest;
  }

  console.log(error);
  res.status(status).json(message);
}