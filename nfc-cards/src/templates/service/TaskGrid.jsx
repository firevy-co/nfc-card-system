import React from "react";
import {
   FiCheckCircle,
   FiPhone,
   FiMail,
   FiGlobe,
   FiTool,
   FiMapPin,
   FiLinkedin,
   FiInstagram,
   FiTwitter,
   FiFacebook,
   FiYoutube,
   FiStar,
   FiClock,
   FiShield,
   FiDownload,
   FiArrowRight,
} from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

/**
 * FULLSCREEN TASK GRID
 * All inside margins removed
 * Clean edge-to-edge layout
 */

const TaskGrid = ({ userData }) => {
   const {
      displayName = "Expert Node",
      email = "hello@expertnode.com",
      phone = "+91 99999 99999",
      website = "https://www.expertnode.com",
      address = "Ahmedabad, Gujarat",
      linkedin,
      instagram,
      facebook,
      twitter,
      youtube,
      logo,
      experience = "10+ Years Experience",
      timing = "Open • 9 AM to 9 PM",
   } = userData || {};

   const services = [
      "Installation Services",
      "Repair & Maintenance",
      "Network Setup",
      "Software Support",
   ];

   const reviews = [
      {
         name: "Rakesh Patel",
         msg: "Excellent service and professional team.",
      },
      {
         name: "Neha Shah",
         msg: "Quick response and affordable pricing.",
      },
   ];

   return (
      <div className="min-h-screen bg-slate-50 md:bg-neutral-950 font-['Mulish',sans-serif]">
         <div className="w-full max-w-sm mx-auto min-h-screen bg-white shadow-2xl overflow-hidden">

            {/* HERO IMAGE */}
            <div className="relative h-44">
               <img
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80"
                  alt="Business"
                  className="w-full h-full object-cover"
               />

               <div className="absolute inset-0 bg-black/30"></div>

               <div className="absolute -bottom-10 left-0 right-0 flex justify-center">
                  <div className="w-24 h-24 bg-white rounded-[1.7rem] shadow-2xl overflow-hidden flex items-center justify-center">
                     {logo ? (
                        <img
                           src={logo}
                           alt="Logo"
                           className="w-full h-full object-cover"
                        />
                     ) : (
                        <FiTool size={34} className="text-slate-900" />
                     )}
                  </div>
               </div>
            </div>

            {/* CONTENT */}
            <div className="pt-14 pb-8">

               {/* NAME */}
               <div className="text-center px-4">
                  <h1 className="text-2xl font-black uppercase tracking-tight">
                     {displayName}
                  </h1>
               </div>

               {/* QUICK INFO */}
               <div className="grid grid-cols-2 gap-2 mt-6 px-2">
                  <div className="bg-slate-100 rounded-2xl p-4 text-center">
                     <FiClock className="mx-auto text-slate-700 mb-2" />
                     <p className="text-[11px] font-bold">{timing}</p>
                  </div>

                  <div className="bg-slate-100 rounded-2xl p-4 text-center">
                     <FiShield className="mx-auto text-slate-700 mb-2" />
                     <p className="text-[11px] font-bold">{experience}</p>
                  </div>
               </div>

               {/* CONTACT */}
               <div className="mt-6 space-y-2 px-2">
                  <a
                     href={`tel:${phone}`}
                     className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4"
                  >
                     <FiPhone />
                     <span className="text-sm">{phone}</span>
                  </a>

                  <a
                     href={`mailto:${email}`}
                     className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4"
                  >
                     <FiMail />
                     <span className="text-sm truncate">{email}</span>
                  </a>

                  <a
                     href={website}
                     target="_blank"
                     rel="noreferrer"
                     className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4"
                  >
                     <FiGlobe />
                     <span className="text-sm truncate">{website}</span>
                  </a>

                  <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-4">
                     <FiMapPin />
                     <span className="text-sm">{address}</span>
                  </div>
               </div>

               {/* SERVICES */}
               <div className="mt-6 px-2">
                  <h3 className="font-black text-sm uppercase tracking-widest mb-2 px-2">
                     Services
                  </h3>

                  <div className="grid grid-cols-2 gap-2">
                     {services.map((item, index) => (
                        <div
                           key={index}
                           className="bg-slate-100 rounded-2xl p-4 text-center"
                        >
                           <FiCheckCircle className="mx-auto mb-2 text-slate-700" />
                           <p className="text-[11px] font-bold">{item}</p>
                        </div>
                     ))}
                  </div>
               </div>

               {/* BUTTONS */}
               <div className="space-y-2 mt-6 px-2">
                  <a
                     href={website}
                     target="_blank"
                     rel="noreferrer"
                     className="w-full bg-slate-900 text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-[11px] uppercase"
                  >
                     Visit Website <FiArrowRight />
                  </a>

                  <button
                     onClick={() => downloadVCard(userData)}
                     className="w-full bg-slate-100 py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-[11px] uppercase"
                  >
                     <FiDownload />
                     Save Contact
                  </button>

                  <a
                     href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        address
                     )}`}
                     target="_blank"
                     rel="noreferrer"
                     className="w-full bg-slate-100 py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-[11px] uppercase"
                  >
                     <FiMapPin />
                     View on Map
                  </a>
               </div>

               {/* SOCIAL */}
               <div className="flex justify-center gap-2 flex-wrap mt-6 px-2">
                  {instagram && (
                     <a href={instagram} className="p-3 bg-slate-100 rounded-xl">
                        <FiInstagram />
                     </a>
                  )}
                  {linkedin && (
                     <a href={linkedin} className="p-3 bg-slate-100 rounded-xl">
                        <FiLinkedin />
                     </a>
                  )}
                  {facebook && (
                     <a href={facebook} className="p-3 bg-slate-100 rounded-xl">
                        <FiFacebook />
                     </a>
                  )}
                  {twitter && (
                     <a href={twitter} className="p-3 bg-slate-100 rounded-xl">
                        <FiTwitter />
                     </a>
                  )}
                  {youtube && (
                     <a href={youtube} className="p-3 bg-slate-100 rounded-xl">
                        <FiYoutube />
                     </a>
                  )}
               </div>

               {/* REVIEWS */}
               <div className="mt-6 px-2">
                  <h3 className="font-black text-sm uppercase tracking-widest mb-2 px-2">
                     Reviews
                  </h3>

                  <div className="space-y-2">
                     {reviews.map((review, index) => (
                        <div key={index} className="bg-slate-50 rounded-2xl p-4">
                           <div className="flex gap-1 text-amber-500 mb-2">
                              <FiStar /><FiStar /><FiStar /><FiStar /><FiStar />
                           </div>
                           <p className="text-xs text-slate-600">{review.msg}</p>
                           <p className="text-xs font-bold mt-2">{review.name}</p>
                        </div>
                     ))}
                  </div>
               </div>

               {/* FOOTER */}
               <div className="mt-6 px-2">
                  <PoweredBy />
               </div>

            </div>
         </div>
      </div>
   );
};

export default TaskGrid;