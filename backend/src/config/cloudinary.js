import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (filePath, folder = 'av_group') => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      console.warn('[Cloudinary] Missing credentials in .env, falling back to local URL.');
      return null;
    }
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'auto'
    });
    return result.secure_url;
  } catch (error) {
    console.error('[Cloudinary] Upload Error:', error);
    return null;
  }
};

export default cloudinary;
