import React from 'react';
import { FiSquare, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const IronForge = ({ userData }) => {
  const { displayName, email, role, mobileNumber, city } = userData || {};
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-['Space Grotesk']">
      <div className="w-full max-w-sm bg-[#0a0a0a] border border-white/5 rounded-3xl p-10 shadow-2xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-600/10 to-transparent" />
        <div className="mb-12 relative z-10">
           <div className="w-12 h-1 bg-orange-600 mb-8" />
           <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">{displayName || 'Iron Forge'}</h1>
           <p className="text-orange-600 text-[10px] font-black uppercase tracking-[0.5em] mt-3">{role || 'Strength Specialist'}</p>
        </div>
        
        <div className="space-y-4 relative z-10">
           <a href={`tel:${mobileNumber}`} className="flex items-center justify-between border-b border-white/5 pb-4 group/link">
              <span className="text-[10px] font-black text-white/30 tracking-widest uppercase group-hover/link:text-orange-600 transition-colors">Direct Input</span>
              <span className="text-white font-bold">{mobileNumber || 'Connect'}</span>
           </a>
           <a href={`mailto:${email}`} className="flex items-center justify-between border-b border-white/5 pb-4 group/link">
              <span className="text-[10px] font-black text-white/30 tracking-widest uppercase group-hover/link:text-orange-600 transition-colors">Digital Comms</span>
              <span className="text-white font-bold truncate ml-8 font-mono">{email || 'SIGNAL'}</span>
           </a>
           <div className="flex items-center justify-between border-b border-white/5 pb-4 group/link">
              <span className="text-[10px] font-black text-white/30 tracking-widest uppercase group-hover/link:text-orange-600 transition-colors">Base Location</span>
               <span className="text-white font-bold">{city || 'HQ'}</span>
           </div>
           <button className="w-full mt-8 py-5 bg-orange-600 text-black rounded-2xl font-black text-[12px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-orange-600/20">Initialize Strength</button>
        </div>
        
        <div className="mt-16 opacity-30 flex justify-between items-center relative z-10">
           <p className="text-[7px] font-black tracking-[0.8em] text-white">Iron Framework v4</p>
           <FiSquare size={16} className="rotate-45" />
        </div>
      </div>
    </div>
  );
};
export default IronForge;
