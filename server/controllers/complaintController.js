const pool = require('../config/db');

const createComplaint = async (req, res) => {
  const { description, category_id, address, latitude, longitude } = req.body;
  const citizenId = req.user.userId;
  const imageUrl = req.file ? req.file.path : null;

  if (!description || !category_id) {
    return res.status(400).json({ error: 'Description and category are required' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO complaints (citizen_id, category_id, description, image_url, address, latitude, longitude)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [citizenId, category_id, description, imageUrl, address || null, latitude || null, longitude || null]
    );

    res.status(201).json({ success: true, complaintId: result.insertId, imageUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMyComplaints = async (req, res) => {
  const citizenId = req.user.userId;

  try {
    const [complaints] = await pool.query(
      `SELECT c.id, c.description, c.image_url, c.status, c.priority, c.address, c.created_at, cat.name AS category
       FROM complaints c
       JOIN categories cat ON c.category_id = cat.id
       WHERE c.citizen_id = ?
       ORDER BY c.created_at DESC`,
      [citizenId]
    );

    res.json({ complaints });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createComplaint, getMyComplaints };