import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiBox,
  FiLayout,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiMoon,
  FiSun,
  FiExternalLink,
  FiX
} from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";

export default function Sidebar({ userData, isOpen, onClose }) {
  const { theme, toggleTheme } = useTheme();
  const isAdmin = userData?.role === "Admin";
  const rolePrefix = isAdmin ? "/admin" : "/user";

  const handleLogout = () => signOut(auth);

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-4 px-8 py-4 transition-all duration-300 group capitalize font-bold tracking-widest text-[11px]
    ${isActive
      ? "bg-white dark:bg-card text-blue-800 dark:text-blue-400 border-r-[3px] border-blue-700 dark:border-blue-500 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)]"
      : "text-slate-500 dark:text-muted-foreground hover:bg-slate-50 dark:hover:bg-muted/50 hover:text-slate-700 dark:hover:text-foreground border-r-[3px] border-transparent"
    }`;

  return (
    <aside className={`
            fixed inset-y-0 left-0 z-[999] w-[280px] h-screen bg-card border-r border-border flex flex-col 
            transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            lg:relative lg:translate-x-0 lg:z-0 lg:w-[300px]
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
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
          <FiBox className="text-xl" />
        </div>
        <h1 className="text-2xl font-black tracking-tighter text-gray-900 dark:text-foreground capitalize select-none font-sans">
          Firevy
        </h1>
      </div>

      {/* Navigation Section */}
      <nav className="flex flex-col flex-1 overflow-y-auto py-2">
        <div className="px-8 mb-2 mt-2">
          <p className="text-[10px] font-bold capitalize tracking-[0.2em] text-muted-foreground opacity-60">Discovery</p>
        </div>

        {isAdmin && (
          <NavLink to={`${rolePrefix}/analytics`} className={linkStyle}>
            <FiBarChart2 className="text-lg" />
            <span className="text-sm tracking-tight">Analytics</span>
          </NavLink>
        )}

        <NavLink to={`${rolePrefix}/templates`} className={linkStyle}>
          <FiLayout className="text-lg" />
          <span className="text-sm tracking-tight">My Templates</span>
        </NavLink>

        {isAdmin && (
          <>
            <div className="px-8 mt-6 mb-2">
              <p className="text-[10px] font-bold capitalize tracking-[0.2em] text-muted-foreground opacity-60">Administration</p>
            </div>
            <NavLink to="/admin/users" className={linkStyle}>
              <FiUsers className="text-lg" />
              <span className="text-sm tracking-tight">Users</span>
            </NavLink>
          </>
        )}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto p-4 flex flex-col gap-2 border-t border-border bg-muted/30">

        {/* Theme & Meta Controls */}
        <div className="flex items-center justify-between px-2 mb-2">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-secondary text-foreground hover:bg-border transition-all flex items-center justify-center shadow-sm"
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 ml-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive hover:text-white transition-all font-bold text-xs capitalize tracking-widest"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>

        {/* User Profile Area */}
        <div className="p-3 rounded-2xl bg-card border border-border flex items-center gap-3 group cursor-pointer transition-all hover:border-primary/50 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-muted border border-border flex items-center justify-center text-sm font-bold text-foreground shadow-inner relative z-10">
            {userData?.displayName?.charAt(0) || "I"}
          </div>

          <div className="flex-1 min-w-0 relative z-10">
            <p className="text-xs font-bold text-foreground truncate capitalize tracking-tight">
              {userData?.displayName || "Identity Holder"}
            </p>
            <p className="text-[10px] text-muted-foreground truncate opacity-70">
              {userData?.email || "syncing..."}
            </p>
          </div>

          <div className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-all relative z-10">
            <FiExternalLink size={14} />
          </div>
        </div>
      </div>

    </aside>
  );
}
