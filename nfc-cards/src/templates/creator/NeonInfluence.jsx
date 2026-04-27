import React from 'react';
import { FiZap, FiPhone, FiMail, FiGlobe, FiInstagram } from 'react-icons/fi';

const NeonInfluence = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website } = userData || {};
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-['Outfit']">
      <div className="w-full max-w-sm bg-black border border-white/5 rounded-[4rem] p-1 shadow-2xl relative overflow-hidden flex flex-col items-center group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-rose-500 to-amber-500" />
        <div className="mt-12 w-20 h-20 rounded-[2.5rem] bg-white text-black flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform">
           <FiZap size={32} />
        </div>
        <h1 className="text-3xl font-black text-white tracking-[0.2em] uppercase text-center leading-none italic">{displayName || 'Neon Icon'}</h1>
        
        
        <div className="w-full space-y-3 px-2">
           <a href={`tel:${mobileNumber}`} className="w-full flex items-center justify-between py-5 px-8 rounded-[2.5rem] bg-white/5 border border-white/5 text-white font-bold text-sm hover:bg-white hover:text-black transition-all group/link">
              <span className="opacity-40 italic font-black text-[9px] uppercase tracking-widest">Connect</span>
              <span>{mobileNumber || 'Direct'}</span>
           </a>
           <a href={`mailto:${email}`} className="w-full flex items-center justify-between py-5 px-8 rounded-[2.5rem] bg-white/5 border border-white/5 text-white font-bold text-sm hover:bg-white hover:text-black transition-all group/link truncate">
              <span className="opacity-40 italic font-black text-[9px] uppercase tracking-widest">Signal</span>
              <span>{email || 'Signal'}</span>
           </a>
           <div className="flex items-center gap-4 justify-center pt-10 text-white/20">
              <FiInstagram size={20} className="hover:text-rose-500 transition-colors cursor-pointer" />
              <FiGlobe size={20} className="hover:text-cyan-500 transition-colors cursor-pointer" />
           </div>
        </div>
        
        <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block mt-12 text-[7px] text-white/10 font-black tracking-[1em] uppercase pb-8 hover:opacity-70 transition-opacity">Powered by Cardyn</a>
      </div>
    </div>
  );
};
export default NeonInfluence;
