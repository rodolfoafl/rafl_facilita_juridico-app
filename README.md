# Aplicação desenvolvida para o Teste de Programação Desenvolvedor Facilita Jurídico

**Backend desenvolvido utilizando:**

- Node.js
- Docker
- Javascript/Typescript
- Fastify
- PostgreSQL
- Knex
- Zod

**Instruções para setup e uso:**
1. Ter a versão do node v20.11.0 instalada
2. Ter a versão do Docker 25.0.1 (build 29cf629) instalada
3. Navegar até o subdiretório "api-rest"
4. Executar o comando "yarn install"
5. Executar o comando "docker compose up -d"
6. Gerar na raiz um arquivo .env e utilizar os mesmos valores do arquivo .env.example
7. Executar o comando "yarn knex migrate:latest"
8. Executar o comando "yarn dev"
- **O terminal deve exibir: Server is running on port 3333**

##

**Frontend desenvolvido utilizando:**

- Vite (React)
- Javascript/Typescript
- Axios
- TailwindCSS
- Zod

**Instruções para setup e uso:**
1. Ter a versão do node v20.11.0 instalada
2. Navegar até o subdiretório "app-interface"
3. Executar o comando "yarn install"
4. Executar o comando "yarn dev"
- **Você deverá acessar a url http://localhost:5173/ para visualizar o aplicativo**
