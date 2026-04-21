import React from "react";
import Layout from "../../components/layout/layout";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
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
   const handleLogout = () => signOut(auth);

   // Line chart data
   const trendData = [
      { day: "Mon", active: 4, pause: 2 },
      { day: "Tue", active: 3, pause: 2 },
      { day: "Wed", active: 5, pause: 3 },
      { day: "Thu", active: 4, pause: 2 },
      { day: "Fri", active: 6, pause: 3 },
   ];

   // Pie chart data
   const projectData = [
      { name: "Completed", value: 215, color: "#22c55e" },
      { name: "In Progress", value: 68, color: "#ec4899" },
      { name: "Upcoming", value: 143, color: "#3b82f6" },
   ];

   return (
      <Layout userData={userData} title="Dashboard">
         <div className="p-6 transition-colors duration-500">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
               <h1 className="text-2xl font-black tracking-tight text-foreground">
                  Project Management Overview
               </h1>

               <button className="bg-foreground text-background px-6 py-2.5 rounded-full text-xs font-bold hover:brightness-110 transition-all shadow-lg active:scale-95">
                  + New Task
               </button>
            </div>

            {/* TOP CARDS */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
               <Card title="Active Projects" value="426" color="bg-emerald-500" />
               <Card title="Total Tasks" value="1,234" color="bg-blue-500" />
               <Card title="Team Members" value="102" color="bg-pink-500" />
            </div>

            {/* MAIN GRID */}
            <div className="grid md:grid-cols-3 gap-6">

               {/* TASK PROGRESS */}
               <div className="bg-white dark:bg-white backdrop-blur-xl border border-black/5 dark:border-white/10 p-6 rounded-[2rem] shadow-sm transition-all">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Task Progress</h3>
                  <h1 className="text-4xl font-black text-foreground mb-6">70%</h1>

                  <div className="space-y-4">
                     <Progress label="Development" value={87} color="bg-pink-500" />
                     <Progress label="Design" value={36} color="bg-blue-500" />
                     <Progress label="Testing" value={78} color="bg-emerald-500" />
                  </div>
               </div>

               {/* PROJECT STATUS */}
               <div className="bg-white dark:bg-white backdrop-blur-xl border border-black/5 dark:border-white/10 p-6 rounded-[2rem] shadow-sm flex flex-col items-center transition-all">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6 w-full text-left">Project Status</h3>

                  <div className="relative">
                     <PieChart width={180} height={180}>
                        <Pie
                           data={projectData}
                           dataKey="value"
                           innerRadius={60}
                           outerRadius={85}
                           stroke="none"
                           paddingAngle={5}
                        >
                           {projectData.map((entry, index) => (
                              <Cell key={index} fill={entry.color} />
                           ))}
                        </Pie>
                     </PieChart>
                     <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl font-black text-foreground">426</span>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Active</span>
                     </div>
                  </div>

                  <div className="mt-8 flex gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                     <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" />Done</div>
                     <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-pink-500" />Live</div>
                     <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" />Next</div>
                  </div>
               </div>

               {/* PRODUCTIVITY TREND */}
               <div className="bg-white dark:bg-white backdrop-blur-xl border border-black/5 dark:border-white/10 p-6 rounded-[2rem] shadow-sm transition-all">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Productivity Trend</h3>

                  <div className="h-[200px] w-full mt-4">
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData}>
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
                        <p className="text-lg font-black text-foreground">126h 58m</p>
                        <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">↑ 14% <span className="text-muted-foreground opacity-50">Pulse</span></p>
                     </div>
                     <div className="text-right">
                        <p className="text-lg font-black text-foreground">9h 45m</p>
                        <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest flex items-center justify-end gap-1">↓ 21% <span className="text-muted-foreground opacity-50">Delay</span></p>
                     </div>
                  </div>
               </div>
            </div>

            {/* EXTRA SECTION (OPTIONAL) */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">

               {/* ACTIVITY */}
               <div className="bg-white dark:bg-white backdrop-blur-xl border border-black/5 dark:border-white/10 p-6 rounded-[2rem] shadow-sm transition-all">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">Recent Activity</h3>

                  <div className="space-y-4">
                     {[
                        { label: "Task Protocol Completed", time: "2m ago" },
                        { label: "New Node Member Added", time: "12m ago" },
                        { label: "Blueprint Project Updated", time: "45m ago" },
                        { label: "Architecture Deadline Reached", time: "1h ago" },
                     ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-all group">
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
               <div className="bg-white dark:bg-white backdrop-blur-xl border border-black/5 dark:border-white/10 p-6 rounded-[2rem] shadow-sm transition-all">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">Team Overview</h3>

                  <div className="flex items-center gap-5 p-4 bg-black/5 dark:bg-white/5 rounded-[1.5rem] border border-black/5 dark:border-white/5">
                     <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shadow-inner">
                        <Users size={28} />
                     </div>
                     <div>
                        <p className="text-2xl font-black text-foreground">102 Members</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">
                           Synchronized Team Nodes
                        </p>
                     </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between px-2">
                     <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock size={14} className="opacity-40" />
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

         </div>
      </Layout>
   );
};

export default Analytics;

/* COMPONENTS */

const Card = ({ title, value, color }) => (
   <div className="bg-white dark:bg-white backdrop-blur-xl border border-black/5 dark:border-white/10 p-6 rounded-[2rem] shadow-sm flex justify-between items-center group hover:scale-[1.02] transition-all duration-300" >
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
      <div className="w-full bg-black/5 dark:bg-white/5 h-2.5 rounded-full overflow-hidden border border-black/5 dark:border-white/5 p-0.5 shadow-inner">
         <div
            className={`h-full rounded-full ${color} shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-all duration-1000 ease-out group-hover:brightness-110`}
            style={{ width: `${value}%` }}
         />
      </div>
   </div>
);