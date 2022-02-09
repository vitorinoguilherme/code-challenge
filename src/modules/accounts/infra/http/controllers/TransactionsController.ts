import { Request, Response } from 'express';
import { container } from 'tsyringe';

import TransactionsService from '@modules/accounts/services/TransactionsService';

export default class TransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { CPF, value, type, account_CPF } = req.body;

    const createTransaction = container.resolve(TransactionsService);

    const account = await createTransaction.execute({
      CPF, // your account
      value,
      type,
      account_CPF, // destination account
    });

    return res.json(account);
  }

  public async read();
}
