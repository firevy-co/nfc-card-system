import React, { useState } from 'react';
import {
   FiBox,
   FiPhone,
   FiMail,
   FiGlobe,
   FiYoutube,
   FiTwitter,
   FiInstagram,
   FiLinkedin,
   FiMapPin,
   FiUserPlus,
   FiCode,
   FiImage,
   FiLayers,
   FiMessageCircle,
   FiChevronDown
} from 'react-icons/fi';

import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

/* ===========================
   BANNER IMAGE
=========================== */
const bannerImg =
   "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=1200&q=80";

/* ===========================
   ACTION ICON (Icon Only)
=========================== */
const ActionIcon = ({ icon: Icon, href }) => {
   if (!href) return null;
   return (
      <a
         href={href}
         target="_blank"
         rel="noopener noreferrer"
         className="w-12 h-12 flex items-center justify-center bg-white border-2 border-black rounded-xl hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none text-black"
      >
         <Icon size={20} />
      </a>
   );
};

/* ===========================
   SERVICE CARD
=========================== */
const ServiceCard = ({ icon: Icon, title }) => (
   <div className="flex flex-col items-center justify-center bg-white border-2 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all">
      <Icon size={24} className="mb-2 text-black" />
      <span className="text-xs font-bold text-black uppercase">{title}</span>
   </div>
);

/* ===========================
   GALLERY
=========================== */
const Gallery = () => {
   const images = [
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?auto=format&fit=crop&w=500&q=80"
   ];

   return (
      <div className="grid grid-cols-2 gap-4">
         {images.map((img, i) => (
            <div key={i} className="border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white h-32">
               <img
                  src={img}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  alt="gallery"
               />
            </div>
         ))}
      </div>
   );
};

/* ===========================
   FAQ ACCORDION
=========================== */
const FaqAccordion = () => {
   const [open, setOpen] = useState(null);
   const faqs = [
      { q: "What software do you use?", a: "I primarily use Blender, Cinema4D, and MagicaVoxel for my 3D art." },
      { q: "Are you open for commissions?", a: "Yes, I am currently accepting freelance projects and commissions." },
      { q: "How long does a project take?", a: "Depending on the complexity, it usually takes 1 to 3 weeks." }
   ];

   return (
      <div className="space-y-3">
         {faqs.map((faq, i) => (
            <div key={i} className="border-2 border-black rounded-xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
               <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex justify-between items-center p-4 text-left font-bold text-sm"
               >
                  {faq.q}
                  <FiChevronDown className={`transition-transform ${open === i ? "rotate-180" : ""}`} />
               </button>
               {open === i && (
                  <div className="p-4 pt-0 text-xs font-medium text-gray-700 border-t-2 border-dashed border-gray-200">
                     {faq.a}
                  </div>
               )}
            </div>
         ))}
      </div>
   );
};

/* ===========================
   SOCIAL
=========================== */
const VoxelSocial = ({ icon: Icon, href }) => {
   if (!href) return null;
   return (
      <a
         href={href}
         target="_blank"
         rel="noopener noreferrer"
         className="text-gray-400 hover:text-black transition transform hover:scale-110"
      >
         <Icon size={24} />
      </a>
   );
};

