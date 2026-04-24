import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiLayout,
  FiUser,
  FiPieChart,
  FiUsers,
  FiActivity,
  FiSettings,
  FiHelpCircle
} from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const MobileFooter = ({ userData }) => {
  const { theme } = useTheme();
  const isAdmin = userData?.role === "Admin";

  const userLinks = [
    { name: 'Home', path: '/user/home', icon: <FiHome size={20} /> },
    { name: 'Nodes', path: '/user/templates', icon: <FiLayout size={20} /> },
    { name: 'Support', path: '/user/support', icon: <FiHelpCircle size={20} /> },
    { name: 'Profile', path: '/user/profile', icon: <FiUser size={20} /> },
  ];

  const adminLinks = [
    { name: 'Stats', path: '/admin/analytics', icon: <FiPieChart size={20} /> },
    { name: 'Nodes', path: '/admin/templates', icon: <FiLayout size={20} /> },
    { name: 'Users', path: '/admin/users', icon: <FiUsers size={20} /> },
    { name: 'Inquiry', path: '/admin/inquiry', icon: <FiActivity size={20} /> },
    { name: 'Profile', path: '/admin/profile', icon: <FiUser size={20} /> },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-[1000]`}>
      <div className={`
        flex items-center justify-around py-1 px-1 border shadow-2xl backdrop-blur-xl transition-all duration-500
        ${theme === 'dark'
          ? 'bg-zinc-950/90 border-white/10 shadow-black'
          : 'bg-white/90 border-black/5 shadow-zinc-200'}
      `}>
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) => `
              flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300
              ${isActive
                ? (theme === 'dark' ? 'text-white scale-110' : 'text-black scale-110')
                : 'text-zinc-500 opacity-60'}
            `}
          >
            {({ isActive }) => (
              <>
                <div className={`transition-transform duration-300`}>
                  {link.icon}
                </div>
                <span className="text-[9px] font-black uppercase tracking-tighter">{link.name}</span>
                {isActive && (
                  <div className={`w-1 h-1 rounded-full mt-0.5 ${theme === 'dark' ? 'bg-white' : 'bg-black'} animate-pulse`} />
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
