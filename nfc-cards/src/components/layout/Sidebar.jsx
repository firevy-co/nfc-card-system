import React from "react";
import { NavLink } from "react-router-dom";
import {
    FiHome,
    FiLink,
    FiUsers,
    FiBarChart2,
    FiTool
} from "react-icons/fi";

export default function Sidebar({ userData }) {

    const isAdmin = userData?.role === "Admin";
    const rolePrefix = isAdmin ? "/admin" : "/user";

    const linkStyle = ({ isActive }) =>
        `flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-200
    ${isActive
            ? "bg-[#F3F4F6] text-black font-semibold"
            : "text-slate-500 hover:bg-gray-50 hover:text-slate-700"
        }`;

    return (
        <aside className="w-[280px] bg-white border-r border-gray-100 h-screen flex flex-col shrink-0">

            {/* Logo */}
            <div className="p-8">
                <h1 className="text-3xl font-black tracking-tight text-black uppercase select-none">
                    Firevy
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1 px-4 flex-1 overflow-y-auto">

                {/* <NavLink to="#" className={linkStyle}>
                    <FiHome className="text-lg" />
                    <span className="text-[14px] tracking-tight">Dashboard</span>
                </NavLink> */}

                <NavLink to={`${rolePrefix}/analytics`} className={linkStyle}>
                    <FiBarChart2 className="text-lg" />
                    <span className="text-[14px] tracking-tight">Analytics</span>
                </NavLink>
                <NavLink to={`${rolePrefix}/templates`} className={linkStyle}>
                    <FiLink className="text-lg" />
                    <span className="text-[14px] tracking-tight">My Templates</span>
                </NavLink>

                {isAdmin && (
                    <NavLink to="/admin/users" className={linkStyle}>
                        <FiUsers className="text-lg" />
                        <span className="text-[14px] tracking-tight">User Management</span>
                    </NavLink>
                )}

                {/* <NavLink to={`${rolePrefix}/contacts`} className={linkStyle}>
                    <FiUsers className="text-lg" />
                    <span className="text-[14px] tracking-tight">Contacts</span>
                </NavLink> */}

                {/* <NavLink to={`${rolePrefix}/team`} className={linkStyle}>
                    <FiUsers className="text-lg" />
                    <span className="text-[14px] tracking-tight">Team</span>
                </NavLink> */}


                {/* <NavLink to={`${rolePrefix}/tools`} className={linkStyle}>
                    <FiTool className="text-lg" />
                    <span className="text-[14px] tracking-tight">Tools</span>
                </NavLink> */}

                {/* <NavLink to={`${rolePrefix}/`} className={linkStyle}>
                    <FiLink className="text-lg" />
                    <span className="text-[14px] tracking-tight">NFC Accessories</span>
                </NavLink> */}

            </nav>

            {/* PRO Upgrade */}
            <div className="p-6">
                <div className="rounded-2xl p-5 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-sm">
                    <p className="text-xs font-bold text-black uppercase tracking-widest mb-1">
                        PRO Identity
                    </p>

                    <p className="text-[11px] text-slate-500 leading-relaxed">
                        Unlock global card nodes and advanced analytics tools.
                    </p>
                </div>
            </div>

            {/* User Profile */}
            <div className="p-5 border-t border-gray-100">
                <div className="flex items-center gap-3 cursor-pointer group">

                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold shadow-md group-hover:scale-105 transition-transform">
                        {userData?.displayName?.charAt(0) || "U"}
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-black truncate">
                            {userData?.displayName || "Identity Holder"}
                        </p>

                        <p className="text-[11px] text-slate-400 truncate">
                            {userData?.email || "user@email.com"}
                        </p>
                    </div>

                </div>
            </div>

        </aside>
    );
}