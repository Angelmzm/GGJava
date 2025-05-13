const { getRepository } = require('typeorm');
const OrderSchema = require('../../entities/order.entity');

const orderDeleteService = {
  async deleteOrder(id) {
    const orderRepository = getRepository(OrderSchema);

    const order = await orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new Error('Pedido não encontrado');
    }

    await orderRepository.remove(order);

    return { message: 'Pedido deletado com sucesso' };
  }
};

module.exports = orderDeleteService;
