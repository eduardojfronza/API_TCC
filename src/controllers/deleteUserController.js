const User = require("../models/User");

async function deleteUser(req, res) {
  const { userId } = req.body;

  try {
    // Encontrar o usuário pelo ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Excluir o usuário pelo ID
    await User.findByIdAndDelete(userId);

    res.status(200).json({ success: true, message: "Conta deletada com sucesso!" });
  } catch (err) {
    // Se ocorrer um erro ao excluir o usuário
    res.status(500).json({ error: "Falha ao deletar o usuário" });
  }
}

module.exports = deleteUser;
