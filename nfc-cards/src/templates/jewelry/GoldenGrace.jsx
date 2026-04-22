import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const GoldenGrace = ({ userData }) => {
  const { displayName, email, role, phone, website, address, linkedin, instagram } = userData || {};
  return (
    <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-white border border-[#ead8c2] rounded-[4rem] p-10 shadow-[0_30px_60px_-15px_rgba(234,216,194,0.5)] flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-[#fcf5eb] border-2 border-[#d4af37] flex items-center justify-center text-[#d4af37] text-4xl mb-8 overflow-hidden">
          {userData?.logo ? (
            <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
          ) : (
            displayName?.charAt(0) || 'G'
          )}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight text-center leading-none">{displayName || 'Golden Grace'}</h1>
        <p className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.3em] mt-3 mb-10">{role || 'Luxury Consultant'}</p>
        
        <div className="w-full space-y-3">
          <StandardContactLink icon={FiIcons.FiGlobe} value={website} href={website} />
          <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />
          <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />
          <StandardContactLink icon={FiIcons.FiMapPin} value={address} />

          {/* Luxury Socials */}
          <StandardContactLink icon={FiIcons.FiLinkedin} value={linkedin} href={linkedin} />
          <StandardContactLink icon={FiIcons.FiInstagram} value={instagram} href={instagram} />
        </div>

        <div className="w-full mt-6">
           {website && <a href={website} target="_blank" rel="noopener noreferrer" className="w-full py-4 text-center rounded-2xl bg-gray-900 text-white font-black text-[12px] uppercase tracking-widest block hover:bg-black transition-all">Visit Showroom</a>}
        </div>
        
        <StandardMapPreview address={address} />

        <StandardSaveContactButton userData={userData} />
        
        <div className="mt-12 flex items-center gap-1 opacity-20">
          <div className="w-8 h-px bg-black" />
          <span className="text-[7px] font-black uppercase tracking-[0.5em]">Cardyn Luxe</span>
          <div className="w-8 h-px bg-black" />
        </div>

        <footer className="mt-8 text-center opacity-30">
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[8px] font-black tracking-[0.4em] text-gray-400 hover:text-gray-800 transition-colors uppercase">Powered by Cardyn</a>
        </footer>
      </div>
    </div>
  );
};
export default GoldenGrace;
