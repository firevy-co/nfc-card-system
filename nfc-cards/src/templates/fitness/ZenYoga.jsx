import React from 'react';
import { FiWind, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const ZenYoga = ({ userData }) => {
  const { displayName, email, role, mobileNumber, city } = userData || {};
  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center p-6 font-['Inter']">
      <div className="w-full max-w-sm bg-white border border-[#f1f1ee] rounded-[5rem] p-12 shadow-[0_40px_80px_-20px_rgba(180,180,170,0.5)] flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-[#f1f1ee] flex items-center justify-center text-slate-400 mb-8 animate-pulse">
           <FiWind size={32} />
        </div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight text-center italic">{displayName || 'Zen Yoga'}</h1>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mt-3 mb-10">{role || 'Flow Practitioner'}</p>
        
        <div className="w-full space-y-3">
           <a href={`tel:${mobileNumber}`} className="w-full flex items-center justify-center py-5 rounded-[2.5rem] bg-slate-50 text-slate-600 font-bold text-sm border border-slate-100 hover:bg-white hover:border-slate-800 hover:text-slate-900 transition-all">
              {mobileNumber || 'Connect'}
           </a>
           <a href={`mailto:${email}`} className="w-full flex items-center justify-center py-5 rounded-[2.5rem] bg-slate-900 text-white font-bold text-sm hover:brightness-125 transition-all truncate px-8">
              {email || 'Message'}
           </a>
        </div>
        
        <div className="mt-12 opacity-30 flex items-center gap-3">
           <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
           <p className="text-[7px] font-black tracking-[0.8em] text-slate-400 uppercase">Zen Harmony Registry</p>
           <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
        </div>

          <div className="mt-8 mb-2 text-center">
            <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-[0.2em] text-gray-300 hover:text-gray-500 transition-colors uppercase font-mulish">Powered by Cardyn</a>
          </div>
      </div>
    </div>
  );
};
export default ZenYoga;
