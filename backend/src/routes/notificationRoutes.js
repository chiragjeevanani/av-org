import express from 'express';
import { getNotifications, markAsRead, markAllAsRead } from '../controllers/notificationController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protectAdmin, getNotifications);
router.put('/read-all', protectAdmin, markAllAsRead);
router.put('/:id/read', protectAdmin, markAsRead);

export default router;
