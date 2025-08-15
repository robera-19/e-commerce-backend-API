require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const config = require('./src/config/db');
const router = require('./src/router/route');
const errorHandler = require('./src/middleware/errorHandler');

const { DB_URI } = config;
let PORT = parseInt(config.PORT, 10) || 3000;
const MAX_PORT_RETRIES = 5;

if (!DB_URI || typeof DB_URI !== 'string') {
    console.error('Database connection error: DB_URI is not defined or not a string.');
    console.error('Set DB_URI in environment or src/config/index.js and restart.');
    process.exit(1);
}

async function connectDb() {
    try {
        await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
}

function createApp() {
    const app = express();
    app.use(express.json());
    app.use('/', router);
    if (errorHandler && typeof errorHandler === 'function') app.use(errorHandler);
    return app;
}

function tryListen(app, port, attemptsLeft) {
    const server = app.listen(port);
    server.on('listening', () => {
        console.log(`Server running on port ${port}`);
    });
    server.on('error', (err) => {
        if (err && (err.code === 'EACCES' || err.code === 'EADDRINUSE')) {
            console.warn(`Port ${port} unavailable (${err.code}).`);
            if (attemptsLeft > 0) {
                const nextPort = port + 1;
                console.warn(`Trying port ${nextPort} (${attemptsLeft - 1} retries left)...`);
                setTimeout(() => tryListen(app, nextPort, attemptsLeft - 1), 300);
                return;
            }
            console.error(`Failed to bind a port after retries. Resolve permission/port conflict or pick a different PORT.`);
            console.error('On Windows: run `netstat -ano | findstr :3000` to find PID, then `taskkill /PID <pid> /F` to stop it.');
            process.exit(1);
        }
        console.error('Server error:', err);
        process.exit(1);
    });
}

async function start() {
    await connectDb();
    const app = createApp();
    tryListen(app, PORT, MAX_PORT_RETRIES);
}

// Global handlers for cleaner shutdown on fatal errors
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

start();