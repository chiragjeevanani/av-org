import express from 'express';
import { getPublicSettings, getSettings, updateSettings } from '../controllers/settingsController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route for public website
router.get('/public', getPublicSettings);

// Admin routes
router.get('/', protectAdmin, getSettings);
router.put('/', protectAdmin, updateSettings);

export default router;
