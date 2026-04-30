import React, { useState } from "react";
import * as Fi from "react-icons/fi";
import {
   FaWhatsapp,
   FaFacebook,
   FaYoutube,
   FaDiscord,
   FaTelegram,
   FaGithub,
   FaLinkedin,
   FaInstagram
} from "react-icons/fa";

import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

const QuantumCode = ({ userData = {} }) => {
   const [openInfo, setOpenInfo] = useState(false);

   const {
      displayName = "Quantum Architect",
      role = "AI • Cloud • Security Expert",
      email = "admin@example.com",
      phone = "+91 99999 99999",
      website = "https://example.com",
      address = "Ahmedabad, India",
      bio = "We build futuristic software systems, premium interfaces and secure business automation solutions.",
      whatsapp,
      facebook,
      youtube,
      discord,
      telegram,
      github,
      linkedin,
      instagram,
      company,
      businessName,
      logo,
      profileImage
   } = userData;

   const heroImage =
      userData.banner ||
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop";

   const officeImage =
      userData.showcase ||
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop";

   const socials = [
      { value: github, icon: FaGithub, url: `https://github.com/${github}` },
      { value: linkedin, icon: FaLinkedin, url: `https://linkedin.com/in/${linkedin}` },
      { value: whatsapp, icon: FaWhatsapp, url: `https://wa.me/${String(whatsapp || "").replace(/\D/g, "")}` },
      { value: telegram, icon: FaTelegram, url: `https://t.me/${telegram}` },
      { value: facebook, icon: FaFacebook, url: `https://facebook.com/${facebook}` },
      { value: youtube, icon: FaYoutube, url: `https://youtube.com/${youtube}` },
      { value: discord, icon: FaDiscord, url: discord },
      { value: instagram, icon: FaInstagram, url: `https://instagram.com/${instagram}` }
   ].filter((x) => x.value);

   const services = [
      "AI Automation",
      "Cloud Hosting",
      "Cyber Security",
      "App Development",
      "UI / UX Design",
      "Growth Strategy"
   ];

   return (
      <div className="min-h-screen bg-[#050510] text-white px-4 py-8 flex justify-center relative overflow-hidden font-['Mulish']">

         {/* BACKGROUND */}
         <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 blur-[150px] rounded-full" />
         <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 blur-[150px] rounded-full" />

         <div className="w-full max-w-sm rounded-[34px] overflow-hidden bg-[#0a0a1f]/90 border border-cyan-400/10 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,255,255,0.08)] relative z-10">

            {/* HEADER */}
            <div className="relative h-52 overflow-hidden">
               <img src={heroImage} className="w-full h-full object-cover" />

               <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-black/30 to-black/20" />

               <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-[10px] uppercase tracking-[0.3em] text-cyan-300 font-bold">
                  Quantum Code
               </div>

               {/* FULL SIZE LOGO SECTION */}
               <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-28 h-28 rounded-[30px] bg-white shadow-[0_15px_40px_rgba(255,255,255,0.15)] p-2 border border-white/20">
                  <div className="w-full h-full rounded-[24px] bg-white overflow-hidden flex items-center justify-center">
                     {logo || profileImage ? (
                        <img
                           src={logo || profileImage}
                           className="w-full h-full object-contain p-2"
                        />
                     ) : (
                        <Fi.FiCpu size={36} className="text-cyan-500" />
                     )}
                  </div>
               </div>
            </div>

            {/* PROFILE */}
            <div className="pt-16 px-5 text-center">
               <h1 className="text-3xl font-black tracking-tight">
                  {displayName}
               </h1>

               <p className="text-cyan-400 text-xs uppercase tracking-[0.35em] mt-2">
                  {role}
               </p>

               {(company || businessName) && (
                  <p className="text-zinc-500 text-xs mt-3">
                     {company || businessName}
                  </p>
               )}

               <p className="text-zinc-400 text-sm leading-6 mt-5">
                  {bio}
               </p>

               <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-400/10 border border-emerald-400/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-300 font-bold">
                     Active Business
                  </span>
               </div>
            </div>

            {/* SHOWCASE */}
            <div className="px-5 mt-6">
               <div className="rounded-3xl overflow-hidden border border-white/5 h-40 relative">
                  <img src={officeImage} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                  <div className="absolute bottom-4 left-4">
                     <div className="text-cyan-300 text-[10px] uppercase tracking-[0.3em] font-bold">
                        Digital Hub
                     </div>
                     <div className="text-white font-semibold mt-1">
                        Modern Innovation Workspace
                     </div>
                  </div>
               </div>
            </div>

            {/* CONTACT */}
            <div className="px-5 mt-6 space-y-3">

               <a href={`mailto:${email}`} className="cardItem">
                  <Fi.FiMail /> {email}
               </a>

               <a href={`tel:${phone}`} className="cardItem">
                  <Fi.FiPhone /> {phone}
               </a>

               <a
                  href={website.startsWith("http") ? website : `https://${website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="cardItem"
               >
                  <Fi.FiGlobe /> Visit Website
               </a>

               <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="cardItem"
               >
                  <Fi.FiMapPin /> {address}
               </a>
            </div>

            {/* SERVICES */}
            <div className="px-5 mt-6">
               <h3 className="sectionTitle">Solutions</h3>

               <div className="grid grid-cols-2 gap-3">
                  {services.map((item, i) => (
                     <div key={i} className="featureBox">
                        {item}
                     </div>
                  ))}
               </div>
            </div>

            {/* SOCIAL */}
            <div className="px-5 mt-6">
               <h3 className="sectionTitle">Connect</h3>

               <div className="grid grid-cols-4 gap-3">
                  {socials.map((item, i) => {
                     const Icon = item.icon;

                     return (
                        <a
                           key={i}
                           href={item.url}
                           target="_blank"
                           rel="noreferrer"
                           className="socialBtn"
                        >
                           <Icon size={20} />
                        </a>
                     );
                  })}
               </div>
            </div>

            {/* TOGGLE */}
            <div className="px-5 mt-6">
               <div className="rounded-3xl bg-white/[0.03] border border-white/5 overflow-hidden">
                  <button
                     onClick={() => setOpenInfo(!openInfo)}
                     className="w-full px-5 py-4 flex justify-between items-center"
                  >
                     <span className="font-bold">Business Highlights</span>

                     <Fi.FiChevronDown
                        className={`transition-all ${openInfo ? "rotate-180 text-cyan-400" : ""
                           }`}
                     />
                  </button>

                  {openInfo && (
                     <div className="px-5 pb-5 text-sm text-zinc-400 leading-6">
                        We create premium branding websites, secure business systems,
                        enterprise apps, AI automations and scalable cloud solutions.
                     </div>
                  )}
               </div>
            </div>

            {/* BUTTONS */}
            <div className="px-5 mt-6 grid grid-cols-2 gap-3">

               <button
                  onClick={() => downloadVCard(userData)}
                  className="h-12 rounded-2xl bg-cyan-400 text-black font-bold hover:brightness-110 transition"
               >
                  Save Contact
               </button>

               <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  className="h-12 rounded-2xl border border-cyan-400 text-cyan-300 font-bold flex items-center justify-center hover:bg-cyan-400 hover:text-black transition"
               >
                  Launch Site
               </a>
            </div>

            <div className="px-5 py-6">
               <PoweredBy />
            </div>
         </div>

         <style>{`
        .cardItem {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-radius: 18px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          color: white;
          transition: 0.3s ease;
          font-size: 14px;
        }

        .cardItem:hover {
          background: rgba(0,255,255,0.08);
          color: #67e8f9;
          transform: translateY(-2px);
        }

        .sectionTitle {
          text-align: center;
          font-size: 12px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #67e8f9;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .featureBox {
          padding: 14px;
          border-radius: 18px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          text-align: center;
          font-size: 13px;
          font-weight: 700;
          color: #e5e7eb;
        }

        .socialBtn {
          aspect-ratio: 1/1;
          border-radius: 18px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #67e8f9;
          transition: 0.3s ease;
        }

        .socialBtn:hover {
          background: #22d3ee;
          color: black;
          transform: translateY(-3px);
        }
      `}</style>
      </div>
   );
};

export default QuantumCode;