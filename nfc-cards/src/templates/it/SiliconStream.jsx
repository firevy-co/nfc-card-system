import React from 'react';
import { FiTriangle, FiPhone, FiMail, FiGlobe, FiCommand } from 'react-icons/fi';

const SiliconStream = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website } = userData || {};
  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-6 font-['Inter'] md:bg-neutral-950 md:items-center py-0 md:py-12">
      <div className="w-full max-w-sm bg-white rounded-[2rem] p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border border-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/20 mb-6 group hover:rotate-6 transition-transform overflow-hidden">
            {userData?.logo ? (
              <img src={userData.logo} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <FiCommand size={28} />
            )}
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">{displayName || 'Silicon Architect'}</h1>
        </div>
        
        <div className="space-y-3">
           <a href={`tel:${mobileNumber}`} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors shadow-sm"><FiPhone size={18} /></div>
              <span className="text-sm font-semibold text-slate-700">{mobileNumber || '+0 1010 1011'}</span>
           </a>
           <a href={`mailto:${email}`} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors shadow-sm"><FiMail size={18} /></div>
              <span className="text-sm font-semibold text-slate-700 truncate">{email || 'build@silicon.io'}</span>
           </a>
           <a href={website} className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shadow-sm"><FiGlobe size={18} /></div>
              <span className="text-sm font-semibold text-white">Project Dashboard</span>
           </a>
        </div>
        
        <div className="mt-12 text-center">
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] font-black uppercase tracking-[0.4em] text-slate-300 hover:opacity-70 transition-opacity">Powered by Cardyn</a>
        </div>
      </div>
    </div>
  );
};
export default SiliconStream;
