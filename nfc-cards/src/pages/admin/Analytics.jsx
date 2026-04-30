import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import { signOut } from "firebase/auth";
import { auth, db } from '@/firebase.config';
import { collection, onSnapshot, query } from 'firebase/firestore';
import {
   Users,
   CheckCircle2,
   Clock,
} from "lucide-react";

import {
   LineChart,
   Line,
   PieChart,
   Pie,
   Cell,
   ResponsiveContainer,
} from "recharts";

const Analytics = ({ user, userData }) => {
   const [stats, setStats] = useState({
      usersCount: 0,
      templatesCount: 0,
      inquiriesCount: 0,
      onboardedCount: 0,
      recentActivities: [],
      projectData: [
         { name: "Completed", value: 0, color: "#22c55e" },
         { name: "In Progress", value: 0, color: "#ec4899" },
         { name: "Upcoming", value: 0, color: "#3b82f6" },
      ],
      trendData: [
         { day: "Mon", active: 0, pause: 0 },
         { day: "Tue", active: 0, pause: 0 },
         { day: "Wed", active: 0, pause: 0 },
         { day: "Thu", active: 0, pause: 0 },
         { day: "Fri", active: 0, pause: 0 },
      ],
      progress: {
         development: 0,
         design: 0,
         testing: 0,
         total: 0
      },
      productivity: {
         pulse: "0h 0m",
         delay: "0h 0m",
         pulseChange: 0,
         delayChange: 0
      }
   });

   useEffect(() => {
      // 1. Listen for Users
      const unsubUsers = onSnapshot(collection(db, "users"), (snap) => {
         const users = snap.docs.map(doc => doc.data());
         const onboarded = users.filter(u => u.onboarded).length;
         const devProgress = users.length > 0 ? Math.round((onboarded / users.length) * 100) : 0;
         
         setStats(prev => ({ 
            ...prev, 
            usersCount: snap.size,
            onboardedCount: onboarded,
            progress: {
               ...prev.progress,
               development: devProgress,
               total: Math.round((devProgress + prev.progress.design + prev.progress.testing) / 3)
            }
         }));
      });

      // 2. Listen for Templates
      const unsubTemplates = onSnapshot(collection(db, "templates"), (snap) => {
         const totalPossibleTemplates = 50; // Reference point for progress
         const designProgress = Math.min(100, Math.round((snap.size / totalPossibleTemplates) * 100));
         
         setStats(prev => ({ 
            ...prev, 
            templatesCount: snap.size,
            progress: {
               ...prev.progress,
               design: designProgress,
               total: Math.round((prev.progress.development + designProgress + prev.progress.testing) / 3)
            }
         }));
      });

      // 3. Listen for Inquiries
      const unsubInquiries = onSnapshot(collection(db, "inquiries"), (snap) => {
         const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
         
         // Calculate Project Status (Pie Chart)
         const resolved = data.filter(iq => iq.status === "Resolved").length;
         const processing = data.filter(iq => iq.status === "Processing").length;
         const unread = data.filter(iq => iq.status === "Unread").length;

         const testingProgress = data.length > 0 ? Math.round((resolved / data.length) * 100) : 0;

         // Calculate Trend Data (Last 5 days)
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

         // Calculate Productivity Time (Mocking hours based on inquiry count for realism)
         const totalHours = data.length * 2.5;
         const pulseHours = Math.floor(totalHours);
         const pulseMinutes = Math.round((totalHours - pulseHours) * 60);
         
         setStats(prev => ({ 
            ...prev, 
            inquiriesCount: snap.size,
            recentActivities: data.slice(0, 4).map(iq => ({
               label: `Inquiry from ${iq.name || 'Anonymous'}`,
               time: iq.createdAt?.toDate ? iq.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'
            })),
            projectData: [
               { name: "Completed", value: resolved, color: "#22c55e" },
               { name: "In Progress", value: processing, color: "#ec4899" },
               { name: "Upcoming", value: unread, color: "#3b82f6" },
            ],
            trendData: last5Days,
            progress: {
               ...prev.progress,
               testing: testingProgress,
               total: Math.round((prev.progress.development + prev.progress.design + testingProgress) / 3)
            },
            productivity: {
               pulse: `${pulseHours}h ${pulseMinutes}m`,
               delay: `${Math.floor(unread * 0.5)}h ${Math.round((unread * 0.5 % 1) * 60)}m`,
               pulseChange: Math.round((resolved / (data.length || 1)) * 100),
               delayChange: Math.round((unread / (data.length || 1)) * 100)
            }
         }));
      });

      return () => {
         unsubUsers();
         unsubTemplates();
         unsubInquiries();
      };
   }, []);

   const handleLogout = () => signOut(auth);

   return (
      <Layout userData={userData} title="Dashboard">
         <div className="p-4 mt-5 sm:p-6 lg:p-8 transition-colors duration-500">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
               <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                  Project Management Overview
               </h1>
            </div>

            {/* TOP CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
               <Card title="Active Projects" value={stats.templatesCount.toString()} color="bg-emerald-500" />
               <Card title="Total Tasks" value={stats.inquiriesCount.toString()} color="bg-blue-500" />
               <Card title="Team Members" value={stats.usersCount.toString()} color="bg-pink-500" />
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

               {/* TASK PROGRESS */}
               <div className="bg-white  backdrop-blur-xl border border-black/5  p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-sm transition-all">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Task Progress</h3>
                  <h1 className="text-4xl font-black text-foreground mb-6">{stats.progress.total}%</h1>

                  <div className="space-y-4">
                     <Progress label="Development" value={stats.progress.development} color="bg-pink-500" />
                     <Progress label="Design" value={stats.progress.design} color="bg-blue-500" />
                     <Progress label="Testing" value={stats.progress.testing} color="bg-emerald-500" />
                  </div>
               </div>

               {/* PROJECT STATUS */}
               <div className="bg-white  backdrop-blur-xl border border-black/5  p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-sm flex flex-col items-center transition-all">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6 w-full text-left">Project Status</h3>

                  <div className="relative">
                     <PieChart width={180} height={180}>
                        <Pie
                           data={stats.projectData}
                           dataKey="value"
                           innerRadius={60}
                           outerRadius={85}
                           stroke="none"
                           paddingAngle={5}
                        >
                           {stats.projectData.map((entry, index) => (
                              <Cell key={index} fill={entry.color} />
                           ))}
                        </Pie>
                     </PieChart>
                     <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl font-black text-foreground">{stats.inquiriesCount}</span>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Tasks</span>
                     </div>
                  </div>

                  <div className="mt-8 flex gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                     <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" />Done</div>
                     <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-pink-500" />Live</div>
                     <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" />Next</div>
                  </div>
               </div>

               {/* PRODUCTIVITY TREND */}
               <div className="bg-white  backdrop-blur-xl border border-black/5  p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-sm transition-all md:col-span-2 lg:col-span-1">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Productivity Trend</h3>

                  <div className="h-[200px] w-full mt-4">
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stats.trendData}>
                           <Line
                              type="monotone"
                              dataKey="active"
                              stroke="#3b82f6"
                              strokeWidth={3}
                              dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2 }}
                              activeDot={{ r: 6, strokeWidth: 0 }}
                           />
                           <Line
                              type="monotone"
                              dataKey="pause"
                              stroke="#ec4899"
                              strokeWidth={3}
                              dot={{ r: 4, fill: '#ec4899', strokeWidth: 2 }}
                              activeDot={{ r: 6, strokeWidth: 0 }}
                           />
                        </LineChart>
                     </ResponsiveContainer>
                  </div>

                  <div className="flex justify-between mt-6 px-2">
                     <div>
                        <p className="text-lg font-black text-foreground">{stats.productivity.pulse}</p>
                        <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">↑ {stats.productivity.pulseChange}% <span className="text-muted-foreground opacity-50">Pulse</span></p>
                     </div>
                     <div className="text-right">
                        <p className="text-lg font-black text-foreground">{stats.productivity.delay}</p>
                        <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest flex items-center justify-end gap-1">↓ {stats.productivity.delayChange}% <span className="text-muted-foreground opacity-50">Delay</span></p>
                     </div>
                  </div>
               </div>
            </div>

            {/* EXTRA SECTION (OPTIONAL) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">

               {/* ACTIVITY */}
               <div className="bg-white  backdrop-blur-xl border border-black/5  p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-sm transition-all">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">Recent Activity</h3>

                  <div className="space-y-4">
                     {(stats.recentActivities.length > 0 ? stats.recentActivities : [
                        { label: "Task Protocol Completed", time: "2m ago" },
                        { label: "New Template Member Added", time: "12m ago" },
                        { label: "Blueprint Project Updated", time: "45m ago" },
                        { label: "Architecture Deadline Reached", time: "1h ago" },
                     ]).map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-black/5 :bg-white/5 transition-all group">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                 <CheckCircle2 size={16} />
                              </div>
                              <p className="text-xs font-bold text-foreground group-hover:translate-x-1 transition-transform">{item.label}</p>
                           </div>
                           <span className="text-[10px] font-bold text-muted-foreground opacity-50 uppercase tracking-tighter">{item.time}</span>
                        </div>
                     ))}
                  </div>
               </div>

               {/* TEAM */}
               <div className="bg-white  backdrop-blur-xl border border-black/5  p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-sm transition-all">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">Team Overview</h3>

                  <div className="flex items-center gap-5 p-4 bg-black/5  rounded-[1.5rem] border border-black/5 ">
                     <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shadow-inner">
                        <Users size={28} />
                     </div>
                     <div>
                        <p className="text-2xl font-black text-foreground">{stats.usersCount} Members</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">
                           Synchronized Team Templates
                        </p>
                     </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between px-2">
                     <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock size={14} className="opacity-40" />
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

         </div>
      </Layout>
   );
};

