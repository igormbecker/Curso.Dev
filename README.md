# Curso.Dev

Projeto desenvolvido no curso.dev que clone o projeto do site www.tabnews.com.br

# Frameworks instalados

- Node: lts/hydrogen
- NextJs: next@13.1.6
- React: react@18.2.0
- React-Dom: react-dom@18.2.0
- Testes: jest@29.6.2

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

- Instale as dependencias:

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
