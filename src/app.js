// Importar o pacote dotenv, gerenciador de variáveis de ambiente
require('dotenv').config();

// Importar o pacote express(servidor)
const express = require('express');
// Responsável por lidar com requisições externas
const cors = require('cors');

// Importar as rotas para serem executadas na aplicação
const userRouter = require('./routes/userRouter');

const mongoose = require('mongoose');

// Instanciar o express na variável app
const app = express()
// Habilitar o recebimento de requests em formato JSON
app.use(express.json());
// Habilitar o recebimento de requests em formato JSON
app.use(cors())

app.set('port', process.env.PORT || 3333);
const USER = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

mongoose
    .connect(`mongodb+srv://edujfronza:${PASSWORD}@database.cg6nwat.mongodb.net/`)
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch((err) => console.error(err));

// Rota padrão para consulta
app.use('/api', userRouter )

module.exports = app;