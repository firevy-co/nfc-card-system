import React from "react";
import {
   FiCpu,
   FiGlobe,
   FiMail,
   FiPhone,
   FiMapPin,
   FiExternalLink
} from "react-icons/fi";
import { FaRocket, FaRegFileAlt } from "react-icons/fa";
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const ITSolutions = ({ userData }) => {
   const {
      displayName,
      website,
      email,
      phone,
      address,
   } = userData || {};

   return (
      <div className="min-h-screen bg-[#020617] text-white flex justify-center py-10 px-4 font-['Mulish']">

         <div className="w-full max-w-sm bg-[#1e293b]/20 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-xl">

            {/* LOGO */}
            <div className="flex flex-col items-center text-center">

               <div className="w-20 h-20 bg-cyan-400/10 border border-cyan-400/20 rounded-2xl flex items-center justify-center mb-6">
                  <FiCpu className="text-cyan-400 text-3xl" />
               </div>

               <h1 className="text-2xl font-black tracking-tight">{displayName || "IT Global Resource"}</h1>

               <p className="text-[10px] text-cyan-400 font-black tracking-[0.3em] uppercase mt-2 opacity-80">
                  Architecting The Digital Frontier
               </p>

               {/* TAGS */}
               <div className="flex gap-2 mt-6 flex-wrap justify-center font-black">
                  <span className="bg-cyan-500/10 text-cyan-400 text-[8px] tracking-widest px-3 py-1.5 rounded-full border border-cyan-500/10">
                     CLOUD SOLUTIONS
                  </span>
                  <span className="bg-cyan-500/10 text-cyan-400 text-[8px] tracking-widest px-3 py-1.5 rounded-full border border-cyan-500/10">
                     IT CONSULTING
                  </span>
                  <span className="bg-cyan-500/10 text-cyan-400 text-[8px] tracking-widest px-3 py-1.5 rounded-full border border-cyan-500/10">
                     WEB DEVELOPMENT
                  </span>
               </div>

            </div>

            {/* FEATURE CARDS */}
            <div className="flex flex-col gap-3 mt-10">
                <button className="w-full bg-white text-black py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-white/90 transition-all">
                    Our Portfolio
                </button>
                <button className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
                    Visit Website
                </button>
            </div>

            {/* INFRASTRUCTURE DETAILS */}
            <div className="mt-10 space-y-3">
               <p className="text-[10px] text-gray-500 font-black tracking-[0.4em] uppercase mb-4 text-center">
                  Identity Uplink
               </p>

               <StandardContactLink icon={FiGlobe} value={website} href={website} />
               <StandardContactLink icon={FiMail} value={email} href={`mailto:${email}`} />
               <StandardContactLink icon={FiPhone} value={phone} href={`tel:${phone}`} />
               <StandardContactLink icon={FiMapPin} value={address} />

               {/* Network Social Uplinks */}
               <StandardContactLink icon={FiGlobe} value={userData?.linkedin} href={userData?.linkedin} label="LinkedIn" />
               <StandardContactLink icon={FiGlobe} value={userData?.instagram} href={userData?.instagram} label="Instagram" />
            </div>

            {/* Map Preview */}
            <StandardMapPreview address={address} />

            {/* SAVE CONTACT */}
            <StandardSaveContactButton />


          <div className="mt-10 mb-2 text-center opacity-30">
            <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[8px] font-black tracking-[0.5em] text-gray-300 hover:text-white transition-colors uppercase">Powered by Cardyn</a>
          </div>
         </div>
      </div>
   );
};

export default ITSolutions;
