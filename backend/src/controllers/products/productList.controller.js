const productListService = require('../../services/products/productList.service');  // Ajuste o caminho conforme necessário

const productListController = {
  async getAllProducts(req, res) {
    try {
      const products = await productListService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = productListController;
