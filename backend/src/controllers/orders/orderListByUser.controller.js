const orderListByUserService = require("../../services/orders/orderListByUser.service")

const orderListByUserController = {
  async handle(req, res) {
    const { userId } = req.params;
    console.log("Parâmetro userId recebido:", req.params);


    try {
      const pedidos = await orderListByUserService.getByUserId(userId);
      return res.status(200).json(pedidos);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },
};

module.exports = orderListByUserController;
