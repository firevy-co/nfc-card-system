import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FiPhone, FiMail, FiGlobe, FiMapPin, FiLinkedin, FiTwitter,
   FiUserPlus, FiChevronDown, FiBriefcase, FiPieChart, FiTrendingUp,
   FiFileText, FiCalendar, FiClock, FiAward, FiArrowUpRight, FiTarget,
   FiPlayCircle, FiDownload
} from 'react-icons/fi';
import { FaLinkedinIn, FaTwitter, FaBuilding, FaQuoteLeft, FaChartLine } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Glassmorphism Sub-components ---

const GlassPanel = ({ title, children, icon: Icon, delay = 0, className = "" }) => (
   <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden mb-6 relative ${className}`}
   >
      {/* Animated Gradient Glow Behind Panel */}
      <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000 rotate-45 pointer-events-none" />

      {title && (
         <div className="flex items-center gap-4 px-6 pt-6 pb-4 border-b border-white/10 relative z-10">
            {Icon && <div className="p-2 bg-white/10 rounded-xl shrink-0"><Icon size={20} className="text-emerald-400" /></div>}
            <h3 className="font-['Playfair_Display'] font-bold text-white text-xl tracking-wide leading-tight">{title}</h3>
         </div>
      )}
      <div className="p-6 relative z-10">
         {children}
      </div>
   </motion.div>
);

const GlassAccordion = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border-b border-white/10 last:border-b-0">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full py-5 flex justify-between items-center text-left focus:outline-none group"
         >
            <span className="font-semibold text-sm text-gray-200 group-hover:text-emerald-400 transition-colors pr-4 leading-snug">{question}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="shrink-0 bg-white/5 p-2 rounded-full group-hover:bg-emerald-400/20 transition-colors">
               <FiChevronDown size={16} className="text-gray-400 group-hover:text-emerald-400 transition-colors" />
            </motion.div>
         </button>
         <AnimatePresence>
            {isOpen && (
               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <div className="pb-5">
                     <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-emerald-400/50 pl-4 ml-2">
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

const BoldEntrepreneur = ({ userData }) => {
   // Completely Fictional Persona: Visionary Tech Investor / Strategist
   const fictionalData = {
      displayName: "Alexander Vance",
      role: "Managing Director & Visionary",
      phone: "+1 (415) 555-0922",
      email: "a.vance@lumina-ventures.co",
      website: "www.lumina-ventures.co",
      address: "Salesforce Tower, Floor 62, San Francisco, CA",
      businessName: "Lumina Ventures",
      twitter: "alexvance_vc",
      linkedin: "alexandervancelumina",
      bio: "Pioneering the future of deep tech and sustainable energy. I partner with visionary founders to scale transformative ideas into global market leaders through strategic capital and operational mastery.",
      profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      bannerImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop", // Earth from space / abstract
      stats: [
         { label: "Assets Managed", val: "$1.8B" },
         { label: "Portfolio Cos", val: "42" },
         { label: "Successful Exits", val: "14" }
      ],
      expertise: [
         { title: "Venture Capital Strategy", desc: "Identifying and scaling early-stage deep tech startups with asymmetrical upside potential.", icon: FiTrendingUp },
         { title: "Board Leadership", desc: "Providing operational oversight, governance, and crisis management for high-growth boards.", icon: FiTarget },
         { title: "Strategic M&A", desc: "Navigating complex acquisitions to maximize shareholder value and ensure seamless integration.", icon: FiBriefcase }
      ],
      caseStudies: [
         { title: "Project Aether", sector: "Clean Energy Tech", metric: "10x Return", img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=600&fit=crop" },
         { title: "Synapse Biotech", sector: "Healthcare AI", metric: "IPO ($2B+)", img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&h=600&fit=crop" },
         { title: "Quantum Logistics", sector: "Global Supply Chain", metric: "Acquired", img: "https://images.unsplash.com/photo-1586528116311-ad8ed7450fa3?w=600&h=600&fit=crop" }
      ],
      insights: [
         { title: "The Next Decade of Sustainable Deep Tech", date: "Nov 12, 2026", readTime: "8 Min Read" },
         { title: "Why Governance Fails in Hyper-Growth Startups", date: "Oct 05, 2026", readTime: "5 Min Read" }
      ],
      testimonials: [
         { name: "Dr. Elena Rostova", role: "CEO, Synapse Biotech", text: "Alexander doesn't just write a check; he architects the roadmap. His guidance during our pre-IPO phase was the defining factor in our success." },
         { name: "Marcus Thorne", role: "Founder, Aether Energy", text: "Lumina Ventures brings a level of operational clarity that is rare in the VC world. A true partner in the trenches." }
      ],
      hours: [
         { day: "Global Markets", hours: "24/7 Monitoring" },
         { day: "Executive Office", hours: "07:00 - 18:00 PST" }
      ],
      faqs: [
         { question: "What is Lumina Ventures' investment thesis?", answer: "We invest in Series A & B stage companies building foundational technologies in clean energy, biotechnology, and enterprise AI." },
         { question: "How involved are you post-investment?", answer: "Highly involved. We typically require a board seat or observer rights and provide direct access to our operational scaling team." },
         { question: "Do you accept cold pitches?", answer: "While we prefer warm introductions through our network, exceptional founders can submit executive summaries via our secure portal." }
      ]
   };

   const vCardData = { ...userData, ...fictionalData };


   // ✅ MERGE: userData takes priority over fictional placeholders
   
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
   const fadeUp = {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
   };

   return (
      <div className="w-full min-h-screen bg-[#050B14] text-gray-200 font-['Inter',sans-serif] selection:bg-emerald-500 selection:text-white flex justify-center pb-12 overflow-hidden relative">

         {/* Immersive Glassmorphism Background Orbs */}
         <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-[-20%] w-[70vw] h-[70vw] bg-emerald-900/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-20%] w-[80vw] h-[80vw] bg-blue-900/20 rounded-full blur-[140px]" />
            <div className="absolute top-[40%] right-[10%] w-[40vw] h-[40vw] bg-purple-900/20 rounded-full blur-[100px]" />
         </div>

         {/* Main Container */}
         <div className="w-full max-w-[480px] relative z-10 min-h-screen flex flex-col items-center">

            {/* ================= HERO IDENTITY (Floating Style) ================= */}
            <div className="w-full px-6 pt-12 pb-8 flex flex-col items-center relative z-20">

               <motion.div
                  initial={{ scale: 0.8, opacity: 0, rotate: -5 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-36 h-36 rounded-[2.5rem] p-1.5 bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 shadow-[0_20px_50px_rgba(16,185,129,0.3)] mb-8 rotate-3 hover:rotate-0 transition-transform duration-500"
               >
                  <div className="w-full h-full rounded-[2.2rem] overflow-hidden bg-[#0A1118]">
                     <img src={data.profileImage} alt={data.displayName} className="w-full h-full object-cover opacity-90" />
                  </div>
               </motion.div>

               <motion.h1
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl font-['Playfair_Display'] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-gray-400 tracking-tight text-center mb-2"
               >
                  {data.displayName}
               </motion.h1>

               <motion.p
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-emerald-400 font-bold text-xs uppercase tracking-[0.25em] text-center mb-6"
               >
                  {data.role}
               </motion.p>

               {data.businessName && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-8">
                     <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full flex items-center gap-2 shadow-lg">
                        <FaBuilding className="text-emerald-400 shrink-0" size={14} />
                        <span className="text-xs font-semibold uppercase tracking-widest text-gray-300">{data.businessName}</span>
                     </div>
                  </motion.div>
               )}

               <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-sm text-gray-400 leading-relaxed text-center font-light px-2 mb-2">
                  "{data.bio}"
               </motion.p>
            </div>

            <div className="w-full px-5 flex-1 z-20 space-y-6">

               {/* ================= KEY METRICS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex justify-between bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-lg">
                  {fictionalData.stats.map((stat, i) => (
                     <div key={i} className="text-center flex-1 relative">
                        {i !== fictionalData.stats.length - 1 && <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-white/10" />}
                        <span className="block text-2xl font-['Playfair_Display'] font-black text-white mb-1">{stat.val}</span>
                        <span className="block text-[8px] uppercase tracking-widest text-emerald-400/80 font-bold">{stat.label}</span>
                     </div>
                  ))}
               </motion.div>

               {/* ================= QUICK CONTACT (PILLS) ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-2 gap-3">
                  {data.phone && (
                     <a href={`tel:${data.phone}`} className="bg-gradient-to-br from-emerald-500/20 to-emerald-900/20 backdrop-blur-xl border border-emerald-500/30 p-4 rounded-3xl flex flex-col items-center justify-center gap-3 hover:bg-emerald-500/30 transition-all text-white group">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform"><FiPhone size={20} /></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-center">Secure Line</span>
                     </a>
                  )}
                  {data.email && (
                     <a href={`mailto:${data.email}`} className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-3xl flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-all text-white group">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-emerald-400 group-hover:scale-110 transition-transform"><FiMail size={20} /></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-center truncate max-w-full">Direct Email</span>
                     </a>
                  )}
               </motion.div>

               {/* ================= EXPERTISE ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <GlassPanel title="Strategic Focus" icon={FiTarget}>
                     <div className="space-y-6">
                        {fictionalData.expertise.map((svc, i) => (
                           <div key={i} className="flex gap-4 group">
                              <div className="mt-1 shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 transition-colors">
                                 <svc.icon size={18} className="text-emerald-400" />
                              </div>
                              <div>
                                 <h4 className="text-sm font-bold text-white mb-1.5">{svc.title}</h4>
                                 <p className="text-xs text-gray-400 leading-relaxed font-light">{svc.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </GlassPanel>
               </motion.div>

               {/* ================= CASE STUDIES (MASONRY) ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <GlassPanel title="Featured Exits" icon={FiBriefcase} className="!pb-2">
                     <div className="columns-2 gap-3 space-y-3">
                        {fictionalData.caseStudies.map((item, idx) => (
                           <div key={idx} className="relative rounded-[1.5rem] overflow-hidden group break-inside-avoid shadow-lg bg-[#0A1118]">
                              <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 aspect-[4/5]" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/40 to-transparent p-4 flex flex-col justify-end">
                                 <p className="text-[8px] uppercase tracking-widest text-emerald-400 font-bold mb-1 truncate">{item.sector}</p>
                                 <h4 className="text-white font-serif font-bold text-sm mb-2 truncate leading-tight">{item.title}</h4>
                                 <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-2 py-1 rounded text-[9px] font-bold text-white self-start">
                                    {item.metric}
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </GlassPanel>
               </motion.div>

               {/* ================= BOOKING (GLASS UI) ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <GlassPanel title="Schedule Briefing" icon={FiCalendar}>
                     <div className="bg-[#050B14]/50 border border-white/10 rounded-2xl p-4 mb-4 flex items-center justify-between hover:border-emerald-500/50 transition-colors cursor-pointer">
                        <div>
                           <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Select Date</p>
                           <p className="text-sm font-medium text-white">Choose from calendar</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-emerald-400">
                           <FiCalendar size={18} />
                        </div>
                     </div>
                     <button className="w-full py-4 bg-white text-[#050B14] rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2">
                        Request Consultation <FiArrowUpRight size={16} />
                     </button>
                  </GlassPanel>
               </motion.div>

               {/* ================= PUBLICATIONS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <GlassPanel title="Market Insights" icon={FiFileText}>
                     <div className="space-y-4">
                        {fictionalData.insights.map((pub, idx) => (
                           <a key={idx} href="#" className="block group bg-white/5 border border-white/5 rounded-2xl p-4 hover:bg-white/10 hover:border-emerald-500/30 transition-all">
                              <h4 className="text-sm font-serif font-bold text-white group-hover:text-emerald-400 transition-colors mb-2 leading-snug">{pub.title}</h4>
                              <div className="flex items-center justify-between">
                                 <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">{pub.date}</span>
                                 <span className="text-[10px] font-bold text-emerald-400/70 bg-emerald-900/30 px-2 py-1 rounded">{pub.readTime}</span>
                              </div>
                           </a>
                        ))}
                     </div>
                  </GlassPanel>
               </motion.div>

               {/* ================= ENDORSEMENTS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <GlassPanel title="Endorsements" icon={FiAward}>
                     <div className="space-y-4">
                        {fictionalData.testimonials.map((test, i) => (
                           <div key={i} className="bg-[#050B14]/40 border border-white/5 p-5 rounded-2xl relative">
                              <FaQuoteLeft className="text-emerald-500/20 absolute top-4 right-4" size={32} />
                              <p className="text-sm text-gray-300 italic leading-relaxed relative z-10 mb-4 font-light">"{test.text}"</p>
                              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                                 <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-500/30">
                                    {test.name.charAt(0)}
                                 </div>
                                 <div className="overflow-hidden">
                                    <span className="block font-bold text-white text-xs uppercase tracking-wider truncate">{test.name}</span>
                                    <span className="block text-[9px] uppercase tracking-widest text-gray-500 truncate mt-0.5">{test.role}</span>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </GlassPanel>
               </motion.div>

               {/* ================= HQ & FAQ ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <GlassPanel title="Operations Base" icon={FiMapPin}>
                     {data.address && (
                        <div className="flex items-start gap-4 pb-5 border-b border-white/10 mb-5">
                           <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 shrink-0">
                              <FiMapPin size={18} />
                           </div>
                           <div>
                              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1">Corporate HQ</p>
                              <p className="text-sm font-medium text-white leading-snug mb-1.5">{data.address}</p>
                              <a href={`https://maps.google.com/?q=${encodeURIComponent(data.address)}`} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest font-bold text-emerald-400 hover:text-emerald-300 transition-colors">Get Directions</a>
                           </div>
                        </div>
                     )}

                     <div className="mb-6">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-3 flex items-center gap-2"><FiClock className="shrink-0" /> Operating Hours</p>
                        <div className="bg-[#050B14]/40 rounded-xl p-4 border border-white/5">
                           {fictionalData.hours.map((bh, i) => (
                              <div key={i} className="flex justify-between items-center py-2 text-xs border-b border-white/5 last:border-0">
                                 <span className="text-gray-400 font-medium">{bh.day}</span>
                                 <span className="font-bold text-white text-right pl-2">{bh.hours}</span>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-3">Engagement Protocols</p>
                        <div className="bg-[#050B14]/40 rounded-2xl overflow-hidden border border-white/5">
                           {fictionalData.faqs.map((faq, index) => <GlassAccordion key={index} question={faq.question} answer={faq.answer} />)}
                        </div>
                     </div>
                  </GlassPanel>
               </motion.div>

               {/* ================= SOCIAL NETWORK ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <GlassPanel title="Digital Presence" icon={FiGlobe} className="!mb-8">
                     {data.website && (
                        <a href={`https://${data.website}`} target="_blank" rel="noopener noreferrer" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all mb-6 group">
                           <div className="flex items-center gap-3">
                              <FiGlobe className="text-emerald-400 shrink-0" size={20} />
                              <span className="font-bold text-xs uppercase tracking-widest text-white truncate">Access Portfolio</span>
                           </div>
                           <FiArrowUpRight className="text-gray-500 group-hover:text-white transition-colors shrink-0" />
                        </a>
                     )}

                     <div className="flex justify-center gap-3">
                        {[
                           { val: data.linkedin, icon: FaLinkedinIn, link: `https://linkedin.com/in/${data.linkedin}` },
                           { val: data.twitter, icon: FaTwitter, link: `https://twitter.com/${data.twitter}` }
                        ].map((social, i) => social.val && (
                           <a
                              key={i} href={social.link || null} target="_blank" rel="noopener noreferrer"
                              className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-emerald-400 transition-all rounded-2xl shadow-lg"
                           >
                              <social.icon size={20} />
                           </a>
                        ))}
                     </div>
                  </GlassPanel>
               </motion.div>

               {/* ================= SAVE CONTACT CTA (INLINE) ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="pb-4">
                  <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={() => downloadVCard(vCardData)}
                     className="w-full bg-gradient-to-r from-emerald-400 to-emerald-600 text-[#050B14] py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
                  >
                     <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                     <FiDownload size={20} className="shrink-0" />
                     <span className="truncate">Download Dossier</span>
                  </motion.button>
               </motion.div>

            </div>

            {/* ================= FOOTER ================= */}
            <div className="w-full pb-8 pt-6 text-center border-t border-white/10 relative z-20 mt-4">
               <PoweredBy />
            </div>

         </div>

         <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,600&display=swap');
        @keyframes shimmer { 100% { transform: translateX(100%); } }
      `}} />
      </div>
   );
};

export default BoldEntrepreneur;