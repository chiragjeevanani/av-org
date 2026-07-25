import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import Settings from '../models/Settings.js';
import HomepageSection from '../models/HomepageSection.js';
import Seo from '../models/Seo.js';

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/av_org';
    console.log(`[Seed] Connecting to MongoDB at ${mongoUri}...`);
    await mongoose.connect(mongoUri);

    // 1. Seed Super Admin
    const adminEmail = process.env.ADMIN_SEED_EMAIL || 'avgroup284@gmail.com';
    const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'avgroupadmin123@';
    let adminUser = await Admin.findOne({ email: adminEmail });

    if (!adminUser) {
      adminUser = new Admin({
        name: 'AV Group Super Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'superadmin',
        permissions: ['all'],
        isActive: true
      });
      await adminUser.save();
      console.log(`[Seed] ✅ Created Super Admin account: ${adminEmail}`);
    } else {
      adminUser.password = adminPassword;
      await adminUser.save();
      console.log(`[Seed] ✅ Updated password for Admin: ${adminEmail}`);
    }

    // 2. Seed Default Unified Settings
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({
        company: {
          name: 'AV Group Organization',
          subtitle: 'Engineering, Energy & Advisory Solutions',
          registrationNumber: 'MSME Registered Organization'
        },
        branding: {
          logo: '',
          favicon: '',
          primaryColor: '#0A2463',
          secondaryColor: '#F59E0B',
          websiteTitle: 'AV Group — Sustainable Infrastructure & Clean Energy',
          footerText: '© 2026 AV Group Organization. All rights reserved.'
        },
        contact: {
          phone: '+91 99786 55799',
          altPhone: '+91 98765 43210',
          email: 'info@worldexportbhc.com',
          whatsapp: '+91 99786 55799',
          address: 'Gujarat, Maharashtra, Madhya Pradesh & Rajasthan',
          googleMapsUrl: 'https://maps.google.com',
          workingHours: 'Monday - Saturday: 9:00 AM - 7:00 PM'
        },
        socialLinks: {
          youtube: 'https://youtube.com',
          facebook: 'https://facebook.com',
          linkedin: 'https://linkedin.com',
          instagram: 'https://instagram.com'
        }
      });
      console.log('[Seed] ✅ Created default Website Settings');
    }

    // 3. Seed Default SEO Meta
    const defaultSeoPages = ['home', 'about', 'projects', 'gallery', 'contact'];
    for (const page of defaultSeoPages) {
      const existingSeo = await Seo.findOne({ page });
      if (!existingSeo) {
        await Seo.create({
          page,
          title: `AV Group Organization — ${page.toUpperCase()}`,
          description: 'Leading provider of sustainable clean energy, wind engineering, EV charging infrastructure and MSME advisory solutions.',
          keywords: ['clean energy', 'wind energy', 'EV charging', 'MSME advisory', 'capital facilitation']
        });
      }
    }
    console.log('[Seed] ✅ Created default SEO metadata records');

    console.log('[Seed] Database seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
