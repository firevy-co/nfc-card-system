const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');

/**
 * GET /api/inquiries
 * Fetch inquiries. Supports optional ?uid filter.
 */
router.get('/', inquiryController.getAllInquiries);

/**
 * GET /api/inquiries/:id/messages
 * Fetch message thread for an inquiry.
 */
router.get('/:id/messages', inquiryController.getInquiryMessages);

/**
 * POST /api/inquiries/:id/messages
 * Add a message to an inquiry.
 */
router.post('/:id/messages', inquiryController.createMessage);

/**
 * DELETE /api/inquiries/:id
 * Permanently delete an inquiry AND its messages subcollection.
 */
router.delete('/:id', inquiryController.deleteInquiry);

/**
 * POST /api/inquiries
 * Submit a new inquiry to the network.
 */
router.post('/', inquiryController.createInquiry);

/**
 * PATCH /api/inquiries/:id/status
 * Update inquiry status (Unread / Processing / Resolved).
 */
router.patch('/:id/status', inquiryController.updateInquiryStatus);

/**
 * PATCH /api/inquiries/:id/read
 * Mark an inquiry as read.
 */
router.patch('/:id/read', inquiryController.markAsRead);

module.exports = router;
