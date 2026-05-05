import React, { useState } from 'react';
import {
   FiTv,
   FiPhone,
   FiMail,
   FiGlobe,
   FiYoutube,
   FiTwitter,
   FiInstagram,
   FiLinkedin,
   FiTwitch,
   FiMapPin,
   FiUserPlus,
   FiMonitor,
   FiVideo,
   FiHeadphones,
   FiActivity,
   FiMessageCircle,
   FiChevronDown
} from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

/* ===========================
   BANNER IMAGE
=========================== */
const bannerImg =
   "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=1200&q=80"; // Streaming setup

/* ===========================
   ACTION ICON (Glass)
=========================== */
const ActionIcon = ({ icon: Icon, href, colorClass }) => {
   if (!href) return null;
   return (
      <a
         href={href}
         target="_blank"
         rel="noopener noreferrer"
         className={`w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-xl hover:scale-110 hover:bg-white/10 transition-all duration-300 ${colorClass}`}
      >
         <Icon size={20} />
      </a>
   );
};

/* ===========================
   STATS / SCHEDULE CARD (Glass)
=========================== */
const StreamStatCard = ({ icon: Icon, title, description }) => (
   <div className="flex flex-col p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6441a5] to-purple-500 flex items-center justify-center mb-3">
         <Icon size={18} className="text-white" />
      </div>
      <span className="text-sm font-bold text-white tracking-wide">{title}</span>
      <span className="text-xs text-white/50 mt-1">{description}</span>
   </div>
);

/* ===========================
   GALLERY (Creator focused)
=========================== */
const Gallery = () => {
   const images = [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=500&q=80"
   ];

   return (
      <div className="grid grid-cols-2 gap-3">
         {images.map((img, i) => (
            <div key={i} className="rounded-2xl overflow-hidden aspect-square border border-white/10 relative group">
               <img
                  src={img}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  alt="gallery"
               />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-500" />
            </div>
         ))}
      </div>
   );
};

