import express from 'express';
import { getHomepageSections, updateHomepageSection } from '../controllers/homepageController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getHomepageSections);
router.put('/:sectionKey', protectAdmin, updateHomepageSection);

export default router;
