import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAccountService from '@modules/accounts/services/CreateAccountService';

export default class AccountsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, CPF } = req.body;

    const createAccount = container.resolve(CreateAccountService);

    const account = await createAccount.execute({
      name,
      CPF,
    });

    return res.json(account);
  }
}
