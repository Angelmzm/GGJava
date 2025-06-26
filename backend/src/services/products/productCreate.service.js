//mudei
const { getRepository } = require('typeorm');
const ProductSchema = require('../../entities/product.entity');

const productCreateService = {
  async createProduct(productname, price, description, detail, is_topSelling, size, cover_image, first_image, second_image, third_image, category) {

    if (![1, 2, 3, 4, 5, 6].includes(category)) {
      throw new Error('A categoria deve ser um número entre 1 e 6.');
    }

    const productRepository = getRepository(ProductSchema);

    const newProduct = productRepository.create({
      productname,
      price,
      description,
      detail,
      is_topSelling,
      size,
      cover_image,
      first_image,
      second_image,
      third_image,
      category,  
    });

    await productRepository.save(newProduct);

    return { message: 'Produto criado com sucesso', product: newProduct };
  }
};

module.exports = productCreateService;
