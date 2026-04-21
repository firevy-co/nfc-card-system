import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiLayout,
  FiSettings,
  FiBell,
  FiActivity,
} from 'react-icons/fi';
import { auth } from '../../firebase.config';
import { signOut } from 'firebase/auth';
import { useTheme } from '../../context/ThemeContext';
import NotificationCenter from './NotificationCenter';

const UserNav = ({ userData }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    signOut(auth).then(() => navigate('/login'));
  };

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
          <span className={`text-2xl hidden sm:block font-['Luckiest_Guy'] ${theme === 'dark' ? 'text-white' : 'text-black'
            }`}>Cardyn</span>
        </div>

        {/* CENTER NAVIGATION PILLS */}
        <nav className={`flex items-center gap-1.5 px-2 py-1 rounded-full transition-all ${theme === 'dark' ? 'bg-black' : 'bg-white'
          }`}>
          {[
            { name: 'Dashboard', path: '/user/home' },
            { name: 'Templates', path: '/user/templates' },
            { name: 'Support', path: '/user/support' },
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
            onClick={() => navigate('/user/settings')}
            className={`p-2.5 rounded-full transition-all hover:scale-110 active:scale-90 ${theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-white/10' : 'text-zinc-500 hover:text-black hover:bg-black/10'
              }`}>
            <FiSettings size={20} />
          </button>

          <NotificationCenter isAdmin={false} theme={theme} />

          <div
            onClick={() => navigate(userData?.role === 'Admin' ? '/admin/profile' : '/user/profile')}
            className={`w-10 h-10 rounded-full ml-3 border-2 flex items-center justify-center overflow-hidden transition-all cursor-pointer font-black text-sm ${theme === 'dark' ? 'border-white/10 bg-white/5 text-white hover:border-white/30 hover:scale-110' : 'border-black/10 bg-black/5 text-black hover:border-black/30 hover:scale-110'
              }`}
          >
            {userData?.displayName?.charAt(0) || "U"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNav;
