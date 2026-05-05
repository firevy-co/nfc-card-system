import React from 'react';
import {
   FiPhone, FiMail, FiMapPin, FiGlobe,
   FiInstagram, FiTwitter, FiLinkedin, FiYoutube,
   FiUserPlus, FiActivity, FiClock
} from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const InfoRow = ({ icon: Icon, label, value, href }) => {
   if (!value) return null;

   const Comp = href ? "a" : "div";

   return (
      <Comp
         href={href}
         target={href?.startsWith("http") ? "_blank" : undefined}
         rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
         className="flex items-center gap-4 py-3"
      >
         <div className="w-10 h-10 rounded-xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center">
            <Icon size={18} />
         </div>
         <div>
            <p className="text-xs text-slate-400">{label}</p>
            <p className="text-sm font-semibold text-white">{value}</p>
         </div>
      </Comp>
   );
};

const SectionCard = ({ title, children }) => (
   <div className="bg-slate-900 rounded-2xl p-4 border border-white/10">
      <h3 className="text-xs uppercase tracking-widest text-[#0ea5e9] mb-3 font-bold">
         {title}
      </h3>
      {children}
   </div>
);

const UrbanBistro = ({ userData }) => {
   const {
      displayName,
      email,
      phone,
      website,
      address,
      youtube,
      linkedin,
      twitter,
      instagram,
      logo,
   } = userData || {};

   const services = [
      "Cardiology",
      "Neurology",
      "Orthopedic",
      "Pediatrics",
      "Radiology",
      "General Surgery",
   ];

   const facilities = [
      "24/7 Emergency",
      "ICU Support",
      "Ambulance",
      "Pharmacy",
      "Lab Testing",
      "Insurance",
   ];

   return (
      <div className="min-h-screen bg-slate-950 text-white font-['Inter']">

         {/* HEADER */}
         <div className="bg-gradient-to-b from-[#0ea5e9] to-slate-950 px-6 pt-10 pb-6">
            <div className="flex items-center gap-4">
               <div className="w-20 h-20 rounded-2xl bg-white overflow-hidden shadow-lg">
                  {logo ? (
                     <img src={logo} alt="logo" className="w-full h-full object-cover" />
                  ) : (
                     <div className="w-full h-full flex items-center justify-center text-[#0ea5e9]">
                        <FiActivity size={32} />
                     </div>
                  )}
               </div>

               <div>
                  <h1 className="text-xl font-bold">
                     {displayName || "CityCare Hospital"}
                  </h1>
                  <p className="text-xs text-white/70">
                     Advanced Healthcare & Multi-Speciality
                  </p>
               </div>
            </div>

            {/* Emergency */}
            {phone && (
               <div className="mt-4 bg-red-500/90 text-center py-2 rounded-xl text-sm font-bold animate-pulse">
                  🚨 Emergency: {phone}
               </div>
            )}
         </div>

         {/* CONTENT */}
         <div className="px-4 py-5 space-y-4">

            {/* CONTACT */}
            <SectionCard title="Contact Information">
               <InfoRow icon={FiPhone} label="Phone" value={phone} href={`tel:${phone}`} />
               <InfoRow icon={FiMail} label="Email" value={email} href={`mailto:${email}`} />
               <InfoRow icon={FiGlobe} label="Website" value={website} href={website} />
               <InfoRow icon={FiMapPin} label="Address" value={address} />
            </SectionCard>

            {/* SERVICES */}
            <SectionCard title="Departments">
               <div className="grid grid-cols-2 gap-2">
                  {services.map((item, i) => (
                     <div key={i} className="bg-slate-800 text-xs py-2 rounded-xl text-center">
                        {item}
                     </div>
                  ))}
               </div>
            </SectionCard>

            {/* FACILITIES */}
            <SectionCard title="Facilities">
               <div className="grid grid-cols-2 gap-2">
                  {facilities.map((item, i) => (
                     <div key={i} className="bg-slate-800 text-xs py-2 rounded-xl text-center">
                        {item}
                     </div>
                  ))}
               </div>
            </SectionCard>

            {/* TIMING */}
            <SectionCard title="OPD Timings">
               <div className="flex items-center gap-3 text-sm">
                  <FiClock />
                  <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
               </div>
               <p className="text-xs text-slate-400 mt-2">
                  Sunday: Emergency Only
               </p>
            </SectionCard>

            {/* SOCIAL */}
            <div className="flex justify-center gap-4 py-2">
               {instagram && <a href={instagram}><FiInstagram /></a>}
               {youtube && <a href={youtube}><FiYoutube /></a>}
               {twitter && <a href={twitter}><FiTwitter /></a>}
               {linkedin && <a href={linkedin}><FiLinkedin /></a>}
            </div>

            {/* BUTTON */}
            <button
               onClick={() => downloadVCard(userData)}
               className="w-full bg-[#0ea5e9] py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
            >
               <FiUserPlus /> Save Contact
            </button>

            <PoweredBy />
         </div>
      </div>
   );
};

export default UrbanBistro;