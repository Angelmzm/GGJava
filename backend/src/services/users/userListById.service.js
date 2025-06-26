const { getRepository } = require("typeorm");
const UserSchema = require("../../entities/user.entity");

const userListByIdService = {
  async getUserById(userId) {
    const userRepository = getRepository(UserSchema);

    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ["address"], // Inclui a relação 'address' ao buscar o usuário
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  },
};

module.exports = userListByIdService;
