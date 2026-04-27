import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaYoutube, FaTiktok, FaDiscord, FaTelegram, FaSkype, FaPaypal } from 'react-icons/fa';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const ClassicExecutive = ({ userData }) => {
   const {
      displayName, email, role, phone, website, address,
      linkedin, instagram, facebook, twitter, github,
      whatsapp, youtube, tiktok, discord, telegram, skype, paypal,
      bio, company, businessName, logo, profileImage
   } = userData || {};

   return (
      <div className="w-full bg-[#020617] text-white font-['Mulish']">
         <div className="w-full bg-[#1e293b]/20 border-b border-white/5 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full translate-x-32 -translate-y-32 blur-[100px] group-hover:bg-cyan-400/20 transition-all duration-700"></div>

            {/* Header: Photo & Identity */}
            <header className="flex flex-col items-center p-12 relative z-10">
               <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-cyan-400 to-indigo-600 mb-8 flex items-center justify-center p-1.5 shadow-2xl">
                  <div className="w-full h-full bg-[#020617] border border-white/10 rounded-[2.2rem] flex items-center justify-center text-4xl font-black capitalize overflow-hidden">
                      <img src={logo || profileImage} alt={displayName} className="w-full h-full object-cover" />
                  </div>
               </div>
               <h1 className="text-4xl font-black tracking-tight mb-3 text-white capitalize leading-tight text-center">
                  {displayName || "No Name Set"}
               </h1>
               
               {(company || businessName) && (
                  <p className="text-white/30 text-[10px] font-bold mt-6 uppercase tracking-[0.4em]">
                     {company || businessName}
                  </p>
               )}
               {bio && (
                  <p className="mt-8 text-white/40 text-sm leading-relaxed text-center max-w-sm font-medium">
                     {bio}
                  </p>
               )}
            </header>

            {/* Content Section */}
            <div className="p-8 space-y-12 relative z-10">
               {/* Contact Matrix */}
               <div className="space-y-4">
                  {email && <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />}
                  {phone && <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />}
                  {website && <StandardContactLink icon={FiIcons.FiGlobe} value={website.replace(/(^\w+:|^)\/\//, '')} href={website.startsWith('http') ? website : `https://${website}`} />}
                  {address && <StandardContactLink icon={FiIcons.FiMapPin} value={address} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} />}
               </div>

               {/* Social Grid */}
               <div className="grid grid-cols-4 gap-4 py-8 border-y border-white/5">
                  {[
                     { id: 'linkedin', val: linkedin, icon: FiIcons.FiLinkedin, color: 'hover:bg-[#0077b5]' },
                     { id: 'instagram', val: instagram, icon: FiIcons.FiInstagram, color: 'hover:bg-[#e1306c]' },
                     { id: 'twitter', val: twitter, icon: FiIcons.FiTwitter, color: 'hover:bg-black' },
                     { id: 'github', val: github, icon: FiIcons.FiGithub, color: 'hover:bg-zinc-800' },
                     { id: 'whatsapp', val: whatsapp, icon: FaWhatsapp, color: 'hover:bg-[#25d366]' },
                     { id: 'facebook', val: facebook, icon: FaFacebook, color: 'hover:bg-[#1877f2]' },
                     { id: 'youtube', val: youtube, icon: FaYoutube, color: 'hover:bg-[#ff0000]' },
                     { id: 'telegram', val: telegram, icon: FaTelegram, color: 'hover:bg-[#0088cc]' }
                  ].map((social, i) => social.val && (
                     <a
                        key={i}
                        href={social.id === 'whatsapp' ? `https://wa.me/${social.val.replace(/\D/g, '')}` : (social.val.startsWith('http') ? social.val : `https://${social.id}.com/${social.val}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`aspect-square rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all ${social.color}`}
                     >
                        <social.icon size={22} />
                     </a>
                  ))}
               </div>

               {/* Action Buttons */}
               <div className="space-y-4">
                  {website && (
                     <a 
                        href={website.startsWith('http') ? website : `https://${website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center bg-white text-black py-5 rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-cyan-400 transition-all active:scale-95"
                     >
                        Enter Portal
                     </a>
                  )}
                  <StandardSaveContactButton userData={userData} />
               </div>

               {/* Map Preview */}
               {address && <StandardMapPreview address={address} />}

               {/* Branding */}
               <footer className="pt-8 pb-4 text-center">
                  <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="inline-block text-[9px] font-black uppercase tracking-[0.6em] text-white/10 hover:text-cyan-400 transition-colors py-3 px-8 border border-white/5 rounded-full">
                     Powered by Cardyn
                  </a>
               </footer>
            </div>
         </div>
      </div>
   );
};

export default ClassicExecutive;
