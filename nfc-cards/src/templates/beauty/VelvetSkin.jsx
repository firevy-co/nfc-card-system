import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FiPhone, FiMail, FiGlobe, FiMapPin, FiInstagram, FiTwitter,
   FiUserPlus, FiChevronDown, FiStar, FiClock, FiCalendar,
   FiDroplet, FiWind, FiSun, FiShoppingBag, FiMessageSquare,
   FiArrowRight, FiCheckCircle
} from 'react-icons/fi';
import { FaFacebookF, FaTiktok, FaLeaf, FaQuoteLeft } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Minimalist Botanical Sub-components ---

const BotanicalCard = ({ children, className = "" }) => (
   <div className={`bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(44,61,51,0.04)] border border-[#E8E8E0] ${className}`}>
      {children}
   </div>
);

const SectionHeader = ({ title, subtitle, icon: Icon }) => (
   <div className="mb-6 flex flex-col items-start">
      <div className="flex items-center gap-2 mb-1">
         {Icon && <Icon size={14} className="text-[#8DA399]" />}
         <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8DA399]">{title}</span>
      </div>
      <h2 className="text-2xl font-serif text-[#2C3D33] tracking-tight">{subtitle}</h2>
   </div>
);

const FaqAccordion = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border-b border-[#E8E8E0] last:border-0">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full py-4 flex justify-between items-center text-left focus:outline-none group"
         >
            <span className="font-semibold text-sm text-[#2C3D33] group-hover:text-[#8DA399] transition-colors pr-4">{question}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
               <FiChevronDown size={18} className="text-[#8DA399]" />
            </motion.div>
         </button>
         <AnimatePresence>
            {isOpen && (
               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <p className="pb-4 text-[#66736A] text-sm leading-relaxed">
                     {answer}
                  </p>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

// --- Main Component ---

const VelvetSkin = ({ userData }) => {
   // Completely Fictional Persona: Holistic Skin Expert
   const fictionalData = {
      displayName: "Celine Laurent",
      role: "Holistic Skin Expert & Founder",
      phone: "+1 (415) 555-SKIN",
      email: "celine@botanica-aesthetics.com",
      website: "www.botanica-aesthetics.com",
      address: "2240 Fillmore St, San Francisco, CA",
      businessName: "Botanica Aesthetics",
      twitter: "celinelaurent",
      instagram: "botanica.skin",
      tiktok: "celine.holistic",
      facebook: "botanicaaesthetics",
      bio: "Pioneering plant-based clinical skincare. We combine advanced non-invasive technology with wildcrafted botanicals to restore your skin's natural barrier and luminous glow.",
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      bannerImage: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&h=600&fit=crop",
      stats: [
         { label: "Radiant Clients", val: "3,200+" },
         { label: "Years Exp", val: "10" },
         { label: "Organic Formulas", val: "100%" }
      ],
      services: [
         { title: "The Signature Sculpt", desc: "Microcurrent lifting & lymphatic drainage.", price: "$195", time: "60 Min", icon: FiSun },
         { title: "Botanical Resurface", desc: "Enzyme peel customized to your skin biome.", price: "$150", time: "45 Min", icon: FiWind },
         { title: "Deep Hydration Infusion", desc: "Oxygen dome therapy with hyaluronic acid.", price: "$220", time: "75 Min", icon: FiDroplet }
      ],
      products: [
         { title: "Nourishing Cleansing Oil", price: "$48", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop" },
         { title: "Matcha Clarifying Mask", price: "$65", img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop" },
         { title: "Wild Rose Barrier Cream", price: "$85", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop" }
      ],
      gallery: [
         { title: "Treatment Room", img: "https://images.unsplash.com/photo-1519821172144-4f87d85de2a1?w=600&h=600&fit=crop" },
         { title: "Organic Tools", img: "https://images.unsplash.com/photo-1596462502278-27bf85033e54?w=600&h=600&fit=crop" },
         { title: "Skin Analysis", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop" },
         { title: "Botanical Blends", img: "https://images.unsplash.com/photo-1615397323282-310385da418e?w=600&h=600&fit=crop" }
      ],
      testimonials: [
         { name: "Elise W.", role: "Client", text: "Celine's approach completely cured my adult acne. The clinic feels like a sanctuary, and the results are incredibly long-lasting." },
         { name: "Dr. Maya S.", role: "Dermatologist", text: "Botanica bridges the gap between clinical results and holistic care perfectly. I constantly refer my patients here for post-care." }
      ],
      hours: [
         { day: "Tuesday - Friday", hours: "10:00 AM - 7:00 PM" },
         { day: "Saturday", hours: "9:00 AM - 5:00 PM" },
         { day: "Sun & Mon", hours: "Closed" }
      ],
      faqs: [
         { question: "What is a Holistic Facial?", answer: "Instead of harsh extractions or chemical burns, we use plant-derived enzymes and massage techniques to heal the skin barrier and promote natural cellular turnover." },
         { question: "Can I buy your products online?", answer: "Yes, our entire curated apothecary is available on our website. We ship nationwide." },
         { question: "How often should I get a treatment?", answer: "For optimal cellular turnover, we recommend a facial every 4 to 6 weeks, paired with a consistent at-home regimen." }
      ],
      blog: {
         title: "Understanding Your Skin's Microbiome",
         desc: "Why harsh cleansers might be causing your breakouts and how to rebuild your protective barrier naturally.",
         img: "https://images.unsplash.com/photo-1556228720-192a6af4e185?w=600&h=400&fit=crop"
      }
   };

   // Merge for the button function
   const vCardData = { ...userData, ...fictionalData };

   const fadeUp = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
   };

   return (
      <div className="w-full min-h-screen bg-[#F5F5F0] text-[#2C3D33] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#8DA399] selection:text-white flex justify-center pb-12">

         {/* Main Container */}
         <div className="w-full max-w-[480px] bg-[#FAFAF7] relative shadow-2xl min-h-screen overflow-x-hidden border-x border-[#E8E8E0] flex flex-col">

            {/* ================= HERO & HEADER ================= */}
            <div className="w-full h-[260px] relative rounded-b-[40px] overflow-hidden">
               <img src={fictionalData.bannerImage} alt="Spa Ambience" className="w-full h-full object-cover opacity-90" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#2C3D33]/60 via-transparent to-transparent" />
            </div>

            {/* ================= PROFILE INFO ================= */}
            <div className="px-6 relative -mt-16 z-10">
               <div className="flex justify-between items-end mb-4">
                  <motion.div
                     initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}
                     className="w-32 h-32 rounded-[2rem] bg-[#FAFAF7] p-2 shadow-lg"
                  >
                     <img src={fictionalData.profileImage} alt={fictionalData.displayName} className="w-full h-full object-cover rounded-[1.5rem]" />
                  </motion.div>
                  <div className="pb-2 text-right">
                     <div className="flex items-center justify-end gap-1 text-[#8DA399] mb-1">
                        <FiCheckCircle size={14} />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Verified Expert</span>
                     </div>
                  </div>
               </div>

               <div>
                  <h1 className="text-3xl font-serif font-bold text-[#2C3D33] mb-1">{fictionalData.displayName}</h1>
                  <p className="text-[#8DA399] text-sm font-semibold uppercase tracking-wider mb-4">{fictionalData.role}</p>

                  {fictionalData.businessName && (
                     <div className="inline-flex items-center gap-2 bg-[#E8E8E0]/40 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-[#2C3D33] mb-5">
                        <FaLeaf className="text-[#8DA399]" />
                        {fictionalData.businessName}
                     </div>
                  )}
                  <p className="text-[#66736A] text-sm leading-relaxed mb-6">
                     {fictionalData.bio}
                  </p>
               </div>
            </div>

            <div className="px-6 flex-1 space-y-6">

               {/* ================= STATS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex justify-between items-center bg-[#2C3D33] text-white rounded-[24px] p-6 shadow-md">
                  {fictionalData.stats.map((stat, i) => (
                     <div key={i} className={`text-center flex-1 ${i !== fictionalData.stats.length - 1 ? 'border-r border-white/20' : ''}`}>
                        <span className="block text-xl font-serif font-bold mb-1">{stat.val}</span>
                        <span className="block text-[9px] uppercase tracking-widest text-[#8DA399]">{stat.label}</span>
                     </div>
                  ))}
               </motion.div>

               {/* ================= QUICK ACTIONS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-4 gap-3">
                  {[
                     { icon: FiPhone, label: "Call", link: `tel:${fictionalData.phone}` },
                     { icon: FiMail, label: "Email", link: `mailto:${fictionalData.email}` },
                     { icon: FiMapPin, label: "Map", link: `https://maps.google.com/?q=${fictionalData.address}` },
                     { icon: FiGlobe, label: "Web", link: `https://${fictionalData.website}` }
                  ].map((action, i) => (
                     <a key={i} href={action.link || null} target="_blank" rel="noopener noreferrer" className="bg-white border border-[#E8E8E0] rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:border-[#8DA399] hover:shadow-md transition-all group">
                        <action.icon size={20} className="text-[#8DA399] group-hover:text-[#2C3D33] transition-colors" />
                        <span className="text-[10px] font-bold text-[#2C3D33]">{action.label}</span>
                     </a>
                  ))}
               </motion.div>

               {/* ================= SERVICES ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <BotanicalCard>
                     <SectionHeader title="Menu" subtitle="Signature Rituals" icon={FiSun} />
                     <div className="space-y-4">
                        {fictionalData.services.map((svc, i) => (
                           <div key={i} className="flex gap-4 p-4 bg-[#FAFAF7] rounded-xl border border-[#E8E8E0]/50 hover:border-[#8DA399]/50 transition-colors">
                              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#8DA399] shadow-sm shrink-0">
                                 <svc.icon size={20} />
                              </div>
                              <div className="flex-1">
                                 <h4 className="text-sm font-bold text-[#2C3D33] mb-1">{svc.title}</h4>
                                 <p className="text-xs text-[#66736A] leading-snug mb-2">{svc.desc}</p>
                                 <div className="flex items-center gap-3">
                                    <span className="text-xs font-black text-[#8DA399]">{svc.price}</span>
                                    <span className="w-1 h-1 rounded-full bg-[#E8E8E0]" />
                                    <span className="text-[10px] font-bold text-[#66736A] uppercase tracking-wide">{svc.time}</span>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </BotanicalCard>
               </motion.div>

               {/* ================= APOTHECARY (PRODUCTS) ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <BotanicalCard className="!pr-0">
                     <div className="pr-6">
                        <SectionHeader title="Shop" subtitle="The Apothecary" icon={FiShoppingBag} />
                     </div>
                     <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar pr-6">
                        {fictionalData.products.map((prod, idx) => (
                           <div key={idx} className="min-w-[160px] bg-[#FAFAF7] border border-[#E8E8E0] rounded-2xl overflow-hidden snap-center group cursor-pointer hover:border-[#8DA399] transition-colors">
                              <div className="h-40 w-full overflow-hidden p-2">
                                 <img src={prod.img} alt={prod.title} className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500" />
                              </div>
                              <div className="p-4 text-center">
                                 <h4 className="text-xs font-bold text-[#2C3D33] mb-1 line-clamp-1">{prod.title}</h4>
                                 <span className="text-sm font-black text-[#8DA399]">{prod.price}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </BotanicalCard>
               </motion.div>

               {/* ================= BOOKING MOCKUP ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <BotanicalCard>
                     <SectionHeader title="Reserve" subtitle="Request a Session" icon={FiCalendar} />
                     <div className="space-y-3">
                        <div className="flex items-center bg-[#FAFAF7] border border-[#E8E8E0] rounded-xl px-4 py-3">
                           <FiCalendar className="text-[#8DA399] mr-3" size={18} />
                           <input type="text" placeholder="Preferred Date" className="bg-transparent w-full text-sm text-[#2C3D33] focus:outline-none placeholder-[#66736A]" readOnly />
                        </div>
                        <div className="flex items-center bg-[#FAFAF7] border border-[#E8E8E0] rounded-xl px-4 py-3">
                           <FiClock className="text-[#8DA399] mr-3" size={18} />
                           <input type="text" placeholder="Preferred Time" className="bg-transparent w-full text-sm text-[#2C3D33] focus:outline-none placeholder-[#66736A]" readOnly />
                        </div>
                        <button className="w-full py-4 bg-[#2C3D33] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#1A261F] transition-colors mt-2">
                           Request Appointment
                        </button>
                     </div>
                  </BotanicalCard>
               </motion.div>

               {/* ================= GALLERY ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <BotanicalCard>
                     <SectionHeader title="Visuals" subtitle="Clinic Gallery" icon={FiStar} />
                     <div className="grid grid-cols-2 gap-3">
                        {fictionalData.gallery.map((img, idx) => (
                           <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group">
                              <img src={img.img} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                 <span className="text-white text-xs font-bold tracking-wider uppercase">{img.title}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </BotanicalCard>
               </motion.div>

               {/* ================= TESTIMONIALS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <BotanicalCard>
                     <SectionHeader title="Community" subtitle="Client Stories" icon={FiMessageSquare} />
                     <div className="space-y-4">
                        {fictionalData.testimonials.map((test, i) => (
                           <div key={i} className="bg-[#FAFAF7] p-5 rounded-2xl border border-[#E8E8E0]">
                              <FaQuoteLeft className="text-[#8DA399] mb-3 opacity-50" size={20} />
                              <p className="text-sm text-[#66736A] italic mb-4 leading-relaxed">"{test.text}"</p>
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full bg-[#8DA399]/20 text-[#2C3D33] flex items-center justify-center font-bold text-xs">
                                    {test.name.charAt(0)}
                                 </div>
                                 <div>
                                    <p className="text-xs font-bold text-[#2C3D33]">{test.name}</p>
                                    <p className="text-[10px] uppercase tracking-widest text-[#8DA399]">{test.role}</p>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </BotanicalCard>
               </motion.div>

               {/* ================= BLOG MOCKUP ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <BotanicalCard>
                     <SectionHeader title="Journal" subtitle="Latest Insights" icon={FaLeaf} />
                     <div className="group cursor-pointer">
                        <div className="w-full h-40 rounded-xl overflow-hidden mb-4">
                           <img src={fictionalData.blog.img} alt="Blog" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <h4 className="text-base font-bold text-[#2C3D33] group-hover:text-[#8DA399] transition-colors mb-2">{fictionalData.blog.title}</h4>
                        <p className="text-sm text-[#66736A] line-clamp-2 mb-3">{fictionalData.blog.desc}</p>
                        <span className="text-xs font-bold text-[#8DA399] flex items-center gap-1 uppercase tracking-widest">
                           Read Article <FiArrowRight />
                        </span>
                     </div>
                  </BotanicalCard>
               </motion.div>

               {/* ================= INFO & FAQ ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <BotanicalCard>
                     <SectionHeader title="Logistics" subtitle="Hours & Policies" icon={FiClock} />

                     <div className="mb-6 bg-[#FAFAF7] rounded-xl p-4 border border-[#E8E8E0]">
                        {fictionalData.hours.map((bh, i) => (
                           <div key={i} className="flex justify-between items-center py-2 text-sm border-b border-[#E8E8E0] last:border-0">
                              <span className="text-[#66736A] font-medium">{bh.day}</span>
                              <span className="font-bold text-[#2C3D33]">{bh.hours}</span>
                           </div>
                        ))}
                     </div>

                     <div>
                        {fictionalData.faqs.map((faq, index) => <FaqAccordion key={index} question={faq.question} answer={faq.answer} />)}
                     </div>
                  </BotanicalCard>
               </motion.div>

               {/* ================= QR CODE MOCK ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <div className="flex flex-col items-center py-4">
                     <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8DA399] mb-4">Scan to Connect</span>
                     <div className="bg-white p-4 rounded-3xl shadow-md border border-[#E8E8E0] w-48 h-48">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://vcard.link" alt="QR" className="w-full h-full rounded-xl" />
                     </div>
                  </div>
               </motion.div>

               {/* ================= SOCIALS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <div className="flex justify-center gap-3 py-2">
                     {[
                        { val: fictionalData.instagram, icon: FiInstagram, link: `https://instagram.com/${fictionalData.instagram}` },
                        { val: fictionalData.tiktok, icon: FaTiktok, link: `https://tiktok.com/@${fictionalData.tiktok}` },
                        { val: fictionalData.facebook, icon: FaFacebookF, link: `https://facebook.com/${fictionalData.facebook}` },
                        { val: fictionalData.twitter, icon: FiTwitter, link: `https://twitter.com/${fictionalData.twitter}` }
                     ].map((social, i) => social.val && (
                        <a
                           key={i} href={social.link || null} target="_blank" rel="noopener noreferrer"
                           className="w-12 h-12 bg-white border border-[#E8E8E0] rounded-full flex items-center justify-center text-[#8DA399] hover:bg-[#8DA399] hover:text-white hover:border-[#8DA399] transition-all shadow-sm"
                        >
                           <social.icon size={18} />
                        </a>
                     ))}
                  </div>
               </motion.div>

               {/* ================= SAVE CONTACT CTA (INLINE) ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="pt-4 mb-8">
                  <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={() => downloadVCard(vCardData)}
                     className="w-full bg-[#8DA399] text-white py-4.5 rounded-2xl font-bold text-sm shadow-[0_8px_20px_rgba(141,163,153,0.3)] hover:bg-[#7A9086] transition-all flex items-center justify-center gap-2 h-14"
                  >
                     <FiUserPlus size={20} />
                     Save Contact Details
                  </motion.button>
               </motion.div>

            </div>

            {/* ================= FOOTER ================= */}
            <div className="pb-8 text-center border-t border-[#E8E8E0] pt-6">
               <PoweredBy />
            </div>

         </div>

         <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,500;0,700;1,500&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      </div>
   );
};

export default VelvetSkin;