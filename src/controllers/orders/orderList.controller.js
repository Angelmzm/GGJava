const orderListService = require('../../services/orders/orderList.service');

const orderListController = {
  async getAllOrders(req, res) {
    try {
      const orders = await orderListService.getAllOrders();
      res.json(orders);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = orderListController;
