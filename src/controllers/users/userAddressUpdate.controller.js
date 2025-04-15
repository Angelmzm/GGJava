const userAddressUpdateService = require('../../services/users/userAddressUpdate.service');

const userAddressUpdateController = {
  update: async function (req, res) {
    const userId = req.params.id;
    const addressData = req.body;

    try {
      const result = await userAddressUpdateService.updateAddress(userId, addressData);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = userAddressUpdateController;
