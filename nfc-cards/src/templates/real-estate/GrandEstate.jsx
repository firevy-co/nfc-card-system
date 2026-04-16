import React from 'react';
import { FiHome, FiPhone, FiMail, FiMapPin, FiCalendar } from 'react-icons/fi';

const GrandEstate = ({ userData }) => {
  const { displayName, email, role, mobileNumber, city, country } = userData || {};
  return (
    <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center p-6 font-['Outfit']">
      <div className="w-full max-w-sm bg-white border border-[#f0f0f0] rounded-[2.5rem] p-10 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col items-center mb-12">
           <div className="w-20 h-20 rounded-[2rem] bg-indigo-900 flex items-center justify-center text-white mb-8 shadow-2xl shadow-indigo-900/20">
              <FiHome size={32} />
           </div>
           <h1 className="text-2xl font-black text-slate-900 tracking-tight text-center">{displayName || 'Grand Estate'}</h1>
           <p className="text-indigo-900/40 text-[10px] font-black uppercase tracking-[0.4em] mt-3">{role || 'Senior Property Advisor'}</p>
        </div>
        
        <div className="space-y-4">
           <div className="grid grid-cols-2 gap-3">
              <a href={`tel:${mobileNumber}`} className="bg-slate-50 p-5 rounded-3xl flex flex-col items-center gap-2 border border-slate-100 hover:border-indigo-900 transition-all">
                 <FiPhone size={20} className="text-indigo-900" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Call Now</span>
              </a>
              <a href={`mailto:${email}`} className="bg-slate-50 p-5 rounded-3xl flex flex-col items-center gap-2 border border-slate-100 hover:border-indigo-900 transition-all">
                 <FiMail size={20} className="text-indigo-900" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Message</span>
              </a>
           </div>
           
           <div className="p-5 bg-indigo-900 text-white rounded-3xl border border-indigo-900 flex items-center justify-between group cursor-pointer hover:brightness-110 transition-all">
              <div className="flex items-center gap-3">
                 <FiCalendar size={18} />
                 <span className="text-xs font-bold uppercase tracking-widest">Schedule Viewing</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">→</div>
           </div>
           
           <div className="flex items-center gap-3 justify-center text-slate-400 pt-8 opacity-40">
              <FiMapPin size={14} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{[city, country].filter(Boolean).join(', ') || 'Global Real Estate'}</span>
           </div>
        </div>
      </div>
    </div>
  );
};
export default GrandEstate;
