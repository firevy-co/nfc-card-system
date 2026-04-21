import React from 'react';
import { FiHexagon, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const PinnacleAuto = ({ userData }) => {
  const { displayName, email, role, mobileNumber, companyName } = userData || {};
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-neutral-900 border border-white/5 rounded-[4rem] p-1 shadow-2xl overflow-hidden group">
        <div className="bg-neutral-800 p-12 rounded-[3.8rem] text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <FiHexagon size={180} />
           </div>
           <div className="w-20 h-20 rounded-2xl bg-white text-black flex items-center justify-center mx-auto mb-8 shadow-2xl relative z-10 transition-transform group-hover:-rotate-6">
              <FiHexagon size={40} />
           </div>
           <h1 className="text-2xl font-black text-white tracking-widest uppercase relative z-10">{displayName || 'Pinnacle Auto'}</h1>
           <p className="text-neutral-500 text-[9px] font-black uppercase tracking-[0.6em] mt-3 relative z-10">{role || 'Master Technician'}</p>
        </div>
        
        <div className="p-10 space-y-4">
           <a href={`tel:${mobileNumber}`} className="flex items-center justify-center gap-4 bg-white/5 p-5 rounded-3xl hover:bg-white text-black transition-all group/link">
              <FiPhone size={18} className="text-white group-hover/link:text-black" />
              <span className="text-sm font-bold text-white group-hover/link:text-black">{mobileNumber || 'Connect'}</span>
           </a>
           <a href={`mailto:${email}`} className="flex items-center justify-center gap-4 bg-white/5 p-5 rounded-3xl hover:bg-white text-black transition-all group/link">
              <FiMail size={18} className="text-white group-hover/link:text-black" />
              <span className="text-sm font-bold text-white group-hover/link:text-black truncate px-4">{email || 'Email'}</span>
           </a>
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-center text-[7px] text-white/20 font-black tracking-[0.8em] pt-8 uppercase hover:opacity-70 transition-opacity">Powered by Cardyn</a>
        </div>
      </div>
    </div>
  );
};
export default PinnacleAuto;
