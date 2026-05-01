import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPhone, FiMail, FiGlobe, FiMapPin, FiInstagram, FiLinkedin,
  FiTwitter, FiGithub, FiUserPlus, FiChevronDown, FiBriefcase,
  FiHome, FiImage, FiStar, FiClock, FiAward, FiLayout, FiCode,
  FiHexagon, FiTarget, FiTrendingUp, FiLayers, FiActivity
} from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaYoutube, FaTelegram } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Elegant Sub-components ---

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-8 text-center flex flex-col items-center">
    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-amber-500/80 mb-2">{title}</span>
    <h2 className="text-2xl font-serif text-white tracking-wide">{subtitle}</h2>
    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-4" />
  </div>
);

const FaqAccordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-white/10 mb-3 bg-[#0f1423]/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:border-amber-500/30 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex justify-between items-center text-left focus:outline-none"
      >
        <span className="font-medium text-sm text-white/90 pr-4">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <FiChevronDown size={18} className="text-amber-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="p-5 pt-0 text-white/50 text-sm leading-relaxed border-t border-white/5 mt-2">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Component ---

const PremiumEleganceExpanded = ({ userData }) => {
  // Ultra-Rich fallback data for maximum content display
  const {
    displayName = "Alexander Wright",
    email = "alex@luxedigital.io",
    role = "Principal Digital Architect",
    phone,
    mobileNumber = "+1 (555) 890-1234",
    website = "www.luxedigital.io",
    address = "The Innovation District, Suite 400, New York, NY",
    businessName = "Luxe Digital Architecture",
    instagram, linkedin, twitter, github = "alexwright", youtube, whatsapp = "15558901234", facebook, telegram,
    bio = "Crafting bespoke, high-performance digital storefronts and immersive web experiences for luxury brands and fine art curators.",
    mission = "My philosophy is rooted in the belief that digital luxury should feel effortless. I blend high-end aesthetic design with rigorous software engineering to create platforms that don't just sell, but tell a compelling brand story.",
    profileImage = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    bannerImage = "https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?w=1200&h=400&fit=crop",
    stats = [
      { label: "Years Exp.", value: "8+" },
      { label: "Projects", value: "120+" },
      { label: "Client Rating", value: "5.0" }
    ],
    skills = [
      "React.js", "Next.js", "Framer Motion", "Shopify Liquid",
      "Tailwind CSS", "Node.js", "Firebase", "UI/UX Design", "WebGL"
    ],
    experience = [
      { year: "2024 - Present", title: "Principal Architect", company: "Luxe Digital", desc: "Leading a boutique agency focused on high-ticket e-commerce solutions and immersive web experiences." },
      { year: "2021 - 2024", title: "Senior Frontend Engineer", company: "Elevate Commerce", desc: "Developed custom Shopify storefronts and headless commerce applications for global fashion brands." },
      { year: "2018 - 2021", title: "Web Developer", company: "Creative Studios NYC", desc: "Built interactive portfolios and landing pages using React and advanced CSS animations." }
    ],
    services = [
      { title: "Bespoke E-Commerce", desc: "Custom Shopify Liquid architectures tailored for high-ticket catalog viewing and seamless, secure transactions.", icon: FiLayout },
      { title: "React/Framer Engineering", desc: "Fluid, state-driven interfaces with premium Framer Motion animations that feel native and incredibly smooth.", icon: FiCode },
      { title: "Brand Identity Systems", desc: "Digital design languages, typography selection, and color theory built specifically for fine art and luxury sectors.", icon: FiHexagon },
      { title: "Performance Optimization", desc: "Rigorous code auditing and asset optimization to ensure your digital flagship loads instantly worldwide.", icon: FiActivity }
    ],
    portfolio = [
      { title: "Ovae Fine Art", category: "Informational Showcase", img: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&h=600&fit=crop" },
      { title: "Aura Jewelers", category: "Inquiry-Based Catalog", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop" },
      { title: "L'Reson", category: "Product Information Hub", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop" },
      { title: "Maison Noir", category: "Headless E-Commerce", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop" }
    ],
    testimonials = [
      { name: "Eleanor V.", role: "Gallery Director", text: "The custom catalog mode entirely elevated how our collectors interact with our pieces. Flawless execution and deep understanding of our market." },
      { name: "Marcus T.", role: "CEO, Fine Furniture", text: "Unmatched attention to detail. The custom configurator app integrated beautifully and increased our conversion rate by 40%." },
      { name: "Sophia L.", role: "Creative Director", text: "Working with Alexander was a revelation. He translated our visual identity into a digital experience that exceeded all expectations." }
    ],
    businessHours = [
      { day: "Monday - Thursday", hours: "10:00 AM - 07:00 PM" },
      { day: "Friday", hours: "10:00 AM - 04:00 PM" },
      { day: "Weekend", hours: "Reserved for Deep Work" }
    ],
    faqs = [
      { question: "Do you specialize in standard checkout or inquiry-based models?", answer: "I build both, but I specialize in custom inquiry-based and catalog-mode platforms specifically tailored for high-ticket items like fine jewelry, art, and luxury real estate where traditional checkout isn't appropriate." },
      { question: "Can you build custom configuration tools?", answer: "Yes, I develop multi-step React component tools (e.g., custom ring builders selecting stones, bands, and colors) integrated seamlessly into your existing storefront." },
      { question: "Do you offer ongoing maintenance after launch?", answer: "Absolutely. I offer exclusive retainer agreements to my clients to ensure their platforms remain secure, optimized, and updated with new features as their business scales." },
      { question: "How long does a typical custom build take?", answer: "A bespoke digital flagship typically takes between 6 to 12 weeks from initial architecture planning to final launch, depending on the complexity of custom features and animations." }
    ]
  } = userData || {};

  const finalPhone = phone || mobileNumber;

  // Refined Animation Variants
  const scrollReveal = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="w-full h-screen overflow-y-auto overflow-x-hidden scroll-smooth bg-[#0a0f1c] text-white font-['Inter',sans-serif] relative luxury-scrollbar">

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-amber-600/5 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-900/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05]" />
      </div>

      <div className="w-full max-w-md mx-auto relative z-10 min-h-screen pb-32 border-x border-white/5 bg-[#0a0f1c]/80 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.8)]">

        {/* ================= HERO SECTION ================= */}
        <section id="home" className="relative z-20 pb-8">
          <div className="w-full h-72 relative overflow-hidden">
            <img src={bannerImage} alt="Cover" className="w-full h-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/60 to-transparent" />
          </div>

          <div className="px-8 relative -mt-28 text-center flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-40 h-40 rounded-full overflow-hidden border-2 border-amber-500/40 p-1.5 bg-[#0a0f1c]/80 backdrop-blur-md shadow-[0_10px_40px_rgba(245,158,11,0.2)] mb-6 relative z-10"
            >
              <img src={profileImage} alt={displayName} className="w-full h-full object-cover rounded-full" />
            </motion.div>

            <h1 className="text-3xl font-serif font-medium tracking-wide text-white mb-2">{displayName}</h1>
            <p className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] mb-5">{role}</p>

            {businessName && (
              <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] text-white/70 text-[9px] font-bold uppercase tracking-[0.3em] px-5 py-2.5 rounded-full mb-8 backdrop-blur-sm">
                <FiAward className="text-amber-500" size={12} />
                {businessName}
              </div>
            )}

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 w-full mb-8 border-y border-white/10 py-6 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-2xl font-serif text-amber-500 mb-1">{stat.value}</span>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-white/40">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Primary CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => downloadVCard(userData)}
              className="w-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-black py-4.5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(245,158,11,0.2)] hover:shadow-[0_15px_40px_rgba(245,158,11,0.3)] transition-all flex items-center justify-center gap-3 bg-[length:200%_auto] hover:animate-gradient mb-8 h-14"
            >
              <FiUserPlus size={18} />
              Save to Contacts
            </motion.button>
          </div>
        </section>

        {/* ================= ABOUT & SKILLS ================= */}
        <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={scrollReveal} className="px-8 py-10 border-t border-white/5">
          <SectionTitle title="Identity" subtitle="About & Philosophy" />
          <div className="space-y-6">
            <p className="text-white/70 text-sm leading-relaxed font-light text-center">
              {bio}
            </p>
            <div className="p-6 rounded-2xl bg-[#0f1423]/40 border border-white/5 relative">
              <FiTarget className="absolute top-6 right-6 text-amber-500/20" size={40} />
              <p className="text-amber-500/90 text-sm leading-loose italic font-serif relative z-10">"{mission}"</p>
            </div>

            <div className="pt-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4 block text-center">Technical Arsenal</span>
              <div className="flex flex-wrap justify-center gap-2">
                {skills.map((skill, idx) => (
                  <span key={idx} className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-[10px] font-medium text-white/60 hover:text-amber-500 hover:border-amber-500/40 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ================= TIMELINE / EXPERIENCE ================= */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={scrollReveal} className="px-8 py-10 border-t border-white/5">
          <SectionTitle title="Journey" subtitle="Professional Timeline" />
          <div className="pl-4 border-l border-amber-500/20 space-y-8 mt-4">
            {experience.map((exp, idx) => (
              <div key={idx} className="relative pl-6">
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500/80 mb-1 block">{exp.year}</span>
                <h4 className="text-white font-serif text-lg mb-1">{exp.title}</h4>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3 font-bold">{exp.company}</p>
                <p className="text-white/60 text-sm leading-relaxed font-light">{exp.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ================= EXPERTISE / SERVICES ================= */}
        {services && services.length > 0 && (
          <motion.section id="services" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={scrollReveal} className="px-8 py-10 border-t border-white/5">
            <SectionTitle title="Expertise" subtitle="Specialized Services" />
            <div className="grid grid-cols-1 gap-5">
              {services.map((svc, i) => (
                <div key={i} className="p-7 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 hover:border-amber-500/40 transition-all group shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all">
                      <svc.icon size={20} />
                    </div>
                    <h4 className="text-white font-serif text-lg tracking-wide">{svc.title}</h4>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed font-light pl-1">{svc.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ================= PORTFOLIO / GALLERY ================= */}
        {portfolio && portfolio.length > 0 && (
          <motion.section id="portfolio" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={scrollReveal} className="px-8 py-10 border-t border-white/5">
            <SectionTitle title="Selected Work" subtitle="Digital Gallery" />
            <div className="space-y-8">
              {portfolio.map((item, index) => (
                <motion.div key={index} whileHover={{ y: -5 }} className="group relative rounded-[2rem] overflow-hidden cursor-pointer border border-white/10 shadow-2xl">
                  <div className="aspect-[4/3] w-full">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c]/90 via-[#0a0f1c]/30 to-transparent flex flex-col justify-end p-8">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500 mb-2">{item.category}</p>
                      <h4 className="text-white font-serif text-2xl">{item.title}</h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ================= TESTIMONIALS ================= */}
        {testimonials && testimonials.length > 0 && (
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={scrollReveal} className="px-8 py-10 border-t border-white/5 overflow-hidden">
            <SectionTitle title="Endorsements" subtitle="Client Relations" />
            <div className="flex overflow-x-auto gap-5 pb-8 pt-2 snap-x luxury-scrollbar -mx-8 px-8">
              {testimonials.map((test, i) => (
                <div key={i} className="min-w-[320px] p-8 rounded-[2rem] bg-[#0f1423]/60 border border-white/10 snap-center relative backdrop-blur-sm shadow-xl">
                  <FiStar className="absolute top-6 right-8 text-white/5" size={80} />
                  <div className="flex text-amber-500 mb-5 gap-1 relative z-10">
                    <FiStar size={14} className="fill-current" /><FiStar size={14} className="fill-current" /><FiStar size={14} className="fill-current" /><FiStar size={14} className="fill-current" /><FiStar size={14} className="fill-current" />
                  </div>
                  <p className="text-white/70 text-sm leading-loose italic mb-8 font-light relative z-10">"{test.text}"</p>
                  <div className="flex items-center gap-4 border-t border-white/10 pt-5 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-[#0a0f1c] font-black text-lg shadow-inner">
                      {test.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{test.name}</p>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">{test.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ================= BUSINESS HOURS & CONTACT INFO ================= */}
        <motion.section id="contact" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={scrollReveal} className="px-8 py-10 border-t border-white/5 grid gap-8">

          {/* Quick Communication Grid */}
          <div className="grid grid-cols-2 gap-4">
            {finalPhone && (
              <a href={`tel:${finalPhone}`} className="p-5 rounded-2xl bg-[#0f1423]/60 border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all group flex flex-col items-center text-center">
                <FiPhone className="text-amber-500 mb-3 group-hover:scale-110 transition-transform" size={24} />
                <span className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Direct Line</span>
                <span className="text-white text-sm font-medium">{finalPhone}</span>
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="p-5 rounded-2xl bg-[#0f1423]/60 border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all group flex flex-col items-center text-center overflow-hidden">
                <FiMail className="text-amber-500 mb-3 group-hover:scale-110 transition-transform" size={24} />
                <span className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Email</span>
                <span className="text-white text-sm font-medium truncate w-full">{email}</span>
              </a>
            )}
          </div>

          {address && (
            <div>
              <SectionTitle title="Headquarters" subtitle="Location" />
              <a href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-6 rounded-2xl bg-[#0f1423]/60 border border-white/10 hover:border-amber-500/30 transition-all group">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform mr-5 shrink-0">
                  <FiMapPin size={22} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1.5">Studio Address</p>
                  <p className="text-white/90 text-sm leading-relaxed">{address}</p>
                </div>
              </a>
            </div>
          )}

          {businessHours && businessHours.length > 0 && (
            <div>
              <div className="mb-6 text-center">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-amber-500/80 mb-2 block">Availability</span>
              </div>
              <div className="p-6 rounded-2xl bg-[#0f1423]/60 border border-white/10 backdrop-blur-sm">
                {businessHours.map((bh, i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 last:pb-0 first:pt-0">
                    <span className="text-white/50 font-light text-sm flex items-center gap-2">
                      <FiClock size={12} className="text-amber-500/50" /> {bh.day}
                    </span>
                    <span className={`text-sm font-medium ${bh.hours.includes('Reserved') || bh.hours.includes('Offline') ? 'text-amber-500/50' : 'text-white'}`}>{bh.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.section>

        {/* ================= SOCIAL & FAQ ================= */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={scrollReveal} className="px-8 py-10 border-t border-white/5">
          <SectionTitle title="Network" subtitle="Connect & FAQ" />

          <div className="grid grid-cols-4 gap-4 mb-12">
            {[
              { id: 'instagram', val: instagram, icon: FiInstagram },
              { id: 'linkedin', val: linkedin, icon: FiLinkedin },
              { id: 'twitter', val: twitter, icon: FiTwitter },
              { id: 'github', val: github, icon: FiGithub },
              { id: 'facebook', val: facebook, icon: FaFacebook },
              { id: 'youtube', val: youtube, icon: FaYoutube },
              { id: 'telegram', val: telegram, icon: FaTelegram },
              { id: 'whatsapp', val: whatsapp, icon: FaWhatsapp }
            ].map((social, i) => social.val && (
              <a
                key={i}
                href={social.id === 'whatsapp' ? `https://wa.me/${social.val.replace(/\D/g, '')}` : (social.val.startsWith('http') ? social.val : `https://${social.id}.com/${social.val}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col items-center justify-center gap-2 text-white/50 hover:text-amber-500 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all duration-300 shadow-md group"
              >
                <social.icon size={22} className="group-hover:-translate-y-1 transition-transform" />
              </a>
            ))}
          </div>

          {faqs && faqs.length > 0 && (
            <div className="space-y-1">
              {faqs.map((faq, index) => <FaqAccordion key={index} question={faq.question} answer={faq.answer} />)}
            </div>
          )}
        </motion.section>

        <div className="pb-8">
          <PoweredBy />
        </div>
      </div>

      {/* ================= FLOATING NAVIGATION ================= */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm">
        <div className="bg-[#0f1423]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] px-8 py-5 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <a href="#home" className="text-white/40 hover:text-amber-500 transition-colors flex flex-col items-center gap-1 group relative">
            <FiHome size={22} className="group-hover:-translate-y-1 transition-transform" />
            <span className="absolute -bottom-3 text-[8px] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest text-amber-500">Home</span>
          </a>
          <a href="#about" className="text-white/40 hover:text-amber-500 transition-colors flex flex-col items-center gap-1 group relative">
            <FiLayers size={22} className="group-hover:-translate-y-1 transition-transform" />
            <span className="absolute -bottom-3 text-[8px] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest text-amber-500">About</span>
          </a>
          <a href="#services" className="text-white/40 hover:text-amber-500 transition-colors flex flex-col items-center gap-1 group relative">
            <FiBriefcase size={22} className="group-hover:-translate-y-1 transition-transform" />
            <span className="absolute -bottom-3 text-[8px] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest text-amber-500">Work</span>
          </a>
          <a href="#portfolio" className="text-white/40 hover:text-amber-500 transition-colors flex flex-col items-center gap-1 group relative">
            <FiImage size={22} className="group-hover:-translate-y-1 transition-transform" />
            <span className="absolute -bottom-3 text-[8px] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest text-amber-500">Gallery</span>
          </a>
          <a href="#contact" className="text-white/40 hover:text-amber-500 transition-colors flex flex-col items-center gap-1 group relative">
            <FiPhone size={22} className="group-hover:-translate-y-1 transition-transform" />
            <span className="absolute -bottom-3 text-[8px] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest text-amber-500">Contact</span>
          </a>
        </div>
      </div>

      {/* Global CSS Inject */}
      <style dangerouslySetInnerHTML={{
        __html: `
        html { scroll-behavior: smooth; }
        @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-gradient { animation: gradient 3s ease infinite; }
        .luxury-scrollbar::-webkit-scrollbar { height: 4px; width: 4px; }
        .luxury-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .luxury-scrollbar::-webkit-scrollbar-thumb { background: rgba(245, 158, 11, 0.2); border-radius: 10px; }
        .luxury-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(245, 158, 11, 0.5); }
      `}} />
    </div>
  );
};

export default PremiumEleganceExpanded;