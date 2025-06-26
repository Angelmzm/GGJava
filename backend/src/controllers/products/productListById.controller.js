const productListByIdService = require('../../services/products/productListById.service');

const productListByIdController = {
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await productListByIdService.getProductById(id);
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = productListByIdController;
