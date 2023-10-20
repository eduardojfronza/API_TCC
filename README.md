
---

# API de Autenticação de Usuário
Link da api --> https://api-tcc-xi.vercel.app<br/><br/>
Esta é a documentação da API de autenticação de usuário para o projeto "Criptomoedas em foco", vulgo trabalho de conclusão de curso.

## Descrição

É uma API de autenticação de usuário desenvolvida usando Node.js e Express.js. Ela permite que os usuários façam login, autentiquem-se e alterem suas senhas. A API utiliza o MongoDB como banco de dados para armazenar informações de usuário.

## Pré-requisitos

Antes de executar a API, certifique-se de ter os seguintes pré-requisitos instalados:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/eduardojfronza/API_TCC.git
   cd API_TCC
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias:

   ```env
   PORT=3000
   PASSWORD=SUA_SENHA_DATABASE
   SECRET=SEU_SECRET_JWT
   ```

## Uso

Para iniciar o servidor, use o seguinte comando:

```bash
npm start
```

A API estará acessível em `http://localhost:3000` (ou a porta que você especificar no arquivo `.env`).

## Rotas

A API possui as seguintes rotas:

- `POST /api/login`: Rota para autenticar um usuário.
- `POST /api/register`: Rota para registrar um usuário.
- `POST /api/change-password`: Rota para alterar a senha de um usuário.

Para fazer solicitações para essas rotas, você deve enviar os dados necessários no corpo da solicitação em formato JSON.

Exemplo de solicitação para autenticar um usuário:

```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

Exemplo de solicitação para alterar a senha:

```json
{
  "userId": "ID_DO_USUARIO",
  "currentPassword": "SENHA_ATUAL",
  "newPassword": "NOVA_SENHA"
}
```

## Dependências Principais

- [bcrypt](https://www.npmjs.com/package/bcrypt): Para criptografar senhas.
- [cors](https://www.npmjs.com/package/cors): Para habilitar o compartilhamento de recursos entre origens.
- [dotenv](https://www.npmjs.com/package/dotenv): Para carregar variáveis de ambiente a partir de um arquivo `.env`.
- [express](https://www.npmjs.com/package/express): O framework web para Node.js.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Para geração e verificação de tokens JWT.
- [mongoose](https://www.npmjs.com/package/mongoose): Para modelagem de dados MongoDB.
- [nodemon](https://www.npmjs.com/package/nodemon): Para reiniciar automaticamente o servidor durante o desenvolvimento.

