const orderCreateService = require('../../services/orders/orderCreate.service');

const orderCreateController = {
  async createOrder(req, res) {
    try {
      console.log("Corpo da requisição:", req.body);

      const { userId, addressId, items } = req.body;

      if (!userId || !addressId || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Os campos 'userId', 'addressId' e 'items' (não vazio) são obrigatórios." });
      }

      const result = await orderCreateService.createOrder(userId, addressId, items);

      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = orderCreateController;
