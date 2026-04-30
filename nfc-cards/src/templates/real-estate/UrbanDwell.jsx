import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const UrbanDwell = ({ userData }) => {
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
   const displayRole = designation || role || "Urban Broker";
   const finalAddress = address || city;

   const services = [
      {
         icon: <FiIcons.FiHome size={22} />,
         title: "Property Sales",
         text: "Luxury flats, villas & commercial deals"
      },
      {
         icon: <FiIcons.FiKey size={22} />,
         title: "Rental Services",
         text: "Verified rental homes & offices"
      },
      {
         icon: <FiIcons.FiMap size={22} />,
         title: "Area Guidance",
         text: "Best locality recommendations"
      },
      {
         icon: <FiIcons.FiTrendingUp size={22} />,
         title: "Investment Plans",
         text: "Smart real estate opportunities"
      }
   ];

   return (
      <div className="min-h-screen bg-slate-950 font-sans text-slate-200 pb-12 overflow-x-hidden">

         {/* HERO IMAGE HEADER */}
         <div className="relative h-72 overflow-hidden">
            <img
               src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
               alt="Real Estate"
               className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 z-10">
               <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-white mb-4">
                  {logo ? (
                     <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                  ) : avatar ? (
                     <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                     <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white">
                        <FiIcons.FiHome size={32} />
                     </div>
                  )}
               </div>

               <h1 className="text-3xl font-black text-white leading-tight">
                  {displayName || "Urban Dwell"}
               </h1>

               <p className="text-sm uppercase tracking-[0.25em] text-slate-300 mt-1">
                  {displayRole}
               </p>
            </div>
         </div>

         {/* BODY */}
         <div className="px-6 max-w-md mx-auto -mt-2 relative z-20">

            {/* COMPANY */}
            {companyName && (
               <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mt-6">
                  <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
                     Agency
                  </p>
                  <p className="font-bold text-white text-lg">{companyName}</p>
               </div>
            )}

            {/* BIO */}
            {bio && (
               <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mt-5">
                  <p className="text-slate-300 text-sm leading-6">"{bio}"</p>
               </div>
            )}

            {/* CONTACT */}
            <div className="space-y-3 mt-6">

               {displayPhone && (
                  <a
                     href={`tel:${displayPhone}`}
                     className="flex items-center gap-4 bg-white text-slate-900 rounded-2xl px-5 py-4 font-bold"
                  >
                     <FiIcons.FiPhone />
                     <span>{displayPhone}</span>
                  </a>
               )}

               {email && (
                  <a
                     href={`mailto:${email}`}
                     className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4"
                  >
                     <FiIcons.FiMail />
                     <span className="truncate">{email}</span>
                  </a>
               )}

               {website && (
                  <a
                     href={website}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4"
                  >
                     <FiIcons.FiGlobe />
                     <span className="truncate">Visit Website</span>
                  </a>
               )}

               {finalAddress && (
                  <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4">
                     <FiIcons.FiMapPin />
                     <span className="truncate">{finalAddress}</span>
                  </div>
               )}
            </div>

            {/* SERVICES */}
            <div className="mt-8">
               <h3 className="text-white font-black text-lg mb-4">
                  Our Services
               </h3>

               <div className="grid grid-cols-2 gap-4">
                  {services.map((item, index) => (
                     <div
                        key={index}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-4 hover:border-white transition-all"
                     >
                        <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-white mb-3">
                           {item.icon}
                        </div>

                        <h4 className="font-bold text-white text-sm">
                           {item.title}
                        </h4>

                        <p className="text-xs text-slate-400 mt-2 leading-5">
                           {item.text}
                        </p>
                     </div>
                  ))}
               </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-3 mt-8">
               <div className="bg-slate-900 rounded-2xl p-4 text-center border border-slate-800">
                  <p className="text-xl font-black text-white">250+</p>
                  <p className="text-[10px] uppercase text-slate-400 mt-1">
                     Clients
                  </p>
               </div>

               <div className="bg-slate-900 rounded-2xl p-4 text-center border border-slate-800">
                  <p className="text-xl font-black text-white">120+</p>
                  <p className="text-[10px] uppercase text-slate-400 mt-1">
                     Deals
                  </p>
               </div>

               <div className="bg-slate-900 rounded-2xl p-4 text-center border border-slate-800">
                  <p className="text-xl font-black text-white">10+</p>
                  <p className="text-[10px] uppercase text-slate-400 mt-1">
                     Years
                  </p>
               </div>
            </div>

            {/* SOCIAL */}
            <div className="flex flex-wrap gap-3 justify-center mt-8">
               {linkedin && (
                  <a href={linkedin} className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800">
                     <FiIcons.FiLinkedin />
                  </a>
               )}

               {instagram && (
                  <a href={instagram} className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800">
                     <FiIcons.FiInstagram />
                  </a>
               )}

               {facebook && (
                  <a href={facebook} className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800">
                     <FiIcons.FiFacebook />
                  </a>
               )}

               {twitter && (
                  <a href={twitter} className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800">
                     <FiIcons.FiTwitter />
                  </a>
               )}
            </div>

            {/* BUTTON */}
            <button
               onClick={() => downloadVCard(userData)}
               className="w-full mt-8 py-4 rounded-2xl bg-white text-slate-900 font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
            >
               Save Contact
            </button>

            <div className="mt-8">
               <PoweredBy />
            </div>

         </div>
      </div>
   );
};

export default UrbanDwell;