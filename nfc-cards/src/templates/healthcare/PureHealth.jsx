import React from 'react';
import { FiActivity, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const PureHealth = ({ userData }) => {
  const { displayName, email, role, mobileNumber, city } = userData || {};
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-Inter">
      <div className="w-full max-w-sm">
        <div className="relative mb-[-3rem] z-10 flex justify-center">
           <div className="w-24 h-24 rounded-full bg-emerald-500 border-[8px] border-white flex items-center justify-center text-white shadow-2xl">
              <FiActivity size={32} />
           </div>
        </div>
        <div className="bg-emerald-50 rounded-[4rem] p-12 pt-20 border border-emerald-100 shadow-xl text-center">
           <h1 className="text-2xl font-black text-slate-900 tracking-tight">{displayName || 'Pure Health'}</h1>
           
           
           <div className="space-y-3">
              <a href={`tel:${mobileNumber}`} className="flex items-center justify-center gap-3 bg-white py-4 rounded-3xl border border-emerald-100/50 hover:bg-emerald-50 transition-all font-bold text-sm text-slate-700">
                 <FiPhone size={16} className="text-emerald-500" /> {mobileNumber || 'Connect'}
              </a>
              <a href={`mailto:${email}`} className="flex items-center justify-center gap-3 bg-white py-4 rounded-3xl border border-emerald-100/50 hover:bg-emerald-50 transition-all font-bold text-sm text-slate-700 truncate px-6">
                 <FiMail size={16} className="text-emerald-500" /> {email || 'Email'}
              </a>
              <div className="flex items-center justify-center gap-3 py-4 text-slate-400">
                 <FiMapPin size={16} />
                 <span className="text-xs font-bold uppercase tracking-widest">{city || 'Health Center'}</span>
              </div>
           </div>
           
           <div className="mt-10 border-t border-emerald-100 pt-8 flex justify-center gap-2 opacity-30">
              <div className="w-2 h-2 rounded-full bg-emerald-600" />
              <div className="w-2 h-2 rounded-full bg-emerald-600" />
              <div className="w-2 h-2 rounded-full bg-emerald-600" />
           </div>
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block mt-4 text-[7px] font-black tracking-[0.6em] uppercase text-emerald-900/20 hover:opacity-70 transition-opacity">Powered by Cardyn</a>
        </div>
      </div>
    </div>
  );
};
export default PureHealth;
