import React from 'react';
import { FiCheckCircle, FiPhone, FiMail, FiGlobe, FiTool } from 'react-icons/fi';

const TaskGrid = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website } = userData || {};
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-Inter">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 text-slate-100 opacity-20"><FiTool size={120} /></div>
        <div className="mb-10 relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 shadow-xl group-hover:rotate-6 transition-transform">
              <FiCheckCircle size={32} />
           </div>
           <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{displayName || 'Task Grid'}</h1>
           <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mt-3">Professional Services</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
           <a href={`tel:${mobileNumber}`} className="bg-slate-50 p-5 rounded-2xl flex flex-col items-center gap-2 border border-slate-100 hover:border-slate-900 transition-all font-bold text-slate-700">
              <FiPhone size={18} className="text-slate-400" />
              <span className="text-[9px] uppercase tracking-widest text-slate-400">Call Now</span>
           </a>
           <a href={`mailto:${email}`} className="bg-slate-50 p-5 rounded-2xl flex flex-col items-center gap-2 border border-slate-100 hover:border-slate-900 transition-all font-bold text-slate-700">
              <FiMail size={18} className="text-slate-400" />
              <span className="text-[9px] uppercase tracking-widest text-slate-400">Email</span>
           </a>
        </div>
        
        <a href={website} className="block w-full py-5 text-center bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:brightness-125 transition-all shadow-xl shadow-slate-900/10">Browse Portfolio</a>
        
        <div className="mt-12 text-center opacity-20">
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[7px] font-black tracking-[0.5em] text-slate-900 uppercase italic hover:opacity-70 transition-opacity">Powered by Cardyn</a>
        </div>
      </div>
    </div>
  );
};
export default TaskGrid;
