import FakeAccountsRepository from '@modules/accounts/repositories/fakes/FakeAccountsRepository';

import CreateAccountService from './CreateAccountService';
import TransactionsService from './TransactionsService';

import Account from '../infra/typeorm/entities/Account';
import AppError from '@shared/errors/AppError';

let fakeAccountsRepository: FakeAccountsRepository;
let createAccount: CreateAccountService;
let transaction: TransactionsService;

describe('CreateAccount', () => {
  beforeEach(() => {
    fakeAccountsRepository = new FakeAccountsRepository();
    createAccount = new CreateAccountService(fakeAccountsRepository);
    transaction = new TransactionsService(fakeAccountsRepository);
  });

  it('should be able to deposit to account', async () => {
    await createAccount.execute({
      name: 'John Doe',
      CPF: '048.184.750-25',
    });

    const account = await transaction.execute({
      CPF: '048.184.750-25',
      value: 2000,
      type: 'income',
    });

    expect(account.balance).toEqual(2000);
  });

  it('should be able to transfer to destination account', async () => {
    await createAccount.execute({
      name: 'John Doe',
      CPF: '048.184.750-25',
    }); // origin account

    await transaction.execute({
      CPF: '048.184.750-25',
      value: 2000,
      type: 'income',
      account_CPF: '048.184.750-25',
    });

    const destinationAccount = await createAccount.execute({
      name: 'Jane Doe',
      CPF: '048.184.750-15',
    }); // destination account

    const account = await transaction.execute({
      CPF: '048.184.750-25',
      value: 1500,
      type: 'outcome',
      account_CPF: '048.184.750-15',
    });

    expect(account.balance).toEqual(500);
    expect(destinationAccount.balance).toEqual(1500);
  });

  it('should not be able to have negative account balance', async () => {
    await createAccount.execute({
      name: 'John Doe',
      CPF: '048.184.750-25',
    }); // origin account

    await transaction.execute({
      CPF: '048.184.750-25',
      value: 1500,
      type: 'income',
      account_CPF: '048.184.750-25',
    }); // balance 2300

    await createAccount.execute({
      name: 'Jane Doe',
      CPF: '048.184.750-15',
    }); // destination account

    await expect(
      transaction.execute({
        CPF: '048.184.750-25',
        value: 2000,
        type: 'outcome',
        account_CPF: '048.184.750-15',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to transfer values greater than R$2.000,00', async () => {
    await createAccount.execute({
      name: 'John Doe',
      CPF: '048.184.750-25',
    });

    await expect(
      transaction.execute({
        CPF: '048.184.750-25',
        value: 2001,
        type: 'income',
        account_CPF: '048.184.750-25',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
