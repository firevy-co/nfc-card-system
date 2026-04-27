import React from 'react';
import { FiGrid, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const SteelFrame = ({ userData }) => {
  const { displayName, email, role, mobileNumber, city } = userData || {};
  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-6 font-['Space Grotesk']">
      <div className="w-full max-w-sm bg-slate-100 border-x-8 border-slate-900 rounded-3xl p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 left-0 w-full h-24 bg-slate-900 flex items-center justify-center">
           <FiGrid size={48} className="text-white/20" />
        </div>
        <div className="mt-16 w-full text-center">
           <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">{displayName || 'Steel Frame'}</h1>
           
        </div>
        
        <div className="w-full space-y-4">
           <a href={`tel:${mobileNumber}`} className="flex items-center justify-between bg-slate-900 text-white py-5 px-8 rounded-2xl font-black text-[12px] uppercase tracking-widest hover:brightness-125 transition-all">
              <span className="opacity-40">Link</span>
              <span>{mobileNumber || 'Connect'}</span>
           </a>
           <a href={`mailto:${email}`} className="flex items-center justify-between border-2 border-slate-900 py-5 px-8 rounded-2xl font-black text-[12px] uppercase tracking-widest text-slate-900 hover:bg-slate-900 hover:text-white transition-all">
              <span className="opacity-40 whitespace-nowrap">Neural</span>
              <span className="truncate ml-4">{email || 'Direct'}</span>
           </a>
           <div className="flex items-center gap-3 justify-center text-slate-400 pt-8 opacity-40">
              <FiMapPin size={16} />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em]">{city || 'Field HQ'}</span>
           </div>
        </div>
        <div className="mt-12 flex items-center gap-2 opacity-10">
           <div className="w-16 h-[2px] bg-slate-900" />
           <p className="text-[7px] font-black tracking-[0.6em] text-slate-900 uppercase">Steel Framework</p>
           <div className="w-16 h-[2px] bg-slate-900" />
        </div>

          <div className="mt-8 mb-2 text-center">
            <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-[0.2em] text-gray-300 hover:text-gray-500 transition-colors uppercase font-mulish">Powered by Cardyn</a>
          </div>
      </div>
    </div>
  );
};
export default SteelFrame;
