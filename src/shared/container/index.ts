import { container } from 'tsyringe';

import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';

import AccountsRepository from '@modules/accounts/infra/typeorm/repositories/AccountsRepository';

container.registerSingleton<IAccountsRepository>(
  'AccountsRepository',
  AccountsRepository,
);
