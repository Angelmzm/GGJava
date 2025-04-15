const { getRepository } = require('typeorm');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserSchema = require('../../entities/user.entity');
const AddressSchema = require('../../entities/address.entity');

const userService = {
  async register(username, password, confirmPassword, email, cpf, cellphone, addressData, is_adm = false) {
    const userRepository = getRepository(UserSchema);
    const addressRepository = getRepository(AddressSchema);

    console.log("Nome recebido:", username);
    console.log("Senha recebida:", password);
    console.log("Permissão de administrador:", is_adm);

    if (password !== confirmPassword) {
      throw new Error('As senhas não coincidem');
    }

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Usuário com esse email já existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Senha criptografada:", hashedPassword);

    // Cria o usuário
    const newUser = userRepository.create({
      username,
      password: hashedPassword,
      email,
      cpf,
      cellphone,
      is_adm
    });

    await userRepository.save(newUser);

    // Cria o endereço e associa ao usuário
    const newAddress = addressRepository.create({
      ...addressData,
      user: newUser
    });

    await addressRepository.save(newAddress);

    return { message: 'Usuário criado com sucesso', user: newUser, address: newAddress };
  },

  async login(username, password) {
    const userRepository = getRepository(UserSchema);
    
    const user = await userRepository.findOne({ where: { username } });
  
    console.log("Nome recebido:", username);
  
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Resultado da comparação de senha:", isMatch);
  
    if (!isMatch) {
      throw new Error('Senha incorreta');
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, is_adm: user.is_adm },
      'sua_chave_secreta',
      { expiresIn: '1h' }
    );

    return { message: 'Login bem-sucedido', token, user: { id: user.id, username: user.username, is_adm: user.is_adm } };
  }
};

module.exports = userService;
