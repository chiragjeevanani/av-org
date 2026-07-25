import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  url: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, default: 0 },
  folder: { type: String, default: 'general' }
}, { timestamps: true });

export default mongoose.model('Media', mediaSchema);
