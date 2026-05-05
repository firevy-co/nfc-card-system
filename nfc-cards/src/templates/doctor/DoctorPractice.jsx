import React from "react";
import * as FiIcons from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

const InfoRow = ({ icon: Icon, label, value, href }) => {
   if (!value) return null;

   const Tag = href ? "a" : "div";

   return (
      <Tag
         href={href}
         target={href ? "_blank" : undefined}
         rel={href ? "noopener noreferrer" : undefined}
         className="flex items-start gap-3 bg-white/90 backdrop-blur-sm border border-teal-100 rounded-2xl p-4 hover:shadow-md transition-all"
      >
         <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
            <Icon size={18} />
         </div>

         <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-bold mb-1">
               {label}
            </p>
            <p className="text-sm text-gray-700 font-semibold break-words">
               {value}
            </p>
         </div>
      </Tag>
   );
};

const Chip = ({ text }) => (
   <div className="px-3 py-2 rounded-full bg-teal-50 text-teal-700 text-[11px] font-bold border border-teal-100">
      {text}
   </div>
);

const HospitalCard = ({ userData }) => {
   const {
      displayName,
      website,
      email,
      phone,
      address,
      linkedin,
      instagram,
      logo,
   } = userData || {};

   const services = [
      "Heart Care",
      "Dental",
      "Physiotherapy",
      "General Checkup",
      "Nutrition",
      "Emergency Care",
   ];

   const wellness = [
      "Morning Yoga",
      "Daily Walk Plans",
      "Diet Coaching",
      "Stress Relief",
   ];

   return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-100 flex justify-center font-['Mulish']">
         <div className="w-full max-w-sm bg-white shadow-2xl overflow-hidden">

            {/* HERO */}
            <div className="relative">
               <img
                  src="https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg"
                  alt="healthcare"
                  className="w-full h-64 object-cover"
               />

               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

               {/* WAVE */}
               <svg
                  viewBox="0 0 500 80"
                  preserveAspectRatio="none"
                  className="absolute bottom-0 left-0 w-full h-14"
               >
                  <path
                     d="M0,40 C120,90 280,0 500,45 L500,80 L0,80 Z"
                     className="fill-white"
                  />
               </svg>

               <div className="absolute bottom-8 left-5 right-5 flex items-end gap-4">
                  <div className="w-20 h-20 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-white shrink-0">
                     {logo ? (
                        <img
                           src={logo}
                           alt="logo"
                           className="w-full h-full object-contain p-2"
                        />
                     ) : (
                        <img
                           src="https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg"
                           alt="doctor"
                           className="w-full h-full object-cover"
                        />
                     )}
                  </div>

                  <div className="pb-1 text-white">
                     <h1 className="text-2xl font-black leading-tight">
                        {displayName || "WellCare Center"}
                     </h1>
                     <p className="text-xs tracking-[0.25em] uppercase text-cyan-100 font-bold">
                        Healthcare & Wellness
                     </p>
                  </div>
               </div>
            </div>

            {/* CONTENT */}
            <div className="px-4 pb-6">

               {/* ABOUT */}
               <div className="mt-4 bg-teal-50 rounded-2xl p-4 border border-teal-100">
                  <h3 className="text-sm font-black text-teal-700 mb-2">
                     About Us
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                     Modern healthcare center focused on prevention, treatment,
                     fitness recovery, wellness coaching, and family care.
                  </p>
               </div>

               {/* CONTACT */}
               <div className="mt-4 space-y-3">
                  <InfoRow
                     icon={FiIcons.FiPhone}
                     label="Phone"
                     value={phone}
                     href={phone ? `tel:${phone}` : null}
                  />

                  <InfoRow
                     icon={FiIcons.FiMail}
                     label="Email"
                     value={email}
                     href={email ? `mailto:${email}` : null}
                  />

                  <InfoRow
                     icon={FiIcons.FiGlobe}
                     label="Website"
                     value={website}
                     href={website}
                  />

                  <InfoRow
                     icon={FiIcons.FiMapPin}
                     label="Address"
                     value={address}
                  />
               </div>

               {/* SERVICES */}
               <div className="mt-5">
                  <h3 className="text-sm font-black text-gray-800 mb-3">
                     Services
                  </h3>

                  <div className="flex flex-wrap gap-2">
                     {services.map((item, i) => (
                        <Chip key={i} text={item} />
                     ))}
                  </div>
               </div>

               {/* WELLNESS IMAGE */}
               <div className="mt-5 rounded-3xl overflow-hidden relative">
                  <img
                     src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg"
                     alt="yoga"
                     className="w-full h-44 object-cover"
                  />

                  <div className="absolute inset-0 bg-black/25" />

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                     <p className="text-lg font-black">Morning Wellness Programs</p>
                     <p className="text-xs opacity-90">
                        Yoga • Meditation • Stretching
                     </p>
                  </div>
               </div>

               {/* WELLNESS */}
               <div className="mt-5 grid grid-cols-2 gap-2">
                  {wellness.map((item, i) => (
                     <div
                        key={i}
                        className="bg-cyan-50 border border-cyan-100 rounded-2xl p-3 text-center text-xs font-bold text-cyan-700"
                     >
                        {item}
                     </div>
                  ))}
               </div>

               {/* SOCIAL */}
               <div className="mt-5 flex justify-center gap-3">
                  {linkedin && (
                     <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-2xl bg-white border border-gray-200 flex items-center justify-center"
                     >
                        <FiIcons.FiLinkedin />
                     </a>
                  )}

                  {instagram && (
                     <a
                        href={instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-2xl bg-white border border-gray-200 flex items-center justify-center"
                     >
                        <FiIcons.FiInstagram />
                     </a>
                  )}
               </div>

               {/* ACTIONS */}
               <div className="mt-5 space-y-3">
                  {website && (
                     <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-teal-600 text-white text-center py-3 rounded-2xl font-bold"
                     >
                        Book Appointment
                     </a>
                  )}

                  {address && (
                     <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                           address
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full border border-teal-600 text-teal-700 text-center py-3 rounded-2xl font-bold"
                     >
                        View Location
                     </a>
                  )}

                  <button
                     onClick={() => downloadVCard(userData)}
                     className="w-full bg-gray-900 text-white py-3 rounded-2xl font-bold"
                  >
                     Save Contact
                  </button>
               </div>

               <div className="mt-5">
                  <PoweredBy />
               </div>
            </div>
         </div>
      </div>
   );
};

export default HospitalCard;