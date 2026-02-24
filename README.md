# Curso.Dev

Projeto desenvolvido no curso.dev que clone o projeto do site www.tabnews.com.br

# Frameworks instalados

- Node: lts/hydrogen
- NextJs: next@13.1.6
- React: react@18.2.0
- React-Dom: react-dom@18.2.0
- Testes: jest@29.6.2

# Banco de dados utilizado

Basicamente o nosso banco de dados ficou em um container criado pelo docker.
As especificações do banco de dados e versão utilizada, estão dentro do arquivo 'compose.yaml', ao rodar o comando de subir o docker, ele procura este arquivo e segue as características definidas neste arquivo.

- Postgres: postgres:16.0-alpine3.18
- Client Sql: postgresql-client
- Client Sql via js PG: pg@8.11.3

- Para listar todos containers:

```bash
docker ps -a
```

- Para subir o banco local (para rodar nos bastidores acrescentar -d):

```bash
docker compose -f infra/compose.yaml up -d
```

- Para recriar o container:

```bash
docker compose -f infra/compose.yaml up -d --force-recreate
```

- Para derrubar o docker ativo:

```bash
docker compose -f infra/compose.yaml down
```

- Para instalar o client:

```bash
sudo apt install postgresql-client
```

- Para conectar ao banco pelo terminal:

```bash
 psql --host=localhost --username=postgres --port=5432
```

- Para instalar o PG:

```bash
npm install pg@8.11.3
```

# Comandos utilizados para rodar o projeto local:

- listar versões do node:

```bash
nvm ls
```

- para instalar o node:

```bash
nvm install lts/hydrogen
```

- Para instalar dependencias:

```bash
npm install next@13.1.6 react@18.2.0 react-dom@18.2.0
```

- O comando '--save-dev' serve para dizer que esta é uma dependencia de desenvolvimento.

```bash
npm install --save-dev jest@29.6.2
```

- Abra o power shell no windows e clique na seta > e clique em linux terminal.
- Localizar a pasta /home/igormbecker/projects/Curso.Dev no terminal do linux e execute o comando a seguir:

```bash
code .
```

- Ao realizar o clone do projeto, é necessário instalar as dependencias:

```bash
npm install
```

- Para rodar o projeto:

```bash
npm run dev
```

- Para rodar o script que verifica padrão do código de todo projeto:

```bash
npm run lint:check
```

- para rodar o script que padroniza o código de todo projeto:

```bash
npm run lint:fix
```

- para rodar os testes automatizados de todo projeto:

```bash
npm run test
```

```bash
npm run test:watch
```
