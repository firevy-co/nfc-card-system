import React from 'react';
import { motion } from 'framer-motion';
import { FiGlobe, FiMail, FiPhone, FiMapPin, FiInstagram, FiLinkedin, FiTwitter, FiUserPlus, FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaYoutube, FaTiktok, FaDiscord, FaTelegram } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';

const VividStudio = ({ userData }) => {
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
    logo,
    bio,
    whatsapp,
    github,
    facebook,
    youtube,
    tiktok,
    discord,
    telegram
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
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="w-full bg-[#ff3366] font-['Mulish'] relative">
      {/* Dynamic Background Patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,#fff_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/4 -left-1/4 w-[500px] h-[500px] border-[60px] border-white/5 rounded-full"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full relative z-10"
      >
        <div className="bg-white border-b border-white/10 p-8 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden group">

          {/* Accent Blob */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#ff3366]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000" />

          <div className="relative z-10">
            {/* Header Identity Hub */}
            <div className="flex items-center justify-between mb-12">
              <motion.div variants={itemVariants} className="w-20 h-20 bg-[#ff3366] rounded-2xl flex items-center justify-center shadow-lg shadow-[#ff3366]/30 overflow-hidden">
                <img src={logo || profileImage} alt={displayName} className="w-full h-full object-cover p-1" />
              </motion.div>
              <motion.div variants={itemVariants} className="px-5 py-2 rounded-full bg-[#ff3366]/5 text-[#ff3366] text-[10px] font-black uppercase tracking-[0.2em] border border-[#ff3366]/10 animate-pulse">
                Active Studio
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-5xl font-black text-black tracking-tighter leading-[0.9] mb-4">
                {displayName || 'Vivid Artist'}
              </h2>
              <div className="flex items-center gap-3">
                
                {businessName && (
                  <span className="h-1 w-1 bg-black/10 rounded-full" />
                )}
                <span className="text-black/30 font-bold text-[9px] uppercase tracking-widest">{businessName}</span>
              </div>
              {bio && (
                 <p className="mt-6 text-black/50 text-sm leading-relaxed max-w-sm">
                    {bio}
                 </p>
              )}
            </motion.div>

            {/* Action Matrix */}
            <div className="grid grid-cols-1 gap-2.5 mb-8">
              {website && (
                <motion.a
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  href={website.startsWith('http') ? website : `https://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-black hover:text-white transition-all group/link"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-black group-hover/link:bg-[#ff3366] group-hover/link:text-white transition-all">
                      <FiGlobe size={18} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest">Portfolio Portal</span>
                  </div>
                  <FiArrowUpRight className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </motion.a>
              )}

              <div className="grid grid-cols-2 gap-2.5">
                {email && (
                  <motion.a
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    href={`mailto:${email}`}
                    className="flex flex-col gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-[#ff3366] hover:text-white transition-all group/link"
                  >
                    <FiMail size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Signal</span>
                  </motion.a>
                )}
                {finalPhone && (
                  <motion.a
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    href={`tel:${finalPhone}`}
                    className="flex flex-col gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-[#ff3366] hover:text-white transition-all group/link"
                  >
                    <FiPhone size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Hotline</span>
                  </motion.a>
                )}
              </div>

              {address && (
                <motion.a
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4 hover:bg-black hover:text-white transition-all group/link"
                >
                  <FiMapPin size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest truncate">{address}</span>
                </motion.a>
              )}
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-4 gap-2.5 mb-10">
              {[
                 { id: 'instagram', val: instagram, icon: FiInstagram, color: 'hover:bg-[#e1306c]' },
                 { id: 'linkedin', val: linkedin, icon: FiLinkedin, color: 'hover:bg-[#0077b5]' },
                 { id: 'twitter', val: twitter, icon: FiTwitter, color: 'hover:bg-black' },
                 { id: 'github', val: github, icon: FiGithub, color: 'hover:bg-zinc-800' },
                 { id: 'facebook', val: facebook, icon: FaFacebook, color: 'hover:bg-[#1877f2]' },
                 { id: 'youtube', val: youtube, icon: FaYoutube, color: 'hover:bg-[#ff0000]' },
                 { id: 'whatsapp', val: whatsapp, icon: FaWhatsapp, color: 'hover:bg-[#25d366]' },
                 { id: 'telegram', val: telegram, icon: FaTelegram, color: 'hover:bg-[#0088cc]' }
              ].map((social, i) => social.val && (
                <motion.a 
                  key={i}
                  variants={itemVariants} 
                  whileHover={{ y: -5 }} 
                  href={social.id === 'whatsapp' ? `https://wa.me/${social.val.replace(/\D/g, '')}` : (social.val.startsWith('http') ? social.val : `https://${social.id}.com/${social.val}`)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`aspect-square rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-slate-100 ${social.color}`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>

            {/* Primary Action Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => downloadVCard(userData)}
              className="w-full bg-black text-white py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] shadow-xl hover:bg-[#ff3366] transition-all flex items-center justify-center gap-3 relative overflow-hidden group/save"
            >
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/save:animate-[shimmer_2s_infinite]" />
              <FiUserPlus size={20} />
              Save Identity
            </motion.button>
          </div>
        </div>

        {/* Footer Sequence */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pb-12 text-center"
        >
          <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="inline-block text-[10px] font-black tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors py-2.5 px-8 border border-white/20 rounded-full backdrop-blur-sm">
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

export default VividStudio;
