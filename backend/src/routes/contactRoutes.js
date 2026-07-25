import express from 'express';
import { createInquiry, getInquiries, updateInquiryStatus, replyToInquiry, exportInquiriesCSV, deleteInquiry } from '../controllers/contactController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/', contactRateLimiter, createInquiry);
router.get('/', protectAdmin, getInquiries);
router.get('/export', protectAdmin, exportInquiriesCSV);
router.patch('/:id/status', protectAdmin, updateInquiryStatus);
router.post('/:id/reply', protectAdmin, replyToInquiry);
router.delete('/:id', protectAdmin, deleteInquiry);

export default router;
