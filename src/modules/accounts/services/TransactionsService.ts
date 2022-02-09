import { injectable, inject } from 'tsyringe';

import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';

import Account from '@modules/accounts/infra/typeorm/entities/Account';
import AppError from '@shared/errors/AppError';

interface IRequest {
  CPF: string;
  value: number;
  type: 'income' | 'outcome';
  account_CPF?: string; // only for transfer between accounts
}

@injectable()
class TransactionsService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) { }

  public async execute({
    CPF,
    value,
    type,
    account_CPF,
  }: IRequest): Promise<Account> {
    let account: Account;

    if (!['income', 'outcome'].includes(type)) {
      throw new AppError('Transaction type is invalid');
    }

    if (value <= 0 || value > 2000) {
      throw new AppError(
        'Transfer must be greater than zero and less than 2000.',
      );
    }

    const originAccount = await this.accountsRepository.findByCPF(CPF);

    if (!originAccount) {
      throw new AppError('Account not found.');
    }

    if (type === 'outcome') {
      if (originAccount.balance < value) {
        throw new AppError('You do not have enough balance.');
      }

      if (!account_CPF) {
        throw new AppError('Destination Account not found.');
      }

      const destinationAccount = await this.accountsRepository.findByCPF(
        account_CPF,
      );

      if (!destinationAccount) {
        throw new AppError('Destination Account not found.');
      }

      originAccount.balance = Number(originAccount.balance) - value;
      destinationAccount.balance = Number(destinationAccount.balance) + value;

      await this.accountsRepository.save(destinationAccount);
    }

    if (type === 'income') {
      originAccount.balance = Number(originAccount.balance) + value;
    }

    account = await this.accountsRepository.save(originAccount);

    return account as Account;
  }
}

export default TransactionsService;
