const express = require('express');
const connectDB = require('./config/db')

const app = express();

// Dev Config
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Connect Database
connectDB(process.env.DATABASE_URL);

app.get('/', (req, res) => res.send('API running'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

