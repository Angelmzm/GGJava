const productUpdateService = require('../../services/products/productUpdate.service');

const productUpdateController = {
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const result = await productUpdateService.updateProduct(id, updateData);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = productUpdateController;
