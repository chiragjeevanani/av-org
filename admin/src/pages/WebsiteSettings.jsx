import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Save, Building2, Palette, Phone, Share2, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function WebsiteSettings() {
  const [formData, setFormData] = useState({
    company: { name: '', subtitle: '', registrationNumber: '' },
    branding: { logo: '', favicon: '', primaryColor: '#0A2463', secondaryColor: '#F59E0B', websiteTitle: '', footerText: '' },
    contact: { phone: '', altPhone: '', email: '', whatsapp: '', address: '', googleMapsUrl: '', workingHours: '' },
    socialLinks: { youtube: '', facebook: '', linkedin: '', instagram: '' }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/settings');
      if (res.data.success && res.data.settings) {
        setFormData({
          company: res.data.settings.company || {},
          branding: res.data.settings.branding || {},
          contact: res.data.settings.contact || {},
          socialLinks: res.data.settings.socialLinks || {}
        });
      }
    } catch (error) {
      toast.error('Failed to load website settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/settings', formData);
      if (res.data.success) {
        toast.success('Website settings updated successfully!');
      }
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
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
            Unified Website Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Update company branding, hotline numbers, address, and social links in real time.
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

      {/* 1. Company Information */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm border-b border-slate-800/80 pb-3">
          <Building2 className="h-4 w-4" />
          <h2>Company Identification</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-slate-400 font-bold block mb-1">Company Name</label>
            <input
              type="text"
              value={formData.company.name || ''}
              onChange={(e) => handleNestedChange('company', 'name', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="text-slate-400 font-bold block mb-1">Subtitle / Tagline</label>
            <input
              type="text"
              value={formData.company.subtitle || ''}
              onChange={(e) => handleNestedChange('company', 'subtitle', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-slate-400 font-bold block mb-1">MSME Registration Badge</label>
            <input
              type="text"
              value={formData.company.registrationNumber || ''}
              onChange={(e) => handleNestedChange('company', 'registrationNumber', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* 2. Contact Information & Operating Hours */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm border-b border-slate-800/80 pb-3">
          <Phone className="h-4 w-4" />
          <h2>Contact Numbers & Location</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-slate-400 font-bold block mb-1">Primary Hotline</label>
            <input
              type="text"
              value={formData.contact.phone || ''}
              onChange={(e) => handleNestedChange('contact', 'phone', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="text-slate-400 font-bold block mb-1">Official Email Address</label>
            <input
              type="email"
              value={formData.contact.email || ''}
              onChange={(e) => handleNestedChange('contact', 'email', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="text-slate-400 font-bold block mb-1">WhatsApp Number</label>
            <input
              type="text"
              value={formData.contact.whatsapp || ''}
              onChange={(e) => handleNestedChange('contact', 'whatsapp', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="text-slate-400 font-bold block mb-1">Working Hours</label>
            <input
              type="text"
              value={formData.contact.workingHours || ''}
              onChange={(e) => handleNestedChange('contact', 'workingHours', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-slate-400 font-bold block mb-1">Office Address & Service States</label>
            <textarea
              rows={2}
              value={formData.contact.address || ''}
              onChange={(e) => handleNestedChange('contact', 'address', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>
        </div>
      </div>

      {/* 3. Social Media Links */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm border-b border-slate-800/80 pb-3">
          <Share2 className="h-4 w-4" />
          <h2>Social Channels</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-slate-400 font-bold block mb-1">YouTube Channel URL</label>
            <input
              type="url"
              value={formData.socialLinks.youtube || ''}
              onChange={(e) => handleNestedChange('socialLinks', 'youtube', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="text-slate-400 font-bold block mb-1">LinkedIn Profile URL</label>
            <input
              type="url"
              value={formData.socialLinks.linkedin || ''}
              onChange={(e) => handleNestedChange('socialLinks', 'linkedin', e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
