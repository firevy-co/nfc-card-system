import React from 'react';
import { FiSquare, FiPhone, FiMail, FiGlobe } from 'react-icons/fi';

const PixelProperty = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website } = userData || {};
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 font-Inter">
      <div className="w-full max-w-sm bg-zinc-900 border border-emerald-500/20 rounded-[3rem] p-1 shadow-2xl overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="p-10">
           <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-10 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <FiSquare size={28} />
           </div>
           <h1 className="text-3xl font-black text-white tracking-widest uppercase italic">{displayName || 'Pixel Prop'}</h1>
           
           
           <div className="mt-12 space-y-6">
              <a href={`tel:${mobileNumber}`} className="flex flex-col group/link">
                 <span className="text-[8px] font-black text-white/30 tracking-[0.6em] uppercase mb-2 group-hover/link:text-emerald-500 transition-colors">Satellite Hub</span>
                 <span className="text-white text-lg font-bold tracking-tight">{mobileNumber || 'Connect Node'}</span>
              </a>
              <a href={`mailto:${email}`} className="flex flex-col group/link">
                 <span className="text-[8px] font-black text-white/30 tracking-[0.6em] uppercase mb-2 group-hover/link:text-emerald-500 transition-colors">Neural Address</span>
                 <span className="text-white text-lg font-bold tracking-tight truncate">{email || 'Email'}</span>
              </a>
              <a href={website} className="mt-8 flex items-center justify-center gap-3 bg-emerald-500 text-black py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.5em] hover:brightness-110 active:scale-[0.98] transition-all">Launch Registry</a>
           </div>
        </div>
        <div className="bg-black/40 p-6 text-center">
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[7px] text-white/10 font-black tracking-[0.8em] uppercase italic hover:opacity-70 transition-opacity">Powered by Cardyn</a>
        </div>
      </div>
    </div>
  );
};
export default PixelProperty;
