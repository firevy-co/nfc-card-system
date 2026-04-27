import React from "react";
import {
   FiHome,
   FiMapPin,
   FiPhone,
   FiMail,
   FiGlobe,
   FiInstagram,
   FiLinkedin,
   FiTwitter,
   FiGithub
} from "react-icons/fi";
import { FaWhatsapp, FaFacebook, FaYoutube, FaTiktok, FaDiscord, FaTelegram, FaSkype, FaPaypal } from "react-icons/fa";
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const ModernRealty = ({ userData }) => {
   const {
      displayName, email, role, phone, website, address, bio,
      whatsapp, facebook, youtube, tiktok, discord, telegram, skype, paypal,
      linkedin, instagram, twitter, github, company, businessName, logo, profileImage
   } = userData || {};

   return (
      <div className="w-full bg-[#020617] text-white font-['Mulish']">
         <div className="w-full bg-[#1e293b]/20 border-b border-white/5 shadow-2xl backdrop-blur-xl overflow-hidden">
            
            {/* HERO SECTION */}
            <div className="relative h-72 bg-zinc-900">
               <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa" 
                  className="w-full h-full object-cover opacity-60"
                  alt="Modern House"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
               <div className="absolute bottom-8 left-8 flex items-end gap-6 translate-y-4">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl p-2 flex items-center justify-center shrink-0 overflow-hidden">
                     <img src={logo || profileImage} className="w-full h-full object-cover" alt={displayName} />
                  </div>
                  <div className="pb-4">
                     <div className="flex items-center gap-2 text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 w-max">
                        <FiHome size={12} />
                        PREMIUM LISTINGS
                     </div>
                     <h1 className="text-4xl font-black text-white tracking-tight leading-none capitalize">
                        {displayName || "Agency Name"}
                     </h1>
                     
                  </div>
               </div>
            </div>

            <div className="p-8 space-y-12">
               {bio && (
                  <div className="text-center px-4 pt-4">
                     <p className="text-sm text-white/50 leading-relaxed font-medium italic">
                        "{bio}"
                     </p>
                  </div>
               )}

               {/* FEATURED PROPERTIES */}
               <div className="grid grid-cols-2 gap-4">
                  <div className="relative rounded-[2rem] overflow-hidden h-40 border border-white/5 shadow-2xl">
                     <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750" className="w-full h-full object-cover" alt="Luxury Villa" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                        <span className="text-white text-[10px] font-black uppercase tracking-widest">Luxe Villa</span>
                     </div>
                  </div>
                  <div className="relative rounded-[2rem] overflow-hidden h-40 border border-white/5 shadow-2xl">
                     <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858" className="w-full h-full object-cover" alt="Modern Loft" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                        <span className="text-white text-[10px] font-black uppercase tracking-widest">Modern Loft</span>
                     </div>
                  </div>
               </div>

               {/* CONTACT STACK */}
               <div className="space-y-4">
                  <p className="text-[10px] text-white/20 font-black tracking-[0.5em] uppercase mb-8 text-center">
                     Direct Uplink
                  </p>
                  {email && <StandardContactLink icon={FiMail} value={email} href={`mailto:${email}`} />}
                  {phone && <StandardContactLink icon={FiPhone} value={phone} href={`tel:${phone}`} />}
                  {website && <StandardContactLink icon={FiGlobe} value={website.replace(/(^\w+:|^)\/\//, '')} href={website.startsWith('http') ? website : `https://${website}`} />}
                  {address && <StandardContactLink icon={FiMapPin} value={address} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} />}
               </div>

               {/* SOCIAL NEXUS */}
               <div className="grid grid-cols-4 gap-4 py-8 border-y border-white/5">
                  {[
                     { id: 'linkedin', val: linkedin, icon: FiLinkedin, color: 'hover:bg-[#0077b5]' },
                     { id: 'instagram', val: instagram, icon: FiInstagram, color: 'hover:bg-[#e1306c]' },
                     { id: 'facebook', val: facebook, icon: FaFacebook, color: 'hover:bg-[#1877f2]' },
                     { id: 'twitter', val: twitter, icon: FiTwitter, color: 'hover:bg-black' },
                     { id: 'whatsapp', val: whatsapp, icon: FaWhatsapp, color: 'hover:bg-[#25d366]' },
                     { id: 'youtube', val: youtube, icon: FaYoutube, color: 'hover:bg-[#ff0000]' },
                     { id: 'telegram', val: telegram, icon: FaTelegram, color: 'hover:bg-[#0088cc]' },
                     { id: 'github', val: github, icon: FiGithub, color: 'hover:bg-zinc-800' }
                  ].map(social => social.val && (
                     <a 
                       key={social.id} 
                       href={social.id === 'whatsapp' ? `https://wa.me/${social.val.replace(/\D/g, '')}` : (social.val.startsWith('http') ? social.val : `https://${social.id}.com/${social.val}`)} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className={`aspect-square rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all shadow-lg ${social.color}`}
                     >
                        <social.icon size={22} />
                     </a>
                  ))}
               </div>

               {/* Action Buttons */}
               <div className="space-y-4 pt-4">
                  {website && (
                     <a 
                       href={website.startsWith('http') ? website : `https://${website}`}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="w-full flex items-center justify-center bg-white text-black py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-cyan-400 transition-all active:scale-95"
                     >
                        Enter Portal
                     </a>
                  )}
                  <StandardSaveContactButton userData={userData} />
               </div>

               {/* Map Preview */}
               {address && <StandardMapPreview address={address} />}

               {/* Branding */}
               <footer className="pt-10 pb-8 text-center">
                  <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="inline-block text-[9px] font-black uppercase tracking-[0.6em] text-white/10 hover:text-cyan-400 transition-colors py-3 px-8 border border-white/5 rounded-full">
                     Powered by Cardyn
                  </a>
               </footer>
            </div>
         </div>
      </div>
   );
};

export default ModernRealty;
