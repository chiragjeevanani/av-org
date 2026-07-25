import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/av_org', {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);

    try {
      const adminEmail = process.env.ADMIN_SEED_EMAIL || 'avgroup284@gmail.com';
      const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'avgroupadmin123@';
      const adminExists = await Admin.findOne({ email: adminEmail });
      if (!adminExists) {
        await Admin.create({
          name: 'AV Group Super Admin',
          email: adminEmail,
          password: adminPassword,
          role: 'superadmin',
          permissions: ['all'],
          isActive: true
        });
        console.log(`[MongoDB Auto-Seed] Super Admin user created: ${adminEmail}`);
      }
    } catch (seedErr) {
      console.warn('[MongoDB Auto-Seed] Super Admin check warning:', seedErr.message);
    }

    return conn;
  } catch (error) {
    console.error(`[MongoDB] Database Connection Error: ${error.message}`);
    console.error(`[MongoDB] Make sure MongoDB Atlas IP whitelist includes 0.0.0.0/0 (Allow Access From Anywhere).`);
  }
};


