import React from 'react';
import { FiLayout, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const LegaTemplate = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website, city } = userData || {};
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-['Inter'] md:bg-neutral-950 md:items-center py-0 md:py-12">
      <div className="w-full max-w-sm bg-white rounded-[4rem] p-12 shadow-2xl overflow-hidden text-center border border-slate-100 flex flex-col items-center">
        <div className="w-20 h-2 bg-slate-900 rounded-full mb-12 opacity-5" />
        <div className="w-24 h-24 rounded-[3rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800 mb-8 shadow-sm group-hover:rotate-6 transition-transform">
           <FiLayout size={32} />
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">{displayName || 'Lega Template'}</h1>
        
        
        <div className="w-full space-y-3">
           <a href={`tel:${mobileNumber}`} className="w-full py-5 rounded-[2.5rem] bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.4em] hover:brightness-125 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3">
              <FiPhone size={16} /> Connect
           </a>
           <a href={`mailto:${email}`} className="w-full py-5 rounded-[2.5rem] border border-slate-200 text-slate-900 font-black text-[10px] uppercase tracking-[0.4em] bg-transparent hover:bg-slate-50 transition-all truncate px-8 flex items-center justify-center gap-3">
              <FiMail size={16} /> Email
           </a>
        </div>
        
        <div className="mt-12 opacity-20 flex justify-center gap-4">
           <div className="w-1 h-1 rounded-full bg-slate-900" />
           <p className="text-[7px] font-black tracking-[1em] text-slate-900 uppercase">{city || 'DISTRICT HUB'}</p>
           <div className="w-1 h-1 rounded-full bg-slate-900" />
        </div>

          <div className="mt-8 mb-2 text-center">
            <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-[0.2em] text-gray-300 hover:text-gray-500 transition-colors uppercase font-mulish">Powered by Cardyn</a>
          </div>
      </div>
    </div>
  );
};
export default LegaTemplate;
