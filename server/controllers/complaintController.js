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

const deleteComplaint = async (req, res) => {
  const complaintId = req.params.id;
  const citizenId = req.user.userId;

  try {
    const [result] = await pool.query(
      'DELETE FROM complaints WHERE id = ? AND citizen_id = ?',
      [complaintId, citizenId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found or you are not authorized to delete it.'
      });
    }

    return res.json({
      success: true,
      message: 'Complaint deleted successfully.'
    });
  } catch (err) {
    console.error('Delete complaint error:', err);

    return res.status(500).json({
      success: false,
      message: 'Failed to delete complaint.'
    });
  }
};

const getAllComplaintsForAdmin = async (req, res) => {
  try {
    // Fetch complaints with citizen and category details
    const [complaints] = await pool.query(`
      SELECT
        c.id,
        c.citizen_id,
        u.name AS citizen_name,
        u.email AS citizen_email,
        cat.name AS category,
        c.description,
        c.image_url,
        c.address,
        c.latitude,
        c.longitude,
        c.status,
        c.priority,
        c.created_at,
        c.updated_at
      FROM complaints c
      JOIN users u ON c.citizen_id = u.id
      JOIN categories cat ON c.category_id = cat.id
      ORDER BY c.created_at DESC
    `);

    // Calculate statistics from the actual database
    const [statsRows] = await pool.query(`
      SELECT
        COUNT(*) AS total,
        COALESCE(SUM(status = 'pending'), 0) AS pending,
        COALESCE(SUM(status = 'verified'), 0) AS verified,
        COALESCE(SUM(status = 'assigned'), 0) AS assigned,
        COALESCE(SUM(status = 'in_progress'), 0) AS in_progress,
        COALESCE(SUM(status = 'resolved'), 0) AS resolved,
        COALESCE(SUM(status = 'rejected'), 0) AS rejected
      FROM complaints
    `);

    res.json({
      success: true,
      stats: statsRows[0],
      complaints
    });
  } catch (err) {
    console.error('Admin complaints error:', err);
    res.status(500).json({
      error: 'Failed to fetch complaints'
    });
  }
};



module.exports = {
  createComplaint,
  getMyComplaints,
  getAllComplaintsForAdmin,
  deleteComplaint
};