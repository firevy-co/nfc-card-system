import React from 'react';
import { motion } from 'framer-motion';
import {
    FiUser, FiShield, FiBell, FiLogOut,
    FiCheckCircle, FiChevronRight, FiCreditCard, FiActivity
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import Layout from '../../components/layout/layout';

const UserSettings = ({ userData }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const settingSections = [
        {
            title: "Identity Profile",
            icon: FiUser,
            desc: "Update your personal credentials and public node visibility.",
            path: "/user/profile",
            active: true
        },
        {
            title: "Privacy & Security",
            icon: FiShield,
            desc: "Manage security protocols, password resets, and login history.",
            active: false
        },
        {
            title: "Global Notifications",
            icon: FiBell,
            desc: "Configure alerts for template views and network interactions.",
            active: false
        },
        {
            title: "Plan & Billing",
            icon: FiCreditCard,
            desc: "Manage your subscription tier and commercial features.",
            active: false
        }
    ];

    return (
        <Layout userData={userData} title="Account Configuration">
            <div className="w-full mb-20 space-y-8 animate-in fade-in duration-1000">
                {/* Hub Header */}
                <header className="flex flex-col gap-4 border-b border-black/[0.05] dark:border-black/[0.1] pb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-[#7BB9D4] rounded-full shadow-lg"></div>
                        <span className="text-[10px] font-black text-black dark:text-black uppercase tracking-[0.4em] opacity-40">User Configuration</span>
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-4xl font-black text-foreground dark:text-black tracking-tighter">Settings Hub</h2>
                        <p className="text-muted-foreground font-bold tracking-tight text-sm opacity-50 dark:text-black/40">Manage your comprehensive account protocols and network preferences.</p>
                    </div>
                </header>

                <div className="space-y-6">
                    {/* --- ACCOUNT BRIEF --- */}
                    <div className="bg-white dark:bg-white border border-slate-100 dark:border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7BB9D4]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <div className="flex items-center gap-8 relative z-10">
                            <div className="w-24 h-24 rounded-[2.5rem] flex items-center justify-center bg-slate-50 border-4 border-slate-50 shadow-xl text-3xl font-black text-[#7BB9D4]">
                                {userData?.displayName?.charAt(0) || 'U'}
                            </div>
                            <div>
                                <h3 className="text-2xl font-black tracking-tighter text-black dark:text-black">{userData?.displayName || 'Digital Resident'}</h3>
                                <p className="text-sm font-bold text-zinc-400 dark:text-black/40 mt-1">{userData?.email}</p>
                                <div className="mt-4 inline-flex items-center px-4 py-1.5 bg-[#7BB9D4]/10 border border-[#7BB9D4]/20 rounded-full text-[10px] text-[#7BB9D4] font-black uppercase tracking-widest">
                                    <FiActivity className="mr-2" />
                                    {userData?.role || 'Standard User'}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="px-10 py-5 rounded-[1.5rem] bg-rose-500/10 text-rose-500 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-rose-500 hover:text-white transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 group relative z-10"
                        >
                            <FiLogOut size={16} className="group-hover:rotate-12 transition-transform" />
                            Terminate Session
                        </button>
                    </div>

                    {/* --- SETTINGS LIST --- */}
                    <div className="bg-white dark:bg-white border border-slate-100 dark:border-slate-100 rounded-[2.5rem] shadow-xl overflow-hidden">
                        {settingSections.map((section, idx) => (
                            <div
                                key={idx}
                                onClick={() => section.path && navigate(section.path)}
                                className={`p-8 md:p-10 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-50 transition-all cursor-pointer border-b border-slate-100 dark:border-slate-100 last:border-0 ${!section.active ? 'opacity-40 grayscale select-none cursor-not-allowed' : ''}`}
                            >
                                <div className="flex items-center gap-8">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${section.active ? 'bg-[#7BB9D4] text-white' : 'bg-slate-100 text-zinc-400'}`}>
                                        <section.icon size={22} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black tracking-tight text-black dark:text-black flex items-center gap-3">
                                            {section.title}
                                            {section.active && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-glow"></div>}
                                        </h4>
                                        <p className="text-xs font-bold text-zinc-400 dark:text-black/40 mt-1.5">{section.desc}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    {!section.active && <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Locked</span>}
                                    <FiChevronRight size={20} className="text-zinc-300 dark:text-black/20" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- SYSTEM STATS --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-white border border-slate-100 dark:border-slate-100 rounded-[2rem] p-8 md:p-10 flex items-center justify-between shadow-xl">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-black/40 mb-2">Service Version</p>
                                <h5 className="text-2xl font-black text-black dark:text-black">v4.2.0-Production</h5>
                            </div>
                            <FiCheckCircle size={32} className="text-emerald-500" />
                        </div>
                        <div className="bg-white dark:bg-white border border-slate-100 dark:border-slate-100 rounded-[2rem] p-8 md:p-10 flex items-center justify-between shadow-xl">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-black/40 mb-2">Network Status</p>
                                <h5 className="text-2xl font-black text-black dark:text-black">Optimized</h5>
                            </div>
                            <FiActivity size={32} className="text-[#7BB9D4] animate-pulse" />
                        </div>
                    </div>

                    <footer className="text-center py-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 dark:text-black/20">Operational Integrity Secured by X-Identity Systems</p>
                    </footer>
                </div>
            </div>
        </Layout>
    );
};

export default UserSettings;
