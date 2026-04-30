import React from "react";
import * as FiIcons from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

const GrandEstate = ({ userData }) => {
   const {
      displayName = "Grand Estate",
      email = "hello@grandestate.com",
      role,
      mobileNumber,
      phone,
      companyName = "Luxury Property Group",
      designation,
      website = "https://www.grandestate.com",
      address,
      city,
      linkedin,
      instagram,
      facebook,
      twitter,
      bio,
      avatar,
      logo,
   } = userData || {};

   const displayPhone = mobileNumber || phone || "+91 99999 99999";
   const displayRole = designation || role || "Luxury Broker";
   const finalAddress = address || city || "Ahmedabad, Gujarat";

   const properties = [
      {
         title: "Skyline Penthouse",
         price: "₹3.2 Cr",
         image:
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
      },
      {
         title: "Modern Villa",
         price: "₹2.1 Cr",
         image:
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80",
      },
      {
         title: "Luxury Apartment",
         price: "₹1.4 Cr",
         image:
            "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
      },
   ];

   return (
      <div className="min-h-screen bg-black/95 font-serif pb-14 overflow-x-hidden">

         {/* HERO SECTION */}
         <div className="relative h-80 overflow-hidden rounded-b-[2.5rem]">
            <img
               src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80"
               alt="Luxury Home"
               className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>

            <div className="absolute bottom-8 left-0 right-0 text-center px-5">
               <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-white p-1 shadow-2xl">
                     <div className="w-full h-full rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center">
                        {avatar ? (
                           <img
                              src={avatar}
                              alt="Avatar"
                              className="w-full h-full object-cover"
                           />
                        ) : logo ? (
                           <img
                              src={logo}
                              alt="Logo"
                              className="w-full h-full object-cover"
                           />
                        ) : (
                           <FiIcons.FiHome
                              size={34}
                              className="text-white"
                           />
                        )}
                     </div>
                  </div>
               </div>

               <h1 className="text-white text-3xl font-semibold tracking-wide">
                  {displayName}
               </h1>

               <p className="text-white/80 text-sm mt-2 uppercase tracking-[0.3em]">
                  {displayRole}
               </p>

               <p className="text-[11px] text-white/60 mt-3 tracking-[0.2em] uppercase">
                  {companyName}
               </p>
            </div>
         </div>

         {/* BODY */}
         <div className="px-5 max-w-md mx-auto -mt-8 space-y-6">

            {/* BIO */}
            {(bio || true) && (
               <div className="bg-indigo-900/30 border border-indigo-800 rounded-2xl p-5 backdrop-blur">
                  <p className="text-indigo-100 text-sm italic leading-6 text-center">
                     "{bio || "Helping clients find premium homes, villas and investments with trusted guidance."}"
                  </p>
               </div>
            )}

            {/* STATS */}
            <div className="grid grid-cols-3 gap-3">
               {[
                  ["150+", "Listings"],
                  ["98+", "Clients"],
                  ["4.9★", "Rating"],
               ].map((item, i) => (
                  <div
                     key={i}
                     className="bg-indigo-900/30 border border-indigo-800 rounded-2xl p-4 text-center"
                  >
                     <h3 className="text-white font-black text-lg">
                        {item[0]}
                     </h3>
                     <p className="text-[10px] uppercase tracking-widest text-indigo-300 mt-1">
                        {item[1]}
                     </p>
                  </div>
               ))}
            </div>

            {/* FEATURED PROPERTIES */}
            <div>
               <h3 className="text-white text-sm uppercase tracking-[0.3em] mb-3">
                  Featured Estates
               </h3>

               <div className="space-y-4">
                  {properties.map((item, i) => (
                     <div
                        key={i}
                        className="bg-indigo-900/30 border border-indigo-800 rounded-2xl overflow-hidden"
                     >
                        <img
                           src={item.image}
                           alt={item.title}
                           className="w-full h-44 object-cover hover:scale-105 duration-500"
                        />

                        <div className="p-4 flex justify-between items-center">
                           <div>
                              <h4 className="text-white font-semibold">
                                 {item.title}
                              </h4>
                              <p className="text-indigo-300 text-sm font-bold">
                                 {item.price}
                              </p>
                           </div>

                           <FiIcons.FiArrowRight className="text-indigo-300" />
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* CONTACT INFO */}
            <div className="space-y-3">
               <a
                  href={`tel:${displayPhone}`}
                  className="flex items-center gap-4 bg-indigo-900/30 border border-indigo-800 rounded-2xl p-4"
               >
                  <FiIcons.FiPhone className="text-indigo-300" />
                  <span className="text-white">{displayPhone}</span>
               </a>

               <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 bg-indigo-900/30 border border-indigo-800 rounded-2xl p-4"
               >
                  <FiIcons.FiMail className="text-indigo-300" />
                  <span className="text-white truncate">{email}</span>
               </a>

               <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 bg-indigo-900/30 border border-indigo-800 rounded-2xl p-4"
               >
                  <FiIcons.FiGlobe className="text-indigo-300" />
                  <span className="text-white truncate">{website}</span>
               </a>

               <div className="flex items-center gap-4 bg-indigo-900/30 border border-indigo-800 rounded-2xl p-4">
                  <FiIcons.FiMapPin className="text-indigo-300" />
                  <span className="text-white">{finalAddress}</span>
               </div>
            </div>

            {/* SOCIAL */}
            <div className="flex justify-center gap-3 flex-wrap">
               {linkedin && (
                  <a href={linkedin} className="p-3 rounded-xl bg-indigo-900/40 text-indigo-200">
                     <FiIcons.FiLinkedin />
                  </a>
               )}
               {instagram && (
                  <a href={instagram} className="p-3 rounded-xl bg-indigo-900/40 text-indigo-200">
                     <FiIcons.FiInstagram />
                  </a>
               )}
               {facebook && (
                  <a href={facebook} className="p-3 rounded-xl bg-indigo-900/40 text-indigo-200">
                     <FiIcons.FiFacebook />
                  </a>
               )}
               {twitter && (
                  <a href={twitter} className="p-3 rounded-xl bg-indigo-900/40 text-indigo-200">
                     <FiIcons.FiTwitter />
                  </a>
               )}
            </div>

            {/* BUTTON */}
            <button
               onClick={() => downloadVCard(userData)}
               className="w-full py-5 bg-white text-indigo-950 rounded-2xl font-bold uppercase tracking-[0.2em] hover:bg-indigo-100 transition-all"
            >
               Save Contact
            </button>

            <PoweredBy />
         </div>
      </div>
   );
};

export default GrandEstate;