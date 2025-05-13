const orderDeleteService = require('../../services/orders/orderDelete.service');

const orderDeleteController = {
  async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      const result = await orderDeleteService.deleteOrder(id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = orderDeleteController;
