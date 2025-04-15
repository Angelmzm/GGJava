const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({

  name: 'OrderItem',
  tableName: 'order_items',

  columns: {

    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },

    quantity: {
      type: 'int',
    },

    price: {
      type: 'decimal',
      precision: 12,
      scale: 2,
    },

  },

  relations: {

    order: {
      target: 'Order',
      type: 'many-to-one',
      inverseSide: 'items',
      joinColumn: true,
    },

    product: {
      target: 'Product',
      type: 'many-to-one',
      inverseSide: 'orderItems',
      joinColumn: true,
    },

  },
  
});
