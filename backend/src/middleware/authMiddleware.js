import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const protectAdmin = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is missing from environment variables');
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const adminId = typeof decoded.id === 'object' ? decoded.id.id || decoded.id : decoded.id;
      req.admin = await Admin.findById(adminId).select('-password');

      if (!req.admin || !req.admin.isActive) {
        return res.status(401).json({ success: false, message: 'Account disabled or not found' });
      }
      next();
    } catch (error) {
      console.error('[authMiddleware] Token verification failed:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};
