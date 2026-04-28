import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const ZenCafe = ({ userData }) => {
  const { displayName, email, role, phone, website, address, instagram } = userData || {};
  return (
    <div className="min-h-screen bg-[#fafaf7] flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-white border border-[#e5e5e0] rounded-[5rem] p-10 shadow-2xl overflow-hidden flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-[#f4f4f0] flex items-center justify-center text-[#86867e] mb-8 overflow-hidden">
           {userData?.logo ? (
             <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
           ) : (
             <FiIcons.FiWind size={32} />
           )}
        </div>
        <h1 className="text-2xl font-black text-[#444440] tracking-tight text-center leading-none">{displayName || 'Zen Cafe'}</h1>
        
        
        <div className="w-full space-y-3 relative z-10">
           <StandardContactLink icon={FiIcons.FiGlobe} value={website} href={website} />
           <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />
           <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />
           <StandardContactLink icon={FiIcons.FiMapPin} value={address} />

           {/* Socials */}
           <StandardContactLink icon={FiIcons.FiInstagram} value={userData?.instagram} href={userData?.instagram} />
           <StandardContactLink icon={FiIcons.FiTwitter} value={userData?.twitter} href={userData?.twitter} />
           <StandardContactLink icon={FiIcons.FiFacebook} value={userData?.facebook} href={userData?.facebook} />
           <StandardContactLink icon={FiIcons.FiLinkedin} value={userData?.linkedin} href={userData?.linkedin} />
           <StandardContactLink icon={FiIcons.FiYoutube} value={userData?.youtube} href={userData?.youtube} />
        </div>

        <div className="w-full mt-6">
           <a href={`tel:${phone}`} className="w-full flex items-center justify-center py-4 rounded-3xl bg-[#f4f4f0] text-[#444440] font-black text-xs hover:bg-[#ebebe7] transition-all uppercase tracking-widest shadow-sm">
              Connect Directly
           </a>
        </div>

        <StandardMapPreview address={address} />

        <StandardSaveContactButton userData={userData} />
        
        <div className="mt-12 flex justify-center gap-2 opacity-20">
           <div className="w-2 h-2 rounded-full bg-[#86867e]" />
           <div className="w-2 h-2 rounded-full bg-[#83a493]" />
           <div className="w-2 h-2 rounded-full bg-[#d9c49d]" />
        </div>
        <footer className="mt-8 text-center opacity-20">
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[7px] font-black tracking-[0.6em] text-[#444440] uppercase hover:opacity-100 transition-opacity">Powered by Cardyn</a>
        </footer>
      </div>
    </div>
  );
};
export default ZenCafe;
