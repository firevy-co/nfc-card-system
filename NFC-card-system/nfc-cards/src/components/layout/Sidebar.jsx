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
    FiExternalLink
} from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";

export default function Sidebar({ userData }) {
    const { theme, toggleTheme } = useTheme();
    const isAdmin = userData?.role === "Admin";
    const rolePrefix = isAdmin ? "/admin" : "/user";

    const handleLogout = () => signOut(auth);

    const linkStyle = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
    ${isActive
            ? "bg-foreground text-background shadow-lg font-bold"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        }`;

    return (
        <aside className="w-[300px] bg-card border-r border-border h-screen flex flex-col shrink-0 transition-colors duration-300 font-sans">

            {/* Logo Section */}
            <div className="p-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-foreground text-background flex items-center justify-center shadow-lg">
                  <FiBox className="text-xl" />
                </div>
                <h1 className="text-2xl font-bold tracking-tighter text-foreground uppercase select-none font-sans">
                    Firevy
                </h1>
            </div>

            {/* Navigation Section */}
            <nav className="flex flex-col gap-2 px-4 flex-1 overflow-y-auto">
                <div className="px-4 mb-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground opacity-50">Discovery</p>
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
                      <div className="px-4 mt-6 mb-2">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground opacity-50">Administration</p>
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
                    className="flex-1 ml-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive hover:text-white transition-all font-bold text-xs uppercase tracking-widest"
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
                        <p className="text-xs font-bold text-foreground truncate uppercase tracking-tight">
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