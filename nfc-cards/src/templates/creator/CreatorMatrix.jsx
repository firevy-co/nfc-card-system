import React from 'react';
import { FiLayout, FiPhone, FiMail, FiGlobe } from 'react-icons/fi';

const CreatorMatrix = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website } = userData || {};
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-['Space Grotesk']">
      <div className="w-full max-w-sm border-2 border-white/5 bg-zinc-950 rounded-[3rem] p-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
           <div className="grid grid-cols-10 gap-2 h-full">
              {Array.from({length: 100}).map((_, i) => (
                 <div key={i} className="w-1 h-1 bg-white rounded-full opacity-20" />
              ))}
           </div>
        </div>
        <div className="mb-12 relative z-10">
           <div className="w-12 h-1 bg-white mb-10" />
           <h1 className="text-4xl font-black text-white tracking-widest uppercase italic leading-none">{displayName || 'Matrix Node'}</h1>
           <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em] mt-3">{role || 'Full System Creator'}</p>
        </div>
        
        <div className="space-y-4 relative z-10">
           <a href={`tel:${mobileNumber}`} className="group flex items-center justify-between border-b border-white/10 pb-5 hover:border-white transition-all">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-white transition-colors">Neural Link</span>
              <span className="text-white font-bold">{mobileNumber || 'Connect'}</span>
           </a>
           <a href={`mailto:${email}`} className="group flex items-center justify-between border-b border-white/10 pb-5 hover:border-white transition-all">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-white transition-colors">Signal Hive</span>
              <span className="text-white font-bold truncate ml-8 uppercase font-mono tracking-tighter">{email || 'SYNC'}</span>
           </a>
           <button className="w-full mt-10 py-5 bg-white text-black rounded-3xl font-black text-[11px] uppercase tracking-[0.6em] hover:brightness-90 active:scale-[0.98] transition-all">Enter Hive</button>
        </div>
        
        <div className="mt-16 flex justify-between items-center opacity-10 relative z-10">
           <p className="text-[7px] font-black tracking-[0.8em] text-white italic transition-all group-hover:tracking-[1.2em]">Matrix Protocol v9.0</p>
           <FiLayout size={16} />
        </div>
      </div>
    </div>
  );
};
export default CreatorMatrix;
