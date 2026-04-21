import React from 'react';
import { FiAward, FiPhone, FiMail, FiGlobe } from 'react-icons/fi';

const ExpertNode = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website } = userData || {};
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-['Outfit']">
      <div className="w-full max-w-sm bg-neutral-900 border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500" />
        <div className="flex flex-col items-center mb-12">
           <div className="w-20 h-20 rounded-[2.5rem] bg-amber-500 text-black flex items-center justify-center mb-8 shadow-2xl shadow-amber-500/20 group-hover:scale-110 transition-transform">
              <FiAward size={36} />
           </div>
           <h1 className="text-2xl font-black text-white tracking-widest uppercase text-center italic">{displayName || 'Expert Node'}</h1>
           <p className="text-amber-500 text-[9px] font-black uppercase tracking-[0.5em] mt-3">Verified Service Partner</p>
        </div>
        
        <div className="space-y-4">
           <a href={`tel:${mobileNumber}`} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all group/link font-bold text-sm text-white/80">
              <span className="text-[9px] uppercase tracking-widest opacity-40 italic font-black">Link Node</span>
              <span>{mobileNumber || 'Connect'}</span>
           </a>
           <a href={`mailto:${email}`} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all group/link font-bold text-sm text-white/80 truncate px-8">
              <span className="text-[9px] uppercase tracking-widest opacity-40 italic font-black">Signal Node</span>
              <span>{email || 'Signal'}</span>
           </a>
           <a href={website} className="block w-full py-5 text-center bg-white text-black rounded-3xl font-black text-[12px] uppercase tracking-[0.3em] hover:bg-amber-500 transition-all shadow-xl shadow-white/5 mt-4">Initialize Session</a>
        </div>
        <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block mt-16 text-center text-[7px] text-white/10 font-black tracking-[0.8em] uppercase hover:opacity-70 transition-opacity">Powered by Cardyn</a>
      </div>
    </div>
  );
};
export default ExpertNode;
