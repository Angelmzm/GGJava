const productDeleteService = require('../../services/products/productDelete.service');

const productDeleteController = {
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const result = await productDeleteService.deleteProduct(id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = productDeleteController;
