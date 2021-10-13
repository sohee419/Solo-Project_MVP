const mongoose = require ('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log(`MongoDB connected: ${connection.connection.host}`)
  } catch (err){
    console.error(err);
    process.exit(1);
  }
}

module.exports = connectDB;