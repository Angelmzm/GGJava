const userListService = require('../../services/users/userList.service');

const userListController = {
  async list(req, res) {
    try {
      const users = await userListService.listUsers();

      res.json({ message: 'Usuários encontrados', users });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = userListController;
