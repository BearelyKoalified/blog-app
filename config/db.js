const mongoose = require('mongoose');

const connectDB = async (db) => {
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