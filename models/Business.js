const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder'); // node library for geocoding - the process of taking a text-based description of a location, such as an address or the name of a place, and returning geographic coordinates.

const BusinessSchema = new mongoose.Schema({
  // add businesss type and name later on here.
  businessId: {
    type: String,
    required: [true, 'Please add a business ID'], //validator error!
    unique: true,
    trim: true, // trim any whitespace
    maxlength: [10, 'Business ID must be less than 10 characters']
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    type: {
      type: String,
      enum: ['Point'], // GeoJson point. enum is short for enumeration. Data type that contains fixed set of constants.
    },
    coordinates: {
      type: [Number],
      index: '2dsphere' // this supports quieries that calculate geometries on an earth-like sphere.
    },
    formattedAddress: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Geocode & create location. geocoder returns promise. This should automatically run everytime I try to save a new business.
BusinessSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  //console.log(loc);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  }

  //Do not save the typed in address in the database.
  this.address = undefined;
  next();

});

module.exports = mongoose.model('Business', BusinessSchema);