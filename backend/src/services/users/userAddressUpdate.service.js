const { getRepository } = require('typeorm');
const AddressSchema = require('../../entities/address.entity');

const userAddressUpdateService = {
  async updateAddress(userId, addressData) {
    const addressRepository = getRepository(AddressSchema);
    const address = await addressRepository.findOne({ where: { user: { id: userId } } });

    if (!address) {
      throw new Error('Endereço não encontrado');
    }

    Object.assign(address, addressData);
    await addressRepository.save(address);

    return { message: 'Endereço atualizado com sucesso', address };
  }
};

module.exports = userAddressUpdateService;
