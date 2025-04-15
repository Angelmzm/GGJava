const userUpdateService = require('../../services/users/userUpdate.service');

const userUpdateController = {
  update: async function (req, res) {
    const userId = req.params.id;
    const { username, password, email, cpf, cellphone } = req.body;

    try {
      const result = await userUpdateService.updateUser(
        userId,
        { username, password, email, cpf, cellphone }
      );
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = userUpdateController;
