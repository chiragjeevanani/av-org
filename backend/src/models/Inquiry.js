import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  project: { type: String, required: true },
  message: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'resolved'],
    default: 'pending'
  },
  replies: [
    {
      subject: { type: String },
      message: { type: String },
      sentAt: { type: Date, default: Date.now }
    }
  ],
  activity: [
    {
      type: { type: String, default: 'CREATED' },
      message: { type: String },
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

export default mongoose.model('Inquiry', inquirySchema);
