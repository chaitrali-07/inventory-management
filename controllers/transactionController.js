const pool = require('../models/db');

exports.createTransaction = async (req, res) => {
  const { product_id, quantity } = req.body;
  try {
    const result = await pool.query('INSERT INTO transactions (product_id, quantity) VALUES ($1, $2) RETURNING *', [product_id, quantity]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getTransactionsByUser = async (req, res) => {
  try {
    const user_id = req.user.id;

    const result = await pool.query(
      'SELECT * FROM transactions WHERE user_id=$1',
      [user_id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
