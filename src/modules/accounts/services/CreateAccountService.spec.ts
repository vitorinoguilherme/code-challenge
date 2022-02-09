import FakeAccountsRepository from '@modules/accounts/repositories/fakes/FakeAccountsRepository';
import AppError from '@shared/errors/AppError';

import CreateAccountService from './CreateAccountService';

let fakeAccountsRepository: FakeAccountsRepository;
let createAccount: CreateAccountService;

describe('CreateAccount', () => {
  beforeEach(() => {
    fakeAccountsRepository = new FakeAccountsRepository();

    createAccount = new CreateAccountService(fakeAccountsRepository);
  });

  it('should be able to create a new account', async () => {
    const account = await createAccount.execute({
      name: 'John Doe',
      CPF: '048.184.750-25',
    });

    expect(account).toHaveProperty('id');
    expect(account).toHaveProperty('CPF');
  });

  it('should not be able to create a account with the same CPF than another', async () => {
    await createAccount.execute({
      name: 'John Doe',
      CPF: '048.184.750-25',
    });

    await expect(
      createAccount.execute({
        name: 'John',
        CPF: '048.184.750-25',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
