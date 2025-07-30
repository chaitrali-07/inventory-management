const pool = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email ,password_hash } = req.body;
  const hash = await bcrypt.hash(password_hash, 10);
  console.log("Incoming Register Data:", req.body);
  try {
    const user = await pool.query('INSERT INTO users (name,email , password_hash) VALUES ($1, $2 ,$3) RETURNING *', [name,email,password_hash]);
    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password_hash } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1 or password_hash= $2', [email,password_hash]);
    if (user.rows.length === 0) return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(password_hash, user.rows[0].password_hash);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
