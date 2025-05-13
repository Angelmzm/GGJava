const express = require('express');

const orderCreateController = require('../controllers/orders/orderCreate.controller');
const orderListController = require('../controllers/orders/orderList.controller');
const orderListByIdController = require('../controllers/orders/orderListById.controller');
const orderDeleteController = require('../controllers/orders/orderDelete.controller');


const router = express.Router();

// Rotas para pedidos
router.post('/create', orderCreateController.createOrder);
 router.get('/list', orderListController.getAllOrders);
router.get('/list/:id', orderListByIdController.getOrderById);
router.delete('/delete/:id', orderDeleteController.deleteOrder);

module.exports = router;

