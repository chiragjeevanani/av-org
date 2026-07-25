import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  companyName: { type: String, default: 'AV Group Organization' },
  footerDescription: { type: String, default: 'Leading provider of sustainable clean energy, wind engineering, EV charging infrastructure and MSME advisory solutions.' },
  logo: { type: String, default: '' },
  footerLogo: { type: String, default: '' },
  sectionImages: {
    windEnergy: { type: String, default: '' },
    evCharging: { type: String, default: '' }
  },
  galleryImages: {
    gallery1: { type: String, default: '' },
    gallery2: { type: String, default: '' },
    gallery3: { type: String, default: '' }
  },
  emailSettings: {
    receiverEmail: { type: String, default: 'avgroup284@gmail.com' },
    replyEmail: { type: String, default: 'avgroup284@gmail.com' },
    companyDisplayName: { type: String, default: 'AV Group Organization Management' },
    signature: { type: String, default: 'AV Group Organization Executive Team' },
    supportPhone: { type: String, default: '+91 99786 55799' }
  },
  contact: {
    phone: { type: String, default: '+91 99786 55799' },
    email: { type: String, default: 'info@worldexportbhc.com' },
    serviceArea: { type: String, default: 'Gujarat • Maharashtra • Madhya Pradesh • Rajasthan' },
    address: { type: String, default: 'Gujarat, India' }
  },
  socialLinks: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    youtube: { type: String, default: '' }
  }
}, { timestamps: true });

export default mongoose.model('Settings', settingsSchema);
