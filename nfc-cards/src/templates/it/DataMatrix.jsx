import React, { useState } from "react";
import {
   FiPhone,
   FiMail,
   FiGlobe,
   FiMapPin,
   FiBriefcase,
   FiUser,
   FiChevronDown,
   FiDownload,
   FiArrowUpRight,
   FiStar
} from "react-icons/fi";

import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

const DataMatrix = ({ userData = {} }) => {
   const [openInfo, setOpenInfo] = useState(false);

   const {
      displayName = "Cardyn Identity",
      email = "hello@cardyn.shop",
      role = "Creative Developer",
      mobileNumber = "+91 99999 99999",
      website = "https://cardyn.shop/",
      company = "Cardyn Digital Systems",
      address = "Ahmedabad, Gujarat, India",
      bio = "We create modern websites, premium branding, scalable software products and next generation business identity systems.",
      logo,
      banner,
      profileImage
   } = userData;

   const coverImage =
      banner ||
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop";

   const showcase =
      userData.showcase ||
      "https://images.unsplash.com/photo-1497366412874-3415097a27e7?q=80&w=1200&auto=format&fit=crop";

   const services = [
      "Web Design",
      "Software",
      "Branding",
      "Automation",
      "Marketing",
      "Apps"
   ];

   const infoCards = [
      {
         icon: FiPhone,
         label: "Phone",
         value: mobileNumber,
         link: `tel:${mobileNumber}`
      },
      {
         icon: FiMail,
         label: "Email",
         value: email,
         link: `mailto:${email}`
      },
      {
         icon: FiGlobe,
         label: "Website",
         value: "Visit Website",
         link: website
      },
      {
         icon: FiBriefcase,
         label: "Company",
         value: company
      },
      {
         icon: FiMapPin,
         label: "Location",
         value: address
      }
   ];

   return (
      <div className="min-h-screen bg-[#050505] px-4 py-10 flex justify-center font-['Space_Grotesk'] relative overflow-hidden">

         {/* BACKGROUND */}
         <div className="absolute top-0 left-0 w-72 h-72 bg-violet-500/10 blur-[160px] rounded-full" />
         <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/10 blur-[160px] rounded-full" />

         <div className="w-full max-w-sm rounded-[36px] overflow-hidden bg-[#0c0c0c]/95 border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.65)] backdrop-blur-2xl relative z-10">

            {/* TOP COVER */}
            <div className="relative h-44">
               <img src={coverImage} className="w-full h-full object-cover" />

               <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-black/30 to-transparent" />

               <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.35em] text-white font-bold px-3 py-1 rounded-full bg-white/10 border border-white/10">
                  Data Matrix
               </div>
            </div>

            {/* FLOAT PROFILE SECTION */}
            <div className="px-5 relative">

               <div className="-mt-14 rounded-[28px] bg-[#111111] border border-white/10 p-4 shadow-xl">

                  <div className="flex items-center gap-4">

                     {/* LOGO */}
                     <div className="w-20 h-20 rounded-3xl bg-white p-2 shrink-0 border border-white/20">
                        <div className="w-full h-full rounded-2xl bg-white overflow-hidden flex items-center justify-center">
                           {logo || profileImage ? (
                              <img
                                 src={logo || profileImage}
                                 className="w-full h-full object-contain p-1"
                              />
                           ) : (
                              <FiUser size={28} className="text-violet-600" />
                           )}
                        </div>
                     </div>

                     {/* INFO */}
                     <div className="min-w-0 flex-1">
                        <h1 className="text-white text-2xl font-black truncate">
                           {displayName}
                        </h1>

                        <p className="text-cyan-400 text-[11px] uppercase tracking-[0.28em] mt-1 font-bold">
                           {role}
                        </p>

                        <div className="mt-3 flex items-center gap-2 text-[11px] text-zinc-400">
                           <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                           Active Business
                        </div>
                     </div>
                  </div>

                  <p className="text-zinc-400 text-sm leading-6 mt-4">
                     {bio}
                  </p>
               </div>
            </div>

            {/* STATS BAR */}
            <div className="px-5 mt-5">
               <div className="grid grid-cols-3 gap-3">
                  {[
                     ["300+", "Projects"],
                     ["24/7", "Support"],
                     ["10Y", "Growth"]
                  ].map((item, i) => (
                     <div
                        key={i}
                        className="rounded-2xl bg-white/[0.03] border border-white/5 p-4 text-center"
                     >
                        <div className="text-violet-400 font-black text-xl">
                           {item[0]}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mt-1">
                           {item[1]}
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* CONTACT STACK */}
            <div className="px-5 mt-6 space-y-3">
               {infoCards.map((item, i) => {
                  const Icon = item.icon;

                  const content = (
                     <div className="stackCard">
                        <div className="iconWrap">
                           <Icon />
                        </div>

                        <div className="flex-1 min-w-0">
                           <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold">
                              {item.label}
                           </div>

                           <div className="text-white font-semibold truncate">
                              {item.value}
                           </div>
                        </div>

                        {item.link && (
                           <FiArrowUpRight className="text-zinc-500" />
                        )}
                     </div>
                  );

                  return item.link ? (
                     <a
                        key={i}
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                     >
                        {content}
                     </a>
                  ) : (
                     <div key={i}>{content}</div>
                  );
               })}
            </div>

            {/* SHOWCASE IMAGE */}
            <div className="px-5 mt-6">
               <div className="rounded-3xl overflow-hidden h-40 relative border border-white/5">
                  <img src={showcase} className="w-full h-full object-cover" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute bottom-4 left-4">
                     <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-300 font-bold">
                        Workspace
                     </div>
                     <div className="text-white font-semibold mt-1">
                        Premium Innovation Studio
                     </div>
                  </div>
               </div>
            </div>

            {/* SERVICES PILLS */}
            <div className="px-5 mt-6">
               <h3 className="sectionTitle">Capabilities</h3>

               <div className="flex flex-wrap gap-2 justify-center">
                  {services.map((item, i) => (
                     <div key={i} className="pill">
                        {item}
                     </div>
                  ))}
               </div>
            </div>

            {/* TOGGLE INFO */}
            <div className="px-5 mt-6">
               <div className="rounded-3xl bg-white/[0.03] border border-white/5 overflow-hidden">
                  <button
                     onClick={() => setOpenInfo(!openInfo)}
                     className="w-full px-5 py-4 flex justify-between items-center"
                  >
                     <span className="font-bold text-white">
                        Why Choose Us
                     </span>

                     <FiChevronDown
                        className={`transition-all ${openInfo ? "rotate-180 text-cyan-400" : "text-zinc-500"
                           }`}
                     />
                  </button>

                  {openInfo && (
                     <div className="px-5 pb-5 text-sm text-zinc-400 leading-6">
                        We deliver premium websites, modern branding systems,
                        custom software, mobile apps, automation tools and
                        business growth solutions.
                     </div>
                  )}
               </div>
            </div>

            {/* CTA */}
            <div className="px-5 mt-6 grid grid-cols-2 gap-3">
               <button
                  onClick={() => downloadVCard(userData)}
                  className="h-12 rounded-2xl bg-violet-500 text-white font-bold hover:bg-violet-400 transition"
               >
                  Save Contact
               </button>

               <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  className="h-12 rounded-2xl border border-cyan-400 text-cyan-300 font-bold flex items-center justify-center hover:bg-cyan-400 hover:text-black transition"
               >
                  Launch
               </a>
            </div>

            {/* FOOTER */}
            <div className="px-5 py-6">
               <PoweredBy />
            </div>
         </div>

         <style>{`
        .stackCard {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-radius: 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          transition: 0.3s ease;
        }

        .stackCard:hover {
          background: rgba(255,255,255,0.06);
          transform: translateY(-2px);
        }

        .iconWrap {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: rgba(139,92,246,0.12);
          color: #a78bfa;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .sectionTitle {
          text-align: center;
          font-size: 12px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #22d3ee;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .pill {
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          color: #e5e7eb;
          font-size: 12px;
          font-weight: 700;
        }
      `}</style>
      </div>
   );
};

export default DataMatrix;