import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FiPhone, FiMail, FiGlobe, FiMapPin, FiArrowUpRight,
   FiChevronDown, FiBriefcase, FiBarChart2, FiTarget,
   FiPlayCircle, FiMessageSquare, FiClock, FiDownloadCloud, FiLink
} from 'react-icons/fi';
import { FaLinkedinIn, FaTwitter, FaPodcast, FaQuoteLeft } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Executive Blueprint Sub-components ---

const TimelineSection = ({ title, icon: Icon, children, isLast = false }) => (
   <div className="relative pl-10 pb-10">
      {/* Vertical Spine Line */}
      {!isLast && <div className="absolute left-[19px] top-8 bottom-0 w-[2px] bg-slate-200" />}

      {/* Timeline Node */}
      <div className="absolute left-[11px] top-1 w-[18px] h-[18px] rounded-full bg-cyan-500 border-4 border-white shadow-sm z-10" />

      {title && (
         <div className="flex items-center gap-2 mb-5">
            {Icon && <Icon size={18} className="text-slate-400" />}
            <h2 className="text-lg font-bold text-slate-900 tracking-tight uppercase">{title}</h2>
         </div>
      )}

      <div className="w-full">
         {children}
      </div>
   </div>
);

const BlueprintAccordion = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border border-slate-200 mb-3 rounded-xl bg-white overflow-hidden shadow-sm">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-4 flex justify-between items-center text-left focus:outline-none hover:bg-slate-50 transition-colors"
         >
            <span className="font-bold text-sm text-slate-800 pr-4">{question}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
               <FiChevronDown size={18} className="text-cyan-600" />
            </motion.div>
         </button>
         <AnimatePresence>
            {isOpen && (
               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <div className="px-4 pb-4">
                     <p className="text-slate-600 text-sm leading-relaxed pt-2 border-t border-slate-100">
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

const ClassicExecutive = ({ userData }) => {
   // Completely Fictional Persona: CEO of a Growth Agency
   const fictionalData = {
      displayName: "Victoria Sterling",
      role: "Founder & Chief Growth Officer",
      phone: "+1 (312) 555-9088",
      email: "v.sterling@velocitypartners.io",
      website: "www.velocitypartners.io",
      address: "150 N Riverside Plaza, Chicago, IL",
      businessName: "Velocity Growth Partners",
      twitter: "victoriagrowth",
      linkedin: "victoriasterling",
      bio: "We architect hyper-growth strategies for B2B SaaS companies. Scaling revenue operations from $10M to $100M ARR through aggressive market positioning and elite sales frameworks.",
      profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      bannerImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop",
      stats: [
         { label: "Revenue Generated", val: "$850M+" },
         { label: "Unicorn Exits", val: "4" },
         { label: "Active Partners", val: "28" }
      ],
      services: [
         { title: "Go-To-Market (GTM) Strategy", desc: "End-to-end launch playbooks for new enterprise software products.", icon: FiTarget },
         { title: "Revenue Operations (RevOps)", desc: "Aligning sales, marketing, and customer success tech stacks.", icon: FiBarChart2 },
         { title: "Executive Brand Positioning", desc: "Building thought leadership pipelines for technical founders.", icon: FiBriefcase }
      ],
      caseStudies: [
         { title: "FinTech Scale-up", metric: "3x ARR in 12 Months", desc: "Redesigned outbound sales motion.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" },
         { title: "Enterprise Cloud", metric: "Series C ($40M)", desc: "Positioning overhaul pre-raise.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop" }
      ],
      podcast: {
         title: "The Scale Blueprint Podcast",
         episode: "Ep. 42: Why Your Sales Motion is Breaking at $10M ARR",
         duration: "45 Min Listen",
         img: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400&h=400&fit=crop"
      },
      testimonials: [
         { name: "David Chen", role: "CEO, NexusAI", text: "Victoria's team came in and completely rewired our revenue engine. We hit our 2-year growth target in 9 months." },
         { name: "Sarah Jenkins", role: "VP Marketing, CloudCore", text: "The most ruthless, effective GTM strategists in the B2B space. Velocity Partners is the real deal." }
      ],
      hours: [
         { day: "Mon - Thu", hours: "08:00 AM - 06:00 PM CST" },
         { day: "Friday", hours: "08:00 AM - 02:00 PM CST" },
         { day: "Weekend", hours: "Closed" }
      ],
      faqs: [
         { question: "What stage companies do you work with?", answer: "We exclusively partner with post-Series A B2B tech companies that have proven product-market fit and are ready to scale revenue aggressively." },
         { question: "What is your typical engagement model?", answer: "Our standard engagement is a 6-month operational sprint, followed by a quarterly advisory retainer to ensure execution alignment." },
         { question: "Do you execute campaigns or just advise?", answer: "We are an operational partner. We don't just hand you a deck; our team actively builds out your CRM, sequences, and marketing funnels alongside you." }
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
      hidden: { opacity: 0, x: -10 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
   };

   return (
      <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-800 font-['Space_Grotesk',sans-serif] selection:bg-cyan-500 selection:text-white flex justify-center pb-12">

         {/* App Container */}
         <div className="w-full max-w-[480px] bg-white relative shadow-2xl min-h-screen border-x border-slate-200 flex flex-col">

            {/* ================= HERO HEADER ================= */}
            <div className="w-full relative bg-[#0F172A] pb-10">
               <div className="h-[200px] w-full overflow-hidden opacity-40 mix-blend-luminosity">
                  <img src={data.bannerImage} alt="Office" className="w-full h-full object-cover" />
               </div>
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F172A]" />

               <div className="relative z-10 px-8 -mt-16 flex flex-col items-start">
                  <div className="w-28 h-28 bg-white p-1 shadow-xl mb-5 rounded-2xl rotate-3 hover:rotate-0 transition-transform duration-300">
                     <img src={data.profileImage} alt={data.displayName} className="w-full h-full object-cover rounded-xl" />
                  </div>

                  {data.businessName && (
                     <div className="bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-3">
                        {data.businessName}
                     </div>
                  )}

                  <h1 className="text-3xl font-bold text-white tracking-tight mb-1">{data.displayName}</h1>
                  <p className="text-cyan-400 font-semibold text-sm uppercase tracking-wide mb-4">{data.role}</p>
                  <p className="text-slate-300 text-sm leading-relaxed">"{data.bio}"</p>
               </div>
            </div>

            {/* ================= TIMELINE CONTENT START ================= */}
            <div className="pt-10 px-4 flex-1">

               {/* Section 1: Core Metrics */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
                  <TimelineSection title="Impact Metrics" icon={FiBarChart2}>
                     <div className="grid grid-cols-1 gap-3">
                        {fictionalData.stats.map((stat, i) => (
                           <div key={i} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex justify-between items-center shadow-sm">
                              <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">{stat.label}</span>
                              <span className="text-lg font-bold text-slate-900">{stat.val}</span>
                           </div>
                        ))}
                     </div>
                  </TimelineSection>
               </motion.div>

               {/* Section 2: Direct Comms */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
                  <TimelineSection title="Comms Directory" icon={FiLink}>
                     <div className="grid grid-cols-2 gap-3">
                        {data.phone && (
                           <a href={`tel:${data.phone}`} className="bg-[#0F172A] text-white p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-[4px_4px_0_0_#06B6D4] hover:translate-x-1 hover:-translate-y-1 transition-transform">
                              <FiPhone size={20} className="text-cyan-400" />
                              <span className="text-[10px] font-bold uppercase tracking-widest">Office Line</span>
                           </a>
                        )}
                        {data.email && (
                           <a href={`mailto:${data.email}`} className="bg-white border border-slate-300 p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-[4px_4px_0_0_#0F172A] hover:translate-x-1 hover:-translate-y-1 transition-transform">
                              <FiMail size={20} className="text-slate-900" />
                              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700">Email Desk</span>
                           </a>
                        )}
                        {data.website && (
                           <a href={`https://${data.website}`} target="_blank" rel="noopener noreferrer" className="col-span-2 bg-white border border-slate-300 p-4 rounded-xl flex justify-between items-center group shadow-sm hover:border-cyan-500 transition-colors">
                              <div className="flex items-center gap-3">
                                 <FiGlobe className="text-cyan-500" size={20} />
                                 <span className="text-xs font-bold uppercase tracking-widest text-slate-800">Corporate Portal</span>
                              </div>
                              <FiArrowUpRight className="text-slate-400 group-hover:text-slate-900" size={18} />
                           </a>
                        )}
                     </div>
                  </TimelineSection>
               </motion.div>

               {/* Section 3: Advisory Focus */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
                  <TimelineSection title="Advisory Focus" icon={FiTarget}>
                     <div className="space-y-4">
                        {fictionalData.services.map((svc, i) => (
                           <div key={i} className="flex gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-cyan-400 transition-colors group">
                              <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                                 <svc.icon size={18} />
                              </div>
                              <div>
                                 <h4 className="text-sm font-bold text-slate-900 mb-1">{svc.title}</h4>
                                 <p className="text-xs text-slate-600 leading-relaxed">{svc.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </TimelineSection>
               </motion.div>

               {/* Section 4: Media / Podcast (Unique Module) */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
                  <TimelineSection title="Featured Media" icon={FaPodcast}>
                     <div className="bg-[#0F172A] p-5 rounded-2xl text-white shadow-lg relative overflow-hidden">
                        <div className="absolute -right-4 -bottom-4 opacity-10">
                           <FaPodcast size={120} />
                        </div>
                        <div className="flex gap-4 relative z-10 items-center">
                           <img src={fictionalData.podcast.img} alt="Podcast" className="w-20 h-20 rounded-lg object-cover shadow-md border border-slate-700" />
                           <div className="flex-1">
                              <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest mb-1">{fictionalData.podcast.title}</p>
                              <h4 className="text-sm font-bold leading-snug mb-2 line-clamp-2">{fictionalData.podcast.episode}</h4>
                              <div className="flex items-center gap-2">
                                 <FiPlayCircle className="text-white hover:text-cyan-400 cursor-pointer" size={24} />
                                 <span className="text-[10px] text-slate-400">{fictionalData.podcast.duration}</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </TimelineSection>
               </motion.div>

               {/* Section 5: Case Studies (Horizontal Scroll) */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
                  <TimelineSection title="Track Record" icon={FiBriefcase}>
                     <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar">
                        {fictionalData.caseStudies.map((item, idx) => (
                           <div key={idx} className="min-w-[240px] bg-white border border-slate-200 rounded-xl overflow-hidden snap-center shadow-sm">
                              <div className="h-32 w-full overflow-hidden">
                                 <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                              </div>
                              <div className="p-4">
                                 <h4 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h4>
                                 <p className="text-xs text-slate-500 mb-3">{item.desc}</p>
                                 <div className="inline-block bg-cyan-50 text-cyan-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-cyan-100">
                                    {item.metric}
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </TimelineSection>
               </motion.div>

               {/* Section 6: Client Endorsements */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
                  <TimelineSection title="Endorsements" icon={FiMessageSquare}>
                     <div className="space-y-4">
                        {fictionalData.testimonials.map((test, i) => (
                           <div key={i} className="bg-slate-50 p-5 rounded-xl border border-slate-200 relative">
                              <FaQuoteLeft className="absolute top-4 right-4 text-slate-200" size={24} />
                              <p className="text-sm text-slate-700 italic leading-relaxed mb-4 relative z-10 pr-6">"{test.text}"</p>
                              <div className="flex items-center gap-3">
                                 <div className="w-2 h-8 bg-cyan-500 rounded-full" />
                                 <div>
                                    <span className="block font-bold text-slate-900 text-xs uppercase tracking-wider">{test.name}</span>
                                    <span className="block text-[10px] text-slate-500 font-semibold">{test.role}</span>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </TimelineSection>
               </motion.div>

               {/* Section 7: Operations & Protocols */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
                  <TimelineSection title="Operations" icon={FiClock}>
                     <div className="mb-6 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-3 border-b border-slate-100 pb-2">
                           <FiMapPin className="text-cyan-600" size={16} />
                           <span className="text-xs font-bold text-slate-800">{data.address}</span>
                        </div>
                        {fictionalData.hours.map((bh, i) => (
                           <div key={i} className="flex justify-between items-center py-1.5 text-xs">
                              <span className="text-slate-500 font-medium">{bh.day}</span>
                              <span className="font-bold text-slate-900">{bh.hours}</span>
                           </div>
                        ))}
                     </div>

                     <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Engagement FAQ</h3>
                     <div>
                        {fictionalData.faqs.map((faq, index) => <BlueprintAccordion key={index} question={faq.question} answer={faq.answer} />)}
                     </div>
                  </TimelineSection>
               </motion.div>

               {/* Section 8: Network & CTA */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
                  <TimelineSection title="Professional Network" isLast={true}>

                     {/* QR Code integration */}
                     <div className="flex items-center gap-6 mb-8 bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                        <div className="w-24 h-24 p-2 border-2 border-slate-100 rounded-lg shrink-0">
                           <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://vcard.link" alt="QR" className="w-full h-full" />
                        </div>
                        <div>
                           <h4 className="text-sm font-bold text-slate-900 mb-1">Digital Business Card</h4>
                           <p className="text-[10px] text-slate-500 leading-relaxed mb-2">Scan to instantly save all contact details and operational links to your device.</p>
                        </div>
                     </div>

                     {/* Socials */}
                     <div className="flex gap-3 mb-8">
                        {[
                           { val: data.linkedin, icon: FaLinkedinIn, link: `https://linkedin.com/in/${data.linkedin}` },
                           { val: data.twitter, icon: FaTwitter, link: `https://twitter.com/${data.twitter}` }
                        ].map((social, i) => social.val && (
                           <a
                              key={i} href={social.link || null} target="_blank" rel="noopener noreferrer"
                              className="w-12 h-12 bg-white border border-slate-300 rounded-xl flex items-center justify-center text-slate-600 hover:bg-[#0F172A] hover:text-white hover:border-[#0F172A] transition-all shadow-[2px_2px_0_0_#cbd5e1] hover:shadow-[4px_4px_0_0_#06B6D4] hover:-translate-y-1"
                           >
                              <social.icon size={18} />
                           </a>
                        ))}
                     </div>

                  </TimelineSection>
               </motion.div>

            </div>

            {/* ================= BOTTOM SAVE CONTACT CTA ================= */}
            <div className="px-6 pb-10">
               <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => downloadVCard(vCardData)}
                  className="w-full bg-[#0F172A] text-white py-5 rounded-xl font-bold text-sm uppercase tracking-widest shadow-[4px_4px_0_0_#06B6D4] hover:bg-slate-800 transition-colors flex items-center justify-center gap-3 active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0_0_#06B6D4]"
               >
                  <FiDownloadCloud size={20} className="text-cyan-400" />
                  Save Contact Details
               </motion.button>
            </div>

            {/* ================= FOOTER ================= */}
            <div className="w-full py-6 text-center border-t border-slate-200 bg-slate-50">
               <PoweredBy />
            </div>

         </div>

         {/* Styles */}
         <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      </div>
   );
};

export default ClassicExecutive;