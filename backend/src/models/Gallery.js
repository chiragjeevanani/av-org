import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  type: { type: String, enum: ['image', 'youtube'], default: 'image' },
  imageUrl: { type: String, default: '' },
  youtubeUrl: { type: String, default: '' },
  thumbnailUrl: { type: String, default: '' },
  category: { type: String, default: 'General', trim: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Gallery', gallerySchema);
