const pool = require('../models/db');

exports.createProduct = async (req, res) => {
  const { name, category, price, quantity, image_url, created_by } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO products (name, category, price, quantity, image_url, created_by)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, category, price, quantity, image_url, created_by]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Caught error in createProduct:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');  
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity } = req.body;

    const result = await pool.query(
      'UPDATE products SET name=$1, price=$2, quantity=$3 WHERE id=$4 RETURNING *',
      [name, price, quantity, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM products WHERE id=$1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
