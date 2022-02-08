import { Router } from 'express';

import AccountsController from '../controllers/AccountsController';

const accountsRouter = Router();
const accountsController = new AccountsController();

accountsRouter.post('/', accountsController.create);

export default accountsRouter;
