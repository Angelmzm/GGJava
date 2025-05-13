const { getRepository } = require('typeorm');
const ProductSchema = require('../../entities/product.entity');

const productDeleteService = {
  async deleteProduct(id) {
    const productRepository = getRepository(ProductSchema);
    const product = await productRepository.findOne({ where: { id } });

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    await productRepository.remove(product);

    return { message: 'Produto deletado com sucesso' };
  }
};

module.exports = productDeleteService;
