// To connect to the database.
const mongoose = require ('mongoose');

// Mongoose returns a promise func.
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
    console.log(`MongoDB connected: ${connection.connection.host}`)
  } catch (err){
    console.error(err);
    process.exit(1); // terminate the node js process.
  }
}

module.exports = connectDB;