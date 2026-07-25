import React, { useState, useEffect } from 'react';
import { ExternalLink, Bell, Check, CheckCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import api from '../services/api';

export default function Navbar() {
  const { unreadCount, setUnreadCount, notifications, setNotifications } = useSocket();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInitialNotifications();
  }, []);

  const fetchInitialNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      if (res.data.success) {
        setNotifications(res.data.notifications);
        setUnreadCount(res.data.unreadCount);
      }
    } catch (error) {
      console.warn('[Admin Navbar] Could not fetch notifications:', error);
    }
  };

  const handleMarkAsRead = async (id, refType) => {
    try {
      const res = await api.put(`/notifications/${id}/read`);
      if (res.data.success) {
        setNotifications(prev =>
          prev.map(n => (n._id === id ? { ...n, isRead: true } : n))
        );
        setUnreadCount(res.data.unreadCount);
      }
    } catch (error) {
      console.error(error);
    }

    setPopoverOpen(false);
    if (refType === 'Inquiry' || !refType) {
      navigate('/admin/inquiries');
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const res = await api.put('/notifications/read-all');
      if (res.data.success) {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        setUnreadCount(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
          Real-time Engine Active
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => setPopoverOpen(!popoverOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-amber-500/50 transition-all relative"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1.5 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center shadow-lg animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Popover Dropdown */}
          {popoverOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden text-xs">
              <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
                <div className="flex items-center space-x-2 font-bold text-white">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-extrabold border border-amber-500/20">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[10px] font-bold text-amber-400 hover:underline flex items-center space-x-1"
                  >
                    <CheckCheck className="h-3 w-3" />
                    <span>Mark All Read</span>
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div
                      key={n._id}
                      onClick={() => handleMarkAsRead(n._id, n.referenceType)}
                      className={`p-3.5 hover:bg-slate-800/40 cursor-pointer transition-colors space-y-1 ${
                        !n.isRead ? 'bg-amber-500/5' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-400 text-[11px] uppercase tracking-wider">
                          {n.title}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-slate-300 text-xs leading-snug">{n.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-slate-500">
                    No notifications available.
                  </div>
                )}
              </div>

              <div className="p-2.5 bg-slate-950 border-t border-slate-800 text-center">
                <Link
                  to="/admin/inquiries"
                  onClick={() => setPopoverOpen(false)}
                  className="text-[11px] font-bold text-slate-400 hover:text-amber-400 transition-colors"
                >
                  View All Inquiries →
                </Link>
              </div>
            </div>
          )}
        </div>

        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:text-white transition-all"
        >
          <span>View Public Website</span>
          <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
        </Link>
      </div>
    </header>
  );
}
