const pool = require('../config/db');

const getCategories = async (req, res) => {
  try {
    const [categories] = await pool.query('SELECT id, name FROM categories ORDER BY name');
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCategories };