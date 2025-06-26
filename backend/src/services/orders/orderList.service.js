//mudei
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

    // Adiciona o campo total a cada pedido, somando price * quantity dos itens
    const ordersWithTotal = orders.map(order => {
      const total = order.items.reduce((acc, item) => {
        const price = item.product.price || 0; // pega o preço do produto relacionado
        return acc + price * item.quantity;
      }, 0);

      return {
        ...order,
        total,
      };
    });

    return ordersWithTotal;
  }
};

module.exports = orderListService;

