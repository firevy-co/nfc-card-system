import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const ExpertNode = ({ userData }) => {
  const { displayName, email, role, phone, website, address, linkedin, instagram } = userData || {};
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-neutral-900 border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500" />
        <div className="flex flex-col items-center mb-12">
           <div className="w-20 h-20 rounded-[2.5rem] bg-amber-500 text-black flex items-center justify-center mb-8 shadow-2xl shadow-amber-500/20 group-hover:scale-110 transition-transform overflow-hidden">
              {userData?.logo ? (
                <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
              ) : (
                <FiIcons.FiAward size={36} />
              )}
           </div>
           <h1 className="text-2xl font-black text-white tracking-widest uppercase text-center italic leading-none">{displayName || 'Expert Node'}</h1>
           <p className="text-amber-500 text-[9px] font-black uppercase tracking-[0.5em] mt-3">Verified Service Partner</p>
        </div>
        
        <div className="space-y-3">
           <StandardContactLink icon={FiIcons.FiGlobe} value={website} href={website} />
           <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />
           <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />
           <StandardContactLink icon={FiIcons.FiMapPin} value={address} />

           {/* Socials */}
           <StandardContactLink icon={FiIcons.FiLinkedin} value={linkedin} href={linkedin} />
           <StandardContactLink icon={FiIcons.FiInstagram} value={instagram} href={instagram} />
        </div>

        <div className="mt-8">
           <button className="w-full py-5 text-center bg-white text-black rounded-3xl font-black text-[12px] uppercase tracking-[0.3em] hover:bg-amber-500 transition-all shadow-xl shadow-white/5">Initialize Session</button>
        </div>

        <StandardMapPreview address={address} />

        <StandardSaveContactButton userData={userData} />

        <footer className="mt-16 text-center opacity-10">
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[7px] text-white font-black tracking-[0.8em] uppercase hover:opacity-100 transition-opacity">Powered by Cardyn</a>
        </footer>
      </div>
    </div>
  );
};
export default ExpertNode;
