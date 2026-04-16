import React from 'react';
import { FiLayout, FiPhone, FiMail, FiGlobe } from 'react-icons/fi';

const UrbanDwell = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website, city } = userData || {};
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm">
        <div className="bg-slate-100 h-48 rounded-[3rem] mb-[-4rem] overflow-hidden relative">
           <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent" />
           <div className="absolute top-8 left-8 p-3 bg-white rounded-2xl shadow-sm text-slate-400">
              <FiLayout size={24} />
           </div>
        </div>
        <div className="bg-white rounded-[3rem] p-10 shadow-2xl relative z-10 border border-slate-100/50">
           <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">{displayName || 'Urban Dwell'}</h1>
           <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mt-4 mb-10">{role || 'Agent Executive'}</p>
           
           <div className="space-y-4">
              <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-3xl border border-slate-100 group">
                 <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm"><FiPhone size={18} /></div>
                 <a href={`tel:${mobileNumber}`} className="text-sm font-bold text-slate-700">{mobileNumber || 'Connect'}</a>
              </div>
              <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-3xl border border-slate-100 group">
                 <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm"><FiMail size={18} /></div>
                 <a href={`mailto:${email}`} className="text-sm font-bold text-slate-700 truncate">{email || 'Email'}</a>
              </div>
              <a href={website} className="bg-slate-900 text-white w-full py-5 rounded-3xl font-black text-[11px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:brightness-125 transition-all">
                 Browse Listings
              </a>
           </div>
           
           <div className="mt-10 pt-6 border-t border-slate-50 flex justify-between items-center opacity-30">
              <p className="text-[7px] font-black tracking-[0.5em] text-slate-900 uppercase">{city || 'Urban Network'}</p>
              <div className="w-8 h-[2px] bg-slate-900" />
           </div>
        </div>
      </div>
    </div>
  );
};
export default UrbanDwell;
