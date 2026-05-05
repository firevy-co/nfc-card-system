const { db, isOffline } = require('../config/firebase');

exports.getAllCategories = async (req, res) => {
    try {
        if (isOffline) {
            return res.status(200).json([
                { id: '1', name: 'Business' },
                { id: '2', name: 'Creative' },
                { id: '3', name: 'Minimal' }
            ]);
        }
        const snapshot = await db.collection('categories').get();
        const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch categories", error: error.message });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Category name is required" });
        }
        if (isOffline) {
            return res.status(201).json({ id: `mock_${Date.now()}`, name, createdAt: new Date().toISOString() });
        }
        const newCategoryRef = db.collection('categories').doc();
        const newCategory = { name, createdAt: new Date().toISOString() };
        await newCategoryRef.set(newCategory);
        res.status(201).json({ id: newCategoryRef.id, ...newCategory });
    } catch (error) {
        res.status(500).json({ message: "Failed to create category", error: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (isOffline) {
            return res.status(200).json({ message: "Category deleted successfully (mock)" });
        }
        await db.collection('categories').doc(id).delete();
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete category", error: error.message });
    }
};
