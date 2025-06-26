const { getRepository } = require('typeorm');
const User = require('../../entities/user.entity');
const Address = require('../../entities/address.entity');
const bcrypt = require('bcrypt');

const userUpdateService = {
  async updateUser(userId, userData) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId }, relations: ['address'] });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    Object.assign(user, userData);

    if (userData.password) {
      user.password = await bcrypt.hash(userData.password, 10);
    }

    await userRepository.save(user);
    return { message: 'Usuário atualizado com sucesso', user };
  },

  async updateAddress(userId, addressData) {
    const userRepository = getRepository(User);
    const addressRepository = getRepository(Address);

    const user = await userRepository.findOne({ where: { id: userId }, relations: ['address'] });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (user.address) {
      Object.assign(user.address, addressData);
      await addressRepository.save(user.address);
    } else {
      const newAddress = addressRepository.create(addressData);
      await addressRepository.save(newAddress);
      user.address = newAddress;
    }

    await userRepository.save(user);
    return { message: 'Endereço atualizado com sucesso', user };
  }
};

module.exports = userUpdateService;
