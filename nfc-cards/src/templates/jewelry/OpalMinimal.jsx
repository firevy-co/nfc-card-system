import React from 'react';
import { FiPhone, FiMail, FiGlobe, FiMapPin } from 'react-icons/fi';

const OpalMinimal = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website, city } = userData || {};
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm">
        <div className="h-64 bg-gradient-to-br from-indigo-50 via-pink-50 to-blue-50 rounded-[3rem] mb-[-4rem] relative overflow-hidden flex items-center justify-center">
           <div className="w-16 h-16 rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 shadow-sm" />
        </div>
        <div className="bg-white/70 backdrop-blur-3xl border border-white rounded-[3rem] p-10 shadow-2xl shadow-blue-500/5 text-center">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">{displayName || 'Opal Minimal'}</h1>
          <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2 mb-8">{role || 'Studio Lead'}</p>
          
          <div className="grid grid-cols-1 gap-4">
             <a href={`tel:${mobileNumber}`} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
               <FiPhone size={14} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
               <span className="text-xs font-bold text-slate-700">{mobileNumber || '+1 (800) OPAL'}</span>
             </a>
             <a href={`mailto:${email}`} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
               <FiMail size={14} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
               <span className="text-xs font-bold text-slate-700 truncate ml-4">{email || 'hello@opal.com'}</span>
             </a>
             <a href={website} className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800 group">
               <FiGlobe size={14} className="text-white/30" />
               <span className="text-xs font-bold text-white">Visit Website</span>
             </a>
          </div>
          <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block mt-10 text-[6px] text-slate-200 font-black uppercase tracking-[0.8em] hover:opacity-70 transition-opacity">Powered by Cardyn</a>
        </div>
      </div>
    </div>
  );
};
export default OpalMinimal;
