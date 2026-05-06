import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FiPhone, FiMail, FiGlobe, FiMapPin, FiTerminal,
   FiCpu, FiCrosshair, FiDatabase, FiActivity, FiTarget,
   FiChevronDown, FiDownload, FiHexagon, FiCloud,
   FiCommand
} from 'react-icons/fi';
import { FaLinkedinIn, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Vector HUD Sub-components ---

const HudPanel = ({ title, icon: Icon, children, delay = 0 }) => (
   <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="relative bg-[#0A1128]/80 backdrop-blur-md border border-[#00F0FF]/20 p-5 mb-6 group shadow-lg"
   >
      {/* Tech Corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00F0FF] opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00F0FF] opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00F0FF] opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00F0FF] opacity-50 group-hover:opacity-100 transition-opacity" />

      {title && (
         <div className="flex items-center gap-3 mb-5 border-b border-[#00F0FF]/20 pb-3">
            {Icon && <Icon size={14} className="text-[#00F0FF]" />}
            <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-white">{title}</h3>
            <div className="ml-auto flex gap-1">
               <div className="w-1 h-3 bg-[#00F0FF]/40" />
               <div className="w-1 h-3 bg-[#00F0FF]/20" />
               <div className="w-1 h-3 bg-[#00F0FF]/10" />
            </div>
         </div>
      )}

      <div className="relative z-10">{children}</div>
   </motion.div>
);

const DataAccordion = ({ label, output }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border-b border-[#00F0FF]/20 last:border-0">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full py-3 flex justify-between items-center text-left focus:outline-none group"
         >
            <div className="flex items-center gap-3">
               <FiCommand size={14} className="text-[#00F0FF]/60 group-hover:text-[#00F0FF] transition-colors" />
               <span className="font-mono text-xs uppercase tracking-widest text-[#8A9BB3] group-hover:text-white transition-colors">QRY: {label}</span>
            </div>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
               <FiChevronDown size={14} className="text-[#00F0FF]" />
            </motion.div>
         </button>
         <AnimatePresence>
            {isOpen && (
               <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
               >
                  <div className="pb-4 pt-2 pl-7">
                     <p className="text-[#00F0FF] font-mono text-xs leading-relaxed border-l border-[#00F0FF]/30 pl-3 bg-[#00F0FF]/5 py-2 pr-2">
                        {">"} {output}
                     </p>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

// --- Main Component ---

const VectorStructure = ({ userData }) => {
   const fictionalData = {
      displayName: "Vector Admin",
      email: "admin@vector.structure",
      role: "System Lead",
      phone: "+1 (555) 999-0000",
      mobileNumber: "+1 (555) 999-0000",
      companyName: "Vector Structure Corp",
      designation: "System Lead",
      website: "www.vector.structure",
      address: "Silicon Valley, CA",
      bio: "Mastering the geometric interface between architecture and code.",
      avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop",
      logo: ""
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
      businessName: userData?.companyName || userData?.company || userData?.businessName || fictionalData.businessName || fictionalData.companyName || fictionalData.company,
      whatsapp: userData?.whatsapp || fictionalData.whatsapp,
      linkedin: userData?.linkedin || fictionalData.linkedin,
      twitter: userData?.twitter || fictionalData.twitter,
      instagram: userData?.instagram || fictionalData.instagram,
      facebook: userData?.facebook || fictionalData.facebook,
      github: userData?.github || fictionalData.github,
      youtube: userData?.youtube || fictionalData.youtube,
      tiktok: userData?.tiktok || fictionalData.tiktok,
      telegram: userData?.telegram || fictionalData.telegram,
      bio: userData?.bio || fictionalData.bio,
      profileImage: userData?.profileImage || userData?.avatar || userData?.logo || fictionalData.profileImage || fictionalData.avatar || fictionalData.defaultAvatar,
      avatar: userData?.profileImage || userData?.avatar || userData?.logo || fictionalData.profileImage || fictionalData.avatar || fictionalData.defaultAvatar,
      logo: userData?.logo || userData?.profileImage || fictionalData.logo,
      bannerImage: userData?.coverPhoto || fictionalData.bannerImage || fictionalData.coverImage,
   };

   const displayPhone = data.phone || data.mobileNumber;
   const displayRole = data.role;
   const finalAddress = data.address;
   const displayTitle = data.displayName;

   // Safe initial letter extraction
   const initialLetter = String(displayTitle).charAt(0).toUpperCase();

   // Bulletproof URL Formatter
   const formatUrl = (url) => {
      if (!url) return null;
      const stringUrl = String(url).trim();
      if (stringUrl === "" || stringUrl === "#") return null;
      return stringUrl.startsWith('http') ? stringUrl : `https://${stringUrl}`;
   };

   // Themed Static Visual Content (Strictly visual flair)
   const themeData = {
      telemetry: [
         { label: "Core Temp", val: "34°C", load: "25%" },
         { label: "Data Throughput", val: "1.2 TB/s", load: "85%" },
         { label: "Uplink Latency", val: "4ms", load: "10%" },
         { label: "Mesh Integrity", val: "99.9%", load: "100%" }
      ],
      modules: [
         { id: "M-01", title: "Topological Mapping", desc: "Real-time 3D vector rendering of decentralized server meshes.", icon: FiTarget },
         { id: "M-02", title: "Quantum Routing", desc: "Algorithmic data pathfinding with sub-millisecond automated failovers.", icon: FiCloud },
         { id: "M-03", title: "Core Architecture", desc: "Structural deployment of scalable, zero-trust backend environments.", icon: FiDatabase }
      ],
      logs: [
         { hash: "0x8F2A", event: "Node synchronization complete.", status: "OK" },
         { hash: "0x9B1C", event: "Firewall parameters updated.", status: "OK" },
         { hash: "0x3C4D", event: "Awaiting external uplink...", status: "PENDING" }
      ],
      queries: [
         { label: "ACCESS_LEVEL", output: "Level 4 (Directorate). Authorization requires biometric and cryptographic signatures." },
         { label: "MAINTENANCE_SCHEDULE", output: "Automated rolling updates active. Zero anticipated downtime. Next core flush: T-minus 48 hours." },
         { label: "DATA_COMPLIANCE", output: "All topological data adheres strictly to Inter-Sector routing laws. End-to-end quantum encryption enforced." }
      ]
   };

   // Dynamically filter active communication links from user data
   const actionLinks = [
      { icon: FiPhone, link: displayPhone ? `tel:${String(displayPhone).replace(/\s+/g, '')}` : null, label: "Audio Channel", val: displayPhone },
      { icon: FiMail, link: data.email ? `mailto:${data.email}` : null, label: "Packet Transfer", val: data.email },
      { icon: FiTerminal, link: formatUrl(data.website), label: "Web Portal", val: data.website },
      { icon: FiMapPin, link: finalAddress ? `https://maps.google.com/?q=${encodeURIComponent(finalAddress)}` : null, label: "Physical Node", val: finalAddress }
   ].filter(item => item.link && item.val);

   // Dynamically filter active social links from user data
   const socialLinks = [
      { val: data.linkedin, icon: FaLinkedinIn, prefix: 'https://data.linkedin.com/in/' },
      { val: data.twitter, icon: FaTwitter, prefix: 'https://data.twitter.com/' },
      { val: data.instagram, icon: FaInstagram, prefix: 'https://data.instagram.com/' },
      { val: data.facebook, icon: FaFacebook, prefix: 'https://data.facebook.com/' }
   ].filter(social => social.val && String(social.val).trim() !== "");

   const fadeUp = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
   };

   return (
      <div className="w-full min-h-screen bg-[#02050A] text-[#8A9BB3] font-mono selection:bg-[#00F0FF] selection:text-[#02050A] flex justify-center pb-12 overflow-hidden relative md:py-8">

         {/* ================= VECTOR BACKGROUND & SCANNER ================= */}
         <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
            style={{ backgroundImage: 'linear-gradient(#00F0FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

         {/* Scanning Laser Line */}
         <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <motion.div
               animate={{ top: ['-10%', '110%'] }}
               transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
               className="absolute left-0 w-full h-[2px] bg-[#00F0FF] shadow-[0_0_20px_2px_#00F0FF]"
            />
         </div>

         {/* Main Container */}
         <div className="w-full max-w-[480px] relative z-10 bg-[#050B14]/90 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,240,255,0.05)] min-h-screen border-x border-[#00F0FF]/30 flex flex-col md:border-y md:my-4">

            {/* ================= HUD HEADER ================= */}
            <div className="w-full px-5 pt-8 pb-4 relative z-20">

               {/* Top Status Bar */}
               <div className="flex justify-between items-center border-b border-[#00F0FF]/30 pb-3 mb-6">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-[#00F0FF] animate-pulse shadow-[0_0_8px_#00F0FF]" />
                     <span className="text-[9px] uppercase tracking-widest text-[#00F0FF]">SYS.ONLINE</span>
                  </div>
                  <div className="text-right">
                     <span className="text-[9px] uppercase tracking-widest text-white/50 block">ID: ACTIVE</span>
                  </div>
               </div>

               <div className="flex gap-5 items-center mb-6">
                  <motion.div
                     initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}
                     className="relative shrink-0"
                  >
                     {/* Hexagon/Square Tech Frame */}
                     <div className="w-28 h-28 bg-[#00F0FF]/10 p-1 relative border border-[#00F0FF]/50 shadow-[0_0_30px_rgba(0,240,255,0.15)] overflow-hidden flex items-center justify-center">
                        <FiCrosshair className="absolute text-[#00F0FF]/30 w-full h-full scale-150 animate-[spin_60s_linear_infinite] pointer-events-none" />
                        <div className="w-full h-full bg-[#02050A] relative z-10 overflow-hidden flex items-center justify-center border border-[#00F0FF]/30">
                           {data.logo ? (
                              <img src={data.logo} alt="Logo" className="w-full h-full object-contain p-3 mix-blend-screen" />
                           ) : data.avatar ? (
                              <img src={data.avatar} alt="Profile" className="w-full h-full object-cover mix-blend-screen opacity-90 grayscale contrast-125" />
                           ) : (
                              <span className="text-4xl font-black text-[#00F0FF] uppercase">{initialLetter}</span>
                           )}
                        </div>
                     </div>
                  </motion.div>

                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="overflow-hidden">
                     {data.businessName && (
                        <div className="inline-flex items-center gap-2 bg-[#00F0FF]/10 border border-[#00F0FF]/40 px-3 py-1 mb-3 max-w-full">
                           <FiHexagon size={10} className="text-[#00F0FF] shrink-0" />
                           <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#00F0FF] truncate">{data.businessName}</span>
                        </div>
                     )}
                     <h1 className="text-2xl font-black text-white uppercase tracking-tighter leading-none mb-2 truncate">
                        {displayTitle}
                     </h1>
                     <p className="text-xs uppercase tracking-[0.2em] text-[#8A9BB3] truncate">
                        {displayRole}
                     </p>
                  </motion.div>
               </div>

               {data.bio && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-[#00F0FF]/5 border-l-2 border-[#00F0FF] p-3">
                     <p className="text-[11px] text-[#8A9BB3] leading-relaxed uppercase tracking-wide">
                        {">"} {data.bio}
                     </p>
                  </motion.div>
               )}
            </div>

            <div className="px-5 flex-1 space-y-2 pb-6 z-20">

               {/* ================= TELEMETRY BARS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <HudPanel title="System Telemetry" icon={FiActivity}>
                     <div className="space-y-4">
                        {themeData.telemetry.map((stat, i) => (
                           <div key={i}>
                              <div className="flex justify-between text-[10px] uppercase tracking-widest mb-1.5">
                                 <span className="text-white">{stat.label}</span>
                                 <span className="text-[#00F0FF]">{stat.val}</span>
                              </div>
                              <div className="w-full h-1.5 bg-[#001833] overflow-hidden relative">
                                 <motion.div
                                    initial={{ width: 0 }} whileInView={{ width: stat.load }} transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-[#0055FF] to-[#00F0FF]"
                                 />
                              </div>
                           </div>
                        ))}
                     </div>
                  </HudPanel>
               </motion.div>

               {/* ================= DATA UPLINK (CONTACT) ================= */}
               {actionLinks.length > 0 && (
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                     <HudPanel title="Data Uplink Links" icon={FiGlobe}>
                        <div className="grid grid-cols-1 gap-2">
                           {actionLinks.map((action, i) => (
                              <a key={i} href={action.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-[#0A1128] border border-[#00F0FF]/20 p-3 hover:bg-[#00F0FF]/10 hover:border-[#00F0FF] transition-all group cursor-pointer">
                                 <action.icon size={16} className="text-[#00F0FF]/50 group-hover:text-[#00F0FF] shrink-0" />
                                 <div className="flex flex-col overflow-hidden">
                                    <span className="text-[9px] uppercase tracking-widest text-[#8A9BB3] mb-0.5">{action.label}</span>
                                    <span className="text-xs text-white truncate">{action.val}</span>
                                 </div>
                              </a>
                           ))}
                        </div>
                     </HudPanel>
                  </motion.div>
               )}

               {/* ================= CORE MODULES ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <HudPanel title="Active Modules" icon={FiCpu}>
                     <div className="space-y-3">
                        {themeData.modules.map((mod, i) => (
                           <div key={i} className="flex gap-4 p-3 border border-[#00F0FF]/10 bg-gradient-to-r from-[#00F0FF]/5 to-transparent hover:border-[#00F0FF]/40 transition-colors group">
                              <div className="mt-1 text-[#00F0FF]/70 group-hover:text-[#00F0FF] shrink-0">
                                 <mod.icon size={18} />
                              </div>
                              <div>
                                 <div className="flex items-center gap-2 mb-1">
                                    <span className="bg-[#00F0FF] text-[#0A1128] text-[8px] font-bold px-1.5 py-0.5">{mod.id}</span>
                                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">{mod.title}</h4>
                                 </div>
                                 <p className="text-[10px] text-[#8A9BB3] uppercase tracking-wide leading-relaxed">{mod.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </HudPanel>
               </motion.div>

               {/* ================= AUDIT TERMINAL ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <HudPanel title="Audit Terminal" icon={FiDatabase}>
                     <div className="font-mono text-[10px] space-y-2 uppercase">
                        {themeData.logs.map((log, i) => (
                           <div key={i} className="flex gap-3">
                              <span className="text-[#00F0FF] shrink-0">[{log.hash}]</span>
                              <span className="text-[#8A9BB3] flex-1">{log.event}</span>
                              <span className={log.status === 'OK' ? 'text-emerald-400' : 'text-amber-400'}>{log.status}</span>
                           </div>
                        ))}
                        <div className="flex gap-3 pt-2">
                           <span className="text-[#00F0FF] shrink-0 animate-pulse">{">_"}</span>
                           <span className="text-[#8A9BB3] flex-1 animate-pulse">Awaiting input...</span>
                        </div>
                     </div>
                  </HudPanel>
               </motion.div>

               {/* ================= QUERY INTERFACE (FAQ) ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <HudPanel title="System Queries" icon={FiCommand}>
                     <div>
                        {themeData.queries.map((q, index) => <DataAccordion key={index} label={q.label} output={q.output} />)}
                     </div>
                  </HudPanel>
               </motion.div>

               {/* ================= NETWORK LINKS (SOCIALS) ================= */}
               {socialLinks.length > 0 && (
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="py-2">
                     <div className="flex justify-center gap-3">
                        {socialLinks.map((social, i) => {
                           const link = social.val.startsWith('http') ? social.val : `${social.prefix}${social.val}`;
                           return (
                              <a
                                 key={i} href={link} target="_blank" rel="noopener noreferrer"
                                 className="w-12 h-12 border border-[#00F0FF]/30 flex items-center justify-center text-[#8A9BB3] hover:text-[#0A1128] hover:bg-[#00F0FF] hover:border-[#00F0FF] transition-all shadow-[0_0_15px_rgba(0,240,255,0)] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                              >
                                 <social.icon size={18} />
                              </a>
                           );
                        })}
                     </div>
                  </motion.div>
               )}

               {/* ================= EXACT "STORE IDENTITY" BUTTON (INLINE) ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="pt-4 pb-2">
                  <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={() => downloadVCard(userData || {})}
                     className="w-full bg-[#00F0FF] text-[#02050A] py-5 font-bold text-xs tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] flex items-center justify-center gap-3 transition-all relative overflow-hidden group"
                  >
                     <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                     <FiDownload size={18} className="relative z-10" />
                     <span className="relative z-10">INITIALIZE UPLINK</span>
                  </motion.button>
               </motion.div>

            </div>

            {/* ================= FOOTER ================= */}
            <div className="w-full py-5 text-center border-t border-[#00F0FF]/20 bg-[#0A1128]/90 mt-auto relative z-20">
               <PoweredBy />
            </div>

         </div>

         <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        .font-mono { font-family: 'Space Mono', monospace; }
      `}} />
      </div>
   );
};

export default VectorStructure;