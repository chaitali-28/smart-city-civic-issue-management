
const express = require('express');
const router = express.Router();

const {
  validateLocation,
} = require('../controllers/locationController');

router.post('/validate', validateLocation);

module.exports = router;
