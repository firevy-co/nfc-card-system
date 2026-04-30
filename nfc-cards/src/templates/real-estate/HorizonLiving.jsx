import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const HorizonLiving = ({ userData }) => {
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
      logo
   } = userData || {};

   const displayPhone = mobileNumber || phone;
   const displayRole = designation || role || "Luxury Property Guide";
   const finalAddress = address || city;

   const galleryImages = [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80"
   ];

   return (
      <div className="min-h-screen bg-[#fff7f1] font-['Outfit'] text-slate-800 pb-12 overflow-x-hidden">

         {/* HEADER */}
         <div className="relative overflow-hidden rounded-b-[3rem] bg-gradient-to-br from-orange-300 via-rose-100 to-white px-6 pt-16 pb-12 shadow-lg">

            {/* WORKING HEADER IMAGE */}
            <img
               src="https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1200&q=80"
               alt="Luxury Property"
               className="absolute inset-0 w-full h-full object-cover opacity-20"
            />

            <div className="absolute top-0 right-0 w-44 h-44 bg-white/40 rounded-full blur-3xl" />

            <div className="relative z-10 text-center">

               {/* PROFILE */}
               <div className="flex justify-center mb-5">
                  <div className="w-32 h-32 rounded-full bg-white/70 backdrop-blur-md p-2 shadow-2xl">
                     <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-white flex items-center justify-center">
                        {avatar ? (
                           <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                        ) : logo ? (
                           <img src={logo} alt="Logo" className="w-full h-full object-contain p-4" />
                        ) : (
                           <FiIcons.FiHome size={42} className="text-orange-500" />
                        )}
                     </div>
                  </div>
               </div>

               <h1 className="text-3xl font-black tracking-tight text-slate-900">
                  {displayName || "Horizon Living"}
               </h1>

               <p className="text-xs uppercase tracking-[0.35em] font-bold text-orange-600 mt-2">
                  {displayRole}
               </p>

               {companyName && (
                  <p className="mt-3 text-sm font-semibold text-slate-700">
                     {companyName}
                  </p>
               )}
            </div>
         </div>

         {/* BODY */}
         <div className="px-6 mt-8 space-y-6 max-w-md mx-auto">

            {bio && (
               <div className="bg-white rounded-3xl p-5 shadow-sm border border-orange-100 text-center">
                  <FiIcons.FiMessageCircle className="mx-auto text-orange-500 mb-3" size={22} />
                  <p className="text-sm text-slate-600 leading-relaxed">
                     "{bio}"
                  </p>
               </div>
            )}

            {/* STATS */}
            <div className="grid grid-cols-3 gap-3">
               <div className="bg-white rounded-3xl p-4 text-center shadow-sm border border-orange-100">
                  <FiIcons.FiAward className="mx-auto text-orange-500 mb-2" />
                  <p className="text-lg font-black">10+</p>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Years</span>
               </div>

               <div className="bg-white rounded-3xl p-4 text-center shadow-sm border border-orange-100">
                  <FiIcons.FiHome className="mx-auto text-orange-500 mb-2" />
                  <p className="text-lg font-black">150+</p>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Sold</span>
               </div>

               <div className="bg-white rounded-3xl p-4 text-center shadow-sm border border-orange-100">
                  <FiIcons.FiStar className="mx-auto text-orange-500 mb-2" />
                  <p className="text-lg font-black">4.9</p>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Rating</span>
               </div>
            </div>

            {/* SERVICES */}
            <div>
               <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 mb-3">
                  Services
               </h3>

               <div className="grid grid-cols-2 gap-3">
                  {[
                     { icon: FiIcons.FiHome, title: "Buy Home" },
                     { icon: FiIcons.FiKey, title: "Sell Property" },
                     { icon: FiIcons.FiMap, title: "Site Visit" },
                     { icon: FiIcons.FiDollarSign, title: "Best Deals" }
                  ].map((item, i) => (
                     <div
                        key={i}
                        className="bg-white rounded-3xl p-4 border border-orange-100 shadow-sm text-center"
                     >
                        <item.icon className="mx-auto text-orange-500 mb-2" size={20} />
                        <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                           {item.title}
                        </p>
                     </div>
                  ))}
               </div>
            </div>

            {/* GALLERY */}
            <div>
               <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 mb-3">
                  Featured Properties
               </h3>

               <div className="grid grid-cols-3 gap-2">
                  {galleryImages.map((img, i) => (
                     <div key={i} className="rounded-2xl overflow-hidden h-24 shadow-sm">
                        <img
                           src={img}
                           alt="Property"
                           className="w-full h-full object-cover hover:scale-110 transition duration-500"
                        />
                     </div>
                  ))}
               </div>
            </div>

            {/* CONTACT */}
            <div className="space-y-3">

               {displayPhone && (
                  <a
                     href={`tel:${displayPhone}`}
                     className="flex items-center justify-between bg-white p-5 rounded-[2rem] shadow-sm border border-orange-100"
                  >
                     <div className="flex items-center gap-4">
                        <FiIcons.FiPhone className="text-orange-500" size={20} />
                        <span className="font-bold">{displayPhone}</span>
                     </div>
                     <FiIcons.FiArrowUpRight className="text-orange-500" />
                  </a>
               )}

               {email && (
                  <a
                     href={`mailto:${email}`}
                     className="flex items-center justify-between bg-white p-5 rounded-[2rem] shadow-sm border border-orange-100"
                  >
                     <div className="flex items-center gap-4 overflow-hidden">
                        <FiIcons.FiMail className="text-orange-500 shrink-0" size={20} />
                        <span className="font-bold truncate">{email}</span>
                     </div>
                     <FiIcons.FiArrowUpRight className="text-orange-500" />
                  </a>
               )}

               {website && (
                  <a
                     href={website?.startsWith("http") ? website : `https://${website}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center justify-between bg-orange-500 text-white p-5 rounded-[2rem] shadow-md"
                  >
                     <div className="flex items-center gap-4">
                        <FiIcons.FiGlobe size={20} />
                        <span className="font-bold">Visit Website</span>
                     </div>
                     <FiIcons.FiArrowRight />
                  </a>
               )}

               {finalAddress && (
                  <div className="flex items-center gap-4 bg-white p-5 rounded-[2rem] shadow-sm border border-orange-100">
                     <FiIcons.FiMapPin className="text-orange-500" size={20} />
                     <span className="font-semibold text-sm text-slate-600 truncate">
                        {finalAddress}
                     </span>
                  </div>
               )}
            </div>

            {/* SOCIAL */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
               {[
                  { icon: FiIcons.FiLinkedin, val: linkedin },
                  { icon: FiIcons.FiInstagram, val: instagram },
                  { icon: FiIcons.FiFacebook, val: facebook },
                  { icon: FiIcons.FiTwitter, val: twitter }
               ].map(
                  (social, idx) =>
                     social.val && (
                        <a
                           key={idx}
                           href={social.val.startsWith("http") ? social.val : `https://${social.val}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="w-12 h-12 rounded-full bg-white border border-orange-100 shadow-sm flex items-center justify-center text-slate-500 hover:text-orange-500"
                        >
                           <social.icon size={20} />
                        </a>
                     )
               )}
            </div>

            {/* BUTTON */}
            <button
               onClick={() => downloadVCard(userData)}
               className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-bold text-[11px] uppercase tracking-widest shadow-xl hover:bg-slate-800 transition flex items-center justify-center gap-3"
            >
               <FiIcons.FiDownload size={18} />
               Save Contact
            </button>

            <PoweredBy />
         </div>
      </div>
   );
};

export default HorizonLiving;