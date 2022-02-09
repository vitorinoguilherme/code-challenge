import { v4 as uuidv4 } from 'uuid';

import IAccountDTO from 'dtos/IAccountDTO';
import IAccountsRepository from '../IAccountsRepository';

import Account from '@modules/accounts/infra/typeorm/entities/Account';

class FakeAccountsRepository implements IAccountsRepository {
  private accounts: Account[] = [];

  public async findByCPF(CPF: String): Promise<Account | undefined> {
    const findAccount = await this.accounts.find(
      (account) => account.CPF === CPF,
    );

    return findAccount;
  }

  public async create(data: IAccountDTO): Promise<Account> {
    const account = new Account();

    Object.assign(account, { id: uuidv4(), balance: 0 }, data);

    this.accounts.push(account);
    return account;
  }

  public async save(account: Account): Promise<Account> {
    const findIndex = this.accounts.findIndex(
      (findAccount) => findAccount.id === account.id,
    );

    this.accounts[findIndex] = account;

    return account;
  }
}

export default FakeAccountsRepository;
