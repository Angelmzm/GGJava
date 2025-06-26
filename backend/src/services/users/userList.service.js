const { getRepository } = require('typeorm');
const UserSchema = require('../../entities/user.entity');

const userListService = {
  async listUsers() {
    const userRepository = getRepository(UserSchema);

    const users = await userRepository.find({
      relations: ['address'], // Inclui a relação 'address' ao buscar os usuários
    });

    if (!users || users.length === 0) {
      throw new Error('Nenhum usuário encontrado');
    }

    return users;
  },
};

module.exports = userListService;
