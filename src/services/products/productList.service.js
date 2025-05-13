const { getRepository } = require('typeorm');
const ProductSchema = require('../../entities/product.entity');

const productListService = {
  async getAllProducts() {
    const productRepository = getRepository(ProductSchema);
    
    const products = await productRepository.find();

    if (!products || products.length === 0) {
      throw new Error('Nenhum produto encontrado');
    }

    return products; 
  }
};

module.exports = productListService;
