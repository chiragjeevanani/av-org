import express from 'express';
import { uploadMedia, getAllMedia, deleteMedia } from '../controllers/mediaController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/upload', protectAdmin, upload.single('file'), uploadMedia);
router.get('/', protectAdmin, getAllMedia);
router.delete('/:id', protectAdmin, deleteMedia);

export default router;
