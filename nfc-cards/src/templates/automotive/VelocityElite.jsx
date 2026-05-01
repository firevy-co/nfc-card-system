import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FiPhone, FiMail, FiGlobe, FiMapPin, FiInstagram, FiLinkedin,
   FiTwitter, FiUserPlus, FiChevronDown, FiBriefcase, FiShield,
   FiStar, FiClock, FiCompass, FiSend, FiAward, FiCheckCircle
} from 'react-icons/fi';
import { FaWhatsapp, FaPlaneDeparture, FaPlane } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Executive Sub-components ---

const ExecutiveCard = ({ title, icon: Icon, children, delay = 0 }) => (
   <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl shadow-[0_10px_30px_rgba(10,17,40,0.05)] border border-slate-100 overflow-hidden mb-6"
   >
      {title && (
         <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center gap-3">
            {Icon && <Icon className="text-[#D4AF37]" size={18} />}
            <h3 className="font-serif font-bold text-[#0A1128] text-lg tracking-wide uppercase">{title}</h3>
         </div>
      )}
      <div className="p-6">
         {children}
      </div>
   </motion.div>
);

const GoldAccordion = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border-b border-slate-200 last:border-0">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full py-4 flex justify-between items-center text-left focus:outline-none group"
         >
            <span className="font-bold text-sm text-[#0A1128] pr-4 group-hover:text-[#D4AF37] transition-colors">{question}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
               <FiChevronDown size={18} className="text-slate-400 group-hover:text-[#D4AF37]" />
            </motion.div>
         </button>
         <AnimatePresence>
            {isOpen && (
               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <p className="pb-4 text-slate-600 text-sm leading-relaxed font-sans">
                     {answer}
                  </p>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

// --- Main Component ---

const VelocityElite = ({ userData }) => {
   // Completely Fictional Persona: Private Aviation Broker
   const fictionalData = {
      displayName: "Arthur Sterling",
      role: "VP of Global Charters",
      phone: "+1 (800) 555-JETS",
      email: "arthur@velocityelite.aero",
      website: "www.velocityelite.aero",
      address: "Teterboro Airport, Hangar 4, NJ",
      businessName: "Velocity Elite Charters",
      twitter: "velocity_elite",
      instagram: "velocityelite_aero",
      linkedin: "arthursterling",
      whatsapp: "18005550000",
      bio: "Unparalleled access to the world's most exclusive private aircraft. We specialize in discreet, on-demand global travel for high-net-worth individuals, executives, and royal families.",
      profileImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop",
      bannerImage: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&h=600&fit=crop",
      stats: [
         { label: "Global Fleet", val: "3,500+" },
         { label: "Safe Flights", val: "12k+" },
         { label: "Countries", val: "185" }
      ],
      services: [
         { title: "On-Demand Charter", desc: "Aircraft access with as little as 4 hours' notice, worldwide.", icon: FaPlaneDeparture },
         { title: "Empty Leg Flights", desc: "Heavily discounted luxury routing for flexible travelers.", icon: FiCompass },
         { title: "Aircraft Management", desc: "Turnkey operational management and crew staffing for owners.", icon: FiShield }
      ],
      fleet: [
         { title: "Gulfstream G650", category: "Ultra-Long Range", img: "https://images.unsplash.com/photo-1583508462061-001091e92d6e?w=600&h=600&fit=crop" },
         { title: "Bombardier Global 7500", category: "Heavy Jet", img: "https://images.unsplash.com/photo-1605553073942-03f6f1a8e630?w=600&h=600&fit=crop" },
         { title: "Cessna Citation X", category: "Super Midsize", img: "https://images.unsplash.com/photo-1582236306352-8700a4025aeb?w=600&h=600&fit=crop" },
         { title: "Embraer Phenom 300", category: "Light Jet", img: "https://images.unsplash.com/photo-1579737920152-32d308f237f8?w=600&h=600&fit=crop" }
      ],
      testimonials: [
         { name: "Jonathan H.", role: "CEO, Capital Partners", text: "Arthur is the only broker I trust. When my board needed to be in Geneva overnight, he secured a G650 within two hours. Flawless execution." },
         { name: "Eleanor V.", role: "Private Owner", text: "Velocity Elite manages my personal aircraft. Their transparency, crew selection, and operational safety standards are the best in the industry." }
      ],
      hours: [
         { day: "Operations Desk", hours: "24/7/365 Global" },
         { day: "Executive Office", hours: "09:00 - 18:00 EST" }
      ],
      faqs: [
         { question: "What is your cancellation policy?", answer: "Cancellation terms vary by operator. Generally, cancellations made within 48 hours of departure may incur up to a 100% fee. Heavy jets during peak holidays have stricter terms." },
         { question: "Can I travel with pets?", answer: "Yes, many of our preferred operators are pet-friendly. We require advance notice to arrange the appropriate cabin protection and catering." },
         { question: "Do you arrange ground transportation?", answer: "Absolutely. We provide seamless door-to-door service, including tarmac access for chauffeured black cars and helicopter transfers directly from the FBO." }
      ]
   };

   const vCardData = { ...userData, ...fictionalData };

   return (
      <div className="w-full min-h-screen bg-[#F1F5F9] text-slate-800 font-['Lato',sans-serif] selection:bg-[#D4AF37] selection:text-white flex justify-center pb-28">

         <div className="w-full max-w-[500px] bg-[#F1F5F9] relative shadow-2xl min-h-screen border-x border-slate-200">

            {/* ================= HERO & HEADER ================= */}
            <div className="relative w-full h-[320px] bg-[#0A1128] overflow-hidden">
               <img src={fictionalData.bannerImage} alt="Aviation" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/50 to-transparent" />

               {/* Subtle Grid Pattern Overlay */}
               <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
            </div>

            {/* ================= OVERLAPPING IDENTITY ================= */}
            <div className="px-5 relative -mt-32 z-10">
               <motion.div
                  initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}
                  className="bg-white rounded-xl shadow-[0_20px_40px_rgba(10,17,40,0.1)] p-8 text-center border-t-4 border-[#D4AF37]"
               >
                  <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg -mt-20 mb-4 bg-white relative">
                     <img src={fictionalData.profileImage} alt={fictionalData.displayName} className="w-full h-full object-cover" />
                     {/* Verified Badge */}
                     <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#D4AF37] rounded-full border-2 border-white flex items-center justify-center">
                        <FiCheckCircle size={12} className="text-white" />
                     </div>
                  </div>

                  <h1 className="text-3xl font-serif font-black text-[#0A1128] tracking-tight mb-1">
                     {fictionalData.displayName}
                  </h1>
                  <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                     {fictionalData.role}
                  </p>

                  {fictionalData.businessName && (
                     <div className="inline-block bg-[#0A1128] text-white px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest mb-6">
                        {fictionalData.businessName}
                     </div>
                  )}

                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                     {fictionalData.bio}
                  </p>

                  {/* Metrics Ribbon */}
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
                     {fictionalData.stats.map((stat, i) => (
                        <div key={i} className="text-center flex-1">
                           <span className="block text-xl font-black text-[#0A1128] mb-1">{stat.val}</span>
                           <span className="block text-[9px] uppercase tracking-widest text-slate-400 font-bold">{stat.label}</span>
                        </div>
                     ))}
                  </div>
               </motion.div>
            </div>

            <div className="px-5 mt-6">

               {/* ================= FAST ACTION COMMS ================= */}
               <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                     {fictionalData.phone && (
                        <a href={`tel:${fictionalData.phone}`} className="bg-[#0A1128] text-white p-4 rounded-xl shadow-md hover:bg-[#D4AF37] transition-colors flex flex-col items-center gap-2 group">
                           <FiPhone size={20} className="text-[#D4AF37] group-hover:text-white transition-colors" />
                           <span className="text-[10px] font-bold uppercase tracking-widest">Concierge Line</span>
                        </a>
                     )}
                     {fictionalData.email && (
                        <a href={`mailto:${fictionalData.email}`} className="bg-white border border-slate-200 text-[#0A1128] p-4 rounded-xl shadow-sm hover:border-[#D4AF37] transition-colors flex flex-col items-center gap-2">
                           <FiMail size={20} className="text-[#D4AF37]" />
                           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Secure Email</span>
                        </a>
                     )}
                  </div>
               </motion.div>

               {/* ================= CORE SERVICES ================= */}
               <ExecutiveCard title="Aviation Solutions" icon={FaPlane}>
                  <div className="space-y-6">
                     {fictionalData.services.map((svc, i) => (
                        <div key={i} className="flex gap-4 group">
                           <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-[#0A1128] group-hover:text-[#D4AF37] transition-all text-[#0A1128]">
                              <svc.icon size={18} />
                           </div>
                           <div>
                              <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#0A1128] mb-1">{svc.title}</h4>
                              <p className="text-sm text-slate-500 leading-relaxed">{svc.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </ExecutiveCard>

               {/* ================= THE FLEET (GALLERY) ================= */}
               <ExecutiveCard title="Featured Fleet" icon={FiBriefcase}>
                  <div className="space-y-4">
                     {fictionalData.fleet.map((jet, idx) => (
                        <div key={idx} className="relative h-40 rounded-lg overflow-hidden group cursor-pointer shadow-sm">
                           <img src={jet.img} alt={jet.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                           <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/90 via-[#0A1128]/20 to-transparent flex flex-col justify-end p-4">
                              <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em] mb-1">{jet.category}</p>
                              <h4 className="text-white font-serif text-lg tracking-wide">{jet.title}</h4>
                           </div>
                        </div>
                     ))}
                  </div>
               </ExecutiveCard>

               {/* ================= TESTIMONIALS ================= */}
               <ExecutiveCard title="Client Protocol" icon={FiAward}>
                  <div className="space-y-6">
                     {fictionalData.testimonials.map((test, i) => (
                        <div key={i} className="bg-slate-50 p-5 rounded-lg border-l-2 border-[#D4AF37]">
                           <FiStar className="text-[#D4AF37] mb-3 fill-current" size={16} />
                           <p className="text-sm text-slate-700 leading-relaxed italic mb-4 font-serif">"{test.text}"</p>
                           <div className="flex justify-between items-center border-t border-slate-200 pt-3">
                              <span className="font-bold text-[#0A1128] text-xs uppercase tracking-wider">{test.name}</span>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{test.role}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </ExecutiveCard>

               {/* ================= CONTACT & LOGISTICS ================= */}
               <ExecutiveCard title="Operations Base" icon={FiMapPin}>
                  <div className="grid gap-6">
                     {fictionalData.address && (
                        <a href={`https://maps.google.com/?q=${encodeURIComponent(fictionalData.address)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg hover:bg-slate-100 transition-colors border border-slate-100">
                           <div className="text-[#D4AF37]"><FiMapPin size={24} /></div>
                           <div>
                              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Headquarters</p>
                              <p className="text-sm font-bold text-[#0A1128]">{fictionalData.address}</p>
                           </div>
                        </a>
                     )}

                     <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-3 border-b border-slate-100 pb-2">Flight Logistics</p>
                        {fictionalData.hours.map((bh, i) => (
                           <div key={i} className="flex justify-between items-center py-2">
                              <span className="text-sm font-semibold text-slate-600 flex items-center gap-2"><FiClock className="text-[#D4AF37]" size={14} /> {bh.day}</span>
                              <span className="text-sm font-bold text-[#0A1128]">{bh.hours}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </ExecutiveCard>

               {/* ================= FAQ ================= */}
               <ExecutiveCard title="Charter Policies" icon={FiShield}>
                  <div>
                     {fictionalData.faqs.map((faq, index) => (
                        <GoldAccordion key={index} question={faq.question} answer={faq.answer} />
                     ))}
                  </div>
               </ExecutiveCard>

               {/* ================= NETWORK & LINKS ================= */}
               <ExecutiveCard title="Global Network" icon={FiGlobe}>
                  {fictionalData.website && (
                     <a href={`https://${fictionalData.website}`} target="_blank" rel="noopener noreferrer" className="w-full bg-[#0A1128] text-white p-4 rounded-lg flex justify-between items-center hover:bg-[#D4AF37] transition-colors mb-6 shadow-md group">
                        <span className="font-bold text-xs uppercase tracking-widest">Access Private Portal</span>
                        <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                     </a>
                  )}

                  <div className="grid grid-cols-4 gap-3">
                     {[
                        { val: fictionalData.linkedin, icon: FiLinkedin, link: `https://linkedin.com/in/${fictionalData.linkedin}` },
                        { val: fictionalData.instagram, icon: FiInstagram, link: `https://instagram.com/${fictionalData.instagram}` },
                        { val: fictionalData.twitter, icon: FiTwitter, link: `https://twitter.com/${fictionalData.twitter}` },
                        { val: fictionalData.whatsapp, icon: FaWhatsapp, link: `https://wa.me/${fictionalData.whatsapp}` }
                     ].map((social, i) => social.val && (
                        <a
                           key={i} href={social.link} target="_blank" rel="noopener noreferrer"
                           className="aspect-square bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-[#0A1128] hover:bg-[#D4AF37] hover:text-white hover:border-[#D4AF37] transition-all shadow-sm"
                        >
                           <social.icon size={22} />
                        </a>
                     ))}
                  </div>
               </ExecutiveCard>

            </div>

            {/* ================= FIXED ACTION CTA ================= */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[460px] z-50">
               <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => downloadVCard(vCardData)}
                  className="w-full bg-[#D4AF37] text-[#0A1128] py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:bg-[#0A1128] hover:text-[#D4AF37] hover:shadow-[0_10px_30px_rgba(10,17,40,0.4)] transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
               >
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <FiUserPlus size={18} />
                  Add To VIP Contacts
               </motion.button>
            </div>

            <div className="pb-28 pt-4 text-center">
               <PoweredBy />
            </div>

         </div>

         {/* Font Injection */}
         <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Lato:wght@300;400;700;900&display=swap');
        .font-serif { font-family: 'Cinzel', serif; }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
      `}} />
      </div>
   );
};

export default VelocityElite;