const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * IDENTITY PIPELINE: GET /api/users
 * Audits every participant registered within the Firevy.co network.
 */
router.get('/', userController.getAllUsers);

/**
 * IDENTITY PIPELINE: PUT /api/users/:uid
 * Performs a deep update of participant credentials (Email, Name, Role).
 */
router.put('/:uid', userController.updateUserDetails);

/**
 * IDENTITY PIPELINE: POST /api/users/onboard
 * Processes and persists full organizational identity details during onboarding.
 */
router.post('/onboard', userController.completeProfile);

/**
 * IDENTITY PIPELINE: DELETE /api/users/:uid
 * Permanently removes an identity from both Auth and the Core Database.
 */
router.delete('/:uid', userController.deleteUser);

module.exports = router;
