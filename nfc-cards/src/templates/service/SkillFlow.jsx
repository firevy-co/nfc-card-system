import React from 'react';
import { FiWind, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const SkillFlow = ({ userData }) => {
  const { displayName, email, role, mobileNumber, city } = userData || {};
  return (
    <div className="min-h-screen bg-[#fafafc] flex items-center justify-center p-6 font-['Inter']">
      <div className="w-full max-w-sm bg-white border border-[#f1f1f5] rounded-[5rem] p-12 shadow-[0_40px_80px_-20px_rgba(200,200,230,0.3)] flex flex-col items-center group">
        <div className="w-20 h-20 rounded-[2.5rem] bg-indigo-50 text-indigo-400 flex items-center justify-center mb-8 animate-pulse group-hover:bg-indigo-600 group-hover:text-white transition-all">
           <FiWind size={32} />
        </div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight text-center italic">{displayName || 'Skill Flow'}</h1>
        <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mt-3 mb-10">{role || 'Creative Solutionist'}</p>
        
        <div className="w-full space-y-3">
           <a href={`tel:${mobileNumber}`} className="w-full flex items-center justify-center py-5 rounded-[2.5rem] bg-slate-50 text-slate-600 font-bold text-sm border border-slate-100 hover:bg-white hover:border-slate-800 hover:text-slate-900 transition-all">
              {mobileNumber || 'Connect'}
           </a>
           <a href={`mailto:${email}`} className="w-full flex items-center justify-center py-5 rounded-[2.5rem] bg-slate-900 text-white font-bold text-sm hover:brightness-125 transition-all truncate px-8 shadow-xl shadow-slate-900/10">
              {email || 'Message'}
           </a>
        </div>
        
        <div className="mt-12 opacity-30 flex items-center gap-3">
           <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
           <p className="text-[7px] font-black tracking-[0.8em] text-slate-400 uppercase">Skill Flow Registry</p>
           <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
        </div>
      </div>
    </div>
  );
};
export default SkillFlow;
