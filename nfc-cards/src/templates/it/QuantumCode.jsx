import React from 'react';
import { FiCpu, FiPhone, FiMail, FiGlobe, FiGithub } from 'react-icons/fi';

const QuantumCode = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website } = userData || {};
  return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center p-6 font-['JetBrains Mono']">
      <div className="w-full max-w-sm bg-[#0a0a1f] border border-cyan-500/20 rounded-3xl p-8 shadow-[0_0_50px_rgba(6,182,212,0.1)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/5">
          <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
            <FiCpu size={28} />
          </div>
          <div>
            <h1 className="text-white text-xl font-bold tracking-tighter uppercase">{displayName || 'Quantum Dev'}</h1>
            <p className="text-cyan-400 text-[9px] font-bold uppercase tracking-widest mt-1 opacity-80">{role || 'Full Stack Engineer'}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="group">
             <p className="text-[8px] text-cyan-400/40 uppercase tracking-widest mb-1.5 ml-1 font-bold">// Communication Protocol</p>
             <a href={`tel:${mobileNumber}`} className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all">
                <span className="text-white/80 text-xs font-bold">{mobileNumber || '+0 1101 0110'}</span>
                <FiPhone size={14} className="text-cyan-400" />
             </a>
          </div>
          <div className="group">
             <p className="text-[8px] text-cyan-400/40 uppercase tracking-widest mb-1.5 ml-1 font-bold">// Digital Mail</p>
             <a href={`mailto:${email}`} className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all">
                <span className="text-white/80 text-xs font-bold truncate pr-4">{email || 'root@system.io'}</span>
                <FiMail size={14} className="text-cyan-400" />
             </a>
          </div>
          <div className="group pt-2">
             <div className="flex gap-3">
               <a href={website} className="flex-1 flex items-center justify-center gap-2 bg-cyan-500 text-[#050510] py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:brightness-110 transition-all">
                 <FiGlobe size={14} /> Repository
               </a>
               <div className="px-4 flex items-center justify-center bg-white/5 rounded-xl border border-white/5 text-cyan-400 cursor-pointer hover:bg-white/10 transition-all">
                 <FiGithub size={18} />
               </div>
             </div>
          </div>
        </div>
        <div className="mt-10 flex justify-between items-center opacity-30">
           <p className="text-[7px] text-white font-bold uppercase tracking-[0.3em]">Firevy SysOps v2.0</p>
           <div className="flex gap-1">
             <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
             <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse delay-75" />
             <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse delay-150" />
           </div>
        </div>
      </div>
    </div>
  );
};
export default QuantumCode;
