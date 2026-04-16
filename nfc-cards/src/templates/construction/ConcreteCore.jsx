import React from 'react';
import { FiMinimize, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const ConcreteCore = ({ userData }) => {
  const { displayName, email, role, mobileNumber, city } = userData || {};
  return (
    <div className="min-h-screen bg-[#d1d1d1] flex items-center justify-center p-6 font-['Inter']">
      <div className="w-full max-w-sm bg-[#e0e0e0] rounded-[4rem] p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border border-[#ffffff] flex flex-col items-center group">
        <div className="w-24 h-24 rounded-[3rem] bg-[#d1d1d1] flex items-center justify-center text-slate-800 mb-10 shadow-inner group-hover:scale-95 transition-transform">
           <FiMinimize size={40} className="rotate-45" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight text-center uppercase leading-none">{displayName || 'Concrete Core'}</h1>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] mt-4 mb-12">{role || 'Foundations Engineer'}</p>
        
        <div className="w-full space-y-3">
           <a href={`tel:${mobileNumber}`} className="w-full flex items-center justify-center py-5 rounded-[2.5rem] bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.4em] hover:brightness-125 transition-all shadow-xl shadow-slate-900/10">
              {mobileNumber || 'Connect'}
           </a>
           <a href={`mailto:${email}`} className="w-full flex items-center justify-center py-5 rounded-[2.5rem] border border-slate-300 text-slate-900 font-black text-[10px] uppercase tracking-[0.4em] bg-transparent hover:bg-white transition-all truncate px-8">
              {email || 'Email'}
           </a>
        </div>
        
        <div className="mt-16 flex justify-center gap-2 opacity-20">
           <div className="w-2 h-2 rounded bg-slate-900" />
           <div className="w-2 h-2 rounded bg-slate-900" />
           <div className="w-2 h-2 rounded bg-slate-900" />
        </div>
        <p className="mt-4 text-[7px] font-black tracking-[1em] text-slate-900/20 uppercase underline">{city || 'CENTRAL CORE'}</p>
      </div>
    </div>
  );
};
export default ConcreteCore;