/* ===========================
   MAIN COMPONENT
=========================== */
const VoxelArtist = ({ userData }) => {
   const {
      displayName,
      email,
      phone,
      website,
      address,
      youtube,
      linkedin,
      twitter,
      instagram,
      logo
   } = userData || {};

   // Format WhatsApp link from phone number
   const whatsappLink = phone ? `https://wa.me/${phone.replace(/\D/g, '')}` : null;
   const mapsLink = address ? `https://maps.google.com/?q=${encodeURIComponent(address)}` : null;

   return (
      <div className="min-h-screen w-full font-['Space_Grotesk',sans-serif] bg-[#f0f0f0] overflow-x-hidden">

         {/* ===========================
         BANNER FULL
      =========================== */}
         <div className="relative w-full h-[280px] bg-black">
            <img
               src={bannerImg}
               className="w-full h-full object-cover opacity-80"
               alt="banner"
            />
            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

            {/* PROFILE INSIDE BANNER */}
            <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 text-center w-full">
               <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white mx-auto relative z-10">
                  {logo ? (
                     <img src={logo} alt="logo" className="w-full h-full object-cover" />
                  ) : (
                     <div className="flex items-center justify-center w-full h-full bg-blue-500 text-white">
                        <FiBox size={36} />
                     </div>
                  )}
               </div>
               
               <h1 className="text-2xl font-black text-black mt-4 drop-shadow-sm uppercase tracking-tighter">
                  {displayName || "Voxel Artist"}
               </h1>
               <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">
                  Digital Creator
               </p>
            </div>
         </div>

         {/* ===========================
         MARQUEE
      =========================== */}
         <div className="mt-20 border-y-2 border-black bg-yellow-300 py-3 overflow-hidden whitespace-nowrap flex items-center shadow-[0_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="animate-marquee inline-block text-xs font-black uppercase tracking-widest text-black">
               • 3D MODELING • NFT ART • WEB3 DESIGN • ANIMATION • METAVERSE ARCHITECTURE • VOXEL ART • GAME ASSETS • 
            </div>
         </div>

         {/* ===========================
         CONTENT
      =========================== */}
         <div className="px-5 pt-10 pb-10 max-w-md mx-auto">

            {/* ACTION ICONS (Contact Row) */}
            <div className="flex justify-center gap-4 mb-10">
               <ActionIcon icon={FiMessageCircle} href={whatsappLink} />
               <ActionIcon icon={FiMail} href={email ? `mailto:${email}` : null} />
               <ActionIcon icon={FiGlobe} href={website} />
               <ActionIcon icon={FiMapPin} href={mapsLink} />
            </div>

            {/* SERVICES */}
            <div className="mb-10">
               <h2 className="text-sm font-black mb-4 uppercase tracking-widest border-b-2 border-black inline-block pb-1">Our Services</h2>
               <div className="grid grid-cols-3 gap-4">
                  <ServiceCard icon={FiCode} title="Web3" />
                  <ServiceCard icon={FiLayers} title="3D Art" />
                  <ServiceCard icon={FiImage} title="NFTs" />
               </div>
            </div>

            {/* GALLERY */}
            <div className="mb-10">
               <h2 className="text-sm font-black mb-4 uppercase tracking-widest border-b-2 border-black inline-block pb-1">Portfolio</h2>
               <Gallery />
            </div>

            {/* FAQ */}
            <div className="mb-10">
               <h2 className="text-sm font-black mb-4 uppercase tracking-widest border-b-2 border-black inline-block pb-1">F.A.Q</h2>
               <FaqAccordion />
            </div>

            {/* SOCIAL */}
            <div className="flex justify-center gap-6 mt-8 mb-8 border-t-2 border-dashed border-gray-300 pt-8">
               <VoxelSocial icon={FiInstagram} href={instagram} />
               <VoxelSocial icon={FiYoutube} href={youtube} />
               <VoxelSocial icon={FiTwitter} href={twitter} />
               <VoxelSocial icon={FiLinkedin} href={linkedin} />
            </div>

            {/* BUTTON */}
            <div className="mt-4 pb-4">
               <button
                  onClick={() => downloadVCard(userData)}
                  className="w-full py-4 bg-black text-white font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 hover:bg-gray-800 transition shadow-[4px_4px_0px_0px_rgba(156,163,175,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(156,163,175,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
               >
                  <FiUserPlus size={18} /> Save Contact
               </button>
            </div>

            <PoweredBy />
         </div>

         {/* MARQUEE CSS */}
         <style dangerouslySetInnerHTML={{ __html: `
            .animate-marquee {
               animation: marquee 15s linear infinite;
               padding-left: 100%;
            }
            @keyframes marquee {
               0% { transform: translateX(0); }
               100% { transform: translateX(-100%); }
            }
         `}} />
      </div>
   );
};

export default VoxelArtist;