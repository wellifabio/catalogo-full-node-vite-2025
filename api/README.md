# API Catálogo de plantas
API simples de exemplo de um catálogo de plantas

## Tecnologias utilizadas
- Node.js
- Express
- Prisma
    - Seed
- XAMPP
    - MySQL

## Passos para execução
1. Clonar o repositório e acessar a pasta `./api`
2. Instalar as dependências `npm install` e criar o arquivo .env com o conteúdo a seguir:
```js
DATABASE_URL="mysql://root@localhost:3306/catalogoapi?schema=public&timezone=UTC
```
3. Inicie o SGBD, abrindo o XAMPP e iniciando o MySQL
4. Executar as migrações e semeaduras `npx prisma migrate dev --name init`
5. Iniciar o servidor `npm run dev`

## Screenshots
![Screenshot00](../docs/screenshot00.png)
