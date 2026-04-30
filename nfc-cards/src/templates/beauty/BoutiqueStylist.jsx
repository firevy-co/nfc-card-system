import React from "react";
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const BoutiqueStylist = ({ userData }) => {
   const {
      displayName, website, email, phone, mobileNumber,
      companyName, designation, role, address, city,
      instagram, linkedin, facebook, twitter, bio, avatar, logo
   } = userData || {};

   const displayPhone = mobileNumber || phone;
   const displayRole = designation || role || "Senior Stylist";
   const finalAddress = address || city;

   return (
      <div className="w-full bg-[#FFF0F5] text-[#D35D92] font-['Mulish'] pb-12 relative overflow-hidden">
         {/* Top Header / Hero */}
         <div className="bg-white rounded-b-[3rem] p-8 shadow-sm relative z-10">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/brick-wall-dark.png')] opacity-[0.02]" />
            <div className="flex justify-between items-start mb-6">
               <div className="w-20 h-20 bg-[#FFF9FB] rounded-full border border-[#FFDDF0] flex items-center justify-center shadow-inner overflow-hidden">
                  {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-2" /> : avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-3xl font-black opacity-20">{(displayName || 'B')[0]}</span>}
               </div>
               <div className="flex gap-2">
                  <FiIcons.FiHeart className="text-[#FFDDF0]" size={24} />
                  <FiIcons.FiStar className="text-[#FFDDF0]" size={24} />
               </div>
            </div>
            
            <h1 className="text-4xl font-black text-[#8E44AD] tracking-tighter leading-none mb-2">
               {displayName || "Boutique Stylist"}
            </h1>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] bg-[#FFF0F5] inline-block px-3 py-1 rounded-full">{displayRole}</p>
            {companyName && <p className="text-sm font-bold text-[#8E44AD]/60 mt-3">{companyName}</p>}
         </div>

         <div className="px-6 mt-8 space-y-8">
            {/* Biography Section */}
            {bio && (
               <div className="bg-white/60 p-6 rounded-[2rem] border border-white">
                  <FiIcons.FiFeather className="mb-3 text-[#8E44AD]" size={20} />
                  <p className="text-sm font-medium leading-relaxed">{bio}</p>
               </div>
            )}

            {/* Services Grid (Template Specific Details) */}
            <div>
               <h3 className="text-xs font-black uppercase tracking-widest text-[#8E44AD] mb-4 pl-2">Signature Services</h3>
               <div className="grid grid-cols-2 gap-3">
                  {[
                     { title: "Hair Styling", desc: "Cut & Color", icon: FiIcons.FiScissors },
                     { title: "Bridal", desc: "Full Package", icon: FiIcons.FiCamera },
                     { title: "Nail Art", desc: "Custom Designs", icon: FiIcons.FiEdit2 },
                     { title: "Spa", desc: "Relaxation", icon: FiIcons.FiWind }
                  ].map((srv, i) => (
                     <div key={i} className="bg-white rounded-[1.5rem] p-4 text-center border border-[#FFDDF0] hover:shadow-lg transition-shadow">
                        <srv.icon className="mx-auto mb-2 text-[#8E44AD]" size={20} />
                        <h4 className="text-xs font-bold text-[#8E44AD]">{srv.title}</h4>
                        <p className="text-[9px] uppercase tracking-wider text-[#D35D92]/70">{srv.desc}</p>
                     </div>
                  ))}
               </div>
            </div>

            {/* Quick Actions / Bento Box */}
            <div className="grid grid-cols-2 gap-3">
               {displayPhone && (
                  <a href={`tel:${displayPhone}`} className="bg-[#8E44AD] text-white p-5 rounded-[2rem] flex flex-col items-center justify-center gap-2 hover:bg-[#732d91] transition-colors shadow-lg shadow-[#8E44AD]/20">
                     <FiIcons.FiPhone size={24} />
                     <span className="text-[10px] font-black uppercase tracking-wider">Call Now</span>
                  </a>
               )}
               {email && (
                  <a href={`mailto:${email}`} className="bg-white text-[#8E44AD] border-2 border-[#8E44AD] p-5 rounded-[2rem] flex flex-col items-center justify-center gap-2 hover:bg-[#FFF0F5] transition-colors">
                     <FiIcons.FiMail size={24} />
                     <span className="text-[10px] font-black uppercase tracking-wider">Email Us</span>
                  </a>
               )}
            </div>

            {/* Extended Contact & Location */}
            <div className="bg-white rounded-[2rem] p-6 border border-[#FFDDF0] space-y-4">
               <h3 className="text-xs font-black uppercase tracking-widest text-[#8E44AD] mb-4">Studio Info</h3>
               {finalAddress && (
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-[#FFF0F5] flex items-center justify-center shrink-0">
                        <FiIcons.FiMapPin />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-wider text-[#8E44AD]">Location</p>
                        <p className="text-sm font-semibold">{finalAddress}</p>
                     </div>
                  </div>
               )}
               {website && (
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-[#FFF0F5] flex items-center justify-center shrink-0">
                        <FiIcons.FiGlobe />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-wider text-[#8E44AD]">Website</p>
                        <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:underline truncate max-w-[200px] inline-block">{website}</a>
                     </div>
                  </div>
               )}
            </div>

            {/* Socials Row */}
            <div className="flex justify-center gap-4 py-4">
               {[
                  { icon: FiIcons.FiInstagram, val: instagram, url: instagram?.startsWith('http') ? instagram : `https://instagram.com/${instagram}` },
                  { icon: FiIcons.FiLinkedin, val: linkedin, url: linkedin?.startsWith('http') ? linkedin : `https://linkedin.com/in/${linkedin}` },
                  { icon: FiIcons.FiFacebook, val: facebook, url: facebook?.startsWith('http') ? facebook : `https://facebook.com/${facebook}` },
                  { icon: FiIcons.FiTwitter, val: twitter, url: twitter?.startsWith('http') ? twitter : `https://twitter.com/${twitter}` }
               ].map((social, idx) => social.val && (
                  <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white text-[#8E44AD] border border-[#FFDDF0] flex items-center justify-center hover:scale-110 transition-transform shadow-sm">
                     <social.icon size={20} />
                  </a>
               ))}
            </div>

            <button onClick={() => downloadVCard(userData)} className="w-full bg-[#8E44AD] text-white py-5 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-[#D35D92] transition-colors shadow-xl flex justify-center items-center gap-2 mt-4">
               <FiIcons.FiDownload size={18} /> Book & Save Contact
            </button>
            
            <PoweredBy />
         </div>
      </div>
   );
};

export default BoutiqueStylist;
