const productCreateService = require('../../services/products/productCreate.service');

const productCreateController = {
  async createProduct(req, res) {
    try {
      console.log("Corpo da requisição:", req.body);
      
      const { productname, price, description, detail, is_topSelling, size, cover_image, first_image, second_image, third_image } = req.body;
      let { category } = req.body;

      if (!productname || !price || !description || !detail || category === undefined) {
        return res.status(400).json({ error: "Os campos 'productname', 'price', 'description', 'detail' e 'category' são obrigatórios." });
      }

      category = parseInt(category, 10);

      if (![1, 2, 3, 4, 5, 6].includes(category)) {
        return res.status(400).json({ error: "A categoria deve ser um número entre 1 e 6." });
      }

      const result = await productCreateService.createProduct(
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
        category
      );

      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = productCreateController;
