const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, productController.listProducts);
router.get('/create', isAuthenticated, productController.showCreateForm);
router.post('/create', isAuthenticated, productController.createProduct);
router.get('/edit/:id', isAuthenticated, productController.showEditForm);
router.post('/edit/:id', isAuthenticated, productController.updateProduct);
router.post('/delete/:id', isAuthenticated, productController.deleteProduct);

module.exports = router;
