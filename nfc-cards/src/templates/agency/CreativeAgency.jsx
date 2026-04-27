import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FiMonitor, FiCamera, FiEdit3, FiGlobe, FiZap, FiMail, FiPhone,
   FiMapPin, FiInstagram, FiLinkedin, FiTwitter, FiGithub, FiUserPlus,
   FiYoutube, FiMessageSquare, FiSend, FiShoppingBag, FiLayers, FiShield,
   FiArrowRight, FiExternalLink, FiClock, FiStar
} from 'react-icons/fi';
import { FaWhatsapp, FaTiktok, FaYoutube, FaDiscord, FaTelegram, FaSkype, FaPaypal, FaFacebook } from 'react-icons/fa';
import { downloadVCard } from "../common/StandardComponents";

const CreativeAgency = ({ userData }) => {
   const {
      displayName, email, role, phone, mobileNumber, website, address,
      businessName, instagram, linkedin, twitter, github, youtube, tiktok,
      discord, telegram, whatsapp, skype, paypal, facebook, bio, profileImage, logo,
      company, job, businessRole
   } = userData || {};

   const finalPhone = phone || mobileNumber;
   const finalRole = businessRole || role || job || "Creative Partner";
   const finalName = displayName || "Studio Identity";
   const finalBio = bio || "Architecting digital ecosystems through high-performance design nodes and technical excellence.";

   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: { staggerChildren: 0.1, delayChildren: 0.1 }
      }
   };

   const sectionVariants = {
      hidden: { y: 30, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
   };

   return (
      <div className="w-full bg-[#020617] text-white font-['Mulish'] relative pb-20">
         {/* Immersive Background Nodes */}
         <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
         </div>

         <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full relative z-10"
         >
            {/* HERO SECTION: Identity Hub */}
            <motion.section variants={sectionVariants} className="mb-12">
               <div className="bg-[#0f172a]/40 border-b border-white/10 p-1 shadow-2xl backdrop-blur-3xl overflow-hidden relative group">
                  <div className="bg-gradient-to-br from-cyan-400/20 to-blue-600/20 p-8 flex flex-col items-center text-center">
                     {/* Profile Image & Status */}
                     <div className="relative mb-6">
                        <motion.div
                           initial={{ scale: 0.8, opacity: 0 }}
                           animate={{ scale: 1, opacity: 1 }}
                           transition={{ duration: 0.8, type: 'spring' }}
                           className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-cyan-400/30 p-1 bg-black/20 shadow-[0_0_40px_rgba(34,211,238,0.2)]"
                        >
                           <img src={profileImage} alt={finalName} className="w-full h-full object-cover rounded-[2rem]" />
                        </motion.div>
                        <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-8 h-8 rounded-2xl border-4 border-[#020617] flex items-center justify-center shadow-lg">
                           <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                        </div>
                     </div>

                     <h1 className="text-4xl font-black tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-white/70">
                        {finalName}
                     </h1>
                     <div className="flex items-center gap-3 mb-6">
                        
                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                        <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">{company || businessName || "Studio"}</span>
                     </div>

                     <p className="text-sm leading-relaxed text-white/60 max-w-sm font-medium">
                        {finalBio}
                     </p>
                  </div>
               </div>
            </motion.section>

            <div className="px-6 space-y-12">
               {/* METRICS: Social Proof */}
               <motion.section variants={sectionVariants} className="grid grid-cols-3 gap-4">
                  {[
                     { label: "Completed", val: "500+", icon: FiZap },
                     { label: "Clients", val: "120+", icon: FiStar },
                     { label: "Uptime", val: "99.9%", icon: FiClock }
                  ].map((stat, i) => (
                     <div key={i} className="bg-white/[0.03] border border-white/5 rounded-3xl p-4 text-center group hover:bg-cyan-400/10 transition-all">
                        <stat.icon size={14} className="mx-auto mb-2 text-cyan-400 group-hover:scale-110 transition-transform" />
                        <p className="text-xl font-black text-white leading-none mb-1">{stat.val}</p>
                        <p className="text-[7px] font-black uppercase tracking-widest text-white/30">{stat.label}</p>
                     </div>
                  ))}
               </motion.section>

               {/* SERVICES: Capability Grid */}
               <motion.section variants={sectionVariants}>
                  <div className="flex items-center justify-between mb-6 px-2">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Core Specializations</h3>
                     <div className="h-px flex-1 bg-white/5 mx-6" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {[
                        { title: "UI/UX Architecture", desc: "High-fidelity interface design & logic", icon: FiMonitor, color: "text-cyan-400" },
                        { title: "Brand Identity", desc: "Cinematic visual storytelling & strategy", icon: FiCamera, color: "text-blue-400" },
                        { title: "Technical Strategy", desc: "Scalable ecosystem planning & execution", icon: FiLayers, color: "text-purple-400" },
                        { title: "Security Protocols", desc: "Encrypted data layers & secure uplinks", icon: FiShield, color: "text-rose-400" }
                     ].map((service, i) => (
                        <div key={i} className="bg-white/[0.03] border border-white/5 rounded-[2rem] p-6 hover:bg-white/[0.06] hover:border-white/10 transition-all group cursor-default">
                           <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 ${service.color} group-hover:scale-110 transition-transform`}>
                              <service.icon size={22} />
                           </div>
                           <h4 className="text-lg font-black mb-1">{service.title}</h4>
                           <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{service.desc}</p>
                        </div>
                     ))}
                  </div>
               </motion.section>

               {/* COMMUNICATIONS: Uplink Matrix */}
               <motion.section variants={sectionVariants}>
                  <div className="flex items-center justify-between mb-6 px-2">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Direct Communication</h3>
                     <div className="h-px flex-1 bg-white/5 mx-6" />
                  </div>
                  <div className="space-y-3">
                     {finalPhone && (
                        <a href={`tel:${finalPhone}`} className="flex items-center justify-between p-5 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-cyan-400 hover:text-black transition-all group/link">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover/link:bg-black/10">
                                 <FiPhone size={20} />
                              </div>
                              <div>
                                 <p className="text-[7px] font-black uppercase tracking-widest text-cyan-400 group-hover/link:text-black/60">Phone Terminal</p>
                                 <p className="text-sm font-black">{finalPhone}</p>
                              </div>
                           </div>
                           <FiArrowRight className="opacity-0 group-hover/link:opacity-100 -translate-x-4 group-hover/link:translate-x-0 transition-all" />
                        </a>
                     )}
                     {email && (
                        <a href={`mailto:${email}`} className="flex items-center justify-between p-5 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-blue-500 hover:text-black transition-all group/link">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover/link:bg-black/10">
                                 <FiMail size={20} />
                              </div>
                              <div>
                                 <p className="text-[7px] font-black uppercase tracking-widest text-blue-400 group-hover/link:text-black/60">Secure Mail</p>
                                 <p className="text-sm font-black truncate max-w-[180px]">{email}</p>
                              </div>
                           </div>
                           <FiArrowRight className="opacity-0 group-hover/link:opacity-100 -translate-x-4 group-hover/link:translate-x-0 transition-all" />
                        </a>
                     )}
                     {whatsapp && (
                        <a href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-emerald-500 hover:text-black transition-all group/link">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover/link:bg-black/10">
                                 <FaWhatsapp size={22} />
                              </div>
                              <div>
                                 <p className="text-[7px] font-black uppercase tracking-widest text-emerald-400 group-hover/link:text-black/60">WhatsApp Node</p>
                                 <p className="text-sm font-black">Secure Message</p>
                              </div>
                           </div>
                           <FiExternalLink className="opacity-0 group-hover/link:opacity-100 -translate-x-4 group-hover/link:translate-x-0 transition-all" />
                        </a>
                     )}
                  </div>
               </motion.section>

               {/* SOCIAL ECOSYSTEM: Grid Nexus */}
               <motion.section variants={sectionVariants}>
                  <div className="flex items-center justify-between mb-6 px-2">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Social Ecosystem</h3>
                     <div className="h-px flex-1 bg-white/5 mx-6" />
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                     {[
                        { id: 'instagram', val: instagram, icon: FiInstagram, color: 'hover:bg-[#e1306c]', label: 'IG' },
                        { id: 'linkedin', val: linkedin, icon: FiLinkedin, color: 'hover:bg-[#0077b5]', label: 'LN' },
                        { id: 'twitter', val: twitter, icon: FiTwitter, color: 'hover:bg-black hover:border-white/20', label: 'TW' },
                        { id: 'github', val: github, icon: FiGithub, color: 'hover:bg-zinc-800', label: 'GH' },
                        { id: 'youtube', val: youtube, icon: FaYoutube, color: 'hover:bg-[#ff0000]', label: 'YT' },
                        { id: 'tiktok', val: tiktok, icon: FaTiktok, color: 'hover:bg-black', label: 'TK' },
                        { id: 'discord', val: discord, icon: FaDiscord, color: 'hover:bg-[#5865f2]', label: 'DC' },
                        { id: 'telegram', val: telegram, icon: FaTelegram, color: 'hover:bg-[#0088cc]', label: 'TG' },
                        { id: 'facebook', val: facebook, icon: FaFacebook, color: 'hover:bg-[#1877f2]', label: 'FB' },
                        { id: 'skype', val: skype, icon: FaSkype, color: 'hover:bg-[#00aff0]', label: 'SK' }
                     ].map((social, i) => social.val && (
                        <a
                           key={i}
                           href={social.val.startsWith('http') ? social.val : `https://${social.id}.com/${social.val}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className={`aspect-square rounded-3xl bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center gap-2 transition-all ${social.color} group/social`}
                        >
                           <social.icon size={22} className="text-white/40 group-hover/social:text-white group-hover/social:scale-110 transition-all" />
                           <span className="text-[6px] font-black uppercase tracking-widest text-white/20 group-hover/social:text-white/60">{social.label}</span>
                        </a>
                     ))}
                  </div>
               </motion.section>

               {/* COMMERCE & LOCATION */}
               <motion.section variants={sectionVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {address && (
                     <a href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="bg-[#0f172a]/60 border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center text-center group hover:border-cyan-400/30 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 text-cyan-400 group-hover:scale-110 transition-transform">
                           <FiMapPin size={22} />
                        </div>
                        <h5 className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">Location Node</h5>
                        <p className="text-[11px] font-bold text-white/60 leading-relaxed">{address}</p>
                     </a>
                  )}
                  {website && (
                     <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="bg-[#0f172a]/60 border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center text-center group hover:border-blue-400/30 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                           <FiGlobe size={22} />
                        </div>
                        <h5 className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">Digital Portal</h5>
                        <p className="text-[11px] font-bold text-white/60 leading-relaxed">{website.replace(/(^\w+:|^)\/\//, '')}</p>
                     </a>
                  )}
               </motion.section>

               {/* FOOTER CTA: Persistent Sync */}
               <motion.div variants={sectionVariants} className="sticky bottom-8 left-0 right-0 z-50">
                  <button
                     onClick={() => downloadVCard(userData)}
                     className="w-full bg-white text-black py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.5em] shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_60px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 relative overflow-hidden group/cta"
                  >
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover/cta:animate-[shimmer_2s_infinite]" />
                     <FiUserPlus size={20} />
                     Synchronize Identity
                  </button>
               </motion.div>

               {/* POWERED BY: Brand Sequence */}
               <motion.footer variants={sectionVariants} className="mt-12 text-center pb-8">
                  <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="inline-block py-3 px-8 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm text-[9px] font-black uppercase tracking-[0.6em] text-white/10 hover:text-white/40 transition-all">
                     Powered by Cardyn
                  </a>
               </motion.footer>
            </div>
         </motion.div>

         {/* Global Style Animations */}
         <style dangerouslySetInnerHTML={{
            __html: `
         @keyframes shimmer {
           100% { transform: translateX(100%); }
         }
       `}} />
      </div>
   );
};

export default CreativeAgency;


