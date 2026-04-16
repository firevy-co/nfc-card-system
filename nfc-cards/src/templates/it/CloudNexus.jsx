import React from 'react';
import { FiCloud, FiPhone, FiMail, FiGlobe } from 'react-icons/fi';

const CloudNexus = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website, companyName } = userData || {};
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 font-Inter">
      <div className="w-full max-w-sm bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 rounded-[3rem] p-1 shadow-2xl overflow-hidden">
        <div className="bg-blue-600 p-8 rounded-[2.8rem] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
             <div className="absolute transform rotate-45 bg-white w-full h-1 top-0 left-0" />
             <div className="absolute transform rotate-45 bg-white w-full h-1 top-10 left-0" />
             <div className="absolute transform rotate-45 bg-white w-full h-1 top-20 left-0" />
          </div>
          <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-blue-600 shadow-xl mx-auto mb-6 relative z-10">
             <FiCloud size={32} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight relative z-10">{displayName || 'Cloud Native'}</h1>
          <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mt-2 relative z-10">{role || 'DevOps Specialist'}</p>
        </div>
        
        <div className="p-8 space-y-4">
           <a href={`tel:${mobileNumber}`} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center"><FiPhone size={18} /></div>
              <span className="text-sm font-bold text-white/80">{mobileNumber || '0.0.0.0'}</span>
           </a>
           <a href={`mailto:${email}`} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center"><FiMail size={18} /></div>
              <span className="text-sm font-bold text-white/80 truncate">{email || 'deploy@nexus.com'}</span>
           </a>
           <a href={website} className="flex items-center justify-center gap-2 bg-white text-blue-600 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition-all">
              <FiGlobe size={14} /> Open Portal
           </a>
        </div>
        <p className="text-center text-[7px] text-white/20 font-black tracking-[0.5em] pb-8 uppercase">Firevy Cloud Fabric</p>
      </div>
    </div>
  );
};
export default CloudNexus;
