const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Address',
  tableName: 'address',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    street: {
      type: 'varchar',
    },
    number: {
      type: 'varchar',
    },
    district: {
      type: 'varchar',
    },
    city: {
      type: 'varchar',
    },
    state: {
      type: 'varchar',
    },
    cep: {
      type: 'varchar',
    },
    complement: {
      type: 'varchar',
      nullable: true,
    },
  },
  relations: {
    user: {
      target: 'User',
      type: 'one-to-one',
      inverseSide: 'address',
    },
  },
});
