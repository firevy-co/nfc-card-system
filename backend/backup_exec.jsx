import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FiPhone, FiMail, FiGlobe, FiMapPin, FiTerminal, FiCpu,
   FiDatabase, FiShield, FiArrowRight, FiActivity, FiLayers,
   FiUserPlus, FiChevronDown, FiStar, FiClock, FiVideo
} from 'react-icons/fi';
import { FaLinkedinIn, FaTwitter, FaGithub, FaDiscord, FaQuoteRight } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Animated Neo-Corporate Sub-components ---

const HoloCard = ({ children, className = "", delay = 0 }) => (
   <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group bg-[#0A0F1C] border border-white/10 rounded-2xl overflow-hidden ${className}`}
   >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-cyan-500/0 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10 p-6">
         {children}
      </div>
   </motion.div>
);

const CyberAccordion = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border-b border-white/10 last:border-0 bg-[#0A0F1C]/50 backdrop-blur-sm">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full py-4 px-5 flex justify-between items-center text-left focus:outline-none group"
         >
            <span className="font-bold text-sm text-slate-300 group-hover:text-cyan-400 transition-colors pr-4">{question}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
               <FiChevronDown size={18} className="text-violet-400" />
            </motion.div>
         </button>
         <AnimatePresence>
            {isOpen && (
               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <div className="px-5 pb-5">
                     <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-violet-500/50 pl-3">
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

const ExecutiveMinimal = ({ userData }) => {
   // Completely Fictional Persona: AI Tech Founder
   const fictionalData = {
      displayName: "Julian Vance",
      role: "Chief AI Architect & Founder",
      phone: "+1 (415) 555-0199",
      email: "j.vance@synapsedynamics.io",
      website: "www.synapsedynamics.io",
      address: "415 Mission St, San Francisco, CA",
      businessName: "Synapse Dynamics",
      twitter: "julian_ai",
      linkedin: "julianvance",
      github: "jvance-synapse",
      discord: "vance#9999",
      bio: "Pioneering the intersection of artificial neural networks and enterprise infrastructure. We build cognitive systems that transform raw data into actionable, predictive foresight.",
      profileImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop",
      bannerImage: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&h=600&fit=crop", // Abstract mesh
      skills: ["Machine Learning", "Neural Networks", "Enterprise SaaS", "Web3 Infrastructure", "Predictive Analytics", "Cloud Architecture"],
      stats: [
         { label: "Data Processed", val: "4.2 PB" },
         { label: "Active Nodes", val: "12K+" },
         { label: "Series A", val: "$24M" }
      ],
      products: [
         { title: "Cognitive Core", desc: "Enterprise-grade LLM orchestration platform.", icon: FiCpu },
         { title: "Synapse Shield", desc: "Zero-knowledge encryption for decentralized databases.", icon: FiShield },
         { title: "Data Stream", desc: "Real-time predictive analytics pipeline.", icon: FiDatabase }
      ],
      caseStudies: [
         { title: "Project: Alpha", client: "Global FinTech", metric: "300% ROI", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" },
         { title: "Neural Supply", client: "Logistics Corp", metric: "-40% Latency", img: "https://images.unsplash.com/photo-1586528116311-ad8ed7450fa3?w=600&h=400&fit=crop" }
      ],
      videoPresentation: {
         title: "Keynote: The Future of Cognitive Tech",
         thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop"
      },
      testimonials: [
         { name: "Sarah J.", role: "CTO, OmniCorp", text: "Julian's architecture completely revolutionized our data pipeline. Synapse Dynamics delivered in 3 months what our internal team struggled with for a year." },
         { name: "David M.", role: "Lead Partner, VC Partners", text: "A generational talent in the AI space. Julian combines deep technical mastery with ruthless operational execution." }
      ],
      hours: [
         { day: "SF Office", hours: "08:00 - 18:00 PST" },
         { day: "Global Servers", hours: "24/7/365" }
      ],
      faqs: [
         { question: "What scale of enterprise do you support?", answer: "We primarily build infrastructure for Fortune 500 companies and high-growth Series B+ startups processing terabytes of data daily." },
         { question: "Is the Synapse framework open-source?", answer: "Our core orchestration layer is proprietary, but we maintain several open-source libraries for edge computing and developer tooling." },
         { question: "Do you offer private consultations?", answer: "Yes, I offer limited advisory blocks for enterprise architecture reviews. Use the booking portal to check availability." }
      ]
   };

   const vCardData = { ...userData, ...fictionalData };

   const fadeUp = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
   };

   return (
      <div className="w-full min-h-screen bg-slate-950 text-slate-300 font-['Inter',sans-serif] selection:bg-cyan-500 selection:text-slate-900 flex justify-center pb-12 overflow-hidden">

         {/* Dynamic Background */}
         <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] translate-y-1/3 -translate-x-1/3" />
         </div>

         {/* Main Container */}
         <div className="w-full max-w-[480px] bg-[#030712]/80 backdrop-blur-2xl relative shadow-[0_0_50px_rgba(0,0,0,0.8)] min-h-screen border-x border-white/5 flex flex-col z-10">

            {/* ================= HEADER & PROFILE ================= */}
            <div className="w-full relative">
               <div className="h-[240px] w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030712] z-10" />
                  <img src={fictionalData.bannerImage} alt="Neural Network" className="w-full h-full object-cover opacity-60 mix-blend-screen" />
               </div>

               <div className="px-6 relative z-20 -mt-20 flex flex-col items-center text-center">

                  <motion.div
                     initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, type: "spring" }}
                     className="relative mb-5"
                  >
                     {/* Spinning Neon Border */}
                     <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-600 via-cyan-400 to-violet-600 animate-[spin_4s_linear_infinite] opacity-50 blur-sm" />
                     <div className="w-28 h-28 bg-[#0A0F1C] p-1 rounded-2xl relative z-10 border border-white/10">
                        <img src={fictionalData.profileImage} alt={fictionalData.displayName} className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500" />
                     </div>
                  </motion.div>

                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                     <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-4">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">{fictionalData.businessName}</span>
                     </div>
                     <h1 className="text-3xl font-black text-white tracking-tight mb-1">{fictionalData.displayName}</h1>
                     <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">
                        {fictionalData.role}
                     </p>
                     <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
                        {fictionalData.bio}
                     </p>
                  </motion.div>
               </div>
            </div>

            {/* ================= INFINITE MARQUEE (SKILLS) ================= */}
            <div className="w-full mt-8 overflow-hidden flex border-y border-white/5 bg-white/5 py-3 relative">
               <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#030712] to-transparent z-10" />
               <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#030712] to-transparent z-10" />
               <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap">
                  {[...fictionalData.skills, ...fictionalData.skills].map((skill, idx) => (
                     <span key={idx} className="mx-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-4">
                        {skill} <span className="w-1.5 h-1.5 bg-violet-500 rounded-full" />
                     </span>
                  ))}
               </div>
            </div>

            <div className="px-5 mt-8 space-y-6">

               {/* ================= STATS WIDGET ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <div className="flex justify-between items-center bg-[#0A0F1C] border border-white/10 rounded-2xl p-6">
                     {fictionalData.stats.map((stat, i) => (
                        <div key={i} className="text-center flex-1 border-r border-white/5 last:border-0">
                           <span className="block text-xl font-black text-white mb-1">{stat.val}</span>
                           <span className="block text-[8px] uppercase tracking-widest text-cyan-500 font-bold">{stat.label}</span>
                        </div>
                     ))}
                  </div>
               </motion.div>

               {/* ================= TERMINAL (CONTACT INFO) ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <div className="bg-[#050810] border border-white/10 rounded-2xl p-5 shadow-inner relative overflow-hidden font-mono">
                     <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
                        <div className="flex gap-1.5">
                           <span className="w-3 h-3 rounded-full bg-red-500/80" />
                           <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                           <span className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <span className="text-[10px] text-slate-500 ml-2">sys_comms.exe</span>
                     </div>
                     <div className="space-y-3 text-xs">
                        {fictionalData.phone && (
                           <div className="flex items-start">
                              <span className="text-violet-400 mr-2">{'>'}</span>
                              <span className="text-slate-500 mr-2 w-12">tel:</span>
                              <a href={`tel:${fictionalData.phone}`} className="text-cyan-400 hover:underline">{fictionalData.phone}</a>
                           </div>
                        )}
                        {fictionalData.email && (
                           <div className="flex items-start">
                              <span className="text-violet-400 mr-2">{'>'}</span>
                              <span className="text-slate-500 mr-2 w-12">mail:</span>
                              <a href={`mailto:${fictionalData.email}`} className="text-cyan-400 hover:underline truncate">{fictionalData.email}</a>
                           </div>
                        )}
                        {fictionalData.website && (
                           <div className="flex items-start">
                              <span className="text-violet-400 mr-2">{'>'}</span>
                              <span className="text-slate-500 mr-2 w-12">web:</span>
                              <a href={`https://${fictionalData.website}`} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">{fictionalData.website}</a>
                           </div>
                        )}
                        {fictionalData.address && (
                           <div className="flex items-start">
                              <span className="text-violet-400 mr-2">{'>'}</span>
                              <span className="text-slate-500 mr-2 w-12">loc:</span>
                              <span className="text-slate-300">{fictionalData.address}</span>
                           </div>
                        )}
                        <div className="flex items-center mt-2 opacity-70">
                           <span className="text-violet-400 mr-2">{'>'}</span>
                           <span className="w-2 h-4 bg-cyan-400 animate-pulse" />
                        </div>
                     </div>
                  </div>
               </motion.div>

               {/* ================= ARCHITECTURE (SERVICES) ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <div className="flex items-center gap-2 mb-4">
                     <FiLayers className="text-violet-400" size={18} />
                     <h3 className="text-sm font-bold text-white uppercase tracking-wider">Core Infrastructure</h3>
                  </div>
                  <div className="space-y-3">
                     {fictionalData.products.map((prod, i) => (
                        <HoloCard key={i} className="!p-4 flex items-center gap-4 cursor-pointer">
                           <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 shrink-0 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                              <prod.icon size={20} />
                           </div>
                           <div>
                              <h4 className="text-sm font-bold text-white mb-1">{prod.title}</h4>
                              <p className="text-[11px] text-slate-400">{prod.desc}</p>
                           </div>
                        </HoloCard>
                     ))}
                  </div>
               </motion.div>

               {/* ================= CASE STUDIES (HORIZONTAL SCROLL) ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <div className="flex items-center gap-2 mb-4">
                     <FiActivity className="text-cyan-400" size={18} />
                     <h3 className="text-sm font-bold text-white uppercase tracking-wider">Deployments</h3>
                  </div>
                  <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar">
                     {fictionalData.caseStudies.map((item, idx) => (
                        <div key={idx} className="min-w-[240px] bg-[#0A0F1C] border border-white/10 rounded-2xl overflow-hidden snap-center group">
                           <div className="h-32 w-full overflow-hidden relative">
                              <div className="absolute inset-0 bg-violet-600/20 mix-blend-overlay group-hover:bg-transparent transition-colors z-10" />
                              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                           </div>
                           <div className="p-4">
                              <p className="text-[9px] uppercase tracking-widest text-violet-400 font-bold mb-1">{item.client}</p>
                              <h4 className="text-sm font-bold text-white mb-2 truncate">{item.title}</h4>
                              <span className="inline-block bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold px-2 py-1 rounded">
                                 {item.metric}
                              </span>
                           </div>
                        </div>
                     ))}
                  </div>
               </motion.div>

               {/* ================= KEYNOTE VIDEO MOCKUP ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <div className="relative w-full h-56 rounded-2xl overflow-hidden group border border-white/10 cursor-pointer">
                     <img src={fictionalData.videoPresentation.thumbnail} alt="Video" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                        <div className="w-14 h-14 bg-cyan-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-cyan-500/50 mb-3 group-hover:scale-110 transition-transform">
                           <FiVideo size={24} className="text-cyan-400" />
                        </div>
                        <span className="text-white font-bold text-xs tracking-widest uppercase">{fictionalData.videoPresentation.title}</span>
                     </div>
                  </div>
               </motion.div>

               {/* ================= REVIEWS / TESTIMONIALS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <div className="flex items-center gap-2 mb-4">
                     <FiStar className="text-yellow-400" size={18} />
                     <h3 className="text-sm font-bold text-white uppercase tracking-wider">Endorsements</h3>
                  </div>
                  <div className="space-y-3">
                     {fictionalData.testimonials.map((test, i) => (
                        <HoloCard key={i} className="!p-5 relative">
                           <FaQuoteRight className="absolute top-4 right-4 text-white/5" size={32} />
                           <p className="text-xs text-slate-300 leading-relaxed mb-4 relative z-10">"{test.text}"</p>
                           <div className="flex items-center gap-3">
                              <span className="block font-bold text-white text-xs uppercase tracking-wider">{test.name}</span>
                              <span className="w-1 h-1 bg-violet-500 rounded-full" />
                              <span className="block text-[9px] uppercase tracking-widest text-slate-500">{test.role}</span>
                           </div>
                        </HoloCard>
                     ))}
                  </div>
               </motion.div>

               {/* ================= FAQ & OPERATIONS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <div className="flex items-center gap-2 mb-4 mt-6">
                     <FiClock className="text-cyan-400" size={18} />
                     <h3 className="text-sm font-bold text-white uppercase tracking-wider">Operations & Logistics</h3>
                  </div>

                  <HoloCard className="!p-0 mb-4">
                     <div className="p-5">
                        {fictionalData.hours.map((bh, i) => (
                           <div key={i} className="flex justify-between items-center py-2 text-xs border-b border-white/5 last:border-0">
                              <span className="text-slate-400 font-medium">{bh.day}</span>
                              <span className="font-bold text-white bg-white/5 px-2 py-1 rounded">{bh.hours}</span>
                           </div>
                        ))}
                     </div>
                  </HoloCard>

                  <div className="rounded-2xl overflow-hidden border border-white/10">
                     {fictionalData.faqs.map((faq, index) => <CyberAccordion key={index} question={faq.question} answer={faq.answer} />)}
                  </div>
               </motion.div>

               {/* ================= SOCIAL / NETWORK ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="py-4">
                  <div className="flex justify-center gap-4">
                     {[
                        { val: fictionalData.linkedin, icon: FaLinkedinIn, link: `https://linkedin.com/in/${fictionalData.linkedin}` },
                        { val: fictionalData.twitter, icon: FaTwitter, link: `https://twitter.com/${fictionalData.twitter}` },
                        { val: fictionalData.github, icon: FaGithub, link: `https://github.com/${fictionalData.github}` },
                        { val: fictionalData.discord, icon: FaDiscord, link: `#` }
                     ].map((social, i) => social.val && (
                        <a
                           key={i} href={social.link || null} target="_blank" rel="noopener noreferrer"
                           className="w-12 h-12 bg-[#0A0F1C] border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-cyan-400 hover:border-cyan-400/50 transition-all rounded-xl shadow-lg hover:-translate-y-1"
                        >
                           <social.icon size={18} />
                        </a>
                     ))}
                  </div>
               </motion.div>

               {/* ================= SAVE CONTACT CTA ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="pb-6">
                  <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={() => downloadVCard(vCardData)}
                     className="w-full bg-cyan-500 text-slate-950 py-4.5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:bg-cyan-400 transition-colors flex items-center justify-center gap-3 h-14"
                  >
                     <FiUserPlus size={18} />
                     Sync Contact Data
                  </motion.button>
               </motion.div>

            </div>

            {/* ================= FOOTER ================= */}
            <div className="pb-8 pt-4 text-center border-t border-white/10 mt-auto bg-[#030712]">
               <PoweredBy />
            </div>

         </div>

         <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
      `}} />
      </div>
   );
};

export default ExecutiveMinimal;