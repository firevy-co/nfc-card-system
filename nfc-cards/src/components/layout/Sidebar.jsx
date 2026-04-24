import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiBox,
  FiLayout,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiExternalLink,
  FiX,
  FiMessageSquare
} from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from '@/firebase.config';

export default function Sidebar({ userData, isOpen, onClose }) {
  const navigate = useNavigate();
  const isAdmin = userData?.role === "Admin";
  const rolePrefix = isAdmin ? "/admin" : "/user";

  const handleLogout = () => signOut(auth);

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-4 px-8 py-5 transition-all duration-300 group capitalize font-black tracking-widest text-[11px]
    ${isActive
      ? "bg-white/50 dark:bg-white/10 text-foreground border-r-[4px] border-primary shadow-xl shadow-black/5"
      : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground border-r-[4px] border-transparent"
    }`;

  return (
    <aside className={`
            fixed inset-y-0 left-0 z-[999] w-[300px] h-screen bg-white/80 dark:bg-white/5 backdrop-blur-2xl border-r border-black/5 dark:border-white/10 flex flex-col 
            transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            lg:relative lg:translate-x-0 lg:z-0
            ${isOpen ? 'translate-x-0 shadow-[0_0_100px_rgba(0,0,0,0.4)]' : '-translate-x-full'}
        `}>
      {/* MOBILE CLOSE OVERRIDE (Only visible when open) */}
      {isOpen && (
        <button
          onClick={onClose}
          className="absolute top-6 -right-12 w-10 h-10 bg-foreground text-background rounded-full flex lg:hidden items-center justify-center shadow-2xl transition-all active:scale-95 border border-white/10 animate-in fade-in zoom-in duration-300"
          aria-label="Close Menu"
        >
          <FiX size={18} />
        </button>
      )}

      {/* Logo Section */}
      <div className="p-10 flex items-center gap-4">
        <div className="w-11 h-11 rounded-2xl bg-foreground text-background flex items-center justify-center shadow-2xl group transition-transform hover:scale-110">
          <FiBox className="text-xl" />
        </div>
        <h1 className="text-3xl tracking-tighter text-foreground capitalize select-none font-['Luckiest_Guy']">
          Cardyn
        </h1>
      </div>

      {/* Navigation Section */}
      <nav className="flex flex-col flex-1 overflow-y-auto py-4">
        <div className="px-8 mb-4 mt-2">
          <p className="text-[10px] font-black capitalize tracking-[0.3em] text-muted-foreground opacity-40 uppercase">Discovery</p>
        </div>

        {isAdmin && (
          <NavLink to={`${rolePrefix}/analytics`} className={linkStyle}>
            <FiBarChart2 size={18} />
            <span className="text-sm font-black tracking-tighter">Analytics</span>
          </NavLink>
        )}

        <NavLink to={`${rolePrefix}/templates`} className={linkStyle}>
          <FiLayout size={18} />
          <span className="text-sm font-black tracking-tighter">My Templates</span>
        </NavLink>

        {!isAdmin && (
          <>
            <div className="px-8 mt-8 mb-4">
              <p className="text-[10px] font-black capitalize tracking-[0.3em] text-muted-foreground opacity-40 uppercase">Account Hub</p>
            </div>
            <NavLink to="/user/settings" className={linkStyle}>
              <FiSettings size={18} />
              <span className="text-sm font-black tracking-tighter">Account Settings</span>
            </NavLink>
            <NavLink to="/user/support" className={linkStyle}>
              <FiMessageSquare size={18} />
              <span className="text-sm font-black tracking-tighter">Operational Support</span>
            </NavLink>
          </>
        )}

        {isAdmin && (
          <>
            <div className="px-8 mt-8 mb-4">
              <p className="text-[10px] font-black capitalize tracking-[0.3em] text-muted-foreground opacity-40 uppercase">Administration</p>
            </div>
            <NavLink to="/admin/users" className={linkStyle}>
              <FiUsers size={18} />
              <span className="text-sm font-black tracking-tighter">Users Registry</span>
            </NavLink>
          </>
        )}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto p-6 flex flex-col gap-4 border-t border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md">

        {/* User Meta Controls */}
        <div className="flex items-center justify-between gap-3 mb-2">
          <button
            onClick={handleLogout}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/10 hover:bg-red-500 hover:text-white transition-all font-black text-[10px] capitalize tracking-widest shadow-lg shadow-red-500/5 active:scale-95"
          >
            <FiLogOut size={16} />
            <span>Logout Account</span>
          </button>
        </div>

        {/* User Profile Area */}
        <div
          onClick={() => navigate(`${rolePrefix}/profile`)}
          className="p-4 rounded-[1.5rem] bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center gap-4 group cursor-pointer transition-all hover:border-foreground/20 shadow-sm relative overflow-hidden active:scale-[0.98]">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-black/5 to-transparent dark:from-white/10 dark:to-transparent border border-black/5 dark:border-white/10 flex items-center justify-center text-sm font-black text-foreground shadow-inner relative z-10 group-hover:scale-110 transition-transform">
            {userData?.displayName?.charAt(0) || "I"}
          </div>

          <div className="flex-1 min-w-0 relative z-10">
            <p className="text-xs font-black text-foreground truncate capitalize tracking-tight">
              {userData?.displayName || "Identity Holder"}
            </p>
            <p className="text-[10px] text-muted-foreground truncate font-bold opacity-50">
              {userData?.email || "syncing..."}
            </p>
          </div>

          <div className="text-muted-foreground opacity-30 group-hover:opacity-100 group-hover:text-foreground transition-all relative z-10 group-hover:translate-x-1">
            <FiExternalLink size={16} />
          </div>
        </div>
      </div>

    </aside>
  );
}

