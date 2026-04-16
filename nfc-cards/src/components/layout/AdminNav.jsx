import React from 'react';
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

/**
 * PREMIUM FLOATING ADMIN NAV
 * Inspired by modern minimal design systems (as per user image).
 * Replaces both Sidebar and TopNav for Admin.
 */
const AdminNav = ({ userData }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

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
    <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[1400px] z-[50] animate-in slide-in-from-top-8 duration-700 font-['Mulish']">
      <div className={`
        ${theme === 'dark'
          ? 'bg-zinc-950/95 border-white/10 shadow-[0_35px_80px_-15px_rgba(0,0,0,0.6)]'
          : 'bg-white/95 border-black/5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)]'} 
        backdrop-blur-3xl border rounded-full px-5 py-3 flex items-center justify-between transition-all duration-500
      `}>

        {/* LOGO SECTION */}
        <div className="flex items-center gap-3">
          <span className={`text-2xl hidden sm:block font-black ${theme === 'dark' ? 'text-white' : 'text-black'
            }`}>Cardyn</span>
        </div>

        {/* CENTER NAVIGATION PILLS */}
        <nav className={`flex items-center gap-1.5 px-2 py-1 rounded-full transition-all ${theme === 'dark' ? 'bg-black' : 'bg-white'
          }`}>
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
                ${theme === 'dark'
                  ? (isActive ? 'bg-white text-black shadow-xl shadow-white/5' : 'text-zinc-500 hover:text-white hover:bg-white/10')
                  : (isActive ? 'bg-black text-white shadow-xl shadow-black/5' : 'text-zinc-500 hover:text-black hover:bg-black/10')
                }
              `}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-full transition-all border ${theme === 'dark'
              ? 'text-zinc-400 hover:text-white bg-white/5 border-white/5 hover:bg-white/10'
              : 'text-zinc-500 hover:text-black bg-black/5 border-black/5 hover:bg-black/10'
              }`}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <NavLink 
            to="/admin/settings"
            className={({ isActive }) => `p-2.5 rounded-full transition-all ${
              isActive 
              ? (theme === 'dark' ? 'bg-white text-black shadow-xl' : 'bg-black text-white shadow-xl')
              : (theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-white/10' : 'text-zinc-500 hover:text-black hover:bg-black/10')
            }`}
          >
            <FiSettings size={20} />
          </NavLink>

          <div className="relative">
            <button className={`p-2.5 rounded-full transition-all ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-white/10' : 'text-zinc-500 hover:text-black hover:bg-black/10'
              }`}>
              <FiBell size={20} />
              <div className={`absolute top-3 right-3 w-2 h-2 bg-emerald-500 rounded-full ring-4 ${theme === 'dark' ? 'ring-zinc-950' : 'ring-white'
                }`}></div>
            </button>
          </div>

          <div className={`w-10 h-10 rounded-full ml-3 border-2 p-0.5 overflow-hidden transition-all ${theme === 'dark' ? 'border-white/10 hover:border-white/30' : 'border-black/10 hover:border-black/30'
            }`}>
            <img
              src={userData?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData?.displayName || 'Admin'}`}
              alt="Profile"
              className="w-full h-full rounded-full object-cover transition-all cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
