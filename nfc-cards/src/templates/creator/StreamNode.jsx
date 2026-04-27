import React from 'react';
import { FiTv, FiPhone, FiMail, FiGlobe, FiYoutube, FiTwitter } from 'react-icons/fi';

const StreamNode = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website } = userData || {};
  return (
    <div className="min-h-screen bg-[#6441a5] flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-[#19171c] border border-white/10 rounded-[2.5rem] p-1 shadow-2xl overflow-hidden group">
        <div className="bg-[#6441a5] p-10 rounded-[2.3rem] text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
              <FiTv size={200} className="absolute -bottom-10 -right-10 rotate-12" />
           </div>
           <div className="w-20 h-20 rounded-3xl bg-white text-[#6441a5] flex items-center justify-center mx-auto mb-6 shadow-2xl relative z-10 transition-transform group-hover:scale-110">
              <FiTv size={32} />
           </div>
           <h1 className="text-3xl font-black text-white tracking-tighter uppercase leading-none relative z-10">{displayName || 'Stream Node'}</h1>
           
        </div>
        
        <div className="p-8 space-y-4">
           <div className="flex gap-3">
              <a href={website} className="flex-1 bg-white text-[#6441a5] py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-white/5">
                 <FiGlobe size={18} /> Live Now
              </a>
              <div className="w-16 h-14 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-white/40 hover:text-[#6441a5] hover:bg-white transition-all cursor-pointer">
                 <FiYoutube size={24} />
              </div>
           </div>
           
           <div className="space-y-3 pt-2">
              <a href={`tel:${mobileNumber}`} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-all font-bold text-sm text-white/80">
                 <span className="text-[9px] font-black uppercase tracking-widest opacity-40 italic">Direct</span>
                 <span>{mobileNumber || 'Connect'}</span>
              </a>
              <a href={`mailto:${email}`} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-all font-bold text-sm text-white/80 truncate px-6">
                 <span className="text-[9px] font-black uppercase tracking-widest opacity-40 italic">Sign</span>
                 <span>{email || 'Signal'}</span>
              </a>
           </div>
        </div>
        <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-center text-[7px] text-white/10 font-black tracking-[1em] pb-8 uppercase italic hover:opacity-70 transition-opacity">Powered by Cardyn</a>
      </div>
    </div>
  );
};
export default StreamNode;
