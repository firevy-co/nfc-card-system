import React from "react";
import {
   FiHome,
   FiMapPin,
   FiPhone,
   FiMail,
   FiGlobe,
   FiInstagram,
   FiLinkedin,
} from "react-icons/fi";
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const ModernRealty = ({ userData }) => {
   const {
      displayName,
      website,
      email,
      phone,
      address,
   } = userData || {};

   return (
      <div className="min-h-screen bg-[#020617] flex justify-center items-start py-8 px-4 text-white font-['Mulish']">
         <div className="w-full max-w-sm bg-[#1e293b]/20 border border-white/5 rounded-[2.5rem] shadow-2xl backdrop-blur-xl overflow-hidden">
            
            {/* HERO SECTION */}
            <div className="relative h-56 bg-zinc-900">
               <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa" 
                  className="w-full h-full object-cover opacity-60"
                  alt="Modern House"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
               <div className="absolute bottom-6 left-8 flex items-end gap-3 translate-y-2">
                  {userData?.logo && (
                     <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg p-2 flex items-center justify-center shrink-0">
                        <img src={userData.logo} className="w-full h-full object-contain" alt="Logo" />
                     </div>
                  )}
                  <div>
                     <div className="flex items-center gap-2 text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest mb-2 w-max">
                        <FiHome size={10} />
                        PREMIUM LISTINGS
                     </div>
                     <h1 className="text-2xl font-black text-white tracking-tight leading-none capitalize">
                        {displayName || "Agency Name"}
                     </h1>
                  </div>
               </div>
            </div>

            <div className="p-8">
               <p className="text-[10px] text-gray-500 font-black tracking-[0.4em] uppercase mb-8 opacity-60 text-center">
                  REAL ESTATE EXCELLENCE
               </p>

               {/* FEATURED PROPERTIES */}
               <div className="grid grid-cols-2 gap-3 mb-10">
                  <div className="relative rounded-[1.5rem] overflow-hidden h-28 border border-white/5 shadow-xl">
                     <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750" className="w-full h-full object-cover" alt="Luxury Villa" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                        <span className="text-white text-[8px] font-black uppercase tracking-widest">Luxe Villa</span>
                     </div>
                  </div>
                  <div className="relative rounded-[1.5rem] overflow-hidden h-28 border border-white/5 shadow-xl">
                     <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858" className="w-full h-full object-cover" alt="Modern Loft" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                        <span className="text-white text-[8px] font-black uppercase tracking-widest">Modern Loft</span>
                     </div>
                  </div>
               </div>

               {/* Action Buttons */}
               <div className="flex flex-col gap-3 mb-10">
                  <button className="w-full bg-white text-black py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-white/90 transition-all">
                      View Listings
                  </button>
               </div>

               {/* CONTACT STACK */}
               <div className="space-y-3">
                  <StandardContactLink icon={FiGlobe} value={website} href={website} />
                  <StandardContactLink icon={FiMail} value={email} href={`mailto:${email}`} />
                  <StandardContactLink icon={FiPhone} value={phone} href={`tel:${phone}`} />
                  <StandardContactLink icon={FiMapPin} value={address} />
                  
                  {/* Dynamic Socials */}
                  <StandardContactLink icon={FiLinkedin} value={userData?.linkedin} href={userData?.linkedin} />
                  <StandardContactLink icon={FiInstagram} value={userData?.instagram} href={userData?.instagram} />
               </div>

               {/* Map Preview */}
               <StandardMapPreview address={address} />

               <StandardSaveContactButton userData={userData} />

            </div>

          <div className="mt-10 mb-2 text-center opacity-20">
            <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[8px] font-black tracking-[0.5em] text-gray-300 hover:text-white transition-colors uppercase">Powered by Cardyn</a>
          </div>
         </div>
      </div>
   );
};

export default ModernRealty;
