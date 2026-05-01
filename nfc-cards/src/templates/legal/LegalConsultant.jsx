import React from "react";
import {
   FiAward,
   FiLock,
   FiMapPin,
   FiPhone,
   FiMail,
   FiGlobe,
   FiUserPlus,
   FiChevronRight,
   FiShield,
   FiBriefcase,
   FiClock,
   FiCheckCircle,
   FiDownload,
} from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

const LegalConsultant = ({ userData }) => {
   const {
      displayName = "Justice Legal Partners",
      website = "www.justicelegal.com",
      email = "info@justicelegal.com",
      phone = "+1 800-LAW-PRO",
      address = "One Attorney Plaza, Chicago",
      role = "Senior Legal Consultant",
      experience = "15+ Years Experience",
   } = userData || {};

   return (
      <div className="min-h-screen bg-[#0b1120] text-white font-['Mulish'] overflow-hidden">

         {/* HEADER IMAGE */}
         <div className="relative h-72 w-full">
            <img
               src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80"
               alt="Legal Office"
               className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-[#0b1120]" />

            <div className="absolute bottom-8 left-0 right-0 px-6 text-center">
               <div className="w-20 h-20 rounded-full bg-[#111827] mx-auto mb-4 flex items-center justify-center shadow-2xl">
                  <FiAward size={34} className="text-amber-400" />
               </div>

               <h1 className="text-3xl font-black text-white tracking-tight">
                  {displayName}
               </h1>

               <p className="text-xs text-amber-400 font-bold uppercase tracking-[0.35em] mt-2">
                  {role}
               </p>
            </div>
         </div>

         {/* CONTENT */}
         <div className="px-5 py-6 max-w-md mx-auto">

            {/* QUICK STATS */}
            <div className="grid grid-cols-2 gap-3 mb-6">
               <div className="bg-[#111827] rounded-2xl p-4 text-center">
                  <FiClock className="mx-auto text-amber-400 mb-2" size={18} />
                  <p className="text-xs font-bold text-white">{experience}</p>
               </div>

               <div className="bg-[#111827] rounded-2xl p-4 text-center">
                  <FiShield className="mx-auto text-amber-400 mb-2" size={18} />
                  <p className="text-xs font-bold text-white">Trusted Law Firm</p>
               </div>
            </div>

            {/* PRACTICE AREAS */}
            <div className="bg-[#111827] rounded-3xl p-5 mb-6">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-black text-amber-400 uppercase tracking-widest">
                     Practice Areas
                  </h3>
                  <FiChevronRight className="text-slate-500" />
               </div>

               <div className="space-y-3 text-sm text-slate-300">
                  {[
                     "Corporate Law",
                     "Property Disputes",
                     "Civil Litigation",
                     "Criminal Defense",
                     "Family Matters",
                  ].map((item, i) => (
                     <div key={i} className="flex items-center gap-3">
                        <FiCheckCircle className="text-amber-400 shrink-0" />
                        <span>{item}</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* CONTACT */}
            <div className="space-y-3 mb-6">

               <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-4 bg-[#111827] p-4 rounded-2xl hover:bg-[#1f2937] transition"
               >
                  <FiPhone className="text-amber-400" />
                  <div>
                     <p className="text-[10px] text-slate-400 uppercase font-bold">
                        Call Now
                     </p>
                     <p className="text-sm font-semibold">{phone}</p>
                  </div>
               </a>

               <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 bg-[#111827] p-4 rounded-2xl hover:bg-[#1f2937] transition"
               >
                  <FiMail className="text-amber-400" />
                  <div>
                     <p className="text-[10px] text-slate-400 uppercase font-bold">
                        Email
                     </p>
                     <p className="text-sm font-semibold truncate">{email}</p>
                  </div>
               </a>

               <a
                  href={`https://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-[#111827] p-4 rounded-2xl hover:bg-[#1f2937] transition"
               >
                  <FiGlobe className="text-amber-400" />
                  <div>
                     <p className="text-[10px] text-slate-400 uppercase font-bold">
                        Website
                     </p>
                     <p className="text-sm font-semibold truncate">{website}</p>
                  </div>
               </a>

               <div className="flex items-center gap-4 bg-[#111827] p-4 rounded-2xl">
                  <FiMapPin className="text-amber-400" />
                  <div>
                     <p className="text-[10px] text-slate-400 uppercase font-bold">
                        Office Address
                     </p>
                     <p className="text-sm font-semibold">{address}</p>
                  </div>
               </div>
            </div>

            {/* EXTRA INFO */}
            <div className="grid grid-cols-2 gap-3 mb-6">
               <div className="bg-[#111827] rounded-2xl p-4 text-center">
                  <FiBriefcase className="mx-auto text-amber-400 mb-2" />
                  <p className="text-xs font-bold">500+ Cases</p>
               </div>

               <div className="bg-[#111827] rounded-2xl p-4 text-center">
                  <FiLock className="mx-auto text-amber-400 mb-2" />
                  <p className="text-xs font-bold">Confidential</p>
               </div>
            </div>

            {/* BUTTONS */}
            <div className="space-y-3 mb-6">

               <button className="w-full bg-amber-400 text-black py-5 rounded-2xl font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-3 hover:bg-amber-300 transition">
                  <FiUserPlus size={18} />
                  Book Consultation
               </button>

               <button
                  onClick={() => downloadVCard(userData)}
                  className="w-full bg-[#111827] border border-amber-400 text-amber-400 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-3 hover:bg-amber-400 hover:text-black transition"
               >
                  <FiDownload size={18} />
                  Save Contact
               </button>

            </div>

            <PoweredBy />
         </div>
      </div>
   );
};

export default LegalConsultant;