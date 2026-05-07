const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');

/**
 * GET /api/inquiries
 * Fetch all inquiries.
 */
router.get('/', inquiryController.getAllInquiries);

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

module.exports = router;
