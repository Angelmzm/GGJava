//mudei
const { getRepository } = require("typeorm");
const Order = require("../../entities/order.entity");

const orderListByUserService = {
  async getByUserId(userId) {
    const orderRepository = getRepository(Order);

    const orders = await orderRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "address", "items", "items.product"],
      order: { createdAt: "DESC" }
    });

    if (!orders || orders.length === 0) {
      throw new Error("Nenhum pedido encontrado para este usuário");
    }

    // Calcula total para cada pedido
    const ordersComTotal = orders.map((order) => {
      const total = order.items.reduce((acc, item) => {
        return acc + (item.product.price * item.quantity);
      }, 0);
      return {
        ...order,
        total: Number(total.toFixed(2))
      };
    });

    return ordersComTotal;
  },
};

module.exports = orderListByUserService;
