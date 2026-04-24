import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

/**
 * QUANTUM CODE IDENTITY ARCHITECTURE
 * A high-fidelity, cyber-neon design featuring structural grid overlays and active status beacons.
 * Optimized for system architects, full-stack developers, and cybersecurity experts.
 */
const QuantumCode = ({ userData }) => {
  const { displayName, email, role, phone, website, address, github, linkedin, bio } = userData || {};
  
  return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center p-6 font-['Mulish'] relative overflow-hidden">
      {/* CYBER AMBIENT LAYERS */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0ff 1px, transparent 1px), linear-gradient(90deg, #0ff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-[150px] animate-pulse"></div>
      
      <div className="w-full max-w-sm bg-[#0a0a1f]/80 border border-cyan-500/20 rounded-[2.5rem] p-1 shadow-[0_0_80px_rgba(6,182,212,0.15)] backdrop-blur-2xl relative z-10 overflow-hidden group">
        
        {/* NEON HEADER BLOCK */}
        <div className="bg-gradient-to-br from-[#0a0a1f] to-[#161633] p-10 rounded-[2.3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
          
          {/* SYSTEM BRAND NODE */}
          <div className="w-24 h-24 rounded-2xl bg-cyan-500/5 flex items-center justify-center text-cyan-400 border-2 border-cyan-400/20 shadow-[0_0_30px_rgba(34,211,238,0.2)] mx-auto mb-8 relative z-10 group-hover:rotate-[360deg] transition-transform duration-1000 overflow-hidden">
            {userData?.logo ? (
              <img src={userData.logo} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <FiIcons.FiCpu size={40} className="animate-pulse" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent"></div>
          </div>
          
          <h1 className="text-white text-2xl font-black tracking-tighter uppercase leading-none relative z-10">
            {displayName || 'Quantum Architect'}
          </h1>
          
          {/* STATUS PROTOCOL */}
          <div className="mt-6 flex items-center justify-center gap-2 relative z-10">
             <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
             <span className="text-[8px] font-black uppercase tracking-[0.4em] text-cyan-400/60">Node Active</span>
          </div>
        </div>
        
        {/* INTERACTION SUITE */}
        <div className="p-8 space-y-4 relative z-10">
           
           {/* CORE UPLINKS */}
           <div className="space-y-3">
              {website && <StandardContactLink icon={FiIcons.FiGlobe} value="Initialize Portal" href={website} />}
              {email && <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />}
              {phone && <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />}
              {address && <StandardContactLink icon={FiIcons.FiMapPin} value="Deployment Sector" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} />}
           </div>

           {/* TECH SOCIAL MATRIX */}
           {(github || linkedin) && (
             <div className="pt-6 grid grid-cols-2 gap-3">
                {github && (
                  <a href={github.startsWith('http') ? github : `https://github.com/${github}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-white/5 border border-white/5 p-4 rounded-2xl text-white hover:bg-white/10 transition-all group">
                     <FiIcons.FiGithub size={18} className="group-hover:rotate-12 transition-transform" />
                     <span className="text-[9px] font-black uppercase tracking-widest">Source</span>
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin.startsWith('http') ? linkedin : `https://linkedin.com/in/${linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-white/5 border border-white/5 p-4 rounded-2xl text-white hover:bg-white/10 transition-all group">
                     <FiIcons.FiLinkedin size={18} className="group-hover:rotate-12 transition-transform" />
                     <span className="text-[9px] font-black uppercase tracking-widest">Network</span>
                  </a>
                )}
             </div>
           )}

           {/* PRIMARY COMMAND (PORTAL) */}
           {website && (
              <div className="pt-6">
                 <a 
                   href={website} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="w-full flex items-center justify-center gap-3 bg-cyan-500 text-[#050510] py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:brightness-110 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all shadow-xl active:scale-95"
                 >
                   <FiIcons.FiTerminal size={18} /> Execute Session
                 </a>
              </div>
           )}

           {/* MAP PROTOCOL */}
           {address && <StandardMapPreview address={address} />}

           {/* SAVE CONTACT PROTOCOL */}
           <div className="pt-4">
              <StandardSaveContactButton userData={userData} />
           </div>

           {/* SYSTEM FOOTER */}
           <div className="pt-8 flex justify-between items-center opacity-30">
              <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[7px] text-white font-black uppercase tracking-[0.4em] hover:opacity-100 transition-opacity">
                Powered by Cardyn Identity Network
              </a>
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-75"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-150"></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumCode;
