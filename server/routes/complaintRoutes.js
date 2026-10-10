// const express = require('express');
// const router = express.Router();
// const { verifyToken } = require('../middleware/authMiddleware');
// const upload = require('../middleware/uploadMiddleware');
// const { createComplaint, getMyComplaints } = require('../controllers/complaintController');

// router.post('/', verifyToken, upload.single('image'), createComplaint);
// router.get('/my', verifyToken, getMyComplaints);

// module.exports = router;


const express = require('express');
const router = express.Router();

const {
  verifyToken,
  requireRole
} = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

const {
  createComplaint,
  getMyComplaints,
  getAllComplaintsForAdmin
} = require('../controllers/complaintController');

// Citizen: submit a complaint
router.post(
  '/',
  verifyToken,
  upload.single('image'),
  createComplaint
);

// Citizen: view their own complaints
router.get(
  '/my',
  verifyToken,
  getMyComplaints
);

// Admin only: view all citizens' complaints and statistics
router.get(
  '/admin/all',
  verifyToken,
  requireRole('admin'),
  getAllComplaintsForAdmin
);

module.exports = router;
