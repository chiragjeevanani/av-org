import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  clientName: { type: String, default: '' },
  industry: { type: String, default: '' },
  category: { type: String, required: true, trim: true },
  location: { type: String, default: '' },
  year: { type: String, default: '' },
  description: { type: String, default: '' },
  services: [{ type: String }],
  coverImage: { type: String, default: '' },
  gallery: [{ type: String }],
  youtubeVideo: { type: String, default: '' },
  status: { type: String, enum: ['completed', 'ongoing'], default: 'completed' },
  featured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
