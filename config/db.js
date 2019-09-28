const mongoose = require('mongoose');
const config = require('config');
const db = config.get('DATABASE_URL');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
    console.log('Mongoose Connected to DB');
  } catch(err) {
    console.error(err.message);
    // Exit Process with failure
    process.exit(1);
  }
};

module.exports = connectDB;