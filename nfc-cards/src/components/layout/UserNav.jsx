import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiLayout,
  FiSettings,
  FiBell,
  FiActivity,
} from 'react-icons/fi';
import { auth } from '@/firebase.config';
import { signOut } from 'firebase/auth';
import { useTheme } from '../../context/ThemeContext';
import NotificationCenter from './NotificationCenter';
import logo from '../../assets/logo (2).png';

const UserNav = ({ userData }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    signOut(auth).then(() => navigate('/login'));
  };

  return (
    <div className="hidden lg:block fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[1400px] z-[50] animate-in slide-in-from-top-8 duration-700">
      <div className="bg-white/70 border-white/40 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.05)] backdrop-blur-3xl border rounded-full px-5 py-3 flex items-center justify-between transition-all duration-500">

        {/* LOGO SECTION */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Cardyn Logo"
            className="h-6 object-contain"
          />
        </div>

        {/* CENTER NAVIGATION PILLS */}
        <nav className="flex items-center gap-1.5 px-2 py-1 rounded-full transition-all bg-white/50">
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
                ${isActive ? 'bg-black text-white shadow-xl shadow-black/5' : 'text-zinc-500 hover:text-black hover:bg-black/10'}
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
            className="p-2.5 rounded-full transition-all hover:scale-110 active:scale-90 text-zinc-500 hover:text-black hover:bg-black/10">
            <FiSettings size={20} />
          </button>

          <NotificationCenter isAdmin={false} theme="light" />

          <div
            onClick={() => navigate(userData?.role === 'Admin' ? '/admin/profile' : '/user/profile')}
            className="w-10 h-10 rounded-full ml-3 border-2 flex items-center justify-center overflow-hidden transition-all cursor-pointer font-black text-sm border-black/10 bg-black/5 text-black hover:border-black/30 hover:scale-110"
          >
            {userData?.profileImage ? (
              <img src={userData.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              userData?.displayName?.charAt(0) || "I"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNav;

