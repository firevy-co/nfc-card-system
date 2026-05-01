import React from "react";
import {
   FiShield,
   FiPhone,
   FiMail,
   FiMapPin,
   FiBriefcase,
   FiGlobe,
   FiClock,
   FiAward,
   FiCheckCircle,
   FiDownload,
   FiUserPlus,
} from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

const JusticePartners = ({ userData }) => {
   const {
      displayName = "Justice Partners",
      email = "counsel@justice.com",
      role = "Senior Legal Advisor",
      mobileNumber = "+1 (800) LEGAL",
      city = "Chicago",
      country = "USA",
      website = "www.justicepartners.com",
      address = "District Court Avenue",
      experience = "20+ Years Experience",
   } = userData || {};

   const location = [city, country].filter(Boolean).join(", ");

   return (
      <div className="min-h-screen bg-[#f8f4ef] font-serif text-[#1a1a1a] overflow-hidden">

         {/* HEADER IMAGE */}
         <div className="relative h-72 w-full">
            <img
               src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80"
               alt="Legal Office"
               className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#f8f4ef]" />

            <div className="absolute bottom-8 left-0 right-0 px-6 text-center">
               <div className="w-20 h-20 rounded-full bg-white mx-auto mb-4 flex items-center justify-center shadow-xl">
                  <FiShield size={34} className="text-[#c5a176]" />
               </div>

               <h1 className="text-3xl font-black italic text-white tracking-tight">
                  {displayName}
               </h1>

               <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#f5d6a8] mt-2">
                  {role}
               </p>
            </div>
         </div>

         {/* CONTENT */}
         <div className="px-5 py-6 max-w-md mx-auto">

            <div className="grid grid-cols-2 gap-3 mb-6">
               <div className="bg-white rounded-2xl p-4 text-center border border-[#eadfce]">
                  <FiClock className="mx-auto text-[#c5a176] mb-2" />
                  <p className="text-xs font-bold">{experience}</p>
               </div>

               <div className="bg-white rounded-2xl p-4 text-center border border-[#eadfce]">
                  <FiAward className="mx-auto text-[#c5a176] mb-2" />
                  <p className="text-xs font-bold">Trusted Firm</p>
               </div>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-[#eadfce] mb-6">
               <h3 className="text-sm font-black uppercase tracking-widest text-[#c5a176] mb-4">
                  Practice Areas
               </h3>

               <div className="space-y-3 text-sm">
                  {[
                     "Corporate Law",
                     "Civil Litigation",
                     "Property Matters",
                     "Family Cases",
                     "Legal Consultation",
                  ].map((item, i) => (
                     <div key={i} className="flex items-center gap-3">
                        <FiCheckCircle className="text-[#c5a176]" />
                        <span>{item}</span>
                     </div>
                  ))}
               </div>
            </div>

            <div className="space-y-3 mb-6">

               <a href={`tel:${mobileNumber}`} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#eadfce]">
                  <FiPhone className="text-[#c5a176]" />
                  <div>
                     <p className="text-[10px] uppercase font-bold text-[#8a7a6a]">Call Counsel</p>
                     <p className="text-sm font-bold">{mobileNumber}</p>
                  </div>
               </a>

               <a href={`mailto:${email}`} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#eadfce]">
                  <FiMail className="text-[#c5a176]" />
                  <div>
                     <p className="text-[10px] uppercase font-bold text-[#8a7a6a]">Email</p>
                     <p className="text-sm font-bold truncate">{email}</p>
                  </div>
               </a>

               <a href={`https://${website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#eadfce]">
                  <FiGlobe className="text-[#c5a176]" />
                  <div>
                     <p className="text-[10px] uppercase font-bold text-[#8a7a6a]">Official Website</p>
                     <p className="text-sm font-bold truncate">{website}</p>
                  </div>
               </a>

               <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#eadfce]">
                  <FiMapPin className="text-[#c5a176]" />
                  <div>
                     <p className="text-[10px] uppercase font-bold text-[#8a7a6a]">Office Address</p>
                     <p className="text-sm font-bold">{address}, {location}</p>
                  </div>
               </div>

            </div>

            <div className="space-y-3 mb-6">

               <button className="w-full py-5 bg-[#1a1a1a] text-[#c5a176] rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                  <FiBriefcase size={16} />
                  Consult Counsel
               </button>

               <button
                  onClick={() => downloadVCard(userData)}
                  className="w-full py-5 bg-white border border-[#c5a176] text-[#1a1a1a] rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3"
               >
                  <FiDownload size={16} />
                  Save Contact
               </button>

               <button className="w-full py-5 bg-[#c5a176] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                  <FiUserPlus size={16} />
                  Book Appointment
               </button>

            </div>

            <PoweredBy />
         </div>
      </div>
   );
};

export default JusticePartners;