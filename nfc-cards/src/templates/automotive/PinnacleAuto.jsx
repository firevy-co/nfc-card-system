import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FiPhone, FiMail, FiGlobe, FiMapPin, FiInstagram, FiLinkedin,
   FiChevronDown, FiShield, FiKey, FiCompass, FiStar,
   FiClock, FiUserPlus, FiArrowUpRight, FiSliders
} from 'react-icons/fi';
import { FaWhatsapp, FaYoutube, FaCar } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Sleek Automotive Sub-components ---

const ChromeCard = ({ children, className = "" }) => (
   <div className={`bg-[#121212] border border-[#2A2A2A] rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.5)] ${className}`}>
      {children}
   </div>
);

const SectionTitle = ({ title, subtitle, icon: Icon }) => (
   <div className="mb-6 flex items-center gap-3">
      {Icon && <div className="p-2 bg-[#1A1A1A] border border-[#333] rounded-lg text-blue-500"><Icon size={18} /></div>}
      <div>
         <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 block mb-0.5">{title}</span>
         <h2 className="text-xl font-semibold text-gray-100 tracking-tight">{subtitle}</h2>
      </div>
   </div>
);

const AutoAccordion = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border-b border-[#2A2A2A] last:border-0">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full py-4 flex justify-between items-center text-left focus:outline-none group"
         >
            <span className="font-medium text-sm text-gray-300 group-hover:text-blue-400 transition-colors pr-4">{question}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
               <FiChevronDown size={18} className="text-gray-500 group-hover:text-blue-400" />
            </motion.div>
         </button>
         <AnimatePresence>
            {isOpen && (
               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <p className="pb-4 text-gray-500 text-sm leading-relaxed">
                     {answer}
                  </p>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

// --- Main Component ---

const ExoticAutoBroker = ({ userData }) => {
   // Completely Fictional Persona: Exotic Car Broker
   const fictionalData = {
      displayName: "Julian Cross",
      role: "Exotic Vehicle Concierge",
      phone: "+1 (310) 555-8900",
      email: "julian@apexexotics.auto",
      website: "www.apexexotics.auto",
      address: "9000 Sunset Blvd, West Hollywood, CA",
      businessName: "Apex Exotics & Acquisitions",
      twitter: "apex_exotics",
      instagram: "apex.exotics.la",
      youtube: "apexexotics",
      linkedin: "juliancrossauto",
      whatsapp: "13105558900",
      bio: "Sourcing the world's most elusive hypercars and luxury vehicles for discerning collectors. From off-market allocations to bespoke custom commissions.",
      profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
      bannerImage: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&h=600&fit=crop",
      stats: [
         { label: "Vehicles Sourced", val: "300+" },
         { label: "Global Partners", val: "45" },
         { label: "Years Active", val: "12" }
      ],
      services: [
         { title: "Off-Market Acquisitions", desc: "Access to private collections and unlisted hypercars.", icon: FiKey },
         { title: "Bespoke Commissions", desc: "Managing custom builds directly with Ferrari, Porsche, and MSO.", icon: FiSliders },
         { title: "Secure Transport", desc: "Enclosed, fully-insured global logistics and delivery.", icon: FiCompass }
      ],
      inventory: [
         { title: "Porsche 911 GT3 RS", specs: "Weissach Package • 800 Miles", img: "https://images.unsplash.com/photo-1503376710915-18528c7bb807?w=600&h=600&fit=crop" },
         { title: "McLaren 765LT", specs: "MSO Carbon Theme • 1,200 Miles", img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&h=600&fit=crop" },
         { title: "Ferrari 488 Pista", specs: "Rosso Corsa • 2,100 Miles", img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=600&fit=crop" },
         { title: "Aston Martin DBS", specs: "Superleggera • 500 Miles", img: "https://images.unsplash.com/photo-1599912027806-ceee1bea7469?w=600&h=600&fit=crop" }
      ],
      testimonials: [
         { name: "Robert H.", role: "Private Collector", text: "Julian sourced a highly coveted allocation for me within weeks. His discretion and network are unmatched in Los Angeles." },
         { name: "David M.", role: "CEO, TechFirm", text: "Seamless transaction. Apex handled the inspection, financing, and enclosed delivery of my GT3 RS directly to my driveway." }
      ],
      hours: [
         { day: "Mon - Fri", hours: "09:00 AM - 07:00 PM" },
         { day: "Saturday", hours: "By Appointment Only" },
         { day: "Sunday", hours: "Closed" }
      ],
      faqs: [
         { question: "Do you accept trade-ins?", answer: "Yes, we accept high-line trades. We conduct a thorough pre-purchase inspection and offer competitive market values to apply toward your next acquisition." },
         { question: "Can you assist with financing?", answer: "Absolutely. We partner with elite financial institutions specializing in exotic auto loans and open-ended leasing for assets over $200k." },
         { question: "Do you ship internationally?", answer: "Yes, we handle full international export, including customs documentation, homologation compliance, and air/sea freight logistics." }
      ]
   };

   const vCardData = { ...userData, ...fictionalData };

   const fadeUp = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
   };

   return (
      <div className="w-full min-h-screen bg-[#050505] text-gray-300 font-['Inter',sans-serif] selection:bg-blue-600 selection:text-white flex justify-center pb-12">

         {/* Container - Notice pb-0 because the button is INSIDE the flow now */}
         <div className="w-full max-w-[480px] bg-[#0A0A0A] relative shadow-[0_0_40px_rgba(0,0,0,0.8)] min-h-screen border-x border-[#1A1A1A] flex flex-col">

            {/* ================= HEADER & SHOWROOM BANNER ================= */}
            <div className="w-full h-[280px] relative">
               <img src={fictionalData.bannerImage} alt="Showroom" className="w-full h-full object-cover opacity-60" />
               <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0A0A0A]" />
            </div>

            {/* ================= IDENTITY ================= */}
            <div className="px-6 relative -mt-20 z-10 mb-8">
               <motion.div
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
                  className="flex flex-col items-center text-center"
               >
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#0A0A0A] bg-[#121212] shadow-2xl mb-4 relative z-10">
                     <img src={fictionalData.profileImage} alt={fictionalData.displayName} className="w-full h-full object-cover" />
                  </div>

                  <h1 className="text-2xl font-bold text-white tracking-tight mb-1">
                     {fictionalData.displayName}
                  </h1>
                  <p className="text-blue-500 font-medium text-xs uppercase tracking-widest mb-4">
                     {fictionalData.role}
                  </p>

                  <div className="bg-[#121212] border border-[#2A2A2A] px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                     <FiShield className="text-blue-500" size={14} />
                     {fictionalData.businessName}
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed px-2">
                     {fictionalData.bio}
                  </p>
               </motion.div>
            </div>

            <div className="px-6 flex-1 space-y-6">

               {/* ================= QUICK STATS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-3 gap-3">
                  {fictionalData.stats.map((stat, i) => (
                     <div key={i} className="bg-[#121212] border border-[#2A2A2A] rounded-xl p-3 text-center">
                        <span className="block text-lg font-bold text-white mb-1">{stat.val}</span>
                        <span className="block text-[8px] uppercase tracking-widest text-gray-500 font-semibold">{stat.label}</span>
                     </div>
                  ))}
               </motion.div>

               {/* ================= COMMUNICATIONS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <ChromeCard>
                     <div className="grid grid-cols-2 gap-3 mb-4">
                        {fictionalData.phone && (
                           <a href={`tel:${fictionalData.phone}`} className="bg-[#1A1A1A] p-4 rounded-xl hover:bg-[#222] transition-colors flex flex-col items-center gap-2 border border-[#333]">
                              <FiPhone size={20} className="text-blue-500" />
                              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Call Desk</span>
                           </a>
                        )}
                        {fictionalData.email && (
                           <a href={`mailto:${fictionalData.email}`} className="bg-[#1A1A1A] p-4 rounded-xl hover:bg-[#222] transition-colors flex flex-col items-center gap-2 border border-[#333]">
                              <FiMail size={20} className="text-blue-500" />
                              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Email</span>
                           </a>
                        )}
                     </div>
                     {fictionalData.website && (
                        <a href={`https://${fictionalData.website}`} target="_blank" rel="noopener noreferrer" className="w-full bg-[#1A1A1A] border border-[#333] p-4 rounded-xl flex justify-between items-center hover:bg-[#222] transition-colors group">
                           <span className="font-bold text-xs uppercase tracking-widest text-gray-300">View Inventory Portal</span>
                           <FiGlobe className="text-gray-500 group-hover:text-blue-500 transition-colors" />
                        </a>
                     )}
                  </ChromeCard>
               </motion.div>

               {/* ================= SERVICES ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionTitle title="Offerings" subtitle="Concierge Services" icon={FiKey} />
                  <div className="space-y-3">
                     {fictionalData.services.map((svc, i) => (
                        <ChromeCard key={i} className="flex gap-4 group hover:border-[#444] transition-colors">
                           <div className="mt-0.5">
                              <svc.icon size={20} className="text-blue-500" />
                           </div>
                           <div>
                              <h4 className="text-sm font-bold text-gray-200 mb-1">{svc.title}</h4>
                              <p className="text-xs text-gray-500 leading-relaxed">{svc.desc}</p>
                           </div>
                        </ChromeCard>
                     ))}
                  </div>
               </motion.div>

               {/* ================= INVENTORY (HORIZONTAL SCROLL) ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionTitle title="Vault" subtitle="Available Allocations" icon={FaCar} />
                  <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar -mx-6 px-6">
                     {fictionalData.inventory.map((item, idx) => (
                        <div key={idx} className="min-w-[260px] bg-[#121212] border border-[#2A2A2A] rounded-2xl overflow-hidden snap-center group cursor-pointer">
                           <div className="h-40 w-full overflow-hidden">
                              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                           </div>
                           <div className="p-4 flex justify-between items-start">
                              <div>
                                 <h4 className="text-sm font-bold text-gray-100 mb-1 truncate">{item.title}</h4>
                                 <p className="text-[10px] uppercase tracking-widest text-blue-500 font-semibold truncate">{item.specs}</p>
                              </div>
                              <FiArrowUpRight className="text-gray-600 group-hover:text-white transition-colors shrink-0" />
                           </div>
                        </div>
                     ))}
                  </div>
               </motion.div>

               {/* ================= REVIEWS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionTitle title="Reputation" subtitle="Client Feedback" icon={FiStar} />
                  <div className="space-y-4">
                     {fictionalData.testimonials.map((test, i) => (
                        <ChromeCard key={i}>
                           <div className="flex gap-1 text-blue-500 mb-3">
                              <FiStar size={12} className="fill-current" /><FiStar size={12} className="fill-current" /><FiStar size={12} className="fill-current" /><FiStar size={12} className="fill-current" /><FiStar size={12} className="fill-current" />
                           </div>
                           <p className="text-sm text-gray-400 italic mb-4 leading-relaxed">"{test.text}"</p>
                           <div className="flex items-center gap-3 border-t border-[#2A2A2A] pt-4">
                              <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-gray-300 font-bold text-xs border border-[#333]">
                                 {test.name.charAt(0)}
                              </div>
                              <div>
                                 <p className="text-xs font-bold text-gray-200">{test.name}</p>
                                 <p className="text-[9px] uppercase tracking-widest text-gray-500">{test.role}</p>
                              </div>
                           </div>
                        </ChromeCard>
                     ))}
                  </div>
               </motion.div>

               {/* ================= SHOWROOM INFO & FAQ ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionTitle title="Logistics" subtitle="Showroom Details" icon={FiMapPin} />
                  <ChromeCard>

                     {fictionalData.address && (
                        <div className="flex items-start gap-4 pb-5 border-b border-[#2A2A2A] mb-5">
                           <FiMapPin size={20} className="text-blue-500 mt-0.5 shrink-0" />
                           <div>
                              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1">Location</p>
                              <p className="text-sm font-medium text-gray-200 leading-snug">{fictionalData.address}</p>
                           </div>
                        </div>
                     )}

                     <div className="mb-6">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-3 flex items-center gap-2"><FiClock /> Operating Hours</p>
                        {fictionalData.hours.map((bh, i) => (
                           <div key={i} className="flex justify-between items-center py-1.5 text-xs">
                              <span className="text-gray-400">{bh.day}</span>
                              <span className="font-semibold text-gray-200">{bh.hours}</span>
                           </div>
                        ))}
                     </div>

                     <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-3">Policies & FAQ</p>
                        {fictionalData.faqs.map((faq, index) => <AutoAccordion key={index} question={faq.question} answer={faq.answer} />)}
                     </div>
                  </ChromeCard>
               </motion.div>

               {/* ================= SOCIAL NETWORK ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <div className="flex justify-center gap-3">
                     {[
                        { val: fictionalData.instagram, icon: FiInstagram, link: `https://instagram.com/${fictionalData.instagram}` },
                        { val: fictionalData.linkedin, icon: FiLinkedin, link: `https://linkedin.com/in/${fictionalData.linkedin}` },
                        { val: fictionalData.youtube, icon: FaYoutube, link: `https://youtube.com/${fictionalData.youtube}` },
                        { val: fictionalData.whatsapp, icon: FaWhatsapp, link: `https://wa.me/${fictionalData.whatsapp}` }
                     ].map((social, i) => social.val && (
                        <a
                           key={i} href={social.link} target="_blank" rel="noopener noreferrer"
                           className="w-12 h-12 bg-[#121212] border border-[#2A2A2A] rounded-xl flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all shadow-sm"
                        >
                           <social.icon size={18} />
                        </a>
                     ))}
                  </div>
               </motion.div>

            </div>

            {/* ================= SAVE CONTACT CTA (INLINE / NOT FIXED) ================= */}
            {/* Placed here at the bottom of the content flow, just above the footer */}
            <div className="px-6 mt-10 mb-6">
               <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => downloadVCard(vCardData)}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-sm shadow-[0_8px_20px_rgba(59,130,246,0.3)] hover:bg-blue-500 transition-all flex items-center justify-center gap-2"
               >
                  <FiUserPlus size={20} />
                  <span>Save Contact</span>
               </motion.button>
            </div>

            {/* Footer */}
            <div className="pb-8 pt-4 text-center border-t border-[#1A1A1A]">
               <PoweredBy />
            </div>

         </div>

         <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      </div>
   );
};

export default ExoticAutoBroker;