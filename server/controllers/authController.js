

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const pool = require('../config/db');

// const register = async (req, res) => {
//   const { name, email, password, phone } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({
//       error: 'Name, email, and password are required',
//     });
//   }

//   try {
//     const [existing] = await pool.query(
//       'SELECT id FROM users WHERE email = ?',
//       [email]
//     );

//     if (existing.length > 0) {
//       return res.status(409).json({
//         error: 'Email already registered',
//       });
//     }

//     const passwordHash = await bcrypt.hash(password, 10);

//     // Public registration is restricted to citizens.
//     const [result] = await pool.query(
//       `INSERT INTO users
//        (name, email, password_hash, role, phone)
//        VALUES (?, ?, ?, ?, ?)`,
//       [name, email, passwordHash, 'citizen', phone || null]
//     );

//     return res.status(201).json({
//       success: true,
//       userId: result.insertId,
//     });
//   } catch (err) {
//     console.error('Registration error:', err);

//     return res.status(500).json({
//       error: 'Registration failed. Please try again.',
//     });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({
//       error: 'Email and password are required',
//     });
//   }

//   try {
//     const [users] = await pool.query(
//       `SELECT id, name, email, password_hash, role
//        FROM users
//        WHERE email = ?`,
//       [email]
//     );

//     if (users.length === 0) {
//       return res.status(401).json({
//         error: 'Invalid email or password',
//       });
//     }

//     const user = users[0];

//     const isMatch = await bcrypt.compare(
//       password,
//       user.password_hash
//     );

//     if (!isMatch) {
//       return res.status(401).json({
//         error: 'Invalid email or password',
//       });
//     }

//     if (!process.env.JWT_SECRET) {
//       console.error('JWT_SECRET is missing');

//       return res.status(500).json({
//         error: 'Authentication is not configured correctly.',
//       });
//     }

//     const token = jwt.sign(
//       {
//         userId: user.id,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: process.env.JWT_EXPIRES_IN || '1d',
//       }
//     );

//     return res.json({
//       success: true,
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error('Login error:', err);

//     return res.status(500).json({
//       error: 'Login failed. Please try again.',
//     });
//   }
// };

// module.exports = { register, login };









const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const register = async (req, res) => {
  const { name, username, email, password, phone } = req.body;

  const cleanName = typeof name === 'string' ? name.trim() : '';
  const cleanUsername =
    typeof username === 'string' ? username.trim().toLowerCase() : '';
  const cleanEmail =
    typeof email === 'string' ? email.trim().toLowerCase() : '';
  const cleanPhone =
    typeof phone === 'string' ? phone.trim() : '';

  // Username and password are required. Email is optional.
  if (!cleanName || !cleanUsername || !password) {
    return res.status(400).json({
      error: 'Name, username, and password are required.',
    });
  }

  // Usernames cannot contain @, so login can distinguish
  // usernames from email addresses.
  if (!/^[a-z0-9_]{3,50}$/.test(cleanUsername)) {
    return res.status(400).json({
      error:
        'Username must be 3–50 characters and contain only letters, numbers, and underscores.',
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters long.',
    });
  }

  if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return res.status(400).json({
      error: 'Please enter a valid email address or leave it blank.',
    });
  }

  try {
    // Check username and email uniqueness.
    const [existing] = await pool.query(
      `SELECT id, username, email
       FROM users
       WHERE username = ?
          OR (? <> '' AND email = ?)
       LIMIT 1`,
      [cleanUsername, cleanEmail, cleanEmail]
    );

    if (existing.length > 0) {
      if (existing[0].username === cleanUsername) {
        return res.status(409).json({
          error: 'Username already taken. Please choose another.',
        });
      }

      return res.status(409).json({
        error: 'Email already registered. Please use another email.',
      });
    }

    // Avoid ambiguous logins: a username must not match
    // an existing account's email address.
    const [emailCollision] = await pool.query(
      `SELECT id FROM users
       WHERE email = ?
       LIMIT 1`,
      [cleanUsername]
    );

    if (emailCollision.length > 0) {
      return res.status(409).json({
        error: 'This username is unavailable. Please choose another.',
      });
    }

    if (cleanEmail) {
      const [usernameCollision] = await pool.query(
        `SELECT id FROM users
         WHERE username = ?
         LIMIT 1`,
        [cleanEmail]
      );

      if (usernameCollision.length > 0) {
        return res.status(409).json({
          error: 'This email conflicts with an existing username.',
        });
      }
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Public registration always creates a citizen account.
    const [result] = await pool.query(
      `INSERT INTO users
       (name, username, email, password_hash, role, phone)
       VALUES (?, ?, ?, ?, 'citizen', ?)`,
      [
        cleanName,
        cleanUsername,
        cleanEmail || null,
        passwordHash,
        cleanPhone || null,
      ]
    );

    return res.status(201).json({
      success: true,
      message: 'Citizen account created successfully.',
      userId: result.insertId,
    });
  } catch (err) {
    console.error('Registration error:', err);

    // Handle unique-index conflicts safely.
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        error: 'Username or email is already registered.',
      });
    }

    return res.status(500).json({
      error: 'Registration failed. Please try again.',
    });
  }
};

const login = async (req, res) => {
  // "identifier" supports the updated frontend.
  // "email" preserves compatibility with the existing frontend.
  const rawIdentifier = req.body.identifier ?? req.body.email;
  const { password } = req.body;

  const identifier =
    typeof rawIdentifier === 'string' ? rawIdentifier.trim() : '';

  if (!identifier || typeof password !== 'string' || !password) {
    return res.status(400).json({
      error: 'Username or email and password are required.',
    });
  }

  try {
    // Existing workers and authorities can still use email.
    // Citizens can use their username or email.
    const isEmail = identifier.includes('@');

    const [users] = await pool.query(
      `SELECT id, name, username, email, password_hash, role
       FROM users
       WHERE ${isEmail ? 'email' : 'username'} = ?
       LIMIT 1`,
      [isEmail ? identifier.toLowerCase() : identifier.toLowerCase()]
    );

    if (users.length === 0) {
      return res.status(401).json({
        error: 'Invalid username/email or password.',
      });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isMatch) {
      return res.status(401).json({
        error: 'Invalid username/email or password.',
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
        username: user.username,
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


