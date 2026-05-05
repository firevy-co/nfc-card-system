import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FiPhone, FiMail, FiGlobe, FiMapPin, FiBriefcase,
   FiLayers, FiMonitor, FiCamera, FiClock, FiMessageSquare,
   FiChevronDown, FiDownload, FiSend, FiUser, FiStar
} from 'react-icons/fi';
import { FaLinkedinIn, FaTwitter, FaInstagram, FaWhatsapp, FaQuoteLeft } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Modern Agency Sub-components ---

const SectionWrapper = ({ title, subtitle, children, delay = 0 }) => (
   <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="w-full bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-6 sm:p-8 mb-6 border border-gray-100"
   >
      {(title || subtitle) && (
         <div className="text-center mb-8">
            {subtitle && <h4 className="text-indigo-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-2">{subtitle}</h4>}
            {title && <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">{title}</h2>}
            <div className="w-12 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mt-4" />
         </div>
      )}
      {children}
   </motion.div>
);

const AgencyAccordion = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border border-gray-100 rounded-2xl mb-3 overflow-hidden bg-gray-50/50 hover:bg-gray-50 transition-colors">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-4 flex justify-between items-center text-left focus:outline-none"
         >
            <span className="font-bold text-sm text-gray-800 pr-4">{question}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
               <FiChevronDown size={16} className="text-indigo-600" />
            </motion.div>
         </button>
         <AnimatePresence>
            {isOpen && (
               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <div className="px-4 pb-4 pt-1">
                     <p className="text-gray-600 text-sm leading-relaxed font-medium">
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

const ArchConstruction = ({ userData }) => {
   // Extract user avatar, but override name/role to "Admin"
   const { avatar, logo } = userData || {};

   // Maximum Fictional Content for a Digital Agency / Business VCard
   const fictionalData = {
      displayName: "Admin",
      role: "Admin",
      phone: "+1 (555) 123-4567",
      email: "admin@nexus-digital.agency",
      website: "www.nexus-digital.agency",
      address: "1200 Innovation Drive, Silicon Valley, CA",
      businessName: "Nexus Digital Agency",
      whatsapp: "15551234567",
      linkedin: "nexus-admin",
      twitter: "nexus_agency",
      instagram: "nexus.digital",
      bio: "We are a full-service digital agency specializing in high-performance web applications, brand identity, and scalable enterprise systems. We transform complex problems into elegant digital experiences.",
      bannerImage: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=600&fit=crop",
      defaultAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      services: [
         { title: "UI/UX Design", desc: "User-centric interfaces engineered for conversion and engagement.", icon: FiMonitor },
         { title: "Enterprise Systems", desc: "Scalable backend architectures and cloud integrations.", icon: FiLayers },
         { title: "Brand Strategy", desc: "Comprehensive visual identity and market positioning.", icon: FiBriefcase }
      ],
      portfolio: [
         { title: "Fintech Dashboard", category: "Web App", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=600&fit=crop" },
         { title: "Eco-Brand Identity", category: "Branding", img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=600&fit=crop" },
         { title: "SaaS Mobile App", category: "Mobile UI", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=600&fit=crop" },
         { title: "Corporate Portal", category: "Development", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=600&fit=crop" }
      ],
      testimonials: [
         { name: "Sarah Collins", role: "CEO, TechFlow", text: "Nexus completely overhauled our platform. Their attention to detail and engineering speed is unmatched in the industry." },
         { name: "David Chen", role: "Founder, Zenith", text: "Working with the Admin team was seamless. They delivered a world-class product that immediately increased our user retention." }
      ],
      hours: [
         { day: "Monday - Friday", hours: "09:00 AM - 06:00 PM" },
         { day: "Saturday", hours: "10:00 AM - 02:00 PM" },
         { day: "Sunday", hours: "Closed" }
      ],
      faqs: [
         { question: "What is your typical project timeline?", answer: "Most standard web applications take 8-12 weeks from discovery to deployment. Enterprise systems may require 4-6 months." },
         { question: "Do you offer post-launch support?", answer: "Yes, we offer comprehensive SLA packages that include 24/7 monitoring, security patches, and feature updates." },
         { question: "How do we start a new project?", answer: "Simply fill out the contact form below or reach out via email. We will schedule a 30-minute discovery call to align on your vision." }
      ]
   };

   const vCardData = { ...userData, ...fictionalData };

   const fadeUp = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
   };

   return (
      <div className="w-full min-h-screen bg-[#F3F4F6] text-gray-800 font-['Inter',sans-serif] selection:bg-indigo-500 selection:text-white flex justify-center pb-12 overflow-x-hidden md:py-8">

         {/* Main App Container */}
         <div className="w-full max-w-[480px] relative z-10 bg-[#FAFAFA] shadow-[0_0_50px_rgba(0,0,0,0.1)] min-h-screen md:rounded-[3rem] border border-gray-200 flex flex-col overflow-hidden">

            {/* ================= HERO HEADER (Smooth Arc) ================= */}
            <div className="relative w-full h-[260px] bg-indigo-900">
               <img src={fictionalData.bannerImage} alt="Cover" className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/90" />

               {/* Perfectly smooth, symmetrical SVG Arc */}
               <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none translate-y-[1px]">
                  <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[50px] text-[#FAFAFA]">
                     <path d="M0,0 C480,150 960,150 1440,0 L1440,120 L0,120 Z" fill="currentColor"></path>
                  </svg>
               </div>
            </div>

            {/* ================= PROFILE OVERLAP (Fixed Background) ================= */}
            <div className="px-6 relative z-20 -mt-20 mb-8 flex flex-col items-center text-center">
               <motion.div
                  initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
                  className="w-32 h-32 bg-[#FAFAFA] rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] mb-4 relative flex items-center justify-center z-30"
               >
                  {/* Pure white inner circle for seamless logo integration */}
                  <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-white flex items-center justify-center shadow-inner">
                     {avatar ? (
                        <img src={avatar} alt="Admin Profile" className="w-full h-full object-cover" />
                     ) : logo ? (
                        <img src={logo} alt="System Logo" className="w-full h-full object-contain p-4" />
                     ) : (
                        <img src={fictionalData.defaultAvatar} alt="Default Admin" className="w-full h-full object-cover" />
                     )}
                  </div>
                  {/* Verification Badge */}
                  <div className="absolute bottom-1 right-1 w-8 h-8 bg-indigo-600 rounded-full border-[3px] border-[#FAFAFA] flex items-center justify-center shadow-sm z-40">
                     <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
               </motion.div>

               <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-1">{fictionalData.displayName}</h1>
                  <p className="text-indigo-600 font-bold text-xs uppercase tracking-[0.2em] mb-3">{fictionalData.role}</p>
                  {fictionalData.businessName && (
                     <div className="inline-block bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm border border-indigo-100 mb-5">
                        {fictionalData.businessName}
                     </div>
                  )}
               </motion.div>

               {/* Floating Quick Actions */}
               <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="w-full flex justify-center gap-4 mt-2">
                  {[
                     { icon: FiPhone, link: `tel:${fictionalData.phone}`, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
                     { icon: FaWhatsapp, link: `https://wa.me/${fictionalData.whatsapp}`, color: "bg-green-50 text-green-600 border-green-100" },
                     { icon: FiMail, link: `mailto:${fictionalData.email}`, color: "bg-blue-50 text-blue-600 border-blue-100" },
                     { icon: FiMapPin, link: `https://maps.google.com/?q=${fictionalData.address}`, color: "bg-rose-50 text-rose-600 border-rose-100" }
                  ].map((action, i) => action.link && (
                     <a key={i} href={action.link} target="_blank" rel="noopener noreferrer" className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm hover:-translate-y-1 transition-transform ${action.color}`}>
                        <action.icon size={20} />
                     </a>
                  ))}
               </motion.div>
            </div>

            <div className="px-5 pb-8">

               {/* ================= ABOUT US ================= */}
               <SectionWrapper title="About Us" subtitle="Who We Are" delay={0.1}>
                  <p className="text-gray-600 text-sm leading-relaxed text-center font-medium">
                     {fictionalData.bio}
                  </p>
               </SectionWrapper>

               {/* ================= CONTACT DIRECTORY ================= */}
               <SectionWrapper title="Contact Details" subtitle="Reach Out" delay={0.2}>
                  <div className="space-y-3">
                     {[
                        { icon: FiPhone, title: "Phone Number", val: fictionalData.phone, link: `tel:${fictionalData.phone}` },
                        { icon: FiMail, title: "Email Address", val: fictionalData.email, link: `mailto:${fictionalData.email}` },
                        { icon: FiGlobe, title: "Website", val: fictionalData.website, link: `https://${fictionalData.website}` },
                        { icon: FiMapPin, title: "Office Location", val: fictionalData.address, link: `https://maps.google.com/?q=${fictionalData.address}` }
                     ].map((item, idx) => item.val && (
                        <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-indigo-50 hover:border-indigo-100 transition-colors group">
                           <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-indigo-500 shrink-0">
                              <item.icon size={18} />
                           </div>
                           <div className="overflow-hidden">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">{item.title}</p>
                              <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-700 transition-colors">{item.val}</p>
                           </div>
                        </a>
                     ))}
                  </div>
               </SectionWrapper>

               {/* ================= OUR SERVICES ================= */}
               <SectionWrapper title="Our Services" subtitle="What We Do" delay={0.3}>
                  <div className="space-y-4">
                     {fictionalData.services.map((svc, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4 group">
                           <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                              <svc.icon size={22} />
                           </div>
                           <div>
                              <h4 className="text-base font-bold text-gray-900 mb-1">{svc.title}</h4>
                              <p className="text-xs text-gray-500 leading-relaxed">{svc.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </SectionWrapper>

               {/* ================= PORTFOLIO / GALLERY ================= */}
               <SectionWrapper title="Portfolio" subtitle="Recent Work" delay={0.4}>
                  <div className="grid grid-cols-2 gap-3">
                     {fictionalData.portfolio.map((item, idx) => (
                        <div key={idx} className="group cursor-pointer">
                           <div className="w-full aspect-square rounded-2xl overflow-hidden mb-2 relative shadow-sm border border-gray-100">
                              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                 <FiCamera className="text-white" size={24} />
                              </div>
                           </div>
                           <h4 className="text-xs font-bold text-gray-900 truncate">{item.title}</h4>
                           <p className="text-[9px] font-bold uppercase tracking-widest text-indigo-500">{item.category}</p>
                        </div>
                     ))}
                  </div>
               </SectionWrapper>

               {/* ================= TESTIMONIALS ================= */}
               <SectionWrapper title="Testimonials" subtitle="Client Reviews" delay={0.5}>
                  <div className="flex overflow-x-auto gap-4 snap-x hide-scrollbar pb-2 -mx-2 px-2">
                     {fictionalData.testimonials.map((test, i) => (
                        <div key={i} className="min-w-[280px] bg-gray-50 border border-gray-100 p-6 rounded-2xl snap-center relative">
                           <FaQuoteLeft className="text-indigo-100 absolute top-6 right-6" size={40} />
                           <div className="flex gap-1 text-amber-400 mb-3 relative z-10">
                              <FiStar fill="currentColor" size={14} /><FiStar fill="currentColor" size={14} /><FiStar fill="currentColor" size={14} /><FiStar fill="currentColor" size={14} /><FiStar fill="currentColor" size={14} />
                           </div>
                           <p className="text-sm text-gray-700 italic leading-relaxed mb-5 relative z-10 font-medium">"{test.text}"</p>
                           <div className="flex items-center gap-3 relative z-10">
                              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                                 {test.name.charAt(0)}
                              </div>
                              <div>
                                 <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">{test.name}</h4>
                                 <p className="text-[10px] text-gray-500 font-semibold">{test.role}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </SectionWrapper>

               {/* ================= BUSINESS HOURS ================= */}
               <SectionWrapper title="Business Hours" subtitle="Availability" delay={0.6}>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-2">
                     {fictionalData.hours.map((bh, i) => (
                        <div key={i} className="flex justify-between items-center p-3 border-b border-gray-200 last:border-0">
                           <div className="flex items-center gap-2">
                              <FiClock className="text-indigo-500" size={16} />
                              <span className="text-sm font-semibold text-gray-700">{bh.day}</span>
                           </div>
                           <span className="text-xs font-bold text-gray-900 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">{bh.hours}</span>
                        </div>
                     ))}
                  </div>
               </SectionWrapper>

               {/* ================= FAQ ================= */}
               <SectionWrapper title="FAQ" subtitle="Common Questions" delay={0.7}>
                  <div className="space-y-0">
                     {fictionalData.faqs.map((faq, index) => <AgencyAccordion key={index} question={faq.question} answer={faq.answer} />)}
                  </div>
               </SectionWrapper>

               {/* ================= QR CODE ================= */}
               <SectionWrapper title="QR Code" subtitle="Scan & Save" delay={0.8}>
                  <div className="flex flex-col items-center">
                     <div className="w-48 h-48 bg-white p-3 rounded-3xl shadow-lg border border-gray-100 mb-4">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://vcard.link" alt="QR Code" className="w-full h-full rounded-2xl" />
                     </div>
                     <p className="text-xs text-gray-500 font-medium">Scan with your smartphone camera</p>
                  </div>
               </SectionWrapper>

               {/* ================= CONTACT FORM ================= */}
               <SectionWrapper title="Contact Us" subtitle="Get In Touch" delay={0.9}>
                  <div className="space-y-4">
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                           <FiUser className="text-gray-400" size={18} />
                        </div>
                        <input type="text" placeholder="Full Name" className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium" />
                     </div>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                           <FiMail className="text-gray-400" size={18} />
                        </div>
                        <input type="email" placeholder="Email Address" className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium" />
                     </div>
                     <div className="relative">
                        <div className="absolute top-3.5 left-0 pl-4 pointer-events-none">
                           <FiMessageSquare className="text-gray-400" size={18} />
                        </div>
                        <textarea placeholder="Your Message..." rows="4" className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium resize-none"></textarea>
                     </div>
                     <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-indigo-600 transition-colors shadow-lg hover:shadow-indigo-500/30">
                        <FiSend size={18} /> Send Message
                     </button>
                  </div>
               </SectionWrapper>

               {/* ================= SOCIAL LINKS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="py-2 mb-6">
                  <div className="flex justify-center gap-4">
                     {[
                        { val: fictionalData.linkedin, icon: FaLinkedinIn, link: `https://linkedin.com/in/${fictionalData.linkedin}` },
                        { val: fictionalData.twitter, icon: FaTwitter, link: `https://twitter.com/${fictionalData.twitter}` },
                        { val: fictionalData.instagram, icon: FaInstagram, link: `https://instagram.com/${fictionalData.instagram}` }
                     ].map((social, i) => social.val && (
                        <a
                           key={i} href={social.link} target="_blank" rel="noopener noreferrer"
                           className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all rounded-full shadow-sm hover:shadow-lg hover:-translate-y-1"
                        >
                           <social.icon size={18} />
                        </a>
                     ))}
                  </div>
               </motion.div>

               {/* ================= STORE IDENTITY BUTTON (REQUESTED EXACT MATCH) ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="pt-2">
                  <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={() => downloadVCard(vCardData)}
                     className="w-full bg-[#f4f4f5] text-black py-4 px-6 rounded-full font-bold text-sm tracking-[0.15em] uppercase shadow-sm flex items-center justify-center gap-3 transition-transform border border-gray-200"
                  >
                     <FiDownload size={20} className="text-[#d946ef]" strokeWidth={2.5} />
                     STORE IDENTITY
                  </motion.button>
               </motion.div>

            </div>

            {/* ================= FOOTER ================= */}
            <div className="w-full py-6 text-center border-t border-gray-100 bg-white mt-auto relative z-20">
               <PoweredBy />
            </div>

         </div>

         <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      </div>
   );
};

export default ArchConstruction;