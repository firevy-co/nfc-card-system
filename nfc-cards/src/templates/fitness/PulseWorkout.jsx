import React from 'react';
import { FiActivity, FiPhone, FiMail, FiMapPin, FiCalendar } from 'react-icons/fi';

const PulseWorkout = ({ userData }) => {
  const { displayName, email, role, mobileNumber, companyName } = userData || {};
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-zinc-900 border border-white/5 rounded-[2.5rem] p-1 shadow-2xl overflow-hidden group">
        <div className="bg-[#ccff00] p-10 rounded-[2.3rem] text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-5 group-hover:opacity-10 transition-opacity">
              <FiActivity size={200} className="absolute -top-10 -left-10" />
           </div>
           <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center text-[#ccff00] mx-auto mb-6 relative z-10 shadow-2xl">
              <FiActivity size={32} />
           </div>
           <h1 className="text-3xl font-black text-black tracking-tighter uppercase leading-none relative z-10">{displayName || 'Pulse Pro'}</h1>
           
        </div>
        
        <div className="p-8 space-y-4">
           <div className="grid grid-cols-2 gap-3 pb-2">
              <a href={`tel:${mobileNumber}`} className="bg-white/5 p-5 rounded-2xl flex flex-col items-center gap-2 border border-white/5 hover:border-[#ccff00] transition-all group/icon">
                 <FiPhone size={20} className="text-[#ccff00]" />
                 <span className="text-[8px] font-black uppercase tracking-widest text-white/40 group-hover/icon:text-[#ccff00]">Call Now</span>
              </a>
              <a href={`mailto:${email}`} className="bg-white/5 p-5 rounded-2xl flex flex-col items-center gap-2 border border-white/5 hover:border-[#ccff00] transition-all group/icon">
                 <FiMail size={20} className="text-[#ccff00]" />
                 <span className="text-[8px] font-black uppercase tracking-widest text-white/40 group-hover/icon:text-[#ccff00]">Email</span>
              </a>
           </div>
           
           <button className="w-full py-5 bg-white text-black rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-[#ccff00] transition-all shadow-xl shadow-white/5">
              <FiCalendar size={18} /> Book Session
           </button>
           
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-center text-[7px] text-white/10 font-bold tracking-[0.8em] pt-8 uppercase italic hover:opacity-70 transition-opacity">Powered by Cardyn</a>
        </div>
      </div>
    </div>
  );
};
export default PulseWorkout;
