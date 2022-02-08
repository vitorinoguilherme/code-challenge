import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container/index';

const app = express();

app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log('🚀 Server Started on port 3333');
});
