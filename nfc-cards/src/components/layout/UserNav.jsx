import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiSettings, FiBell } from 'react-icons/fi';
import { auth } from '@/firebase.config';
import { signOut } from 'firebase/auth';
import { useTheme } from '../../context/ThemeContext';
import NotificationCenter from './NotificationCenter';
import logo from '../../assets/logo (2).png';

const UserNav = ({ userData }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <>
      {/* ── MOBILE TOP HEADER (visible on < lg) ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-[50] bg-white border-b border-black/5 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <img src={logo} alt="Cardyn Logo" className="h-6 object-contain" />
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/user/settings')}
              className="p-2 rounded-full text-zinc-500 hover:text-black hover:bg-black/10 transition-all active:scale-90"
            >
              <FiSettings size={18} />
            </button>
            <NotificationCenter isAdmin={false} theme="light" />
            <div
              onClick={() => navigate('/user/profile')}
              className="w-8 h-8 rounded-full border-2 flex items-center justify-center overflow-hidden cursor-pointer font-black text-xs border-black/10 bg-black/5 text-black"
            >
              {userData?.profileImage
                ? <img src={userData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                : userData?.displayName?.charAt(0) || 'I'}
            </div>
          </div>
        </div>
      </div>

      {/* ── DESKTOP FLOATING NAV (visible on ≥ lg) ── */}
      <div className="hidden lg:block fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[1400px] z-[50] animate-in slide-in-from-top-8 duration-700">
        <div className="bg-white border-white/40 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.05)] border rounded-full px-5 py-3 flex items-center justify-between transition-all duration-500">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Cardyn Logo" className="h-6 object-contain" />
          </div>

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
              {userData?.profileImage
                ? <img src={userData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                : userData?.displayName?.charAt(0) || 'I'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserNav;

