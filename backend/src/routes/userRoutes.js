const express = require('express');
const userCreateController = require('../controllers/users/userCreate.controller');
const authenticateToken = require('../middlewares/authenticateToken');
const userDeleteController = require('../controllers/users/userDelete.controller');
const userUpdateController = require('../controllers/users/userUpdate.controller');
const userListController = require('../controllers/users/userList.controller');
const userListByIdController = require('../controllers/users/userListById.controller');
const userAddressUpdateController = require('../controllers/users/userAddressUpdate.controller')

const router = express.Router();

router.post('/register', userCreateController.register);
router.post('/login', userCreateController.login);
router.put('/update/:id',  userUpdateController.update);
router.delete('/delete/:id', userDeleteController.deleteUser);
//router.delete('/delete/:id', authenticateToken, userDeleteController.deleteUser);
router.get('/list', userListController.list);
router.get('/list/:id', userListByIdController.getUser);
router.put('/update/:id/address', userAddressUpdateController.update);

module.exports = router;
