import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Inbox, Search, Filter, Trash2, Mail, Phone, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

export default function InquiriesManager() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  const fetchInquiries = async () => {
    try {
      let url = `/contact?`;
      if (statusFilter) url += `status=${statusFilter}&`;
      if (search) url += `search=${encodeURIComponent(search)}&`;

      const res = await api.get(url);
      if (res.data.success) {
        setInquiries(res.data.inquiries);
      }
    } catch (error) {
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchInquiries();
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await api.patch(`/contact/${id}/status`, { status: newStatus });
      if (res.data.success) {
        toast.success(`Status changed to ${newStatus}`);
        setInquiries(prev =>
          prev.map(inq => (inq._id === id ? { ...inq, status: newStatus } : inq))
        );
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry record?')) return;
    try {
      const res = await api.delete(`/contact/${id}`);
      if (res.data.success) {
        toast.success('Inquiry deleted');
        setInquiries(prev => prev.filter(inq => inq._id !== id));
      }
    } catch (error) {
      toast.error('Failed to delete inquiry');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-heading">
            Inquiry Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review customer proposals, phone callbacks, and update lead resolution statuses.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <Search className="h-4 w-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client, phone, or project..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </form>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            Loading Inquiries...
          </div>
        ) : inquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Client & Contact</th>
                  <th className="px-5 py-3.5">Project Interest</th>
                  <th className="px-5 py-3.5">Message / Requirements</th>
                  <th className="px-5 py-3.5">Submission Date</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {inquiries.map((inq) => (
                  <tr key={inq._id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="px-5 py-4 space-y-1">
                      <p className="font-bold text-white text-sm">{inq.name}</p>
                      <div className="flex items-center space-x-3 text-[11px] text-slate-400">
                        <span className="flex items-center space-x-1">
                          <Phone className="h-3 w-3 text-amber-400" />
                          <a href={`tel:${inq.phone}`} className="hover:underline">{inq.phone}</a>
                        </span>
                        {inq.email && (
                          <span className="flex items-center space-x-1">
                            <Mail className="h-3 w-3 text-blue-400" />
                            <a href={`mailto:${inq.email}`} className="hover:underline">{inq.email}</a>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 text-[11px]">
                        {inq.project}
                      </span>
                    </td>
                    <td className="px-5 py-4 max-w-xs text-slate-400 text-[11px] leading-relaxed">
                      {inq.message || 'No additional message provided.'}
                    </td>
                    <td className="px-5 py-4 text-slate-400 text-[11px]">
                      {new Date(inq.createdAt).toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border focus:outline-none bg-slate-900 ${
                          inq.status === 'pending'
                            ? 'text-amber-400 border-amber-500/30'
                            : inq.status === 'contacted'
                            ? 'text-blue-400 border-blue-500/30'
                            : 'text-emerald-400 border-emerald-500/30'
                        }`}
                      >
                        <option value="pending">PENDING</option>
                        <option value="contacted">CONTACTED</option>
                        <option value="resolved">RESOLVED</option>
                      </select>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleDelete(inq._id)}
                        title="Delete Inquiry"
                        className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 text-xs">
            No inquiry records found matching the criteria.
          </div>
        )}
      </div>
    </div>
  );
}
