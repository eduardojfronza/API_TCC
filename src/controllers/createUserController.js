const User = require('../models/User');
const bcrypt = require('bcrypt');

async function createUser(req, res) {
    const {name, email, password, confirmPassword} = req.body;

    try {
        // Verifcar se os inputs estão preenchidos
        if (!name || !email || !password || !confirmPassword) {
            return res.status(422).json({msg: "Os campos devem ser preenchidos"});
        }

        // Verifca se as senhas são iguais
        if (password !== confirmPassword) {
            return res.status(422).json({msg: "As senhas devem ser iguais"});
        }

        // Verifica se o usuario existe
        const userExists = await User.findOne({email});

        // Valida se o usario existe, se exister devolve mensagem de erro
        if (userExists) {
            return res.status(422).json({msg: "Email já cadastrado!"})
        }

        // Criar o hash da senha
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        // Criar um novo usuario
        const user = new User({
            name,
            email,
            password: passwordHash
        });

        await user.save();

        // Se tudo der certo devolve a mensagem de sucesso
        res.status(201).json({success: "Usuario criado com sucesso!"});
    }

    catch (error) {
        // Se der errado devolve a mensagem de erro
        res.status(500).json({error: "Falha ao criar usuario!"})
    }
};

module.exports = createUser;