/* ===========================
   FAQ ACCORDION (Glass)
=========================== */
const FaqAccordion = () => {
   const [open, setOpen] = useState(null);
   const faqs = [
      { q: "What's your stream schedule?", a: "I stream live every Tuesday, Thursday, and Saturday at 8 PM EST." },
      { q: "What PC specs do you have?", a: "Ryzen 9 5900X, RTX 3080 Ti, 32GB RAM, and a custom water loop." },
      { q: "Are you open to sponsorships?", a: "Yes, please reach out via email for brand deals and integrations." }
   ];

   return (
      <div className="space-y-3">
         {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-300">
               <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex justify-between items-center p-5 text-left font-semibold text-sm text-white"
               >
                  {faq.q}
                  <FiChevronDown className={`text-white/50 transition-transform duration-500 ${open === i ? "rotate-180" : ""}`} />
               </button>
               <div className={`overflow-hidden transition-all duration-500 ${open === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="p-5 pt-0 text-xs text-white/60 leading-relaxed">
                     {faq.a}
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
};

/* ===========================
   SOCIAL (Glow)
=========================== */
const SocialIcon = ({ icon: Icon, href, hoverColor }) => {
   if (!href) return null;
   return (
      <a
         href={href}
         target="_blank"
         rel="noopener noreferrer"
         className={`text-white/40 hover:${hoverColor} transition-all duration-300 transform hover:scale-110`}
      >
         <Icon size={22} />
      </a>
   );
};

/* ===========================
   MAIN COMPONENT
=========================== */
const StreamTemplate = ({ userData }) => {
   const {
      displayName,
      email,
      phone,
      website,
      address,
      youtube,
      linkedin,
      twitter,
      twitch,
      instagram,
      logo
   } = userData || {};

   const mainStreamLink = twitch || youtube || website;
   const whatsappLink = phone ? `https://wa.me/${phone.replace(/\D/g, '')}` : null;
   const mapsLink = address ? `https://maps.google.com/?q=${encodeURIComponent(address)}` : null;

   return (
      <div className="min-h-screen w-full font-['Inter',sans-serif] bg-[#09090b] overflow-x-hidden relative">

         {/* Background Glow Blobs */}
         <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#6441a5]/20 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
         <div className="absolute bottom-40 right-0 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none translate-x-1/3" />

         {/* ===========================
         BANNER 
      =========================== */}
         <div className="relative w-full h-[260px] rounded-b-[3rem] overflow-hidden">
            <img
               src={bannerImg}
               className="w-full h-full object-cover opacity-60"
               alt="banner"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#09090b]" />
         </div>

         {/* ===========================
         PROFILE SECTION
      =========================== */}
         <div className="relative -mt-20 px-6 z-10 flex flex-col items-center text-center">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#09090b] shadow-[0_0_30px_rgba(100,65,165,0.3)] bg-[#18181b]">
               {logo ? (
                  <img src={logo} alt="logo" className="w-full h-full object-cover" />
               ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-[#6441a5] to-purple-500 text-white">
                     <FiMonitor size={36} />
                  </div>
               )}
            </div>
            
            <h1 className="text-2xl font-black text-white mt-4 tracking-tight">
               {displayName || "Stream Creator"}
            </h1>
            <div className="flex items-center gap-2 mt-2 bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full">
               <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
               <span className="text-[10px] text-white/70 uppercase tracking-widest font-semibold">
                  Live Broadcaster
               </span>
            </div>
         </div>

         {/* ===========================
         MARQUEE
      =========================== */}
         <div className="mt-8 py-3 overflow-hidden whitespace-nowrap flex items-center bg-[#6441a5]/10 border-y border-[#6441a5]/30 backdrop-blur-md">
            <div className="animate-marquee inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#b088f5]">
               • ESPORTS • GAMING • JUST CHATTING • IRL • SPEEDRUNS • TOURNAMENTS • CONTENT CREATOR •
            </div>
         </div>

         {/* ===========================
         CONTENT
      =========================== */}
         <div className="px-6 pt-8 pb-10 max-w-md mx-auto relative z-10">

            {/* LIVE BUTTON */}
            {mainStreamLink && (
               <div className="mb-10">
                  <a href={mainStreamLink} target="_blank" rel="noopener noreferrer" className="w-full py-4 bg-[#6441a5] text-white font-bold text-sm tracking-widest uppercase rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(100,65,165,0.4)]">
                     {twitch ? <FiTwitch size={18} /> : (youtube ? <FiYoutube size={18} /> : <FiGlobe size={18} />)} Watch Live Now
                  </a>
               </div>
            )}

            {/* ACTION ICONS (Contact Row) */}
            <div className="flex justify-center gap-5 mb-12">
               <ActionIcon icon={FiMessageCircle} href={whatsappLink} colorClass="text-green-400" />
               <ActionIcon icon={FiMail} href={email ? `mailto:${email}` : null} colorClass="text-red-400" />
               <ActionIcon icon={FiGlobe} href={website} colorClass="text-blue-400" />
               <ActionIcon icon={FiMapPin} href={mapsLink} colorClass="text-yellow-400" />
            </div>

            {/* STATS / INFO */}
            <div className="mb-12">
               <h2 className="text-xs font-bold mb-4 uppercase tracking-[0.2em] text-white/40">Stream Info</h2>
               <div className="grid grid-cols-2 gap-3">
                  <StreamStatCard icon={FiVideo} title="1080p 60FPS" description="Crystal clear gameplay." />
                  <StreamStatCard icon={FiHeadphones} title="Pro Audio" description="Studio-grade sound." />
                  <StreamStatCard icon={FiTv} title="Schedule" description="Tues / Thurs / Sat." />
                  <StreamStatCard icon={FiActivity} title="Esports" description="Competitive ranks." />
               </div>
            </div>

            {/* GALLERY */}
            <div className="mb-12">
               <h2 className="text-xs font-bold mb-4 uppercase tracking-[0.2em] text-white/40">Highlights</h2>
               <Gallery />
            </div>

            {/* FAQ */}
            <div className="mb-12">
               <h2 className="text-xs font-bold mb-4 uppercase tracking-[0.2em] text-white/40">F.A.Q</h2>
               <FaqAccordion />
            </div>

            {/* SOCIAL */}
            <div className="flex justify-center gap-8 mt-12 mb-10">
               <SocialIcon icon={FiTwitch} href={twitch} hoverColor="text-[#6441a5]" />
               <SocialIcon icon={FiYoutube} href={youtube} hoverColor="text-red-500" />
               <SocialIcon icon={FiTwitter} href={twitter} hoverColor="text-blue-400" />
               <SocialIcon icon={FiInstagram} href={instagram} hoverColor="text-pink-500" />
               <SocialIcon icon={FiLinkedin} href={linkedin} hoverColor="text-blue-600" />
            </div>

            {/* BUTTON */}
            <div className="pb-6">
               <button
                  onClick={() => downloadVCard(userData)}
                  className="w-full py-4 bg-white/10 text-white font-bold text-sm tracking-wide rounded-2xl flex items-center justify-center gap-3 hover:bg-white hover:text-black hover:scale-[1.02] active:scale-95 transition-all"
               >
                  <FiUserPlus size={18} /> Save to Contacts
               </button>
            </div>

            <PoweredBy />
         </div>

         {/* MARQUEE CSS */}
         <style jsx>{`
            .animate-marquee {
               animation: marquee 15s linear infinite;
               padding-left: 100%;
            }
            @keyframes marquee {
               0% { transform: translateX(0); }
               100% { transform: translateX(-100%); }
            }
         `}</style>
      </div>
   );
};

export default StreamTemplate;