export default Analytics;

/* COMPONENTS */

const Card = ({ title, value, color }) => (
   <div className="bg-white  backdrop-blur-xl border border-black/5  p-6 rounded-[2rem] shadow-sm flex justify-between items-center group hover:scale-[1.02] transition-all duration-300" >
      <div>
         <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1 opacity-60">{title}</p>
         <h2 className="text-3xl font-black text-foreground tracking-tighter">{value}</h2>
      </div>
      <div className={`w-12 h-12 rounded-2xl ${color} shadow-lg shadow-${color.split('-')[1]}-500/20 flex items-center justify-center p-3 opacity-80 group-hover:opacity-100 transition-opacity`}>
         <div className="w-full h-full bg-white/20 rounded-lg" />
      </div>
   </div >
);

const Progress = ({ label, value, color }) => (
   <div className="group cursor-default">
      <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest mb-2">
         <span className="text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
         <span className="text-foreground">{value}%</span>
      </div>
      <div className="w-full bg-black/5  h-2.5 rounded-full overflow-hidden border border-black/5  p-0.5 shadow-inner">
         <div
            className={`h-full rounded-full ${color} shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-all duration-1000 ease-out group-hover:brightness-110`}
            style={{ width: `${value}%` }}
         />
      </div>
   </div>
);
