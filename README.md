# Desafio Backend Fpass

## Desafio

Crie uma API REST integrando com a API da Marvel para que pesquise/liste os heróis pelo nome e que seja possível marcar-los como favorito.

Portal para desenvolvedores da Marvel: [Marvel for Developers](https://developer.marvel.com/)

Espera-se do candidato uma aplicação com as seguintes funcionalidades:

1. Uma pesquisa pelo nome ou parte do nome do herói.
2. Marcar um herói como favorito.
3. Desmarcar um herói como favorito.
4. Listar todos os heróis marcados como favorito.

- Utilizar [Clean Architecture](https://medium.com/luizalabs/criando-uma-aplicação-modular-muito-além-do-clean-architecture-5dde3687c5d6) para a implementação das funcionalidades.

Espera-se também que o candidato gere um arquivo **_READ.md_** ao fim do desafio, explicando as tecnologias utilizadas, a
arquitetura e como executar seu projeto.

Qualquer outra funcionalidade extra é bem vindo.

## Tecnologias e patterns usadas para resolver o desafio

Foram utilizado as seguintes tecnologias e padrões:

- NestJS
- Prisma
- SQlite
- Typescript
- In memory database
- TDD
- DDD
- Clean Architecture
- SOLID

## Como rodar o projeto na sua maquina

### No terminal, clone o projeto:

```sh
git clone https://github.com/renan5g/challenge-backend-fpass.git
```

### Entre na pasta do projeto:

```sh
cd challenge-backend-fpass
```

### Instale a dependências do projeto aqui estou utilizando o [pnpm](https://pnpm.io/) mas pode ser npm ou yarn:

```sh
pnpm i
```

### Copie as variáveis de ambiente do arquivo .env

```sh
cp -r .env.example .env
```

### Preencha as variáveis com as chaves de acesso api gateway da [Marvel](https://developer.marvel.com/):

```txt
MARVEL_GATEWAY_PUBLIC_KEY="YOUR_MARVEL_PUBLIC_KEY";
MARVEL_GATEWAY_PRIVATE_KEY="YOUR_MARVEL_PRIVATE_KEY";
```

### Para executar a aplicação:

```sh
pnpm run start
```

Pronto, agora e possível acessar a aplicação a partir da rota [http://localhost:3000](http://localhost:3000)
