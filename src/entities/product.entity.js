const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({

  name: 'Product',
  tableName: 'product',

  columns: {

    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    
    productname: {
      type: 'varchar',
      length: 100,
    },

    price: {
      type: 'decimal',
      precision: 12,
      scale: 2,
    },

    description: {
      type: 'varchar',
      length: 100,
    },

    detail: {
      type: 'varchar',
      length: 350,
    },

    is_topSelling: {
      type: 'boolean',
      default: false,
    },

    category: {
      type: 'int',
    },

    size: {
      type: 'varchar',
    },

    cover_image: {
      type: 'varchar',
    },

    first_image: {
      type: 'varchar',
    },

    second_image: {
      type: 'varchar',
    },

    third_image: {
      type: 'varchar',
    },

  },

  relations: {

    orderItems: {
      target: 'OrderItem',
      type: 'one-to-many',
      inverseSide: 'product',
    },

  },
  
});
