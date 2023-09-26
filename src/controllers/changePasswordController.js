const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function changePassword(req, res) {
    const {userId, newPassword } = req.body;

    try {

        //Encontrar o usuario pelo ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({error: "Usuario não encontrado"});
        }
        
        // Hash da nova senha
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Atualiza a senha do usuario no banco de dados
        user.password = hashedPassword;
        await user.save();

        // Gera um novo token
        const secret = process.env.SECRET
        const token = jwt.sign({ id: user.id }, secret);

        res.status(200).json({ success: true, message: 'Senha alterada com sucesso', token  })
    }

    catch (err) {
        res.status(500).json({ error: 'Erro ao alterar a senha' });
    }
}

module.exports = changePassword;

// estrutura para teste
// 	"userId": "id",
// 	"currentPassword": "senha atual",
// 	"newPassword": "nova senha"