import React from 'react';
import { FiWind, FiPhone, FiMail, FiInstagram } from 'react-icons/fi';

const ZenCafe = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website } = userData || {};
  return (
    <div className="min-h-screen bg-[#fafaf7] flex items-center justify-center p-6 font-Inter">
      <div className="w-full max-w-sm bg-white border border-[#e5e5e0] rounded-[5rem] p-12 shadow-2xl overflow-hidden flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-[#f4f4f0] flex items-center justify-center text-[#86867e] mb-8">
           <FiWind size={32} />
        </div>
        <h1 className="text-2xl font-black text-[#444440] tracking-tight text-center">{displayName || 'Zen Cafe'}</h1>
        <p className="text-[#86867e] text-[10px] font-bold uppercase tracking-[0.5em] mt-3 mb-10">{role || 'Barista Lead'}</p>
        
        <div className="w-full space-y-3">
           <a href={`tel:${mobileNumber}`} className="w-full flex items-center justify-center py-4 rounded-3xl bg-[#f4f4f0] text-[#444440] font-bold text-sm hover:bg-[#ebebe7] transition-all">
              {mobileNumber}
           </a>
           <a href={`mailto:${email}`} className="w-full flex items-center justify-center py-4 rounded-3xl bg-[#444440] text-[#f4f4f0] font-bold text-sm hover:brightness-110 transition-all truncate px-8">
              {email}
           </a>
        </div>
        
        <div className="mt-12 flex justify-center gap-2 opacity-20">
           <div className="w-2 h-2 rounded-full bg-[#86867e]" />
           <div className="w-2 h-2 rounded-full bg-[#83a493]" />
           <div className="w-2 h-2 rounded-full bg-[#d9c49d]" />
        </div>
        <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block mt-4 text-[7px] font-black tracking-[0.6em] text-[#444440]/20 uppercase hover:opacity-70 transition-opacity">Powered by Cardyn</a>
      </div>
    </div>
  );
};
export default ZenCafe;
