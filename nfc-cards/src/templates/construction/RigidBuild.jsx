import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FiPhone, FiMail, FiGlobe, FiMapPin, FiArrowUpRight,
   FiLayers, FiCrosshair, FiMaximize, FiBox, FiCheck,
   FiChevronDown, FiDownload, FiAward, FiEye
} from 'react-icons/fi';
import { FaLinkedinIn, FaTwitter, FaInstagram, FaArchway, FaQuoteLeft } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Swiss Modernist Sub-components ---

const ArchCard = ({ children, delay = 0, className = "" }) => (
   <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.8, delay, type: "spring", bounce: 0.3 }}
      className={`bg-white border border-[#E5E5E5] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] relative overflow-hidden group ${className}`}
   >
      {children}
   </motion.div>
);

const GeoAccordion = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border-b border-[#E5E5E5] last:border-0 bg-white">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full py-5 px-6 flex justify-between items-center text-left focus:outline-none hover:bg-[#F9F9F8] transition-colors"
         >
            <span className="font-bold text-sm text-[#1A1A1A] pr-4 tracking-wide">{question}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="w-8 h-8 rounded-full bg-[#F3F3F1] flex items-center justify-center shrink-0">
               <FiChevronDown size={16} className="text-[#E24E34]" />
            </motion.div>
         </button>
         <AnimatePresence>
            {isOpen && (
               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <div className="px-6 pb-6 pt-2">
                     <p className="text-[#666] text-sm leading-relaxed font-light">
                        {answer}
                     </p>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

// --- Main Component ---

const RingBuild = ({ userData }) => {

   // Safe URL Formatter
   const formatUrl = (url) => {
      if (!url) return null;
      const stringUrl = String(url).trim();
      if (stringUrl === "") return null;
      return stringUrl.startsWith('http') ? stringUrl : `https://${stringUrl}`;
   };

   // Fictional Content for Master Architect / Builder
   const fictionalData = {
      displayName: "Elias Vance",
      role: "Principal Architect",
      phone: "+1 (312) 555-0198",
      email: "studio@vance-formworks.com",
      website: "www.vance-formworks.com",
      address: "444 N Michigan Ave, Suite 3400, Chicago, IL",
      businessName: "Vance Formworks",
      bio: "Specializing in parametric design and brutalist-minimal structural engineering. We sculpt light, space, and mass to forge environments that outlast generations.",
      defaultAvatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop",
      bannerImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
      linkedin: "elias-vance",
      twitter: "vance_arch",
      instagram: "vance.formworks",
      stats: [
         { label: "Built Sq.Ft.", val: "2.4M" },
         { label: "Global Awards", val: "18" },
         { label: "Active Cities", val: "12" }
      ],
      methodology: [
         { title: "Parametric Modeling", desc: "Algorithmic generation of complex geometric structures for optimal load distribution.", icon: FiCrosshair },
         { title: "Spatial Dynamics", desc: "Maximizing natural light and kinetic flow within high-density urban footprints.", icon: FiMaximize },
         { title: "Material Science", desc: "Sourcing ultra-high-performance concrete and adaptive carbon-steel frameworks.", icon: FiLayers }
      ],
      portfolio: [
         { title: "The Monolith Pavilion", location: "Berlin, DE", year: "2025", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=600&fit=crop" },
         { title: "Aura Corporate HQ", location: "Chicago, IL", year: "2024", img: "https://images.unsplash.com/photo-1517042571212-074464ea9bc5?w=600&h=600&fit=crop" },
         { title: "Vanguard Museum", location: "Tokyo, JP", year: "2023", img: "https://images.unsplash.com/photo-1428366890462-dd4baecf492b?w=600&h=600&fit=crop" }
      ],
      exhibitions: [
         { event: "Venice Biennale of Architecture", award: "Gold Lion Nominee", year: "2025" },
         { event: "Pritzker Symposium", award: "Keynote Speaker", year: "2024" },
         { event: "Global Design Summit", award: "Innovation in Concrete", year: "2023" }
      ],
      faqs: [
         { question: "Do you accept international commissions?", answer: "Yes, our studio operates globally. We partner with local executive architects to ensure compliance with regional zoning and building codes." },
         { question: "What is your typical project timeline?", answer: "Commercial and civic structures typically require 12-18 months of design and engineering before groundbreaking." },
         { question: "Do you offer interior spatial planning?", answer: "Our holistic approach ensures the exterior envelope and interior volumes are designed simultaneously for absolute cohesion." }
      ]
   };

   
   // ✅ MERGE: userData takes priority over fictional placeholders
   const data = {
      ...fictionalData,
      displayName: userData?.displayName || fictionalData.displayName,
      role: userData?.designation || userData?.job || userData?.businessRole || userData?.role || fictionalData.role || fictionalData.jobTitle,
      phone: userData?.phone || userData?.mobileNumber || fictionalData.phone,
      email: userData?.email || fictionalData.email,
      website: userData?.website || fictionalData.website,
      address: userData?.address || [userData?.city, userData?.state, userData?.country].filter(Boolean).join(', ') || fictionalData.address,
      businessName: userData?.companyName || userData?.company || userData?.businessName || fictionalData.businessName || fictionalData.company,
      whatsapp: userData?.whatsapp || fictionalData.whatsapp,
      linkedin: userData?.linkedin || fictionalData.linkedin,
      twitter: userData?.twitter || fictionalData.twitter,
      instagram: userData?.instagram || fictionalData.instagram,
      facebook: userData?.facebook || fictionalData.facebook,
      github: userData?.github || fictionalData.github,
      telegram: userData?.telegram || fictionalData.telegram,
      bio: userData?.bio || fictionalData.bio,
      profileImage: userData?.profileImage || userData?.avatar || userData?.logo || fictionalData.profileImage || fictionalData.avatar || fictionalData.defaultAvatar,
      avatar: userData?.profileImage || userData?.avatar || userData?.logo || fictionalData.profileImage || fictionalData.avatar || fictionalData.defaultAvatar,
      logo: userData?.logo || userData?.profileImage || fictionalData.logo,
      bannerImage: userData?.coverPhoto || fictionalData.bannerImage || fictionalData.coverImage };

   const vCardData = { ...userData, ...fictionalData };

   return (
      <div className="w-full min-h-screen bg-[#F3F3F1] text-[#1A1A1A] font-['Inter',sans-serif] selection:bg-[#E24E34] selection:text-white flex justify-center pb-12 overflow-x-hidden relative md:py-8">

         {/* ================= ARCHITECTURAL DOT GRID ================= */}
         <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply"
            style={{ backgroundImage: 'radial-gradient(#a3a3a3 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

         {/* Main App Container */}
         <div className="w-full max-w-[480px] relative z-10 bg-[#FAFAFA] shadow-[0_20px_60px_rgba(0,0,0,0.08)] min-h-screen border border-[#E5E5E5] flex flex-col md:rounded-[2rem] overflow-hidden">

            {/* ================= KINETIC HERO ================= */}
            <div className="w-full pt-16 px-6 relative z-20 flex flex-col items-center">

               <motion.div
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full"
               >
                  {data.companyName && (
                     <div className="flex justify-center mb-6">
                        <span className="bg-[#1A1A1A] text-white px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] shadow-md flex items-center gap-2">
                           <FiBox className="text-[#E24E34]" /> {data.companyName}
                        </span>
                     </div>
                  )}

                  <h1 className="text-4xl md:text-5xl font-['Syne'] font-extrabold text-center uppercase tracking-tighter leading-[0.9] text-[#1A1A1A] mb-4">
                     {data.displayName.split(' ').map((word, i) => (
                        <span key={i} className="block">{word}</span>
                     ))}
                  </h1>
                  <p className="text-center text-[#E24E34] font-bold text-xs uppercase tracking-[0.25em] mb-8">
                     {data.role}
                  </p>
               </motion.div>

               {/* Masked Arch Image Overlap */}
               <motion.div
                  initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                  className="w-full h-[320px] rounded-t-[10rem] border-[6px] border-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] overflow-hidden relative z-10 bg-[#E5E5E5]"
               >
                  <img src={data.avatar || data.bannerImage} alt="Cover" className="w-full h-full object-cover grayscale mix-blend-multiply opacity-90 hover:grayscale-0 hover:mix-blend-normal transition-all duration-1000" />

                  {/* Small Floating Logo/Badge */}
                  {(data.logo || data.avatar) && (
                     <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full p-1 shadow-lg border border-[#E5E5E5]">
                        <img src={data.logo || data.avatar} alt="Logo" className="w-full h-full rounded-full object-cover" />
                     </div>
                  )}
               </motion.div>
            </div>

            <div className="px-6 flex-1 space-y-6 pb-8 z-20 -mt-10 relative">

               {/* ================= STUDIO PHILOSOPHY ================= */}
               <ArchCard delay={0.1} className="mt-16 rounded-[2rem]">
                  <FaQuoteLeft className="text-[#F3F3F1] absolute top-6 right-6" size={48} />
                  <div className="relative z-10">
                     <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E24E34] mb-3">Studio Philosophy</h3>
                     <p className="text-[13px] text-[#444] leading-relaxed font-medium">
                        {data.bio}
                     </p>
                  </div>
               </ArchCard>

               {/* ================= HIGH-LEVEL METRICS ================= */}
               <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="grid grid-cols-3 gap-3">
                  {fictionalData.stats.map((stat, i) => (
                     <div key={i} className="bg-[#1A1A1A] text-white p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                        <span className="block text-2xl font-['Syne'] font-bold mb-1 text-[#E24E34]">{stat.val}</span>
                        <span className="block text-[8px] uppercase tracking-widest text-[#A3A3A3] font-bold">{stat.label}</span>
                     </div>
                  ))}
               </motion.div>

               {/* ================= DIRECTORY GRID ================= */}
               <ArchCard delay={0.2} className="rounded-[2rem] !p-2">
                  <div className="grid grid-cols-2 gap-2">
                     {[
                        { icon: FiPhone, link: `tel:${data.phone}`, label: "Studio Line" },
                        { icon: FiMail, link: `mailto:${data.email}`, label: "Email Desk" },
                        { icon: FiGlobe, link: formatUrl(data.website), label: "Web Portal" },
                        { icon: FiMapPin, link: data.address ? `https://maps.google.com/?q=${encodeURIComponent(data.address)}` : null, label: "Headquarters" }
                     ].map((action, i) => action.link && (
                        <a key={i} href={action.link} target="_blank" rel="noopener noreferrer" className="bg-[#F9F9F8] p-5 rounded-xl flex flex-col items-center gap-3 hover:bg-[#1A1A1A] hover:text-white transition-all group border border-[#E5E5E5]">
                           <action.icon size={20} className="text-[#E24E34] group-hover:text-white transition-colors" />
                           <span className="text-[9px] font-bold uppercase tracking-widest text-[#666] group-hover:text-[#A3A3A3] transition-colors">{action.label}</span>
                        </a>
                     ))}
                  </div>
               </ArchCard>

               {/* ================= METHODOLOGY ================= */}
               <ArchCard delay={0.3} className="rounded-[2rem]">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E24E34] mb-5">Engineering Methodology</h3>
                  <div className="space-y-4">
                     {fictionalData.methodology.map((meth, i) => (
                        <div key={i} className="flex gap-4 group">
                           <div className="w-10 h-10 rounded-full bg-[#F3F3F1] flex items-center justify-center text-[#1A1A1A] shrink-0 group-hover:bg-[#E24E34] group-hover:text-white transition-colors border border-[#E5E5E5]">
                              <meth.icon size={16} />
                           </div>
                           <div>
                              <h4 className="text-sm font-bold text-[#1A1A1A] mb-1">{meth.title}</h4>
                              <p className="text-xs text-[#666] leading-relaxed">{meth.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </ArchCard>

               {/* ================= ARCH-SHAPED PORTFOLIO ================= */}
               <div className="pt-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E24E34] mb-4 px-2">Selected Works</h3>
                  <div className="flex overflow-x-auto gap-4 snap-x hide-scrollbar pb-6 px-2">
                     {fictionalData.portfolio.map((item, idx) => (
                        <div key={idx} className="min-w-[200px] snap-center group cursor-pointer">
                           <div className="h-[260px] w-full rounded-t-full overflow-hidden relative mb-4 border border-[#E5E5E5] shadow-sm bg-[#E5E5E5]">
                              <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale mix-blend-multiply group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-700" />
                              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white text-[#1A1A1A] font-bold text-[9px] uppercase px-3 py-1 rounded-full shadow-md tracking-widest">
                                 {item.year}
                              </div>
                           </div>
                           <div className="text-center px-2">
                              <h4 className="text-sm font-['Syne'] font-bold text-[#1A1A1A] uppercase tracking-tight mb-1">{item.title}</h4>
                              <p className="text-[9px] font-bold uppercase tracking-widest text-[#666]">{item.location}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* ================= EXHIBITIONS ================= */}
               <ArchCard delay={0.4} className="rounded-[2rem] !p-0 overflow-hidden">
                  <div className="p-6 border-b border-[#E5E5E5] bg-[#F9F9F8]">
                     <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E24E34]">Exhibitions & Awards</h3>
                  </div>
                  <div className="divide-y divide-[#E5E5E5]">
                     {fictionalData.exhibitions.map((exh, i) => (
                        <div key={i} className="p-5 flex items-center justify-between hover:bg-[#F9F9F8] transition-colors">
                           <div className="flex items-center gap-3">
                              <FiAward className="text-[#A3A3A3]" size={18} />
                              <div>
                                 <p className="text-xs font-bold text-[#1A1A1A] uppercase mb-0.5">{exh.award}</p>
                                 <p className="text-[10px] text-[#666] font-medium">{exh.event}</p>
                              </div>
                           </div>
                           <span className="text-[10px] font-bold text-[#E24E34] bg-[#E24E34]/10 px-2 py-1 rounded">{exh.year}</span>
                        </div>
                     ))}
                  </div>
               </ArchCard>

               {/* ================= FAQ & OPERATIONS ================= */}
               <ArchCard delay={0.5} className="rounded-[2rem] !p-0 overflow-hidden">
                  <div className="p-6 border-b border-[#E5E5E5] bg-[#F9F9F8]">
                     <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E24E34]">Client Advisory</h3>
                  </div>
                  <div>
                     {fictionalData.faqs.map((faq, index) => <GeoAccordion key={index} question={faq.question} answer={faq.answer} />)}
                  </div>
               </ArchCard>

               {/* ================= SOCIAL NETWORK ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="py-4">
                  <div className="flex justify-center gap-4">
                     {[
                        { val: data.linkedin, icon: FaLinkedinIn, link: `https://linkedin.com/in/${data.linkedin}` },
                        { val: data.twitter, icon: FaTwitter, link: `https://twitter.com/${data.twitter}` },
                        { val: data.instagram, icon: FaInstagram, link: `https://instagram.com/${data.instagram}` }
                     ].map((social, i) => social.val && (
                        <a
                           key={i} href={formatUrl(social.link.replace(/([^:]\/)\/+/g, "$1"))} target="_blank" rel="noopener noreferrer"
                           className="w-14 h-14 bg-white border border-[#E5E5E5] flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.05)] hover:-translate-y-1"
                        >
                           <social.icon size={18} />
                        </a>
                     ))}
                  </div>
               </motion.div>

               {/* ================= EXACT "STORE IDENTITY" BUTTON (INLINE) ================= */}
               <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pt-2 pb-4">
                  <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={() => downloadVCard(vCardData)}
                     className="w-full bg-[#1A1A1A] text-white py-5 rounded-[2rem] font-bold text-xs tracking-[0.2em] uppercase shadow-[0_15px_30px_rgba(26,26,26,0.3)] flex items-center justify-center gap-3 transition-transform hover:bg-[#E24E34] hover:shadow-[0_15px_30px_rgba(226,78,52,0.3)]"
                  >
                     <FiDownload size={20} className="text-white" strokeWidth={2.5} />
                     STORE IDENTITY
                  </motion.button>
               </motion.div>

            </div>

            {/* ================= FOOTER ================= */}
            <div className="w-full py-6 text-center border-t border-[#E5E5E5] bg-[#FAFAFA] mt-auto relative z-20">
               <PoweredBy />
            </div>

         </div>

         {/* Font Injection */}
         <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      </div>
   );
};

export default RingBuild;