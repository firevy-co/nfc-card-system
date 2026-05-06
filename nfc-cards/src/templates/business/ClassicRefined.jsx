import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FiPhone, FiMail, FiGlobe, FiMapPin, FiLinkedin, FiTwitter,
   FiUserPlus, FiChevronDown, FiBriefcase, FiTrendingUp,
   FiShield, FiHome, FiVideo, FiPlayCircle, FiClock, FiStar
} from 'react-icons/fi';
import { FaLinkedinIn, FaTwitter, FaWhatsapp, FaInstagram, FaQuoteLeft } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Corporate Sub-components ---

const SectionTitle = ({ title, subtitle }) => (
   <div className="mb-6">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C2A05F] mb-1">{title}</h3>
      <h2 className="text-2xl font-serif text-[#0F172A] leading-tight">{subtitle}</h2>
      <div className="w-12 h-1 bg-[#0F172A] mt-4" />
   </div>
);

const CorporateAccordion = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border border-slate-200 mb-3 bg-white">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-4 flex justify-between items-center text-left focus:outline-none hover:bg-slate-50 transition-colors"
         >
            <span className="font-bold text-sm text-[#0F172A] pr-4">{question}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
               <FiChevronDown size={18} className="text-[#C2A05F]" />
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

const ClassicRefined = ({ userData }) => {
   // Completely Fictional Persona: Luxury Real Estate Managing Partner
   const fictionalData = {
      displayName: "Richard Sterling",
      role: "Principal Broker & Managing Partner",
      phone: "+1 (212) 555-8890",
      email: "r.sterling@sterlingestates.com",
      website: "www.sterlingestates.com",
      address: "One Vanderbilt, Suite 5400, New York, NY",
      businessName: "Sterling Luxury Estates",
      twitter: "rsterling_re",
      linkedin: "richardsterling",
      instagram: "sterling_luxury",
      whatsapp: "12125558890",
      bio: "Curating legacy properties for the world's most discerning clientele. With over $1.5B in lifetime sales, we don't just sell real estate; we engineer generational wealth through strategic acquisitions.",
      profileImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop",
      bannerImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=600&fit=crop", // Mansion
      stats: [
         { label: "Lifetime Sales", val: "$1.5B+" },
         { label: "Estates Sold", val: "124" },
         { label: "Years Active", val: "15" }
      ],
      services: [
         { title: "Luxury Acquisitions", desc: "Exclusive buyer representation for off-market, high-net-worth property acquisitions.", icon: FiHome },
         { title: "Strategic Divestment", desc: "Targeted, discreet marketing campaigns for ultra-luxury estate sales.", icon: FiTrendingUp },
         { title: "Global Relocation", desc: "End-to-end concierge services for international executives and family offices.", icon: FiGlobe }
      ],
      portfolio: [
         { title: "The Sky Penthouse", price: "$24,500,000", specs: "5 Bed • 6.5 Bath • 8,200 sqft", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=400&fit=crop" },
         { title: "Coastal Modern Villa", price: "$18,250,000", specs: "6 Bed • 8 Bath • 11,000 sqft", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop" }
      ],
      videoPresentation: {
         title: "2026 Market Outlook",
         thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop"
      },
      testimonials: [
         { name: "Eleanor V.", role: "CEO, TechGlobal", text: "Richard operates with military precision. He secured our Manhattan penthouse off-market and negotiated terms that were exceptionally favorable. Discretion is his superpower." },
         { name: "Marcus T.", role: "Private Investor", text: "Sterling Estates doesn't just show homes; they analyze assets. Richard's grasp of the macroeconomic factors driving real estate is unmatched." }
      ],
      hours: [
         { day: "Mon - Fri", hours: "08:00 AM - 07:00 PM" },
         { day: "Saturday", hours: "Private Showings Only" },
         { day: "Sunday", hours: "Closed" }
      ],
      faqs: [
         { question: "Do you handle commercial real estate?", answer: "Our primary focus is ultra-luxury residential, but we maintain a dedicated commercial advisory wing for our family office clients seeking portfolio diversification." },
         { question: "What is an off-market listing?", answer: "An off-market or 'pocket' listing is a property for sale that is not publicly advertised on the MLS to ensure the utmost privacy for the seller." },
         { question: "How do you value unique luxury properties?", answer: "We utilize a proprietary blend of hyper-local comp analysis, replacement cost metrics, and global market sentiment to price irreplaceable assets." }
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
      youtube: userData?.youtube || fictionalData.youtube,
      tiktok: userData?.tiktok || fictionalData.tiktok,
      telegram: userData?.telegram || fictionalData.telegram,
      bio: userData?.bio || fictionalData.bio,
      profileImage: userData?.profileImage || userData?.avatar || userData?.logo || fictionalData.profileImage || fictionalData.avatar || fictionalData.defaultAvatar,
      avatar: userData?.profileImage || userData?.avatar || userData?.logo || fictionalData.profileImage || fictionalData.avatar || fictionalData.defaultAvatar,
      logo: userData?.logo || userData?.profileImage || fictionalData.logo,
      bannerImage: userData?.coverPhoto || fictionalData.bannerImage || fictionalData.coverImage,
   };
   const fadeUp = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
   };

   return (
      <div className="w-full min-h-screen bg-[#F1F5F9] text-slate-800 font-['Inter',sans-serif] selection:bg-[#0F172A] selection:text-[#C2A05F] flex justify-center pb-12">

         {/* App Container */}
         <div className="w-full max-w-[480px] bg-white relative shadow-[0_20px_50px_rgba(15,23,42,0.1)] min-h-screen border-x border-slate-200 flex flex-col">

            {/* ================= HERO ARCHITECTURE ================= */}
            <div className="w-full h-[320px] relative bg-[#0F172A]">
               <img src={data.bannerImage} alt="Estate" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
            </div>

            {/* ================= EXECUTIVE PROFILE ================= */}
            <div className="px-6 relative -mt-24 z-10 mb-8">
               <div className="bg-white p-1 shadow-2xl">
                  <div className="border border-slate-200 p-6 flex flex-col items-center text-center bg-white relative overflow-hidden">

                     {/* Subtle accent corner */}
                     <div className="absolute top-0 right-0 w-16 h-16 bg-[#F8FAFC] border-b border-l border-slate-100 flex items-start justify-end p-2">
                        <FiBriefcase className="text-[#C2A05F]" size={16} />
                     </div>

                     <div className="w-24 h-24 bg-slate-100 border border-slate-200 shadow-inner mb-4 overflow-hidden">
                        <img src={data.profileImage} alt={data.displayName} className="w-full h-full object-cover" />
                     </div>

                     <h1 className="text-2xl font-serif font-bold text-[#0F172A] tracking-tight mb-1">{data.displayName}</h1>
                     <p className="text-[#C2A05F] font-bold text-xs uppercase tracking-widest mb-4">{data.role}</p>

                     {data.businessName && (
                        <div className="w-full py-2 bg-[#0F172A] text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                           {data.businessName}
                        </div>
                     )}

                     <p className="text-sm text-slate-600 leading-relaxed">
                        {data.bio}
                     </p>
                  </div>
               </div>
            </div>

            {/* ================= METRICS STRIP ================= */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="w-full bg-[#0F172A] text-white flex justify-between px-6 py-8 mb-8">
               {fictionalData.stats.map((stat, i) => (
                  <div key={i} className="text-center flex-1">
                     <span className="block text-xl font-serif text-[#C2A05F] mb-1">{stat.val}</span>
                     <span className="block text-[9px] uppercase tracking-widest text-slate-400 font-semibold">{stat.label}</span>
                  </div>
               ))}
            </motion.div>

            <div className="px-6 flex-1 space-y-12">

               {/* ================= ACTION BAR ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-2 gap-3">
                  {data.phone && (
                     <a href={`tel:${data.phone}`} className="bg-[#F8FAFC] border border-slate-200 py-4 flex flex-col items-center justify-center gap-2 hover:border-[#0F172A] transition-colors group">
                        <FiPhone size={18} className="text-[#0F172A] group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Direct Line</span>
                     </a>
                  )}
                  {data.email && (
                     <a href={`mailto:${data.email}`} className="bg-[#F8FAFC] border border-slate-200 py-4 flex flex-col items-center justify-center gap-2 hover:border-[#0F172A] transition-colors group">
                        <FiMail size={18} className="text-[#0F172A] group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Email</span>
                     </a>
                  )}
                  {data.website && (
                     <a href={`https://${data.website}`} target="_blank" rel="noopener noreferrer" className="col-span-2 bg-[#0F172A] text-white py-4 flex justify-between items-center px-6 hover:bg-slate-800 transition-colors group">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#C2A05F]">Visit Corporate Site</span>
                        <FiGlobe size={18} className="group-hover:animate-pulse" />
                     </a>
                  )}
               </motion.div>

               {/* ================= CORE ADVISORY (SERVICES) ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionTitle title="Expertise" subtitle="Advisory Services" />
                  <div className="space-y-4">
                     {fictionalData.services.map((svc, i) => (
                        <div key={i} className="flex gap-4 p-5 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                           <div className="mt-1 shrink-0">
                              <svc.icon size={24} className="text-[#0F172A]" />
                           </div>
                           <div>
                              <h4 className="text-sm font-bold text-[#0F172A] mb-1">{svc.title}</h4>
                              <p className="text-xs text-slate-600 leading-relaxed">{svc.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </motion.div>

               {/* ================= EXCLUSIVE PORTFOLIO ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionTitle title="Collection" subtitle="Featured Estates" />
                  <div className="space-y-6">
                     {fictionalData.portfolio.map((item, idx) => (
                        <div key={idx} className="bg-white border border-slate-200 shadow-sm cursor-pointer group">
                           <div className="h-48 w-full overflow-hidden relative">
                              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                              <div className="absolute top-4 left-4 bg-[#0F172A] text-white px-3 py-1 text-xs font-bold shadow-md">
                                 {item.price}
                              </div>
                           </div>
                           <div className="p-5">
                              <h4 className="text-base font-serif font-bold text-[#0F172A] mb-1">{item.title}</h4>
                              <p className="text-xs text-[#C2A05F] font-bold uppercase tracking-wide">{item.specs}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </motion.div>

               {/* ================= VIDEO PRESENTATION MOCKUP ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionTitle title="Media" subtitle="Market Outlook" />
                  <div className="relative w-full h-56 bg-slate-900 overflow-hidden group cursor-pointer border border-slate-200">
                     <img src={fictionalData.videoPresentation.thumbnail} alt="Video" className="w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity" />
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <FiPlayCircle size={48} className="text-white mb-3 drop-shadow-lg group-hover:scale-110 transition-transform" />
                        <span className="text-white font-bold text-sm tracking-wider uppercase drop-shadow-md">{fictionalData.videoPresentation.title}</span>
                     </div>
                  </div>
               </motion.div>

               {/* ================= CLIENT ENDORSEMENTS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionTitle title="Reputation" subtitle="Client Testimonials" />
                  <div className="space-y-4">
                     {fictionalData.testimonials.map((test, i) => (
                        <div key={i} className="bg-[#F8FAFC] p-6 border-l-4 border-[#0F172A] shadow-sm relative">
                           <FaQuoteLeft className="absolute top-4 right-4 text-slate-200" size={24} />
                           <p className="text-sm text-slate-700 italic leading-relaxed mb-4 relative z-10 pr-6">"{test.text}"</p>
                           <div>
                              <span className="block font-bold text-[#0F172A] text-xs uppercase tracking-wider">{test.name}</span>
                              <span className="block text-[10px] text-[#C2A05F] font-bold uppercase mt-0.5">{test.role}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </motion.div>

               {/* ================= CONSULTATION FORM ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionTitle title="Inquiry" subtitle="Request Consultation" />
                  <div className="bg-white border border-slate-200 p-6 shadow-sm">
                     <div className="space-y-4 mb-6">
                        <input type="text" placeholder="Full Name" className="w-full bg-[#F8FAFC] border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0F172A]" />
                        <input type="email" placeholder="Email Address" className="w-full bg-[#F8FAFC] border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0F172A]" />
                        <textarea placeholder="Nature of Inquiry..." rows="3" className="w-full bg-[#F8FAFC] border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0F172A] resize-none"></textarea>
                     </div>
                     <button className="w-full bg-[#0F172A] text-white py-3.5 font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors">
                        Submit Inquiry
                     </button>
                  </div>
               </motion.div>

               {/* ================= LOGISTICS & FAQ ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionTitle title="Information" subtitle="Logistics & Advisory" />

                  {data.address && (
                     <div className="flex items-start gap-4 pb-5 border-b border-slate-200 mb-5">
                        <FiMapPin size={24} className="text-[#0F172A] shrink-0" />
                        <div>
                           <p className="text-[10px] uppercase tracking-widest font-bold text-[#C2A05F] mb-1">Headquarters</p>
                           <p className="text-sm font-semibold text-[#0F172A] leading-snug mb-1">{data.address}</p>
                        </div>
                     </div>
                  )}

                  <div className="mb-8">
                     <p className="text-[10px] uppercase tracking-widest font-bold text-[#C2A05F] mb-3 flex items-center gap-2"><FiClock className="text-[#0F172A]" /> Operating Hours</p>
                     <div className="bg-[#F8FAFC] p-4 border border-slate-200">
                        {fictionalData.hours.map((bh, i) => (
                           <div key={i} className="flex justify-between items-center py-2 text-xs border-b border-slate-100 last:border-0">
                              <span className="text-slate-600 font-medium">{bh.day}</span>
                              <span className="font-bold text-[#0F172A]">{bh.hours}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div>
                     <p className="text-[10px] uppercase tracking-widest font-bold text-[#C2A05F] mb-3">Client Advisory</p>
                     {fictionalData.faqs.map((faq, index) => <CorporateAccordion key={index} question={faq.question} answer={faq.answer} />)}
                  </div>
               </motion.div>

               {/* ================= QR CODE & SOCIALS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#0F172A] text-white p-8 text-center shadow-lg">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-[#C2A05F] mb-6">Digital VCard</h2>

                  <div className="w-40 h-40 mx-auto bg-white p-2 mb-6">
                     <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://vcard.link" alt="QR Code" className="w-full h-full" />
                  </div>

                  <div className="flex justify-center gap-4 mb-2">
                     {[
                        { val: data.linkedin, icon: FaLinkedinIn, link: `https://linkedin.com/in/${data.linkedin}` },
                        { val: data.twitter, icon: FaTwitter, link: `https://twitter.com/${data.twitter}` },
                        { val: data.instagram, icon: FaInstagram, link: `https://instagram.com/${data.instagram}` },
                        { val: data.whatsapp, icon: FaWhatsapp, link: `https://wa.me/${data.whatsapp}` }
                     ].map((social, i) => social.val && (
                        <a
                           key={i} href={social.link || null} target="_blank" rel="noopener noreferrer"
                           className="w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:bg-[#C2A05F] hover:border-[#C2A05F] transition-all"
                        >
                           <social.icon size={16} />
                        </a>
                     ))}
                  </div>
               </motion.div>

               {/* ================= SAVE CONTACT CTA (INLINE) ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="pb-4">
                  <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={() => downloadVCard(vCardData)}
                     className="w-full bg-[#0F172A] text-white py-5 font-bold text-sm uppercase tracking-widest shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                  >
                     <FiUserPlus size={18} className="text-[#C2A05F]" />
                     Save Contact Details
                  </motion.button>
               </motion.div>

            </div>

            {/* ================= FOOTER ================= */}
            <div className="pb-8 pt-6 text-center border-t border-slate-200">
               <PoweredBy />
            </div>

         </div>

         <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
      `}} />
      </div>
   );
};

export default ClassicRefined;