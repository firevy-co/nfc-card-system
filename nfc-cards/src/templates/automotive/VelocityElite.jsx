import React from 'react';
import { FiTriangle, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const VelocityElite = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website, city } = userData || {};
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 font-['Inter']">
      <div className="w-full max-w-sm">
        <div className="bg-slate-900 rounded-t-[3rem] p-10 flex flex-col items-center">
           <div className="w-20 h-20 rounded-full border-[6px] border-slate-800 bg-slate-900 flex items-center justify-center text-white text-3xl font-black mb-6 shadow-2xl">
              {displayName?.charAt(0) || 'V'}
           </div>
           <h1 className="text-xl font-bold text-white tracking-widest uppercase text-center">{displayName || 'Velocity Elite'}</h1>
           <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.5em] mt-3">{role || 'Elite Sales Director'}</p>
        </div>
        <div className="bg-white rounded-b-[3rem] p-10 space-y-4 shadow-xl">
           <a href={`tel:${mobileNumber}`} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-900 transition-all group">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors">Satellite Hub</span>
              <span className="text-sm font-bold text-slate-900">{mobileNumber || 'Connect'}</span>
           </a>
           <a href={`mailto:${email}`} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-900 transition-all group">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors">Direct Signal</span>
              <span className="text-sm font-bold text-slate-900 truncate ml-4">{email || 'Email'}</span>
           </a>
           <a href={website} className="bg-slate-900 text-white w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.4em] hover:brightness-125 transition-all shadow-xl shadow-slate-900/10">
              <FiTriangle className="rotate-90" size={14} /> Open Showroom
           </a>
        </div>
        <p className="text-center text-[7px] text-slate-300 font-bold tracking-[0.8em] mt-8 uppercase">Firevy Velocity Hub</p>
      </div>
    </div>
  );
};
export default VelocityElite;
