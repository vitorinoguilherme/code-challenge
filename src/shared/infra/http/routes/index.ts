import { Router } from 'express';

import accountsRouter from '@modules/accounts/infra/http/routes/accounts.routes';

const routes = Router();

routes.use('/accounts', accountsRouter);

export default routes;
