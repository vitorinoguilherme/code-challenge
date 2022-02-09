import 'reflect-metadata';
import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container/index';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(express.json());
app.use(routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.log(error);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log('🚀 Server Started on port 3333');
});
