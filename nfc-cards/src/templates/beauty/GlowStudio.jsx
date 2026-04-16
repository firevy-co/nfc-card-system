import React from 'react';
import { FiStar, FiPhone, FiMail, FiMapPin, FiInstagram } from 'react-icons/fi';

const GlowStudio = ({ userData }) => {
  const { displayName, email, role, mobileNumber, city } = userData || {};
  return (
    <div className="min-h-screen bg-[#fffbfb] flex items-center justify-center p-6 font-['Outfit']">
      <div className="w-full max-w-sm bg-white border border-[#ffe4e4] rounded-[4rem] p-10 shadow-[0_40px_80px_-20px_rgba(255,182,193,0.3)] flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-200 to-[#fffbfb] p-1 mb-8">
           <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-rose-300">
              <FiStar size={36} fill="currentColor" opacity={0.2} />
           </div>
        </div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight text-center">{displayName || 'Glow Studio'}</h1>
        <p className="text-rose-400 text-[10px] font-black uppercase tracking-[0.5em] mt-3 mb-12">{role || 'Master Aesthetician'}</p>
        
        <div className="w-full space-y-4">
           <a href={`tel:${mobileNumber}`} className="w-full flex items-center justify-between p-5 rounded-3xl bg-[#fffbfb] border border-[#ffe4e4] text-slate-700 font-bold text-sm hover:bg-rose-50 transition-all">
              <span className="text-[9px] font-black uppercase tracking-widest text-rose-300 italic">Call</span>
              <span>{mobileNumber || 'Connect'}</span>
           </a>
           <a href={`mailto:${email}`} className="w-full flex items-center justify-between p-5 rounded-3xl bg-slate-900 text-white font-bold text-sm hover:brightness-125 transition-all truncate px-8">
              <span className="text-[9px] font-black uppercase tracking-widest text-white/40 italic">Signal</span>
              <span>{email || 'Inquire'}</span>
           </a>
           <div className="flex items-center gap-2 justify-center pt-8 text-rose-200">
              <FiInstagram size={18} />
              <p className="text-[8px] font-black uppercase tracking-[0.4em]">Glow Portfolio</p>
           </div>
        </div>
        <p className="mt-12 text-[7px] font-black tracking-[0.6em] text-rose-200 uppercase italic">Glow Framework · Firevy</p>
      </div>
    </div>
  );
};
export default GlowStudio;
