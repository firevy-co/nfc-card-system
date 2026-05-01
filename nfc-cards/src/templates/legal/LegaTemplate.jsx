import React from 'react';
import {
   FiShield,
   FiPhone,
   FiMail,
   FiMapPin,
   FiGlobe,
   FiDownload,
   FiCheckCircle,
   FiClock,
   FiBriefcase,
   FiArrowUpRight
} from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const LegaTemplate = ({ userData }) => {
   const {
      displayName,
      email,
      role,
      mobileNumber,
      website,
      city,
      address,
      bio,
      logo
   } = userData || {};

   // Premium corporate glass building image
   const coverImage =
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80";

   const phone = mobileNumber || "+1 (800) 555-1000";
   const location = address || city || "Downtown Legal District";

   return (
      <div className="min-h-screen bg-slate-950 font-['Mulish'] text-white pb-12 overflow-x-hidden select-none animate-in fade-in duration-500">

         {/* Hero Header Banner */}
         <div className="relative h-72 w-full overflow-hidden shrink-0">
            <img
               src={coverImage}
               alt="Corporate Center"
               className="w-full h-full object-cover select-none"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/20" />

            <div className="absolute top-6 right-6 w-11 h-11 rounded-xl bg-slate-900/40 backdrop-blur-md border border-slate-700/50 flex items-center justify-center">
               <FiShield className="text-amber-400" size={20} />
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
               {/* Premium Brand Mark */}
               <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0 shadow-lg p-1 animate-in zoom-in-50 duration-300">
                  {logo ? (
                     <img
                        src={logo}
                        alt="Logo"
                        className="w-full h-full object-contain"
                     />
                  ) : (
                     <span className="text-2xl font-black text-amber-400 tracking-tight">
                        {displayName?.charAt(0) || "L"}
                     </span>
                  )}
               </div>

               <div className="min-w-0">
                  <h1 className="text-2xl font-black text-white truncate tracking-tight">
                     {displayName || "Lega Template"}
                  </h1>

                  <p className="text-[10px] text-amber-400 font-bold uppercase tracking-[0.2em] truncate mt-0.5">
                     {role || "Senior Legal Consultant"}
                  </p>
               </div>
            </div>
         </div>

         {/* Body content inside constraints */}
         <div className="px-6 max-w-md mx-auto mt-6 relative space-y-6">

            {/* Bio/Vision card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
               <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {bio ||
                     "Trusted legal advisory services with expertise in corporate law, civil matters, documentation, contracts, dispute resolution, and confidential consultations."}
               </p>
            </div>

            {/* Service Areas */}
            <div>
               <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                     Practice Specializations
                  </h3>
                  <div className="h-px bg-slate-800/80 flex-1"></div>
               </div>

               <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl p-4 text-center group transition-all duration-300 cursor-pointer">
                     <FiBriefcase className="mx-auto mb-2 text-amber-400/80 group-hover:scale-110 transition-transform" size={16} />
                     <p className="text-[9px] font-black uppercase tracking-wider text-slate-300">Corporate Law</p>
                  </div>

                  <div className="bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl p-4 text-center group transition-all duration-300 cursor-pointer">
                     <FiShield className="mx-auto mb-2 text-amber-400/80 group-hover:scale-110 transition-transform" size={16} />
                     <p className="text-[9px] font-black uppercase tracking-wider text-slate-300">Civil Cases</p>
                  </div>

                  <div className="bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl p-4 text-center group transition-all duration-300 cursor-pointer">
                     <FiCheckCircle className="mx-auto mb-2 text-amber-400/80 group-hover:scale-110 transition-transform" size={16} />
                     <p className="text-[9px] font-black uppercase tracking-wider text-slate-300">Legal Drafting</p>
                  </div>

                  <div className="bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl p-4 text-center group transition-all duration-300 cursor-pointer">
                     <FiMapPin className="mx-auto mb-2 text-amber-400/80 group-hover:scale-110 transition-transform" size={16} />
                     <p className="text-[9px] font-black uppercase tracking-wider text-slate-300">Property Law</p>
                  </div>
               </div>
            </div>

            {/* High-end contact stack */}
            <div className="space-y-2.5">
               <a
                  href={`tel:${phone}`}
                  className="flex items-center justify-between bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-xl p-4 transition duration-300 cursor-pointer group"
               >
                  <div className="flex items-center gap-3">
                     <FiPhone size={16} className="text-amber-400" />
                     <span className="text-xs font-bold">{phone}</span>
                  </div>
                  <FiArrowUpRight size={14} className="text-slate-400 group-hover:text-amber-400 transition-colors" />
               </a>

               {email && (
                  <a
                     href={`mailto:${email}`}
                     className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-xl p-4 transition duration-300 cursor-pointer"
                  >
                     <FiMail size={16} className="text-amber-400 shrink-0" />
                     <span className="text-xs font-bold truncate">{email}</span>
                  </a>
               )}

               {website && (
                  <a
                     href={website.startsWith("http") ? website : `https://${website}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-xl p-4 transition duration-300 cursor-pointer"
                  >
                     <FiGlobe size={16} className="text-amber-400 shrink-0" />
                     <span className="text-xs font-bold truncate">{website}</span>
                  </a>
               )}

               <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl p-4 select-text">
                  <FiMapPin size={16} className="text-amber-400 shrink-0" />
                  <span className="text-xs font-bold truncate">{location}</span>
               </div>
            </div>

            {/* Operating schedule card */}
            <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-4 flex items-center justify-between gap-4">
               <div className="flex items-center gap-3">
                  <FiClock className="text-amber-400/80" size={16} />
                  <div className="min-w-0">
                     <p className="text-[10px] font-black text-amber-400 uppercase tracking-wider">
                        Hours of Consultation
                     </p>
                     <p className="text-[11px] text-slate-300 font-bold mt-0.5">
                        Mon - Sat : 10:00 AM - 7:00 PM
                     </p>
                  </div>
               </div>
            </div>

            {/* Call to actions */}
            <div className="pt-2 space-y-3">
               <button className="w-full py-4 rounded-xl bg-amber-400 text-black font-black uppercase tracking-[0.2em] text-[10px] hover:bg-amber-300 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-amber-400/10">
                  Book Consultation
               </button>

               <button
                  onClick={() => downloadVCard(userData)}
                  className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
               >
                  <FiDownload size={14} className="text-amber-400" />
                  Save Contact
               </button>
            </div>

            {/* Professional Footer */}
            <div className="pt-2">
               <PoweredBy />
            </div>

         </div>
      </div>
   );
};

export default LegaTemplate;