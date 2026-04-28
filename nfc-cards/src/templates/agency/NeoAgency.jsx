import React from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiPhone, FiMail, FiGlobe, FiInstagram, FiLinkedin, FiTwitter, FiMapPin, FiUserPlus, FiGithub } from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaYoutube, FaTelegram } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';

const NeoAgency = ({ userData }) => {
  const {
    displayName,
    email,
    role,
    phone,
    mobileNumber,
    website,
    address,
    businessName,
    instagram,
    linkedin,
    twitter,
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
    paypal,
    company
  } = userData || {};

  const finalPhone = phone || mobileNumber;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="w-full bg-black font-['Space Grotesk'] relative">
      {/* Brutalist Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Cyber Glows */}
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
          x: [-20, 20, -20],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full relative z-10"
      >
        <div className="bg-[#0a0a0a] border-b border-white/5 p-8 shadow-[0_0_50px_rgba(0,0,0,1)] relative overflow-hidden group">

          {/* Top Bar Decoration */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />

          <div className="relative z-10">
            {/* Header Identity Section */}
            <div className="flex justify-between items-start mb-10">
              <motion.div variants={itemVariants}>
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-emerald-500/30 p-1 bg-emerald-500/5 mb-6">
                  <img src={profileImage} alt={displayName} className="w-full h-full object-cover rounded-xl" />
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="text-right">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Node // 714</span>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="mb-10">
              <h1 className="text-5xl font-black text-white tracking-tight leading-none mb-4 uppercase">
                {displayName || 'Neo Agency'}
              </h1>
              <div className="flex items-center gap-3">
                
                {(businessName || company) && (
                  <span className="text-white/20 text-[9px] font-bold uppercase tracking-widest">{businessName || company}</span>
                )}
              </div>
              {bio && (
                 <p className="mt-6 text-white/40 text-sm leading-relaxed max-w-sm">
                    {bio}
                 </p>
              )}
            </motion.div>

            {/* Action Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {finalPhone && (
                <motion.a
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(16, 185, 129, 1)', color: '#000' }}
                  href={`tel:${finalPhone}`}
                  className="bg-white/5 p-6 rounded-[2rem] flex flex-col items-center gap-3 border border-white/10 transition-all group/icon text-white"
                >
                  <FiPhone size={24} className="group-hover/icon:scale-110 transition-transform" />
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-40 group-hover/icon:opacity-100 transition-opacity">Direct Link</span>
                </motion.a>
              )}
              {email && (
                <motion.a
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(16, 185, 129, 1)', color: '#000' }}
                  href={`mailto:${email}`}
                  className="bg-white/5 p-6 rounded-[2rem] flex flex-col items-center gap-3 border border-white/10 transition-all group/icon text-white"
                >
                  <FiMail size={24} className="group-hover/icon:scale-110 transition-transform" />
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-40 group-hover/icon:opacity-100 transition-opacity">Secure Mail</span>
                </motion.a>
              )}
            </div>

            {website && (
              <motion.a
                variants={itemVariants}
                whileHover={{ scale: 1.01, border: '1px solid rgba(16, 185, 129, 0.5)' }}
                href={website.startsWith('http') ? website : `https://${website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-5 text-center rounded-[2rem] bg-white text-black font-black text-[11px] uppercase tracking-[0.4em] shadow-[0_10px_20px_rgba(255,255,255,0.05)] hover:bg-emerald-500 transition-all mb-4"
              >
                Launch Protocol
              </motion.a>
            )}

            {/* Social Grid Nexus */}
            <div className="grid grid-cols-4 gap-3 mb-10">
              {[
                 { id: 'instagram', val: instagram, icon: FiInstagram },
                 { id: 'linkedin', val: linkedin, icon: FiLinkedin },
                 { id: 'twitter', val: twitter, icon: FiTwitter },
                 { id: 'github', val: github, icon: FiGithub },
                 { id: 'facebook', val: facebook, icon: FaFacebook },
                 { id: 'youtube', val: youtube, icon: FaYoutube },
                 { id: 'whatsapp', val: whatsapp, icon: FaWhatsapp },
                 { id: 'telegram', val: telegram, icon: FaTelegram }
              ].map((social, i) => social.val && (
                <motion.a 
                  key={i}
                  variants={itemVariants} 
                  whileHover={{ y: -3, color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }} 
                  href={social.id === 'whatsapp' ? `https://wa.me/${social.val.replace(/\D/g, '')}` : (social.val.startsWith('http') ? social.val : `https://${social.id}.com/${social.val}`)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="aspect-square rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/30 transition-all"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
              {address && (
                <motion.a variants={itemVariants} whileHover={{ y: -3 }} href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="aspect-square rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/30 hover:text-emerald-500 hover:border-emerald-500/30 transition-all">
                  <FiMapPin size={18} />
                </motion.a>
              )}
            </div>

            {/* Primary Global Action */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => downloadVCard(userData)}
              className="w-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-500 py-6 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] hover:bg-emerald-500 hover:text-black transition-all flex items-center justify-center gap-3 relative overflow-hidden group/save"
            >
              <div className="absolute inset-0 bg-emerald-500/20 -translate-x-full group-hover/save:animate-[shimmer_2s_infinite]" />
              <FiUserPlus size={20} />
              Store Identity
            </motion.button>
          </div>
        </div>

        {/* System Meta Info */}
        <motion.div variants={itemVariants} className="mt-20 flex items-center justify-center gap-4 px-8">
          <div className="h-[1px] flex-1 bg-white/5" />
          <p className="text-[7px] font-black uppercase tracking-[0.8em] text-white/20 whitespace-nowrap">Core Logic System</p>
          <div className="h-[1px] flex-1 bg-white/5" />
        </motion.div>

        {/* Powered By Branding */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pb-12 text-center"
        >
          <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="inline-block text-[9px] font-black tracking-[0.4em] text-white/10 hover:text-emerald-500/40 transition-colors uppercase py-2 px-6 border border-white/5 rounded-full">
            Powered by Cardyn
          </a>
        </motion.div>
      </motion.div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};

export default NeoAgency;

