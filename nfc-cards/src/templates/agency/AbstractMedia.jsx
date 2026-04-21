import React from 'react';
import { FiLayout, FiPhone, FiMail, FiGlobe } from 'react-icons/fi';

const AbstractMedia = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website } = userData || {};
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm">
        <div className="flex gap-1.5 mb-2 px-6">
           <div className="w-3 h-3 rounded-full bg-rose-500" />
           <div className="w-3 h-3 rounded-full bg-blue-500" />
           <div className="w-3 h-3 rounded-full bg-emerald-500" />
        </div>
        <div className="bg-black rounded-[3rem] p-10 shadow-2xl overflow-hidden relative group">
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700" />
          <div className="relative z-10">
            <h1 className="text-3xl font-black text-white tracking-tighter capitalize leading-none">{displayName || 'Abstract Media'}</h1>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mt-4 mb-12">{role || 'Media Producer'}</p>
            
            <div className="space-y-4">
              <a href={`tel:${mobileNumber}`} className="flex items-center justify-between group/link">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover/link:text-white transition-colors">Satellite</span>
                <span className="text-sm font-bold text-white">{mobileNumber || '000.000'}</span>
              </a>
              <div className="h-px bg-white/10 w-full" />
              <a href={`mailto:${email}`} className="flex items-center justify-between group/link">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover/link:text-white transition-colors">Signal</span>
                <span className="text-sm font-bold text-white truncate ml-4">{email || 'sync@abstract.io'}</span>
              </a>
              <div className="h-px bg-white/10 w-full" />
              <a href={website} className="flex items-center justify-between group/link">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover/link:text-white transition-colors">Broadcast</span>
                <span className="text-sm font-bold text-white">abstract.st</span>
              </a>
            </div>
            
            <button className="w-full mt-12 py-5 bg-white text-black rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:scale-[1.02] active:scale-95 transition-all">Connect Hub</button>
          </div>
        </div>
        <div className="mt-8 px-6 flex justify-between items-center text-[8px] font-black text-black/20 uppercase tracking-[0.3em]">
           <span>Protocol 714</span>
           <span>Cardyn Media Framework</span>
        </div>

          <div className="mt-8 mb-2 text-center">
            <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-[0.2em] text-gray-300 hover:text-gray-500 transition-colors uppercase font-mulish">Powered by Cardyn</a>
          </div>
      </div>
    </div>
  );
};
export default AbstractMedia;
