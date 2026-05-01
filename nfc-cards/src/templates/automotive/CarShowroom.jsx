import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FiPhone, FiMail, FiGlobe, FiMapPin, FiInstagram, FiLinkedin,
   FiTwitter, FiPlus, FiMinus, FiHome, FiKey, FiBriefcase,
   FiArrowUpRight, FiClock, FiStar, FiAward, FiDownload
} from 'react-icons/fi';
import { FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Elegant Editorial Sub-components ---

const Divider = () => <hr className="border-t border-[#D9D9D6] my-8" />;

const SectionTitle = ({ title, subtitle }) => (
   <div className="mb-6">
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8C85] mb-2 block">{title}</span>
      <h2 className="text-2xl font-serif text-[#1C1C1A] tracking-tight">{subtitle}</h2>
   </div>
);

const ElegantAccordion = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border-b border-[#D9D9D6] last:border-0">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full py-5 flex justify-between items-center text-left focus:outline-none group"
         >
            <span className="font-semibold text-sm text-[#1C1C1A] pr-4 group-hover:text-[#A68A5B] transition-colors">{question}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-[#8C8C85] group-hover:text-[#A68A5B] transition-colors">
               {isOpen ? <FiMinus size={18} /> : <FiPlus size={18} />}
            </motion.div>
         </button>
         <AnimatePresence>
            {isOpen && (
               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <p className="pb-6 text-[#5A5A55] text-sm leading-relaxed">
                     {answer}
                  </p>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

// --- Main Component ---

const SwissLuxuryEstate = ({ userData }) => {
   // Completely Fictional Persona: Ultra-Luxury Real Estate Broker
   const fictionalData = {
      displayName: "Julian Vance",
      role: "Principal Broker & Founder",
      businessName: "Vance & Co. Luxury Real Estate",
      phone: "+1 (206) 555-0198",
      email: "julian@vanceco.estate",
      website: "www.vanceco.estate",
      address: "1000 1st Avenue, Suite 400, Seattle, WA",
      bio: "Specializing in ultra-luxury estates and architectural masterpieces across the Pacific Northwest. Matching discerning global clients with extraordinary, off-market properties.",
      profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
      bannerImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=600&fit=crop",
      instagram: "julianvance_estate",
      linkedin: "julianvance",
      twitter: "vance_realestate",
      whatsapp: "12065550198",
      stats: [
         { label: "Volume Sold '25", val: "$124M" },
         { label: "Avg. Days on Market", val: "18" },
         { label: "Years Mastery", val: "14" }
      ],
      services: [
         { title: "Seller Representation", desc: "Bespoke global marketing strategies, cinematic property tours, and discreet off-market whisper listings.", icon: FiHome },
         { title: "Buyer Acquisitions", desc: "Exclusive access to pre-market estates and aggressive negotiation for high-net-worth individuals.", icon: FiKey },
         { title: "Investment Portfolios", desc: "Data-driven advisory for multi-family developments and luxury architectural investments.", icon: FiBriefcase }
      ],
      portfolio: [
         { title: "The Glass House", price: "$12,500,000", location: "Mercer Island, WA", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=600&fit=crop" },
         { title: "Skyline Penthouse", price: "$8,200,000", location: "Downtown Seattle", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=600&fit=crop" },
         { title: "Coastal Retreat", price: "$15,900,000", location: "Bellevue, WA", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=600&fit=crop" },
         { title: "Modernist Estate", price: "$6,750,000", location: "Medina, WA", img: "https://images.unsplash.com/photo-1600566753086-00f18efc2291?w=600&h=600&fit=crop" }
      ],
      testimonials: [
         { name: "Alexander K.", role: "Tech Executive", text: "Julian didn't just find us a house; he found an architectural masterpiece that wasn't even on the market yet. His network is truly unparalleled." },
         { name: "Eleanor R.", role: "International Investor", text: "The discretion, the execution, and the final sale price far exceeded my expectations. Vance & Co. is the gold standard for luxury real estate." }
      ],
      businessHours: [
         { day: "Monday - Friday", hours: "08:00 AM - 07:00 PM" },
         { day: "Saturday - Sunday", hours: "By Private Appointment" }
      ],
      faqs: [
         { question: "Do you handle out-of-state relocations?", answer: "Yes. Over 40% of our clientele are international or out-of-state buyers. We handle white-glove relocation services, including private tours and neighborhood curation." },
         { question: "What qualifies as an 'Off-Market' property?", answer: "These are exclusive estates whose owners wish to maintain absolute privacy. They are never listed on public MLS databases and are only shown to thoroughly vetted, pre-qualified buyers." },
         { question: "Do you offer architectural consultation?", answer: "We partner with the region's top architects and interior designers to advise clients on potential renovations and ROI before a purchase is finalized." }
      ]
   };

   // Merge for the button function, but display only fictional data
   const vCardData = { ...userData, ...fictionalData };

   const fadeUp = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
   };

   return (
      <div className="w-full min-h-screen bg-[#F5F5F0] text-[#1C1C1A] font-['Inter',sans-serif] selection:bg-[#A68A5B] selection:text-white flex justify-center pb-28">

         <div className="w-full max-w-[480px] bg-[#FFFFFF] relative shadow-[0_20px_60px_rgba(0,0,0,0.05)] min-h-screen border-x border-[#EAEAE5]">

            {/* ================= HERO COVER ================= */}
            <div className="w-full h-[350px] relative">
               <img src={fictionalData.bannerImage} alt="Estate" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
            </div>

            {/* ================= FLOATING IDENTITY CARD ================= */}
            <div className="px-6 relative -mt-24 z-10">
               <motion.div
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
                  className="bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#EAEAE5]"
               >
                  <div className="w-24 h-24 mb-6 rounded-full overflow-hidden border border-[#EAEAE5]">
                     <img src={fictionalData.profileImage} alt={fictionalData.displayName} className="w-full h-full object-cover grayscale-[20%]" />
                  </div>

                  <h1 className="text-3xl font-serif text-[#1C1C1A] tracking-tight mb-2">
                     {fictionalData.displayName}
                  </h1>
                  <p className="text-[#A68A5B] text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
                     {fictionalData.role}
                  </p>
                  <p className="text-[#5A5A55] text-sm leading-relaxed">
                     {fictionalData.bio}
                  </p>

                  <div className="mt-6 pt-6 border-t border-[#D9D9D6] grid grid-cols-3 gap-2">
                     {fictionalData.stats.map((stat, i) => (
                        <div key={i} className="text-center">
                           <span className="block text-lg font-serif text-[#1C1C1A] mb-1">{stat.val}</span>
                           <span className="block text-[8px] uppercase tracking-widest text-[#8C8C85] font-bold">{stat.label}</span>
                        </div>
                     ))}
                  </div>
               </motion.div>
            </div>

            <div className="px-8 pt-8">

               {/* ================= DIRECT CONTACT ================= */}
               <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                     <a href={`tel:${fictionalData.phone}`} className="py-4 border border-[#EAEAE5] flex flex-col items-center justify-center gap-2 hover:border-[#A68A5B] hover:bg-[#F5F5F0] transition-colors group">
                        <FiPhone size={20} className="text-[#8C8C85] group-hover:text-[#A68A5B]" />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#1C1C1A]">Call Office</span>
                     </a>
                     <a href={`mailto:${fictionalData.email}`} className="py-4 border border-[#EAEAE5] flex flex-col items-center justify-center gap-2 hover:border-[#A68A5B] hover:bg-[#F5F5F0] transition-colors group">
                        <FiMail size={20} className="text-[#8C8C85] group-hover:text-[#A68A5B]" />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#1C1C1A]">Email Desk</span>
                     </a>
                  </div>
                  {fictionalData.website && (
                     <a href={`https://${fictionalData.website}`} target="_blank" rel="noopener noreferrer" className="w-full py-4 border border-[#EAEAE5] flex items-center justify-between px-6 hover:border-[#A68A5B] hover:bg-[#F5F5F0] transition-colors group">
                        <span className="text-xs uppercase font-bold tracking-widest text-[#1C1C1A]">Official Website</span>
                        <FiArrowUpRight size={16} className="text-[#8C8C85] group-hover:text-[#A68A5B]" />
                     </a>
                  )}
               </motion.section>

               <Divider />

               {/* ================= EXCLUSIVE LISTINGS (PORTFOLIO) ================= */}
               <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionTitle title="Exclusive Collection" subtitle="Featured Properties" />
                  <div className="space-y-6">
                     {fictionalData.portfolio.map((item, idx) => (
                        <div key={idx} className="group cursor-pointer">
                           <div className="w-full h-56 overflow-hidden mb-3 relative">
                              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-[#1C1C1A]">
                                 {item.price}
                              </div>
                           </div>
                           <div className="flex justify-between items-start">
                              <div>
                                 <h4 className="font-serif text-lg text-[#1C1C1A]">{item.title}</h4>
                                 <p className="text-xs text-[#8C8C85] uppercase tracking-widest mt-1">{item.location}</p>
                              </div>
                              <FiArrowUpRight size={20} className="text-[#D9D9D6] group-hover:text-[#A68A5B] transition-colors mt-1" />
                           </div>
                        </div>
                     ))}
                  </div>
               </motion.section>

               <Divider />

               {/* ================= SERVICES ================= */}
               <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionTitle title="Advisory" subtitle="Core Services" />
                  <div className="space-y-6">
                     {fictionalData.services.map((svc, i) => (
                        <div key={i} className="flex gap-5 group">
                           <div className="mt-1 shrink-0">
                              <svc.icon size={20} className="text-[#A68A5B]" />
                           </div>
                           <div>
                              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1C1C1A] mb-2 group-hover:text-[#A68A5B] transition-colors">{svc.title}</h3>
                              <p className="text-sm text-[#5A5A55] leading-relaxed">{svc.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </motion.section>

               <Divider />

               {/* ================= TESTIMONIALS ================= */}
               <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionTitle title="Client Relations" subtitle="Testimonials" />
                  <div className="space-y-8">
                     {fictionalData.testimonials.map((test, i) => (
                        <div key={i} className="bg-[#F5F5F0] p-6 border-l-2 border-[#A68A5B]">
                           <p className="font-serif text-[15px] leading-loose text-[#1C1C1A] italic mb-4">"{test.text}"</p>
                           <p className="text-[10px] font-bold uppercase tracking-widest text-[#8C8C85]">— {test.name}, {test.role}</p>
                        </div>
                     ))}
                  </div>
               </motion.section>

               <Divider />

               {/* ================= LOCATION & HOURS ================= */}
               <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionTitle title="Headquarters" subtitle="Office & Hours" />

                  {fictionalData.address && (
                     <div className="mb-6 p-5 border border-[#EAEAE5] flex items-start gap-4">
                        <FiMapPin size={20} className="text-[#A68A5B] shrink-0 mt-0.5" />
                        <div>
                           <p className="text-sm font-semibold text-[#1C1C1A] leading-snug">{fictionalData.address}</p>
                           <a href={`https://maps.google.com/?q=${encodeURIComponent(fictionalData.address)}`} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-[#8C8C85] hover:text-[#A68A5B] transition-colors mt-2 inline-block">Get Directions →</a>
                        </div>
                     </div>
                  )}

                  <div className="space-y-1">
                     {fictionalData.businessHours.map((bh, i) => (
                        <div key={i} className="flex justify-between items-center py-3 border-b border-[#EAEAE5] last:border-0">
                           <span className="text-xs font-semibold text-[#5A5A55]">{bh.day}</span>
                           <span className="text-xs text-[#1C1C1A]">{bh.hours}</span>
                        </div>
                     ))}
                  </div>
               </motion.section>

               <Divider />

               {/* ================= FAQ ================= */}
               <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionTitle title="Inquiries" subtitle="Common Questions" />
                  <div>
                     {fictionalData.faqs.map((faq, index) => (
                        <ElegantAccordion key={index} question={faq.question} answer={faq.answer} />
                     ))}
                  </div>
               </motion.section>

               <Divider />

               {/* ================= SOCIALS ================= */}
               <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-8">
                  <SectionTitle title="Network" subtitle="Follow Our Curation" />
                  <div className="flex flex-wrap gap-3">
                     {[
                        { val: fictionalData.instagram, icon: FiInstagram, link: `https://instagram.com/${fictionalData.instagram}` },
                        { val: fictionalData.linkedin, icon: FiLinkedin, link: `https://linkedin.com/in/${fictionalData.linkedin}` },
                        { val: fictionalData.twitter, icon: FiTwitter, link: `https://twitter.com/${fictionalData.twitter}` },
                        { val: fictionalData.whatsapp, icon: FaWhatsapp, link: `https://wa.me/${fictionalData.whatsapp}` }
                     ].map((social, i) => social.val && (
                        <a
                           key={i} href={social.link} target="_blank" rel="noopener noreferrer"
                           className="w-12 h-12 flex items-center justify-center border border-[#EAEAE5] text-[#1C1C1A] hover:border-[#A68A5B] hover:text-[#A68A5B] transition-colors rounded-full"
                        >
                           <social.icon size={18} />
                        </a>
                     ))}
                  </div>
               </motion.section>

            </div>

            {/* ================= STICKY FOOTER CTA ================= */}
            <div className="sticky bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/90 to-transparent z-50">
               <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => downloadVCard(vCardData)}
                  className="w-full bg-[#1C1C1A] text-white py-4 font-semibold text-sm uppercase tracking-widest shadow-2xl hover:bg-[#A68A5B] transition-colors flex items-center justify-center gap-3"
               >
                  <FiDownload size={16} /> Save To Contacts
               </motion.button>
            </div>

            <div className="pb-8 pt-4 text-center border-t border-[#EAEAE5]">
               <PoweredBy />
            </div>

         </div>

         {/* Font imports for this specific theme */}
         <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
      `}} />
      </div>
   );
};

export default SwissLuxuryEstate;