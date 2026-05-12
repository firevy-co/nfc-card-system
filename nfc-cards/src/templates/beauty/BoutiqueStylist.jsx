import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FiPhone, FiMail, FiGlobe, FiMapPin, FiInstagram, FiTwitter,
   FiUserPlus, FiChevronDown, FiStar, FiHeart, FiWind,
   FiSmile, FiCalendar, FiClock, FiShoppingBag, FiCamera
} from 'react-icons/fi';
import { FaPinterest, FaWhatsapp } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Apothecary Beauty Sub-components ---

const DelicateCard = ({ children, className = "" }) => (
   <div className={`bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_30px_rgba(230,190,175,0.15)] ${className}`}>
      {children}
   </div>
);

const SectionHeading = ({ title, subtitle }) => (
   <div className="mb-6 text-center">
      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C49B8D] block mb-1">{title}</span>
      <h2 className="text-2xl font-serif text-[#4A3B35] tracking-tight">{subtitle}</h2>
      <div className="w-10 h-px bg-[#E6BEAF] mx-auto mt-4" />
   </div>
);

const SkincareAccordion = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border-b border-[#E6BEAF]/50 last:border-0">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full py-4 flex justify-between items-center text-left focus:outline-none group"
         >
            <span className="font-semibold text-sm text-[#4A3B35] pr-4 group-hover:text-[#C49B8D] transition-colors">{question}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
               <FiChevronDown size={18} className="text-[#C49B8D]" />
            </motion.div>
         </button>
         <AnimatePresence>
            {isOpen && (
               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <p className="pb-4 text-[#7A6A63] text-sm leading-relaxed font-light">
                     {answer}
                  </p>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

// --- Main Component ---

const BoutiqueStylist = ({ userData }) => {
   // Completely Fictional Persona: Master Esthetician & Spa Owner
   const fictionalData = {
      displayName: "Amelie Roux",
      role: "Master Esthetician & Founder",
      phone: "+1 (310) 555-GLOW",
      email: "amelie@lumierespa.co",
      website: "www.lumierespa.co",
      address: "700 Rose Ave, West Hollywood, CA",
      businessName: "Lumière Skin Clinic",
      twitter: "lumiere_skin",
      instagram: "amelieroux.skin",
      pinterest: "lumierespa",
      whatsapp: "13105550000",
      bio: "Believing that true radiance begins beneath the surface. Specializing in holistic, non-invasive facial sculpting, botanical peels, and bespoke skincare regimens tailored to your skin's unique biome.",
      profileImage: "https://enjoyedp.com/wp-content/uploads/2025/09/sweet-cute-girl-pic-hd.jpg",
      bannerImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=600&fit=crop",
      stats: [
         { label: "Faces Glowing", val: "5k+" },
         { label: "Est. Since", val: "2018" },
         { label: "Organic Products", val: "100%" }
      ],
      services: [
         { title: "Sculpting Facial", desc: "Buccal massage and microcurrent lifting.", time: "90 Min", price: "$250", icon: FiSmile },
         { title: "Botanical Peel", desc: "Gentle resurfacing using fruit enzymes.", time: "60 Min", price: "$180", icon: FiWind },
         { title: "Gua Sha Therapy", desc: "Lymphatic drainage for facial tension.", time: "45 Min", price: "$120", icon: FiHeart }
      ],
      products: [
         { title: "Rosewater Mist", price: "$42", img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop" },
         { title: "Vitamin C Serum", price: "$85", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop" },
         { title: "Clay Detox Mask", price: "$55", img: "https://images.unsplash.com/photo-1615397323282-310385da418e?w=400&h=400&fit=crop" }
      ],
      gallery: [
         { title: "Treatment Room", img: "https://www.massagewarehouse.co.uk/cdn/shop/articles/massage_treatment_room_inspiration_design_ideas_2000x.jpg?v=1557495359" },
         { title: "Skin Analysis", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop" }
      ],
      testimonials: [
         { name: "Chloe M.", role: "Bride-to-be", text: "Amelie completely transformed my skin texture before my wedding. The buccal massage is literally magic. I've never looked so rested." },
         { name: "Sarah L.", role: "Regular Client", text: "The atmosphere at Lumière is so calming. Her custom product recommendations cleared my hormonal breakouts within weeks." }
      ],
      hours: [
         { day: "Tue - Fri", hours: "10:00 AM - 07:00 PM" },
         { day: "Saturday", hours: "09:00 AM - 04:00 PM" },
         { day: "Sun & Mon", hours: "Closed for Self Care" }
      ],
      faqs: [
         { question: "Do I need a consultation first?", answer: "Yes, all new clients must book a 'First Time Facial + Consult' so we can perform a deep dive into your skin history and current routine." },
         { question: "Are your products pregnancy safe?", answer: "We carry a specific line of botanical, pregnancy-safe products. Please note your pregnancy in the booking form so we can adjust active ingredients." },
         { question: "What is Buccal Massage?", answer: "It is an intra-oral massage technique that releases severe jaw tension, TMJ pain, and naturally lifts and contours the lower face." }
      ]
   };

   // Merge incoming user data for the download function only
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
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
   };

   return (
      <div className="w-full min-h-screen bg-[#FFF5F2] text-[#4A3B35] font-['Inter',sans-serif] selection:bg-[#E6BEAF] selection:text-white flex justify-center pb-28">

         {/* Background Ambience */}
         <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-[-10%] left-[-20%] w-[70%] h-[70%] bg-[#FFEBE5] rounded-full blur-[120px] opacity-60" />
            <div className="absolute bottom-[-10%] right-[-20%] w-[70%] h-[70%] bg-[#F5E6E0] rounded-full blur-[120px] opacity-60" />
         </div>

         <div className="w-full max-w-[480px] bg-[#FFF5F2]/80 backdrop-blur-3xl relative shadow-[0_20px_50px_rgba(230,190,175,0.3)] min-h-screen border-x border-[#FFF]/50">

            {/* ================= HEADER & BANNER ================= */}
            <div className="relative w-full h-[280px] bg-white overflow-hidden rounded-b-[3rem] shadow-sm">
               <img src={data.bannerImage} alt="Spa" className="w-full h-full object-cover opacity-80" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#FFF5F2] via-transparent to-transparent" />
            </div>

            {/* ================= IDENTITY & PROFILE ================= */}
            <div className="px-6 relative -mt-24 z-10">
               <div className="flex flex-col items-center text-center">

                  {/* Elegant Floating Profile Image */}
                  <motion.div
                     initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
                     className="w-36 h-36 rounded-full overflow-hidden border-4 border-white bg-white shadow-[0_10px_30px_rgba(230,190,175,0.4)] mb-5 relative"
                  >
                     <img src={data.profileImage} alt={data.displayName} className="w-full h-full object-cover" />
                  </motion.div>

                  <h1 className="text-3xl font-serif text-[#4A3B35] tracking-tight mb-1">
                     {data.displayName}
                  </h1>
                  <p className="text-[#C49B8D] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                     {data.role}
                  </p>

                  {data.businessName && (
                     <div className="bg-white/60 backdrop-blur-md border border-white text-[#7A6A63] px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm">
                        {data.businessName}
                     </div>
                  )}

                  <p className="text-[#7A6A63] text-sm leading-relaxed font-light mb-8">
                     {data.bio}
                  </p>

                  {/* Soft Stats Ribbon */}
                  <div className="flex justify-center gap-6 w-full mb-2">
                     {fictionalData.stats.map((stat, i) => (
                        <div key={i} className="text-center">
                           <span className="block text-xl font-serif text-[#4A3B35] mb-1">{stat.val}</span>
                           <span className="block text-[8px] uppercase tracking-widest text-[#C49B8D] font-bold">{stat.label}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="px-6 mt-10 space-y-6">

               {/* ================= DIRECT COMMS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <div className="flex gap-3">
                     <a href={`tel:${data.phone}`} className="flex-1 bg-white/70 backdrop-blur-xl border border-white/50 p-4 rounded-3xl hover:bg-white transition-colors flex flex-col items-center gap-2 group shadow-[0_4px_15px_rgba(230,190,175,0.1)]">
                        <div className="w-10 h-10 rounded-full bg-[#FFF5F2] flex items-center justify-center text-[#C49B8D] group-hover:scale-110 transition-transform">
                           <FiPhone size={18} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A6A63]">Call</span>
                     </a>
                     <a href={`mailto:${data.email}`} className="flex-1 bg-white/70 backdrop-blur-xl border border-white/50 p-4 rounded-3xl hover:bg-white transition-colors flex flex-col items-center gap-2 group shadow-[0_4px_15px_rgba(230,190,175,0.1)]">
                        <div className="w-10 h-10 rounded-full bg-[#FFF5F2] flex items-center justify-center text-[#C49B8D] group-hover:scale-110 transition-transform">
                           <FiMail size={18} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A6A63]">Email</span>
                     </a>
                     <a href={`https://${data.website}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white/70 backdrop-blur-xl border border-white/50 p-4 rounded-3xl hover:bg-white transition-colors flex flex-col items-center gap-2 group shadow-[0_4px_15px_rgba(230,190,175,0.1)]">
                        <div className="w-10 h-10 rounded-full bg-[#FFF5F2] flex items-center justify-center text-[#C49B8D] group-hover:scale-110 transition-transform">
                           <FiGlobe size={18} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A6A63]">Book</span>
                     </a>
                  </div>
               </motion.div>

               {/* ================= TREATMENT MENU (SERVICES) ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <DelicateCard>
                     <SectionHeading title="Rituals" subtitle="Treatment Menu" />
                     <div className="space-y-4">
                        {fictionalData.services.map((svc, i) => (
                           <div key={i} className="flex gap-4 items-center group cursor-pointer p-2 rounded-2xl hover:bg-white/50 transition-colors">
                              <div className="w-12 h-12 rounded-full bg-[#FFF5F2] border border-white flex items-center justify-center text-[#C49B8D] shrink-0">
                                 <svc.icon size={20} className="font-light" />
                              </div>
                              <div className="flex-1">
                                 <h4 className="text-sm font-semibold text-[#4A3B35]">{svc.title}</h4>
                                 <p className="text-[11px] text-[#7A6A63] font-light mt-0.5">{svc.desc}</p>
                              </div>
                              <div className="text-right shrink-0">
                                 <span className="block text-xs font-bold text-[#4A3B35]">{svc.price}</span>
                                 <span className="block text-[9px] uppercase tracking-widest text-[#C49B8D] mt-0.5">{svc.time}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </DelicateCard>
               </motion.div>

               {/* ================= APOTHECARY (PRODUCTS) ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionHeading title="Apothecary" subtitle="Curated Skincare" />
                  <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar -mx-6 px-6">
                     {fictionalData.products.map((prod, idx) => (
                        <div key={idx} className="min-w-[160px] bg-white/70 backdrop-blur-xl border border-white/50 p-3 rounded-3xl snap-center shadow-[0_4px_15px_rgba(230,190,175,0.1)] group cursor-pointer">
                           <div className="aspect-square rounded-2xl overflow-hidden mb-3">
                              <img src={prod.img} alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                           </div>
                           <div className="text-center pb-2">
                              <h4 className="text-xs font-semibold text-[#4A3B35] mb-1">{prod.title}</h4>
                              <span className="inline-block bg-[#FFF5F2] text-[#C49B8D] text-[10px] font-bold px-3 py-1 rounded-full">{prod.price}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </motion.div>

               {/* ================= GALLERY ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <DelicateCard>
                     <SectionHeading title="The Clinic" subtitle="Inside Lumière" />
                     <div className="grid grid-cols-2 gap-3">
                        {fictionalData.gallery.map((img, idx) => (
                           <div key={idx} className="aspect-square rounded-2xl overflow-hidden relative group">
                              <img src={img.img} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                 <FiCamera className="text-white" size={24} />
                              </div>
                           </div>
                        ))}
                     </div>
                  </DelicateCard>
               </motion.div>

               {/* ================= GLOW REVIEWS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <DelicateCard>
                     <SectionHeading title="Love Letters" subtitle="Client Results" />
                     <div className="space-y-4">
                        {fictionalData.testimonials.map((test, i) => (
                           <div key={i} className="bg-white/50 p-5 rounded-2xl border border-white/60">
                              <div className="flex gap-1 text-[#E6BEAF] mb-3">
                                 <FiStar size={14} className="fill-current" /><FiStar size={14} className="fill-current" /><FiStar size={14} className="fill-current" /><FiStar size={14} className="fill-current" /><FiStar size={14} className="fill-current" />
                              </div>
                              <p className="text-sm text-[#7A6A63] leading-relaxed italic mb-4 font-light">"{test.text}"</p>
                              <div className="flex items-center gap-3 border-t border-[#E6BEAF]/30 pt-3">
                                 <span className="font-semibold text-[#4A3B35] text-xs">{test.name}</span>
                                 <span className="text-[10px] uppercase tracking-widest text-[#C49B8D]">{test.role}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </DelicateCard>
               </motion.div>

               {/* ================= LOGISTICS & FAQ ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <DelicateCard>
                     <SectionHeading title="Details" subtitle="Visit Us" />

                     {data.address && (
                        <div className="flex items-center gap-4 pb-5 border-b border-[#E6BEAF]/30 mb-5">
                           <div className="w-10 h-10 rounded-full bg-[#FFF5F2] flex items-center justify-center text-[#C49B8D] shrink-0">
                              <FiMapPin size={18} />
                           </div>
                           <div>
                              <p className="text-sm font-medium text-[#4A3B35] leading-snug">{data.address}</p>
                              <a href={`https://maps.google.com/?q=${encodeURIComponent(data.address)}`} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest font-bold text-[#C49B8D] hover:underline mt-1 inline-block">Map it</a>
                           </div>
                        </div>
                     )}

                     <div className="mb-8">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-[#C49B8D] mb-4 flex items-center gap-2"><FiClock /> Studio Hours</p>
                        {fictionalData.hours.map((bh, i) => (
                           <div key={i} className="flex justify-between items-center py-2 text-xs">
                              <span className="text-[#7A6A63]">{bh.day}</span>
                              <span className="font-semibold text-[#4A3B35]">{bh.hours}</span>
                           </div>
                        ))}
                     </div>

                     <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-[#C49B8D] mb-4 flex items-center gap-2"><FiSmile /> Skin Policies</p>
                        {fictionalData.faqs.map((faq, index) => <SkincareAccordion key={index} question={faq.question} answer={faq.answer} />)}
                     </div>
                  </DelicateCard>
               </motion.div>

               {/* ================= SOCIAL NETWORK ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <div className="flex justify-center gap-3">
                     {[
                        { val: data.instagram, icon: FiInstagram, link: `https://instagram.com/${data.instagram}` },

                        { val: fictionalData.pinterest, icon: FaPinterest, link: `https://pinterest.com/${fictionalData.pinterest}` },
                        { val: data.whatsapp, icon: FaWhatsapp, link: `https://wa.me/${data.whatsapp}` }
                     ].map((social, i) => social.val && (
                        <a
                           key={i} href={social.link || null} target="_blank" rel="noopener noreferrer"
                           className="w-14 h-14 flex items-center justify-center bg-white/70 backdrop-blur-xl border border-white/50 rounded-full text-[#C49B8D] hover:bg-white hover:text-[#4A3B35] transition-all shadow-[0_4px_15px_rgba(230,190,175,0.1)] hover:-translate-y-1"
                        >
                           <social.icon size={22} />
                        </a>
                     ))}
                  </div>
               </motion.div>

            </div>

            {/* ================= FIXED CTA ================= */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[440px] z-50">
               <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => downloadVCard(vCardData)}
                  className="w-full bg-[#4A3B35] text-[#FFF5F2] py-4.5 rounded-full font-bold text-sm shadow-[0_10px_30px_rgba(74,59,53,0.3)] hover:bg-[#2A211D] transition-colors flex items-center justify-center gap-2 h-14"
               >
                  <FiUserPlus size={20} />
                  Save Contact Details
               </motion.button>
            </div>

            <div className="pb-28 pt-8 text-center border-t border-[#E6BEAF]/30 mt-8">
               <PoweredBy />
            </div>

         </div>

         <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      </div>
   );
};

export default BoutiqueStylist;