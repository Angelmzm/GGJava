const { getRepository } = require('typeorm');
const OrderSchema = require('../../entities/order.entity');
const OrderItemSchema = require('../../entities/orderItem.entity');
const UserSchema = require('../../entities/user.entity');
const AddressSchema = require('../../entities/address.entity');
const ProductSchema = require('../../entities/product.entity');

const orderCreateService = {
  async createOrder(userId, addressId, items) {
    const orderRepository = getRepository(OrderSchema);
    const orderItemRepository = getRepository(OrderItemSchema);
    const userRepository = getRepository(UserSchema);
    const addressRepository = getRepository(AddressSchema);
    const productRepository = getRepository(ProductSchema);

    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const address = await addressRepository.findOne({ where: { id: addressId } });
    if (!address) {
      throw new Error('Endereço não encontrado.');
    }

    let total = 0;

    // Primeiro, criar o pedido sem itens
    const newOrder = orderRepository.create({
      user,
      address,
      total: 0, // vamos atualizar depois
      items: [],
    });

    await orderRepository.save(newOrder);

    const orderItems = [];

    for (const item of items) {
      const product = await productRepository.findOne({ where: { id: item.productId } });
      if (!product) {
        throw new Error(`Produto com ID ${item.productId} não encontrado.`);
      }

      const orderItem = orderItemRepository.create({
        order: newOrder, // associa já o pedido
        product,
        quantity: item.quantity,
        price: product.price,
      });

      await orderItemRepository.save(orderItem);

      orderItems.push(orderItem);

      total += parseFloat(product.price) * item.quantity;
    }

    // Atualizar o pedido com total e os itens
    newOrder.total = total;
    newOrder.items = orderItems;

    await orderRepository.save(newOrder);

    return { message: 'Pedido criado com sucesso', order: newOrder };
  }
};

module.exports = orderCreateService;
