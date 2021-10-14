const express = require('express');
const router = express.Router();
const { getBusiness, addBusiness } = require('../controllers/businesses');

// Routes
router
  .route('/')
  .get(getBusiness)
  .post(addBusiness);

module.exports = router; 