const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const auth= require('../middlewares/authMiddleware');

console.log('🔎 typeof auth:', typeof auth);
console.log('🔎 typeof createProduct:', typeof createProduct);

router.post('/create', auth, createProduct);
router.get('/', auth, getAllProducts);
router.put('/update/:id', auth, updateProduct);
router.delete('/delete/:id', auth, deleteProduct);

module.exports = router;
