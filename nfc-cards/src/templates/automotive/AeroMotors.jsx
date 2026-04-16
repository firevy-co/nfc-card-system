import React from 'react';
import { FiMinimize2, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const AeroMotors = ({ userData }) => {
  const { displayName, email, role, mobileNumber, city } = userData || {};
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 font-['Outfit']">
      <div className="w-full max-w-sm bg-white border border-gray-100 rounded-[4rem] p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] text-center">
        <div className="flex justify-center mb-10">
           <div className="w-20 h-20 rounded-[2.5rem] bg-indigo-50 text-indigo-600 flex items-center justify-center -rotate-12 hover:rotate-0 transition-transform duration-500">
              <FiMinimize2 size={32} />
           </div>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">{displayName || 'Aero Motors'}</h1>
        <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.4em] mt-3 mb-12">{role || 'Aerodynamics Lead'}</p>
        
        <div className="space-y-4">
           <a href={`tel:${mobileNumber}`} className="flex items-center gap-4 bg-gray-50 p-5 rounded-3xl border border-gray-100 hover:border-indigo-600/30 transition-all group">
              <FiPhone size={18} className="text-gray-400 group-hover:text-indigo-600 transition-colors" />
              <span className="text-sm font-bold text-slate-700">{mobileNumber || 'Connect'}</span>
           </a>
           <a href={`mailto:${email}`} className="flex items-center gap-4 bg-gray-50 p-5 rounded-3xl border border-gray-100 hover:border-indigo-600/30 transition-all group">
              <FiMail size={18} className="text-gray-400 group-hover:text-indigo-600 transition-colors" />
              <span className="text-sm font-bold text-slate-700 truncate">{email || 'Email'}</span>
           </a>
           <button className="w-full mt-4 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] hover:bg-slate-900 transition-all shadow-xl shadow-indigo-600/20">Sync Identity</button>
        </div>
        <div className="mt-16 flex justify-center gap-4 opacity-10">
           <div className="w-1 h-1 rounded-full bg-slate-900" />
           <div className="w-8 h-1 rounded-full bg-slate-900" />
           <div className="w-1 h-1 rounded-full bg-slate-900" />
        </div>
      </div>
    </div>
  );
};
export default AeroMotors;
