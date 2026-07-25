import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    const socketUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const socketInstance = io(socketUrl.replace('/api', ''), {
      auth: (cb) => {
        const token = localStorage.getItem('av_admin_access_token') || localStorage.getItem('av_admin_token');
        cb({ token });
      },
      transports: ['websocket', 'polling']
    });

    socketInstance.on('connect', () => {
      console.log('[SocketContext] Connected to real-time server');
    });

    // Listen for standardized notification event
    socketInstance.on('notification:new', (notif) => {
      setNotifications(prev => [notif, ...prev]);
      setUnreadCount(prev => prev + 1);

      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-slate-900 border border-amber-500/40 shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4 space-x-3 text-slate-100 font-sans`}
        >
          <div className="text-amber-400 text-xl font-bold">🔔</div>
          <div className="flex-1">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">{notif.title}</p>
            <p className="text-xs text-slate-300 mt-1 leading-snug">{notif.message}</p>
            <p className="text-[10px] text-slate-500 mt-1">Just now</p>
          </div>
        </div>
      ), { duration: 5000 });
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [isAuthenticated]);

  return (
    <SocketContext.Provider value={{ socket, notifications, setNotifications, unreadCount, setUnreadCount }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
