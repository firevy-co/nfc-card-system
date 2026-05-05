import React, { useState } from "react";
import {
   FiPhone,
   FiMail,
   FiGlobe,
   FiMapPin,
   FiInstagram,
   FiTwitter,
   FiYoutube,
   FiLinkedin,
   FiUserPlus,
   FiActivity,
   FiStar,
   FiShield,
   FiClock,
   FiCheckCircle,
   FiChevronLeft,
   FiChevronRight,
} from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

const InfoCard = ({ icon: Icon, label, value, href }) => {
   if (!value) return null;

   const Tag = href ? "a" : "div";

   return (
      <Tag
         href={href}
         target={href && href.startsWith("http") ? "_blank" : undefined}
         rel={href && href.startsWith("http") ? "noopener noreferrer" : undefined}
         className="flex items-center gap-4 bg-gray-100 hover:bg-gray-200 rounded-2xl p-4 transition-all duration-300"
      >
         <div className="w-11 h-11 rounded-xl bg-white shadow flex items-center justify-center">
            <Icon className="text-gray-700" size={18} />
         </div>

         <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[3px] text-gray-400 font-bold">
               {label}
            </p>
            <p className="text-sm font-semibold text-gray-800 truncate">{value}</p>
         </div>
      </Tag>
   );
};

const SocialIcon = ({ icon: Icon, href }) => {
   if (!href) return null;

   return (
      <a
         href={href}
         target="_blank"
         rel="noopener noreferrer"
         className="w-12 h-12 rounded-2xl bg-gray-100 hover:bg-gray-900 hover:text-white transition-all duration-300 flex items-center justify-center text-gray-700"
      >
         <Icon size={18} />
      </a>
   );
};

const NightConnect = ({ userData }) => {
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

   const reviews = [
      {
         name: "Rohan Shah",
         text: "Excellent service and friendly staff. Very clean environment.",
         rating: 5,
      },
      {
         name: "Priya Patel",
         text: "Doctors are highly professional and helpful.",
         rating: 5,
      },
      {
         name: "Amit Joshi",
         text: "Quick response and premium facilities available.",
         rating: 4,
      },
   ];

   const [reviewIndex, setReviewIndex] = useState(0);

   const nextReview = () =>
      setReviewIndex((prev) => (prev + 1) % reviews.length);

   const prevReview = () =>
      setReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

   return (
      <div className="min-h-screen bg-gray-200 flex justify-center font-['Inter',sans-serif]">
         <div className="w-full max-w-sm bg-white shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-700 px-6 pt-10 pb-8 text-center relative">
               <div className="absolute w-40 h-40 bg-white/10 rounded-full blur-3xl top-0 left-1/2 -translate-x-1/2 animate-pulse"></div>

               <div className="relative z-10 w-24 h-24 mx-auto rounded-[2rem] bg-white shadow-xl overflow-hidden flex items-center justify-center mb-5">
                  {logo ? (
                     <img src={logo} alt="logo" className="w-full h-full object-cover" />
                  ) : (
                     <FiActivity className="text-gray-700" size={34} />
                  )}
               </div>

               <h1 className="text-2xl font-black text-white uppercase tracking-[3px] relative z-10">
                  {displayName || "Care Hospital"}
               </h1>

               <p className="text-xs text-gray-300 mt-2 tracking-[4px] uppercase relative z-10">
                  Premium Healthcare
               </p>
            </div>

            {/* CONTACT */}
            <div className="p-5 space-y-3">
               {phone && (
                  <a
                     href={`tel:${phone}`}
                     className="flex items-center gap-4 bg-gray-900 text-white rounded-2xl px-4 py-4 hover:scale-[1.02] transition-all"
                  >
                     <div className="w-11 h-11 rounded-xl bg-white text-gray-900 flex items-center justify-center">
                        <FiPhone size={18} />
                     </div>

                     <div>
                        <p className="text-[10px] uppercase tracking-[3px] text-gray-300">
                           Call
                        </p>
                        <p className="text-sm font-semibold">{phone}</p>
                     </div>
                  </a>
               )}

               <InfoCard icon={FiMail} label="Email" value={email} href={`mailto:${email}`} />
               <InfoCard icon={FiGlobe} label="Website" value={website} href={website} />
               <InfoCard icon={FiMapPin} label="Location" value={address} />
            </div>

            {/* FEATURES */}
            <div className="px-5 pb-5">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[3px] mb-4">
                  Features
               </h3>

               <div className="grid grid-cols-2 gap-3">
                  {[
                     ["24/7 Service", FiClock],
                     ["Trusted Staff", FiShield],
                     ["Modern Equip.", FiCheckCircle],
                     ["Top Rated", FiStar],
                  ].map(([title, Icon], i) => (
                     <div
                        key={i}
                        className="bg-gray-100 rounded-2xl p-4 text-center hover:shadow-lg transition-all"
                     >
                        <Icon className="mx-auto mb-2 text-gray-700" size={18} />
                        <p className="text-xs font-semibold text-gray-700">{title}</p>
                     </div>
                  ))}
               </div>
            </div>

            {/* SOCIAL */}
            <div className="px-5 pb-5">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[3px] mb-4">
                  Social Media
               </h3>

               <div className="flex justify-center gap-3 flex-wrap">
                  <SocialIcon icon={FiInstagram} href={instagram} />
                  <SocialIcon icon={FiTwitter} href={twitter} />
                  <SocialIcon icon={FiYoutube} href={youtube} />
                  <SocialIcon icon={FiLinkedin} href={linkedin} />
               </div>
            </div>

            {/* PATIENT REVIEW */}
            <div className="px-5 pb-5">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[3px] mb-4">
                  Patient Reviews
               </h3>

               <div className="bg-gray-100 rounded-2xl p-5 relative">
                  <div className="flex gap-1 mb-2">
                     {[...Array(reviews[reviewIndex].rating)].map((_, i) => (
                        <FiStar key={i} size={14} className="text-yellow-500 fill-yellow-500" />
                     ))}
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                     "{reviews[reviewIndex].text}"
                  </p>

                  <p className="text-xs font-bold text-gray-500 uppercase tracking-[2px]">
                     {reviews[reviewIndex].name}
                  </p>

                  <div className="flex justify-between mt-4">
                     <button
                        onClick={prevReview}
                        className="w-9 h-9 rounded-xl bg-white shadow flex items-center justify-center"
                     >
                        <FiChevronLeft />
                     </button>

                     <button
                        onClick={nextReview}
                        className="w-9 h-9 rounded-xl bg-white shadow flex items-center justify-center"
                     >
                        <FiChevronRight />
                     </button>
                  </div>
               </div>
            </div>

            {/* BUTTON */}
            <div className="px-5 pb-5">
               <button
                  onClick={() => downloadVCard(userData)}
                  className="w-full bg-gray-900 hover:bg-black text-white rounded-2xl py-4 flex items-center justify-center gap-3 font-bold uppercase tracking-[3px] text-xs transition-all"
               >
                  <FiUserPlus size={18} />
                  Save Contact
               </button>
            </div>

            {/* FOOTER */}
            <div className="px-5 pb-6">
               <PoweredBy />
            </div>
         </div>
      </div>
   );
};

export default NightConnect;