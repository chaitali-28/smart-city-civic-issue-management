// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const pool = require('../config/db');

// const register = async (req, res) => {
//   const { name, email, password, role, phone } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ error: 'Name, email, and password are required' });
//   }

//   try {
//     const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
//     if (existing.length > 0) {
//       return res.status(409).json({ error: 'Email already registered' });
//     }

//     const passwordHash = await bcrypt.hash(password, 10);

//     const [result] = await pool.query(
//       'INSERT INTO users (name, email, password_hash, role, phone) VALUES (?, ?, ?, ?, ?)',
//       [name, email, passwordHash, role || 'citizen', phone || null]
//     );

//     res.status(201).json({ success: true, userId: result.insertId });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: 'Email and password are required' });
//   }

//   try {
//     const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//     if (users.length === 0) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     const user = users[0];
//     const isMatch = await bcrypt.compare(password, user.password_hash);
//     if (!isMatch) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     const token = jwt.sign(
//       { userId: user.id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_EXPIRES_IN }
//     );

//     res.json({
//       success: true,
//       token,
//       user: { id: user.id, name: user.name, email: user.email, role: user.role },
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// module.exports = { register, login };



const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const register = async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      error: 'Name, email, and password are required',
    });
  }

  try {
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        error: 'Email already registered',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Public registration is restricted to citizens.
    const [result] = await pool.query(
      `INSERT INTO users
       (name, email, password_hash, role, phone)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, passwordHash, 'citizen', phone || null]
    );

    return res.status(201).json({
      success: true,
      userId: result.insertId,
    });
  } catch (err) {
    console.error('Registration error:', err);

    return res.status(500).json({
      error: 'Registration failed. Please try again.',
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required',
    });
  }

  try {
    const [users] = await pool.query(
      `SELECT id, name, email, password_hash, role
       FROM users
       WHERE email = ?`,
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        error: 'Invalid email or password',
      });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isMatch) {
      return res.status(401).json({
        error: 'Invalid email or password',
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is missing');

      return res.status(500).json({
        error: 'Authentication is not configured correctly.',
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
      }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);

    return res.status(500).json({
      error: 'Login failed. Please try again.',
    });
  }
};

module.exports = { register, login };
