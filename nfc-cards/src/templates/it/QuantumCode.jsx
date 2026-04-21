import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const QuantumCode = ({ userData }) => {
  const { displayName, email, role, phone, website, address, github, linkedin } = userData || {};
  return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-[#0a0a1f] border border-cyan-500/20 rounded-3xl p-8 shadow-[0_0_50px_rgba(6,182,212,0.1)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/5 relative z-10">
          <div className="w-16 h-16 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.2)] overflow-hidden">
            {userData?.logo ? (
              <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
            ) : (
              <FiIcons.FiCpu size={32} />
            )}
          </div>
          <div>
            <h1 className="text-white text-xl font-black tracking-tighter uppercase leading-none">{displayName || 'Quantum Dev'}</h1>
            <p className="text-cyan-400 text-[9px] font-black uppercase tracking-widest mt-2">{role || 'Full Stack Engineer'}</p>
          </div>
        </div>
        
        <div className="space-y-3 relative z-10">
           <StandardContactLink icon={FiIcons.FiGlobe} value={website} href={website} />
           <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />
           <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />
           <StandardContactLink icon={FiIcons.FiMapPin} value={address} />

           {/* Tech Socials */}
           <StandardContactLink icon={FiIcons.FiGithub} value={github} href={github} />
           <StandardContactLink icon={FiIcons.FiLinkedin} value={linkedin} href={linkedin} />
        </div>

        <div className="mt-8 relative z-10">
           <a href={website} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-cyan-500 text-[#050510] py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-xl">
             <FiIcons.FiGlobe size={18} /> Initialize Session
           </a>
        </div>

        <StandardMapPreview address={address} />

        <StandardSaveContactButton />

        <div className="mt-10 flex justify-between items-center opacity-30 relative z-10">
           <footer className="opacity-100">
              <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[7px] text-white font-black uppercase tracking-[0.3em] hover:opacity-100 transition-opacity">Powered by Cardyn</a>
           </footer>
           <div className="flex gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
             <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-75" />
             <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-150" />
           </div>
        </div>
      </div>
    </div>
  );
};
export default QuantumCode;
