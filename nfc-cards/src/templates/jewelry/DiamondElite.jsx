import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const DiamondElite = ({ userData }) => {
  const { displayName, email, role, phone, website, address, instagram, facebook, linkedin } = userData || {};
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-start justify-center py-16 px-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-gradient-to-b from-[#1a1a1a] to-black border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px]" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 p-0.5 mb-8 shadow-xl">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-amber-400 overflow-hidden">
               {userData?.logo ? (
                 <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
               ) : (
                 <FiIcons.FiStar size={32} strokeWidth={1} />
               )}
            </div>
          </div>
          <h1 className="text-2xl font-black text-white tracking-[0.1em] uppercase text-center leading-tight">{displayName || 'Precious Jewels'}</h1>
          <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] mt-4 mb-10">{role || 'Master Jeweler'}</p>
          
          <div className="w-full space-y-3">
             <StandardContactLink icon={FiIcons.FiGlobe} value={website} href={website} />
             <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />
             <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />
             <StandardContactLink icon={FiIcons.FiMapPin} value={address} />

             {/* Luxury Socials */}
             <StandardContactLink icon={FiIcons.FiInstagram} value={instagram} href={instagram} />
             <StandardContactLink icon={FiIcons.FiLinkedin} value={linkedin} href={linkedin} />
             <StandardContactLink icon={FiIcons.FiFacebook} value={facebook} href={facebook} />
          </div>
          
          <div className="w-full mt-10">
             <button className="w-full py-4 border border-amber-500/30 text-amber-500 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-amber-500 hover:text-black transition-all shadow-lg active:scale-95">
               View Collection
             </button>
          </div>

          <StandardMapPreview address={address} />

          <StandardSaveContactButton />

          <footer className="mt-12 text-center opacity-10">
             <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[7px] text-white font-black tracking-[0.6em] uppercase hover:opacity-100 transition-opacity">Powered by Cardyn</a>
          </footer>
        </div>
      </div>
    </div>
  );
};
export default DiamondElite;
