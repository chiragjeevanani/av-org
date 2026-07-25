import express from 'express';
import { getSeoByPage, updateSeo } from '../controllers/seoController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:page', getSeoByPage);
router.put('/:page', protectAdmin, updateSeo);

export default router;
