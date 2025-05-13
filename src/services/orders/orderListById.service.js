const { getRepository } = require('typeorm');
const OrderSchema = require('../../entities/order.entity');

const orderListByIdService = {
  async getOrderById(id) {
    const orderRepository = getRepository(OrderSchema);
    
    const order = await orderRepository.findOne({
      where: { id },
      relations: ['user', 'address', 'items', 'items.product'],
    });

    if (!order) {
      throw new Error('Pedido não encontrado');
    }

    return order;
  }
};

module.exports = orderListByIdService;
