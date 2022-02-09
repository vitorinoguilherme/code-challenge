import { Router } from 'express';

import accountsRouter from '@modules/accounts/infra/http/routes/accounts.routes';
import transactionsRouter from '@modules/accounts/infra/http/routes/transactions.routes';

const routes = Router();

routes.use('/accounts', accountsRouter);
routes.use('/transactions', transactionsRouter);

export default routes;
