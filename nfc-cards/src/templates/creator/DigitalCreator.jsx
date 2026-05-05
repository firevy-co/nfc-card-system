import React from "react";
import * as FiIcons from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

/* ===========================
   IMAGES (MORE INFORMATIVE)
=========================== */
const creatorBanner =
   "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=1200&q=80";

const contentImages = [
   "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&w=700&q=80",
   "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=700&q=80",
   "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=700&q=80"
];

/* ===========================
   COMPONENT
=========================== */
const DigitalCreator = ({ userData }) => {
   const {
      displayName,
      website,
      email,
      phone,
      address,
      youtube,
      linkedin,
      twitter,
      instagram,
      logo,
      bio,
      services = [],
      stats = {}
   } = userData || {};

   const banner = creatorBanner;
   const profile = logo || contentImages[0];

   return (
      <div className="min-h-screen bg-[#020617] text-white flex justify-center">

         <div className="w-full max-w-sm bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden relative">

            {/* ===========================
           BANNER WITH EFFECT
        =========================== */}
            <div className="relative h-48 overflow-hidden">
               <img
                  src={banner}
                  className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-[#020617]" />

               {/* GLOW EFFECT */}
               <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-cyan-500/20 to-transparent blur-xl" />
            </div>

            {/* ===========================
           PROFILE
        =========================== */}
            <div className="flex flex-col items-center text-center -mt-16 px-5">
               <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-xl border-4 border-[#020617] bg-black">
                  <img
                     src={profile}
                     className="w-full h-full object-cover"
                  />
               </div>

               <h1 className="text-2xl font-black mt-4 capitalize">
                  {displayName || "Digital Creator"}
               </h1>

               <p className="text-cyan-400 text-[10px] tracking-[0.3em] mt-2">
                  CREATOR • INFLUENCER • BRAND
               </p>
            </div>

            {/* ===========================
           MARQUEE
        =========================== */}
            <div className="mt-5 overflow-hidden whitespace-nowrap border-y border-white/10 py-2">
               <div className="animate-marquee text-xs text-white/60 tracking-widest">
                  🚀 CONTENT • BRANDING • COLLABORATION • GROWTH • SOCIAL MEDIA 🚀
               </div>
            </div>

            {/* ===========================
           BIO
        =========================== */}
            {bio && (
               <div className="px-5 mt-4 text-sm text-white/70 text-center leading-6">
                  {bio}
               </div>
            )}

            {/* ===========================
           STATS
        =========================== */}
            <div className="grid grid-cols-3 gap-3 px-5 mt-5">
               <Stat icon={FiIcons.FiUsers} label="Followers" value={stats.followers || "120K"} />
               <Stat icon={FiIcons.FiEye} label="Views" value={stats.views || "2M"} />
               <Stat icon={FiIcons.FiHeart} label="Likes" value={stats.likes || "80K"} />
            </div>

            {/* ===========================
           FEATURED CONTENT (NEW)
        =========================== */}
            <div className="px-5 mt-6">
               <h2 className="text-sm font-bold mb-3 text-white/70 uppercase">
                  Featured Content
               </h2>

               <div className="grid grid-cols-2 gap-3">
                  {contentImages.map((img, i) => (
                     <div
                        key={i}
                        className="rounded-xl overflow-hidden group relative"
                     >
                        <img
                           src={img}
                           className="w-full h-28 object-cover group-hover:scale-110 transition-all duration-500"
                        />

                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                           <FiIcons.FiPlay />
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* ===========================
           SERVICES
        =========================== */}
            {services.length > 0 && (
               <div className="px-5 mt-6">
                  <h2 className="text-sm font-bold mb-3 text-white/70 uppercase">
                     Services
                  </h2>

                  <div className="flex flex-wrap gap-2">
                     {services.map((item, i) => (
                        <span
                           key={i}
                           className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded-full"
                        >
                           {item}
                        </span>
                     ))}
                  </div>
               </div>
            )}

            {/* ===========================
           CONTACT
        =========================== */}
            <div className="px-5 mt-6 space-y-3">
               <Row icon={FiIcons.FiGlobe} value={website} />
               <Row icon={FiIcons.FiMail} value={email} />
               <Row icon={FiIcons.FiPhone} value={phone} />
               <Row icon={FiIcons.FiMapPin} value={address} />
            </div>

            {/* ===========================
           SOCIAL
        =========================== */}
            <div className="px-5 mt-6 flex justify-between">
               <Social icon={FiIcons.FiYoutube} link={youtube} />
               <Social icon={FiIcons.FiInstagram} link={instagram} />
               <Social icon={FiIcons.FiTwitter} link={twitter} />
               <Social icon={FiIcons.FiLinkedin} link={linkedin} />
            </div>

            {/* ===========================
           CTA
        =========================== */}
            <div className="px-5 mt-6 mb-6">
               <button
                  onClick={() => downloadVCard(userData)}
                  className="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black rounded-xl uppercase text-xs tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg"
               >
                  <FiIcons.FiUserPlus size={14} />
                  Save Contact
               </button>
            </div>

            <PoweredBy />
         </div>

         {/* ===========================
         MARQUEE STYLE
      =========================== */}
         <style jsx>{`
        .animate-marquee {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 12s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

      </div>
   );
};

/* ===========================
   SMALL COMPONENTS
=========================== */

const Stat = ({ icon: Icon, label, value }) => (
   <div className="bg-white/5 p-3 rounded-xl text-center">
      <Icon className="mx-auto mb-1 text-cyan-400" size={16} />
      <p className="font-bold">{value}</p>
      <p className="text-[9px] text-white/40 uppercase">{label}</p>
   </div>
);

const Row = ({ icon: Icon, value }) => {
   if (!value) return null;
   return (
      <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl text-sm">
         <Icon size={14} className="text-cyan-400" />
         <span className="truncate">{value}</span>
      </div>
   );
};

const Social = ({ icon: Icon, link }) => {
   if (!link) return null;
   return (
      <a
         href={link}
         target="_blank"
         rel="noopener noreferrer"
         className="w-11 h-11 flex items-center justify-center bg-white/5 rounded-xl hover:bg-cyan-500 hover:text-black transition-all"
      >
         <Icon size={18} />
      </a>
   );
};

export default DigitalCreator;