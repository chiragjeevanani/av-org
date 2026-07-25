import Media from '../models/Media.js';
import path from 'path';
import fs from 'fs';
import { uploadToCloudinary } from '../config/cloudinary.js';

export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const localFilePath = req.file.path;
    const host = req.get('host');
    const protocol = req.protocol;
    let fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

    // Attempt Cloudinary upload if credentials are provided
    const cloudinaryUrl = await uploadToCloudinary(localFilePath, 'av_group_settings');
    if (cloudinaryUrl) {
      fileUrl = cloudinaryUrl;
      // Clean up local temp file after successful Cloudinary upload
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    }

    const media = await Media.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: fileUrl,
      mimeType: req.file.mimetype,
      size: req.file.size,
      folder: req.body.folder || 'general'
    });

    return res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      url: fileUrl,
      media
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllMedia = async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: media.length, media });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }

    const filePath = path.join(process.cwd(), 'uploads', media.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await media.deleteOne();
    return res.status(200).json({ success: true, message: 'Media deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
