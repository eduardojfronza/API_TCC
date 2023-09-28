const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function changeInformation(req,res) {
    const { userId, newName, newEmail, newPassword } = req.body;

    try {
        //Encontrar o usuario pelo ID
        const user = await User.findById(userId)
        
        //----------------VALIDAÇÕES--------------//
        if(!user) {
            return res.status(404).json({error: "Usuario não encontrado!"});
        } 
        //----------------NOME--------------//
        // Alterar o nome
        user.name = newName

        //----------------EMAIL--------------//
        // Alterar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(newEmail)) {
            return res.status(400).json({error: "O novo email não é valido!"});
        }

        //Se o novo email for valido, atualiza o campo
        user.email = newEmail

        //----------------SENHA--------------//
            // Hash da nova senha
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Atualiza a senha do usuario no banco de dadods
            user.password = hashedPassword;
            await user.save();

            // Gera um novo token
            const secret = process.env.SECRET;
            const token = jwt.sign({ id: user.id }, secret);
        
       
        res.status(200).json({ success: true, message: 'Dados alterados com sucesso, os dados agora são:', token, newName, newEmail, newPassword   })
    }

    catch (err) {
        res.status(500).json({ error: 'Erro ao alterar a senha' });
    }
}

module.exports = changeInformation;
