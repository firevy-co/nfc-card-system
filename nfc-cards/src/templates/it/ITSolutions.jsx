import React from "react";
import {
   FiCpu,
   FiGlobe,
   FiMail,
   FiPhone,
   FiMapPin,
   FiShare2,
   FiUserPlus,
   FiExternalLink
} from "react-icons/fi";
import { FaRocket, FaRegFileAlt } from "react-icons/fa";

const ITSolutions = ({ userData }) => {
   const {
      displayName = "NexaTech Solutions",
      website = "www.nexatech.solutions",
      email = "hello@nexatech.solutions",
      phone = "+1 (408) 555-0192",
      address = "Silicon Valley, CA",
   } = userData || {};

   return (
      <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#020617] text-white flex justify-center py-10 px-4">

         <div className="w-full max-w-sm">

            {/* LOGO */}
            <div className="flex flex-col items-center text-center">

               <div className="w-20 h-20 bg-[#1e293b] rounded-2xl flex items-center justify-center mb-4">
                  <FiCpu className="text-cyan-400 text-3xl" />
               </div>

               <h1 className="text-xl font-bold">{displayName}</h1>

               <p className="text-xs text-cyan-400 tracking-widest mt-1">
                  ARCHITECTING THE DIGITAL FRONTIER
               </p>

               {/* TAGS */}
               <div className="flex gap-2 mt-4 flex-wrap justify-center">
                  <span className="bg-cyan-500/20 text-cyan-300 text-xs px-3 py-1 rounded-full">
                     CLOUD COMPUTING
                  </span>
                  <span className="bg-cyan-500/20 text-cyan-300 text-xs px-3 py-1 rounded-full">
                     AI DEVELOPMENT
                  </span>
                  <span className="bg-cyan-500/20 text-cyan-300 text-xs px-3 py-1 rounded-full">
                     CYBERSECURITY
                  </span>
               </div>

            </div>

            {/* FEATURE CARDS */}
            <div className="grid grid-cols-2 gap-4 mt-8">

               <div className="bg-[#0f172a] p-5 rounded-xl flex flex-col items-center">
                  <FaRocket className="text-cyan-400 text-xl mb-2" />
                  <p className="text-sm">Our Portfolio</p>
               </div>

               <div className="bg-[#0f172a] p-5 rounded-xl flex flex-col items-center">
                  <FaRegFileAlt className="text-cyan-400 text-xl mb-2" />
                  <p className="text-sm">Case Studies</p>
               </div>

            </div>

            {/* INFRASTRUCTURE DETAILS */}
            <div className="mt-8">

               <p className="text-xs text-gray-400 tracking-widest mb-4">
                  INFRASTRUCTURE DETAILS
               </p>

               <div className="bg-[#0f172a] rounded-2xl p-5 space-y-4">

                  <div className="flex items-center gap-3">
                     <FiGlobe className="text-cyan-400" />
                     <div>
                        <p className="text-[10px] text-gray-400">WEB DOMAIN</p>
                        <p className="text-sm">{website}</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-3">
                     <FiMail className="text-cyan-400" />
                     <div>
                        <p className="text-[10px] text-gray-400">DIRECT UPLINK</p>
                        <p className="text-sm">{email}</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-3">
                     <FiPhone className="text-cyan-400" />
                     <div>
                        <p className="text-[10px] text-gray-400">SECURE LINE</p>
                        <p className="text-sm">{phone}</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-3">
                     <FiMapPin className="text-cyan-400" />
                     <div>
                        <p className="text-[10px] text-gray-400">OPERATIONS BASE</p>
                        <p className="text-sm">{address}</p>
                     </div>
                  </div>

               </div>

            </div>

            {/* HQ STATUS CARD */}
            <div className="mt-6 bg-[#0f172a] rounded-2xl p-5 h-28 flex items-end">

               <div className="flex items-center gap-2 text-xs text-cyan-300">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                  HQ ACTIVE STATUS
               </div>

            </div>

            {/* SAVE CONTACT */}
            <button className="w-full mt-6 bg-gradient-to-r from-cyan-400 to-teal-400 text-black py-4 rounded-xl flex items-center justify-center gap-2 font-semibold">
               <FiUserPlus />
               SAVE CONTACT
            </button>

            {/* BOTTOM ICONS */}
            <div className="flex justify-center gap-6 mt-6 text-gray-400">

               <FiShare2 />

               <FiGlobe />

               <FiExternalLink />

            </div>

         </div>
      </div>
   );
};

export default ITSolutions;