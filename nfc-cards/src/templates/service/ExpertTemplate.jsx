import React from "react";
import * as FiIcons from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

const ExpertTemplate = ({ userData }) => {
   const {
      displayName = "Expert Agency",
      email = "hello@expertagency.com",
      phone = "+91 99999 99999",
      website = "https://www.expertagency.com",
      address = "Ahmedabad, Gujarat",
      linkedin,
      instagram,
      facebook,
      twitter,
      youtube,
      logo,
      role,
      designation,
      experience = "12+ Years Experience",
      timing = "Open • 9 AM to 9 PM",
   } = userData || {};

   const displayRole = designation || role || "Premium Consultant";

   const services = [
      "Business Consulting",
      "Digital Strategy",
      "Brand Development",
      "Technical Support",
   ];

   const highlights = [
      {
         icon: <FiIcons.FiAward />,
         title: "Certified Experts",
         text: "Skilled professionals with trusted experience.",
      },
      {
         icon: <FiIcons.FiZap />,
         title: "Fast Response",
         text: "Quick assistance with premium support.",
      },
      {
         icon: <FiIcons.FiShield />,
         title: "Secure Process",
         text: "Reliable and transparent working method.",
      },
      {
         icon: <FiIcons.FiTrendingUp />,
         title: "Growth Focused",
         text: "Solutions designed for better results.",
      },
   ];

   return (
      <div className="min-h-screen bg-black md:bg-neutral-950 flex justify-center font-['Mulish',sans-serif]">
         <div className="w-full max-w-sm min-h-screen bg-neutral-900 shadow-2xl overflow-hidden relative">

            {/* TOP BAR */}
            <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400"></div>

            {/* HERO */}
            <div className="relative h-64 overflow-hidden">
               <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80"
                  alt="Business"
                  className="w-full h-full object-cover scale-105 hover:scale-110 duration-1000"
               />

               {/* OVERLAY */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

               {/* WAVE SHAPE */}
               <div className="absolute bottom-0 left-0 w-full leading-[0]">
                  <svg
                     viewBox="0 0 500 150"
                     preserveAspectRatio="none"
                     className="w-full h-24"
                  >
                     <path
                        d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                        className="fill-neutral-900"
                     ></path>
                  </svg>
               </div>

               {/* DECORATIVE ARC */}
               <div className="absolute top-1/2 right-[-10%] w-64 h-64 border border-amber-500/20 rounded-full"></div>
               <div className="absolute top-1/3 right-[-5%] w-48 h-48 border border-amber-500/10 rounded-full"></div>

               {/* LOGO / AVATAR */}
               <div className="absolute bottom-4 left-6">
                  <div className="w-28 h-28 rounded-full border-4 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)] overflow-hidden bg-neutral-800 flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
                     {logo ? (
                        <img
                           src={logo}
                           alt="Logo"
                           className="w-full h-full object-cover"
                        />
                     ) : (
                        <FiIcons.FiAward size={40} className="text-amber-500" />
                     )}
                  </div>
               </div>
            </div>

            {/* CONTENT */}
            <div className="pt-6 pb-8 px-4">

               {/* NAME */}
               <div className="text-center">
                  <h1 className="text-2xl font-black text-white uppercase tracking-wide">
                     {displayName}
                  </h1>

                  <p className="text-[10px] text-amber-400 font-black uppercase tracking-[0.35em] mt-2">
                     {displayRole}
                  </p>
               </div>

               {/* INFO STATUS */}
               <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="bg-white/5 rounded-2xl p-4 text-center hover:bg-white/10 duration-300">
                     <FiIcons.FiClock className="mx-auto text-amber-400 mb-2" />
                     <p className="text-[11px] text-white font-bold">{timing}</p>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-4 text-center hover:bg-white/10 duration-300">
                     <FiIcons.FiShield className="mx-auto text-amber-400 mb-2" />
                     <p className="text-[11px] text-white font-bold">{experience}</p>
                  </div>
               </div>

               {/* CONTACT */}
               <div className="space-y-2 mt-6">
                  <a href={`tel:${phone}`} className="flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-4 text-white hover:bg-white/10 duration-300">
                     <FiIcons.FiPhone className="text-amber-400" />
                     <span className="text-sm">{phone}</span>
                  </a>

                  <a href={`mailto:${email}`} className="flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-4 text-white hover:bg-white/10 duration-300">
                     <FiIcons.FiMail className="text-amber-400" />
                     <span className="text-sm truncate">{email}</span>
                  </a>

                  <a href={website} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-4 text-white hover:bg-white/10 duration-300">
                     <FiIcons.FiGlobe className="text-amber-400" />
                     <span className="text-sm truncate">{website}</span>
                  </a>

                  <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-4 text-white">
                     <FiIcons.FiMapPin className="text-amber-400" />
                     <span className="text-sm">{address}</span>
                  </div>
               </div>

               {/* SERVICES */}
               <div className="mt-7">
                  <h3 className="text-white font-black text-sm uppercase tracking-widest mb-3">
                     Services
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                     {services.map((item, index) => (
                        <div
                           key={index}
                           className="bg-white/5 rounded-2xl p-4 text-center hover:bg-white/10 duration-300 hover:-translate-y-1"
                        >
                           <FiIcons.FiCheckCircle className="mx-auto mb-2 text-amber-400" />
                           <p className="text-[11px] text-white font-bold">{item}</p>
                        </div>
                     ))}
                  </div>
               </div>

               {/* NEW INFORMATION CARDS */}
               <div className="mt-8">
                  <h3 className="text-white font-black text-sm uppercase tracking-widest mb-3">
                     Why Choose Us
                  </h3>

                  <div className="space-y-3">
                     {highlights.map((item, index) => (
                        <div
                           key={index}
                           className="bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/5 rounded-3xl p-4 flex gap-4 items-start hover:border-amber-400/30 hover:bg-white/10 duration-300"
                        >
                           <div className="w-12 h-12 rounded-2xl bg-amber-500 text-black flex items-center justify-center shrink-0">
                              {item.icon}
                           </div>

                           <div>
                              <h4 className="text-sm font-black text-white">
                                 {item.title}
                              </h4>
                              <p className="text-xs text-white/60 mt-1 leading-5">
                                 {item.text}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* BUTTONS */}
               <div className="space-y-3 mt-8">
                  <a
                     href={website}
                     target="_blank"
                     rel="noreferrer"
                     className="w-full bg-amber-500 text-black py-4 rounded-2xl flex items-center justify-center gap-2 font-black uppercase text-[11px]"
                  >
                     Visit Website
                     <FiIcons.FiArrowRight />
                  </a>

                  <button
                     onClick={() => downloadVCard(userData)}
                     className="w-full bg-white text-black py-4 rounded-2xl flex items-center justify-center gap-2 font-black uppercase text-[11px]"
                  >
                     <FiIcons.FiDownload />
                     Save Contact
                  </button>
               </div>

               {/* SOCIAL */}
               <div className="flex justify-center gap-2 flex-wrap mt-7">
                  {instagram && <a href={instagram} className="p-3 bg-white/5 rounded-xl text-white hover:bg-white/10"><FiIcons.FiInstagram /></a>}
                  {linkedin && <a href={linkedin} className="p-3 bg-white/5 rounded-xl text-white hover:bg-white/10"><FiIcons.FiLinkedin /></a>}
                  {facebook && <a href={facebook} className="p-3 bg-white/5 rounded-xl text-white hover:bg-white/10"><FiIcons.FiFacebook /></a>}
                  {twitter && <a href={twitter} className="p-3 bg-white/5 rounded-xl text-white hover:bg-white/10"><FiIcons.FiTwitter /></a>}
                  {youtube && <a href={youtube} className="p-3 bg-white/5 rounded-xl text-white hover:bg-white/10"><FiIcons.FiYoutube /></a>}
               </div>

               <div className="mt-8">
                  <PoweredBy />
               </div>

            </div>
         </div>
      </div>
   );
};

export default ExpertTemplate;