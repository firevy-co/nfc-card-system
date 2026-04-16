import React from 'react';
import { FiPhone, FiMail, FiGlobe, FiInstagram, FiStar } from 'react-icons/fi';

const DiamondElite = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website, companyName } = userData || {};
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 font-['Outfit']">
      <div className="w-full max-w-sm bg-gradient-to-b from-[#1a1a1a] to-black border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px]" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 p-0.5 mb-8">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-amber-400 text-3xl font-light">
               <FiStar size={32} strokeWidth={1} />
            </div>
          </div>
          <h1 className="text-3xl font-extralight text-white tracking-[0.2em] uppercase text-center">{displayName || 'Precious Jewels'}</h1>
          <p className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.5em] mt-4 mb-10">{role || 'Master Jeweler'}</p>
          
          <div className="w-full space-y-6">
            <a href={`tel:${mobileNumber}`} className="flex flex-col items-center border-b border-white/5 pb-4 group">
              <span className="text-[8px] text-white/30 font-bold uppercase tracking-widest mb-1">Private Line</span>
              <span className="text-white text-sm font-light tracking-widest group-hover:text-amber-400 transition-colors">{mobileNumber || '+1 (800) JEWELS'}</span>
            </a>
            <a href={`mailto:${email}`} className="flex flex-col items-center border-b border-white/5 pb-4 group">
              <span className="text-[8px] text-white/30 font-bold uppercase tracking-widest mb-1">Inquiries</span>
              <span className="text-white text-sm font-light tracking-widest group-hover:text-amber-400 transition-colors truncate w-full text-center">{email || 'concierge@diamond.com'}</span>
            </a>
          </div>
          
          <button className="mt-12 w-full py-4 border border-amber-500/30 text-amber-500 rounded-full font-light text-xs uppercase tracking-[0.4em] hover:bg-amber-500 hover:text-black transition-all">
            View Collection
          </button>
          <p className="mt-8 text-[7px] text-white/20 font-bold uppercase tracking-[0.8em]">Luxe Identity System</p>
        </div>
      </div>
    </div>
  );
};
export default DiamondElite;
