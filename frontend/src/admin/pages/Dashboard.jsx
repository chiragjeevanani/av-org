import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { 
  Inbox, 
  HardDrive, 
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { socket } = useSocket();

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Listen for standardized inquiry:new real-time event
    const handleNewInquiry = (newInq) => {
      setRecentInquiries(prev => [newInq, ...prev.slice(0, 4)]);
      setStats(prev => prev ? ({
        ...prev,
        pendingInquiries: (prev.pendingInquiries || 0) + 1,
        totalInquiries: (prev.totalInquiries || 0) + 1
      }) : prev);
    };

    socket.on('inquiry:new', handleNewInquiry);

    return () => {
      socket.off('inquiry:new', handleNewInquiry);
    };
  }, [socket]);

  const fetchDashboard = async () => {
    try {
      const res = await api.get('/dashboard');
      if (res.data.success) {
        setStats(res.data.stats);
        setRecentInquiries(res.data.recentInquiries);
      }
    } catch (error) {
      toast.error('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400 text-xs">
        <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mr-2" />
        Loading Dashboard Metrics...
      </div>
    );
  }

  const statCards = [
    { label: 'Pending Inquiries', value: stats?.pendingInquiries || 0, icon: Clock, color: 'from-amber-500/20 to-amber-500/5', border: 'border-amber-500/30', text: 'text-amber-400' },
    { label: 'Total Inquiries', value: stats?.totalInquiries || 0, icon: Inbox, color: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/30', text: 'text-blue-400' },
    { label: 'Media Library Files', value: stats?.totalMediaFiles || 0, icon: HardDrive, color: 'from-cyan-500/20 to-cyan-500/5', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white font-heading">
          System Overview & Metrics
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitor incoming customer inquiries and content statistics across AV Group in real-time.
        </p>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`p-6 rounded-2xl bg-gradient-to-br ${card.color} border ${card.border} backdrop-blur-sm relative overflow-hidden group`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {card.label}
                </span>
                <div className={`p-2.5 rounded-xl bg-slate-950/60 ${card.text}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-black text-white font-heading">
                  {card.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Inquiries Table */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Recent Customer Inquiries</h2>
            <p className="text-xs text-slate-400">Latest form submissions from website visitors (Real-time)</p>
          </div>
          <Link
            to="/admin/inquiries"
            className="inline-flex items-center space-x-1 text-xs font-bold text-amber-400 hover:underline"
          >
            <span>View All Inquiries</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Client Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Project Interest</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {recentInquiries.length > 0 ? (
                recentInquiries.map((inq) => (
                  <tr key={inq._id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="px-4 py-3 font-semibold text-white">{inq.name}</td>
                    <td className="px-4 py-3">{inq.phone}</td>
                    <td className="px-4 py-3 text-amber-400 font-medium">{inq.project}</td>
                    <td className="px-4 py-3 text-slate-400">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          inq.status === 'pending'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : inq.status === 'contacted'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        {inq.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                    No inquiries recorded yet. Submit a test form on the public website!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
