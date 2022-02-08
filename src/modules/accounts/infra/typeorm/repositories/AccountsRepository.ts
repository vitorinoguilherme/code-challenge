import { getRepository, Repository } from 'typeorm';

import IAccountDTO from 'dtos/IAccountDTO';
import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';

import Account from '@modules/accounts/infra/typeorm/entities/Account';

class AccountsRepository implements IAccountsRepository {
  private ormRepository: Repository<Account>;

  constructor() {
    this.ormRepository = getRepository(Account);
  }

  public async findByCPF(CPF: String): Promise<Account | undefined> {
    const findAccount = await this.ormRepository.findOne({
      where: {
        CPF,
      },
    });

    return findAccount;
  }

  public async create(data: IAccountDTO): Promise<Account> {
    const account = this.ormRepository.create(data);

    await this.ormRepository.save(account);

    return account;
  }

  public async save(account: Account): Promise<Account> {
    return this.ormRepository.save(account);
  }
}

export default AccountsRepository;
