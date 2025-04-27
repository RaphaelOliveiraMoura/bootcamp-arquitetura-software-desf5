# Bootcamp Arquitetura de Software

Esse repostório consiste no `desafio final` do primeiro bootcamp realizado na pós graduação de arquitetura de software na XP Educação.

Projeto desenvolvido pelo aluno: `Raphael de Oliveira Moura`

Consiste na criação e documentação de uma solução para uma empresa de vendas on-line.

![Gif do projeto executando](https://)

**Enunciado:**

```
Você é Arquiteto(a) de Software em uma grande empresa de vendas on-line.

Você é responsável por construir e implantar uma solução que disponibilize publicamente dados de Cliente/Produto/Pedido (algum domínio) aos parceiros da empresa.

Para isso, você vai Projetar, Documentar e Implantar uma API REST, no padrão arquitetural MVC, que exponha um endpoint capaz de realizar um CRUD dos dados (e um pouco mais).
```

# Configurando o projeto

## Preparando ambiente

Primeiro será necessário fazer o donwload do `docker` e `docker compose`.

1. A maneira mais simples é baixar o [Docker Desktop](https://www.docker.com/products/docker-desktop/) que irá instalar todas as ferramentas necessárias para executar o docker

2. Ou caso prefira você pode baixar separadamente o [docker](https://docs.docker.com/engine/install/) e [docker compose](https://docs.docker.com/compose/install/) de acordo com seu sistema operacional

---

Depois de baixar o docker, basta clonar o projeto na sua máquina:

```sh
# clonando usando https
$ git clone https://github.com/RaphaelOliveiraMoura/bootcamp-arquitetura-software-desf5.git


# ou usando ssh
$ git clone git@github.com:RaphaelOliveiraMoura/bootcamp-arquitetura-software-desf5.git
```

Para isso será necessário ter a ferramenta do [git](https://git-scm.com/downloads) na sua máquina.

Uma alternativa também é baixar os arquivos do projeto diretamente pela interface do github, selecionando a opção `Download ZIP`

## Executando o projeto

Para rodar o projeto na sua máquina execute o comando (dentro da pasta do projeto):

```sh
$ docker-compose up
```

Após alguns segundos, você pode tentar acessar a url http://localhost:3000/docs e verificar se o projeto está rodando corretamente.

> Lembrando que a API é exposta na porta **3000** e o banco de dados na porta **5432**, então antes de executar o projeto certifique-se que essas portas não estão sendo utilizadas por outros serviços na sua máquina.

# Explicação do projeto

O projeto consiste em uma API REST desenvolvida utilizando [nodejs](https://nodejs.org/pt) com [typescript](https://www.typescriptlang.org/). Como biblioteca para criação do servidor foi utilizado o [fastify](https://fastify.dev/).

Para documentação da api foi utilizado a ferramenta `swagger`, que ao executar o projeto fica acessível pela url http://localhost:3000/docs. Pelo swagger é possível visualizar todos os endpoits desenvolvidos em cima do domínio de `clientes`.

![imagem do swagger](https://)

Para persistência dos dados foi utilizado o banco de dados `postgres`.

Para executar todos os componentes do projeto foi utilizado o `docker`, desse modo para fazer toda a configuração do ambiente fica muito mais fácil, não sendo necessário por exemplo ficar instalando o banco de dados, nodejs localmente para executar o projeto (tudo fica por conta do docker).

## Padrão utilizado no projeto

Para construção do projeto foi utilizado o MVC (Model, View, Controller).

Segue abaixo a definicão de estrutura de pastas:

```SH
📂 src
    📂 @shared
        📂 database #: configurações de conexão com banco de dados + migrations, com a implementação utilizando postgres
        📂 http-server #: configurações do servidor http, com a implementação utilizando fastify

    📂 controller #: arquivos da camada de controller do MVC

    📂 model #: arquivos da camada de modelo do MVC
        📄 *.entity.ts #: arquivos com definição/tipagem das entidades
        📄 *.repository.ts #: arquivos com as regras de persistência das entidades

    📂 view #: arquivos da camada de view do MVC
```
