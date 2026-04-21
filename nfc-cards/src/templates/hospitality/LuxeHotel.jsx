import React from 'react';
import { FiHome, FiPhone, FiMail, FiGlobe, FiStar } from 'react-icons/fi';

const LuxeHotel = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website } = userData || {};
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-6 font-['Outfit']">
      <div className="w-full max-w-sm bg-black border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />
        <div className="flex gap-1 mb-10 opacity-30">
           <FiStar size={10} className="text-amber-500" />
           <FiStar size={10} className="text-amber-500" />
           <FiStar size={10} className="text-amber-500" />
           <FiStar size={10} className="text-amber-500" />
           <FiStar size={10} className="text-amber-500" />
        </div>
        <h1 className="text-3xl font-light text-white tracking-[0.3em] uppercase text-center mb-2">{displayName || 'Luxe Hotel'}</h1>
        <p className="text-amber-600 text-[9px] font-bold uppercase tracking-[0.5em] mb-12">{role || 'Concierge Services'}</p>
        
        <div className="w-full space-y-3">
           <a href={`tel:${mobileNumber}`} className="flex items-center justify-center gap-4 bg-white/5 py-5 rounded-2xl border border-white/5 hover:border-amber-600/30 transition-all text-white font-bold text-sm">
              <FiPhone size={18} className="text-amber-600" /> {mobileNumber || 'Concierge'}
           </a>
           <a href={`mailto:${email}`} className="flex items-center justify-center gap-4 bg-white/5 py-5 rounded-2xl border border-white/5 hover:border-amber-600/30 transition-all text-white font-bold text-sm truncate px-8">
              <FiMail size={18} className="text-amber-600" /> {email || 'Inquiries'}
           </a>
           <a href={website} className="bg-amber-600 text-black w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-amber-400 transition-all shadow-xl shadow-amber-600/20 mt-4">
              Book Stay
           </a>
        </div>
        <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block mt-12 text-[7px] text-white/20 font-bold uppercase tracking-[0.8em] hover:opacity-70 transition-opacity">Powered by Cardyn</a>
      </div>
    </div>
  );
};
export default LuxeHotel;
