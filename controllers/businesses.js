const Business = require('../models/Business');

// Get all businesses
// GET request to /api/v1/business
exports.getBusiness = async (req, res, next) => {
  try {
    const businesses = await Business.find(); // returns an arr of doc.

    return res.status(200).json({ // structure API responses.
      success: true,
      count: businesses.length,
      data: businesses
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' }) // 500 - server error
  }
}


// Create a business
// POST request to /api/v1/business
exports.addBusiness = (req, res, next) => {
  //console.log(req.body) //req.body = { businessId: '0004778', address: 'dog park' }
  Business.create(req.body, (err, result) => {
    if(err) { 
      console.error(err);
      if(err.code === 11000) {
        return res.status(400).json( {error: 'This business already exists'})
      }
    }
    console.log('result', result)
    return res.status(200).json({ data: result });
  })
};
  //try {
    //console.log('req.body: ', req.body)
    //create a database and store it in a variable.
    // const business = await Business.create(req.body);
    // return res.status(200).json({
    //   success: true,
    //   data: business
    // })
  //} catch (err) {
    //console.error(err);
    // if(err.code === 11000){
    //   return res.status(400).json({ error: 'This business already exists'})
    //}
    //res.status(500).json({ error: 'Server error' }) // 500 - server error
  //}