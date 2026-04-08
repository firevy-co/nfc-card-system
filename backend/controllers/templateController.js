const fs = require('fs');
const path = require('path');
const { db, isOffline } = require('../config/firebase');

/**
 * IDENTITY NODE CONTROLLER
 * Advanced Orchestrator: Dynamically toggles between Cloud Sync and Local JSON Persistence.
 */

const DATA_PATH = path.join(__dirname, '../data/templates.json');

// Ensure data directory exists
if (!fs.existsSync(path.dirname(DATA_PATH))) {
    fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
}

// Ensure database file exists
if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, JSON.stringify([], null, 2));
}

const getLocalData = () => JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const saveLocalData = (data) => fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

// [LIST]: Retrieve all active templates
exports.getAllTemplates = async (req, res) => {
    if (isOffline) {
        console.warn("[PERSISTENCE]: Cloud offline. Switching to Local JSON Drive.");
        return res.status(200).json(getLocalData());
    }
    try {
        const snapshot = await db.collection('templates').orderBy('createdAt', 'desc').get();
        const templates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({ error: "Sync Error.", details: error.message });
    }
};

// [CREATE]: Deploy a new template node
exports.createTemplate = async (req, res) => {
    const templateData = { 
        ...req.body, 
        createdAt: new Date().toISOString(),
        id: req.body.id || `node_${Date.now()}` 
    };

    if (isOffline) {
        const data = getLocalData();
        data.unshift(templateData);
        saveLocalData(data);
        return res.status(201).json(templateData);
    }

    try {
        const docRef = await db.collection('templates').add(templateData);
        res.status(201).json({ id: docRef.id, ...templateData });
    } catch (error) {
        res.status(500).json({ error: "Deployment Fail.", details: error.message });
    }
};

// [UPDATE]: Synchronize/Modify template structure
exports.updateTemplate = async (req, res) => {
    const { id } = req.params;
    const updatableData = req.body;

    if (isOffline) {
        console.warn(`[SYNC]: Locally updating node: ${id}`);
        const data = getLocalData();
        const index = data.findIndex(t => t.id === id);
        if (index !== -1) {
            data[index] = { ...data[index], ...updatableData, lastModified: new Date().toISOString() };
            saveLocalData(data);
            return res.status(200).json({ id, message: "Local sync successful." });
        } else {
            // Upsert if missing
            data.push({ ...updatableData, id, createdAt: new Date().toISOString() });
            saveLocalData(data);
            return res.status(200).json({ id, message: "Node initialized in local drive." });
        }
    }

    try {
        await db.collection('templates').doc(id).set({
            ...updatableData,
            lastModified: new Date().toISOString()
        }, { merge: true });
        res.status(200).json({ id, message: "Cloud sync successful." });
    } catch (error) {
        res.status(500).json({ error: "Cloud sync failure.", details: error.message });
    }
};

// [DELETE]: Retire/Purge template node
exports.deleteTemplate = async (req, res) => {
    const { id } = req.params;

    if (isOffline) {
        let data = getLocalData();
        data = data.filter(t => t.id !== id);
        saveLocalData(data);
        return res.status(200).json({ id, message: "Local drive purged." });
    }

    try {
        await db.collection('templates').doc(id).delete();
        res.status(200).json({ id, message: "Cloud purge successful." });
    } catch (error) {
        res.status(500).json({ error: "Cloud purge failure.", details: error.message });
    }
};
