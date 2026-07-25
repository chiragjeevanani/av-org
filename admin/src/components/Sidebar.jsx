import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  Image, 
  Briefcase, 
  FolderKanban, 
  Inbox, 
  LogOut, 
  Globe,
  Sliders
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { logout, admin } = useAuth();

  const navGroups = [
    {
      title: 'Core',
      items: [
        { label: 'Dashboard', path: '/', icon: LayoutDashboard }
      ]
    },
    {
      title: 'Website Management',
      items: [
        { label: 'Website Settings', path: '/settings', icon: Settings },
        { label: 'Media Library', path: '/media', icon: Image }
      ]
    },
    {
      title: 'Business Content',
      items: [
        { label: 'Inquiries', path: '/inquiries', icon: Inbox }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between h-screen sticky top-0">
      <div>
        {/* Brand Logo Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-amber-500/20">
            AV
          </div>
          <div>
            <h1 className="font-extrabold text-sm tracking-wide text-white font-heading">
              AV GROUP
            </h1>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
              CMS Admin Panel
            </span>
          </div>
        </div>

        {/* Grouped Links */}
        <nav className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-160px)]">
          {navGroups.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3">
                {group.title}
              </span>
              <div className="space-y-1">
                {group.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={itemIdx}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                          isActive
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                            : 'text-slate-400 hover:text-white hover:bg-slate-900'
                        }`
                      }
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950">
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
          <div className="flex items-center space-x-2.5 truncate">
            <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-amber-400 text-xs border border-slate-700">
              {admin?.name ? admin.name[0].toUpperCase() : 'A'}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-slate-200 truncate">{admin?.name || 'Admin'}</p>
              <p className="text-[10px] text-slate-500 truncate">{admin?.email || 'admin@avgroup.com'}</p>
            </div>
          </div>
          <button
            onClick={logout}
            title="Logout"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
