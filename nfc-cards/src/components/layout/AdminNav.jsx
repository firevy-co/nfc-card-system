import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiPieChart,
  FiUsers,
  FiLayout,
  FiSettings,
  FiBell,
  FiLogOut,
  FiActivity,
  FiSun,
  FiMoon
} from 'react-icons/fi';
import { auth } from '../../firebase.config';
import { signOut } from 'firebase/auth';
import { useTheme } from '../../context/ThemeContext';
import NotificationCenter from './NotificationCenter';
import logo from '../../assets/logo (2).png';

/**
 * PREMIUM FLOATING ADMIN NAV
 * Inspired by modern minimal design systems (as per user image).
 * Replaces both Sidebar and TopNav for Admin.
 */
const AdminNav = ({ userData }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // Force Light Mode for Admin
  useEffect(() => {
    if (theme === 'dark') {
      setTimeout(() => toggleTheme(), 0);
    }
  }, [theme]);

  const handleLogout = () => {
    signOut(auth).then(() => navigate('/login'));
  };

  const navLinks = [
    { name: 'Analytics', path: '/admin/analytics', icon: <FiPieChart size={14} /> },
    { name: 'Templates', path: '/admin/templates', icon: <FiLayout size={14} /> },
    { name: 'Users', path: '/admin/users', icon: <FiUsers size={14} /> },
    { name: 'Inquiry', path: '/admin/inquiry', icon: <FiActivity size={14} /> },
  ];

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[1400px] z-[50] animate-in slide-in-from-top-8 duration-700">
      <div className="bg-white/95 border-black/5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] backdrop-blur-3xl border rounded-full px-5 py-3 flex items-center justify-between transition-all duration-500">

        {/* LOGO SECTION */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Cardyn Logo"
            className="h-6 object-contain"
          />
        </div>

        {/* CENTER NAVIGATION PILLS */}
        <nav className="flex items-center gap-1.5 px-2 py-1 rounded-full transition-all bg-white">
          {[
            { name: 'Dashboard', path: '/admin/analytics' },
            { name: 'Templates', path: '/admin/templates' },
            { name: 'Users', path: '/admin/users' },
            { name: 'Inquiry', path: '/admin/inquiry' },
          ].map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `
                px-7 py-2.5 rounded-full text-[14px] font-extrabold tracking-[0.05em] transition-all duration-500
                ${isActive ? 'bg-black text-white shadow-xl shadow-black/5' : 'text-zinc-500 hover:text-black hover:bg-black/10'}
              `}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          <NavLink
            to="/admin/settings"
            className={({ isActive }) => `p-2.5 rounded-full transition-all ${isActive
              ? 'bg-black text-white shadow-xl'
              : 'text-zinc-500 hover:text-black hover:bg-black/10'
              }`}
          >
            <FiSettings size={20} />
          </NavLink>

          <NotificationCenter isAdmin={true} theme="light" />

          <div
            onClick={() => navigate('/admin/profile')}
            className="w-10 h-10 rounded-full ml-3 border-2 flex items-center justify-center overflow-hidden transition-all border-black/10 bg-black/5 text-black font-black text-sm hover:border-black/30 cursor-pointer"
          >
            {userData?.displayName?.charAt(0) || 'A'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
