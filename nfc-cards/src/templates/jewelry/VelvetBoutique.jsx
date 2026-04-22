import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const VelvetBoutique = ({ userData }) => {
  const { displayName, email, role, phone, website, address, instagram, linkedin } = userData || {};
  return (
    <div className="min-h-screen bg-[#1c1817] flex items-start justify-center py-16 px-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-[#251f1e] border border-[#3b3231] rounded-[2rem] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-1 bg-[#d4af37] rounded-full opacity-50 group-hover:w-24 transition-all duration-700" />
        </div>
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-[#d4af37]/5 border border-[#d4af37]/10 flex items-center justify-center overflow-hidden">
             {userData?.logo ? (
               <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
             ) : (
               <span className="text-2xl font-serif italic text-[#d4af37]">{displayName?.charAt(0) || 'V'}</span>
             )}
          </div>
          <h1 className="text-2xl font-serif italic text-[#d4af37] tracking-wider mb-2">{displayName || 'Velvet Boutique'}</h1>
          <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.4em]">{role || 'Artisanal Designer'}</p>
        </div>

        <div className="space-y-3">
           <StandardContactLink icon={FiIcons.FiGlobe} value={website} href={website} />
           <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />
           <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />
           <StandardContactLink icon={FiIcons.FiMapPin} value={address} />

           {/* Brand Socials */}
           <StandardContactLink icon={FiIcons.FiInstagram} value={instagram} href={instagram} />
           <StandardContactLink icon={FiIcons.FiLinkedin} value={linkedin} href={linkedin} />
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-white/20">
          <FiIcons.FiHeart size={14} />
          <p className="text-[8px] font-black uppercase tracking-[0.2em]">Exclusively Crafted Identity</p>
        </div>

        <StandardMapPreview address={address} />

        <StandardSaveContactButton userData={userData} />

        <footer className="mt-10 text-center opacity-10">
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] text-white font-black tracking-[0.5em] uppercase hover:opacity-100 transition-opacity">Powered by Cardyn</a>
        </footer>
      </div>
    </div>
  );
};
export default VelvetBoutique;
