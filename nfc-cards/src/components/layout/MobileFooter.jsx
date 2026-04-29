import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiLayout,
  FiUser,
  FiPieChart,
  FiUsers,
  FiActivity,
  FiHelpCircle
} from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const MobileFooter = ({ userData }) => {
  const { theme } = useTheme();
  const isAdmin = userData?.role === "Admin";

  const userLinks = [
    { name: 'Home', path: '/user/home', icon: <FiHome size={20} /> },
    { name: 'Templates', path: '/user/templates', icon: <FiLayout size={20} /> },
    { name: 'Support', path: '/user/support', icon: <FiHelpCircle size={20} /> },
    { name: 'Profile', path: '/user/profile', icon: <FiUser size={20} /> },
  ];

  const adminLinks = [
    { name: 'Stats', path: '/admin/analytics', icon: <FiPieChart size={20} /> },
    { name: 'Templates', path: '/admin/templates', icon: <FiLayout size={20} /> },
    { name: 'Users', path: '/admin/users', icon: <FiUsers size={20} /> },
    { name: 'Inquiry', path: '/admin/inquiry', icon: <FiActivity size={20} /> },
    { name: 'Profile', path: '/admin/profile', icon: <FiUser size={20} /> },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[1000]">
      <div
        className={`
          flex items-center justify-around py-2 px-2 border-t backdrop-blur-xl transition-all duration-500
          pb-safe
          ${theme === 'dark'
            ? 'bg-zinc-950/95 border-white/10 shadow-black'
            : 'bg-white/95 border-black/5 shadow-lg shadow-zinc-200'}
        `}
        style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}
      >
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) => `
              flex-1 flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-2xl transition-all duration-300 min-w-0
              ${isActive
                ? (theme === 'dark' ? 'text-white' : 'text-black')
                : 'text-zinc-400'}
            `}
          >
            {({ isActive }) => (
              <>
                <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                  {link.icon}
                </div>
                <span className="text-[9px] font-black uppercase tracking-tighter truncate">{link.name}</span>
                {isActive && (
                  <div className={`w-4 h-0.5 rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MobileFooter;
