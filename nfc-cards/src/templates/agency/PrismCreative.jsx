import React from 'react';
import { motion } from 'framer-motion';
import {
  FiPhone,
  FiMail,
  FiGlobe,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
  FiMapPin,
  FiUserPlus,
  FiGithub
} from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaYoutube, FaTiktok, FaDiscord, FaTelegram, FaSkype, FaPaypal } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';

const PrismCreative = ({ userData }) => {
  const {
    displayName,
    email,
    role,
    phone,
    mobileNumber,
    website,
    address,
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
    paypal
  } = userData || {};

  const finalPhone = phone || mobileNumber;

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] font-['Inter']">

      <motion.div
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <div className="relative bg-white/10 backdrop-blur-2xl border-b border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.6)] overflow-hidden">

          {/* HEADER */}
          <div className="relative bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-8 pb-20 text-center">

            {/* Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 blur-3xl rounded-full" />

            {/* NAME */}
            <motion.h1 variants={itemVariants} className="text-3xl font-bold text-white">
              {displayName || "Prism Creative"}
            </motion.h1>

            

            {/* PROFILE IMAGE */}
            <div className="absolute left-1/2 -bottom-14 -translate-x-1/2">
              <div className="w-32 h-32 rounded-full p-[3px] bg-gradient-to-tr from-pink-500 via-indigo-500 to-purple-500 shadow-2xl">
                <img
                  src={profileImage}
                  alt={displayName}
                  className="w-full h-full rounded-full object-cover border-4 border-[#020617]"
                />
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="pt-20 px-6 pb-8 space-y-6">

            {/* BIO */}
            {bio && (
              <motion.p variants={itemVariants} className="text-center text-gray-300 text-sm leading-relaxed max-w-xs mx-auto">
                {bio}
              </motion.p>
            )}

            {/* CONTACT GRID */}
            <div className="grid grid-cols-1 gap-4">
              {/* PHONE */}
              {finalPhone && (
                <motion.a
                  variants={itemVariants}
                  href={`tel:${finalPhone}`}
                  className="flex items-center justify-between bg-white/5 hover:bg-white/10 transition rounded-2xl px-5 py-4"
                >
                  <div>
                    <p className="text-xs text-gray-400">Phone</p>
                    <p className="text-white font-semibold">{finalPhone}</p>
                  </div>
                  <FiPhone className="text-pink-400" />
                </motion.a>
              )}

              {/* EMAIL */}
              {email && (
                <motion.a
                  variants={itemVariants}
                  href={`mailto:${email}`}
                  className="flex items-center justify-between bg-white/5 hover:bg-white/10 transition rounded-2xl px-5 py-4"
                >
                  <div className="truncate">
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="text-white font-semibold truncate">{email}</p>
                  </div>
                  <FiMail className="text-indigo-400" />
                </motion.a>
              )}
            </div>

            {/* SOCIALS */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 pt-2">
              {website && (
                <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="icon-btn hover:bg-white/20">
                  <FiGlobe />
                </a>
              )}
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="icon-btn hover:bg-pink-500">
                  <FiInstagram />
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn hover:bg-blue-600">
                  <FiLinkedin />
                </a>
              )}
              {twitter && (
                <a href={twitter} target="_blank" rel="noopener noreferrer" className="icon-btn hover:bg-sky-500">
                  <FiTwitter />
                </a>
              )}
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" className="icon-btn hover:bg-slate-700">
                  <FiGithub />
                </a>
              )}
              {address && (
                <a href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="icon-btn hover:bg-emerald-500">
                  <FiMapPin />
                </a>
              )}
              {whatsapp && (
                <a href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="icon-btn hover:bg-green-500">
                  <FaWhatsapp />
                </a>
              )}
            </motion.div>

            {/* SECONDARY SOCIALS */}
            {(facebook || youtube || tiktok || discord || telegram || skype || paypal) && (
               <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 pt-2">
                  {facebook && <a href={facebook} target="_blank" rel="noopener noreferrer" className="sub-icon-btn"><FaFacebook /></a>}
                  {youtube && <a href={youtube} target="_blank" rel="noopener noreferrer" className="sub-icon-btn"><FaYoutube /></a>}
                  {tiktok && <a href={tiktok} target="_blank" rel="noopener noreferrer" className="sub-icon-btn"><FaTiktok /></a>}
                  {discord && <a href={discord} target="_blank" rel="noopener noreferrer" className="sub-icon-btn"><FaDiscord /></a>}
                  {telegram && <a href={telegram} target="_blank" rel="noopener noreferrer" className="sub-icon-btn"><FaTelegram /></a>}
                  {skype && <a href={skype} target="_blank" rel="noopener noreferrer" className="sub-icon-btn"><FaSkype /></a>}
                  {paypal && <a href={paypal} target="_blank" rel="noopener noreferrer" className="sub-icon-btn"><FaPaypal /></a>}
               </motion.div>
            )}

            {/* BUTTON */}
            <motion.button
              variants={itemVariants}
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => downloadVCard(userData)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30"
            >
              <FiUserPlus />
              Save Contact
            </motion.button>
          </div>
        </div>

        {/* FOOTER */}
        <motion.div variants={itemVariants} className="text-center py-10">
          <a
            href="https://cardyn.shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-white transition"
          >
            Powered by Cardyn
          </a>
        </motion.div>
      </motion.div>

      {/* ICON STYLE */}
      <style>{`
        .icon-btn {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all 0.3s ease;
        }
        .sub-icon-btn {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white/50;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }
        .sub-icon-btn:hover {
           background: rgba(255,255,255,0.1);
           color: white;
        }
      `}</style>
    </div>
  );
};

export default PrismCreative;