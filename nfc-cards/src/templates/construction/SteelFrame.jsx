import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FiPhone, FiMail, FiGlobe, FiMapPin, FiWind,
   FiSun, FiLayers, FiArrowUpRight, FiChevronDown,
   FiDownload, FiTarget, FiImage, FiClock, FiCheckCircle
} from 'react-icons/fi';
import { FaLinkedinIn, FaTwitter, FaInstagram, FaLeaf } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Eco-Sustainable Sub-components ---

const OrganicCard = ({ title, icon: Icon, children, delay = 0 }) => (
   <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border border-[#E8EFEA] rounded-[2rem] p-6 shadow-[0_15px_40px_rgba(6,78,59,0.04)] mb-6 relative overflow-hidden"
   >
      {title && (
         <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E8EFEA]">
            {Icon && (
               <div className="w-10 h-10 rounded-full bg-[#ECFDF5] flex items-center justify-center text-[#10B981]">
                  <Icon size={18} />
               </div>
            )}
            <h3 className="font-['Playfair_Display',serif] text-lg font-bold text-[#064E3B]">{title}</h3>
         </div>
      )}
      <div className="relative z-10">{children}</div>
   </motion.div>
);

const EcoAccordion = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border-b border-[#E8EFEA] last:border-0">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full py-5 flex justify-between items-center text-left focus:outline-none group"
         >
            <span className="font-semibold text-sm text-[#1C2E2A] group-hover:text-[#10B981] transition-colors pr-4">{question}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="w-8 h-8 rounded-full bg-[#F4F7F5] flex items-center justify-center shrink-0 group-hover:bg-[#ECFDF5] transition-colors">
               <FiChevronDown size={16} className="text-[#064E3B]" />
            </motion.div>
         </button>
         <AnimatePresence>
            {isOpen && (
               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <div className="pb-5 pt-1 pl-4 border-l-2 border-[#10B981] ml-4">
                     <p className="text-[#4A605B] text-sm leading-relaxed font-light">
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

const SteelFrame = ({ userData }) => {

   // Safe URL Formatter
   const formatUrl = (url) => {
      if (!url) return null;
      const stringUrl = String(url).trim();
      if (stringUrl === "") return null;
      return stringUrl.startsWith('http') ? stringUrl : `https://${stringUrl}`;
   };

   // Fictional Data: Sustainable / Eco-Construction Firm
   const fictionalData = {
      displayName: "Elena Rostova",
      role: "Chief Sustainability Engineer",
      phone: "+1 (206) 555-0144",
      email: "elena@terraform-eco.build",
      website: "www.terraform-eco.build",
      address: "Cascadia Green Hub, Seattle, WA",
      businessName: "TerraForm Developments",
      bio: "Pioneering carbon-negative infrastructure. We fuse cross-laminated timber (CLT) with passive climate systems to build environments that breathe, adapt, and restore our ecosystem.",
      defaultAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      bannerImage: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200&h=800&fit=crop", // Green architecture
      linkedin: "elena-rostova-eco",
      twitter: "terraform_builds",
      instagram: "terraform.eco",
      impactStats: [
         { label: "Carbon Offset", val: "12k Tons", icon: FiWind },
         { label: "LEED Platinum", val: "24 Sites", icon: FiSun },
         { label: "Net Zero", val: "100%", icon: FiTarget }
      ],
      methodologies: [
         { title: "Cross-Laminated Timber", desc: "Sustainably harvested structural timber replacing high-carbon steel and concrete.", icon: FiLayers },
         { title: "Passive Bioclimatics", desc: "Architectural modeling that utilizes natural wind and solar cycles for heating and cooling.", icon: FiSun },
         { title: "Living Facades", desc: "Integrated vertical ecosystems that filter urban air and regulate internal moisture.", icon: FaLeaf }
      ],
      projects: [
         { title: "Arboretum Tower", location: "Vancouver, BC", metric: "LEED Platinum", img: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=600&h=600&fit=crop" },
         { title: "Oasis Civic Center", location: "Portland, OR", metric: "Net Zero Energy", img: "https://images.unsplash.com/photo-1448842680459-0df44eb4bc71?w=600&h=600&fit=crop" },
         { title: "The Canopy Lofts", location: "Seattle, WA", metric: "Timber Frame", img: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=600&h=600&fit=crop" }
      ],
      hours: [
         { day: "Site Operations", hours: "06:00 AM - 03:00 PM" },
         { day: "Design Studio", hours: "09:00 AM - 05:00 PM" }
      ],
      faqs: [
         { question: "What makes a building 'Carbon Negative'?", answer: "A carbon-negative building generates more renewable energy than it consumes, and utilizes materials (like timber) that sequester more carbon than was emitted during their production and transport." },
         { question: "Is mass timber as strong as steel?", answer: "Yes. Cross-Laminated Timber (CLT) meets or exceeds the structural and fire-safety requirements of steel and concrete, while weighing significantly less." },
         { question: "Do you offer eco-retrofitting for existing structures?", answer: "Absolutely. We specialize in deep energy retrofits, upgrading HVAC systems, improving envelope insulation, and integrating green roofs into existing urban buildings." }
      ]
   };

   const data = {
      displayName: userData?.displayName || fictionalData.displayName,
      role: userData?.designation || userData?.role || fictionalData.role,
      phone: userData?.mobileNumber || userData?.phone || fictionalData.phone,
      email: userData?.email || fictionalData.email,
      website: userData?.website || fictionalData.website,
      address: userData?.address || userData?.city || fictionalData.address,
      companyName: userData?.companyName || fictionalData.businessName,
      bio: userData?.bio || fictionalData.bio,
      avatar: userData?.avatar,
      logo: userData?.logo,
      linkedin: userData?.linkedin || fictionalData.linkedin,
      twitter: userData?.twitter || fictionalData.twitter,
      instagram: userData?.instagram || fictionalData.instagram,
   };

   const vCardData = { ...userData, ...fictionalData };

   const fadeUp = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
   };

   return (
      <div className="w-full min-h-screen bg-[#F4F7F5] text-[#1C2E2A] font-['Inter',sans-serif] selection:bg-[#10B981] selection:text-white flex justify-center pb-12 overflow-x-hidden md:py-8">

         {/* Main App Container */}
         <div className="w-full max-w-[480px] relative z-10 bg-[#FAFCFB] shadow-[0_20px_60px_rgba(6,78,59,0.08)] min-h-screen md:rounded-[3rem] flex flex-col overflow-hidden">

            {/* ================= HERO IDENTITY (Organic Curve) ================= */}
            <div className="w-full relative">
               <div className="w-full h-[280px] relative rounded-b-[3rem] overflow-hidden shadow-sm">
                  <img src={fictionalData.bannerImage} alt="Green Architecture" className="w-full h-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B]/80 via-[#064E3B]/20 to-transparent" />
               </div>

               <div className="w-full px-6 flex flex-col items-center relative z-20 -mt-16">
                  <motion.div
                     initial={{ scale: 0.9, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ duration: 0.8, ease: "easeOut", type: "spring", bounce: 0.4 }}
                     className="relative mb-4"
                  >
                     <div className="w-32 h-32 bg-white p-1.5 rounded-full relative z-10 shadow-[0_10px_30px_rgba(6,78,59,0.15)]">
                        <div className="w-full h-full rounded-full overflow-hidden bg-[#F4F7F5] flex items-center justify-center">
                           {data.avatar ? (
                              <img src={data.avatar} alt="Profile" className="w-full h-full object-cover" />
                           ) : data.logo ? (
                              <img src={data.logo} alt="Logo" className="w-full h-full object-contain p-4" />
                           ) : (
                              <img src={fictionalData.defaultAvatar} alt="Default Profile" className="w-full h-full object-cover" />
                           )}
                        </div>
                     </div>
                  </motion.div>

                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-center w-full">
                     {data.companyName && (
                        <div className="inline-flex items-center justify-center gap-2 bg-[#ECFDF5] border border-[#A7F3D0] px-4 py-1.5 rounded-full mb-4 shadow-sm">
                           <FaLeaf className="text-[#10B981]" size={12} />
                           <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#064E3B]">{data.companyName}</span>
                        </div>
                     )}

                     <h1 className="text-3xl font-black font-['Playfair_Display',serif] text-[#064E3B] tracking-tight mb-2">
                        {data.displayName}
                     </h1>

                     <p className="text-[#10B981] font-bold text-xs uppercase tracking-[0.2em] mb-6">
                        {data.role}
                     </p>

                     {data.bio && (
                        <p className="text-sm text-[#4A605B] leading-relaxed font-medium px-2">
                           {data.bio}
                        </p>
                     )}
                  </motion.div>
               </div>
            </div>

            <div className="px-5 flex-1 space-y-2 pb-8 z-20 mt-8">

               {/* ================= ECOLOGICAL METRICS ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-3 gap-3 mb-6">
                  {fictionalData.impactStats.map((stat, i) => (
                     <div key={i} className="bg-white border border-[#E8EFEA] rounded-[1.5rem] p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow group">
                        <stat.icon className="mb-2 text-[#10B981] group-hover:scale-110 transition-transform" size={20} />
                        <span className="block text-sm font-black text-[#064E3B] tracking-tight mb-0.5">{stat.val}</span>
                        <span className="block text-[8px] uppercase tracking-widest text-[#4A605B] font-bold">{stat.label}</span>
                     </div>
                  ))}
               </motion.div>

               {/* ================= CONTACT DIRECTORY ================= */}
               <OrganicCard delay={0.1}>
                  <div className="space-y-3">
                     {[
                        { icon: FiPhone, link: `tel:${data.phone}`, label: "Site Operations", val: data.phone },
                        { icon: FiMail, link: `mailto:${data.email}`, label: "Email Studio", val: "Send Message" },
                        { icon: FiGlobe, link: formatUrl(data.website), label: "Project Portal", val: "View Website" }
                     ].map((action, i) => action.link && (
                        <a key={i} href={action.link} target="_blank" rel="noopener noreferrer" className="bg-[#FAFCFB] border border-[#E8EFEA] rounded-2xl p-4 flex items-center gap-4 hover:bg-[#ECFDF5] hover:border-[#A7F3D0] transition-all group shadow-sm">
                           <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#10B981] shrink-0 shadow-sm group-hover:bg-[#10B981] group-hover:text-white transition-colors">
                              <action.icon size={16} />
                           </div>
                           <div>
                              <span className="block text-[9px] font-bold uppercase tracking-widest text-[#4A605B] mb-0.5">{action.label}</span>
                              <span className="block text-sm font-bold text-[#064E3B]">{action.val}</span>
                           </div>
                           <FiArrowUpRight className="ml-auto text-[#A7F3D0] group-hover:text-[#10B981] transition-colors" size={18} />
                        </a>
                     ))}
                  </div>
               </OrganicCard>

               {/* ================= GREEN METHODOLOGIES ================= */}
               <OrganicCard title="Sustainable Methodologies" icon={FiLayers} delay={0.2}>
                  <div className="space-y-5">
                     {fictionalData.methodologies.map((meth, i) => (
                        <div key={i} className="flex items-start gap-4 group">
                           <div className="w-12 h-12 rounded-2xl bg-[#F4F7F5] flex items-center justify-center text-[#064E3B] shrink-0 group-hover:bg-[#10B981] group-hover:text-white transition-colors border border-[#E8EFEA]">
                              <meth.icon size={20} />
                           </div>
                           <div>
                              <h4 className="text-sm font-bold text-[#064E3B] mb-1.5">{meth.title}</h4>
                              <p className="text-xs text-[#4A605B] leading-relaxed font-medium">{meth.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </OrganicCard>

               {/* ================= PROJECT SHOWCASE ================= */}
               <div className="pt-2 pb-4">
                  <div className="flex items-center gap-3 mb-4 px-2">
                     <FiImage size={18} className="text-[#10B981]" />
                     <h3 className="font-['Playfair_Display',serif] text-lg font-bold text-[#064E3B]">Featured Ecosystems</h3>
                  </div>
                  <div className="flex overflow-x-auto gap-4 snap-x hide-scrollbar px-2 pb-6">
                     {fictionalData.projects.map((item, idx) => (
                        <div key={idx} className="min-w-[220px] snap-center group cursor-pointer">
                           <div className="h-[240px] w-full rounded-[2rem] overflow-hidden relative mb-3 shadow-sm border border-[#E8EFEA]">
                              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#064E3B] font-bold text-[9px] uppercase px-3 py-1.5 rounded-full shadow-sm">
                                 {item.metric}
                              </div>
                           </div>
                           <div className="px-1 text-center">
                              <h4 className="text-sm font-bold text-[#064E3B] mb-0.5">{item.title}</h4>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-[#10B981]">{item.location}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* ================= HQ & LOGISTICS ================= */}
               <OrganicCard title="Operations & Logistics" icon={FiClock} delay={0.4}>
                  {data.address && (
                     <div className="bg-[#ECFDF5] border border-[#A7F3D0] p-4 rounded-2xl mb-6 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#10B981] shrink-0 shadow-sm">
                           <FiMapPin size={16} />
                        </div>
                        <div>
                           <p className="text-[9px] uppercase tracking-widest font-bold text-[#064E3B]/60 mb-0.5">Primary Site</p>
                           <p className="text-sm font-bold text-[#064E3B]">{data.address}</p>
                        </div>
                     </div>
                  )}

                  <div className="bg-[#FAFCFB] border border-[#E8EFEA] rounded-2xl p-4 mb-6">
                     {fictionalData.hours.map((bh, i) => (
                        <div key={i} className="flex justify-between items-center py-2 text-xs border-b border-[#E8EFEA] last:border-0 font-medium">
                           <span className="text-[#4A605B]">{bh.day}</span>
                           <span className="font-bold text-[#064E3B]">{bh.hours}</span>
                        </div>
                     ))}
                  </div>

                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#10B981] mb-3 pl-1">Client Advisory</h4>
                  <div className="border border-[#E8EFEA] rounded-2xl overflow-hidden bg-white">
                     {fictionalData.faqs.map((faq, index) => <EcoAccordion key={index} question={faq.question} answer={faq.answer} />)}
                  </div>
               </OrganicCard>

               {/* ================= SOCIAL NETWORK ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="py-2">
                  <div className="flex justify-center gap-4">
                     {[
                        { val: data.linkedin, icon: FaLinkedinIn, link: `https://linkedin.com/in/${data.linkedin}` },
                        { val: data.twitter, icon: FaTwitter, link: `https://twitter.com/${data.twitter}` },
                        { val: data.instagram, icon: FaInstagram, link: `https://instagram.com/${data.instagram}` }
                     ].map((social, i) => social.val && (
                        <a
                           key={i} href={formatUrl(social.link.replace(/([^:]\/)\/+/g, "$1"))} target="_blank" rel="noopener noreferrer"
                           className="w-12 h-12 bg-white border border-[#E8EFEA] flex items-center justify-center text-[#4A605B] hover:text-white hover:bg-[#10B981] hover:border-[#10B981] transition-all rounded-full shadow-sm hover:shadow-md hover:-translate-y-1"
                        >
                           <social.icon size={18} />
                        </a>
                     ))}
                  </div>
               </motion.div>

               {/* ================= SAVE CONTACT CTA (INLINE) ================= */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="pt-4 pb-4">
                  <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={() => downloadVCard(vCardData)}
                     className="w-full bg-[#064E3B] text-white py-4.5 rounded-full font-bold text-[13px] tracking-[0.15em] uppercase shadow-[0_10px_30px_rgba(6,78,59,0.2)] flex items-center justify-center gap-3 transition-all hover:bg-[#10B981] h-[60px]"
                  >
                     <FiDownload size={20} />
                     Save Identity Profile
                  </motion.button>
               </motion.div>

            </div>

            {/* ================= FOOTER ================= */}
            <div className="w-full py-6 text-center border-t border-[#E8EFEA] bg-[#FAFCFB] mt-auto relative z-20">
               <PoweredBy />
            </div>

         </div>

         <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap');
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      </div>
   );
};

export default SteelFrame;