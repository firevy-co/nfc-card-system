import React from "react";
import * as FiIcons from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

const PixelProperty = ({ userData }) => {
   const {
      displayName,
      email,
      role,
      mobileNumber,
      phone,
      companyName,
      designation,
      website,
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

   const displayPhone = mobileNumber || phone;
   const displayRole = designation || role || "Digital Agent";
   const finalAddress = address || city;

   const services = [
      {
         icon: <FiIcons.FiHome size={20} />,
         title: "Smart Homes",
         text: "Modern homes with premium facilities",
      },
      {
         icon: <FiIcons.FiMap size={20} />,
         title: "Area Scan",
         text: "Best locations & investment zones",
      },
      {
         icon: <FiIcons.FiVideo size={20} />,
         title: "Virtual Tours",
         text: "Live property walkthrough online",
      },
      {
         icon: <FiIcons.FiTrendingUp size={20} />,
         title: "Growth Deals",
         text: "High ROI investment properties",
      },
   ];

   return (
      <div className="min-h-screen bg-[#020202] font-mono text-emerald-400 pb-12 overflow-x-hidden relative">
         {/* GRID BACKGROUND */}
         <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(#10b981_1px,transparent_1px),linear-gradient(90deg,#10b981_1px,transparent_1px)] bg-[size:24px_24px]" />

         <div className="relative z-10 max-w-md mx-auto px-5 pt-6">

            {/* HERO IMAGE */}
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 shadow-2xl mb-6">
               <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
                  alt="Property"
                  className="w-full h-52 object-cover"
               />

               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

               <div className="absolute bottom-4 left-4 right-4 flex items-end gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-emerald-400 bg-black shrink-0">
                     {logo ? (
                        <img
                           src={logo}
                           alt="Logo"
                           className="w-full h-full object-cover"
                        />
                     ) : avatar ? (
                        <img
                           src={avatar}
                           alt="Avatar"
                           className="w-full h-full object-cover"
                        />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center">
                           <FiIcons.FiMonitor size={28} />
                        </div>
                     )}
                  </div>

                  <div className="overflow-hidden">
                     <h1 className="text-xl font-bold uppercase tracking-wide text-white truncate">
                        {displayName || "Pixel Property"}
                     </h1>

                     <p className="text-[11px] text-emerald-400 uppercase tracking-[0.3em] truncate">
                        {displayRole}
                     </p>
                  </div>
               </div>
            </div>

            {/* COMPANY */}
            {companyName && (
               <div className="mb-5 border border-emerald-500/20 bg-emerald-950/20 rounded-xl p-4">
                  <p className="text-[10px] uppercase tracking-widest text-emerald-600 mb-2">
                     COMPANY_NODE
                  </p>
                  <p className="text-sm text-emerald-300 font-bold">{companyName}</p>
               </div>
            )}

            {/* BIO */}
            {bio && (
               <div className="mb-6 border-l-2 border-emerald-500 pl-4">
                  <p className="text-[10px] uppercase tracking-widest text-emerald-600 mb-2">
                     PROFILE_DATA
                  </p>
                  <p className="text-xs text-emerald-300/80 leading-6">"{bio}"</p>
               </div>
            )}

            {/* CONTACT */}
            <div className="space-y-3 mb-7">
               {displayPhone && (
                  <a
                     href={`tel:${displayPhone}`}
                     className="flex items-center gap-4 bg-black border border-emerald-500/30 rounded-xl p-4 hover:bg-emerald-950/30 transition-all"
                  >
                     <FiIcons.FiPhone />
                     <span className="text-xs uppercase truncate">
                        {displayPhone}
                     </span>
                  </a>
               )}

               {email && (
                  <a
                     href={`mailto:${email}`}
                     className="flex items-center gap-4 bg-black border border-emerald-500/30 rounded-xl p-4 hover:bg-emerald-950/30 transition-all"
                  >
                     <FiIcons.FiMail />
                     <span className="text-xs uppercase truncate">{email}</span>
                  </a>
               )}

               {website && (
                  <a
                     href={website}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500 rounded-xl p-4 hover:bg-emerald-500/20 transition-all"
                  >
                     <div className="flex items-center gap-4 overflow-hidden">
                        <FiIcons.FiGlobe />
                        <span className="text-xs uppercase font-bold truncate">
                           View Listings
                        </span>
                     </div>
                     <FiIcons.FiArrowRight />
                  </a>
               )}

               {finalAddress && (
                  <div className="flex items-center gap-4 bg-black border border-emerald-500/30 rounded-xl p-4">
                     <FiIcons.FiMapPin />
                     <span className="text-xs uppercase truncate">
                        {finalAddress}
                     </span>
                  </div>
               )}
            </div>

            {/* SERVICES */}
            <div className="mb-8">
               <p className="text-[10px] uppercase tracking-widest text-emerald-600 mb-4">
                  SERVICE_MODULES
               </p>

               <div className="grid grid-cols-2 gap-3">
                  {services.map((item, i) => (
                     <div
                        key={i}
                        className="border border-emerald-500/20 bg-emerald-950/20 rounded-xl p-4 hover:bg-emerald-900/20 transition-all"
                     >
                        <div className="mb-3 text-emerald-400">{item.icon}</div>
                        <h3 className="text-[11px] font-bold uppercase mb-2">
                           {item.title}
                        </h3>
                        <p className="text-[10px] text-emerald-300/70 leading-5">
                           {item.text}
                        </p>
                     </div>
                  ))}
               </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-3 mb-8">
               <div className="border border-emerald-500/20 p-4 rounded-xl text-center">
                  <p className="text-lg font-bold">150+</p>
                  <p className="text-[9px] uppercase">Deals</p>
               </div>

               <div className="border border-emerald-500/20 p-4 rounded-xl text-center">
                  <p className="text-lg font-bold">4.9</p>
                  <p className="text-[9px] uppercase">Rating</p>
               </div>

               <div className="border border-emerald-500/20 p-4 rounded-xl text-center">
                  <p className="text-lg font-bold">24/7</p>
                  <p className="text-[9px] uppercase">Support</p>
               </div>
            </div>

            {/* SOCIAL */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
               {linkedin && (
                  <a href={linkedin} className="px-3 py-2 border border-emerald-500/30 text-[10px] rounded-lg">
                     LINKEDIN
                  </a>
               )}
               {instagram && (
                  <a href={instagram} className="px-3 py-2 border border-emerald-500/30 text-[10px] rounded-lg">
                     INSTA
                  </a>
               )}
               {facebook && (
                  <a href={facebook} className="px-3 py-2 border border-emerald-500/30 text-[10px] rounded-lg">
                     FACEBOOK
                  </a>
               )}
               {twitter && (
                  <a href={twitter} className="px-3 py-2 border border-emerald-500/30 text-[10px] rounded-lg">
                     TWITTER
                  </a>
               )}
            </div>

            {/* SAVE BUTTON */}
            <button
               onClick={() => downloadVCard(userData)}
               className="w-full py-4 border-2 border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold text-[10px] uppercase tracking-[0.25em] hover:bg-emerald-500 hover:text-black transition-all flex items-center justify-center gap-3 rounded-xl active:scale-[0.98]"
            >
               <FiIcons.FiDownload size={14} />
               EXTRACT_DATA
            </button>

            <div className="mt-6">
               <PoweredBy />
            </div>
         </div>
      </div>
   );
};

export default PixelProperty;