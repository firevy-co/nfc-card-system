import React from "react";
import {
   FiShare2,
   FiAward,
   FiLock,
   FiMapPin,
   FiPhone,
   FiMail,
   FiGlobe,
   FiUserPlus,
   FiChevronRight,
} from "react-icons/fi";
import PoweredBy from "../PoweredBy";

const LegalConsultant = ({ userData }) => {
   const {
      displayName = "Justice Legal Partners",
      website = "www.justicelegal.com",
      email = "info@justicelegal.com",
      phone = "+1 800-LAW-PRO",
      address = "One Attorney Plaza, Chicago",
   } = userData || {};

   return (
      <div className="min-h-screen bg-[#0f172a] flex justify-center items-start py-10 px-4 text-white font-['Mulish'] md:bg-neutral-950 md:items-center py-0 md:py-12">
         <div className="w-full max-w-sm bg-[#1e293b] rounded-[3rem] shadow-2xl overflow-hidden border border-slate-700 p-8 relative">
            
            {/* HERITAGE LOGO */}
            <div className="flex flex-col items-center text-center">
               <div className="w-20 h-20 bg-slate-800 border-2 border-amber-500 rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-amber-500/10 transition-transform hover:rotate-12 duration-500">
                  <FiAward size={32} className="text-amber-500" />
               </div>

               <h1 className="text-2xl font-black text-amber-500 tracking-tighter capitalize leading-tight mb-2">
                  {displayName}
               </h1>

               <div className="flex items-center gap-2 text-slate-400 bg-slate-900 px-4 py-1.5 rounded-full text-[10px] font-bold capitalize tracking-widest mb-10 border border-slate-800">
                  <FiLock size={12} className="text-amber-500/60" />
                  Privileged & Confidential
               </div>
            </div>

            {/* PRACTICE AREAS */}
            <div className="space-y-4 mb-10">
               <div className="p-5 bg-slate-900/50 rounded-2xl border border-slate-700/50 flex flex-col gap-3 group transition-all hover:bg-slate-900 hover:border-amber-500/30">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black text-amber-500 capitalize tracking-[0.2em]">Practice Focus</span>
                     <FiChevronRight className="text-slate-600 group-hover:text-amber-500 transition-colors" />
                  </div>
                  <ul className="text-xs space-y-2 text-slate-300">
                     <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500/40"></div> Corporate Law</li>
                     <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500/40"></div> Intellectual Property</li>
                     <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500/40"></div> International Arbitration</li>
                  </ul>
               </div>
            </div>

            {/* DIRECT ACTION STACK */}
            <div className="grid grid-cols-2 gap-4 mb-4">
               <button className="h-16 bg-slate-800 hover:bg-slate-700 rounded-2xl border border-slate-700 transition-all flex flex-col items-center justify-center gap-1 group">
                  <FiPhone size={18} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
                  <span className="text-[9px] font-bold text-slate-500 capitalize tracking-widest">Counsel</span>
               </button>
               <button className="h-16 bg-slate-800 hover:bg-slate-700 rounded-2xl border border-slate-700 transition-all flex flex-col items-center justify-center gap-1 group">
                  <FiMail size={18} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
                  <span className="text-[9px] font-bold text-slate-500 capitalize tracking-widest">Enquiry</span>
               </button>
            </div>

            <button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-5 rounded-2xl transition-all shadow-xl shadow-amber-500/10 flex items-center justify-center gap-3 capitalize tracking-widest text-xs mb-8">
               <FiUserPlus size={18} />
               Secure Consultation
            </button>

            {/* FIRM DETAILS */}
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-5">
               <div className="flex items-start gap-4">
                  <FiGlobe className="text-amber-500 mt-0.5" />
                  <div>
                     <p className="text-[9px] text-slate-500 font-bold capitalize tracking-widest leading-none mb-1">Official Portal</p>
                     <p className="text-xs font-semibold text-slate-200">{website}</p>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <FiMapPin className="text-amber-500 mt-0.5" />
                  <div>
                     <p className="text-[9px] text-slate-500 font-bold capitalize tracking-widest leading-none mb-1">Corporate Office</p>
                     <p className="text-xs font-semibold text-slate-200">{address}</p>
                  </div>
               </div>
            </div>


          <PoweredBy />
         </div>
      </div>
   );
};

export default LegalConsultant;
