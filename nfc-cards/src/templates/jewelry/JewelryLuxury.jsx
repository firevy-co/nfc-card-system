import React from "react";
import {
   FiMapPin,
   FiPhone,
   FiMail,
   FiGlobe,
   FiInstagram,
   FiLinkedin,
   FiFacebook,
} from "react-icons/fi";
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const JewelryLuxury = ({ userData }) => {
   const {
      displayName,
      website,
      email,
      phone,
      address,
   } = userData || {};

   return (
    <div className="min-h-screen bg-[#020617] flex justify-center items-start py-16 px-4 text-white font-['Mulish']">
         <div className="w-full max-w-sm bg-[#1e293b]/20 border border-white/5 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl">

            {/* LOGO */}
            <div className="flex flex-col items-center text-center">
               <div className="w-24 h-24 border-2 border-cyan-400 rounded-full flex items-center justify-center mb-6 overflow-hidden">
                  {userData?.logo ? (
                    <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                  ) : (
                    <span className="text-4xl">💎</span>
                  )}
               </div>

               <h1 className="text-2xl font-black tracking-tight leading-none">
                  {displayName || "Maison De Luxe"}
               </h1>

               <p className="text-[10px] tracking-[0.4em] text-cyan-400 font-black mt-3 uppercase opacity-80">
                  ESTABLISHED EXCELLENCE
               </p>

               {/* TAG BUTTONS */}
               <div className="flex gap-2 mt-6 flex-wrap justify-center">
                  <span className="bg-cyan-500/10 text-cyan-400 text-[8px] tracking-widest px-3 py-1.5 rounded-full border border-cyan-500/10 font-black">
                     BESPOKE DESIGNS
                  </span>
                  <span className="bg-cyan-500/10 text-cyan-400 text-[8px] tracking-widest px-3 py-1.5 rounded-full border border-cyan-500/10 font-black">
                     FINE DIAMONDS
                  </span>
               </div>
            </div>

            {/* PRODUCT GRID */}
            <div className="grid grid-cols-2 gap-3 mt-10">
               <img
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e"
                  className="rounded-2xl object-cover h-32 w-full border border-white/5 shadow-lg"
               />

               <img
                  src="https://images.unsplash.com/photo-1611652022419-a9419f74343d"
                  className="rounded-2xl object-cover h-32 w-full border border-white/5 shadow-lg"
               />
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col gap-3 mt-10">
                <button className="w-full bg-white text-black py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-white/90 transition-all">
                    View Collection
                </button>
            </div>

            {/* CONTACT CARDS */}
            <div className="space-y-3 mt-10">
               <p className="text-[10px] text-gray-500 font-black tracking-[0.4em] uppercase mb-4 text-center">
                  Get In Touch
               </p>

               <StandardContactLink icon={FiGlobe} value={website} href={website} />
               <StandardContactLink icon={FiMail} value={email} href={`mailto:${email}`} />
               <StandardContactLink icon={FiPhone} value={phone} href={`tel:${phone}`} />
               <StandardContactLink icon={FiMapPin} value={address} />

               {/* Luxury Social Matrix */}
               <StandardContactLink icon={FiLinkedin} value={userData?.linkedin} href={userData?.linkedin} />
               <StandardContactLink icon={FiInstagram} value={userData?.instagram} href={userData?.instagram} />
               <StandardContactLink icon={FiFacebook} value={userData?.facebook} href={userData?.facebook} />
            </div>

            {/* Map Preview */}
            <StandardMapPreview address={address} />

            {/* SAVE CONTACT */}
            <StandardSaveContactButton />


          <div className="mt-12 mb-2 text-center opacity-20">
            <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[8px] font-black tracking-[0.5em] text-gray-300 hover:text-white transition-colors uppercase">Powered by Cardyn</a>
          </div>
         </div>
      </div>
   );
};

export default JewelryLuxury;
