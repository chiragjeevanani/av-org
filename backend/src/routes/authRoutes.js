import express from 'express';
import { loginAdmin, refreshTokenHandler, getAdminProfile } from '../controllers/authController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/refresh', refreshTokenHandler);
router.get('/me', protectAdmin, getAdminProfile);

export default router;
