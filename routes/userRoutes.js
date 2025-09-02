const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.listUsers);
router.get('/create', userController.showCreateForm);
router.post('/create', userController.createUser);
router.get('/edit/:id', userController.showEditForm);
router.post('/edit/:id', userController.updateUser);
router.post('/delete/:id', userController.deleteUser);

module.exports = router;
