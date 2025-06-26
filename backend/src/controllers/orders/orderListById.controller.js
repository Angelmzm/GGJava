const orderListByIdService = require('../../services/orders/orderListById.service');

const orderListByIdController = {
  async getOrderById(req, res) {
    try {
      const { id } = req.params;
      const order = await orderListByIdService.getOrderById(id);
      res.json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = orderListByIdController;
