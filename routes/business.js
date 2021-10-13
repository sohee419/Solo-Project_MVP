const express = require('express');
const router = express.Router();
const { getBusiness, addBusiness } = require('../controllers/business');

// Routes
router
  .route('/')
  .get(getBusiness)
  .post(addBusiness);

module.exports = router; 