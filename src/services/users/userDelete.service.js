const { getRepository } = require('typeorm');
const UserSchema = require('../../entities/user.entity');

const userDeleteService = {
  async deleteUserById(userId) {
    const userRepository = getRepository(UserSchema);

    const user = await userRepository.findOne({
        where: { id: userId } });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    await userRepository.remove(user);
    return { message: 'Usuário deletado com sucesso' };
  }
};

module.exports = userDeleteService;
