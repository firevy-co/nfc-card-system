import React, { useState } from "react";
import {
   FiActivity,
   FiPhone,
   FiMail,
   FiMapPin,
   FiGlobe,
   FiInstagram,
   FiTwitter,
   FiLinkedin,
   FiYoutube,
   FiUserPlus,
   FiStar,
   FiChevronLeft,
   FiChevronRight,
} from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

/* ---------------- LINK ---------------- */
const PureLink = ({ icon: Icon, label, value, href }) => {
   if (!value) return null;

   const Tag = href ? "a" : "div";

   return (
      <Tag
         href={href}
         target={href && href.startsWith("http") ? "_blank" : undefined}
         rel={href && href.startsWith("http") ? "noopener noreferrer" : undefined}
         className="flex items-center justify-between bg-white p-3 rounded-2xl border border-emerald-100"
      >
         <div className="flex items-center gap-3">
            <Icon className="text-emerald-500" size={15} />
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
               {label}
            </span>
         </div>

         <span className="text-sm font-semibold text-gray-700 truncate max-w-[140px]">
            {value}
         </span>
      </Tag>
   );
};

/* ---------------- SOCIAL ---------------- */
const PureSocial = ({ icon: Icon, href }) => {
   if (!href) return null;

   return (
      <a
         href={href}
         target="_blank"
         rel="noopener noreferrer"
         className="w-10 h-10 rounded-xl bg-white border border-emerald-100 flex items-center justify-center text-emerald-500"
      >
         <Icon size={16} />
      </a>
   );
};

/* ---------------- MAIN ---------------- */
const PureHealth = ({ userData }) => {
   const {
      displayName,
      email,
      phone,
      website,
      address,
      instagram,
      linkedin,
      twitter,
      youtube,
      logo,
      bio,
   } = userData || {};

   const services = [
      "Cardiology",
      "Neurology",
      "Orthopedic",
      "Emergency",
      "Diagnostics",
      "ICU Care",
   ];

   const facilities = [
      "24/7 Ambulance",
      "Modern Lab",
      "Pharmacy",
      "Insurance Help",
   ];

   const reviews = [
      { name: "Ravi", text: "Excellent treatment and care.", rating: 5 },
      { name: "Priya", text: "Very clean hospital and good staff.", rating: 5 },
      { name: "Amit", text: "Fast service and professional doctors.", rating: 4 },
   ];

   const [i, setI] = useState(0);
   const [bioOpen, setBioOpen] = useState(false);

   const next = () => setI((i + 1) % reviews.length);
   const prev = () => setI((i - 1 + reviews.length) % reviews.length);

   return (
      <div className="min-h-screen bg-white flex justify-center font-sans">

         <div className="w-full max-w-sm bg-emerald-50 overflow-hidden">

            {/* ================= HEADER WITH WAVE ================= */}
            <div className="relative">

               {/* WAVE BACKGROUND */}
               <div className="absolute top-0 left-0 w-full">
                  <svg viewBox="0 0 1440 320" className="w-full">
                     <path
                        fill="#10b981"
                        fillOpacity="1"
                        d="M0,192L80,181.3C160,171,320,149,480,160C640,171,800,213,960,229.3C1120,245,1280,235,1360,229.3L1440,224V0H0Z"
                     />
                  </svg>
               </div>

               {/* HEADER CONTENT */}
               <div className="relative pt-8 pb-14 flex flex-col items-center">

                  {/* LOGO FIX (IMPORTANT) */}
                  <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-xl flex items-center justify-center overflow-hidden p-2">
                     {logo ? (
                        <img
                           src={logo}
                           alt="logo"
                           className="w-full h-full object-contain"
                        />
                     ) : (
                        <FiActivity size={30} className="text-emerald-600" />
                     )}
                  </div>

                  <h1 className="mt-3 text-xl font-black text-gray-800">
                     {displayName || "Pure Health"}
                  </h1>

                  <p className="text-xs text-gray-500 uppercase tracking-widest">
                     Healthcare Center
                  </p>
               </div>
            </div>

            {/* ================= BODY ================= */}
            <div className="px-4 pb-6 space-y-4">

               {/* CONTACT */}
               <PureLink icon={FiPhone} label="Call" value={phone} href={`tel:${phone}`} />
               <PureLink icon={FiMail} label="Email" value={email} href={`mailto:${email}`} />
               <PureLink icon={FiGlobe} label="Website" value={website} href={website} />
               <PureLink icon={FiMapPin} label="Address" value={address} />

               {/* BIO TOGGLE */}
               <div className="bg-white p-4 rounded-2xl border border-emerald-100">
                  <button
                     onClick={() => setBioOpen(!bioOpen)}
                     className="w-full flex justify-between items-center font-bold text-sm text-gray-700"
                  >
                     <span>About & Philosophy</span>
                     <span className="text-emerald-500 font-bold text-lg leading-none">
                        {bioOpen ? "−" : "+"}
                     </span>
                  </button>
                  {bioOpen && (
                     <p className="mt-3 text-xs text-gray-600 leading-relaxed">
                        {bio || "Committed to delivering world-class healthcare with compassionate care and state-of-the-art medical technology."}
                     </p>
                  )}
               </div>

               {/* SERVICES */}
               <div>
                  <h2 className="text-xs font-black tracking-widest text-gray-600 mt-3 mb-2">
                     Services
                  </h2>

                  <div className="grid grid-cols-2 gap-2">
                     {services.map((s, idx) => (
                        <div
                           key={idx}
                           className="bg-white text-center p-2 rounded-xl border text-xs font-semibold"
                        >
                           {s}
                        </div>
                     ))}
                  </div>
               </div>

               {/* FACILITIES */}
               <div>
                  <h2 className="text-xs font-black tracking-widest text-gray-600 mt-3 mb-2">
                     Facilities
                  </h2>

                  <div className="grid grid-cols-2 gap-2">
                     {facilities.map((f, idx) => (
                        <div
                           key={idx}
                           className="bg-emerald-100 text-center p-2 rounded-xl text-xs font-semibold"
                        >
                           {f}
                        </div>
                     ))}
                  </div>
               </div>

               {/* REVIEWS */}
               <div className="bg-white p-3 rounded-2xl border">
                  <div className="flex gap-1 text-yellow-500">
                     {[...Array(reviews[i].rating)].map((_, k) => (
                        <FiStar key={k} size={14} />
                     ))}
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                     "{reviews[i].text}"
                  </p>

                  <p className="text-xs font-bold text-gray-500 mt-1">
                     - {reviews[i].name}
                  </p>

                  <div className="flex justify-between mt-2">
                     <button onClick={prev}>
                        <FiChevronLeft />
                     </button>
                     <button onClick={next}>
                        <FiChevronRight />
                     </button>
                  </div>
               </div>

               {/* SOCIAL */}
               <div className="flex justify-center gap-2">
                  <PureSocial icon={FiInstagram} href={instagram} />
                  <PureSocial icon={FiLinkedin} href={linkedin} />
                  <PureSocial icon={FiTwitter} href={twitter} />
                  <PureSocial icon={FiYoutube} href={youtube} />
               </div>

               {/* BUTTON */}
               <button
                  onClick={() => downloadVCard(userData)}
                  className="w-full bg-emerald-500 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2"
               >
                  <FiUserPlus /> Save Contact
               </button>

               <PoweredBy />
            </div>
         </div>
      </div>
   );
};

export default PureHealth;