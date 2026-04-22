import React from 'react';
import { FiMonitor, FiCamera, FiEdit3, FiGlobe, FiWifi, FiZap, FiMail, FiPhone, FiMapPin, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const CreativeAgency = ({ userData }) => {
  const { displayName, email, role, phone, website, address } = userData || {};

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 flex flex-col items-center justify-center font-['Mulish']">
      <div className="w-full max-w-sm bg-[#1e293b]/20 border border-white/5 rounded-[2.5rem] p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
        
        {/* Floating Design Elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400/10 rounded-full transform rotate-12 group-hover:rotate-45 transition-transform duration-1000 blur-3xl"></div>

        <header className="mb-10 text-center flex flex-col items-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-cyan-400 text-black mb-8 flex items-center justify-center p-2 shadow-xl shadow-cyan-400/20 transform group-hover:scale-110 transition-transform">
             <FiZap size={28} />
          </div>
          <h2 className="text-3xl font-black capitalize leading-tight mb-2 text-white">{displayName || "Studio Identity"}</h2>
          <p className="text-[10px] font-black text-cyan-400 capitalize tracking-[0.4em] opacity-80 mt-2">{role || "Creative Partner"}</p>
        </header>

        {/* Agency Capability Matrix */}
        <div className="grid grid-cols-3 gap-3 mb-10 relative z-10 w-full font-black">
           <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-3">
              <FiMonitor size={18} className="text-cyan-400" />
              <span className="text-[7px] uppercase tracking-widest text-gray-500">UI Design</span>
           </div>
           <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-3">
              <FiCamera size={18} className="text-cyan-400" />
              <span className="text-[7px] uppercase tracking-widest text-gray-500">Branding</span>
           </div>
           <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-3">
              <FiEdit3 size={18} className="text-cyan-400" />
              <span className="text-[7px] uppercase tracking-widest text-gray-500">Strategy</span>
           </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-3 relative z-10">
           <StandardContactLink icon={FiGlobe} value={website} href={website} />
           <StandardContactLink icon={FiMail} value={email} href={`mailto:${email}`} />
           <StandardContactLink icon={FiPhone} value={phone} href={`tel:${phone}`} />
           <StandardContactLink icon={FiMapPin} value={address} />

           {/* Dynamic Social Uplinks */}
           <StandardContactLink icon={FiLinkedin} value={userData?.linkedin} href={userData?.linkedin} />
           <StandardContactLink icon={FiInstagram} value={userData?.instagram} href={userData?.instagram} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-10">
            <button className="w-full bg-white text-black py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-white/90 transition-all">
                View Showcase
            </button>
        </div>

        {/* Map Preview */}
        <StandardMapPreview address={address} />

        <StandardSaveContactButton userData={userData} />

        {/* Footer */}
        <footer className="mt-12 text-center opacity-20">
            <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] font-black capitalize tracking-[0.5em] hover:opacity-100 transition-opacity">Powered by Cardyn</a>
        </footer>
      </div>
    </div>
  );
};

export default CreativeAgency;
