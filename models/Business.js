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
  // name: {
  //   type: String,
  //   required: [true, 'Please add the name of the business']
  // },
  address: { // when user enters address, this will go through the MW and translated into location with coords.
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    type: {
      type: String,
      enum: ['Point'], // Only acceptable data type, GeoJson point in location property. enum is short for enumeration. Data type that contains fixed set of constants.
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

// Geocode & create location. geocoder returns promise. This should automatically run everytime I try to save a new business. This will convert the address into location info with long and lat before it gets saved in the database. Use pre becaues we want this to run before it gets saved in the database. 
// MW
BusinessSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address); // geocode the location.
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

// Model is to perform query.
module.exports = mongoose.model('Business', BusinessSchema);