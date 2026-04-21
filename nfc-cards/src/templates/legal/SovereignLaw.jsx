import React from 'react';
import { FiHexagon, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const SovereignLaw = ({ userData }) => {
  const { displayName, email, role, mobileNumber, companyName } = userData || {};
  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center p-6 font-['Outfit']">
      <div className="w-full max-w-sm bg-black border border-white/5 rounded-[3rem] p-10 shadow-2xl relative group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-white/10 transition-all duration-1000" />
        <div className="mb-12">
           <div className="w-12 h-1 bg-white mb-8" />
           <h1 className="text-3xl font-black text-white tracking-widest uppercase italic">{displayName || 'Sovereign'}</h1>
           <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em] mt-3">{role || 'Defense Attorney'}</p>
        </div>
        
        <div className="space-y-4">
           <a href={`tel:${mobileNumber}`} className="group flex items-center justify-between border-l border-white/10 pl-6 py-2 hover:border-white transition-all">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-white transition-colors">Emergency Dispatch</span>
              <FiPhone size={20} className="text-white/20 group-hover:text-white transition-all" />
           </a>
           <a href={`mailto:${email}`} className="group flex items-center justify-between border-l border-white/10 pl-6 py-2 hover:border-white transition-all">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-white transition-colors">Direct Protocol</span>
              <FiMail size={20} className="text-white/20 group-hover:text-white transition-all" />
           </a>
           <button className="w-full mt-8 py-5 bg-white text-black rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-gray-100 active:scale-[0.98] transition-all">Connect Defense</button>
        </div>
        
        <div className="mt-16 flex justify-between items-center opacity-10">
           <p className="text-[7px] font-black tracking-[0.6em] text-white italic">Sovereign Framework v1.0</p>
           <FiHexagon size={16} />
        </div>

          <div className="mt-8 mb-2 text-center">
            <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-[0.2em] text-gray-300 hover:text-gray-500 transition-colors uppercase font-mulish">Powered by Cardyn</a>
          </div>
      </div>
    </div>
  );
};
export default SovereignLaw;
