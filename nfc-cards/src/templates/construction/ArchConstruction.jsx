import React from "react";
import {
   FiShare2,
   FiLayers,
   FiMapPin,
   FiPhone,
   FiMail,
   FiGlobe,
   FiUserPlus,
   FiHardDrive,
   FiCheckSquare,
} from "react-icons/fi";

const ArchConstruction = ({ userData }) => {
   const {
      displayName = "Ironwood Build & Design",
      website = "www.ironwoodbuilds.com",
      email = "projects@ironwood.com",
      phone = "+1 555-CONSTRUCT",
      address = "45 Industrial Way, Seattle",
   } = userData || {};

   return (
      <div className="min-h-screen bg-[#F4F4F4] flex justify-center items-start py-8 px-4 text-[#1A1A1A] font-['Plus_Jakarta_Sans']">
         <div className="w-full max-w-sm bg-white rounded-none shadow-2xl overflow-hidden border-t-[12px] border-orange-500 p-0 relative">
            
            {/* RAW INDUSTRIAL HEADER */}
            <div className="p-8 bg-zinc-900 text-white">
               <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 bg-orange-500 flex items-center justify-center">
                     <FiLayers size={24} className="text-white" />
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black capitalize tracking-[0.2em] text-orange-500">Project ID</p>
                     <p className="text-xs font-mono font-bold">#IW-2024-99</p>
                  </div>
               </div>

               <h1 className="text-3xl font-black tracking-tighter capitalize leading-none mb-2">
                  {displayName}
               </h1>
               <div className="h-1 w-20 bg-orange-500 mb-6"></div>
               <p className="text-[10px] font-bold text-zinc-400 capitalize tracking-widest">
                  Industrial Architecture • General Contracting
               </p>
            </div>

            {/* PROJECT LOG */}
            <div className="p-8">
               <div className="grid grid-cols-1 gap-4 mb-8">
                  <div className="flex items-center gap-4 p-4 bg-zinc-50 border-l-4 border-zinc-300">
                     <FiCheckSquare className="text-orange-500" />
                     <span className="text-xs font-bold capitalize tracking-wide">Design Phase Complete</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-zinc-50 border-l-4 border-zinc-300">
                     <FiCheckSquare className="text-orange-500" />
                     <span className="text-xs font-bold capitalize tracking-wide">Structural Integrity Verified</span>
                  </div>
               </div>

               {/* CONTACT GRID - RUGGED DESIGN */}
               <div className="grid grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 mb-8">
                  <div className="bg-white p-6 flex flex-col gap-2">
                     <FiGlobe size={18} className="text-orange-500" />
                     <p className="text-[8px] font-black capitalize text-zinc-400">Portal</p>
                     <p className="text-[10px] font-bold truncate">{website}</p>
                  </div>
                  <div className="bg-white p-6 flex flex-col gap-2">
                     <FiPhone size={18} className="text-orange-500" />
                     <p className="text-[8px] font-black capitalize text-zinc-400">Direct</p>
                     <p className="text-[10px] font-bold truncate">{phone}</p>
                  </div>
                  <div className="bg-white p-6 flex flex-col gap-2 col-span-2">
                     <FiMapPin size={18} className="text-orange-500" />
                     <p className="text-[8px] font-black capitalize text-zinc-400">Site HQ</p>
                     <p className="text-[10px] font-bold truncate">{address}</p>
                  </div>
               </div>

               {/* ENGINEER CTA */}
               <button className="w-full bg-zinc-900 text-white font-black py-5 flex items-center justify-center gap-3 capitalize tracking-[0.2em] text-[10px] hover:bg-orange-500 transition-colors">
                  <FiUserPlus size={16} />
                  Initiate Consultation
               </button>
            </div>

            {/* BARCODE DECORATION */}
            <div className="px-8 pb-8 flex justify-between items-end opacity-20">
               <div className="flex gap-1 h-8 items-end">
                  {[2,4,1,3,1,5,2].map((h, i) => (
                     <div key={i} className="bg-black w-0.5" style={{ height: `${h * 10}%` }}></div>
                  ))}
               </div>
               <span className="text-[8px] font-mono">SPEC-77-ALPHA</span>
            </div>

         </div>
      </div>
   );
};

export default ArchConstruction;
