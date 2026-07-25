import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Search, Filter, Trash2, Mail, Phone, Send, X, CornerUpLeft, Download, History, Clock, Inbox, CheckCircle2, User, Zap, Wind, Building2, Briefcase } from 'lucide-react';
import { useSocket } from '../context/SocketContext';
import toast from 'react-hot-toast';

export default function InquiriesManager() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const { socket } = useSocket();

  // Reply Modal state
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  // History & Details Modal state
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [detailInquiry, setDetailInquiry] = useState(null);

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  useEffect(() => {
    if (!socket) return;

    const handleNewInquiry = (newInq) => {
      setInquiries(prev => [newInq, ...prev]);
    };

    const handleUpdatedInquiry = (updatedInq) => {
      setInquiries(prev =>
        prev.map(inq => (inq._id === updatedInq._id ? updatedInq : inq))
      );
      if (detailInquiry && detailInquiry._id === updatedInq._id) {
        setDetailInquiry(updatedInq);
      }
    };

    socket.on('inquiry:new', handleNewInquiry);
    socket.on('inquiry:updated', handleUpdatedInquiry);

    return () => {
      socket.off('inquiry:new', handleNewInquiry);
      socket.off('inquiry:updated', handleUpdatedInquiry);
    };
  }, [socket, detailInquiry]);

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
        toast.success(`Status updated to ${newStatus.toUpperCase()}`);
        setInquiries(prev =>
          prev.map(inq => (inq._id === id ? res.data.inquiry : inq))
        );
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleExportCSV = async () => {
    try {
      const res = await api.get('/contact/export', { responseType: 'blob' });
      const blob = new Blob([res.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `AV_Group_Inquiries_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success('CSV Report downloaded successfully!');
    } catch (error) {
      toast.error('Failed to export CSV');
    }
  };

  const openReplyModal = (inq) => {
    setSelectedInquiry(inq);
    setReplySubject(`Re: Inquiry regarding ${inq.project} - AV Group`);
    setReplyMessage(`Hello ${inq.name},\n\nThank you for reaching out to AV Group Organization regarding ${inq.project}.\n\n`);
    setReplyModalOpen(true);
  };

  const openDetailsModal = (inq) => {
    setDetailInquiry(inq);
    setDetailsModalOpen(true);
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!selectedInquiry || !replyMessage.trim()) return;

    setSendingReply(true);
    try {
      const res = await api.post(`/contact/${selectedInquiry._id}/reply`, {
        subject: replySubject,
        replyMessage: replyMessage.trim()
      });

      if (res.data.success) {
        toast.success(`Reply email sent to ${selectedInquiry.email}!`);
        setReplyModalOpen(false);
        setInquiries(prev =>
          prev.map(inq => (inq._id === selectedInquiry._id ? res.data.inquiry : inq))
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reply email');
    } finally {
      setSendingReply(false);
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

  // Stats calculation
  const totalCount = inquiries.length;
  const pendingCount = inquiries.filter(i => i.status === 'pending').length;
  const contactedCount = inquiries.filter(i => i.status === 'contacted').length;
  const resolvedCount = inquiries.filter(i => i.status === 'resolved').length;

  const getCategoryIcon = (project) => {
    const p = (project || '').toLowerCase();
    if (p.includes('wind')) return <Wind className="h-3.5 w-3.5 text-amber-400 mr-1.5" />;
    if (p.includes('ev') || p.includes('charg')) return <Zap className="h-3.5 w-3.5 text-amber-400 mr-1.5" />;
    if (p.includes('finance') || p.includes('msme')) return <Building2 className="h-3.5 w-3.5 text-amber-400 mr-1.5" />;
    return <Briefcase className="h-3.5 w-3.5 text-amber-400 mr-1.5" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-heading">
            Inquiry Management CMS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time customer proposal requests, activity logs, direct email replies, and CSV reports.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold text-xs rounded-xl border border-emerald-500/30 flex items-center space-x-2 transition-all shadow-lg shadow-emerald-500/5 self-start sm:self-auto"
        >
          <Download className="h-4 w-4" />
          <span>Export CSV Report</span>
        </button>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Total Leads</p>
            <p className="text-2xl font-black text-white font-heading mt-1">{totalCount}</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Inbox className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between bg-gradient-to-br from-amber-500/10 to-transparent">
          <div>
            <p className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">Pending</p>
            <p className="text-2xl font-black text-amber-400 font-heading mt-1">{pendingCount}</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Clock className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-slate-950 border border-cyan-500/30 rounded-2xl p-4 flex items-center justify-between bg-gradient-to-br from-cyan-500/10 to-transparent">
          <div>
            <p className="text-cyan-400 font-bold uppercase tracking-wider text-[10px]">Contacted</p>
            <p className="text-2xl font-black text-cyan-400 font-heading mt-1">{contactedCount}</p>
          </div>
          <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Mail className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between bg-gradient-to-br from-emerald-500/10 to-transparent">
          <div>
            <p className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">Resolved</p>
            <p className="text-2xl font-black text-emerald-400 font-heading mt-1">{resolvedCount}</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <Search className="h-4 w-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, phone, or project..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </form>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-semibold"
          >
            <option value="">All Statuses</option>
            <option value="pending">🟡 Pending</option>
            <option value="contacted">🔵 Contacted</option>
            <option value="resolved">🟢 Resolved</option>
          </select>
        </div>
      </div>

      {/* Main Inquiries Table */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="py-20 text-center text-slate-400 text-xs">
            <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading Inquiries...
          </div>
        ) : inquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-5 py-4">Client & Contact Info</th>
                  <th className="px-5 py-4">Project Interest</th>
                  <th className="px-5 py-4">Requirements / Message</th>
                  <th className="px-5 py-4">Submission Date</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {inquiries.map((inq) => (
                  <tr key={inq._id} className="hover:bg-slate-900/50 transition-colors">
                    {/* 1. Client & Contact */}
                    <td className="px-5 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-9 w-9 rounded-full bg-slate-900 border border-amber-500/40 text-amber-400 font-extrabold flex items-center justify-center text-sm shadow-md flex-shrink-0">
                          {inq.name ? inq.name[0].toUpperCase() : 'U'}
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-white text-sm">{inq.name}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 gap-1 text-[11px] text-slate-400">
                            <span className="whitespace-nowrap inline-flex items-center text-amber-300 font-medium">
                              <Phone className="h-3 w-3 mr-1 text-amber-400 flex-shrink-0" />
                              <a href={`tel:${inq.phone}`} className="hover:underline">{inq.phone}</a>
                            </span>
                            {inq.email && (
                              <span className="whitespace-nowrap inline-flex items-center text-slate-400">
                                <Mail className="h-3 w-3 mr-1 text-blue-400 flex-shrink-0" />
                                <a href={`mailto:${inq.email}`} className="hover:underline">{inq.email}</a>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 2. Project Interest */}
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 whitespace-nowrap shadow-sm">
                        {getCategoryIcon(inq.project)}
                        <span>{inq.project}</span>
                      </span>
                    </td>

                    {/* 3. Message */}
                    <td className="px-5 py-4 max-w-xs text-slate-300 text-[11px] leading-relaxed">
                      <p className="line-clamp-2" title={inq.message}>
                        {inq.message || 'No additional message provided.'}
                      </p>
                    </td>

                    {/* 4. Submission Date */}
                    <td className="px-5 py-4 text-slate-400 text-[11px] whitespace-nowrap">
                      <div>
                        <p className="font-semibold text-slate-300">{new Date(inq.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                        <p className="text-[10px] text-slate-500">{new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </td>

                    {/* 5. Status Selector */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border focus:outline-none cursor-pointer transition-all ${
                          inq.status === 'pending'
                            ? 'text-amber-300 border-amber-500/40 bg-amber-500/10 shadow-sm shadow-amber-500/10'
                            : inq.status === 'contacted'
                            ? 'text-cyan-300 border-cyan-500/40 bg-cyan-500/10 shadow-sm shadow-cyan-500/10'
                            : 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10 shadow-sm shadow-emerald-500/10'
                        }`}
                      >
                        <option value="pending">🟡 PENDING</option>
                        <option value="contacted">🔵 CONTACTED</option>
                        <option value="resolved">🟢 RESOLVED</option>
                      </select>
                    </td>

                    {/* 6. Actions Group */}
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openDetailsModal(inq)}
                          title="View Timeline & Replies History"
                          className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 inline-flex items-center space-x-1 text-[11px] font-semibold transition-colors"
                        >
                          <History className="h-3.5 w-3.5 text-cyan-400" />
                          <span>History</span>
                        </button>

                        {inq.email && (
                          <button
                            onClick={() => openReplyModal(inq)}
                            title="Send Email Reply"
                            className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold text-[11px] border border-amber-500/30 inline-flex items-center space-x-1 transition-all shadow-sm"
                          >
                            <CornerUpLeft className="h-3.5 w-3.5" />
                            <span>Reply</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(inq._id)}
                          title="Delete Record"
                          className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/30 border border-slate-800 transition-colors inline-flex items-center"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-16 text-center text-slate-500 text-xs">
            <Inbox className="h-8 w-8 text-slate-600 mx-auto mb-2" />
            <p className="font-semibold text-slate-400">No inquiry records found</p>
            <p className="text-[11px] text-slate-500 mt-1">Try clearing filters or search terms.</p>
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {replyModalOpen && selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                <Send className="h-4 w-4" />
                <h2>Reply to Inquiry</h2>
              </div>
              <button
                onClick={() => setReplyModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSendReply} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 font-bold block mb-1">To Client</label>
                <input
                  type="text"
                  disabled
                  value={`${selectedInquiry.name} <${selectedInquiry.email}>`}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-400 font-medium"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">Email Subject</label>
                <input
                  type="text"
                  required
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">Reply Message</label>
                <textarea
                  rows={5}
                  required
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your official response..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReplyModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sendingReply}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center space-x-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{sendingReply ? 'Sending Email...' : 'Send Email Reply'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* History & Details Modal */}
      {detailsModalOpen && detailInquiry && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-2xl space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
                <History className="h-4 w-4" />
                <h2>Inquiry History & Conversation Record</h2>
              </div>
              <button
                onClick={() => setDetailsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Client Info Summary */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-7 w-7 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                    {detailInquiry.name ? detailInquiry.name[0].toUpperCase() : 'U'}
                  </div>
                  <p className="font-bold text-white text-base">{detailInquiry.name}</p>
                </div>
                <span className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase border ${
                  detailInquiry.status === 'pending'
                    ? 'text-amber-300 border-amber-500/40 bg-amber-500/10'
                    : detailInquiry.status === 'contacted'
                    ? 'text-cyan-300 border-cyan-500/40 bg-cyan-500/10'
                    : 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10'
                }`}>
                  {detailInquiry.status}
                </span>
              </div>
              <p className="text-slate-400"><strong>Interest:</strong> {detailInquiry.project} | <strong>Phone:</strong> {detailInquiry.phone} | <strong>Email:</strong> {detailInquiry.email || 'N/A'}</p>
              <p className="text-slate-300 pt-1"><strong>Client Message:</strong> "{detailInquiry.message || 'No additional message.'}"</p>
            </div>

            {/* Past Replies Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Mail className="h-3.5 w-3.5" />
                <span>Sent Email Replies ({detailInquiry.replies?.length || 0})</span>
              </h3>
              {detailInquiry.replies && detailInquiry.replies.length > 0 ? (
                <div className="space-y-3">
                  {detailInquiry.replies.map((rep, idx) => (
                    <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs space-y-1">
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span className="font-bold text-white">{rep.subject}</span>
                        <span>{new Date(rep.sentAt).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{rep.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-slate-950 border border-slate-800/60 rounded-xl text-slate-500 text-xs">
                  No replies sent from Admin Panel yet.
                </div>
              )}
            </div>

            {/* Activity Log Timeline */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>Activity Log Timeline</span>
              </h3>
              <div className="space-y-2 border-l-2 border-slate-800 pl-4 ml-2 text-xs">
                {detailInquiry.activity && detailInquiry.activity.length > 0 ? (
                  detailInquiry.activity.map((act, idx) => (
                    <div key={idx} className="relative pb-2">
                      <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-cyan-400 border-2 border-slate-900" />
                      <p className="text-slate-200 font-semibold">{act.message}</p>
                      <p className="text-[10px] text-slate-500">{new Date(act.createdAt).toLocaleString()}</p>
                    </div>
                  ))
                ) : (
                  <div className="relative pb-2">
                    <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-amber-400 border-2 border-slate-900" />
                    <p className="text-slate-200 font-semibold">Inquiry Submitted</p>
                    <p className="text-[10px] text-slate-500">{new Date(detailInquiry.createdAt).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
