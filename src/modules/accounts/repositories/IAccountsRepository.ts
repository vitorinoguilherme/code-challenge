import IAccountDTO from 'dtos/IAccountDTO';
import Account from '@modules/accounts/infra/typeorm/entities/Account';

export default interface IAccountsRepository {
  findByCPF(CPF: String): Promise<Account | undefined>;
  create(data: IAccountDTO): Promise<Account>;
  save(account: Account): Promise<Account>;
}
