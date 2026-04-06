import React from 'react';
import Layout from '../../components/layout/layout';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import {
   Users,
   Zap,
   CreditCard,
   TrendingUp,
   TrendingDown,
   Globe,
   Clock,
   MoreHorizontal,
   CheckCircle2,
   AlertTriangle,
   Edit3,
   UserPlus
} from 'lucide-react';

const Analytics = ({ user, userData }) => {
   const handleLogout = () => signOut(auth);

   return (
      <Layout userData={userData}>
         <header className="mb-8 flex items-center justify-between p-2">
            <div>
               <h2 className="text-3xl font-black text-foreground tracking-tighter uppercase tracking-[0.2em]">System Analytics</h2>
               <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-1 opacity-50">Identity network orchestration portal</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-xl flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest uppercase">Live Sync</span>
               </div>
            </div>
         </header>

         {/* --- TOP STATISTICS ROW --- */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-4">
            {[
               { label: 'Total Users', value: '24,592', change: '+12%', icon: Users, color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-500/10' },
               { label: 'Total NFC Scans', value: '1.2M', change: '+24%', icon: Zap, color: 'text-cyan-500 dark:text-cyan-400', bg: 'bg-cyan-500/10' },
               { label: 'Active Cards', value: '18,904', status: 'Active', icon: CreditCard, color: 'text-indigo-500 dark:text-indigo-400', bg: 'bg-indigo-500/10' },
               { label: 'Retention Rate', value: '94.2%', change: '-2%', icon: TrendingUp, color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-500/10' },
            ].map((stat, i) => (
               <div key={i} className="bg-card border border-border p-6 rounded-3xl shadow-premium inner-glow relative overflow-hidden transition-all duration-500 cursor-pointer">
                  <div className="flex justify-between items-start mb-6 relative">
                     <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-lg backdrop-blur-md`}>
                        <stat.icon className="w-5 h-5" />
                     </div>
                     {stat.change && (
                        <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${stat.change.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                           {stat.change.startsWith('+') ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                           {stat.change}
                        </div>
                     )}
                     {stat.status && (
                        <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 uppercase tracking-widest border border-cyan-500/20">
                           {stat.status}
                        </span>
                     )}
                  </div>
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.15em] mb-1 opacity-60 relative z-10">{stat.label}</p>
                  <h4 className="text-3xl font-black text-foreground tracking-tighter relative z-10">{stat.value}</h4>
                  <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
               </div>
            ))}
         </div>

         {/* --- MAIN CHART & TOP TEMPLATES --- */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 bg-card border border-border p-8 rounded-[2.5rem] shadow-premium inner-glow relative overflow-hidden group transition-colors duration-300">
               <div className="flex items-center justify-between mb-12">
                  <div>
                     <h3 className="text-xl font-bold text-foreground tracking-tight">Scans over Time</h3>
                     <p className="text-xs text-muted-foreground font-medium mt-1">Global interaction frequency across all active nodes</p>
                  </div>
                  <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 backdrop-blur-sm">
                     <button className="px-5 py-2 rounded-lg bg-cyan-500 text-black text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-cyan-500/20">Daily</button>
                     <button className="px-5 py-2 rounded-lg text-muted-foreground text-[10px] font-black uppercase tracking-widest hover:text-foreground transition-all">Monthly</button>
                  </div>
               </div>

               <div className="h-[280px] w-full relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 300" preserveAspectRatio="none">
                     <defs>
                        <linearGradient id="mainChartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                           <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
                           <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                        </linearGradient>
                     </defs>
                     <path
                        d="M0,250 C100,250 150,180 250,180 C350,180 400,230 500,230 C600,230 650,50 800,50 C900,50 950,150 1000,150 L1000,300 L0,300 Z"
                        fill="url(#mainChartGradient)"
                     />
                     <path
                        d="M0,250 C100,250 150,180 250,180 C350,180 400,230 500,230 C600,230 650,50 800,50 C900,50 950,150 1000,150"
                        fill="none"
                        stroke="#06B6D4"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                     />
                     <circle cx="250" cy="180" r="12" fill="#06B6D4" className="animate-pulse" />
                     <circle cx="250" cy="180" r="18" fill="#06B6D4" fillOpacity="0.2" className="animate-ping" />
                     <circle cx="500" cy="230" r="12" fill="#06B6D4" className="animate-pulse" />
                     <circle cx="800" cy="50" r="12" fill="#06B6D4" className="animate-pulse" />
                     <circle cx="800" cy="50" r="18" fill="#06B6D4" fillOpacity="0.2" className="animate-ping" />
                  </svg>
                  <div className="mt-8 flex justify-between text-[10px] font-black text-white/20 uppercase tracking-widest border-t border-white/5 pt-6">
                     <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
               </div>
            </div>

            <div className="bg-card border border-border p-8 rounded-[2.5rem] shadow-premium inner-glow flex flex-col relative overflow-hidden transition-colors duration-300">
               <h3 className="text-xl font-bold text-foreground tracking-tight mb-8">Top Templates</h3>
               <div className="flex-1 space-y-6 relative z-10">
                  {[
                     { name: 'Executive Slate', scans: '452k scans', prg: 'w-[90%]', color: '#3b82f6', iconBg: 'from-blue-600 to-indigo-900' },
                     { name: 'Minimalist Glass', scans: '289k scans', prg: 'w-[65%]', color: '#06b6d4', iconBg: 'from-cyan-600 to-blue-900' },
                     { name: 'Eco Bio-Link', scans: '112k scans', prg: 'w-[35%]', color: '#6366f1', iconBg: 'from-indigo-600 to-purple-900' },
                  ].map((tmpl, i) => (
                     <div key={i} className="group cursor-pointer">
                        <div className="flex items-center gap-4 mb-4">
                           <div className="w-16 h-12 rounded-xl bg-muted border border-white/10 flex items-center justify-center overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                              <div className={`w-full h-full bg-gradient-to-br ${tmpl.iconBg} flex items-center justify-center p-2`}>
                                 <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-md border border-white/20 shadow-inner flex items-center justify-center relative overflow-hidden">
                                    <div className="w-2 h-2 bg-white/30 rounded-full absolute top-1 right-1"></div>
                                    <div className="w-4 h-0.5 bg-white/20 rounded-full absolute bottom-2 left-2"></div>
                                    <div className="w-2 h-0.5 bg-white/20 rounded-full absolute bottom-2 right-2"></div>
                                 </div>
                              </div>
                           </div>
                           <div className="flex-1">
                              <h4 className="text-sm font-bold text-foreground tracking-tight group-hover:text-cyan-400 transition-colors uppercase">{tmpl.name}</h4>
                              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1 opacity-50">{tmpl.scans}</p>
                           </div>
                           <div className="flex flex-col items-end gap-2 shrink-0">
                              <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                                 <div className={`h-full ${tmpl.prg} transition-all duration-1000 ease-out`} style={{ backgroundColor: tmpl.color }}></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
               <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-muted-foreground font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 hover:text-foreground transition-all mt-8 relative z-10 border-dashed">
                  View All Designs
               </button>
               <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full"></div>
            </div>
         </div>

         {/* --- GEOGRAPHIC & RECENT ACTIVITY --- */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card border border-border p-8 rounded-[2.5rem] shadow-premium inner-glow relative overflow-hidden min-h-[450px] transition-colors duration-300">
               <h3 className="text-xl font-bold text-foreground tracking-tight mb-8">Geographic Distribution</h3>
               <div className="relative h-60 bg-white/5 rounded-3xl mb-12 flex items-center justify-center border border-white/5 overflow-hidden">
                  <div className="w-full h-full opacity-20 absolute flex items-center justify-center p-4">
                     <Globe className="w-full h-full text-white/30" strokeWidth={1} />
                  </div>
                  <div className="absolute top-[35%] left-[25%] w-4 h-4 text-cyan-400">
                     <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
                     <div className="relative w-full h-full bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)]"></div>
                  </div>
                  <div className="absolute top-[30%] left-[48%] w-4 h-4 text-blue-500">
                     <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                     <div className="relative w-full h-full bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4 relative z-10">
                  {[
                     { name: 'United States', val: '42%', color: 'text-cyan-400' },
                     { name: 'United Kingdom', val: '18%', color: 'text-blue-400' },
                     { name: 'Germany', val: '12%', color: 'text-blue-400' },
                     { name: 'Other', val: '28%', color: 'text-cyan-400' }
                  ].map((geo, i) => (
                     <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center group hover:border-white/20 transition-all cursor-crosshair shadow-lg">
                        <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{geo.name}</span>
                        <span className={`text-sm font-black ${geo.color}`}>{geo.val}</span>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-card border border-border p-8 rounded-[2.5rem] shadow-premium inner-glow relative overflow-hidden transition-colors duration-300">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xl font-bold text-foreground tracking-tight">Recent Activity</h3>
                  <button className="text-[10px] font-black text-muted-foreground uppercase tracking-widest hover:text-red-500 transition-colors flex items-center gap-2">
                     Clear Log
                  </button>
               </div>
               <div className="space-y-6 relative z-10">
                  {[
                     { name: 'Sarah J.', event: 'scanned "Executive Slate"', time: '2 MINS AGO', loc: 'LONDON, UK', icon: CheckCircle2, iconColor: 'text-green-500', bg: 'bg-green-500/10' },
                     { name: 'New User Registration', event: 'IDENTITY: MARCUS THORNE', time: '15 MINS AGO', loc: 'PENDING', icon: UserPlus, iconColor: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                     { name: 'David R.', event: 'updated Profile Data', time: '42 MINS AGO', loc: 'VCARD MODIFIED', icon: Edit3, iconColor: 'text-blue-400', bg: 'bg-blue-500/10' },
                     { name: 'Failed NFC Auth', event: 'IDENTITY: UNKNOWN NODE', time: '1 HOUR AGO', loc: 'SECURITY ALERT', icon: AlertTriangle, iconColor: 'text-red-500', bg: 'bg-red-500/10' },
                  ].map((ev, i) => (
                     <div key={i} className="flex items-center gap-5 group py-1">
                        <div className={`w-12 h-12 rounded-xl ${ev.bg} border border-white/5 flex items-center justify-center text-xs shadow-inner relative overflow-hidden shrink-0`}>
                           <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                           <ev.icon className={`w-5 h-5 ${ev.iconColor} relative z-10`} />
                        </div>
                        <div className="flex-1">
                           <h4 className="text-sm font-bold text-foreground tracking-tight group-hover:text-cyan-400 transition-colors">
                              {ev.name} <span className="text-muted-foreground font-medium italic opacity-60 ml-1">{ev.event}</span>
                           </h4>
                           <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1 opacity-50 flex items-center gap-2">
                              {ev.loc} <span className="w-1 h-1 bg-white/20 rounded-full"></span> {ev.time}
                           </p>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity">
                           <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </div>
                     </div>
                  ))}
               </div>
               <button className="w-full text-center mt-12 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-cyan-400 transition-all flex items-center justify-center gap-3 group">
                  <Clock className="w-4 h-4 opacity-50 group-hover:animate-spin-slow" />
                  Load 50 More Events
               </button>
            </div>
         </div>
         <div className="flex items-center justify-center mt-12">
            <button onClick={handleLogout} className="px-10 py-4 rounded-xl bg-red-500/10 text-red-500 font-black uppercase tracking-widest text-[10px] border border-red-500/20 hover:bg-red-500 hover:text-black transition-all">Sign Out Portfolio Identity</button>
         </div>
      </Layout>
   );
};

export default Analytics;
