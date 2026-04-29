import React, { useEffect, useState } from 'react';
import { auth, db } from '@/firebase.config';
import { doc, onSnapshot } from 'firebase/firestore';
import Layout from '../../components/layout/layout';
import {
    FiCheckCircle, FiClock, FiUsers
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import {
    LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const Home = ({ userData }) => {
    if (!userData) return null;

    // --- EXACT ADMIN PROTOCOL DATA ---
    const COLORS = { emerald: "#10b981", blue: "#3b82f6", pink: "#ec4899" };
    const trendData = [
        { day: "Mon", active: 4, pause: 2 },
        { day: "Tue", active: 12, pause: 5 },
        { day: "Wed", active: 8, pause: 4 },
        { day: "Thu", active: 18, pause: 8 },
        { day: "Fri", active: 14, pause: 7 },
    ];
    const identityData = [
        { name: "Completed", value: 215, color: COLORS.emerald },
        { name: "In Progress", value: 68, color: COLORS.pink },
        { name: "Upcoming", value: 143, color: COLORS.blue },
    ];

    return (
        <Layout userData={userData} title="Dashboard">
            <div className="p-4 sm:p-6 lg:p-12 font-['Mulish'] min-h-screen">

                {/* --- HEADER (DYNAMIC) --- */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 lg:mb-12">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black">
                            Welcome, {userData.displayName || 'Architect'}
                        </h1>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-[0.3em] mt-1 opacity-60">
                            {userData.role} Protocol Dashboard
                        </p>
                    </div>
                    <button className="w-full sm:w-auto bg-black text-white px-8 py-3.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-xl active:scale-95">
                        + Deploy New Identity
                    </button>
                </div>

                {/* --- TOP CARDS (IDENTITY THEMED) --- */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 lg:mb-12">
                    <MetricCard title="Identity Templates" value="1" color="bg-emerald-500" />
                    <MetricCard title="Template Impressions" value="1,234" color="bg-blue-500" />
                    <MetricCard title="Digital Connections" value="86" color="bg-pink-500" />
                </div>

                {/* --- MAIN ANALYTICS GRID (EXACT ADMIN STYLE) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 lg:mb-10">
                    {/* TASK PROGRESS */}
                    <div className="bg-white border border-zinc-100 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-sm">
                        <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-2">Task Progress</h3>
                        <h1 className="text-4xl font-black text-black mb-10">70%</h1>
                        <div className="space-y-6">
                            <Progress label="Development" value={87} color="bg-pink-500" />
                            <Progress label="Design" value={36} color="bg-blue-500" />
                            <Progress label="Testing" value={78} color="bg-emerald-500" />
                        </div>
                    </div>

                    {/* IDENTITY TEMPLATE STATUS */}
                    <div className="bg-white border border-zinc-100 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-sm flex flex-col items-center">
                        <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-10 w-full text-left">Template Deployment Status</h3>
                        <div className="relative">
                            <PieChart width={180} height={180}>
                                <Pie
                                    data={identityData}
                                    dataKey="value"
                                    innerRadius={60}
                                    outerRadius={85}
                                    stroke="none"
                                    paddingAngle={5}
                                >
                                    {identityData.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-2xl font-black text-black">426</span>
                                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Active</span>
                            </div>
                        </div>
                        <div className="mt-10 flex gap-4 text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" />Done</div>
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-pink-500" />Live</div>
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" />Next</div>
                        </div>
                    </div>

                    {/* PRODUCTIVITY TREND */}
                    <div className="bg-white border border-zinc-100 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-sm md:col-span-2 lg:col-span-1">
                        <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-4">Productivity Trend</h3>
                        <div className="h-[200px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trendData}>
                                    <Line type="monotone" dataKey="active" stroke={COLORS.blue} strokeWidth={3} dot={{ r: 4, fill: COLORS.blue }} />
                                    <Line type="monotone" dataKey="pause" stroke={COLORS.pink} strokeWidth={3} dot={{ r: 4, fill: COLORS.pink }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-between mt-8">
                            <div>
                                <p className="text-lg font-black text-black">126h 58m</p>
                                <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">↑ 14% <span className="text-zinc-300">Pulse</span></p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-black text-black">9h 45m</p>
                                <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest flex items-center justify-end gap-1">↓ 21% <span className="text-zinc-300">Delay</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- EXTRA SECTION (EXACT ADMIN STYLE) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-10 mb-10 lg:mb-14">
                    {/* ACTIVITY */}
                    <div className="bg-white border border-zinc-100 p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-sm transition-all">
                        <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-6 sm:mb-8">Recent Activity</h3>
                        <div className="space-y-6">
                            {[
                                { label: "Task Protocol Completed", time: "2m ago" },
                                { label: "New Template Member Added", time: "12m ago" },
                                { label: "Blueprint Project Updated", time: "45m ago" },
                                { label: "Architecture Deadline Reached", time: "1h ago" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-black/5 transition-all group">
                                    <div className="flex items-center gap-5">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                            <FiCheckCircle size={18} />
                                        </div>
                                        <p className="text-xs font-bold text-black group-hover:translate-x-1 transition-transform">{item.label}</p>
                                    </div>
                                    <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-tighter">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* NETWORK INSIGHTS */}
                    <div className="bg-white border border-zinc-100 p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-sm transition-all flex flex-col justify-between">
                        <div>
                            <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-8">Network Insights</h3>
                            <div className="flex items-center gap-6 p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-blue-500/10 text-blue-500 flex items-center justify-center shadow-inner">
                                    <FiUsers size={32} />
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-black tracking-tighter">86 Contacts</p>
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest opacity-60 mt-1">
                                        Active Network Templates
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex items-center justify-between px-2">
                            <div className="flex items-center gap-3 text-zinc-300">
                                <FiClock size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                                    Last Sync: 5 mins ago
                                </span>
                            </div>
                            <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:brightness-110 active:scale-95 transition-all">
                                View Audit Log
                            </button>
                        </div>
                    </div>
                </div>



                {/* --- FOOTER --- */}

            </div>
        </Layout>
    );
};

/* --- SHARED CLASSIC COMPONENTS (EXACT ADMIN STYLE) --- */

const MetricCard = ({ title, value, color }) => (
    <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm flex justify-between items-center group hover:scale-[1.02] transition-all duration-300" >
        <div>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-2 opacity-50">{title}</p>
            <h2 className="text-3xl font-black text-black tracking-tighter">{value}</h2>
        </div>
        <div className={`w-14 h-14 rounded-2xl ${color} shadow-lg flex items-center justify-center p-3 opacity-80 group-hover:opacity-100 transition-opacity`}>
            <div className="w-full h-full bg-white/20 rounded-lg border border-white/10" />
        </div>
    </div >
);

const Progress = ({ label, value, color }) => (
    <div className="group cursor-default">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] mb-2.5">
            <span className="text-zinc-400 group-hover:text-black transition-colors">{label}</span>
            <span className="text-black">{value}%</span>
        </div>
        <div className="w-full bg-zinc-50 h-2.5 rounded-full overflow-hidden border border-zinc-100 p-0.5 shadow-inner">
            <div
                className={`h-full rounded-full ${color} shadow-lg transition-all duration-1000 ease-out group-hover:brightness-110`}
                style={{ width: `${value}%` }}
            />
        </div>
    </div>
);

export default Home;
