import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { StandardContactLink, StandardMapPreview, downloadVCard } from "../common/StandardComponents";

const BoldEntrepreneur = ({ userData }) => {
   const { displayName, email, phone, website, address, linkedin, instagram } = userData || {};
   return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 font-['Mulish']">
         <div className="w-full max-w-sm group">
            <div className="bg-yellow-400 rounded-t-[2.5rem] p-8">
               <div className="w-24 h-24 rounded-2xl bg-black flex items-center justify-center text-yellow-400 text-4xl font-black mb-6 shadow-2xl overflow-hidden">
                  {userData?.logo ? (
                     <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                  ) : (
                     displayName?.charAt(0) || 'B'
                  )}
               </div>
               <h1 className="text-3xl font-black text-black tracking-tighter capitalize leading-none">{displayName || 'Entrepreneur'}</h1>
            </div>
            <div className="bg-zinc-900 rounded-b-[2.5rem] p-8 space-y-3">
               <StandardContactLink icon={FiIcons.FiGlobe} value={website} href={website} />
               <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />
               <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />
               <StandardContactLink icon={FiIcons.FiMapPin} value={address} />

               {/* Personal Socials */}
               <StandardContactLink icon={FiIcons.FiLinkedin} value={linkedin} href={linkedin} />
               <StandardContactLink icon={FiIcons.FiInstagram} value={instagram} href={instagram} />

               <div className="pt-4">
                  <button 
                     onClick={() => downloadVCard(userData)}
                     className="w-full py-5 bg-yellow-400 text-black rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-yellow-300 transition-all shadow-2xl shadow-yellow-400/20 active:scale-95"
                  >
                     Save Contact
                  </button>
               </div>

               <StandardMapPreview address={address} />

               <footer className="pt-8 text-center opacity-10">
                  <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] text-white font-black tracking-[0.2em] uppercase hover:opacity-100 transition-opacity">Powered by Cardyn</a>
               </footer>
            </div>
         </div>
      </div>
   );
};
export default BoldEntrepreneur;
