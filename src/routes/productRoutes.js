const express = require('express');

const productCreateController = require('../controllers/products/productCreate.controller');
const productDeleteController = require('../controllers/products/productDelete.controller');
const productUpdateController = require('../controllers/products/productUpdate.controller');
const productListController = require('../controllers/products/productList.controller');
const productListByIdController = require('../controllers/products/productListById.controller');
const authenticateToken = require('../middlewares/authenticateToken');
const isAdmMiddleware = require('../middlewares/isAdmMiddleware');

const router = express.Router();


router.post('/create',  productCreateController.createProduct);
router.put('/update/:id',  productUpdateController.updateProduct);
router.delete('/delete/:id', productDeleteController.deleteProduct);

// Rotas com restrição de administrador
//router.post('/create', authenticateToken, isAdmMiddleware, productCreateController.createProduct);
//router.put('/update/:id', authenticateToken, isAdmMiddleware, productUpdateController.updateProduct);
//router.delete('/delete/:id', authenticateToken, isAdmMiddleware, productDeleteController.deleteProduct);

// Rotas sem restrição de administrador
router.get('/list/:id', productListByIdController.getProductById);
router.get('/list', productListController.getAllProducts);

module.exports = router;
