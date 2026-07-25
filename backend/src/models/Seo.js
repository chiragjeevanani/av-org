import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({
  page: { type: String, required: true, unique: true, lowercase: true, trim: true }, // home, about, projects, gallery, contact
  title: { type: String, required: true },
  description: { type: String, default: '' },
  keywords: [{ type: String }],
  ogImage: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Seo', seoSchema);
