import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhone, FiMail, FiGlobe, FiInstagram, FiLinkedin, FiTwitter, FiMapPin, FiUserPlus, FiGithub, FiChevronDown } from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaYoutube, FaTelegram } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 mb-2 bg-white/[0.02] rounded-xl px-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left text-white focus:outline-none"
      >
        <span className="font-semibold text-sm pr-4">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <FiChevronDown size={18} className="text-white/50 min-w-[18px]" />
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
            <p className="pb-4 text-white/50 text-xs leading-relaxed border-t border-white/5 pt-3 mt-1">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AbstractMedia = ({ userData }) => {
  const {
    displayName,
    email,
    role,
    phone,
    mobileNumber,
    website,
    businessName,
    instagram,
    linkedin,
    twitter,
    address,
    bio,
    whatsapp,
    github,
    facebook,
    youtube,
    telegram,
    faqs,
  } = userData || {};

  const finalPhone = phone || mobileNumber;

  // Added Static Images as per your request
  const bannerImage = "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=1200&h=400&fit=crop";
  const profileImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop";
  const galleryImages = [
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=600&fit=crop"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="w-full h-screen overflow-y-auto overflow-x-hidden scroll-smooth bg-[#050505] font-['Mulish'] relative pb-10">
      {/* Dynamic Background Elements */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 60, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md mx-auto relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-[#0a0a0a]/80 backdrop-blur-3xl min-h-screen border-x border-white/5"
      >
        {/* Banner Section */}
        <motion.div variants={itemVariants} className="w-full h-48 relative bg-white/5">
          <img
            src={bannerImage}
            alt="Banner"
            className="w-full h-full object-cover"
          />

          {/* Top Accent Dots */}
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.6)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
          </div>
        </motion.div>

        {/* Profile Info Section */}
        <div className="px-6 relative pb-8 border-b border-white/5">
          <motion.div variants={itemVariants} className="flex flex-col items-center -mt-16 mb-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#050505] bg-[#111] shadow-2xl relative z-20">
              <img
                src={profileImage}
                alt={displayName || "Profile"}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="text-center mb-6">
            <h1 className="text-3xl font-black text-white tracking-tight capitalize mb-1">
              {displayName || 'Abstract Media'}
            </h1>
            {role && <p className="text-blue-400 font-bold text-sm mb-2">{role}</p>}

            {businessName && (
              <span className="inline-block bg-white/5 text-white/70 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/10 mb-4">
                {businessName}
              </span>
            )}

            {bio && (
              <p className="text-white/60 text-sm leading-relaxed px-4">
                {bio}
              </p>
            )}
          </motion.div>

          {/* Primary Action Button */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => downloadVCard(userData)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-sm shadow-[0_10px_25px_rgba(59,130,246,0.4)] hover:shadow-[0_15px_35px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-2"
          >
            <FiUserPlus size={18} />
            Save Contact
          </motion.button>
        </div>

        {/* Core Links & Contact Section */}
        <div className="p-6 space-y-8">
          <motion.div variants={itemVariants} className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-white/30 mb-4 px-2">Contact Details</h3>

            {finalPhone && (
              <a href={`tel:${finalPhone}`} className="flex items-center p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-all group">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all mr-4">
                  <FiPhone size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/40">Mobile</p>
                  <p className="text-sm font-semibold text-white/90">{finalPhone}</p>
                </div>
              </a>
            )}

            {email && (
              <a href={`mailto:${email}`} className="flex items-center p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-all group">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all mr-4">
                  <FiMail size={20} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] uppercase tracking-wider text-white/40">Email</p>
                  <p className="text-sm font-semibold text-white/90 truncate">{email}</p>
                </div>
              </a>
            )}

            {website && (
              <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-all group">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all mr-4">
                  <FiGlobe size={20} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] uppercase tracking-wider text-white/40">Website</p>
                  <p className="text-sm font-semibold text-white/90 truncate">{website.replace(/(^\w+:|^)\/\//, '')}</p>
                </div>
              </a>
            )}

            {address && (
              <a href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-all group">
                <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 group-hover:bg-red-500 group-hover:text-white transition-all mr-4">
                  <FiMapPin size={20} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] uppercase tracking-wider text-white/40">Location</p>
                  <p className="text-sm font-semibold text-white/90 truncate">{address}</p>
                </div>
              </a>
            )}
          </motion.div>

          {/* Social Matrix Grid */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xs font-black uppercase tracking-widest text-white/30 mb-4 px-2">Social Profiles</h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { id: 'whatsapp', val: whatsapp, icon: FaWhatsapp, color: 'hover:bg-[#25d366] text-[#25d366]' },
                { id: 'instagram', val: instagram, icon: FiInstagram, color: 'hover:bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-[#e6683c]' },
                { id: 'linkedin', val: linkedin, icon: FiLinkedin, color: 'hover:bg-[#0077b5] text-[#0077b5]' },
                { id: 'github', val: github, icon: FiGithub, color: 'hover:bg-zinc-700 text-white' },
                { id: 'twitter', val: twitter, icon: FiTwitter, color: 'hover:bg-[#1DA1F2] text-[#1DA1F2]' },
                { id: 'facebook', val: facebook, icon: FaFacebook, color: 'hover:bg-[#1877f2] text-[#1877f2]' },
                { id: 'youtube', val: youtube, icon: FaYoutube, color: 'hover:bg-[#ff0000] text-[#ff0000]' },
                { id: 'telegram', val: telegram, icon: FaTelegram, color: 'hover:bg-[#0088cc] text-[#0088cc]' }
              ].map((social, i) => social.val && (
                <motion.a
                  key={i}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={social.id === 'whatsapp' ? `https://wa.me/${social.val.replace(/\D/g, '')}` : (social.val.startsWith('http') ? social.val : `https://${social.id}.com/${social.val}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`aspect-square rounded-2xl bg-white/[0.04] border border-white/5 flex items-center justify-center hover:text-white transition-all duration-300 shadow-sm ${social.color}`}
                >
                  <social.icon size={22} className="opacity-80" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Image Gallery Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xs font-black uppercase tracking-widest text-white/30 mb-4 px-2">Gallery</h3>
            <div className="grid grid-cols-2 gap-3">
              {galleryImages.map((img, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="aspect-square rounded-xl overflow-hidden border border-white/10"
                >
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQ Accordion Section */}
          {faqs && faqs.length > 0 && (
            <motion.div variants={itemVariants}>
              <h3 className="text-xs font-black uppercase tracking-widest text-white/30 mb-4 px-2">FAQ</h3>
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <FaqItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer Meta Info */}
        <motion.div
          variants={itemVariants}
          className="mt-8 mb-6 px-8 flex justify-between items-center text-[8px] font-black text-white/20 uppercase tracking-[0.3em]"
        >
          <span>Terminal Seq: 714</span>
          <span>Universal Core</span>
        </motion.div>

        {/* Powered By Branding */}
        <div className="pb-8">
          <PoweredBy />
        </div>
      </motion.div>
    </div>
  );
};

export default AbstractMedia;