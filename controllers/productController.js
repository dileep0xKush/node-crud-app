const productService = require('../services/productService');

exports.listProducts = async (req, res) => {
  const { search = '', page = 1 } = req.query;

  try {
    const data = await productService.getAllProducts(search, parseInt(page));
    res.render('products/index', {
      title: 'Products',
      search,
      ...data
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch products');
  }
};

exports.showCreateForm = (req, res) => {
  res.render('products/create', { title: 'Add Product' });
};

exports.createProduct = async (req, res) => {
  try {
    await productService.createProduct(req.body);
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.status(400).send('Failed to create product');
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.render('products/edit', { title: 'Edit Product', product });
  } catch (err) {
    res.status(404).send('Product not found');
  }
};

exports.updateProduct = async (req, res) => {
  try {
    await productService.updateProduct(req.params.id, req.body);
    res.redirect('/products');
  } catch (err) {
    res.status(400).send('Update failed');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.redirect('/products');
  } catch (err) {
    res.status(400).send('Delete failed');
  }
};
