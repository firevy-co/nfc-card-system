import React from 'react';
import { FiTriangle, FiPhone, FiMail, FiGlobe } from 'react-icons/fi';

const VectorStructure = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website } = userData || {};
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-['Inter']">
      <div className="w-full max-w-sm bg-white border border-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-900/5 rotate-45 transform translate-x-12 -translate-y-12" />
        <div className="w-16 h-1 bg-slate-900 mb-12" />
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase text-center leading-none">{displayName || 'Vector Build'}</h1>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em] mt-4 mb-12 italic">{role || 'structural director'}</p>
        
        <div className="w-full space-y-4">
           <a href={`tel:${mobileNumber}`} className="flex items-center justify-between border-2 border-slate-900 py-5 px-8 rounded-2xl font-black text-[12px] uppercase tracking-widest text-slate-900 hover:bg-slate-900 hover:text-white transition-all">
              <span>Main Line</span>
              <span>{mobileNumber || 'Connect'}</span>
           </a>
           <a href={`mailto:${email}`} className="flex items-center justify-between bg-slate-900 text-white py-5 px-8 rounded-2xl font-black text-[12px] uppercase tracking-widest hover:brightness-110 transition-all">
              <span>Signal Hub</span>
              <span className="truncate ml-4">{email || 'Direct'}</span>
           </a>
           <a href={website} className="bg-slate-50 text-slate-400 w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-[9px] uppercase tracking-[0.4em] hover:text-slate-900 transition-all mt-4 border border-slate-100">
              <FiTriangle className="rotate-180" size={14} /> Open Portal
           </a>
        </div>
        <p className="mt-16 text-[7px] text-slate-200 font-black tracking-[1em] uppercase">Firevy Vector Structure</p>
      </div>
    </div>
  );
};
export default VectorStructure;
