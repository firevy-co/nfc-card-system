import React from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiGlobe, FiInstagram, FiLinkedin, FiTwitter, FiMapPin, FiUserPlus, FiGithub } from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaYoutube, FaTelegram } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

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
    profileImage,
    bio,
    whatsapp,
    github,
    facebook,
    youtube,
    tiktok,
    discord,
    telegram,
    skype,
    paypal
  } = userData || {};

  const finalPhone = phone || mobileNumber;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="w-full bg-[#050505] font-['Mulish'] relative">
      {/* Dynamic Background Elements - Animated Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[120px] rounded-full"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 60, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[120px] rounded-full"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full relative z-10"
      >
        {/* Top Accent Dots - Status Indicators */}
        <div className="flex gap-2.5 mb-5 px-6 pt-8">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }} className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.6)]" />
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6, type: 'spring' }} className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7, type: 'spring' }} className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
        </div>

        {/* Main Card Shell */}
        <div className="bg-white/[0.02] border-b border-white/10 p-8 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] backdrop-blur-3xl overflow-hidden relative group">
          {/* Internal Gradient Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          <div className="relative z-10">
            {/* Header / Profile Identity Section */}
            <motion.div variants={itemVariants} className="mb-12 text-center flex flex-col items-center">
              <div className="w-28 h-28 mb-6 rounded-[2.5rem] overflow-hidden border-2 border-white/10 p-1.5 bg-white/5 shadow-2xl">
                <img src={profileImage} alt={displayName} className="w-full h-full object-cover rounded-[2rem]" />
              </div>

              <h1 className="text-4xl font-black text-white tracking-tighter capitalize leading-tight">
                {displayName || 'Abstract Media'}
              </h1>
              <div className="h-[2px] w-8 bg-blue-500 my-4 rounded-full" />
              
              {businessName && (
                <p className="text-white/30 text-[9px] font-bold uppercase tracking-[0.2em] mt-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
                  {businessName}
                </p>
              )}
              {bio && (
                 <p className="mt-6 text-white/50 text-sm leading-relaxed max-w-sm">
                    {bio}
                 </p>
              )}
            </motion.div>

            {/* Core Action Links */}
            <div className="space-y-3.5 mb-10">
              {finalPhone && (
                <motion.a
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  href={`tel:${finalPhone}`}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] hover:border-blue-500/30 transition-all group/link"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover/link:bg-blue-500 group-hover/link:text-white transition-all shadow-inner">
                      <FiPhone size={16} />
                    </div>
                    <div>
                      <p className="text-[7px] font-black uppercase tracking-[0.2em] text-blue-400/60 mb-0.5">Satellite</p>
                      <p className="text-xs font-bold text-white/90">{finalPhone}</p>
                    </div>
                  </div>
                </motion.a>
              )}

              {email && (
                <motion.a
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  href={`mailto:${email}`}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] hover:border-purple-500/30 transition-all group/link"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover/link:bg-purple-500 group-hover/link:text-white transition-all shadow-inner">
                      <FiMail size={16} />
                    </div>
                    <div>
                      <p className="text-[7px] font-black uppercase tracking-[0.2em] text-purple-400/60 mb-0.5">Signal</p>
                      <p className="text-xs font-bold text-white/90 truncate max-w-[160px]">{email}</p>
                    </div>
                  </div>
                </motion.a>
              )}

              {website && (
                <motion.a
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  href={website.startsWith('http') ? website : `https://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] hover:border-emerald-500/30 transition-all group/link"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover/link:bg-emerald-500 group-hover/link:text-white transition-all shadow-inner">
                      <FiGlobe size={16} />
                    </div>
                    <div>
                      <p className="text-[7px] font-black uppercase tracking-[0.2em] text-emerald-400/60 mb-0.5">Broadcast</p>
                      <p className="text-xs font-bold text-white/90 truncate max-w-[160px]">{website.replace(/(^\w+:|^)\/\//, '')}</p>
                    </div>
                  </div>
                </motion.a>
              )}
            </div>

            {/* Social Matrix Grid */}
            <div className="grid grid-cols-4 gap-3.5 mb-10">
              {[
                 { id: 'instagram', val: instagram, icon: FiInstagram, color: 'hover:bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] hover:shadow-[0_8px_20px_rgba(230,104,60,0.3)]' },
                 { id: 'linkedin', val: linkedin, icon: FiLinkedin, color: 'hover:bg-[#0077b5] hover:shadow-[0_8px_20px_rgba(0,119,181,0.3)]' },
                 { id: 'twitter', val: twitter, icon: FiTwitter, color: 'hover:bg-black hover:shadow-[0_8px_20px_rgba(255,255,255,0.1)]' },
                 { id: 'github', val: github, icon: FiGlobe, color: 'hover:bg-zinc-800' },
                 { id: 'facebook', val: facebook, icon: FaFacebook, color: 'hover:bg-[#1877f2]' },
                 { id: 'youtube', val: youtube, icon: FaYoutube, color: 'hover:bg-[#ff0000]' },
                 { id: 'whatsapp', val: whatsapp, icon: FaWhatsapp, color: 'hover:bg-[#25d366]' },
                 { id: 'telegram', val: telegram, icon: FaTelegram, color: 'hover:bg-[#0088cc]' }
              ].map((social, i) => social.val && (
                <motion.a 
                  key={i}
                  variants={itemVariants} 
                  whileHover={{ y: -5, scale: 1.05 }} 
                  href={social.id === 'whatsapp' ? `https://wa.me/${social.val.replace(/\D/g, '')}` : (social.val.startsWith('http') ? social.val : `https://${social.id}.com/${social.val}`)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`aspect-square rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all ${social.color}`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
              {address && (
                <motion.a variants={itemVariants} whileHover={{ y: -5, scale: 1.05 }} href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="aspect-square rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-red-500 transition-all hover:shadow-[0_8px_20_rgba(239,68,68,0.3)]">
                  <FiMapPin size={20} />
                </motion.a>
              )}
            </div>

            {/* Primary Action Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => downloadVCard(userData)}
              className="w-full bg-white text-black py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] shadow-[0_15px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-3 relative overflow-hidden group/btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
              <FiUserPlus size={20} />
              Connect Hub
            </motion.button>
          </div>
        </div>

        {/* System Meta Info */}
        <motion.div
          variants={itemVariants}
          className="mt-20 px-8 flex justify-between items-center text-[7px] font-black text-white/10 uppercase tracking-[0.4em]"
        >
          <span>Terminal Sequence: 714</span>
          <span>Universal Core Framework</span>
        </motion.div>

        {/* Powered By Branding */}
        <PoweredBy />
      </motion.div>

      {/* Tailwind Style Extension for Shimmer */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};

export default AbstractMedia;

