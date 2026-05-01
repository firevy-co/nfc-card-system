import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPhone, FiMail, FiGlobe, FiMapPin, FiInstagram, FiLinkedin,
  FiTwitter, FiUserPlus, FiChevronDown, FiStar, FiCoffee,
  FiAward, FiClock, FiMessageSquare, FiImage, FiArrowRight
} from 'react-icons/fi';
import { FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Minimalist Sub-components ---

const TimelineNode = ({ icon: Icon, title }) => (
  <div className="absolute -left-[29px] top-1 flex flex-col items-center gap-2 bg-[#0a0a0a] py-2 z-10">
    <div className="w-14 h-14 rounded-full border border-white/20 bg-[#0a0a0a] flex items-center justify-center text-white">
      {Icon && <Icon size={20} />}
    </div>
  </div>
);

const FaqAccordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/20 mb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left focus:outline-none group"
      >
        <span className="font-bold text-sm text-white uppercase tracking-widest">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <FiChevronDown size={20} className="text-white/50 group-hover:text-white transition-colors" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-6 text-white/50 text-sm leading-relaxed font-serif italic">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Component ---

const MonochromeTimeline = ({ userData }) => {
  // Completely Fictional Persona: Michelin-Star Chef
  const fictionalData = {
    displayName: "Julian Cross",
    role: "Executive Chef & Founder",
    businessName: "Lumina Restaurant Group",
    phone: "+1 (212) 555-8989",
    email: "chef@juliancross.com",
    website: "www.lumina-nyc.com",
    address: "142 West 57th Street, New York, NY",
    bio: "Redefining modern gastronomy through sustainable sourcing and avant-garde culinary techniques. Awarded two Michelin stars for an uncompromising dedication to flavor and art.",
    profileImage: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=400&fit=crop",
    instagram: "juliancross_chef",
    linkedin: "juliancross",
    twitter: "chef_cross",
    whatsapp: "12125558989",
    stats: [
      { label: "Michelin Stars", val: "2" },
      { label: "Restaurants", val: "3" },
      { label: "Years Exp", val: "15+" }
    ],
    services: [
      { title: "Private Dining", desc: "Exclusive 12-course tasting menus curated in the privacy of your estate or corporate venue.", price: "From $5k" },
      { title: "Consulting", desc: "Menu development, kitchen optimization, and concept creation for emerging hospitality brands.", price: "Custom" },
      { title: "Masterclasses", desc: "Intimate, hands-on culinary workshops focusing on molecular gastronomy and plating.", price: "$850/pp" }
    ],
    portfolio: [
      { title: "Charred Octopus", img: "https://images.unsplash.com/photo-1560706834-eea1eacb08b5?w=600&h=600&fit=crop" },
      { title: "Truffle Risotto", img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&h=600&fit=crop" },
      { title: "Lumina Interior", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=600&fit=crop" },
      { title: "Wagyu A5", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=600&fit=crop" }
    ],
    testimonials: [
      { text: "Julian Cross is an artist. Lumina provides not just a meal, but a profound sensory experience. A triumph of modern dining.", author: "The New York Times", label: "Critic Review" },
      { text: "Every plate is a canvas. The balance of textures and respect for local ingredients is simply unmatched in the city.", author: "Eater NYC", label: "Editorial" }
    ],
    hours: [
      { day: "Tuesday - Saturday", time: "5:30 PM - 11:00 PM" },
      { day: "Sunday - Monday", time: "Closed for Foraging" }
    ],
    faqs: [
      { question: "How far in advance should I reserve?", answer: "Reservations for Lumina open on the 1st of each month for the following month. We highly recommend booking exactly at 10:00 AM EST." },
      { question: "Do you accommodate dietary restrictions?", answer: "We require at least 72 hours' notice for severe allergies or dietary preferences to prepare a tailored tasting menu." },
      { question: "Is there a dress code?", answer: "We encourage elegant smart-casual attire. Jackets are preferred but not strictly required." }
    ]
  };

  const scrollVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // We are merging the passed userData simply for the downloadVCard functionality, 
  // but strictly displaying the fictional layout data.
  const vCardData = { ...userData, ...fictionalData };

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-white font-['Helvetica_Neue',Helvetica,Arial,sans-serif] selection:bg-white selection:text-black">

      {/* Heavy Noise Texture for Print Editorial Feel */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

      <div className="w-full max-w-lg mx-auto relative z-10 border-x border-white/10 min-h-screen pb-32">

        {/* ================= HERO COVER ================= */}
        <div className="w-full h-80 relative overflow-hidden grayscale contrast-125">
          <img src={fictionalData.coverImage} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>

        {/* ================= TIMELINE WRAPPER ================= */}
        {/* This creates the continuous vertical line down the left side */}
        <div className="relative pl-24 pr-8 -mt-20">
          <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-white/20" />

          {/* ----- SECTION 1: IDENTITY ----- */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={scrollVariants} className="relative pb-16 pt-8">
            <TimelineNode icon={FiStar} />

            <div className="mb-6">
              <img src={fictionalData.profileImage} alt={fictionalData.displayName} className="w-24 h-24 object-cover grayscale rounded-none border border-white/20" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-[0.85] mb-4">
              {fictionalData.displayName.split(' ').map((name, i) => <span key={i} className="block">{name}</span>)}
            </h1>

            <p className="text-white/60 uppercase tracking-[0.3em] text-[10px] font-bold mb-6 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-white/60" /> {fictionalData.role}
            </p>

            <p className="text-sm font-serif italic text-white/80 leading-relaxed mb-8">
              "{fictionalData.bio}"
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 border-y border-white/20 py-6">
              {fictionalData.stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-black mb-1">{stat.val}</span>
                  <span className="text-[9px] uppercase tracking-widest text-white/40">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ----- SECTION 2: COMMUNICATIONS ----- */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={scrollVariants} className="relative pb-16">
            <TimelineNode icon={FiGlobe} />
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-8 font-bold">Communications</h2>

            <div className="flex flex-col gap-1">
              <a href={`tel:${fictionalData.phone}`} className="flex items-center justify-between py-4 border-b border-white/10 hover:border-white transition-colors group">
                <span className="text-sm font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Telephone</span>
                <span className="text-sm font-serif italic">{fictionalData.phone}</span>
              </a>
              <a href={`mailto:${fictionalData.email}`} className="flex items-center justify-between py-4 border-b border-white/10 hover:border-white transition-colors group">
                <span className="text-sm font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Email</span>
                <span className="text-sm font-serif italic truncate max-w-[150px]">{fictionalData.email}</span>
              </a>
              <a href={`https://${fictionalData.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between py-4 border-b border-white/10 hover:border-white transition-colors group">
                <span className="text-sm font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Website</span>
                <span className="text-sm font-serif italic flex items-center gap-2">
                  {fictionalData.website} <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </a>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(fictionalData.address)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between py-4 border-b border-white/10 hover:border-white transition-colors group">
                <span className="text-sm font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Location</span>
                <span className="text-sm font-serif italic truncate max-w-[150px]">{fictionalData.address}</span>
              </a>
            </div>
          </motion.div>

          {/* ----- SECTION 3: OFFERINGS ----- */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={scrollVariants} className="relative pb-16">
            <TimelineNode icon={FiCoffee} />
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-8 font-bold">Offerings</h2>

            <div className="space-y-6">
              {fictionalData.services.map((svc, i) => (
                <div key={i} className="group cursor-default">
                  <div className="flex justify-between items-end mb-2">
                    <h3 className="text-lg font-bold uppercase tracking-widest group-hover:pl-2 transition-all">{svc.title}</h3>
                    <span className="text-xs font-serif italic text-white/50">{svc.price}</span>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed font-serif">{svc.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ----- SECTION 4: GALLERY ----- */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={scrollVariants} className="relative pb-16">
            <TimelineNode icon={FiImage} />
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-8 font-bold">Visual Archive</h2>

            <div className="grid grid-cols-2 gap-4">
              {fictionalData.portfolio.map((item, idx) => (
                <div key={idx} className={`relative group overflow-hidden border border-white/20 ${idx === 0 || idx === 3 ? 'aspect-square' : 'aspect-[3/4]'}`}>
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                    <span className="font-bold uppercase tracking-widest text-[10px]">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ----- SECTION 5: PRESS / REVIEWS ----- */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={scrollVariants} className="relative pb-16">
            <TimelineNode icon={FiMessageSquare} />
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-8 font-bold">Press & Accolades</h2>

            <div className="space-y-8">
              {fictionalData.testimonials.map((test, i) => (
                <blockquote key={i} className="border-l-2 border-white pl-6">
                  <p className="text-lg font-serif italic leading-relaxed mb-4">"{test.text}"</p>
                  <footer className="flex items-center gap-3">
                    <span className="w-6 h-[1px] bg-white/40" />
                    <span className="text-xs font-bold uppercase tracking-widest">{test.author}</span>
                    <span className="text-[9px] text-white/40 border border-white/20 px-2 py-0.5 rounded-full uppercase tracking-widest">{test.label}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </motion.div>

          {/* ----- SECTION 6: LOGISTICS & FAQ ----- */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={scrollVariants} className="relative pb-16">
            <TimelineNode icon={FiClock} />
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-8 font-bold">Logistics</h2>

            {/* Hours */}
            <div className="mb-10 bg-[#111] p-6 border border-white/10">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-6 font-bold text-center">Hours of Operation</h3>
              {fictionalData.hours.map((bh, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0 font-serif text-sm">
                  <span className="text-white/60">{bh.day}</span>
                  <span className="text-white">{bh.time}</span>
                </div>
              ))}
            </div>

            {/* FAQs */}
            <div>
              {fictionalData.faqs.map((faq, index) => <FaqAccordion key={index} question={faq.question} answer={faq.answer} />)}
            </div>
          </motion.div>

          {/* ----- SECTION 7: SOCIALS & ACTION ----- */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={scrollVariants} className="relative pb-10">
            <TimelineNode icon={FiUserPlus} />
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-8 font-bold">Network Integration</h2>

            <div className="flex flex-wrap gap-4 mb-12">
              {[
                { val: fictionalData.instagram, icon: FiInstagram, link: `https://instagram.com/${fictionalData.instagram}` },
                { val: fictionalData.linkedin, icon: FiLinkedin, link: `https://linkedin.com/in/${fictionalData.linkedin}` },
                { val: fictionalData.twitter, icon: FiTwitter, link: `https://twitter.com/${fictionalData.twitter}` },
                { val: fictionalData.whatsapp, icon: FaWhatsapp, link: `https://wa.me/${fictionalData.whatsapp}` }
              ].map((social, i) => social.val && (
                <a
                  key={i} href={social.link} target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-colors"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>

            {/* Brutalist Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => downloadVCard(vCardData)}
              className="w-full bg-white text-black py-6 font-black text-sm uppercase tracking-[0.4em] hover:bg-black hover:text-white border border-white transition-colors"
            >
              Save Identity
            </motion.button>
          </motion.div>

        </div>

        {/* Footer */}
        <div className="text-center pb-8 border-t border-white/10 pt-8 mt-8">
          <PoweredBy />
        </div>

      </div>
    </div>
  );
};

export default MonochromeTimeline;