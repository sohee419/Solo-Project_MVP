const Business = require('../models/Business');

// @desc Get all businesses
// @route GET /api/v1/business
// @access Public
exports.getBusiness = async (req, res, next) => {
  try {
    const business = await Business.find();

    return res.status(200).json({
      success: true,
      count: business.length,
      data: business
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' }) // 500 - server error
  }
}


// @desc Create a business
// @route POST /api/v1/business
// @access Public
exports.addBusiness = async (req, res, next) => {
  try {
    //console.log('req.body: ', req.body)
    // create a database and store it in a variable.
    const business = await Business.create(req.body);
    return res.status(200).json({
      success: true,
      data: business
    })
  } catch (err) {
    //console.error(err);
    if(err.code === 11000){
      return res.status(400).json({ error: 'This business already exists'})
    }
    res.status(500).json({ error: 'Server error' }) // 500 - server error
  }
  
}