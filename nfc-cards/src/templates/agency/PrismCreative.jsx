import React from 'react';
import { FiTriangle, FiPhone, FiMail, FiGlobe } from 'react-icons/fi';

const PrismCreative = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website } = userData || {};
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-['Inter']">
      <div className="w-full max-w-sm bg-white rounded-[4rem] p-1 shadow-2xl overflow-hidden">
        <div className="h-48 bg-gradient-to-tr from-violet-600 via-rose-500 to-amber-400 p-8 rounded-[3.8rem] flex flex-col justify-end">
           <div className="w-16 h-1 bg-white/40 rounded-full mb-6" />
           <h1 className="text-3xl font-black text-white tracking-tighter capitalize">{displayName || 'Prism Art'}</h1>
           <p className="text-white/80 text-xs font-bold mt-1 opacity-70">{role || 'Visual Developer'}</p>
        </div>
        <div className="p-10 space-y-4">
           <div className="flex items-center gap-6 mb-8 overflow-hidden">
              <div className="flex-1 space-y-1">
                 <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-300 italic">Core / Communication</p>
                 <a href={`tel:${mobileNumber}`} className="text-xl font-bold text-slate-900 block group-hover:text-rose-500 transition-colors">{mobileNumber || '+0 11 22 33'}</a>
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-900"><FiPhone size={20} /></div>
           </div>
           
           <div className="flex items-center gap-6 mb-12 overflow-hidden">
              <div className="flex-1 space-y-1">
                 <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-300 italic">Net / Protocol</p>
                 <a href={`mailto:${email}`} className="text-xl font-bold text-slate-900 block truncate">{email || 'hello@prism.co'}</a>
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-900"><FiMail size={20} /></div>
           </div>
           
           <a href={website} className="bg-slate-900 text-white w-full py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 active:scale-[0.98] transition-all">
              <FiTriangle className="rotate-180" size={14} /> Explorer Project
           </a>
        </div>
        <div className="pb-10 text-center opacity-10">
           <p className="text-[7px] font-black tracking-[0.8em] uppercase">Firevy Prism v3.0</p>
        </div>
      </div>
    </div>
  );
};
export default PrismCreative;
