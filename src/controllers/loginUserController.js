const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        // Valida se os campos estão preenchidos
        if (!email || !password) {
            return res.status(422).json({msg: "Os campos devem ser preenchidos!"});
        }

        // Confere se o usuario existe
        const user = await User.findOne({ email });
        //Se o usuario existir, vai conferir se as senhas são as mesmas
        const passwordMatch =  await bcrypt.compare(password, user.password);

        if (!passwordMatch || !user) {
            return res.status(422).json({error: "Usuario ou senha invalido!" })
        }

        // Gera um JWT token para o usuario
        const secret = process.env.SECRET
        const token = jwt.sign({id: user.id, }, secret);

        // Se tudo der certo devolve uma mensagem de sucesso
        res.status(200).json({success: true, message: "Autenticação feita com sucesso!", token, user});
        
    }

    catch (err) {
        // Se não der certo devolve uma mensagem de erro
        res.status(500).json({error: "Erro na autenticação!"});
    }
}

module.exports = loginUser;