const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Dev Config
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.get('/', (req, res) => res.send('API running'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// DB Config
const db = process.env.DATABASE_URL;

// Connect to mongoDB
mongoose
  .connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => console.log('Mongoose Connected'))
  .catch(err => console.log(err));






