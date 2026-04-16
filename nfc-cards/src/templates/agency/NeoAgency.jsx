import React from 'react';
import { FiZap, FiPhone, FiMail, FiGlobe } from 'react-icons/fi';

const NeoAgency = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website } = userData || {};
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-['Space Grotesk']">
      <div className="w-full max-w-sm bg-zinc-900 border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-all duration-700" />
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-black mb-10 shadow-2xl shadow-emerald-500/20">
             <FiZap size={28} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight -mb-1">{displayName || 'Neo Agency'}</h1>
          <p className="text-emerald-500 text-xs font-bold uppercase tracking-[0.3em] mt-3">{role || 'Innovation Lead'}</p>
          
          <div className="mt-12 grid grid-cols-2 gap-3">
             <a href={`tel:${mobileNumber}`} className="bg-white/5 p-5 rounded-[2rem] flex flex-col items-center gap-2 border border-white/5 hover:bg-emerald-500 transition-all group/icon">
                <FiPhone size={20} className="text-white group-hover/icon:text-black" />
                <span className="text-[7px] font-black uppercase tracking-widest text-white/40 group-hover/icon:text-black/60 transition-colors">Call</span>
             </a>
             <a href={`mailto:${email}`} className="bg-white/5 p-5 rounded-[2rem] flex flex-col items-center gap-2 border border-white/5 hover:bg-emerald-500 transition-all group/icon">
                <FiMail size={20} className="text-white group-hover/icon:text-black" />
                <span className="text-[7px] font-black uppercase tracking-widest text-white/40 group-hover/icon:text-black/60 transition-colors">Email</span>
             </a>
          </div>
          <a href={website} className="mt-4 block w-full py-5 text-center rounded-[2rem] bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] hover:brightness-90 transition-all">Launch Project</a>
          
          <div className="mt-12 flex items-center justify-center gap-3 opacity-20">
             <div className="h-[2px] w-6 bg-white" />
             <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white">Neo Logic Identity</p>
             <div className="h-[2px] w-6 bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default NeoAgency;
