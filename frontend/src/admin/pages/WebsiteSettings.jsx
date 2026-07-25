import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Save, Building2, Image as ImageIcon, Phone, Share2, FileText, Upload, Zap, Wind, Mail, Grid } from 'lucide-react';
import toast from 'react-hot-toast';

export default function WebsiteSettings() {
  const [formData, setFormData] = useState({
    companyName: 'AV Group Organization',
    footerDescription: '',
    logo: '',
    footerLogo: '',
    sectionImages: {
      windEnergy: '',
      evCharging: ''
    },
    galleryImages: {
      gallery1: '',
      gallery2: '',
      gallery3: ''
    },
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
    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      youtube: ''
    }
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFooterLogo, setUploadingFooterLogo] = useState(false);
  const [uploadingWindImg, setUploadingWindImg] = useState(false);
  const [uploadingEvImg, setUploadingEvImg] = useState(false);
  const [uploadingG1, setUploadingG1] = useState(false);
  const [uploadingG2, setUploadingG2] = useState(false);
  const [uploadingG3, setUploadingG3] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/settings');
      if (res.data.success && res.data.settings) {
        const s = res.data.settings;
        setFormData({
          companyName: s.companyName || 'AV Group Organization',
          footerDescription: s.footerDescription || '',
          logo: s.logo || '',
          footerLogo: s.footerLogo || '',
          sectionImages: {
            windEnergy: s.sectionImages?.windEnergy || '',
            evCharging: s.sectionImages?.evCharging || ''
          },
          galleryImages: {
            gallery1: s.galleryImages?.gallery1 || '',
            gallery2: s.galleryImages?.gallery2 || '',
            gallery3: s.galleryImages?.gallery3 || ''
          },
          emailSettings: {
            receiverEmail: s.emailSettings?.receiverEmail || 'avgroup284@gmail.com',
            replyEmail: s.emailSettings?.replyEmail || 'avgroup284@gmail.com',
            companyDisplayName: s.emailSettings?.companyDisplayName || 'AV Group Organization Management',
            signature: s.emailSettings?.signature || 'AV Group Organization Executive Team',
            supportPhone: s.emailSettings?.supportPhone || '+91 99786 55799'
          },
          contact: {
            phone: s.contact?.phone || '+91 99786 55799',
            email: s.contact?.email || 'info@worldexportbhc.com',
            serviceArea: s.contact?.serviceArea || 'Gujarat • Maharashtra • Madhya Pradesh • Rajasthan',
            address: s.contact?.address || 'Gujarat, India'
          },
          socialLinks: {
            facebook: s.socialLinks?.facebook || '',
            twitter: s.socialLinks?.twitter || '',
            linkedin: s.socialLinks?.linkedin || '',
            youtube: s.socialLinks?.youtube || ''
          }
        });
      }
    } catch (error) {
      toast.error('Failed to load website settings');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e, field, type = 'single') => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('folder', 'gallery');

    if (field === 'logo') setUploadingLogo(true);
    if (field === 'footerLogo') setUploadingFooterLogo(true);
    if (field === 'windEnergy') setUploadingWindImg(true);
    if (field === 'evCharging') setUploadingEvImg(true);
    if (field === 'gallery1') setUploadingG1(true);
    if (field === 'gallery2') setUploadingG2(true);
    if (field === 'gallery3') setUploadingG3(true);

    try {
      const res = await api.post('/media/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success && res.data.url) {
        if (type === 'section') {
          setFormData(prev => ({
            ...prev,
            sectionImages: { ...prev.sectionImages, [field]: res.data.url }
          }));
        } else if (type === 'gallery') {
          setFormData(prev => ({
            ...prev,
            galleryImages: { ...prev.galleryImages, [field]: res.data.url }
          }));
        } else {
          setFormData(prev => ({ ...prev, [field]: res.data.url }));
        }
        toast.success(`Image uploaded successfully via Cloudinary!`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Image upload failed');
    } finally {
      if (field === 'logo') setUploadingLogo(false);
      if (field === 'footerLogo') setUploadingFooterLogo(false);
      if (field === 'windEnergy') setUploadingWindImg(false);
      if (field === 'evCharging') setUploadingEvImg(false);
      if (field === 'gallery1') setUploadingG1(false);
      if (field === 'gallery2') setUploadingG2(false);
      if (field === 'gallery3') setUploadingG3(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/settings', formData);
      if (res.data.success) {
        toast.success('Website settings saved to MongoDB Atlas!');
      }
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => {
      const updated = {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      };
      // Auto-sync supportPhone and contact.phone so both admin form sections update dynamically
      if (section === 'emailSettings' && field === 'supportPhone') {
        updated.contact = { ...updated.contact, phone: value };
      } else if (section === 'contact' && field === 'phone') {
        updated.emailSettings = { ...updated.emailSettings, supportPhone: value };
      }
      return updated;
    });
  };


  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 text-xs">
        Loading Website Settings...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-heading">
            Website Settings Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage public website logos, gallery section images, feature images, email settings, contact information, social media, and footer copy.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* 1. Company Name */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm border-b border-slate-800/80 pb-3">
          <Building2 className="h-4 w-4" />
          <h2 className="text-amber-400 font-bold text-sm">Company Identification</h2>
        </div>
        <div className="text-xs space-y-3">
          <div>
            <label className="text-slate-400 font-bold block mb-1">Company Name</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* 2. Email Settings (No .env editing needed!) */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm border-b border-slate-800/80 pb-3">
          <Mail className="h-4 w-4" />
          <h2 className="text-amber-400 font-bold text-sm">Email Notifications & Dispatch Settings</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-slate-400 font-bold block mb-1">Inquiry Recipient Email</label>
            <input
              type="email"
              value={formData.emailSettings.receiverEmail}
              onChange={(e) => handleNestedChange('emailSettings', 'receiverEmail', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
              placeholder="avgroup284@gmail.com"
            />
          </div>
          <div>
            <label className="text-slate-400 font-bold block mb-1">Default Reply-To Email</label>
            <input
              type="email"
              value={formData.emailSettings.replyEmail}
              onChange={(e) => handleNestedChange('emailSettings', 'replyEmail', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
              placeholder="avgroup284@gmail.com"
            />
          </div>
          <div>
            <label className="text-slate-400 font-bold block mb-1">Company Email Display Name</label>
            <input
              type="text"
              value={formData.emailSettings.companyDisplayName}
              onChange={(e) => handleNestedChange('emailSettings', 'companyDisplayName', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
              placeholder="AV Group Organization Management"
            />
          </div>
          <div>
            <label className="text-slate-400 font-bold block mb-1">Support Phone (in emails)</label>
            <input
              type="text"
              value={formData.emailSettings.supportPhone}
              onChange={(e) => handleNestedChange('emailSettings', 'supportPhone', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
              placeholder="+91 99786 55799"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-slate-400 font-bold block mb-1">Email Signature</label>
            <input
              type="text"
              value={formData.emailSettings.signature}
              onChange={(e) => handleNestedChange('emailSettings', 'signature', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
              placeholder="AV Group Organization Executive Team"
            />
          </div>
        </div>
      </div>

      {/* 3. Header Logo & Footer Logo Uploads */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm border-b border-slate-800/80 pb-3">
          <ImageIcon className="h-4 w-4" />
          <h2 className="text-amber-400 font-bold text-sm">Logos (Cloudinary Upload)</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-xs">
          {/* Header Logo */}
          <div className="space-y-3">
            <label className="text-slate-400 font-bold block">Header Company Logo</label>
            {formData.logo ? (
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                <img src={formData.logo} alt="Header Logo" className="h-10 object-contain" />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, logo: '' }))}
                  className="text-red-400 hover:underline text-[11px]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="p-4 border-2 border-dashed border-slate-800 rounded-xl text-center space-y-2">
                <p className="text-slate-500 text-[11px]">Upload header logo file</p>
                <label className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-lg cursor-pointer transition-colors border border-slate-700">
                  <Upload className="h-3.5 w-3.5" />
                  <span>{uploadingLogo ? 'Uploading...' : 'Choose File'}</span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'logo', 'single')} className="hidden" />
                </label>
              </div>
            )}
            <input
              type="url"
              placeholder="Or paste image URL directly..."
              value={formData.logo}
              onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Footer Logo */}
          <div className="space-y-3">
            <label className="text-slate-400 font-bold block">Footer Logo</label>
            {formData.footerLogo ? (
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                <img src={formData.footerLogo} alt="Footer Logo" className="h-10 object-contain" />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, footerLogo: '' }))}
                  className="text-red-400 hover:underline text-[11px]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="p-4 border-2 border-dashed border-slate-800 rounded-xl text-center space-y-2">
                <p className="text-slate-500 text-[11px]">Upload footer logo file</p>
                <label className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-lg cursor-pointer transition-colors border border-slate-700">
                  <Upload className="h-3.5 w-3.5" />
                  <span>{uploadingFooterLogo ? 'Uploading...' : 'Choose File'}</span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'footerLogo', 'single')} className="hidden" />
                </label>
              </div>
            )}
            <input
              type="url"
              placeholder="Or paste image URL directly..."
              value={formData.footerLogo}
              onChange={(e) => setFormData(prev => ({ ...prev, footerLogo: e.target.value }))}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* 4. Gallery Section Images (All 5 Gallery Grid Items Dynamic!) */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm border-b border-slate-800/80 pb-3">
          <Grid className="h-4 w-4" />
          <h2 className="text-amber-400 font-bold text-sm">Gallery Grid Images (Cloudinary Upload)</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 text-xs">
          {/* Gallery Image 1 */}
          <div className="space-y-3">
            <label className="text-slate-400 font-bold block">Gallery Image 1 (Diagram Asset)</label>
            {formData.galleryImages.gallery1 ? (
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                <img src={formData.galleryImages.gallery1} alt="Gallery 1" className="h-14 w-20 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => handleNestedChange('galleryImages', 'gallery1', '')}
                  className="text-red-400 hover:underline text-[11px]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="p-3 border-2 border-dashed border-slate-800 rounded-xl text-center space-y-2">
                <p className="text-slate-500 text-[11px]">Upload Gallery 1 image</p>
                <label className="inline-flex items-center space-x-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-lg cursor-pointer transition-colors border border-slate-700">
                  <Upload className="h-3.5 w-3.5" />
                  <span>{uploadingG1 ? 'Uploading...' : 'Choose File'}</span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'gallery1', 'gallery')} className="hidden" />
                </label>
              </div>
            )}
            <input
              type="url"
              placeholder="Or paste URL..."
              value={formData.galleryImages.gallery1}
              onChange={(e) => handleNestedChange('galleryImages', 'gallery1', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Gallery Image 2 */}
          <div className="space-y-3">
            <label className="text-slate-400 font-bold block">Gallery Image 2 (Roof Wind Turbine)</label>
            {formData.galleryImages.gallery2 ? (
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                <img src={formData.galleryImages.gallery2} alt="Gallery 2" className="h-14 w-20 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => handleNestedChange('galleryImages', 'gallery2', '')}
                  className="text-red-400 hover:underline text-[11px]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="p-3 border-2 border-dashed border-slate-800 rounded-xl text-center space-y-2">
                <p className="text-slate-500 text-[11px]">Upload Gallery 2 image</p>
                <label className="inline-flex items-center space-x-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-lg cursor-pointer transition-colors border border-slate-700">
                  <Upload className="h-3.5 w-3.5" />
                  <span>{uploadingG2 ? 'Uploading...' : 'Choose File'}</span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'gallery2', 'gallery')} className="hidden" />
                </label>
              </div>
            )}
            <input
              type="url"
              placeholder="Or paste URL..."
              value={formData.galleryImages.gallery2}
              onChange={(e) => handleNestedChange('galleryImages', 'gallery2', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Gallery Image 3 */}
          <div className="space-y-3">
            <label className="text-slate-400 font-bold block">Gallery Image 3 (Turbine Tower)</label>
            {formData.galleryImages.gallery3 ? (
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                <img src={formData.galleryImages.gallery3} alt="Gallery 3" className="h-14 w-20 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => handleNestedChange('galleryImages', 'gallery3', '')}
                  className="text-red-400 hover:underline text-[11px]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="p-3 border-2 border-dashed border-slate-800 rounded-xl text-center space-y-2">
                <p className="text-slate-500 text-[11px]">Upload Gallery 3 image</p>
                <label className="inline-flex items-center space-x-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-lg cursor-pointer transition-colors border border-slate-700">
                  <Upload className="h-3.5 w-3.5" />
                  <span>{uploadingG3 ? 'Uploading...' : 'Choose File'}</span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'gallery3', 'gallery')} className="hidden" />
                </label>
              </div>
            )}
            <input
              type="url"
              placeholder="Or paste URL..."
              value={formData.galleryImages.gallery3}
              onChange={(e) => handleNestedChange('galleryImages', 'gallery3', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* 5. Section Feature Images (Wind & EV Charging) */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm border-b border-slate-800/80 pb-3">
          <ImageIcon className="h-4 w-4" />
          <h2 className="text-amber-400 font-bold text-sm">Website Section Images (Cloudinary Upload)</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-xs">
          {/* Wind Power Image */}
          <div className="space-y-3">
            <label className="text-slate-400 font-bold flex items-center space-x-1.5">
              <Wind className="h-3.5 w-3.5 text-amber-400" />
              <span>Wind Power Infrastructure Image</span>
            </label>
            {formData.sectionImages.windEnergy ? (
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                <img src={formData.sectionImages.windEnergy} alt="Wind Power Image" className="h-16 w-24 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => handleNestedChange('sectionImages', 'windEnergy', '')}
                  className="text-red-400 hover:underline text-[11px]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="p-4 border-2 border-dashed border-slate-800 rounded-xl text-center space-y-2">
                <p className="text-slate-500 text-[11px]">Upload Wind Power section image</p>
                <label className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-lg cursor-pointer transition-colors border border-slate-700">
                  <Upload className="h-3.5 w-3.5" />
                  <span>{uploadingWindImg ? 'Uploading...' : 'Choose File'}</span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'windEnergy', 'section')} className="hidden" />
                </label>
              </div>
            )}
            <input
              type="url"
              placeholder="Or paste image URL directly..."
              value={formData.sectionImages.windEnergy}
              onChange={(e) => handleNestedChange('sectionImages', 'windEnergy', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* EV Charging Image */}
          <div className="space-y-3">
            <label className="text-slate-400 font-bold flex items-center space-x-1.5">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <span>EV Charging Infrastructure Image</span>
            </label>
            {formData.sectionImages.evCharging ? (
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                <img src={formData.sectionImages.evCharging} alt="EV Charging Image" className="h-16 w-24 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => handleNestedChange('sectionImages', 'evCharging', '')}
                  className="text-red-400 hover:underline text-[11px]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="p-4 border-2 border-dashed border-slate-800 rounded-xl text-center space-y-2">
                <p className="text-slate-500 text-[11px]">Upload EV Charging section image</p>
                <label className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-lg cursor-pointer transition-colors border border-slate-700">
                  <Upload className="h-3.5 w-3.5" />
                  <span>{uploadingEvImg ? 'Uploading...' : 'Choose File'}</span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'evCharging', 'section')} className="hidden" />
                </label>
              </div>
            )}
            <input
              type="url"
              placeholder="Or paste image URL directly..."
              value={formData.sectionImages.evCharging}
              onChange={(e) => handleNestedChange('sectionImages', 'evCharging', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* 6. Contact Information */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm border-b border-slate-800/80 pb-3">
          <Phone className="h-4 w-4" />
          <h2 className="text-amber-400 font-bold text-sm">Contact Information</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-slate-400 font-bold block mb-1">Phone Number</label>
            <input
              type="text"
              value={formData.contact.phone}
              onChange={(e) => handleNestedChange('contact', 'phone', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="text-slate-400 font-bold block mb-1">Official Email</label>
            <input
              type="email"
              value={formData.contact.email}
              onChange={(e) => handleNestedChange('contact', 'email', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="text-slate-400 font-bold block mb-1">Service Area</label>
            <input
              type="text"
              value={formData.contact.serviceArea}
              onChange={(e) => handleNestedChange('contact', 'serviceArea', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="text-slate-400 font-bold block mb-1">Office Address</label>
            <input
              type="text"
              value={formData.contact.address}
              onChange={(e) => handleNestedChange('contact', 'address', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* 7. Social Links */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm border-b border-slate-800/80 pb-3">
          <Share2 className="h-4 w-4" />
          <h2 className="text-amber-400 font-bold text-sm">Social Media Links</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-slate-400 font-bold block mb-1">YouTube Channel URL</label>
            <input
              type="url"
              placeholder="https://youtube.com/..."
              value={formData.socialLinks.youtube}
              onChange={(e) => handleNestedChange('socialLinks', 'youtube', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="text-slate-400 font-bold block mb-1">LinkedIn Profile URL</label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/..."
              value={formData.socialLinks.linkedin}
              onChange={(e) => handleNestedChange('socialLinks', 'linkedin', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="text-slate-400 font-bold block mb-1">Facebook Page URL</label>
            <input
              type="url"
              placeholder="https://facebook.com/..."
              value={formData.socialLinks.facebook}
              onChange={(e) => handleNestedChange('socialLinks', 'facebook', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="text-slate-400 font-bold block mb-1">Twitter / X URL</label>
            <input
              type="url"
              placeholder="https://x.com/..."
              value={formData.socialLinks.twitter}
              onChange={(e) => handleNestedChange('socialLinks', 'twitter', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* 8. Footer Content */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm border-b border-slate-800/80 pb-3">
          <FileText className="h-4 w-4" />
          <h2 className="text-amber-400 font-bold text-sm">Footer Description</h2>
        </div>
        <div className="text-xs">
          <textarea
            rows={3}
            value={formData.footerDescription}
            onChange={(e) => setFormData(prev => ({ ...prev, footerDescription: e.target.value }))}
            placeholder="Enter footer company summary text..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500 resize-none"
          />
        </div>
      </div>
    </form>
  );
}
