const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * IDENTITY PIPELINE: GET /api/users
 * Audits every participant registered within the Firevy.co network.
 */
router.get('/', userController.getAllUsers);

/**
 * IDENTITY PIPELINE: GET /api/users/:uid
 * Fetches a single user profile from the database (admin bypass for strict rules).
 */
router.get('/:uid', userController.getUserById);

/**
 * IDENTITY PIPELINE: POST /api/users/sync
 * Syncs the user from Auth to Firestore (creating doc if it doesn't exist).
 */
router.post('/sync', userController.syncUser);

router.put('/:uid/profile', userController.updateUserProfile);

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

/**
 * CLEARANCE LEVEL: PATCH /api/users/:uid/role
 * Updates a participant's system authority (Admin/User).
 */
router.patch('/:uid/role', userController.updateUserRole);

module.exports = router;
