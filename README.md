# Desafio de Backend

Seu objetivo é criar uma API REST com algumas funções essenciais relacionadas ao gerenciamento de contas bancárias em uma das linguagem: Java, Kotlin, Python, Node.js, .NET

- Para abrir uma conta é necessário apenas o nome completo e CPF da pessoa, mas só é permitido uma conta por pessoa;
- Com essa conta é possível realizar transferências para outras contas e depositar;
- Não aceitamos valores negativos nas contas;
- Por questão de segurança cada transação de depósito não pode ser maior do que R$2000;
- As transferências entre contas são gratuitas e ilimitadas;

---

## Configuração

Utilize o ormconfig.example.json para criar o seu ormconfig.json

## Execução e Scripts

Clone o repositório e instale as dependências;

### `yarn install` or `yarn`

Para rodar as migrations execute:

obs: crie o banco previamente (ex.: code-challenge).

### `yarn typeorm migration:run`

Para iniciar a aplicação execute:

### `yarn dev:server`

Para rodar os testes execute:

### `yarn test`
