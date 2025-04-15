const userDeleteService = require('../../services/users/userDelete.service');

const userDeleteController = {
  async deleteUser(req, res) {
    const userId = req.params.id;

    try {
      const result = await userDeleteService.deleteUserById(userId);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = userDeleteController;
