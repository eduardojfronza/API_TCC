const jwt = require('jsonwebtoken');

// Middleware para verificar o token de autenticação
function checkToken(req, res, next) {
    // Obtém o token do cabeçalho 'Authorization' da requisição
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Se o token não estiver presente, retorna um erro de acesso negado
    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token ausente' });
    }

    try {
        // Obtém a chave secreta a partir das variáveis de ambiente
        const secret = process.env.SECRET;

        // Verifica e decodifica o token JWT
        const decoded = jwt.verify(token, secret);

        // Anexa o payload decodificado do token à solicitação (req) para uso posterior, se necessário
        req.user = decoded;

        // Continua o processamento da requisição
        next();
    } catch (error) {
        // Se o token estiver expirado, retorna um erro de acesso negado
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Acesso negado. Token expirado' });
        }
        // Se o token for inválido, retorna um erro de acesso negado
        else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Acesso negado. Token inválido' });
        }
        // Passa outros erros para o próximo middleware de tratamento de erros
        else {
            next(error);
        }
    }
}

module.exports = checkToken;
