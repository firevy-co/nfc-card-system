import React from 'react';
import { FiTriangle, FiPhone, FiMail, FiGlobe, FiZap } from 'react-icons/fi';

const NightConnect = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website } = userData || {};
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-Inter">
      <div className="w-full max-w-sm bg-gradient-to-b from-indigo-900/20 to-transparent border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl opacity-50" />
        <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mb-10 shadow-xl shadow-indigo-600/20 animate-pulse">
           <FiZap size={28} />
        </div>
        <h1 className="text-3xl font-black text-white tracking-widest uppercase italic text-center leading-none">{displayName || 'Club Nexus'}</h1>
        
        
        <div className="w-full space-y-4">
           <a href={`tel:${mobileNumber}`} className="flex items-center justify-between bg-white text-black py-5 px-8 rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
              <span className="opacity-60">Call</span>
              <span>{mobileNumber || 'Connect'}</span>
           </a>
           <a href={`mailto:${email}`} className="flex items-center justify-between border border-white/10 py-5 px-8 rounded-2xl font-black text-[12px] uppercase tracking-widest text-white hover:bg-white/10 transition-all">
              <span className="opacity-40">Direct</span>
              <span className="truncate ml-4">{email || 'Signal'}</span>
           </a>
           <a href={website} className="bg-indigo-600/10 text-indigo-400 w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-indigo-600/20 transition-all mt-4">
              Explore Night
           </a>
        </div>
        <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block mt-16 text-[7px] text-white/10 font-black tracking-[1em] uppercase hover:opacity-70 transition-opacity">Powered by Cardyn</a>
      </div>
    </div>
  );
};
export default NightConnect;
