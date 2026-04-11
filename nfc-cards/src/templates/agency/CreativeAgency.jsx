import React from 'react';
import { FiMonitor, FiCamera, FiEdit3, FiGlobe, FiWifi, FiShare2, FiZap } from 'react-icons/fi';

/**
 * CREATIVE AGENCY TEMPLATE
 * Bold, high-energy layout with vibrant rose/pink accents and asymmetrical design.
 */
const CreativeAgency = ({ userData }) => {
  const { displayName, email, role, phone = "+1 (800) DESIGN-IO" } = userData || {};

  return (
    <div className="min-h-screen bg-[#FFF0F3] text-[#FF0055] p-6 flex flex-col items-center pt-20 font-['Outfit']">
      <div className="w-full max-w-sm bg-white border-4 border-[#FF0055] rounded-[3rem] p-10 shadow-[20px_20px_0_rgba(255,0,85,0.1)] relative overflow-hidden group">
        
        {/* Floating Design Elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF0055]/5 rounded-full transform rotate-12 group-hover:rotate-45 transition-transform duration-1000"></div>

        <header className="mb-14 text-left relative z-10">
          <div className="w-16 h-16 rounded-full bg-[#FF0055] text-white mb-8 flex items-center justify-center p-2 shadow-xl transform group-hover:-rotate-12 transition-transform">
             <FiZap size={28} />
          </div>
          <h2 className="text-4xl font-black capitalize leading-[0.8] mb-4 text-[#FF0055]">{displayName || "BOLD AGENCY"}</h2>
          <div className="h-2 w-20 bg-[#FF0055] mb-4"></div>
          <p className="text-[10px] font-black text-[#FF0055]/50 capitalize tracking-[0.4em]">{role || "Creative Director"}</p>
        </header>

        {/* Agency Capability Matrix */}
        <div className="flex gap-4 mb-14 relative z-10 overflow-x-auto pb-4 hide-scrollbar">
           <div className="min-w-[120px] p-6 rounded-3xl bg-[#FF0055] text-white flex flex-col items-center gap-3">
              <FiMonitor size={20} />
              <span className="text-[8px] font-bold capitalize tracking-widest text-[#FF0055]/30 group-hover:text-white transition-colors">UI Design</span>
           </div>
           <div className="min-w-[120px] p-6 rounded-3xl bg-[#FF0055]/5 border-2 border-[#FF0055] flex flex-col items-center gap-3">
              <FiCamera size={20} />
              <span className="text-[8px] font-bold capitalize tracking-widest">Brand Hub</span>
           </div>
           <div className="min-w-[120px] p-6 rounded-3xl bg-[#FF0055]/5 border-2 border-[#FF0055] flex flex-col items-center gap-3">
              <FiEdit3 size={20} />
              <span className="text-[8px] font-bold capitalize tracking-widest">Strategy</span>
           </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-4 relative z-10">
           <a href={`tel:${phone}`} className="flex items-center gap-6 bg-[#FF0055] p-5 rounded-[2rem] text-white hover:brightness-125 transition-all group/link shadow-xl shadow-[#FF0055]/20">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover/link:bg-white group-hover/link:text-[#FF0055] transition-all">
                 <FiWifi size={18} />
              </div>
              <div>
                 <p className="text-[8px] font-bold opacity-50 capitalize tracking-widest mb-0.5">Cellular Hub</p>
                 <p className="font-black text-sm tracking-widest">{phone}</p>
              </div>
           </a>

           <a href={`mailto:${email}`} className="flex items-center gap-6 bg-white p-5 rounded-[2rem] border-2 border-[#FF0055] text-[#FF0055] hover:bg-[#FF0055] hover:text-white transition-all group/link">
              <div className="w-10 h-10 rounded-full bg-[#FF0055]/10 flex items-center justify-center group-hover/link:bg-white/20 transition-all">
                 <FiGlobe size={18} />
              </div>
              <div>
                 <p className="text-[8px] font-black opacity-50 capitalize tracking-widest mb-0.5">Cloud Relay</p>
                 <p className="font-black text-sm tracking-widest truncate max-w-[150px]">{email || "resolving..."}</p>
              </div>
           </a>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center opacity-30 select-none pointer-events-none">
           <div className="flex items-center justify-center gap-2 mb-6">
              <FiShare2 size={14} className="opacity-40 translate-y-0.5" />
              <p className="text-[8px] font-black capitalize tracking-[0.6em] text-[#FF0055]">Agency Core System © 2026</p>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default CreativeAgency;
