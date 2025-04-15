const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Order',
  tableName: 'orders',

  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },

    createdAt: {
      type: 'timestamp',
      createDate: true,
    },

    total: {
      type: 'decimal',
      precision: 12,
      scale: 2,
    },
  },

  relations: {
    user: {
      target: 'User',
      type: 'many-to-one',
      inverseSide: 'orders',
      joinColumn: true,
    },

    address: {
      target: 'Address',
      type: 'many-to-one',
      joinColumn: true,
    },

    items: {
      target: 'OrderItem',
      type: 'one-to-many',
      inverseSide: 'order',
      cascade: true,
    },
  },
});
