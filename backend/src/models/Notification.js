import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ["INQUIRY", "REPLY", "SYSTEM", "SETTINGS", "LOGIN"],
    default: "INQUIRY"
  },
  referenceType: { type: String, default: "Inquiry" },
  referenceId: { type: mongoose.Schema.Types.ObjectId },
  isRead: { type: Boolean, default: false },
  createdBy: { type: String, default: "System" },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema);
