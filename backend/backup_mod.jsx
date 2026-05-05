import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FiPhone, FiMail, FiGlobe, FiMapPin, FiArrowRight,
   FiLayers, FiCpu, FiEye, FiDownload, FiChevronDown,
   FiMessageSquare, FiActivity, FiBox, FiClock, FiStar
} from 'react-icons/fi';
import { FaLinkedinIn, FaTwitter, FaGithub, FaDiscord } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Spatial OS Floating Components ---

const SpatialCard = ({ children, className = "", delay = 0 }) => (
   <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.7, delay, type: "spring", bounce: 0.4 }}
      className={`bg-white/10 backdrop-blur-3xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.4)] rounded-[2.5rem] p-6 relative overflow-hidden ${className}`}
   >
      {/* Inner Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />
      <div className="relative z-10">{children}</div>
   </motion.div>
);

const SpatialPill = ({ icon: Icon, text, onClick, href }) => {
   const content = (
      <motion.div
         whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
         whileTap={{ scale: 0.95 }}
         className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-3 rounded-full cursor-pointer transition-colors shadow-lg"
      >
         {Icon && <Icon className="text-fuchsia-300" size={16} />}
         <span className="text-sm font-semibold text-white tracking-wide">{text}</span>
      </motion.div>
   );

   return href ? <a href={href || null} target="_blank" rel="noopener noreferrer">{content}</a> : <div onClick={onClick}>{content}</div>;
};

const DepthAccordion = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border border-white/10 bg-white/5 rounded-3xl mb-3 overflow-hidden backdrop-blur-md">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-5 flex justify-between items-center text-left focus:outline-none"
         >
            <span className="font-semibold text-sm text-white pr-4">{question}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <FiChevronDown size={16} className="text-fuchsia-300" />
               </div>
            </motion.div>
         </button>
         <AnimatePresence>
            {isOpen && (
               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <div className="px-5 pb-5">
                     <p className="text-slate-300 text-sm leading-relaxed">
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

const ModernLeader = ({ userData }) => {
   // Completely Fictional Persona: Chief Innovation Officer
   const fictionalData = {
      displayName: "Arthur Pendelton",
      role: "Chief Innovation Officer",
      phone: "+1 (415) 555-8002",
      email: "arthur@nexus-spatial.com",
      website: "www.nexus-spatial.com",
      address: "One Infinite Loop, San Francisco, CA",
      businessName: "Nexus Spatial Computing",
      twitter: "arthur_spatial",
      linkedin: "arthurpendelton",
      github: "arthur-nexus",
      bio: "Pioneering the enterprise metaverse. We build spatial computing operating systems that merge digital data with physical architecture, revolutionizing how global teams collaborate.",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bannerImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&fit=crop",
      metrics: [
         { label: "Active Deployments", val: "1.2M+" },
         { label: "Enterprise Partners", val: "450" },
         { label: "Series C Funding", val: "$120M" }
      ],
      capabilities: [
         { title: "Spatial Architecture", desc: "Mapping real-world environments for persistent augmented data layers.", icon: FiBox },
         { title: "Neural Interfaces", desc: "Non-invasive BCI integrations for hands-free hardware operation.", icon: FiCpu },
         { title: "Holographic Collaboration", desc: "Zero-latency 3D presence for distributed enterprise teams.", icon: FiEye }
      ],
      caseStudies: [
         { title: "AeroDynamics Corp", tags: "Manufacturing AR", result: "+40% Assembly Speed", img: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&h=400&fit=crop" },
         { title: "Global MedTech", tags: "Surgical Holography", result: "FDA Approved Workflow", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop" }
      ],
      testimonials: [
         { name: "Dr. Evelyn Hayes", role: "CTO, Vanguard Health", text: "Nexus Spatial's OS completely transformed our remote surgical consultations. Arthur's vision for mixed reality is decades ahead of the industry." },
         { name: "Marcus Thorne", role: "Lead Architect, BuildCo", text: "We can now walk our clients through full-scale holographic buildings before a single foundation is poured. Absolute game changer." }
      ],
      hours: [
         { day: "SF Headquarters", hours: "09:00 - 18:00 PST" },
         { day: "London Servers", hours: "24/7 Monitored" }
      ],
      faqs: [
         { question: "Is the Nexus OS hardware agnostic?", answer: "Yes. Our spatial operating system runs seamlessly across Apple Vision Pro, Meta Quest Pro, and custom enterprise headsets." },
         { question: "How is enterprise data secured in AR?", answer: "All spatial mappings and holographic assets are encrypted end-to-end using quantum-resistant ledger protocols." },
         { question: "Do you offer proof-of-concept deployments?", answer: "For enterprise clients (500+ seats), we offer a 30-day sandbox environment to map your primary facility and test core workflows." }
      ]
   };

   const vCardData = { ...userData, ...fictionalData };

   const fadeUp = {
      hidden: { opacity: 0, y: 15 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
   };

   return (
      <div className="w-full min-h-screen bg-[#020205] text-white font-['Manrope',sans-serif] selection:bg-fuchsia-500 selection:text-white flex justify-center overflow-hidden relative">

         {/* Immersive Breathing Aurora Background */}
         <div className="fixed inset-0 z-0 pointer-events-none">
            <motion.div
               animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 90, 0] }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-fuchsia-600/30 rounded-full blur-[120px]"
            />
            <motion.div
               animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2], rotate: [0, -90, 0] }}
               transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
               className="absolute bottom-[-10%] right-[-20%] w-[90vw] h-[90vw] max-w-[700px] max-h-[700px] bg-blue-600/30 rounded-full blur-[140px]"
            />
         </div>

         {/* Glassmorphism App Container */}
         <div className="w-full max-w-[480px] relative z-10 flex flex-col px-4 pt-12 pb-8 space-y-6">

            {/* ================= HERO: FLOATING PROFILE ================= */}
            <motion.div
               initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
               className="flex flex-col items-center text-center mt-4"
            >
               {/* Avatar floating effect */}
               <motion.div
                  animate={{ y: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-40 h-40 rounded-[2.5rem] bg-white/10 p-2 shadow-[0_0_50px_rgba(192,38,211,0.3)] backdrop-blur-xl border border-white/20 mb-8 rotate-3"
               >
                  <img src={fictionalData.profileImage} alt={fictionalData.displayName} className="w-full h-full object-cover rounded-[2rem] -rotate-3" />
               </motion.div>

               {fictionalData.businessName && (
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full mb-6 flex items-center gap-3">
                     <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                     <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200">{fictionalData.businessName}</span>
                  </div>
               )}

               <h1 className="text-4xl font-extrabold tracking-tight mb-2 drop-shadow-lg">
                  {fictionalData.displayName}
               </h1>
               <p className="text-fuchsia-300 font-semibold text-sm uppercase tracking-widest mb-6 drop-shadow-md">
                  {fictionalData.role}
               </p>
               <p className="text-slate-300 text-sm leading-relaxed max-w-sm px-4">
                  {fictionalData.bio}
               </p>
            </motion.div>

            {/* ================= COMMUNICATION PILLS (SCROLLING TRAY) ================= */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="w-full overflow-x-auto hide-scrollbar -mx-4 px-4 py-2">
               <div className="flex gap-3 w-max">
                  {fictionalData.phone && <SpatialPill icon={FiPhone} text="Call Studio" href={`tel:${fictionalData.phone}`} />}
                  {fictionalData.email && <SpatialPill icon={FiMail} text="Email Connect" href={`mailto:${fictionalData.email}`} />}
                  {fictionalData.website && <SpatialPill icon={FiGlobe} text="Launch Portal" href={`https://${fictionalData.website}`} />}
               </div>
            </motion.div>

            {/* ================= HIGH-LEVEL METRICS ================= */}
            <SpatialCard delay={0.2} className="!p-0 overflow-hidden">
               <div className="grid grid-cols-3 divide-x divide-white/10 bg-white/5">
                  {fictionalData.metrics.map((stat, i) => (
                     <div key={i} className="p-5 text-center flex flex-col justify-center hover:bg-white/5 transition-colors">
                        <span className="block text-xl font-black text-white mb-2">{stat.val}</span>
                        <span className="block text-[8px] uppercase tracking-[0.2em] text-fuchsia-300 font-semibold">{stat.label}</span>
                     </div>
                  ))}
               </div>
            </SpatialCard>

            {/* ================= SPATIAL CAPABILITIES ================= */}
            <SpatialCard delay={0.3}>
               <div className="flex items-center gap-3 mb-6">
                  <FiLayers className="text-fuchsia-400" size={20} />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-200">OS Capabilities</h3>
               </div>
               <div className="space-y-4">
                  {fictionalData.capabilities.map((cap, i) => (
                     <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-3xl border border-white/10 hover:border-fuchsia-500/50 transition-colors group">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-blue-300 shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                           <cap.icon size={20} />
                        </div>
                        <div>
                           <h4 className="text-base font-bold text-white mb-1.5">{cap.title}</h4>
                           <p className="text-xs text-slate-400 leading-relaxed">{cap.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </SpatialCard>

            {/* ================= IMMERSIVE PORTFOLIO ================= */}
            <SpatialCard delay={0.4} className="!pr-0">
               <div className="pr-6 mb-6 flex items-center gap-3">
                  <FiActivity className="text-blue-400" size={20} />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-200">Live Deployments</h3>
               </div>
               <div className="flex overflow-x-auto gap-5 pb-4 snap-x hide-scrollbar pr-6">
                  {fictionalData.caseStudies.map((item, idx) => (
                     <div key={idx} className="min-w-[260px] bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden snap-center group relative p-2">
                        <div className="h-40 w-full overflow-hidden rounded-[1.5rem] relative">
                           <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors" />
                           <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="p-4 pt-5">
                           <p className="text-[10px] uppercase tracking-widest text-fuchsia-400 font-bold mb-1.5">{item.tags}</p>
                           <h4 className="text-lg font-bold text-white mb-3 truncate">{item.title}</h4>
                           <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-[10px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md">
                              <FiStar className="text-yellow-400" size={12} /> {item.result}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </SpatialCard>

            {/* ================= HQ & LOGISTICS ================= */}
            <SpatialCard delay={0.5}>
               <div className="flex items-center gap-3 mb-6">
                  <FiMapPin className="text-fuchsia-400" size={20} />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-200">Global Presence</h3>
               </div>

               {fictionalData.address && (
                  <div className="bg-white/5 border border-white/10 p-5 rounded-3xl mb-4 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors">
                     <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Primary Node</p>
                        <p className="text-sm font-semibold text-white">{fictionalData.address}</p>
                     </div>
                     <FiArrowRight className="text-blue-400 group-hover:translate-x-1 transition-transform" />
                  </div>
               )}

               <div className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-6">
                  {fictionalData.hours.map((bh, i) => (
                     <div key={i} className="flex justify-between items-center py-2 text-xs border-b border-white/10 last:border-0 font-medium">
                        <span className="text-slate-400">{bh.day}</span>
                        <span className="text-blue-300 bg-blue-900/30 px-3 py-1 rounded-full">{bh.hours}</span>
                     </div>
                  ))}
               </div>

               <h4 className="text-[10px] uppercase tracking-widest font-bold text-fuchsia-300 mb-4 pl-2">Enterprise FAQ</h4>
               <div className="space-y-0">
                  {fictionalData.faqs.map((faq, index) => <DepthAccordion key={index} question={faq.question} answer={faq.answer} />)}
               </div>
            </SpatialCard>

            {/* ================= TESTIMONIALS ================= */}
            <SpatialCard delay={0.6}>
               <div className="flex items-center gap-3 mb-6">
                  <FiMessageSquare className="text-blue-400" size={20} />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-200">Partner Endorsements</h3>
               </div>
               <div className="space-y-4">
                  {fictionalData.testimonials.map((test, i) => (
                     <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] relative">
                        <p className="text-sm text-slate-300 leading-relaxed mb-5 font-light">"{test.text}"</p>
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-blue-600 flex items-center justify-center font-bold text-sm shadow-lg">
                              {test.name.charAt(0)}
                           </div>
                           <div>
                              <span className="block font-bold text-white text-sm tracking-wide">{test.name}</span>
                              <span className="block text-[10px] uppercase tracking-widest text-fuchsia-300 mt-1">{test.role}</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </SpatialCard>

            {/* ================= SOCIAL NETWORK ================= */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="py-2">
               <div className="flex justify-center gap-5">
                  {[
                     { val: fictionalData.linkedin, icon: FaLinkedinIn, link: `https://linkedin.com/in/${fictionalData.linkedin}` },
                     { val: fictionalData.twitter, icon: FaTwitter, link: `https://twitter.com/${fictionalData.twitter}` },
                     { val: fictionalData.github, icon: FaGithub, link: `https://github.com/${fictionalData.github}` },
                     { val: fictionalData.discord, icon: FaDiscord, link: `#` }
                  ].map((social, i) => social.val && (
                     <a
                        key={i} href={social.link || null} target="_blank" rel="noopener noreferrer"
                        className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:-translate-y-2"
                     >
                        <social.icon size={20} />
                     </a>
                  ))}
               </div>
            </motion.div>

            {/* ================= SAVE CONTACT CTA (INLINE BUTTON) ================= */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="pt-6 pb-4">
               <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => downloadVCard(vCardData)}
                  className="w-full bg-white/90 backdrop-blur-2xl text-black py-5 rounded-[2rem] font-bold text-sm uppercase tracking-widest shadow-[0_20px_40px_rgba(255,255,255,0.2)] hover:bg-white transition-all flex items-center justify-center gap-3 border border-white"
               >
                  <FiDownload size={20} className="text-fuchsia-600" />
                  Store Identity
               </motion.button>
            </motion.div>

            {/* ================= FOOTER ================= */}
            <div className="w-full text-center pb-4 opacity-50 relative z-10">
               <PoweredBy />
            </div>

         </div>

         <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      </div>
   );
};

export default ModernLeader;