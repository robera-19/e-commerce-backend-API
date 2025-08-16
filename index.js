require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./src/config/db'); // adjust path if different
const router = require('./src/router/route'); // or './src/router/index'
const errorHandler = require('./src/middleware/errorHandler');

console.log('index.js loaded, env injected'); // <- diagnostic log

// Helper: normalize a raw port string -> integer port
function normalizePort(raw) {
    if (raw === undefined || raw === null) return 3000;
    // remove non-digit characters then parse
    const cleaned = String(raw).trim().replace(/[^\d]/g, '');
    const n = parseInt(cleaned, 10);
    return Number.isFinite(n) && n > 0 ? n : 3000;
}

// Helper: sanitize DB URI (remove wrapping quotes and trailing commas/spaces)
function sanitizeDbUri(raw) {
    if (!raw) return '';
    return String(raw).trim().replace(/^["']+|["',\s]+$/g, '');
}

// read raw env values (dotenv already loaded)
const rawPort = process.env.PORT || process.env.APP_PORT || process.env.PORT_NUMBER;
const rawDb = process.env.DB_URI || process.env.MONGODB_URI || '';

// sanitize
const PORT = normalizePort(rawPort);
const DB_URI = sanitizeDbUri(rawDb);

console.log('Starting app - DB_URI:', DB_URI ? DB_URI : '(empty)', 'PORT:', PORT);

if (!DB_URI) {
    console.error('Database connection error: DB_URI is not defined or not a string.');
    console.error('Fix .env (no wrapping quotes or trailing commas). Example: DB_URI=mongodb://localhost:27017/ecommerce');
    process.exit(1);
}

async function start() {
    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Database connection error:', err.message || err);
        process.exit(1);
    }

    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use('/', router);
    if (errorHandler && typeof errorHandler === 'function') app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

start();