const { getRepository } = require('typeorm');
const ProductSchema = require('../../entities/product.entity');

const productUpdateService = {
  async updateProduct(id, updateData) {
    const productRepository = getRepository(ProductSchema);
    const product = await productRepository.findOne({ where: { id } });

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    const updatedProduct = await productRepository.save({ ...product, ...updateData });

    return { message: 'Produto atualizado com sucesso', product: updatedProduct };
  }
};

module.exports = productUpdateService;
