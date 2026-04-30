import React from "react";
import { motion } from "framer-motion";
import {
    FiUser,
    FiShield,
    FiBell,
    FiCreditCard,
    FiLogOut,
    FiChevronRight,
    FiCheckCircle,
    FiActivity,
    FiSettings,
    FiLock,
    FiZap
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase.config";

import TopNav from "../../components/layout/TopNav";
import AdminNav from "../../components/layout/AdminNav";
import MobileFooter from "../../components/layout/MobileFooter";

const Settings = ({ userData }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    const menus = [
        {
            title: "Account Profile",
            desc: "Update your name, email and personal details.",
            icon: FiUser,
            active: true
        },
        {
            title: "Security Center",
            desc: "Password, sessions and account protection.",
            icon: FiShield,
            active: true
        },
        {
            title: "Notifications",
            desc: "Email alerts and important updates.",
            icon: FiBell,
            active: true
        },
        {
            title: "Billing Plans",
            desc: "Subscriptions and invoices.",
            icon: FiCreditCard,
            active: false
        }
    ];

    return (
        <div className="min-h-screen bg-[#F8EDEB] text-black font-['Mulish'] flex flex-col overflow-x-hidden">
            <AdminNav userData={userData} />

            <main className="flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-8 lg:px-16 pb-28">
                {/* NAVIGATION SPACER */}
                <div className="h-28 sm:h-32 lg:h-40" />

                {/* PAGE HEADER */}
                <div className="mb-10">
                    <p className="text-xs uppercase tracking-[0.35em] text-zinc-400 font-bold mb-2">
                        Administration
                    </p>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
                        Settings Panel
                    </h1>
                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

                    {/* LEFT SIDEBAR */}
                    <motion.div
                        initial={{ opacity: 0, x: -25 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="xl:col-span-1 space-y-6"
                    >
                        {/* PROFILE */}
                        <div className="bg-white rounded-[2rem] p-6 border border-zinc-100 shadow-lg">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-black to-zinc-700 text-white flex items-center justify-center text-4xl font-black shadow-xl">
                                    {userData?.displayName?.charAt(0) || "A"}
                                </div>

                                <h2 className="mt-5 text-2xl font-black">
                                    {userData?.displayName || "Admin User"}
                                </h2>

                                <p className="text-sm text-zinc-500 mt-1 break-all">
                                    {userData?.email}
                                </p>

                                <div className="mt-4 flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold">
                                    <FiCheckCircle />
                                    Verified
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="mt-6 w-full py-4 rounded-2xl bg-black text-white font-bold hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                                >
                                    <FiLogOut />
                                    Logout
                                </button>
                            </div>
                        </div>

                        {/* QUICK STATUS */}
                        <div className="bg-white rounded-[2rem] p-6 border border-zinc-100 shadow-lg space-y-4">
                            <div className="flex justify-between">
                                <span className="text-zinc-500 font-semibold text-sm">
                                    Security
                                </span>
                                <FiLock />
                            </div>
                            <h3 className="text-2xl font-black">Strong</h3>

                            <div className="border-t pt-4 flex justify-between">
                                <span className="text-zinc-500 font-semibold text-sm">
                                    Uptime
                                </span>
                                <FiActivity />
                            </div>
                            <h3 className="text-2xl font-black">99.99%</h3>
                        </div>
                    </motion.div>

                    {/* RIGHT CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="xl:col-span-3 space-y-6"
                    >
                        {/* TOP CARDS */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            <div className="bg-white rounded-[2rem] p-6 border border-zinc-100 shadow-lg">
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-500 font-semibold text-sm">
                                        Version
                                    </span>
                                    <FiSettings />
                                </div>
                                <h3 className="text-3xl font-black mt-3">5.2.0</h3>
                            </div>

                            <div className="bg-white rounded-[2rem] p-6 border border-zinc-100 shadow-lg">
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-500 font-semibold text-sm">
                                        Performance
                                    </span>
                                    <FiZap />
                                </div>
                                <h3 className="text-3xl font-black mt-3">Fast</h3>
                            </div>

                            <div className="bg-white rounded-[2rem] p-6 border border-zinc-100 shadow-lg">
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-500 font-semibold text-sm">
                                        Status
                                    </span>
                                    <FiCheckCircle />
                                </div>
                                <h3 className="text-3xl font-black mt-3">Online</h3>
                            </div>

                        </div>

                        {/* SETTINGS LIST */}
                        <div className="bg-white rounded-[2rem] border border-zinc-100 shadow-lg overflow-hidden">
                            <div className="p-6 border-b border-zinc-100">
                                <h3 className="text-2xl font-black">Manage Preferences</h3>
                                <p className="text-sm text-zinc-500 mt-1">
                                    Configure account settings and system preferences.
                                </p>
                            </div>

                            {menus.map((item, index) => (
                                <div
                                    key={index}
                                    className={`px-6 py-5 flex items-center justify-between border-b border-zinc-100 last:border-none hover:bg-zinc-50 transition-all cursor-pointer ${!item.active ? "opacity-50" : ""
                                        }`}
                                >
                                    <div className="flex items-center gap-4">

                                        <div
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.active
                                                ? "bg-black text-white"
                                                : "bg-zinc-100 text-zinc-400"
                                                }`}
                                        >
                                            <item.icon size={20} />
                                        </div>

                                        <div>
                                            <h4 className="font-black text-lg">{item.title}</h4>
                                            <p className="text-sm text-zinc-500">{item.desc}</p>
                                        </div>
                                    </div>

                                    <FiChevronRight className="text-zinc-400" />
                                </div>
                            ))}
                        </div>

                        {/* SUPPORT BANNER */}
                        <div className="bg-gradient-to-r from-black to-zinc-800 text-white rounded-[2rem] p-8 shadow-xl">
                            <h3 className="text-2xl font-black">Professional Control Center</h3>
                            <p className="text-zinc-300 mt-2 max-w-xl">
                                Manage every part of your admin dashboard with a modern,
                                premium and clean experience.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>

            <MobileFooter userData={userData} />
        </div>
    );
};

export default Settings;