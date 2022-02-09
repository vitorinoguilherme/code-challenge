import { injectable, inject } from 'tsyringe';

import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';

import Account from '@modules/accounts/infra/typeorm/entities/Account';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  CPF: string;
}

@injectable()
class CreateAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) { }

  public async execute({ name, CPF }: IRequest): Promise<Account> {
    const checkAccountExists = await this.accountsRepository.findByCPF(CPF);

    if (checkAccountExists) {
      throw new AppError('CPF already used.');
    }

    const account = await this.accountsRepository.create({
      name,
      CPF,
    });

    return account;
  }
}

export default CreateAccountService;
