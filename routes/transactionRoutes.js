const express = require('express');
const router = express.Router();
const {
  createTransaction,
  getTransactionsByUser,
} = require('../controllers/transactionController');
const auth = require('../middlewares/authMiddleware');

router.post('/record', auth, createTransaction);
router.get('/my', auth, getTransactionsByUser);

module.exports = router;
