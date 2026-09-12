const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { createComplaint, getMyComplaints } = require('../controllers/complaintController');

router.post('/', verifyToken, upload.single('image'), createComplaint);
router.get('/my', verifyToken, getMyComplaints);

module.exports = router;