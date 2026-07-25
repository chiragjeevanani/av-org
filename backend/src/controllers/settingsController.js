import Settings from '../models/Settings.js';

// GET /api/settings/public — Public website endpoint
export const getPublicSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    return res.status(200).json({
      success: true,
      settings: {
        companyName: settings.companyName || 'AV Group Organization',
        footerDescription: settings.footerDescription || 'Leading provider of sustainable clean energy, wind engineering, EV charging infrastructure and MSME advisory solutions.',
        logo: settings.logo || '',
        footerLogo: settings.footerLogo || '',
        sectionImages: {
          windEnergy: settings.sectionImages?.windEnergy || '',
          evCharging: settings.sectionImages?.evCharging || ''
        },
        galleryImages: {
          gallery1: settings.galleryImages?.gallery1 || '',
          gallery2: settings.galleryImages?.gallery2 || '',
          gallery3: settings.galleryImages?.gallery3 || ''
        },
        emailSettings: {
          receiverEmail: settings.emailSettings?.receiverEmail || 'avgroup284@gmail.com',
          replyEmail: settings.emailSettings?.replyEmail || 'avgroup284@gmail.com',
          companyDisplayName: settings.emailSettings?.companyDisplayName || 'AV Group Organization Management',
          signature: settings.emailSettings?.signature || 'AV Group Organization Executive Team',
          supportPhone: settings.emailSettings?.supportPhone || '+91 99786 55799'
        },
        contact: {
          phone: settings.contact?.phone || '+91 99786 55799',
          email: settings.contact?.email || 'info@worldexportbhc.com',
          serviceArea: settings.contact?.serviceArea || 'Gujarat • Maharashtra • Madhya Pradesh • Rajasthan',
          address: settings.contact?.address || 'Gujarat, India'
        },
        socialLinks: {
          facebook: settings.socialLinks?.facebook || '',
          twitter: settings.socialLinks?.twitter || '',
          linkedin: settings.socialLinks?.linkedin || '',
          youtube: settings.socialLinks?.youtube || ''
        }
      }
    });
  } catch (error) {
    console.error('[Public Settings Error] Returning fallback settings:', error.message);
    return res.status(200).json({
      success: true,
      settings: {
        companyName: 'AV Group Organization',
        footerDescription: 'Leading provider of sustainable clean energy, wind engineering, EV charging infrastructure and MSME advisory solutions.',
        logo: '',
        footerLogo: '',
        sectionImages: { windEnergy: '', evCharging: '' },
        galleryImages: { gallery1: '', gallery2: '', gallery3: '' },
        emailSettings: {
          receiverEmail: 'avgroup284@gmail.com',
          replyEmail: 'avgroup284@gmail.com',
          companyDisplayName: 'AV Group Organization Management',
          signature: 'AV Group Organization Executive Team',
          supportPhone: '+91 99786 55799'
        },
        contact: {
          phone: '+91 99786 55799',
          email: 'info@worldexportbhc.com',
          serviceArea: 'Gujarat • Maharashtra • Madhya Pradesh • Rajasthan',
          address: 'Gujarat, India'
        },
        socialLinks: { facebook: '', twitter: '', linkedin: '', youtube: '' }
      }
    });
  }
};


// GET /api/settings — Admin settings fetch endpoint
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    return res.status(200).json({ success: true, settings });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/settings — Protected Admin update endpoint
export const updateSettings = async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    );

    // Emit Socket.IO real-time event for instant website update
    const io = req.app.get('io');
    if (io) {
      io.emit('notification:new', {
        title: 'Website Settings Updated',
        message: 'Admin updated website, contact & email dispatch settings.',
        type: 'SETTINGS',
        createdAt: new Date()
      });
      io.emit('settings:updated', settings);
    }

    return res.status(200).json({
      success: true,
      message: 'Website settings updated successfully!',
      settings
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

