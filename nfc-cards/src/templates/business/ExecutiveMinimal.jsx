import React from 'react';
import { FiPhone, FiMail, FiGlobe, FiMapPin, FiLinkedin, FiTwitter, FiGithub, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaYoutube, FaTiktok, FaDiscord, FaTelegram, FaSkype, FaPaypal } from 'react-icons/fa';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const ExecutiveMinimal = ({ userData }) => {
  const { 
    displayName, email, role, phone, website, address, bio,
    whatsapp, facebook, youtube, tiktok, discord, telegram, skype, paypal,
    linkedin, instagram, twitter, github, company, businessName, logo, profileImage
  } = userData || {};

  return (
    <div className="w-full bg-[#020617] text-white font-['Mulish']">
        <div className="w-full bg-[#1e293b]/20 border-b border-white/5 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
          <header className="pt-16 pb-12 text-center flex flex-col items-center">
            <div className="w-28 h-28 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 text-4xl font-black mb-8 shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <img src={logo || profileImage} alt={displayName} className="w-full h-full object-cover" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight capitalize leading-none mb-3">{displayName || 'Anonymous Identity'}</h1>
            
            {(company || businessName) && (
                <p className="text-white/20 text-[9px] font-bold mt-4 uppercase tracking-[0.3em]">
                   {company || businessName}
                </p>
            )}
            {bio && (
               <p className="mt-8 text-white/40 text-sm leading-relaxed max-w-sm px-8 font-medium">
                  {bio}
               </p>
            )}
          </header>

          <div className="p-8 space-y-12">
            <div className="space-y-4">
               <p className="text-[10px] text-white/20 font-black tracking-[0.5em] uppercase mb-8 text-center">
                  Executive Suite
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

            <div className="space-y-4 pt-4">
               {website && (
                  <a 
                    href={website.startsWith('http') ? website : `https://${website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center bg-white text-black py-6 rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-cyan-400 transition-all active:scale-95"
                  >
                     Launch Portal
                  </a>
               )}
               <StandardSaveContactButton userData={userData} />
            </div>

            {address && <div className="mt-12"><StandardMapPreview address={address} /></div>}

            <footer className="mt-16 pb-8 text-center">
              <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="inline-block text-[9px] font-black tracking-[0.6em] uppercase text-white/10 hover:text-cyan-400 transition-colors py-3 px-8 border border-white/5 rounded-full">
                Powered by Cardyn
              </a>
            </footer>
          </div>
        </div>
    </div>
  );
};

export default ExecutiveMinimal;
