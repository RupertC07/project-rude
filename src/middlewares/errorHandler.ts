import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';
import ApiResponse from '../utils/ApiResponse';


interface CustomError extends Error {
  status?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request & { user?: { id?: string }; id?: string },
  res: Response,
  next: NextFunction
) => {

  logger.error({
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    userId: req.user?.id,
    timestamp: new Date().toISOString()
  });

  const status = err.status || 500;

  return ApiResponse.failed({
    res,
    data:null,
    message: err.message,
    code: status,
    requestId: req.id
  })
};
