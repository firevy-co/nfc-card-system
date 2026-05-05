import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FiPhone, FiMail, FiGlobe, FiMapPin, FiInstagram, FiTwitter,
   FiUserPlus, FiChevronDown, FiStar, FiScissors, FiEye,
   FiCamera, FiClock, FiCalendar, FiMessageCircle, FiHeart
} from 'react-icons/fi';
import { FaTiktok, FaWhatsapp, FaPinterest } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Glamour Sub-components ---

const GlamCard = ({ children, className = "" }) => (
   <div className={`bg-[#121212] border border-[#2A2A2A] rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)] ${className}`}>
      {children}
   </div>
);

const SectionTitle = ({ title, subtitle, icon: Icon }) => (
   <div className="mb-6 flex flex-col items-center text-center">
      {Icon && <Icon size={24} className="text-[#FF007F] mb-3 drop-shadow-[0_0_8px_rgba(255,0,127,0.5)]" />}
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-1">{title}</span>
      <h2 className="text-2xl font-bold text-white tracking-wide font-serif italic">{subtitle}</h2>
   </div>
);

const PolicyAccordion = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border-b border-[#2A2A2A] last:border-0">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full py-4 flex justify-between items-center text-left focus:outline-none group"
         >
            <span className="font-bold text-sm text-gray-200 group-hover:text-[#FF007F] transition-colors pr-4">{question}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
               <FiChevronDown size={18} className="text-[#FF007F]" />
            </motion.div>
         </button>
         <AnimatePresence>
            {isOpen && (
               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <p className="pb-4 text-gray-500 text-sm leading-relaxed">
                     {answer}
                  </p>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

// --- Main Component ---

const GlowStudio = ({ userData }) => {
   // Completely Fictional Persona: Celeb Makeup & Lash Artist
   const fictionalData = {
      displayName: "Roxy Fox",
      role: "Celebrity MUA & Lash Expert",
      phone: "+1 (212) 555-GLAM",
      email: "roxy@thefoxholebeauty.com",
      website: "www.thefoxholebeauty.com",
      address: "SoHo Arts District, New York, NY",
      businessName: "The Foxhole Beauty Bar",
      twitter: "roxyfox_mua",
      instagram: "roxyfox.glam",
      tiktok: "foxhole.beauty",
      pinterest: "roxyfoxglam",
      whatsapp: "12125550000",
      bio: "Unapologetic glamour for the modern muse. Specializing in editorial makeup, custom lash architecture, and red-carpet readiness. We don't just do makeup; we create icons.",
      profileImage: "https://mooddp.com/wp-content/uploads/2025/11/candid-girl-dp.jpg",
      bannerImage: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=1200&h=600&fit=crop",
      stats: [
         { label: "VIP Clients", val: "500+" },
         { label: "5-Star Ratings", val: "1.2k" },
         { label: "Years Exp", val: "8" }
      ],
      services: [
         { title: "Volume Lash Extensions", desc: "Dramatic, custom-mapped mega volume sets.", price: "$180", time: "2 Hrs", icon: FiEye },
         { title: "Editorial Makeup", desc: "Full glam including skin prep and premium lashes.", price: "$250", time: "90 Min", icon: FiCamera },
         { title: "Brow Lamination", desc: "Fluffy, lifted, and perfectly set brows.", price: "$90", time: "45 Min", icon: FiScissors }
      ],
      gallery: [
         { title: "Editorial Shoot", img: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=600&h=600&fit=crop" },
         { title: "Bridal Glam", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=600&fit=crop" },
         { title: "Lash Mapping", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlZJ6guiZemywWdej3xwfcp57H5AjD4LNSYA&s" },
         { title: "Studio Space", img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&h=600&fit=crop" }
      ],
      testimonials: [
         { name: "Chloe V.", role: "Fashion Model", text: "Roxy is the only person I trust with my face before a shoot. Her lash retention is insane, and her makeup lasts through 12-hour set days." },
         { name: "Jessica M.", role: "Bride", text: "The Foxhole team made me feel like absolute royalty on my wedding day. The studio vibe is immaculate and edgy." }
      ],
      hours: [
         { day: "Tuesday - Friday", hours: "11:00 AM - 08:00 PM" },
         { day: "Saturday", hours: "09:00 AM - 05:00 PM" },
         { day: "Sun & Mon", hours: "Closed / On-Set" }
      ],
      faqs: [
         { question: "What is your late/cancellation policy?", answer: "We require 48 hours notice for cancellations. Cancellations within 48 hours forfeit the booking deposit. A 15-minute grace period is allowed; after that, the appointment is canceled." },
         { question: "Do I need to pay a deposit?", answer: "Yes, a 50% non-refundable retainer is required to secure all appointments. This goes toward your final total." },
         { question: "How should I prep for a lash appointment?", answer: "Please arrive with clean, makeup-free eyes. Avoid caffeine 2 hours prior to prevent eye twitching during application." }
      ]
   };

   // Merge for the button function, but display only fictional data
   const vCardData = { ...userData, ...fictionalData };

   const fadeUp = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
   };

   return (
      <div className="w-full min-h-screen bg-[#050505] text-gray-300 font-['Outfit',sans-serif] selection:bg-[#FF007F] selection:text-white flex justify-center pb-12">

         {/* Container */}
         <div className="w-full max-w-[480px] bg-[#0A0A0C] relative shadow-[0_0_50px_rgba(0,0,0,0.8)] min-h-screen border-x border-[#1A1A1A]">

            {/* ================= HEADER BANNER ================= */}
            <div className="w-full h-[300px] relative rounded-b-[3rem] overflow-hidden border-b border-[#2A2A2A]">
               <img src={fictionalData.bannerImage} alt="Glam Studio" className="w-full h-full object-cover opacity-50 mix-blend-luminosity" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/60 to-transparent" />
            </div>

            {/* ================= PROFILE IDENTITY ================= */}
            <div className="px-6 relative -mt-24 z-10 text-center">
               {/* Arched Profile Image */}
               <motion.div
                  initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}
                  className="w-32 h-40 mx-auto p-1 bg-gradient-to-b from-[#FF007F] to-[#4A00E0] shadow-[0_0_30px_rgba(255,0,127,0.3)] mb-5"
                  style={{ borderRadius: '100px 100px 20px 20px' }}
               >
                  <img src={fictionalData.profileImage} alt={fictionalData.displayName} className="w-full h-full object-cover grayscale contrast-125" style={{ borderRadius: '96px 96px 16px 16px' }} />
               </motion.div>

               <h1 className="text-3xl font-black text-white tracking-tighter mb-1 font-serif italic">
                  {fictionalData.displayName}
               </h1>
               <p className="text-[#FF007F] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                  {fictionalData.role}
               </p>

               {fictionalData.businessName && (
                  <div className="inline-block bg-[#121212] border border-[#2A2A2A] text-gray-300 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm">
                     {fictionalData.businessName}
                  </div>
               )}

               <p className="text-gray-400 text-sm leading-relaxed px-2 font-medium">
                  {fictionalData.bio}
               </p>
            </div>

            <div className="px-6 mt-8 space-y-6">

               {/* ================= STATS WIDGET ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-3 gap-3">
                  {fictionalData.stats.map((stat, i) => (
                     <div key={i} className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-4 text-center">
                        <span className="block text-xl font-black text-white mb-1 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">{stat.val}</span>
                        <span className="block text-[8px] uppercase tracking-widest text-[#FF007F] font-bold">{stat.label}</span>
                     </div>
                  ))}
               </motion.div>

               {/* ================= DIRECT COMMS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-2 gap-3">
                  {fictionalData.phone && (
                     <a href={`tel:${fictionalData.phone}`} className="bg-[#121212] border border-[#2A2A2A] p-4 rounded-2xl flex flex-col items-center gap-2 hover:border-[#FF007F] hover:bg-[#1A1A1A] transition-all group">
                        <FiPhone size={22} className="text-gray-400 group-hover:text-[#FF007F] transition-colors" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Call Studio</span>
                     </a>
                  )}
                  {fictionalData.email && (
                     <a href={`mailto:${fictionalData.email}`} className="bg-[#121212] border border-[#2A2A2A] p-4 rounded-2xl flex flex-col items-center gap-2 hover:border-[#FF007F] hover:bg-[#1A1A1A] transition-all group">
                        <FiMail size={22} className="text-gray-400 group-hover:text-[#FF007F] transition-colors" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Email Us</span>
                     </a>
                  )}
                  {fictionalData.website && (
                     <a href={`https://${fictionalData.website}`} target="_blank" rel="noopener noreferrer" className="col-span-2 bg-gradient-to-r from-[#FF007F] to-[#4A00E0] p-[1px] rounded-2xl hover:scale-[1.02] transition-transform">
                        <div className="bg-[#121212] rounded-[15px] p-4 flex justify-between items-center w-full">
                           <span className="text-xs font-bold uppercase tracking-widest text-white">Book Appointment</span>
                           <FiCalendar size={18} className="text-[#FF007F]" />
                        </div>
                     </a>
                  )}
               </motion.div>

               {/* ================= SERVICES ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <GlamCard>
                     <SectionTitle title="The Menu" subtitle="Signature Services" icon={FiHeart} />
                     <div className="space-y-4">
                        {fictionalData.services.map((svc, i) => (
                           <div key={i} className="flex gap-4 p-4 rounded-2xl bg-[#0A0A0C] border border-[#2A2A2A] hover:border-[#FF007F]/50 transition-colors">
                              <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#FF007F] shrink-0 border border-[#2A2A2A]">
                                 <svc.icon size={20} />
                              </div>
                              <div className="flex-1">
                                 <h4 className="text-sm font-bold text-white mb-1">{svc.title}</h4>
                                 <p className="text-[11px] text-gray-500 font-medium mb-2">{svc.desc}</p>
                                 <div className="flex items-center gap-3">
                                    <span className="text-xs font-black text-[#FF007F]">{svc.price}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                                    <span className="text-[10px] uppercase font-bold text-gray-500">{svc.time}</span>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </GlamCard>
               </motion.div>

               {/* ================= THE GLAM GALLERY ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <GlamCard>
                     <SectionTitle title="Portfolio" subtitle="The Glam Gallery" icon={FiCamera} />
                     {/* Masonry-style Grid Fixed */}
                     <div className="columns-2 gap-3">
                        {fictionalData.gallery.map((img, idx) => (
                           <div key={idx} className={`relative rounded-2xl overflow-hidden group mb-3 break-inside-avoid ${idx % 3 === 0 ? 'aspect-[4/5]' : 'aspect-square'}`}>
                              <img src={img.img} alt={img.title} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-3 flex flex-col justify-end">
                                 <h4 className="text-white font-bold text-[10px] uppercase tracking-widest">{img.title}</h4>
                              </div>
                           </div>
                        ))}
                     </div>
                  </GlamCard>
               </motion.div>

               {/* ================= CLIENT REVIEWS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <GlamCard>
                     <SectionTitle title="Client Love" subtitle="Vouches" icon={FiStar} />
                     <div className="space-y-4">
                        {fictionalData.testimonials.map((test, i) => (
                           <div key={i} className="bg-[#0A0A0C] p-5 rounded-2xl border border-[#2A2A2A] relative">
                              <FiMessageCircle className="absolute top-4 right-4 text-[#FF007F]/20" size={32} />
                              <p className="text-sm text-gray-400 italic mb-4 leading-relaxed relative z-10">"{test.text}"</p>
                              <div className="flex items-center gap-3 border-t border-[#2A2A2A] pt-3 relative z-10">
                                 <span className="font-bold text-white text-xs uppercase tracking-wider">{test.name}</span>
                                 <span className="text-[9px] uppercase tracking-widest text-[#FF007F] font-bold bg-[#FF007F]/10 px-2 py-0.5 rounded-full">{test.role}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </GlamCard>
               </motion.div>

               {/* ================= STUDIO POLICIES (FAQ) ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <GlamCard>
                     <SectionTitle title="The Rules" subtitle="Studio Policies" icon={FiHeart} />
                     <div className="bg-[#0A0A0C] rounded-2xl border border-[#2A2A2A] overflow-hidden">
                        {fictionalData.faqs.map((faq, index) => <PolicyAccordion key={index} question={faq.question} answer={faq.answer} />)}
                     </div>
                  </GlamCard>
               </motion.div>

               {/* ================= LOCATION & HOURS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid gap-4">
                  {fictionalData.address && (
                     <a href={`https://maps.google.com/?q=${encodeURIComponent(fictionalData.address)}`} target="_blank" rel="noopener noreferrer" className="bg-[#121212] p-5 rounded-3xl border border-[#2A2A2A] flex items-center gap-4 hover:border-[#FF007F] transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#FF007F] shrink-0 group-hover:scale-110 transition-transform">
                           <FiMapPin size={20} />
                        </div>
                        <div>
                           <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1">Studio Location</p>
                           <p className="text-sm font-bold text-white leading-snug">{fictionalData.address}</p>
                        </div>
                     </a>
                  )}

                  <div className="bg-[#121212] p-6 rounded-3xl border border-[#2A2A2A]">
                     <div className="flex items-center gap-2 mb-4 border-b border-[#2A2A2A] pb-3">
                        <FiClock size={16} className="text-[#FF007F]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Operating Hours</span>
                     </div>
                     <div className="space-y-3">
                        {fictionalData.hours.map((bh, i) => (
                           <div key={i} className="flex justify-between items-center text-xs">
                              <span className="text-gray-500 font-bold uppercase tracking-wider">{bh.day}</span>
                              <span className="font-medium text-gray-200">{bh.hours}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </motion.div>

               {/* ================= SOCIALS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <div className="flex flex-wrap justify-center gap-3">
                     {[
                        { val: fictionalData.instagram, icon: FiInstagram, link: `https://instagram.com/${fictionalData.instagram}` },
                        { val: fictionalData.tiktok, icon: FaTiktok, link: `https://tiktok.com/@${fictionalData.tiktok}` },
                        { val: fictionalData.pinterest, icon: FaPinterest, link: `https://pinterest.com/${fictionalData.pinterest}` },
                        { val: fictionalData.twitter, icon: FiTwitter, link: `https://twitter.com/${fictionalData.twitter}` },
                        { val: fictionalData.whatsapp, icon: FaWhatsapp, link: `https://wa.me/${fictionalData.whatsapp}` }
                     ].map((social, i) => social.val && (
                        <a
                           key={i} href={social.link} target="_blank" rel="noopener noreferrer"
                           className="w-14 h-14 bg-[#121212] border border-[#2A2A2A] rounded-full flex items-center justify-center text-gray-400 hover:bg-[#FF007F] hover:border-[#FF007F] hover:text-white transition-all shadow-lg hover:-translate-y-1"
                        >
                           <social.icon size={22} />
                        </a>
                     ))}
                  </div>
               </motion.div>

               {/* ================= SAVE CONTACT CTA (INLINE) ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-8 mb-4">
                  <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={() => downloadVCard(vCardData)}
                     className="w-full bg-gradient-to-r from-[#FF007F] to-[#4A00E0] text-white rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(255,0,127,0.4)] transition-all flex items-center justify-center gap-3 h-14"
                  >
                     <FiUserPlus size={20} />
                     Save Contact
                  </motion.button>
               </motion.div>

            </div>

            {/* ================= FOOTER ================= */}
            <div className="pb-8 pt-4 text-center border-t border-[#1A1A1A] mt-6">
               <PoweredBy />
            </div>

         </div>

         <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800;900&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
      `}} />
      </div>
   );
};

export default GlowStudio;