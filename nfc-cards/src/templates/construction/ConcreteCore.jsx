import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FiPhone, FiMail, FiGlobe, FiMapPin, FiActivity,
   FiServer, FiShield, FiCpu, FiTerminal, FiLayers,
   FiChevronDown, FiDownload, FiCheckCircle, FiBox,
   FiCommand, FiCloudDrizzle, FiDatabase
} from 'react-icons/fi';
import { FaLinkedinIn, FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Prismatic Glass Components ---

const ChromaCard = ({ title, icon: Icon, children, delay = 0 }) => (
   <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#0A0514]/60 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden group mb-6"
   >
      {/* Prismatic Shimmer Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500/0 via-cyan-400/5 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />

      {title && (
         <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4 relative z-10">
            {Icon && (
               <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-cyan-400 border border-white/5 shadow-inner">
                  <Icon size={14} />
               </div>
            )}
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">{title}</h3>
         </div>
      )}

      <div className="relative z-10">{children}</div>
   </motion.div>
);

const QuantumAccordion = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border-b border-white/10 last:border-0">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full py-4 flex justify-between items-center text-left focus:outline-none group"
         >
            <span className="font-semibold text-sm text-slate-200 group-hover:text-cyan-400 transition-colors pr-4">{question}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors shrink-0">
               <FiChevronDown size={16} className="text-cyan-400" />
            </motion.div>
         </button>
         <AnimatePresence>
            {isOpen && (
               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <div className="pb-5 pt-1 pl-4 border-l-2 border-fuchsia-500/50 ml-4">
                     <p className="text-slate-400 text-sm leading-relaxed font-light">
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

const ConcreteCore = ({ userData }) => {

   // Safe URL Formatter
   const formatUrl = (url) => {
      if (!url) return null;
      const stringUrl = String(url).trim();
      if (stringUrl === "") return null;
      return stringUrl.startsWith('http') ? stringUrl : `https://${stringUrl}`;
   };

   // Maximum Fictional Content for Template Depth
   const fictionalData = {
      displayName: "Admin",
      role: "Admin",
      phone: "+1 (888) 555-0199",
      email: "admin@quantum-core.network",
      website: "www.quantum-core.network",
      address: "Node 01, Main Datacenter, San Francisco, CA",
      businessName: "Quantum Core Systems",
      bio: "Chief Systems Administrator overseeing decentralized web infrastructure, high-availability server clusters, and zero-trust security meshes. Ensuring absolute operational continuity across global nodes.",
      // Default image requested
      defaultAvatar: "https://images.unsplash.com/photo-1541888081622-4a00afebc5e2?w=400&h=400&fit=crop",
      linkedin: "quantum-admin",
      twitter: "admin_quantum",
      github: "quantum-sysadmin",
      discord: "admin#0001",
      telemetry: [
         { label: "Global Uptime", val: "99.999%", icon: FiActivity },
         { label: "Active Nodes", val: "4,096", icon: FiServer },
         { label: "Quantum Sync", val: "Optimal", icon: FiCommand },
         { label: "Threats Mitigated", val: "3.2M", icon: FiShield }
      ],
      infrastructures: [
         { title: "Zero-Trust Service Mesh", desc: "Cryptographic identity verification required for all internal microservices and APIs.", icon: FiLayers },
         { title: "Distributed Datastores", desc: "Multi-region sharded databases with automated failover and sub-millisecond latency.", icon: FiDatabase },
         { title: "Neural Threat Detection", desc: "AI-driven firewall analyzing traffic patterns to preemptively block DDoS and zero-day attacks.", icon: FiCpu }
      ],
      networkNodes: [
         { region: "US-West (California)", status: "Active", latency: "12ms" },
         { region: "EU-Central (Frankfurt)", status: "Active", latency: "24ms" },
         { region: "AP-East (Tokyo)", status: "Scaling", latency: "42ms" },
         { region: "SA-East (São Paulo)", status: "Active", latency: "38ms" }
      ],
      auditLogs: [
         { task: "Root Authorization Protocol Updated", time: "09:45 AM", severity: "Critical" },
         { task: "Node 44 Auto-Scaled Successfully", time: "11:12 AM", severity: "Routine" },
         { task: "DDoS Mitigation Layer Deployed", time: "01:30 PM", severity: "High" },
         { task: "Global Backup Verified", time: "03:00 PM", severity: "Routine" }
      ],
      faqs: [
         { question: "How do I request elevated system clearances?", answer: "Clearance upgrades must be initiated via the IAM portal. Approvals require cryptographic signatures from both your department head and the automated compliance bot." },
         { question: "What is the protocol for scheduled network downtime?", answer: "We do not experience global downtime. Routine maintenance is handled via rolling deployments and traffic routing to secondary nodes." },
         { question: "How are data residency laws enforced?", answer: "Our routing layer automatically shunts region-specific user data to local shards, ensuring strict compliance with GDPR, CCPA, and localized data laws." },
         { question: "Can I access the staging environment externally?", answer: "No. The staging environment is completely air-gapped from the public internet. Access requires the corporate VPN and a hardware security key." }
      ]
   };

   // Merge provided user data, falling back to fictional data if empty
   const data = {
      displayName: userData?.displayName || fictionalData.displayName,
      role: userData?.role || fictionalData.role,
      phone: userData?.mobileNumber || userData?.phone || fictionalData.phone,
      email: userData?.email || fictionalData.email,
      website: userData?.website || fictionalData.website,
      address: userData?.address || userData?.city || fictionalData.address,
      companyName: userData?.companyName || fictionalData.businessName,
      bio: userData?.bio || fictionalData.bio,
      avatar: userData?.avatar,
      logo: userData?.logo,
      linkedin: userData?.linkedin || fictionalData.linkedin,
      twitter: userData?.twitter || fictionalData.twitter,
      github: userData?.github || fictionalData.github,
      discord: fictionalData.discord
   };

   const vCardData = { ...userData, ...fictionalData };

   const fadeUp = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
   };

   return (
      <div className="w-full min-h-screen bg-[#03000A] text-slate-200 font-['Inter',sans-serif] selection:bg-cyan-500 selection:text-white flex justify-center pb-12 overflow-x-hidden relative md:py-8">

         {/* ================= DYNAMIC MESH BACKGROUND ================= */}
         <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
            <motion.div
               animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.4, 0.6, 0.4] }}
               transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
               className="absolute w-[80vw] h-[80vw] max-w-[700px] max-h-[700px] bg-fuchsia-700/20 rounded-full blur-[140px] -translate-x-1/3 -translate-y-1/3"
            />
            <motion.div
               animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0], opacity: [0.3, 0.5, 0.3] }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] bg-cyan-700/20 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3"
            />
            <motion.div
               animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
               transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               className="absolute w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-violet-700/20 rounded-full blur-[120px] translate-y-1/2"
            />
         </div>

         {/* Main App Container */}
         <div className="w-full max-w-[480px] relative z-10 bg-[#0A0514]/40 backdrop-blur-[40px] shadow-[0_0_80px_rgba(0,0,0,0.8)] min-h-screen md:rounded-[3rem] border border-white/10 flex flex-col">

            {/* ================= HERO IDENTITY ================= */}
            <div className="w-full px-6 pt-16 pb-8 flex flex-col items-center relative z-20">

               <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut", type: "spring", bounce: 0.4 }}
                  className="relative mb-6"
               >
                  {/* Core Glowing Ring */}
                  <div className="absolute -inset-2 bg-gradient-to-tr from-fuchsia-500 via-cyan-400 to-violet-500 rounded-[2.5rem] blur-xl opacity-50 animate-pulse" />

                  <div className="w-36 h-36 bg-[#0A0514] p-1.5 rounded-[2.5rem] relative z-10 border border-white/20 shadow-2xl">
                     <div className="w-full h-full rounded-[2rem] overflow-hidden bg-white/5 flex items-center justify-center">
                        {data.avatar ? (
                           <img src={data.avatar} alt="Profile" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                        ) : data.logo ? (
                           <img src={data.logo} alt="Logo" className="w-full h-full object-contain p-4" />
                        ) : (
                           <img src={fictionalData.defaultAvatar} alt="Default Profile" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                        )}
                     </div>
                     {/* Online Indicator */}
                     <div className="absolute bottom-2 right-2 w-5 h-5 bg-[#0A0514] rounded-full flex items-center justify-center z-20">
                        <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                     </div>
                  </div>
               </motion.div>

               <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-center w-full">
                  {data.companyName && (
                     <div className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-5 shadow-lg backdrop-blur-md">
                        <FiBox className="text-fuchsia-400" size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">{data.companyName}</span>
                     </div>
                  )}

                  <h1 className="text-4xl font-black text-white tracking-tighter mb-2 drop-shadow-md">
                     {data.displayName}
                  </h1>

                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 font-bold text-xs uppercase tracking-[0.3em] mb-6">
                     {data.role}
                  </p>

                  {data.bio && (
                     <p className="text-sm text-slate-300 leading-relaxed font-light px-2">
                        {data.bio}
                     </p>
                  )}
               </motion.div>
            </div>

            <div className="px-5 flex-1 space-y-2 pb-8 z-20 mt-2">

               {/* ================= ACTION DIRECTORY ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-3 gap-3 mb-6">
                  {[
                     { icon: FiPhone, link: `tel:${data.phone}`, label: "Ping" },
                     { icon: FiMail, link: `mailto:${data.email}`, label: "Mail" },
                     { icon: FiGlobe, link: formatUrl(data.website), label: "Terminal" }
                  ].map((action, i) => (
                     <a key={i} href={action.link} target="_blank" rel="noopener noreferrer" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-white/10 hover:border-cyan-500/50 transition-all group shadow-lg">
                        <action.icon size={20} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">{action.label}</span>
                     </a>
                  ))}
               </motion.div>

               {/* ================= SYSTEM TELEMETRY ================= */}
               <ChromaCard title="Live Telemetry" icon={FiActivity} delay={0.1}>
                  <div className="grid grid-cols-2 gap-4">
                     {fictionalData.telemetry.map((stat, i) => (
                        <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center hover:bg-white/10 transition-colors">
                           <stat.icon className="mb-2 text-cyan-400" size={18} />
                           <span className="block text-xl font-black text-white tracking-tight mb-1">{stat.val}</span>
                           <span className="block text-[9px] uppercase tracking-widest text-slate-400 font-bold">{stat.label}</span>
                        </div>
                     ))}
                  </div>
               </ChromaCard>

               {/* ================= CORE INFRASTRUCTURE ================= */}
               <ChromaCard title="Core Infrastructure" icon={FiCpu} delay={0.2}>
                  <div className="space-y-4">
                     {fictionalData.infrastructures.map((infra, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-[#0A0514]/50 rounded-2xl border border-white/5 hover:border-fuchsia-500/30 transition-colors group">
                           <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-fuchsia-400 shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                              <infra.icon size={20} />
                           </div>
                           <div>
                              <h4 className="text-sm font-bold text-white mb-1.5">{infra.title}</h4>
                              <p className="text-xs text-slate-400 leading-relaxed font-light">{infra.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </ChromaCard>

               {/* ================= NETWORK NODES ================= */}
               <ChromaCard title="Global Network Nodes" icon={FiCloudDrizzle} delay={0.3}>
                  <div className="space-y-3">
                     {fictionalData.networkNodes.map((node, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white/5 border border-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors">
                           <div className="flex items-center gap-3">
                              <FiMapPin className="text-cyan-400" size={16} />
                              <span className="text-sm font-medium text-slate-200">{node.region}</span>
                           </div>
                           <div className="text-right flex items-center gap-3">
                              <div className="flex flex-col items-end">
                                 <span className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-0.5">{node.status}</span>
                                 <span className="block text-[9px] text-cyan-500 font-mono">{node.latency}</span>
                              </div>
                              <FiCheckCircle className="text-cyan-400" size={16} />
                           </div>
                        </div>
                     ))}
                  </div>
               </ChromaCard>

               {/* ================= SECURITY AUDIT LOGS ================= */}
               <ChromaCard title="Security Audit Logs" icon={FiTerminal} delay={0.4}>
                  <div className="relative pl-5 border-l border-white/10 space-y-6">
                     {fictionalData.auditLogs.map((log, i) => (
                        <div key={i} className="relative">
                           <div className={`absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full border-2 border-[#0A0514] ${log.severity === 'Critical' ? 'bg-fuchsia-500' : log.severity === 'High' ? 'bg-amber-400' : 'bg-cyan-400'}`} />
                           <p className="text-[10px] font-mono text-slate-500 mb-1">{log.time} — {log.severity}</p>
                           <h4 className="text-sm font-semibold text-slate-200 leading-snug">{log.task}</h4>
                        </div>
                     ))}
                  </div>
               </ChromaCard>

               {/* ================= CLEARANCE DIRECTIVES (FAQ) ================= */}
               <ChromaCard title="Clearance Directives" icon={FiShield} delay={0.5}>
                  <div className="bg-[#0A0514]/50 rounded-2xl overflow-hidden border border-white/5">
                     {fictionalData.faqs.map((faq, index) => <QuantumAccordion key={index} question={faq.question} answer={faq.answer} />)}
                  </div>
               </ChromaCard>

               {/* ================= SOCIAL NETWORK ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="py-4">
                  <div className="flex justify-center gap-4">
                     {[
                        { val: data.linkedin, icon: FaLinkedinIn, link: `https://linkedin.com/in/${data.linkedin}` },
                        { val: data.twitter, icon: FaTwitter, link: `https://twitter.com/${data.twitter}` },
                        { val: data.github, icon: FaGithub, link: `https://github.com/${data.github}` },
                        { val: data.discord, icon: FaDiscord, link: `#` }
                     ].map((social, i) => social.val && (
                        <a
                           key={i} href={formatUrl(social.link.replace(/([^:]\/)\/+/g, "$1"))} target="_blank" rel="noopener noreferrer"
                           className="w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-cyan-400 transition-all rounded-full shadow-lg hover:-translate-y-1"
                        >
                           <social.icon size={20} />
                        </a>
                     ))}
                  </div>
               </motion.div>

               {/* ================= EXACT "STORE IDENTITY" BUTTON (INLINE) ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="pt-2 pb-4">
                  <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={() => downloadVCard(vCardData)}
                     className="w-full bg-white text-black py-4.5 rounded-full font-bold text-[13px] tracking-[0.15em] uppercase shadow-[0_10px_40px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3 transition-transform h-[60px]"
                  >
                     <FiDownload size={22} className="text-fuchsia-600" strokeWidth={2.5} />
                     STORE IDENTITY
                  </motion.button>
               </motion.div>

            </div>

            {/* ================= FOOTER ================= */}
            <div className="w-full py-6 text-center border-t border-white/10 bg-[#0A0514]/80 mt-auto relative z-20">
               <PoweredBy />
            </div>

         </div>

         <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes shimmer { 100% { transform: translateX(100%); } }
      `}} />
      </div>
   );
};

export default ConcreteCore;