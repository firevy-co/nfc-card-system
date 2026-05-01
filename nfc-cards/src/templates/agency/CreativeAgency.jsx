import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FiMonitor, FiCamera, FiGlobe, FiMail, FiPhone, FiMapPin,
   FiInstagram, FiLinkedin, FiTwitter, FiGithub, FiUserPlus,
   FiArrowRight, FiClock, FiStar, FiChevronDown, FiBriefcase,
   FiHome, FiImage, FiLayout, FiCode, FiCpu
} from 'react-icons/fi';
import { FaWhatsapp, FaYoutube, FaFacebook, FaTelegram } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Sub-components for Clean Code ---

const SectionHeader = ({ title, subtitle }) => (
   <div className="mb-6">
      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{title}</h3>
      <h2 className="text-2xl font-black text-gray-900 tracking-tight">{subtitle}</h2>
   </div>
);

const FaqAccordion = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border border-gray-100 mb-3 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-5 flex justify-between items-center text-left focus:outline-none"
         >
            <span className="font-bold text-sm text-gray-800 pr-4">{question}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
               <FiChevronDown size={20} className="text-gray-400" />
            </motion.div>
         </button>
         <AnimatePresence>
            {isOpen && (
               <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-gray-50/50"
               >
                  <p className="p-5 pt-0 text-gray-500 text-sm leading-relaxed border-t border-gray-100 mt-2">
                     {answer}
                  </p>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

// --- Main Component ---

const CreativeAgency = ({ userData }) => {
   // Extensive fallback data showcasing a full-featured profile
   const {
      displayName = "Studio Identity",
      email = "hello@studio.com",
      role = "Full-Stack Developer",
      phone,
      mobileNumber = "+1 (555) 123-4567",
      website = "www.studio-identity.com",
      address = "Tech District, Innovation Hub",
      businessName = "Digital Commerce Solutions",
      instagram, linkedin, twitter, github = "developer", youtube, whatsapp = "15551234567", facebook, telegram,
      bio = "Specializing in high-end e-commerce architectures, seamless React interfaces, and intelligent web applications.",
      profileImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bannerImage = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=400&fit=crop",
      services = [
         { title: "E-Commerce Systems", desc: "Custom Shopify & catalog-mode platforms for luxury retail.", icon: FiLayout, color: "bg-blue-50 text-blue-600" },
         { title: "React Applications", desc: "Dynamic, state-driven interfaces with Framer Motion.", icon: FiCode, color: "bg-purple-50 text-purple-600" },
         { title: "AI Integrations", desc: "Implementing intelligent background removal and image processing.", icon: FiCpu, color: "bg-emerald-50 text-emerald-600" }
      ],
      portfolio = [
         { title: "Mahadev Furniture", category: "E-Commerce", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop" },
         { title: "PDJ Jewellers", category: "Catalog Mode", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop" },
         { title: "Smart Media Tool", category: "React / AI API", img: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=600&h=600&fit=crop" }
      ],
      testimonials = [
         { name: "Ronak G.", role: "Tech Lead", text: "Exceptional architecture on the recent React and Firebase builds. The custom components were flawless." },
         { name: "Sarah J.", role: "Store Owner", text: "Transformed our jewelry catalog into a stunning digital experience." }
      ],
      businessHours = [
         { day: "Monday - Friday", hours: "09:00 AM - 06:00 PM" },
         { day: "Saturday", hours: "10:00 AM - 02:00 PM" },
         { day: "Sunday", hours: "Offline" }
      ],
      faqs = [
         { question: "Do you build custom Shopify Liquid sections?", answer: "Yes, fully custom sections built from scratch to match exact brand requirements without relying on bulky templates." },
         { question: "Can you handle Framer and React animations?", answer: "Absolutely. Smooth, high-performance animations are integrated standard into all modern web builds." }
      ]
   } = userData || {};

   const finalPhone = phone || mobileNumber;

   // Animation Variants
   const scrollReveal = {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
   };

   return (
      <div className="w-full h-screen overflow-y-auto overflow-x-hidden scroll-smooth bg-[#f8fafc] text-gray-900 font-['Inter',sans-serif] relative minimal-scrollbar">

         {/* Global Container */}
         <div className="w-full max-w-md mx-auto relative bg-white min-h-screen shadow-[0_0_40px_rgba(0,0,0,0.05)] pb-28">

            {/* ================= HERO SECTION ================= */}
            <section id="home" className="relative bg-white rounded-b-[2.5rem] shadow-sm z-20 pb-8">
               {/* Header Image */}
               <div className="w-full h-56 relative rounded-b-[2.5rem] overflow-hidden">
                  <img src={bannerImage} alt="Cover" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
               </div>

               {/* Profile Avatar Overlap */}
               <div className="px-8 relative -mt-16 text-center">
                  <motion.div
                     initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}
                     className="w-32 h-32 mx-auto rounded-[2rem] overflow-hidden border-4 border-white bg-white shadow-xl relative z-20 mb-5"
                  >
                     <img src={profileImage} alt={displayName} className="w-full h-full object-cover" />
                  </motion.div>

                  <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-1">{displayName}</h1>
                  <p className="text-blue-600 font-bold text-sm tracking-wide mb-3">{role}</p>

                  {businessName && (
                     <div className="inline-flex items-center justify-center bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
                        {businessName}
                     </div>
                  )}

                  <p className="text-gray-500 text-sm leading-relaxed mb-8 px-2">
                     {bio}
                  </p>

                  {/* Primary CTA */}
                  <motion.button
                     whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                     onClick={() => downloadVCard(userData)}
                     className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-sm shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_25px_rgba(0,0,0,0.15)] transition-all flex items-center justify-center gap-2"
                  >
                     <FiUserPlus size={18} />
                     Save to Contacts
                  </motion.button>
               </div>
            </section>

            {/* ================= QUICK CONTACT MATRIX ================= */}
            <motion.section id="contact" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={scrollReveal} className="p-8">
               <SectionHeader title="Reach Out" subtitle="Direct Contact" />
               <div className="space-y-3">
                  {finalPhone && (
                     <a href={`tel:${finalPhone}`} className="flex items-center p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
                        <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-colors mr-4">
                           <FiPhone size={20} />
                        </div>
                        <div>
                           <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Mobile</p>
                           <p className="text-sm font-bold text-gray-900">{finalPhone}</p>
                        </div>
                     </a>
                  )}
                  {email && (
                     <a href={`mailto:${email}`} className="flex items-center p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
                        <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-colors mr-4">
                           <FiMail size={20} />
                        </div>
                        <div className="overflow-hidden">
                           <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Email</p>
                           <p className="text-sm font-bold text-gray-900 truncate">{email}</p>
                        </div>
                     </a>
                  )}
                  {website && (
                     <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
                        <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-colors mr-4">
                           <FiGlobe size={20} />
                        </div>
                        <div className="overflow-hidden">
                           <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Website</p>
                           <p className="text-sm font-bold text-gray-900 truncate">{website.replace(/(^\w+:|^)\/\//, '')}</p>
                        </div>
                     </a>
                  )}
               </div>
            </motion.section>

            {/* ================= EXPERTISE / SERVICES ================= */}
            {services && services.length > 0 && (
               <motion.section id="services" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={scrollReveal} className="px-8 pb-8">
                  <SectionHeader title="Capabilities" subtitle="Expertise" />
                  <div className="grid grid-cols-1 gap-4">
                     {services.map((svc, i) => (
                        <div key={i} className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${svc.color}`}>
                              <svc.icon size={22} />
                           </div>
                           <h4 className="text-gray-900 font-bold text-lg mb-2">{svc.title}</h4>
                           <p className="text-gray-500 text-sm leading-relaxed">{svc.desc}</p>
                        </div>
                     ))}
                  </div>
               </motion.section>
            )}

            {/* ================= PORTFOLIO / GALLERY ================= */}
            {portfolio && portfolio.length > 0 && (
               <motion.section id="portfolio" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={scrollReveal} className="px-8 pb-8">
                  <SectionHeader title="Selected Work" subtitle="Portfolio" />
                  <div className="space-y-4">
                     {portfolio.map((item, index) => (
                        <motion.div key={index} whileHover={{ scale: 1.02 }} className="group relative rounded-3xl overflow-hidden shadow-sm cursor-pointer border border-gray-100">
                           <div className="aspect-video w-full">
                              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                           </div>
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 opacity-90">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1">{item.category}</p>
                              <h4 className="text-white font-bold text-lg">{item.title}</h4>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </motion.section>
            )}

            {/* ================= TESTIMONIALS ================= */}
            {testimonials && testimonials.length > 0 && (
               <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={scrollReveal} className="px-8 pb-8 overflow-hidden">
                  <SectionHeader title="Feedback" subtitle="Client Reviews" />
                  <div className="flex overflow-x-auto gap-4 pb-6 pt-2 snap-x minimal-scrollbar -mx-8 px-8">
                     {testimonials.map((test, i) => (
                        <div key={i} className="min-w-[300px] p-6 rounded-3xl bg-gray-50 border border-gray-100 snap-center relative">
                           <div className="absolute top-6 right-6 text-yellow-400 flex gap-1">
                              <FiStar size={14} className="fill-current" />
                           </div>
                           <p className="text-gray-600 text-sm italic leading-relaxed mb-6 mt-4">"{test.text}"</p>
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-sm">
                                 {test.name.charAt(0)}
                              </div>
                              <div>
                                 <p className="text-gray-900 text-sm font-bold">{test.name}</p>
                                 <p className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold">{test.role}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </motion.section>
            )}

            {/* ================= BUSINESS HOURS & LOCATION ================= */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={scrollReveal} className="px-8 pb-8 grid gap-6">
               {address && (
                  <div>
                     <SectionHeader title="Headquarters" subtitle="Location" />
                     <a href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="block p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                           <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                              <FiMapPin size={18} />
                           </div>
                           <p className="text-gray-700 text-sm font-medium leading-relaxed">{address}</p>
                        </div>
                     </a>
                  </div>
               )}

               {businessHours && businessHours.length > 0 && (
                  <div>
                     <SectionHeader title="Availability" subtitle="Business Hours" />
                     <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm">
                        {businessHours.map((bh, i) => (
                           <div key={i} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0 last:pb-0 first:pt-0">
                              <span className="text-gray-500 font-medium text-sm">{bh.day}</span>
                              <span className={`text-sm font-bold ${bh.hours === 'Offline' ? 'text-gray-400' : 'text-gray-900'}`}>{bh.hours}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               )}
            </motion.section>

            {/* ================= SOCIAL & FAQ ================= */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={scrollReveal} className="px-8 pb-8">
               <SectionHeader title="Network" subtitle="Social Media" />
               <div className="grid grid-cols-4 gap-3 mb-10">
                  {[
                     { id: 'whatsapp', val: whatsapp, icon: FaWhatsapp, color: 'hover:bg-[#25d366] hover:text-white text-[#25d366]' },
                     { id: 'instagram', val: instagram, icon: FiInstagram, color: 'hover:bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] hover:text-white text-[#e6683c]' },
                     { id: 'linkedin', val: linkedin, icon: FiLinkedin, color: 'hover:bg-[#0077b5] hover:text-white text-[#0077b5]' },
                     { id: 'github', val: github, icon: FiGithub, color: 'hover:bg-gray-900 hover:text-white text-gray-900' },
                     { id: 'twitter', val: twitter, icon: FiTwitter, color: 'hover:bg-[#1DA1F2] hover:text-white text-[#1DA1F2]' },
                     { id: 'facebook', val: facebook, icon: FaFacebook, color: 'hover:bg-[#1877f2] hover:text-white text-[#1877f2]' },
                     { id: 'youtube', val: youtube, icon: FaYoutube, color: 'hover:bg-[#ff0000] hover:text-white text-[#ff0000]' },
                     { id: 'telegram', val: telegram, icon: FaTelegram, color: 'hover:bg-[#0088cc] hover:text-white text-[#0088cc]' }
                  ].map((social, i) => social.val && (
                     <a
                        key={i}
                        href={social.id === 'whatsapp' ? `https://wa.me/${social.val.replace(/\D/g, '')}` : (social.val.startsWith('http') ? social.val : `https://${social.id}.com/${social.val}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`aspect-square rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center transition-all duration-300 group ${social.color}`}
                     >
                        <social.icon size={22} className="transition-transform group-hover:scale-110" />
                     </a>
                  ))}
               </div>

               {faqs && faqs.length > 0 && (
                  <div className="mb-8">
                     <SectionHeader title="Information" subtitle="FAQ" />
                     <div>
                        {faqs.map((faq, index) => <FaqAccordion key={index} question={faq.question} answer={faq.answer} />)}
                     </div>
                  </div>
               )}
            </motion.section>

            <div className="pb-10">
               <PoweredBy />
            </div>
         </div>

         {/* ================= FLOATING NAVIGATION ================= */}
         <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-full px-6 py-4 flex justify-between items-center shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
               <a href="#home" className="text-gray-400 hover:text-gray-900 transition-colors flex flex-col items-center gap-1 group">
                  <FiHome size={20} className="group-hover:-translate-y-1 transition-transform" />
               </a>
               <a href="#services" className="text-gray-400 hover:text-blue-600 transition-colors flex flex-col items-center gap-1 group">
                  <FiBriefcase size={20} className="group-hover:-translate-y-1 transition-transform" />
               </a>
               <a href="#portfolio" className="text-gray-400 hover:text-purple-600 transition-colors flex flex-col items-center gap-1 group">
                  <FiImage size={20} className="group-hover:-translate-y-1 transition-transform" />
               </a>
               <a href="#contact" className="text-gray-400 hover:text-emerald-600 transition-colors flex flex-col items-center gap-1 group">
                  <FiPhone size={20} className="group-hover:-translate-y-1 transition-transform" />
               </a>
            </div>
         </div>

         {/* CSS Injections for Scrollbars & Smooth Behavior */}
         <style dangerouslySetInnerHTML={{
            __html: `
        html { scroll-behavior: smooth; }
        .minimal-scrollbar::-webkit-scrollbar { height: 4px; width: 4px; }
        .minimal-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .minimal-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
        .minimal-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
      `}} />
      </div>
   );
};

export default CreativeAgency;