const { getRepository } = require('typeorm');
const ProductSchema = require('../../entities/product.entity');

const productListByIdService = {
  async getProductById(id) {
    const productRepository = getRepository(ProductSchema);
    const product = await productRepository.findOne({ where: { id } });

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    return product;
  }
};

module.exports = productListByIdService;
