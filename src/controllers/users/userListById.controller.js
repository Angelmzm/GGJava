const userListByIdService = require('../../services/users/userListById.service');

const userListByIdController = {
  async getUser(req, res) {
    const userId = req.params.id;

    try {
      const user = await userListByIdService.getUserById(userId);

      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = userListByIdController;
