import React from 'react';
import { FiWind, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const PureAura = ({ userData }) => {
  const { displayName, email, role, mobileNumber, city } = userData || {};
  return (
    <div className="min-h-screen bg-[#fcfcf7] flex items-center justify-center p-6 font-['Outfit']">
      <div className="w-full max-w-sm bg-white border border-[#f0f0e5] rounded-[5rem] p-12 shadow-[0_40px_80px_-20px_rgba(200,200,180,0.3)] flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-[#f4f4f0] flex items-center justify-center text-slate-400 mb-10 overflow-hidden relative">
           <div className="absolute inset-x-0 bottom-0 h-1/2 bg-rose-50" />
           <FiWind size={32} className="relative z-10" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight text-center">{displayName || 'Pure Aura'}</h1>
        <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.5em] mt-3 mb-10">{role || 'Holistic Stylist'}</p>
        
        <div className="w-full space-y-3">
           <a href={`tel:${mobileNumber}`} className="w-full flex items-center justify-center py-5 rounded-[2.5rem] bg-slate-50 text-slate-700 font-bold text-sm border border-slate-100 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
              {mobileNumber || 'Connect'}
           </a>
           <a href={`mailto:${email}`} className="w-full flex items-center justify-center py-5 rounded-[2.5rem] bg-slate-900 text-white font-bold text-sm hover:brightness-125 transition-all truncate px-8 shadow-xl shadow-slate-900/10">
              {email || 'Message'}
           </a>
        </div>
        <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block mt-16 text-[7px] font-black tracking-[0.8em] text-slate-200 uppercase hover:opacity-70 transition-opacity">Powered by Cardyn</a>
      </div>
    </div>
  );
};
export default PureAura;
