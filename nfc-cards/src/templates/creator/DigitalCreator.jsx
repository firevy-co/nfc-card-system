import React from "react";
import * as FiIcons from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const DigitalCreator = ({ userData }) => {
   const {
      displayName,
      website,
      email,
      phone,
      address,
      youtube,
      linkedin,
      twitter,
      twitch,
      instagram
   } = userData || {};

   return (
      <div className="min-h-screen bg-[#020617] flex justify-center items-start py-10 px-4 text-white font-['Mulish']">
         <div className="w-full max-w-sm bg-[#1e293b]/20 border border-white/5 rounded-[2.5rem] shadow-2xl backdrop-blur-xl p-8 relative overflow-hidden group">
            
            {/* RETRO GLITCH DECORATION */}
            <div className="absolute top-4 right-4 text-cyan-400/20 text-[8px] font-black tracking-widest select-none uppercase">System.Boot(0x24)</div>

            {/* AVATAR/LOGO */}
            <div className="flex flex-col items-center text-center mt-6">
               <div className="w-24 h-24 bg-cyan-400/10 border border-cyan-400/20 rounded-3xl flex items-center justify-center mb-8 transform group-hover:scale-105 transition-all shadow-xl shadow-cyan-400/10 overflow-hidden">
                  {userData?.logo ? (
                     <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                  ) : (
                     <FiIcons.FiVideo size={40} className="text-cyan-400" />
                  )}
               </div>

               <h1 className="text-3xl font-black text-white italic tracking-tight capitalize leading-none mb-2 text-center">
                  {displayName || 'Pixel Identity'}
               </h1>

               <div className="text-cyan-400 text-[10px] font-black capitalize tracking-[0.4em] mb-12 opacity-80 mt-2">
                  DIGITAL MEDIA ALCHEMIST
               </div>
            </div>

            {/* ACTION STACK */}
            <div className="flex flex-col gap-3 mb-10">
               <button className="w-full bg-white text-black py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-white/90 transition-all flex items-center justify-center gap-3">
                  <FiIcons.FiZap size={18} />
                  Collaborate Now
               </button>
            </div>

            {/* CONTACT LINKS */}
            <div className="space-y-3 relative z-10">
               <StandardContactLink icon={FiIcons.FiGlobe} value={website} href={website} />
               <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />
               <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />
               <StandardContactLink icon={FiIcons.FiMapPin} value={address} />

               {/* Creator Socials */}
               <StandardContactLink icon={FiIcons.FiYoutube} value={youtube} href={youtube} />
               <StandardContactLink icon={FiIcons.FiLinkedin} value={linkedin} href={linkedin} />
               <StandardContactLink icon={FiIcons.FiTwitter} value={twitter} href={twitter} />
               <StandardContactLink icon={FiIcons.FiInstagram} value={instagram} href={instagram} />
            </div>

            <StandardMapPreview address={address} />

            <StandardSaveContactButton />

            <footer className="mt-12 text-center opacity-20">
                <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] font-black tracking-[0.5em] text-gray-300 hover:text-white transition-colors uppercase">Powered by Cardyn</a>
            </footer>
         </div>
      </div>
   );
};

export default DigitalCreator;
