import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FiPhone, FiMail, FiGlobe, FiMapPin, FiArrowRight,
   FiChevronDown, FiTrendingUp, FiTarget, FiPieChart,
   FiBriefcase, FiAward, FiBookOpen, FiDownload, FiClock
} from 'react-icons/fi';
import { FaLinkedinIn, FaTwitter, FaBuilding, FaQuoteLeft, FaGithub } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Editorial Ledger Sub-components ---

const LedgerSection = ({ title, sectionNumber, children }) => (
   <div className="border-b-2 border-black bg-white">
      <div className="flex items-stretch border-b border-black/10">
         <div className="bg-black text-white px-4 py-3 flex items-center justify-center font-mono text-xs font-bold tracking-widest shrink-0">
            {sectionNumber}
         </div>
         <div className="px-5 py-3 flex items-center bg-gray-50 flex-1">
            <h2 className="font-serif text-lg font-bold text-black uppercase tracking-widest">{title}</h2>
         </div>
      </div>
      <div className="p-6">
         {children}
      </div>
   </div>
);

const LedgerAccordion = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border-b border-gray-200 last:border-b-0">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full py-4 flex justify-between items-center text-left focus:outline-none group"
         >
            <span className="font-bold text-sm text-black group-hover:text-blue-700 transition-colors pr-4">{question}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
               <FiChevronDown size={18} className="text-gray-400 group-hover:text-blue-700" />
            </motion.div>
         </button>
         <AnimatePresence>
            {isOpen && (
               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <div className="pb-4">
                     <p className="text-gray-600 text-sm leading-relaxed font-serif">
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

const CorporateGlass = ({ userData }) => {
   // Completely Fictional Persona: VC Managing Partner
   const fictionalData = {
      displayName: "Sebastian Cross",
      role: "Managing Partner & Founder",
      phone: "+1 (212) 555-8392",
      email: "s.cross@vanguardcap.com",
      website: "www.vanguardcap.com",
      address: "One World Trade Center, Floor 65, New York, NY",
      businessName: "Vanguard Capital Partners",
      twitter: "sebastian_vc",
      linkedin: "sebastiancross",
      github: "scross-invest",
      bio: "Driving asymmetric returns through early-stage investments in enterprise SaaS, deep-tech, and decentralized infrastructure. Partnering with relentless founders to architect industry-defining companies.",
      profileImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop",
      bannerImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop",
      metrics: [
         { label: "Assets Under Mgmt", val: "$1.2B" },
         { label: "Active Portfolios", val: "48" },
         { label: "Avg. Gross IRR", val: "34.2%" },
         { label: "Total Exits", val: "14" }
      ],
      thesis: [
         { title: "Enterprise B2B SaaS", desc: "Seed to Series B funding for mission-critical workflow and automation platforms.", icon: FiBriefcase },
         { title: "Deep-Tech & AI", desc: "Capitalizing on generative models, predictive analytics, and next-gen hardware.", icon: FiTarget },
         { title: "Strategic M&A Support", desc: "Providing portfolio companies with elite operational playbooks for acquisition.", icon: FiTrendingUp }
      ],
      portfolio: [
         { company: "Nexus Cloud", sector: "Cloud Infrastructure", status: "Status: Unicorn ($1.5B)", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" },
         { company: "OmniPay", sector: "FinTech Processing", status: "Status: Acquired", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" },
         { company: "Aether AI", sector: "Generative Models", status: "Status: Series B", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=400&fit=crop" }
      ],
      insights: [
         { title: "The Post-ZIRP Era: Valuations in Enterprise SaaS", date: "Nov 14, 2026", type: "Market Thesis" },
         { title: "Why We Led the $40M Series B in Aether AI", date: "Oct 22, 2026", type: "Deal Memo" }
      ],
      testimonials: [
         { name: "Marcus T., CEO OmniPay", text: "Sebastian doesn't just provide capital; he provides clarity. His board-level guidance was the catalyst for our acquisition." },
         { name: "Elena R., Founder Nexus Cloud", text: "Vanguard Capital operates with absolute precision. They are the tactical partners every technical founder needs to scale revenue." }
      ],
      hours: [
         { day: "New York HQ", hours: "08:00 - 18:00 EST" },
         { day: "London Office", hours: "09:00 - 17:00 GMT" }
      ],
      faqs: [
         { question: "What is your typical check size?", answer: "We typically write initial checks ranging from $2M to $15M for Seed and Series A rounds, with significant reserves for follow-on funding." },
         { question: "Do you lead funding rounds?", answer: "Yes. In 90% of our investments, we act as the lead investor and take an active board seat to provide operational support." },
         { question: "How can founders pitch Vanguard Capital?", answer: "We prioritize warm introductions through our founder network. However, executive summaries can be submitted via the portal on our website." }
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
      hidden: { opacity: 0, y: 15 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
   };

   return (
      <div className="w-full min-h-screen bg-[#E5E5E5] text-black font-['Inter',sans-serif] selection:bg-blue-600 selection:text-white flex justify-center pb-12 py-0 md:py-8">

         {/* Main Document Container */}
         <div className="w-full max-w-[520px] bg-white relative shadow-2xl min-h-screen border-2 border-black flex flex-col">

            {/* ================= HEADER / MASTHEAD ================= */}
            <div className="w-full border-b-2 border-black relative bg-gray-100">
               <div className="h-48 w-full overflow-hidden border-b border-black">
                  <img src={data.bannerImage} alt="HQ" className="w-full h-full object-cover grayscale mix-blend-multiply opacity-60" />
               </div>

               <div className="p-6 relative">
                  <div className="flex justify-between items-start">
                     {/* Profile Image - Sharp Square */}
                     <div className="w-28 h-28 border-2 border-black bg-white p-1 -mt-16 relative z-10 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                        <img src={data.profileImage} alt={data.displayName} className="w-full h-full object-cover grayscale" />
                     </div>

                     {data.businessName && (
                        <div className="flex items-center gap-2 border border-black px-3 py-1 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                           <FaBuilding className="text-blue-700" size={12} />
                           <span className="text-[10px] font-bold uppercase tracking-widest">{data.businessName}</span>
                        </div>
                     )}
                  </div>

                  <div className="mt-5">
                     <h1 className="text-4xl font-serif font-black text-black tracking-tight leading-none mb-2">
                        {data.displayName}
                     </h1>
                     <p className="text-blue-700 font-mono text-xs font-bold uppercase tracking-[0.2em] mb-4">
                        {data.role}
                     </p>
                     <p className="text-gray-700 text-sm leading-relaxed font-serif">
                        {data.bio}
                     </p>
                  </div>
               </div>
            </div>

            {/* ================= 01 // METRICS LEDGER ================= */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
               <LedgerSection title="Fund Performance" sectionNumber="01">
                  <div className="grid grid-cols-2 gap-4">
                     {fictionalData.metrics.map((stat, i) => (
                        <div key={i} className="border border-black p-4 bg-gray-50 flex flex-col justify-center items-center text-center shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                           <span className="block text-2xl font-serif font-black text-black mb-1">{stat.val}</span>
                           <span className="block text-[9px] uppercase tracking-widest text-gray-500 font-bold font-mono">{stat.label}</span>
                        </div>
                     ))}
                  </div>
               </LedgerSection>
            </motion.div>

            {/* ================= 02 // DIRECT COMMS ================= */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
               <LedgerSection title="Communications" sectionNumber="02">
                  <div className="grid grid-cols-1 gap-3">
                     {data.phone && (
                        <a href={`tel:${data.phone}`} className="w-full flex items-center justify-between border border-black p-4 hover:bg-blue-50 transition-colors group">
                           <div className="flex items-center gap-4">
                              <FiPhone size={20} className="text-blue-700" />
                              <span className="font-mono text-sm font-bold">{data.phone}</span>
                           </div>
                           <span className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-blue-700">Direct Line</span>
                        </a>
                     )}
                     {data.email && (
                        <a href={`mailto:${data.email}`} className="w-full flex items-center justify-between border border-black p-4 hover:bg-blue-50 transition-colors group">
                           <div className="flex items-center gap-4">
                              <FiMail size={20} className="text-blue-700" />
                              <span className="font-mono text-sm font-bold truncate max-w-[200px]">{data.email}</span>
                           </div>
                           <span className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-blue-700">Email</span>
                        </a>
                     )}
                     {data.website && (
                        <a href={`https://${data.website}`} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between border border-black bg-black text-white p-4 hover:bg-blue-700 transition-colors group">
                           <div className="flex items-center gap-4">
                              <FiGlobe size={20} className="text-white" />
                              <span className="font-bold text-sm tracking-wide uppercase">Corporate Portal</span>
                           </div>
                           <FiArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                     )}
                  </div>
               </LedgerSection>
            </motion.div>

            {/* ================= 03 // INVESTMENT THESIS ================= */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
               <LedgerSection title="Investment Thesis" sectionNumber="03">
                  <div className="space-y-5">
                     {fictionalData.thesis.map((item, i) => (
                        <div key={i} className="flex gap-4">
                           <div className="mt-1 shrink-0 text-blue-700">
                              <item.icon size={22} />
                           </div>
                           <div>
                              <h4 className="text-sm font-bold text-black mb-1">{item.title}</h4>
                              <p className="text-xs text-gray-600 font-serif leading-relaxed">{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </LedgerSection>
            </motion.div>

            {/* ================= 04 // PORTFOLIO (Vertical Ledger) ================= */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
               <LedgerSection title="Active Portfolio" sectionNumber="04">
                  <div className="flex flex-col gap-4">
                     {fictionalData.portfolio.map((item, idx) => (
                        <div key={idx} className="border border-black flex items-stretch bg-white group cursor-pointer hover:shadow-[4px_4px_0_0_rgba(37,99,235,1)] transition-all">
                           <div className="w-24 h-24 shrink-0 border-r border-black overflow-hidden">
                              <img src={item.img} alt={item.company} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                           </div>
                           <div className="p-3 flex flex-col justify-center flex-1 min-w-0">
                              <p className="text-[9px] font-mono text-gray-500 mb-1 truncate">{item.sector}</p>
                              <h4 className="text-sm font-bold text-black truncate mb-2">{item.company}</h4>
                              <span className="inline-block px-2 py-1 bg-gray-100 border border-gray-300 text-[9px] font-bold text-black w-fit uppercase">
                                 {item.status}
                              </span>
                           </div>
                        </div>
                     ))}
                  </div>
               </LedgerSection>
            </motion.div>

            {/* ================= 05 // PUBLICATIONS ================= */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
               <LedgerSection title="Market Memos" sectionNumber="05">
                  <div className="divide-y divide-black/10">
                     {fictionalData.insights.map((pub, idx) => (
                        <a key={idx} href="#" className="py-4 flex flex-col group block">
                           <div className="flex justify-between items-center mb-2">
                              <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5">{pub.type}</span>
                              <span className="text-[10px] text-gray-500 font-bold uppercase">{pub.date}</span>
                           </div>
                           <h4 className="text-sm font-bold font-serif text-black group-hover:text-blue-700 transition-colors leading-snug">{pub.title}</h4>
                        </a>
                     ))}
                  </div>
               </LedgerSection>
            </motion.div>

            {/* ================= 06 // ENDORSEMENTS ================= */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
               <LedgerSection title="Founder Feedback" sectionNumber="06">
                  <div className="space-y-6">
                     {fictionalData.testimonials.map((test, i) => (
                        <div key={i} className="relative pl-6 border-l-4 border-black">
                           <FaQuoteLeft className="text-gray-200 absolute top-0 -left-3 bg-white" size={20} />
                           <p className="text-sm text-gray-700 italic font-serif leading-relaxed mb-3">"{test.text}"</p>
                           <div>
                              <span className="block font-bold text-black text-xs uppercase tracking-wider">{test.name}</span>
                              <span className="block text-[10px] uppercase tracking-widest text-gray-500 mt-0.5">{test.role}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </LedgerSection>
            </motion.div>

            {/* ================= 07 // LOGISTICS & FAQ ================= */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
               <LedgerSection title="Operations" sectionNumber="07">
                  {data.address && (
                     <div className="flex items-start gap-4 pb-5 border-b border-gray-200 mb-5">
                        <FiMapPin size={20} className="text-blue-700 mt-0.5 shrink-0" />
                        <div>
                           <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1">Corporate HQ</p>
                           <p className="text-sm font-semibold text-black leading-snug">{data.address}</p>
                        </div>
                     </div>
                  )}

                  <div className="mb-8">
                     <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-3 flex items-center gap-2"><FiClock className="shrink-0" /> Global Market Hours</p>
                     <div className="border border-black bg-gray-50 p-4">
                        {fictionalData.hours.map((bh, i) => (
                           <div key={i} className="flex justify-between items-center py-1.5 text-xs border-b border-gray-200 last:border-0 font-mono">
                              <span className="text-gray-600 font-bold">{bh.day}</span>
                              <span className="font-bold text-black">{bh.hours}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div>
                     <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-3">Syndication FAQ</p>
                     <div className="border-t border-gray-200">
                        {fictionalData.faqs.map((faq, index) => <LedgerAccordion key={index} question={faq.question} answer={faq.answer} />)}
                     </div>
                  </div>
               </LedgerSection>
            </motion.div>

            {/* ================= 08 // DIGITAL PRESENCE ================= */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
               <LedgerSection title="Network" sectionNumber="08">
                  <div className="flex flex-wrap justify-center gap-4">
                     {[
                        { val: data.linkedin, icon: FaLinkedinIn, link: `https://linkedin.com/in/${data.linkedin}` },
                        { val: data.twitter, icon: FaTwitter, link: `https://twitter.com/${data.twitter}` },
                        { val: data.github, icon: FaGithub, link: `https://github.com/${data.github}` }
                     ].map((social, i) => social.val && (
                        <a
                           key={i} href={social.link || null} target="_blank" rel="noopener noreferrer"
                           className="w-14 h-14 bg-white border-2 border-black flex items-center justify-center text-black hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
                        >
                           <social.icon size={20} />
                        </a>
                     ))}
                  </div>
               </LedgerSection>
            </motion.div>

            {/* ================= SAVE CONTACT CTA ================= */}
            <div className="p-6 bg-gray-100 border-t-2 border-black">
               <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => downloadVCard(vCardData)}
                  className="w-full bg-blue-700 text-white border-2 border-black py-5 font-bold text-sm uppercase tracking-widest shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-blue-800 transition-all flex items-center justify-center gap-3 active:translate-x-1 active:translate-y-1 active:shadow-none"
               >
                  <FiDownload size={20} className="shrink-0" />
                  <span className="truncate">Download Dossier</span>
               </motion.button>
            </div>

            {/* ================= FOOTER ================= */}
            <div className="pb-8 pt-4 text-center bg-gray-100">
               <PoweredBy />
            </div>

         </div>

         <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,600&display=swap');
      `}} />
      </div>
   );
};

export default CorporateGlass;