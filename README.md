# Gondra Bank

Desafio do Hackaton da Orange Juice

## Como executar o projeto

### Ambiente local

1. Instale as dependências usando o `pnpm`.

```bash
pnpm install
```

2. Crie um arquivo `.env` e defina as variáveis de ambiente necessárias descritas em `.env.example`.

3. Execute as migrações do banco de dados.

```bash
pnpm migrate
```

3. Inicie o projeto

```bash
pnpm dev
```

4. Acesse `http://localhost:3333`

### Ambiente docker

1. Crie um arquivo `.env` e defina as variáveis de ambiente necessárias descritas em `.env.example`.

2. Crie a imagem da aplicação

```bash
pnpm docker:build
```

3. Crie o container da aplicação passando as variáveis de ambiente necessárias

```bash
pnpm docker:run
```

4. Acesse `http://localhost:3333`