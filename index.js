require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./src/config/db');
const router = require('./src/router/route');
const errorHandler = require('./src/middleware/errorHandler');

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

if (!DB_URI) {
  console.error('Missing database url in .env file');
  process.exit(1);
}

async function start() {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/', router);
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
}

start();
