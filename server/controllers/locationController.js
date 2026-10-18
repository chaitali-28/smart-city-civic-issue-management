
const { verifyDhuleLocation } = require('../services/locationService');

const validateLocation = async (req, res) => {
  const { address } = req.body;

  if (typeof address !== 'string' || !address.trim()) {
    return res.status(400).json({
      valid: false,
      message: 'Please enter an issue location.',
    });
  }

  const result = await verifyDhuleLocation(address);

  if (result.unavailable) {
    return res.status(503).json(result);
  }

  if (!result.valid) {
    return res.status(422).json(result);
  }

  return res.status(200).json(result);
};

module.exports = { validateLocation };
