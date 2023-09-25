require('dotenv').config();
// Importar o pacote do MongoDB
const mongoose = require('mongoose');
const app = require('../app');

//Importar o pacote de acesso aos de variáveis de ambiente
const dotenv = require('dotenv').config();
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

// Estabelce a conexão com banco
mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@database.cg6nwat.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('Error of connection:', err);
  });
  
  db.once('open', () => {
    console.log('MongoDB connected!');
    // Aqui você pode adicionar código adicional que depende da conexão com o banco de dados
  });