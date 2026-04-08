const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');

/**
 * IDENTITY NODES API
 * Path: /api/templates
 */

// List all identity templates in the network
router.get('/', templateController.getAllTemplates);

// Deploy a new identity node to the library
router.post('/', templateController.createTemplate);

// Synchronize/Modify an existing identity node
router.put('/:id', templateController.updateTemplate);

// Retire/Purge an identity node from the network
router.delete('/:id', templateController.deleteTemplate);

module.exports = router;
