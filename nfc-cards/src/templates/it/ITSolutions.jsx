import React from "react";
import {
   FiGlobe,
   FiMail,
   FiPhone,
   FiMapPin,
   FiLinkedin,
   FiCpu,
   FiFileText,
   FiArrowUpRight
} from "react-icons/fi";

import { downloadVCard } from '../common/StandardComponents';

const ITSolutions = ({ userData }) => {
   const {
      displayName,
      role,
      website,
      email,
      phone,
      address,
      linkedin,
      instagram
   } = userData || {};

   const SpineLink = ({ icon: Icon, label, url }) => {
      if (!url) return null;
      return (
         <a href={url} target="_blank" rel="noopener noreferrer" className="relative flex items-center py-4 group block">
            {/* Spine Decor */}
            <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col items-center overflow-hidden z-0 pointer-events-none">
               <div className="w-[1px] h-full bg-[#d4af37]/30 absolute"></div>
               <div className="absolute top-1/2 -translate-y-1/2 w-16 h-24 border border-[#d4af37]/20 rounded-[2rem] bg-black group-hover:bg-[#d4af37]/5 transition-colors duration-500"></div>
            </div>

            {/* Icon Box */}
            <div className="w-[50px] h-[50px] ml-4 rounded-[1.2rem] bg-black border border-[#d4af37]/40 shadow-[0_0_15px_rgba(212,175,55,0.15)] flex items-center justify-center z-10 relative transition-colors group-hover:border-[#d4af37]">
               <Icon size={20} className="text-[#d4af37]" />
            </div>

            {/* Text */}
            <div className="ml-5 flex-1 z-10">
               <p className="text-[#d4af37] text-[8px] font-bold tracking-[0.3em] uppercase mb-1">Tech Connect</p>
               <p className="text-white text-[15px] font-medium tracking-wide group-hover:text-[#d4af37] transition-colors">
                  {label}
               </p>
            </div>

            {/* Arrow */}
            <div className="ml-2 pr-4 z-10">
               <FiArrowUpRight size={18} className="text-zinc-600 group-hover:text-[#d4af37] transition-colors" />
            </div>
         </a>
      );
   };

   const CustomMapPreview = ({ address }) => {
      if (!address || address === "" || address.includes("resolving")) return null;
      const encodedAddress = encodeURIComponent(address);

      return (
         <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative w-full h-52 rounded-[2rem] overflow-hidden group shadow-md border border-[#1a1a1a]"
         >
            <img
               src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
               alt="Headquarters"
               className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 right-6">
               <p className="text-[#d4af37] text-[10px] font-bold uppercase tracking-[0.25em] mb-1">
                  Visit Headquarters
               </p>
               <p className="text-white text-[17px] font-medium truncate mb-4 drop-shadow-md">
                  {address}
               </p>
               <div className="inline-block bg-[#d4af37] text-black px-6 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] shadow-lg group-hover:bg-[#ebbb67] transition-colors">
                  Open Map
               </div>
            </div>
         </a>
      );
   };

   return (
      <div className="min-h-screen bg-[#030303] text-white flex justify-center px-4 py-10 font-['Mulish'] md:bg-neutral-950 md:items-center py-0 md:py-12">
         <div className="w-full max-w-sm">

            {/* Main Card */}
            <div className="rounded-[2.2rem] border border-[#1a1a1a] bg-black p-5 shadow-2xl">

               {/* Profile Section */}
               <div className="text-center">

                  {/* Profile Image */}
                  <div className="mx-auto w-24 h-24 rounded-full border border-[#d4af37]/60 p-1 shadow-lg">
                     <div className="w-full h-full rounded-full overflow-hidden bg-[#111] flex items-center justify-center">
                        {userData?.logo ? (
                           <img
                              src={userData.logo}
                              alt="Profile"
                              className="w-full h-full object-cover"
                           />
                        ) : (
                           <FiCpu className="text-[#d4af37] text-3xl" />
                        )}
                     </div>
                  </div>

                  {/* Name */}
                  <h1 className="mt-5 text-[34px] leading-none font-serif text-white">
                     {displayName || "Marcus Thorne"}
                  </h1>

                  {/* Role */}
                  {/* <p className="mt-3 text-[10px] tracking-[0.35em] uppercase font-bold text-[#d4af37]">
                     {role || "Chief Technology Officer"}
                  </p> */}

                  <div className="w-14 h-[1px] bg-[#d4af37]/60 mx-auto mt-4"></div>
               </div>

               {/* Connect Links (Spine UI) */}
               <div className="mt-8 mb-6 relative z-10">
                  <SpineLink icon={FiGlobe} label="Visit Website" url={website ? (website.startsWith("http") ? website : `https://${website}`) : null} />
                  <SpineLink icon={FiMail} label="Email Me" url={email ? `mailto:${email}` : null} />
                  <SpineLink icon={FiPhone} label="Call Now" url={phone ? `tel:${phone}` : null} />
                  <SpineLink icon={FiLinkedin} label="LinkedIn Profile" url={linkedin ? (linkedin.startsWith("http") ? linkedin : `https://linkedin.com/in/${linkedin.replace('@', '')}`) : null} />
               </div>

               {/* Service Card */}
               <div className="mt-7 rounded-2xl border border-[#2c2c2c] bg-gradient-to-br from-[#1a1a1a] to-[#111] p-6 text-center">

                  <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-4">
                     <FiCpu className="text-[#d4af37]" />
                  </div>

                  <h3 className="text-2xl font-serif text-white">
                     Enterprise Solutions
                  </h3>

                  <p className="mt-3 text-sm text-gray-400 leading-6">
                     Scalable infrastructure and cybersecurity frameworks for the modern age.
                  </p>

                  <button className="mt-5 px-6 h-10 rounded-full border border-[#d4af37] text-[#d4af37] text-[10px] uppercase tracking-[0.25em] font-bold hover:bg-[#d4af37] hover:text-black transition">
                     View Solutions
                  </button>
               </div>

               {/* Banner Image Card */}
               <div className="mt-7 rounded-2xl overflow-hidden border border-[#1d1d1d]">

                  <div
                     className="h-40 bg-cover bg-center relative"
                     style={{
                        backgroundImage: `url(${userData?.banner ||
                           "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
                           })`
                     }}
                  >
                     <div className="absolute inset-0 bg-black/45"></div>

                     <div className="absolute bottom-4 left-4 z-10">
                        <p className="text-[10px] uppercase tracking-[0.28em] font-bold text-[#d4af37]">
                           Headquarters
                        </p>
                        <p className="text-white text-sm mt-1">
                           {address || "Palo Alto, CA"}
                        </p>
                     </div>
                  </div>
               </div>

               {/* Contact Links removed as they are now in the spine */}

               {/* Map */}
               <div className="mt-7">
                  <CustomMapPreview address={address} />
               </div>

               {/* Save Contact */}
               <div className="mt-7">
                  <button onClick={() => downloadVCard(userData)} className="w-full py-3 mt-4 border rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs opacity-80 hover:opacity-100 transition-opacity">Save Contact</button>
               </div>

               {/* Footer */}
               <div className="mt-8 text-center">
                  <a
                     href="https://cardyn.shop/"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-[8px] uppercase tracking-[0.45em] font-bold text-[#d4af37]/70 hover:text-[#d4af37]"
                  >
                     Powered by Cardyn
                  </a>
               </div>

            </div>
         </div>
      </div>
   );
};

export default ITSolutions;