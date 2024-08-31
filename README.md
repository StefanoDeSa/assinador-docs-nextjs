# Assinador de Documentos

Este é um projeto de assinatura digital de documentos utilizando Node.js, Next.js e Prisma com PostgreSQL. O usuário pode registrar-se, adicionar documentos, assinar documentos com sua chave privada e visualizar os detalhes da assinatura.

## Funcionalidades

- Usuário deve poder autenticar-se no sistema; ✅
- Usuário deve conseguir gerar um par de chaves assimétricas; ✅
- Usuário deve conseguir salvar documento; ✅
- Usuário deve conseguir assinar documento; ✅
- Usuário deve conseguir visualizar lista de documentos assinados; ✅
- Usuário deve conseguir visualizar o documento assinado; ✅
- Usuário deve conseguir checar se o documento foi assinado no sistema;

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) v14 ou superior
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Configuração do Ambiente

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/StefanoDeSa/assinador-docs-nextjs.git
   cd assinador-de-documentos

2. **Instale as dependências:**

    ```bash
   npm install

3. **Configure as variáveis de ambiente:**
   
   Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
   ```bash
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"

5. **Configuração do banco de dados:**
   
   Certifique-se de que o banco de dados PostgreSQL esteja rodando e configurado corretamente. Em seguida, execute o comando para aplicar as migrations:
   ```bash
   npx prisma migrate dev

6. **Rodar o servidor de desenvolvimento:**

    ```bash
   npm run dev
