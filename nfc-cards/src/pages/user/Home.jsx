import React, { useEffect, useState } from 'react';
import { auth, db } from '@/firebase.config';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import Layout from '../../components/layout/layout';
import {
    FiCheckCircle, FiClock, FiUsers
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import {
    LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const COLORS = { emerald: "#10b981", blue: "#3b82f6", pink: "#ec4899" };

const Home = ({ userData }) => {
    const [stats, setStats] = useState({
        connectionsCount: 0,
        templatesCount: 0,
        recentActivities: [],
        progress: {
            development: 0,
            design: 0,
            testing: 0,
            total: 0
        },
        identityData: [
            { name: "Completed", value: 0, color: COLORS.emerald },
            { name: "In Progress", value: 0, color: COLORS.pink },
            { name: "Upcoming", value: 0, color: COLORS.blue },
        ],
        trendData: [],
        productivity: {
            pulse: "0h 0m",
            delay: "0h 0m",
            pulseChange: 0,
            delayChange: 0
        },
        impressions: 0
    });

    useEffect(() => {
        if (!auth.currentUser || !userData) return;

        // 1. Listen for User's Inquiries (Digital Connections)
        const q = query(
            collection(db, "inquiries"),
            where("uid", "==", auth.currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Calculate Task Progress & Productivity
            const resolved = data.filter(iq => iq.status === "Resolved").length;
            const unread = data.filter(iq => iq.status === "Unread").length;
            
            // Development progress based on profile completeness (mock calculation from fields)
            const profileFields = ['displayName', 'email', 'phone', 'companyName', 'designation', 'bio', 'logo', 'onboarded'];
            const filledFields = profileFields.filter(f => userData[f]).length;
            const devProgress = Math.round((filledFields / profileFields.length) * 100);
            
            const designProgress = userData.onboarded ? 100 : 30;
            const testingProgress = data.length > 0 ? Math.round((resolved / data.length) * 100) : 0;

            // Trend Data (Last 5 days)
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const last5Days = [];
            for(let i = 4; i >= 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                const dayName = days[d.getDay()];
                const dayStart = new Date(d.setHours(0,0,0,0));
                const dayEnd = new Date(d.setHours(23,59,59,999));
                
                const activeInDay = data.filter(iq => {
                    const created = iq.createdAt?.toDate?.() || new Date(iq.createdAt);
                    return created >= dayStart && created <= dayEnd;
                }).length;
                last5Days.push({ day: dayName, active: activeInDay, pause: Math.max(0, activeInDay - 1) });
            }

            const totalHours = data.length * 1.8;
            const pulseHours = Math.floor(totalHours);
            const pulseMinutes = Math.round((totalHours - pulseHours) * 60);

            // Memory-side sorting for activities
            const sortedData = [...data].sort((a, b) => {
                const timeA = a.createdAt?.toMillis?.() || 0;
                const timeB = b.createdAt?.toMillis?.() || 0;
                return timeB - timeA;
            });

            setStats(prev => ({
                ...prev,
                connectionsCount: snapshot.size,
                templatesCount: userData?.onboarded ? 1 : 0,
                recentActivities: sortedData.slice(0, 4).map(iq => ({
                    label: `Inquiry: ${iq.vector}`,
                    time: iq.createdAt?.toDate ? iq.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'
                })),
                progress: {
                    development: devProgress,
                    design: designProgress,
                    testing: testingProgress,
                    total: Math.round((devProgress + designProgress + testingProgress) / 3)
                },
                identityData: [
                    { name: "Completed", value: userData.onboarded ? 100 : 0, color: COLORS.emerald },
                    { name: "In Progress", value: !userData.onboarded && filledFields > 0 ? 50 : 0, color: COLORS.pink },
                    { name: "Upcoming", value: !userData.onboarded && filledFields === 0 ? 100 : 0, color: COLORS.blue },
                ],
                trendData: last5Days,
                productivity: {
                    pulse: `${pulseHours}h ${pulseMinutes}m`,
                    delay: `${Math.floor(unread * 0.4)}h ${Math.round((unread * 0.4 % 1) * 60)}m`,
                    pulseChange: Math.round((resolved / (data.length || 1)) * 100),
                    delayChange: Math.round((unread / (data.length || 1)) * 100)
                },
                impressions: (userData.views || data.length * 7 || 0).toLocaleString()
            }));
        });

        return () => unsubscribe();
    }, [userData]);

    if (!userData) return null;

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
                    <MetricCard title="Identity Templates" value={stats.templatesCount.toString()} color="bg-emerald-500" />
                    <MetricCard title="Template Impressions" value={stats.impressions} color="bg-blue-500" />
                    <MetricCard title="Digital Connections" value={stats.connectionsCount.toString()} color="bg-pink-500" />
                </div>

                {/* --- MAIN ANALYTICS GRID (EXACT ADMIN STYLE) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 lg:mb-10">
                    {/* TASK PROGRESS */}
                    <div className="bg-white border border-zinc-100 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-sm">
                        <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-2">Task Progress</h3>
                        <h1 className="text-4xl font-black text-black mb-10">{stats.progress.total}%</h1>
                        <div className="space-y-6">
                            <Progress label="Identity" value={stats.progress.development} color="bg-pink-500" />
                            <Progress label="Branding" value={stats.progress.design} color="bg-blue-500" />
                            <Progress label="Network" value={stats.progress.testing} color="bg-emerald-500" />
                        </div>
                    </div>

                    {/* IDENTITY TEMPLATE STATUS */}
                    <div className="bg-white border border-zinc-100 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-sm flex flex-col items-center">
                        <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-10 w-full text-left">Template Deployment Status</h3>
                        <div className="relative">
                            <PieChart width={180} height={180}>
                                <Pie
                                    data={stats.identityData}
                                    dataKey="value"
                                    innerRadius={60}
                                    outerRadius={85}
                                    stroke="none"
                                    paddingAngle={5}
                                >
                                    {stats.identityData.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-2xl font-black text-black">{stats.templatesCount}</span>
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
                                <LineChart data={stats.trendData}>
                                    <Line type="monotone" dataKey="active" stroke={COLORS.blue} strokeWidth={3} dot={{ r: 4, fill: COLORS.blue }} />
                                    <Line type="monotone" dataKey="pause" stroke={COLORS.pink} strokeWidth={3} dot={{ r: 4, fill: COLORS.pink }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-between mt-8">
                            <div>
                                <p className="text-lg font-black text-black">{stats.productivity.pulse}</p>
                                <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">↑ {stats.productivity.pulseChange}% <span className="text-zinc-300">Pulse</span></p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-black text-black">{stats.productivity.delay}</p>
                                <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest flex items-center justify-end gap-1">↓ {stats.productivity.delayChange}% <span className="text-zinc-300">Delay</span></p>
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
                            {(stats.recentActivities.length > 0 ? stats.recentActivities : [
                                { label: "Task Protocol Completed", time: "2m ago" },
                                { label: "New Template Member Added", time: "12m ago" },
                                { label: "Blueprint Project Updated", time: "45m ago" },
                                { label: "Architecture Deadline Reached", time: "1h ago" },
                            ]).map((item, i) => (
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
                                    <p className="text-3xl font-black text-black tracking-tighter">{stats.connectionsCount} Contacts</p>
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
                                    Last Sync: Just now
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
