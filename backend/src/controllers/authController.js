import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is missing from environment variables');
  }
  return process.env.JWT_SECRET;
};

const getRefreshSecret = () => {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error('REFRESH_TOKEN_SECRET is missing from environment variables');
  }
  return process.env.REFRESH_TOKEN_SECRET;
};

const generateAccessToken = (id) => {
  return jwt.sign({ id: id.toString() }, getJwtSecret(), { expiresIn: '1h' });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id: id.toString() }, getRefreshSecret(), { expiresIn: '7d' });
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin || !admin.isActive) {
      return res.status(401).json({ success: false, message: 'Invalid credentials or account disabled' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    admin.lastLogin = new Date();
    await admin.save();

    const accessToken = generateAccessToken(admin._id);
    const refreshToken = generateRefreshToken(admin._id);

    return res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      token: accessToken,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const refreshTokenHandler = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ success: false, message: 'Refresh token required' });
    }

    const decoded = jwt.verify(refreshToken, getRefreshSecret());
    const admin = await Admin.findById(decoded.id);

    if (!admin || !admin.isActive) {
      return res.status(401).json({ success: false, message: 'User not found or inactive' });
    }

    const newAccessToken = generateAccessToken(admin._id);
    const newRefreshToken = generateRefreshToken(admin._id);

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      token: newAccessToken
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired refresh token. Please log in again.' });
  }
};

export const getAdminProfile = async (req, res) => {
  return res.status(200).json({
    success: true,
    admin: req.admin
  });
};
