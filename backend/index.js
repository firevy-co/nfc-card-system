require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { isOffline } = require('./config/firebase');

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- IDENTITY HUB ROUTES ---
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

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
