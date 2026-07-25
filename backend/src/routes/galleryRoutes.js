import express from 'express';
import { getGalleryItems, createGalleryItem, updateGalleryItem, deleteGalleryItem } from '../controllers/galleryController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getGalleryItems);
router.post('/', protectAdmin, createGalleryItem);
router.put('/:id', protectAdmin, updateGalleryItem);
router.delete('/:id', protectAdmin, deleteGalleryItem);

export default router;
