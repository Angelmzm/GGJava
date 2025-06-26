const { getRepository } = require("typeorm");
const Order = require("../../entities/order.entity");

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { payment_status, delivery_status } = req.body;

  const orderRepository = getRepository(Order);
  let order = await orderRepository.findOne({ where: { id } });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (payment_status) order.payment_status = payment_status;
  if (delivery_status) order.delivery_status = delivery_status;

  await orderRepository.save(order);

  order = await orderRepository.findOne({
    where: { id },
    relations: ["user", "address", "items", "items.product"],
  });

  return res.json(order);
};

module.exports = { updateStatus };
