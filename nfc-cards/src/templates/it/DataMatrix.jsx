import React from "react";
import {
   FiGrid,
   FiPhone,
   FiMail,
   FiGlobe,
   FiMapPin,
   FiBriefcase,
   FiUser,
   FiArrowUpRight,
   FiShield,
   FiClock,
} from "react-icons/fi";

const DataMatrix = ({ userData }) => {
   const {
      displayName,
      email,
      role,
      mobileNumber,
      website,
      company,
      address,
      bio,
   } = userData || {};

   const user = {
      name: displayName || "cardyn",
      role: role || "Creative Developer",
      phone: mobileNumber || "+91 99999 99999",
      email: email || "hello@cardyn.shop",
      website: website || "https://cardyn.shop/",
      company: company || "Cardyn Digital Systems",
      address: address || "Ahmedabad, Gujarat, India",
      bio:
         bio ||
         "Building modern brands, websites, software solutions and next generation business identities.",
   };

   return (
      <div className="min-h-screen bg-black flex justify-center items-center px-4 py-10 font-['Space_Grotesk'] overflow-x-hidden relative md:bg-neutral-950 md:items-center py-0 md:py-12">

         {/* Background Effects */}
         <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-500/10 blur-[120px] rounded-full" />
         <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full" />

         {/* Main Card */}
         <div className="relative w-full max-w-md rounded-[34px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.55)] overflow-hidden">

            {/* Top Grid */}
            <div className="absolute top-0 right-0 opacity-[0.04] p-5">
               <FiGrid size={170} />
            </div>

            {/* Header */}
            <div className="p-7 border-b border-white/5 relative z-10">
               <div className="flex justify-between items-start gap-4">

                  <div>
                     <p className="text-[9px] uppercase tracking-[0.45em] text-white/30 font-bold mb-3">
                        Cardyn Identity 2026
                     </p>

                     <h1 className="text-3xl sm:text-4xl font-black text-white leading-none capitalize">
                        {user.name}
                     </h1>

                     <p className="mt-3 text-emerald-400 text-sm uppercase tracking-[0.25em] font-semibold">
                        {user.role}
                     </p>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                     <FiShield className="text-emerald-400" size={18} />
                  </div>
               </div>

               {/* Bio */}
               <p className="mt-5 text-sm text-white/60 leading-relaxed">
                  {user.bio}
               </p>
            </div>

            {/* Info Section */}
            <div className="p-6 space-y-4">

               {/* Phone */}
               <a
                  href={`tel:${user.phone}`}
                  className="group flex items-center gap-4 rounded-2xl p-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
               >
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                     <FiPhone className="text-emerald-400" />
                  </div>

                  <div className="flex-1">
                     <p className="text-[10px] text-white/35 uppercase tracking-[0.3em] font-bold">
                        Contact
                     </p>
                     <p className="text-white font-bold">{user.phone}</p>
                  </div>

                  <FiArrowUpRight className="text-white/25 group-hover:text-emerald-400" />
               </a>

               {/* Email */}
               <a
                  href={`mailto:${user.email}`}
                  className="group flex items-center gap-4 rounded-2xl p-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
               >
                  <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center">
                     <FiMail className="text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                     <p className="text-[10px] text-white/35 uppercase tracking-[0.3em] font-bold">
                        Email
                     </p>
                     <p className="text-white font-bold truncate">{user.email}</p>
                  </div>

                  <FiArrowUpRight className="text-white/25 group-hover:text-emerald-400" />
               </a>

               {/* Company */}
               <div className="flex items-center gap-4 rounded-2xl p-4 border border-white/5 bg-white/[0.02]">
                  <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center">
                     <FiBriefcase className="text-white" />
                  </div>

                  <div>
                     <p className="text-[10px] text-white/35 uppercase tracking-[0.3em] font-bold">
                        Company
                     </p>
                     <p className="text-white font-bold">{user.company}</p>
                  </div>
               </div>

               {/* Location */}
               <div className="flex items-center gap-4 rounded-2xl p-4 border border-white/5 bg-white/[0.02]">
                  <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center">
                     <FiMapPin className="text-white" />
                  </div>

                  <div>
                     <p className="text-[10px] text-white/35 uppercase tracking-[0.3em] font-bold">
                        Location
                     </p>
                     <p className="text-white font-bold">{user.address}</p>
                  </div>
               </div>
            </div>

            {/* Bottom Section */}
            <div className="p-6 border-t border-white/5">

               {/* Website CTA */}
               <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between bg-emerald-500 hover:bg-emerald-400 text-black rounded-2xl px-5 py-4 font-black text-xs uppercase tracking-[0.28em] transition-all"
               >
                  <span>Visit Website</span>
                  <FiGlobe />
               </a>

               {/* Bottom Status */}
               <div className="mt-6 flex justify-between items-center text-white/35 text-[11px] uppercase tracking-[0.2em]">

                  <div className="flex items-center gap-2">
                     <FiClock size={13} />
                     Active Identity
                  </div>

                  <div className="flex gap-2">
                     <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                     Online
                  </div>
               </div>

               {/* Footer */}
               <div className="mt-6 text-center">
                  <a
                     href="https://cardyn.shop/"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-[10px] uppercase tracking-[0.25em] text-white/35 hover:text-emerald-400"
                  >
                     Powered by Cardyn
                  </a>
               </div>
            </div>
         </div>
      </div>
   );
};

export default DataMatrix;