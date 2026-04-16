import React from 'react';
import { motion } from 'framer-motion';
import {
    FiSettings, FiUser, FiShield, FiBell, FiLogOut,
    FiCheckCircle, FiChevronRight, FiCreditCard, FiActivity
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import AdminNav from '../../components/layout/AdminNav';
import TopNav from '../../components/layout/TopNav';

const Settings = ({ userData }) => {
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
            title: "Identity Configuration",
            icon: FiUser,
            desc: "Manage your administrative profile and public node identifiers.",
            active: true
        },
        {
            title: "Security Protocols",
            icon: FiShield,
            desc: "Configure encryption layers, 2FA, and access logs.",
            active: false
        },
        {
            title: "Network Pulse",
            icon: FiBell,
            desc: "Manage system notifications and operational alerts.",
            active: false
        },
        {
            title: "Billing & Subscriptions",
            icon: FiCreditCard,
            desc: "Handle commercial licensing and enterprise billing cycles.",
            active: false
        }
    ];

    return (
        <div className="min-h-screen bg-zinc-50 text-black flex flex-col font-['Mulish'] overflow-x-hidden">
            <TopNav title="System Configuration" />
            <AdminNav userData={userData} />

            <main className="flex-1 p-6 lg:p-12 mt-20 max-w-5xl mx-auto w-full">
                <header className="mb-14 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                        <span className="text-[10px] font-black text-black uppercase tracking-[0.4em] opacity-40">Operational Backend</span>
                    </div>
                    <h2 className="text-5xl font-black text-black tracking-tighter capitalize">Settings Hub</h2>
                </header>

                <div className="space-y-6">
                    {/* --- ACCOUNT BRIEF --- */}
                    <div className="bg-white border border-zinc-100 rounded-[3rem] p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex items-center gap-8">
                            <div className="w-24 h-24 rounded-[2.5rem] overflow-hidden border-4 border-zinc-50 shadow-xl">
                                <img
                                    src={userData?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData?.displayName || 'Admin'}`}
                                    className="w-full h-full object-cover"
                                    alt="Admin Profile"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black tracking-tighter text-black">{userData?.displayName || 'System Architect'}</h3>
                                <p className="text-sm font-bold text-zinc-400 mt-1">{userData?.email}</p>
                                <div className="mt-4 inline-flex items-center px-4 py-1.5 bg-black rounded-full text-[10px] text-white font-black uppercase tracking-widest">
                                    <FiActivity className="mr-2" />
                                    Root Access
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="px-10 py-5 rounded-[1.5rem] bg-red-50 text-red-500 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-red-500 hover:text-white transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 group"
                        >
                            <FiLogOut size={16} className="group-hover:rotate-12 transition-transform" />
                            Terminate Session
                        </button>
                    </div>

                    {/* --- CLASSIC SETTINGS LIST --- */}
                    <div className="bg-white border border-zinc-100 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.03)] overflow-hidden">
                        {settingSections.map((section, idx) => (
                            <div
                                key={idx}
                                className={`p-10 flex items-center justify-between hover:bg-zinc-50 transition-all cursor-pointer border-b border-zinc-50 last:border-0 ${!section.active ? 'opacity-50 grayscale select-none cursor-not-allowed' : ''}`}
                            >
                                <div className="flex items-center gap-8">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${section.active ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-400'}`}>
                                        <section.icon size={22} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black tracking-tight text-black flex items-center gap-3">
                                            {section.title}
                                            {section.active && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-glow"></div>}
                                        </h4>
                                        <p className="text-xs font-bold text-zinc-400 mt-1.5">{section.desc}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    {!section.active && <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Restricted</span>}
                                    <FiChevronRight size={20} className="text-zinc-300" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- SYSTEM STATS --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-10 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">Network Version</p>
                                <h5 className="text-2xl font-black">X-Identity 4.2</h5>
                            </div>
                            <FiCheckCircle size={32} className="text-emerald-500" />
                        </div>
                        <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-10 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">Operational Uptime</p>
                                <h5 className="text-2xl font-black">99.998%</h5>
                            </div>
                            <FiActivity size={32} className="text-black animate-pulse" />
                        </div>
                    </div>

                    <footer className="text-center py-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300">Operational Integrity Secured by Identity Protocol</p>
                    </footer>
                </div>
            </main>
        </div>
    );
};

export default Settings;
