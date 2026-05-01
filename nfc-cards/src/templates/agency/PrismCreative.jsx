import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail, FiGlobe, FiMapPin, FiInstagram, FiLinkedin,
  FiTwitter, FiUserPlus, FiChevronDown, FiHeadphones,
  FiMonitor, FiCode, FiCpu, FiPlay
} from 'react-icons/fi';
import { FaDiscord, FaSteam, FaTwitch, FaYoutube } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Bento Box Sub-components ---

const BentoTile = ({ children, className = "", delay = 0, colSpan = 1, bgClass = "bg-white", paddingClass = "p-6" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{ duration: 0.5, delay: delay, type: "spring", stiffness: 100 }}
    className={`${bgClass} ${paddingClass} rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden ${colSpan === 2 ? 'col-span-2' : 'col-span-1'} ${className}`}
  >
    {children}
  </motion.div>
);

const FaqTile = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0 pb-3 mb-3 last:pb-0 last:mb-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left focus:outline-none py-2">
        <span className="font-bold text-sm text-gray-800 pr-4">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <FiChevronDown size={18} className="text-indigo-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            <p className="text-gray-500 text-xs leading-relaxed mt-2 pb-2">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Component ---

const BentoDashboard = ({ userData }) => {
  // Completely fictional persona: Marcus Thorne, Indie Game Dev
  const {
    displayName = "Marcus Thorne",
    email = "marcus@polygridgames.com",
    role = "Indie Game Developer",
    phone = "+1 (555) 777-8888",
    website = "www.polygridgames.com",
    address = "Seattle, WA, United States",
    businessName = "Polygrid Studios",
    twitter = "marcusthorne_dev",
    youtube = "polygrid",
    discord = "marcus_dev#1234",
    profileImage = "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=400&fit=crop",
    bio = "Solo indie dev crafting atmospheric pixel-art adventures and synth-heavy soundtracks. Creator of 'Neon Drifter'.",
    status = "Developing 'Cyber Hound' 🐕",
    services = [
      { title: "Unity C# Dev", icon: FiCode, color: "text-blue-500 bg-blue-50" },
      { title: "Sound Design", icon: FiHeadphones, color: "text-purple-500 bg-purple-50" },
      { title: "Pixel Art", icon: FiMonitor, color: "text-pink-500 bg-pink-50" },
      { title: "Game Logic", icon: FiCpu, color: "text-emerald-500 bg-emerald-50" }
    ],
    games = [
      { title: "Neon Drifter", stats: "100k+ Units Sold", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop" },
      { title: "Abyssal Station", stats: "Early Access", img: "https://images.unsplash.com/photo-1614294149010-950b698f72c0?w=600&h=400&fit=crop" }
    ],
    stats = [
      { label: "Shipped Titles", val: "3" },
      { label: "Years Exp", val: "7" },
      { label: "Awards", val: "4" }
    ],
    faqs = [
      { question: "Are you available for freelance sound design?", answer: "Currently, I am fully booked working on 'Cyber Hound', but I am accepting inquiries for Q3 2027." },
      { question: "What engine do you use?", answer: "I primarily use Unity for 3D/2.5D projects, and Godot for pure 2D pixel art games." },
      { question: "Can I stream your games?", answer: "Absolutely! Streaming and monetization of my games on Twitch/YouTube is 100% permitted and encouraged." }
    ]
  } = userData || {};

  return (
    <div className="w-full min-h-screen bg-[#F4F4F5] text-gray-900 font-['Outfit',sans-serif] pb-24 flex justify-center">

      <div className="w-full max-w-lg p-4 space-y-4 pt-8">

        {/* ================= 1. IDENTITY WIDGET (Full Width) ================= */}
        <BentoTile colSpan={2} delay={0.1} className="relative overflow-visible">
          {/* Status Badge */}
          <div className="absolute -top-3 right-6 bg-green-500 text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-pulse">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
            {status}
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-28 h-28 shrink-0 rounded-full p-1 bg-gradient-to-tr from-indigo-500 to-pink-500">
              <img src={profileImage} alt={displayName} className="w-full h-full object-cover rounded-full border-4 border-white" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">{displayName}</h1>
              <p className="text-indigo-500 font-bold text-sm mb-3">{role}</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{bio}</p>

              {businessName && (
                <span className="inline-block bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md">
                  {businessName}
                </span>
              )}
            </div>
          </div>
        </BentoTile>

        {/* Grid Container for the rest of the widgets */}
        <div className="grid grid-cols-2 gap-4">

          {/* ================= 2. PRIMARY CTA (Square) ================= */}
          <BentoTile delay={0.2} bgClass="bg-indigo-600" paddingClass="p-0" className="flex hover:bg-indigo-700 transition-colors cursor-pointer group">
            <motion.button onClick={() => downloadVCard(userData)} className="w-full h-full p-6 flex flex-col items-center justify-center gap-3 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FiUserPlus size={24} />
              </div>
              <span className="font-bold text-sm">Save Contact</span>
            </motion.button>
          </BentoTile>

          {/* ================= 3. STATS WIDGET (Square) ================= */}
          <BentoTile delay={0.3} className="flex flex-col justify-between">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Metrics</h3>
            <div className="space-y-3">
              {stats.map((stat, i) => (
                <div key={i} className="flex justify-between items-end border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                  <span className="text-2xl font-black leading-none text-gray-800">{stat.val}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{stat.label}</span>
                </div>
              ))}
            </div>
          </BentoTile>

          {/* ================= 4. SOCIAL GRID (Full Width) ================= */}
          <BentoTile colSpan={2} delay={0.4}>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Connect</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {[
                { id: 'twitter', val: twitter, icon: FiTwitter, color: 'bg-[#1DA1F2]/10 text-[#1DA1F2]' },
                { id: 'youtube', val: youtube, icon: FaYoutube, color: 'bg-[#ff0000]/10 text-[#ff0000]' },
                { id: 'discord', val: discord, icon: FaDiscord, color: 'bg-[#5865f2]/10 text-[#5865f2]' },
                { id: 'steam', val: "steam", icon: FaSteam, color: 'bg-slate-800/10 text-slate-800' },
                { id: 'twitch', val: "twitch", icon: FaTwitch, color: 'bg-[#9146FF]/10 text-[#9146FF]' },
                { id: 'mail', val: email, icon: FiMail, color: 'bg-gray-100 text-gray-600', link: `mailto:${email}` }
              ].map((social, i) => social.val && (
                <a
                  key={i}
                  href={social.link || `https://${social.id}.com/${social.val}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`aspect-square rounded-2xl flex items-center justify-center hover:scale-105 transition-transform ${social.color}`}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </BentoTile>

          {/* ================= 5. PORTFOLIO / GAMES (Full Width) ================= */}
          <BentoTile colSpan={2} delay={0.5} paddingClass="p-0" bgClass="bg-transparent" className="border-0 shadow-none overflow-hidden">
            <div className="grid grid-cols-2 gap-4 h-full">
              {games.map((game, idx) => (
                <motion.div key={idx} whileHover={{ y: -5 }} className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] group">
                  <img src={game.img} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent p-5 flex flex-col justify-end">
                    <FiPlay className="text-white mb-2" size={20} />
                    <h4 className="text-white font-black text-lg leading-tight mb-1">{game.title}</h4>
                    <p className="text-indigo-300 text-[10px] font-bold uppercase tracking-wider">{game.stats}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </BentoTile>

          {/* ================= 6. SKILLS WIDGET (Full Width) ================= */}
          <BentoTile colSpan={2} delay={0.6}>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Skill Tree</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {services.map((svc, i) => (
                <div key={i} className="flex flex-col items-center text-center p-3 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${svc.color}`}>
                    <svc.icon size={18} />
                  </div>
                  <span className="text-xs font-bold text-gray-800">{svc.title}</span>
                </div>
              ))}
            </div>
          </BentoTile>

          {/* ================= 7. LOCATION & LINKS (Square) ================= */}
          {address && (
            <BentoTile delay={0.7} className="flex flex-col justify-between group hover:border-indigo-200 transition-colors cursor-pointer" >
              <a href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="h-full flex flex-col">
                <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FiMapPin size={20} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Basecamp</h3>
                <p className="text-sm font-bold text-gray-800">{address}</p>
              </a>
            </BentoTile>
          )}

          {/* ================= 8. WEBSITE LINK (Square) ================= */}
          {website && (
            <BentoTile delay={0.8} className="flex flex-col justify-between group hover:border-indigo-200 transition-colors cursor-pointer" >
              <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="h-full flex flex-col">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FiGlobe size={20} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Portfolio</h3>
                <p className="text-sm font-bold text-gray-800 truncate">{website.replace(/(^\w+:|^)\/\//, '')}</p>
              </a>
            </BentoTile>
          )}

          {/* ================= 9. FAQ WIDGET (Full Width) ================= */}
          {faqs && faqs.length > 0 && (
            <BentoTile colSpan={2} delay={0.9} bgClass="bg-gray-50" className="border border-gray-100 shadow-inner">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Transmission Logs (FAQ)</h3>
              <div>
                {faqs.map((faq, index) => <FaqTile key={index} question={faq.question} answer={faq.answer} />)}
              </div>
            </BentoTile>
          )}

        </div>

        {/* Footer Brand */}
        <div className="pt-6 pb-2">
          <PoweredBy />
        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&display=swap');
      `}} />
    </div>
  );
};

export default BentoDashboard;