import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FiPhone, FiMail, FiGlobe, FiMapPin, FiInstagram, FiTwitter,
   FiUserPlus, FiPlus, FiMinus, FiRadio, FiMic, FiHeadphones,
   FiDisc, FiMusic, FiCoffee, FiStar, FiArrowUpRight
} from 'react-icons/fi';
import { FaSoundcloud, FaSpotify } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Vintage Sub-components ---

const SectionHeading = ({ title, subtitle }) => (
   <div className="mb-6 border-b-2 border-dashed border-[#2d2a26] pb-2">
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e65a37] block mb-1">Vol. 1 — {title}</span>
      <h2 className="text-3xl font-serif text-[#2d2a26] tracking-tight leading-none">{subtitle}</h2>
   </div>
);

const RetroAccordion = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="border-2 border-[#2d2a26] mb-3 bg-white shadow-[4px_4px_0_0_#2d2a26]">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-4 flex justify-between items-center text-left focus:outline-none bg-[#f4f1ea] hover:bg-[#e3b505] transition-colors"
         >
            <span className="font-bold text-sm uppercase tracking-wider text-[#2d2a26] pr-4">{question}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
               {isOpen ? <FiMinus size={20} className="text-[#2d2a26]" /> : <FiPlus size={20} className="text-[#2d2a26]" />}
            </motion.div>
         </button>
         <AnimatePresence>
            {isOpen && (
               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <div className="p-4 border-t-2 border-dashed border-[#2d2a26] bg-white">
                     <p className="text-[#2d2a26] font-mono text-xs leading-relaxed">{answer}</p>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

const Tag = ({ text, colorClass = "bg-[#e3b505]" }) => (
   <span className={`inline-block border-2 border-[#2d2a26] ${colorClass} px-2 py-1 text-[10px] font-black uppercase tracking-widest text-[#2d2a26] shadow-[2px_2px_0_0_#2d2a26]`}>
      {text}
   </span>
);

// --- Main Component ---

const VintageAudioEngineer = ({ userData }) => {
   // Fictional Persona: Analog Audio Engineer
   const fictionalData = {
      displayName: "Ollie Vance",
      role: "Analog Audio Engineer",
      phone: "+1 (323) 555-1974",
      email: "ollie@velvetgroove.studio",
      website: "www.velvetgroove.studio",
      address: "Echo Park, Los Angeles, CA",
      businessName: "Velvet Groove Studios",
      twitter: "ollie_analog",
      instagram: "velvetgroove_la",
      spotify: "ollievance",
      soundcloud: "velvetgroove",
      bio: "Capturing the warmth of analog in a sterile digital world. Specializing in vintage synth restoration, live room tracking, and direct-to-vinyl mastering.",
      profileImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop",
      bannerImage: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=1200&h=400&fit=crop",
      stats: [
         { label: "Records Cut", val: "240" },
         { label: "Tape Reels", val: "1.2k" },
         { label: "Grammys", val: "3" }
      ],
      gear: ["Neve 8028 Console", "Studer A827", "Roland RE-201", "Fairchild 670", "U87 Vintage"],
      services: [
         { title: "Live Tracking", desc: "Full band recording in a wood-paneled 1970s live room.", icon: FiMic, color: "bg-[#e65a37]" },
         { title: "Analog Mixing", desc: "Summing through vintage outboard gear for natural saturation.", icon: FiRadio, color: "bg-[#3f6153]" },
         { title: "Vinyl Mastering", desc: "Precision audio mastering optimized for lacquer cutting.", icon: FiDisc, color: "bg-[#e3b505]" }
      ],
      discography: [
         { title: "Midnight Sun", artist: "The Revelators", img: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=600&h=600&fit=crop" },
         { title: "Fuzzy Logic", artist: "Neon Dreams", img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&h=600&fit=crop" },
         { title: "Analog Heart", artist: "Sarah Jenkins", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop" },
         { title: "Reverberation", artist: "Sonic Youth", img: "https://images.unsplash.com/photo-1493225457124-a1a2a5956093?w=600&h=600&fit=crop" }
      ],
      reviews: [
         { quote: "Ollie doesn't just record music; he captures the dust, the sweat, and the soul of the performance.", publication: "Rolling Stone" },
         { quote: "The warmest, punchiest master we've ever received. Velvet Groove is the last bastion of true tone.", publication: "Tape Op Magazine" }
      ],
      rates: [
         { service: "Studio Day Rate (10hrs)", price: "$1,200" },
         { service: "Mixing per Track", price: "$650" },
         { service: "Analog Mastering", price: "$150/song" }
      ],
      faqs: [
         { question: "Do you allow digital plugins?", answer: "We use Pro Tools for capture, but 90% of our EQ and compression is done out-of-the-box using analog hardware." },
         { question: "Can I bring my own engineer?", answer: "Yes, dry studio rentals are available, but an assistant engineer must be present to operate the tape machines." },
         { question: "How long does vinyl mastering take?", answer: "Standard turnaround is 2 weeks. Expedited mastering is available for a 50% rush fee." }
      ]
   };

   // Merge for the button function, but display only fictional data
   const vCardData = { ...userData, ...fictionalData };

   const fadeUp = {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
   };

   return (
      <div className="w-full min-h-screen bg-[#f4f1ea] text-[#2d2a26] font-['Space_Mono',monospace] selection:bg-[#e65a37] selection:text-white pb-24 border-x-8 border-[#2d2a26] max-w-[500px] mx-auto">

         {/* Heavy Paper Texture */}
         <div className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

         <div className="relative z-10">

            {/* ================= TICKET HEADER ================= */}
            <div className="w-full relative border-b-4 border-[#2d2a26] bg-white">
               <div className="h-56 relative overflow-hidden sepia contrast-125 border-b-4 border-[#2d2a26]">
                  <img src={fictionalData.bannerImage} alt="Studio" className="w-full h-full object-cover" />
                  {/* Halftone Overlay */}
                  <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[radial-gradient(circle_at_center,black_1px,transparent_1px)] bg-[size:4px_4px]" />
               </div>

               {/* Ticket Stubs / Cutouts */}
               <div className="absolute -bottom-4 left-6 w-8 h-8 bg-[#f4f1ea] rounded-full border-t-4 border-[#2d2a26]" />
               <div className="absolute -bottom-4 right-6 w-8 h-8 bg-[#f4f1ea] rounded-full border-t-4 border-[#2d2a26]" />

               <div className="px-8 pb-10 pt-6 relative text-center">
                  <motion.div
                     initial={{ rotate: -5, scale: 0.9 }} animate={{ rotate: 3, scale: 1 }} transition={{ type: "spring" }}
                     className="w-32 h-32 mx-auto rounded-none border-4 border-[#2d2a26] bg-[#e3b505] p-1 shadow-[6px_6px_0_0_#2d2a26] -mt-24 mb-6 relative z-10"
                  >
                     <img src={fictionalData.profileImage} alt={fictionalData.displayName} className="w-full h-full object-cover grayscale contrast-150" />
                  </motion.div>

                  <h1 className="text-4xl font-serif font-black uppercase tracking-tighter text-[#2d2a26] leading-none mb-2">
                     {fictionalData.displayName}
                  </h1>
                  <p className="font-bold text-sm uppercase tracking-widest text-[#e65a37] mb-4">
                     {fictionalData.role}
                  </p>

                  <div className="inline-block border-2 border-dashed border-[#2d2a26] px-4 py-2 bg-[#f4f1ea] mb-6">
                     <span className="text-xs font-bold uppercase">{fictionalData.businessName}</span>
                  </div>

                  <p className="text-xs leading-relaxed font-serif text-center max-w-sm mx-auto font-medium">
                     "{fictionalData.bio}"
                  </p>
               </div>
            </div>

            {/* ================= STATS STRIP ================= */}
            <div className="flex border-b-4 border-[#2d2a26] bg-[#3f6153] text-[#f4f1ea]">
               {fictionalData.stats.map((stat, i) => (
                  <div key={i} className="flex-1 text-center py-4 border-r-2 border-[#2d2a26] last:border-r-0">
                     <span className="block text-2xl font-serif font-black">{stat.val}</span>
                     <span className="block text-[8px] uppercase tracking-widest font-bold mt-1 text-[#e3b505]">{stat.label}</span>
                  </div>
               ))}
            </div>

            <div className="p-6 space-y-12 mt-4">

               {/* ================= QUICK COMMS ================= */}
               <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionHeading title="Contact" subtitle="Dial In" />
                  <div className="grid grid-cols-2 gap-4">
                     {fictionalData.phone && (
                        <a href={`tel:${fictionalData.phone}`} className="border-2 border-[#2d2a26] bg-white p-4 shadow-[4px_4px_0_0_#2d2a26] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#e65a37] transition-all flex flex-col items-center gap-2 group">
                           <FiPhone size={24} className="text-[#2d2a26]" />
                           <span className="text-[10px] font-bold uppercase">Telephone</span>
                        </a>
                     )}
                     {fictionalData.email && (
                        <a href={`mailto:${fictionalData.email}`} className="border-2 border-[#2d2a26] bg-white p-4 shadow-[4px_4px_0_0_#2d2a26] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#e65a37] transition-all flex flex-col items-center gap-2 group">
                           <FiMail size={24} className="text-[#2d2a26]" />
                           <span className="text-[10px] font-bold uppercase">Telegram</span>
                        </a>
                     )}
                  </div>
               </motion.section>

               {/* ================= SERVICES ================= */}
               <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionHeading title="Arsenal" subtitle="Studio Services" />
                  <div className="space-y-4">
                     {fictionalData.services.map((svc, i) => (
                        <div key={i} className={`border-2 border-[#2d2a26] p-5 shadow-[4px_4px_0_0_#2d2a26] flex gap-4 ${svc.color}`}>
                           <div className="w-12 h-12 rounded-full border-2 border-[#2d2a26] bg-[#f4f1ea] flex items-center justify-center shrink-0">
                              <svc.icon size={20} className="text-[#2d2a26]" />
                           </div>
                           <div className="text-[#f4f1ea]">
                              <h4 className="font-serif font-black text-xl mb-1 text-white">{svc.title}</h4>
                              <p className="text-xs font-mono">{svc.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </motion.section>

               {/* ================= GEAR LOCKER ================= */}
               <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionHeading title="Hardware" subtitle="Gear Locker" />
                  <div className="flex flex-wrap gap-2 p-4 border-2 border-dashed border-[#2d2a26] bg-white">
                     {fictionalData.gear.map((item, idx) => (
                        <Tag key={idx} text={item} colorClass={idx % 2 === 0 ? 'bg-[#e3b505]' : 'bg-[#e65a37]'} />
                     ))}
                  </div>
               </motion.section>

               {/* ================= DISCOGRAPHY ================= */}
               <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionHeading title="Catalog" subtitle="Select Cuts" />
                  <div className="grid grid-cols-2 gap-4">
                     {fictionalData.discography.map((album, idx) => (
                        <div key={idx} className="border-2 border-[#2d2a26] bg-white shadow-[4px_4px_0_0_#2d2a26] p-2 group cursor-pointer">
                           <div className="aspect-square border-2 border-[#2d2a26] overflow-hidden relative mb-3">
                              <img src={album.img} alt={album.title} className="w-full h-full object-cover grayscale sepia contrast-125 group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-500" />
                              {/* Vinyl Hole Mock */}
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#f4f1ea] rounded-full border-2 border-[#2d2a26]" />
                           </div>
                           <h4 className="font-black text-[10px] uppercase truncate">{album.title}</h4>
                           <p className="text-[9px] font-bold text-[#e65a37] uppercase truncate">{album.artist}</p>
                        </div>
                     ))}
                  </div>
               </motion.section>

               {/* ================= PRESS REVIEWS ================= */}
               <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionHeading title="Press" subtitle="On The Record" />
                  <div className="space-y-6 relative">
                     <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#2d2a26]" />
                     {fictionalData.reviews.map((review, i) => (
                        <div key={i} className="pl-10 relative">
                           <div className="absolute left-[11px] top-1 w-3 h-3 bg-[#e3b505] border-2 border-[#2d2a26] rounded-full" />
                           <p className="font-serif italic text-sm leading-relaxed mb-2">"{review.quote}"</p>
                           <p className="font-black uppercase text-[10px] tracking-widest">— {review.publication}</p>
                        </div>
                     ))}
                  </div>
               </motion.section>

               {/* ================= RATES & LOGISTICS ================= */}
               <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionHeading title="Booking" subtitle="Studio Rates" />
                  <div className="border-2 border-[#2d2a26] bg-white p-1 shadow-[4px_4px_0_0_#2d2a26]">
                     {fictionalData.rates.map((rate, i) => (
                        <div key={i} className="flex justify-between items-center py-3 px-4 border-b-2 border-dashed border-[#2d2a26] last:border-0">
                           <span className="font-bold text-xs uppercase">{rate.service}</span>
                           <span className="font-black text-sm text-[#3f6153]">{rate.price}</span>
                        </div>
                     ))}
                  </div>
               </motion.section>

               {/* ================= FAQ ================= */}
               <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionHeading title="FAQ" subtitle="Liner Notes" />
                  <div>
                     {fictionalData.faqs.map((faq, index) => (
                        <RetroAccordion key={index} question={faq.question} answer={faq.answer} />
                     ))}
                  </div>
               </motion.section>

               {/* ================= LOCATION & SOCIALS ================= */}
               <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <SectionHeading title="Links" subtitle="Find Us" />

                  {fictionalData.address && (
                     <a href={`https://maps.google.com/?q=${encodeURIComponent(fictionalData.address)}`} target="_blank" rel="noopener noreferrer" className="block border-2 border-[#2d2a26] bg-[#3f6153] p-4 shadow-[4px_4px_0_0_#2d2a26] mb-6 hover:-translate-y-1 transition-transform group">
                        <div className="flex items-center gap-3 text-[#f4f1ea]">
                           <FiMapPin size={20} className="shrink-0 text-[#e3b505]" />
                           <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-[#e3b505] mb-1">Studio Location</p>
                              <p className="text-sm font-serif font-bold">{fictionalData.address}</p>
                           </div>
                        </div>
                     </a>
                  )}

                  <div className="grid grid-cols-4 gap-3">
                     {[
                        { val: fictionalData.instagram, icon: FiInstagram, link: `https://instagram.com/${fictionalData.instagram}`, bg: 'bg-[#e65a37]' },
                        { val: fictionalData.twitter, icon: FiTwitter, link: `https://twitter.com/${fictionalData.twitter}`, bg: 'bg-[#e3b505]' },
                        { val: fictionalData.spotify, icon: FaSpotify, link: `https://spotify.com/artist/${fictionalData.spotify}`, bg: 'bg-[#3f6153]' },
                        { val: fictionalData.soundcloud, icon: FaSoundcloud, link: `https://soundcloud.com/${fictionalData.soundcloud}`, bg: 'bg-white' }
                     ].map((social, i) => social.val && (
                        <a
                           key={i} href={social.link} target="_blank" rel="noopener noreferrer"
                           className={`aspect-square flex items-center justify-center border-2 border-[#2d2a26] ${social.bg} shadow-[4px_4px_0_0_#2d2a26] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#2d2a26] transition-all ${social.bg === 'bg-[#3f6153]' ? 'text-[#f4f1ea]' : 'text-[#2d2a26]'}`}
                        >
                           <social.icon size={24} />
                        </a>
                     ))}
                  </div>
               </motion.section>

            </div>

            {/* ================= SAVE CONTACT CTA ================= */}
            <div className="px-6 pb-12">
               <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => downloadVCard(vCardData)}
                  className="w-full bg-[#e3b505] text-[#2d2a26] py-5 border-4 border-[#2d2a26] shadow-[6px_6px_0_0_#2d2a26] hover:bg-[#e65a37] hover:text-[#f4f1ea] transition-colors flex items-center justify-center gap-3 relative overflow-hidden"
               >
                  {/* Tape strips visual */}
                  <div className="absolute -top-2 -left-4 w-12 h-6 bg-white/40 rotate-12 backdrop-blur-sm" />
                  <div className="absolute -bottom-2 -right-4 w-12 h-6 bg-white/40 rotate-12 backdrop-blur-sm" />

                  <FiUserPlus size={20} />
                  <span className="font-black uppercase tracking-widest text-sm">Save Contact</span>
               </motion.button>
            </div>

            <div className="pt-4 pb-8 text-center border-t-4 border-[#2d2a26] bg-white">
               <PoweredBy />
            </div>

         </div>

         <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=DM+Serif+Display:ital@0;1&display=swap');
        .font-serif { font-family: 'DM Serif Display', serif; }
        .font-mono { font-family: 'Space Mono', monospace; }
      `}} />
      </div>
   );
};

export default VintageAudioEngineer;