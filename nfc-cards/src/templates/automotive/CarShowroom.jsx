import React from 'react';
import { FiHexagon, FiActivity, FiMapPin, FiMail, FiPhone, FiWifi, FiFastForward, FiBox } from 'react-icons/fi';

/**
 * CAR SHOWROOM TEMPLATE
 * Sleek, high-performance automotive design with carbon-dark aesthetic and speed-red accents.
 */
const CarShowroom = ({ userData }) => {
  const { displayName, email, role, phone = "+1 (888) VMAX-DRV" } = userData || {};

  return (
    <div className="min-h-screen bg-[#050505] text-[#FF0000] p-6 flex flex-col items-center pt-20 font-['Outfit']">
      <div className="w-full max-w-sm bg-gradient-to-br from-[#111] to-[#000] border border-white/5 rounded-[3rem] p-10 shadow-[0_40px_100px_rgba(255,0,0,0.1)] relative overflow-hidden group">
        
        {/* Speedline Decoration */}
        <div className="absolute top-0 right-0 w-40 h-1 bg-[#FF0000] shadow-[0_0_20px_rgba(255,0,0,0.8)] opacity-20"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[#FF0000]/5 rounded-full transform scale-150 rotate-45 transition-transform duration-1000 group-hover:scale-175 group-hover:rotate-0"></div>

        <header className="mb-14 text-center">
          <div className="w-24 h-24 rounded-3xl bg-[#FF0000] text-black mx-auto mb-10 flex items-center justify-center p-2 shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-rotate-3">
             <FiHexagon size={40} />
          </div>
          <h2 className="text-4xl font-black italic tracking-tighter mb-2 text-white capitalize">{displayName || "AUTO VELOCITY"}</h2>
          <div className="flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-white/5 text-[#FF0000] text-[10px] font-black capitalize tracking-[0.3em] mb-4 border border-white/10 group-hover:bg-red-600 group-hover:text-white transition-all">
             <FiActivity size={12} className="animate-pulse" />
             {role || "Sales Manager"}
          </div>
        </header>

        {/* Vehicle Categories */}
        <div className="flex gap-4 mb-14 overflow-x-auto pb-4 hide-scrollbar">
           <div className="min-w-[120px] p-6 rounded-[2rem] bg-white/5 border border-white/5 flex flex-col items-center gap-4 group/item hover:border-red-600 transition-all">
              <FiFastForward size={24} className="opacity-40 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all" />
              <p className="text-[10px] font-black capitalize tracking-widest text-[#FF0000]/50 group-hover/item:text-white transition-all">Supercars</p>
           </div>
           <div className="min-w-[120px] p-6 rounded-[2rem] bg-white/5 border border-white/5 flex flex-col items-center gap-4 group/item hover:border-red-600 transition-all">
              <FiBox size={24} className="opacity-40 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all" />
              <p className="text-[10px] font-black capitalize tracking-widest text-[#FF0000]/50 group-hover/item:text-white transition-all">Vintage</p>
           </div>
        </div>

        {/* Direct Connections */}
        <div className="space-y-4">
           <a href={`tel:${phone}`} className="flex items-center gap-6 bg-white/5 p-5 rounded-3xl border border-white/5 hover:border-[#FF0000] transition-all font-sans group/link">
              <div className="w-12 h-12 rounded-2xl bg-[#FF0000]/10 flex items-center justify-center group-hover/link:bg-[#FF0000] group-hover/link:text-white transition-all duration-300">
                 <FiPhone size={20} />
              </div>
              <div>
                 <p className="text-[8px] font-black text-white/40 capitalize tracking-widest mb-0.5">Showroom Node</p>
                 <p className="font-black text-sm tracking-widest text-white italic">{phone}</p>
              </div>
           </a>

           <a href={`mailto:${email}`} className="flex items-center gap-6 bg-white/5 p-5 rounded-3xl border border-white/5 hover:border-[#FF0000] transition-all font-sans group/link">
              <div className="w-12 h-12 rounded-2xl bg-[#FF0000]/10 flex items-center justify-center group-hover/link:bg-[#FF0000] group-hover/link:text-white transition-all duration-300">
                 <FiMail size={20} />
              </div>
              <div>
                 <p className="text-[8px] font-black text-white/40 capitalize tracking-widest mb-0.5">Client Portal</p>
                 <p className="font-black text-sm tracking-widest truncate max-w-[150px] text-white italic">{email || "resolving..."}</p>
              </div>
           </a>
        </div>

        {/* Velocity Branding */}
        <footer className="mt-16 text-center opacity-30 select-none pointer-events-none">
           <p className="text-[8px] font-black capitalize tracking-[0.6em] text-white italic underline underline-offset-8 decoration-[#FF0000]">V-Core Automotive Protocol © 2026</p>
        </footer>
      </div>
    </div>
  );
};

export default CarShowroom;
