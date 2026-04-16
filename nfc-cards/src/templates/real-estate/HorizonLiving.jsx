import React from 'react';
import { FiCompass, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const HorizonLiving = ({ userData }) => {
  const { displayName, email, role, mobileNumber, city } = userData || {};
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 font-['Outfit']">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-[5rem] p-12 shadow-2xl overflow-hidden text-center">
        <div className="w-20 h-20 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800 mx-auto mb-10 shadow-sm transition-transform hover:scale-110">
           <FiCompass size={32} />
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">{displayName || 'Horizon Living'}</h1>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em] mt-3 mb-10">{role || 'Property Guide'}</p>
        
        <div className="space-y-3">
           <a href={`tel:${mobileNumber}`} className="w-full flex items-center justify-center py-5 rounded-[2.5rem] bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.4em] hover:brightness-125 transition-all shadow-xl shadow-slate-900/10">
              {mobileNumber || 'Connect'}
           </a>
           <a href={`mailto:${email}`} className="w-full flex items-center justify-center py-5 rounded-[2.5rem] border border-slate-200 text-slate-900 font-black text-[10px] uppercase tracking-[0.4em] bg-transparent hover:bg-slate-50 transition-all truncate px-8">
              {email || 'Email'}
           </a>
        </div>
        
        <div className="mt-12 flex justify-center gap-2 opacity-10">
           <div className="w-2 h-2 rounded-full bg-slate-900" />
           <div className="w-2 h-2 rounded-full bg-slate-900" />
           <div className="w-2 h-2 rounded-full bg-slate-900" />
        </div>
        <p className="mt-4 text-[7px] font-black tracking-[1em] text-slate-900/20 uppercase underline">{city || 'GLOBAL NETWORK'}</p>
      </div>
    </div>
  );
};
export default HorizonLiving;
