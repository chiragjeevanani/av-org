import mongoose from 'mongoose';

const homepageSectionSchema = new mongoose.Schema({
  sectionKey: { type: String, required: true, unique: true, trim: true }, // hero, wind, ev, about, stats, why_choose_us
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  description: { type: String, default: '' },
  cards: [{
    title: String,
    subtitle: String,
    description: String,
    icon: String,
    image: String,
    badge: String,
    link: String
  }],
  image: { type: String, default: '' },
  buttonText: { type: String, default: '' },
  buttonLink: { type: String, default: '#contact' },
  isVisible: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('HomepageSection', homepageSectionSchema);
