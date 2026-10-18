require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const complaintRoutes = require('./routes/complaintRoutes');
app.use('/api/complaints', complaintRoutes);

const categoryRoutes = require('./routes/categoryRoutes');
app.use('/api/categories', categoryRoutes);


const { verifyToken, requireRole } = require('./middleware/authMiddleware');

app.get('/api/protected-test', verifyToken, (req, res) => {
  res.json({ message: 'You are authenticated', user: req.user });
});

app.get('/api/admin-only-test', verifyToken, requireRole('admin'), (req, res) => {
  res.json({ message: 'You are an admin', user: req.user });
});

app.get('/', (req, res) => {
  res.json({ message: 'SmartCity backend is running' });
});

app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({ dbConnected: true, result: rows[0].result });
  } catch (err) {
    res.status(500).json({ dbConnected: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});