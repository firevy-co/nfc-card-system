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
   UserPlus,
   ArrowUpRight,
   Activity
} from 'lucide-react';

const Analytics = ({ user, userData }) => {
   const handleLogout = () => signOut(auth);

   return (
      <Layout userData={userData} title="System Analytics" showTopNavActions={false}>
         <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between p-4 bg-muted/20 rounded-3xl border border-border/50">
            <div>
               <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-bold text-primary capitalize tracking-[0.3em]">Network Intelligence</span>
               </div>
               <h2 className="text-3xl font-bold text-foreground tracking-tight capitalize">System Analytics</h2>
            </div>
            
            <div className="flex items-center gap-4 mt-4 md:mt-0">
               <div className="bg-card border border-border px-5 py-2.5 rounded-2xl flex items-center gap-3 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  <span className="text-[10px] font-bold text-foreground capitalize tracking-widest">Real-time Operational</span>
               </div>
            </div>
         </header>

         {/* --- TOP STATISTICS ROW --- */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
               { label: 'Total Participants', value: '24,592', change: '+12.5%', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
               { label: 'Network Interactions', value: '1,284,091', change: '+24.2%', icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
               { label: 'Operational Nodes', value: '18,904', status: 'Optimal', icon: CreditCard, color: 'text-blue-500', bg: 'bg-blue-500/10' },
               { label: 'Retention Coefficient', value: '94.2%', change: '-0.4%', icon: TrendingUp, color: 'text-violet-500', bg: 'bg-violet-500/10' },
            ].map((stat, i) => (
               <div key={i} className="bg-card border border-border p-6 rounded-[2rem] shadow-premium hover:border-primary/30 transition-all duration-300 relative overflow-hidden group cursor-pointer">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full translate-x-8 -translate-y-8 transition-transform"></div>
                  
                  <div className="flex justify-between items-start mb-6">
                     <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner border border-white/5`}>
                        <stat.icon className="w-6 h-6" />
                     </div>
                     {stat.change && (
                        <div className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-full border ${stat.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-destructive/10 text-destructive border-destructive/20'}`}>
                           {stat.change}
                        </div>
                     )}
                     {stat.status && (
                        <span className="text-[10px] font-bold px-2.5 py-1.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 capitalize tracking-widest">
                           {stat.status}
                        </span>
                     )}
                  </div>
                  
                  <h4 className="text-3xl font-bold text-foreground tracking-tighter mb-1">{stat.value}</h4>
                  <p className="text-[10px] font-bold capitalize text-muted-foreground tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">{stat.label}</p>
               </div>
            ))}
         </div>

         {/* --- MAIN CHART & TOP TEMPLATES --- */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className="lg:col-span-2 bg-card border border-border p-8 rounded-[2.5rem] shadow-premium relative overflow-hidden group transition-all duration-500 hover:border-primary/20">
               <div className="flex items-center justify-between mb-12 relative z-10">
                  <div>
                     <h3 className="text-xl font-bold text-foreground tracking-tight capitalize">Global Interaction Flow</h3>
                     <p className="text-xs text-muted-foreground font-medium mt-1">NFC Node activations across the network (7-day window)</p>
                  </div>
                  <div className="flex bg-muted/40 p-1.5 rounded-2xl border border-border">
                     <button className="px-6 py-2.5 rounded-xl bg-primary text-white text-[10px] font-bold capitalize tracking-widest shadow-lg shadow-primary/20 transition-all">Periodic</button>
                     <button className="px-6 py-2.5 rounded-xl text-muted-foreground text-[10px] font-bold capitalize tracking-widest hover:text-foreground transition-all">Cumulative</button>
                  </div>
               </div>

               <div className="h-[300px] w-full relative z-10 p-4">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 300" preserveAspectRatio="none">
                     <defs>
                        <linearGradient id="chartGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                           <stop offset="0%" stopColor="#6366F1" stopOpacity="0.4" />
                           <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                        </linearGradient>
                        <filter id="shadow">
                           <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="#6366F1" floodOpacity="0.5"/>
                        </filter>
                     </defs>
                     <path
                        d="M0,250 C100,250 150,180 250,180 C350,180 400,230 500,230 C600,230 650,50 800,50 C900,50 950,150 1000,150 L1000,300 L0,300 Z"
                        fill="url(#chartGlow)"
                     />
                     <path
                        d="M0,250 C100,250 150,180 250,180 C350,180 400,230 500,230 C600,230 650,50 800,50 C900,50 950,150 1000,150"
                        fill="none"
                        stroke="#6366F1"
                        strokeWidth="10"
                        strokeLinecap="round"
                        filter="url(#shadow)"
                     />
                     
                     <g className="chart-points">
                        <circle cx="250" cy="180" r="16" fill="#6366F1" fillOpacity="0.1" />
                        <circle cx="250" cy="180" r="8" fill="#6366F1" className="shadow-lg" />
                        
                        <circle cx="500" cy="230" r="8" fill="#6366F1" />
                        
                        <circle cx="800" cy="50" r="16" fill="#6366F1" fillOpacity="0.1" />
                        <circle cx="800" cy="50" r="8" fill="#6366F1" />
                     </g>
                  </svg>
                  <div className="mt-8 flex justify-between text-[10px] font-bold text-muted-foreground capitalize tracking-[0.3em] opacity-40 border-t border-border pt-8">
                     <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
               </div>
               <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            </div>

            <div className="bg-card border border-border p-8 rounded-[2.5rem] shadow-premium flex flex-col relative overflow-hidden transition-all duration-500 hover:border-primary/20">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-foreground tracking-tight capitalize">Top Architecture</h3>
                  <button className="p-2.5 rounded-xl bg-secondary hover:bg-border transition-all"><ArrowUpRight className="w-4 h-4" /></button>
               </div>
               
               <div className="flex-1 space-y-8 relative z-10">
                  {[
                     { name: 'Executive Slate', scans: '452k activations', val: 90, color: 'bg-primary' },
                     { name: 'Minimalist Glass', scans: '289k activations', val: 65, color: 'bg-emerald-500' },
                     { name: 'Identity Matrix', scans: '112k activations', val: 35, color: 'bg-blue-500' },
                  ].map((tmpl, i) => (
                     <div key={i} className="group cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                           <h4 className="text-xs font-bold text-foreground tracking-widest capitalize">{tmpl.name}</h4>
                           <span className="text-[10px] text-muted-foreground font-bold capitalize tracking-widest opacity-50">{tmpl.scans}</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden border border-border shadow-inner">
                           <div className={`h-full ${tmpl.color} rounded-full transition-all duration-1000 group-hover:brightness-125`} style={{ width: `${tmpl.val}%` }}></div>
                        </div>
                     </div>
                  ))}
               </div>
               
               <button className="w-full py-4 rounded-2xl bg-secondary/50 border border-border text-foreground font-bold text-[10px] capitalize tracking-[0.2em] hover:bg-primary hover:text-white hover:border-primary transition-all mt-10 relative z-10">
                  Enumerate All Modules
               </button>
            </div>
         </div>

         {/* --- GEOGRAPHIC & RECENT ACTIVITY --- */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card border border-border p-8 rounded-[2.5rem] shadow-premium relative overflow-hidden min-h-[480px]">
               <h3 className="text-xl font-bold text-foreground tracking-tight capitalize mb-8">Geospatial Presence</h3>
               <div className="relative h-64 bg-muted/20 rounded-3xl mb-10 flex items-center justify-center border border-border/50 overflow-hidden group">
                  <div className="w-full h-full opacity-10 absolute flex items-center justify-center p-8 transition-transform duration-1000 group-hover:scale-105">
                     <svg className="w-full h-full fill-foreground" viewBox="0 0 1000 500">
                        <path d="M150,150 Q200,100 300,120 T450,150 T600,130 T750,160 T850,200 L850,300 Q750,350 600,320 T450,340 T300,310 T150,350 Z" opacity="0.3" />
                        <circle cx="250" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
                        <circle cx="250" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.05" />
                        <line x1="100" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.1" />
                        <line x1="250" y1="50" x2="250" y2="350" stroke="currentColor" strokeWidth="1" opacity="0.1" />
                     </svg>
                  </div>
                  
                  {/* Presence Markers with Pulsing Effect */}
                  <div className="absolute top-[40%] left-[30%] w-6 h-6">
                     <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                     <div className="relative w-full h-full bg-primary rounded-full shadow-lg shadow-primary/50 flex items-center justify-center border-2 border-background">
                        <div className="w-1.5 h-1.5 bg-background rounded-full"></div>
                     </div>
                  </div>
                  
                  <div className="absolute top-[35%] left-[55%] w-8 h-8">
                     <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-pulse"></div>
                     <div className="relative w-full h-full bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50 flex items-center justify-center border-2 border-background">
                        <div className="w-1.5 h-1.5 bg-background rounded-full"></div>
                     </div>
                  </div>

                  <div className="absolute top-[50%] left-[75%] w-6 h-6 opacity-60">
                     <div className="absolute inset-0 bg-blue-500/20 rounded-full"></div>
                     <div className="relative w-full h-full bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 flex items-center justify-center border-2 border-background">
                        <div className="w-1.5 h-1.5 bg-background rounded-full"></div>
                     </div>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  {[
                     { name: 'Northern America', val: '42%', color: 'border-primary/20 bg-primary/5' },
                     { name: 'European Union', val: '28%', color: 'border-emerald-500/20 bg-emerald-500/5' },
                     { name: 'Asia Pacific', val: '18%', color: 'border-blue-500/20 bg-blue-500/5' },
                     { name: 'Other Regions', val: '12%', color: 'border-muted/20 bg-muted/5' }
                  ].map((geo, i) => (
                     <div key={i} className={`p-4 rounded-2xl border ${geo.color} flex justify-between items-center group transition-all`}>
                        <span className="text-[10px] font-bold capitalize text-muted-foreground tracking-widest">{geo.name}</span>
                        <span className="text-sm font-bold text-foreground">{geo.val}</span>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-card border border-border p-8 rounded-[2.5rem] shadow-premium relative overflow-hidden transition-all duration-500 hover:border-primary/20">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xl font-bold text-foreground tracking-tight capitalize">Network Audit Log</h3>
                  <button className="text-[10px] font-bold text-destructive capitalize tracking-widest hover:brightness-125 transition-all">Format Log</button>
               </div>
               
               <div className="space-y-4 relative z-10">
                  {[
                     { name: 'Marcus Sterling', event: 'Activated "Identity Slate"', time: '2M AGO', icon: CheckCircle2, iconColor: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                     { name: 'Internal Sync', event: 'Participant Registry Encrypted', time: '12M AGO', icon: UserPlus, iconColor: 'text-primary', bg: 'bg-primary/10' },
                     { name: 'Data Protocol', event: 'vCard Logic Re-architected', time: '45M AGO', icon: Edit3, iconColor: 'text-blue-500', bg: 'bg-blue-500/10' },
                     { name: 'Firewall Alert', event: 'Unrecognized Node Rejected', time: '1H AGO', icon: AlertTriangle, iconColor: 'text-destructive', bg: 'bg-destructive/10' },
                  ].map((ev, i) => (
                     <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-muted/30 transition-all group">
                        <div className={`w-12 h-12 rounded-2xl ${ev.bg} flex items-center justify-center p-3 border border-white/5 shadow-inner shrink-0`}>
                           <ev.icon className={`w-full h-full ${ev.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                           <h4 className="text-xs font-bold text-foreground tracking-widest capitalize truncate">{ev.name}</h4>
                           <p className="text-[10px] text-muted-foreground font-medium opacity-60 truncate">{ev.event}</p>
                        </div>
                        <div className="text-[9px] font-bold text-muted-foreground capitalize opacity-40 shrink-0">
                           {ev.time}
                        </div>
                     </div>
                  ))}
               </div>
               
               <button className="w-full text-center mt-12 text-[10px] font-bold capitalize tracking-[0.3em] text-muted-foreground hover:text-primary transition-all flex items-center justify-center gap-3 group">
                  <Clock className="w-4 h-4 opacity-50 transition-all" />
                  Request Full Network History
               </button>
            </div>
         </div>
      </Layout>
   );
};

export default Analytics;
