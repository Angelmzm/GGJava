//mudei
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
      throw new Error('User not found.');
    }

    const address = await addressRepository.findOne({ where: { id: addressId } });
    if (!address) {
      throw new Error('Address not found.');
    }

    let total = 0;

    // Create order initially with total = 0 and empty items
    const newOrder = orderRepository.create({
      user,
      address,
      total: 0,
      items: [],
      payment_status: 'Pending',        // default value
      delivery_status: 'Not shipped',   // default value
    });

    await orderRepository.save(newOrder);

    const orderItems = [];

    for (const item of items) {
      const product = await productRepository.findOne({ where: { id: item.productId } });
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found.`);
      }

      const orderItem = orderItemRepository.create({
        order: newOrder,
        product,
        quantity: item.quantity,
        price: product.price,
      });

      await orderItemRepository.save(orderItem);

      orderItems.push(orderItem);
      total += parseFloat(product.price) * item.quantity;
    }

    // Update order with items and total
    newOrder.total = total;
    newOrder.items = orderItems;

    await orderRepository.save(newOrder);

    return { message: 'Order successfully created', order: newOrder };
  }
};

module.exports = orderCreateService;
