const express = require('express');
const connectDB = require('./config/db');
const config = require('config');
const app = express();

// Dev Config using .env file - undecided which approach I like more so leaving for now
// if(process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }

// Connect Database
connectDB();

app.get('/', (req, res) => res.send('API running'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

console.log('JWT_SECRET:' ,config.get('JWT_SECRET'));

