require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { isOffline } = require('./config/firebase');

const app = express();

// --- CRITICAL: CRASH PREVENTION ---
process.on('uncaughtException', (err) => {
    console.error('[CRITICAL]: Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('[CRITICAL]: Unhandled Rejection at:', promise, 'reason:', reason);
});

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// --- IDENTITY HUB ROUTES ---
const userRoutes = require('./routes/userRoutes');
const templateRoutes = require('./routes/templateRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');

app.use('/api/users', userRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/inquiries', inquiryRoutes);

/**
 * SYSTEM HANDSHAKE: GET /api/status
 * Audits the cloud synchronization health.
 */
app.get('/api/status', (req, res) => {
    res.json({
        status: isOffline ? "STANDBY (MOCK)" : "ONLINE",
        identity_hub: isOffline ? "DISCONNECTED" : "SYNCED",
        handshake: true,
        timestamp: new Date().toISOString()
    });
});

// --- SERVER LIFESTYLE ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    process.stdout.write('\x1Bc'); // Clear terminal for clean start
    console.log(`\n\x1b[36m[IDENTITY SYSTEM]\x1b[0m: Firevy.co ORCHESTRATION SERVER RUNNING`);
    console.log(`\x1b[32m[HANDSHAKE]\x1b[0m: http://localhost:${PORT}/api/status`);
    console.log(`\x1b[33m[STATUS]\x1b[0m: ${isOffline ? 'STANDBY (MOCK)' : 'CLOUD SYNCHRONISED'}\n`);
});
