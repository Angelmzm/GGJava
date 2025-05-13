const { getRepository } = require('typeorm');
const OrderSchema = require('../../entities/order.entity');

const orderListService = {
  async getAllOrders() {
    const orderRepository = getRepository(OrderSchema);
    
    const orders = await orderRepository.find({
      relations: ['user', 'address', 'items', 'items.product'],
    });

    if (!orders || orders.length === 0) {
      throw new Error('Nenhum pedido encontrado');
    }

    return orders;
  }
};

module.exports = orderListService;
