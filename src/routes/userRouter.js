// Importar o modulo de Router do express
const express = require('express');
// Instanciar o Router na variável router
const router = express.Router();

// Importar a função (processamento da requisição) do controller
const createUser  = require('../controllers/createUserController');
const loginUser = require('../controllers/loginUserController');
const changePassword = require('../controllers/changePasswordController')


// Criar o endpoint que serão acessados a partir dos metodos HTTP
router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/changePassword', changePassword)

module.exports = router;

