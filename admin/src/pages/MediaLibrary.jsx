import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Upload, Trash2, Copy, Image as ImageIcon, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MediaLibrary() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await api.get('/media');
      if (res.data.success) {
        setMediaList(res.data.media);
      }
    } catch (error) {
      toast.error('Failed to load media files');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'cms');

    setUploading(true);
    try {
      const res = await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        toast.success('Media uploaded successfully!');
        fetchMedia();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'File upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    try {
      const res = await api.delete(`/media/${id}`);
      if (res.data.success) {
        toast.success('Media deleted');
        setMediaList(prev => prev.filter(m => m._id !== id));
      }
    } catch (error) {
      toast.error('Failed to delete media');
    }
  };

  const copyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success('URL copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-heading">
            Central Media Library
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload images, banners, logos, and icons to reuse across projects, gallery, and homepage.
          </p>
        </div>

        <label className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center space-x-2 cursor-pointer">
          <Upload className="h-4 w-4" />
          <span>{uploading ? 'Uploading...' : 'Upload Asset'}</span>
          <input type="file" onChange={handleFileUpload} accept="image/*" className="hidden" />
        </label>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400 text-xs">
          Loading Media Assets...
        </div>
      ) : mediaList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mediaList.map((item) => (
            <div
              key={item._id}
              className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden group relative flex flex-col justify-between"
            >
              <div className="h-36 bg-slate-900 overflow-hidden relative flex items-center justify-center p-2">
                <img
                  src={item.url}
                  alt={item.originalName}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-3 border-t border-slate-800/80 bg-slate-950 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-300 font-medium truncate max-w-[110px]" title={item.originalName}>
                  {item.originalName}
                </span>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => copyUrl(item.url, item._id)}
                    title="Copy URL"
                    className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                  >
                    {copiedId === item._id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    title="Delete File"
                    className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <ImageIcon className="h-10 w-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No Media Files Uploaded</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Click the Upload Asset button above to start uploading images to your central library.
          </p>
        </div>
      )}
    </div>
  );
}
