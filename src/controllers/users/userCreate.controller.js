const userService = require('../../services/users/userCreate.service');

const userController = {
  async register(req, res) {
    try {
      console.log("Corpo da requisição:", req.body);

      const { 
        username, 
        password, 
        confirmPassword, 
        email, 
        cpf, 
        cellphone, 
        is_adm = false,
        address // o endereço deve vir neste campo
      } = req.body;

      if (!username || !password || !email || !cpf || !cellphone) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }

      if (
        !address ||
        !address.street ||
        !address.number ||
        !address.district ||
        !address.city ||
        !address.state ||
        !address.cep
      ) {
        return res.status(400).json({ error: "Todos os campos de endereço são obrigatórios" });
      }

      const result = await userService.register(
        username,
        password,
        confirmPassword,
        email,
        cpf,
        cellphone,
        address, // passando o endereço para o service
        is_adm
      );

      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await userService.login(username, password);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = userController;
