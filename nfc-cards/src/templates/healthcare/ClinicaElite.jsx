import React from 'react';
import { FiPhone, FiMail, FiGlobe, FiMapPin, FiLinkedin, FiInstagram, FiTwitter, FiGithub } from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaYoutube, FaTiktok, FaDiscord, FaTelegram, FaSkype, FaPaypal } from 'react-icons/fa';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const ClinicaElite = ({ userData }) => {
  const { 
    displayName, email, role, phone, website, address, bio,
    whatsapp, facebook, youtube, tiktok, discord, telegram, skype, paypal,
    linkedin, instagram, twitter, github, company, businessName, logo, profileImage
  } = userData || {};

  return (
    <div className="w-full bg-[#111] font-Inter text-white">
      <div className="w-full bg-black border-b border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600" />
        
        <div className="p-12">
          <header className="mb-12 flex items-center justify-between">
             <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-1 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-black rounded-[1.4rem] flex items-center justify-center text-4xl font-black italic">
                    <img src={logo || profileImage} alt={displayName} className="w-full h-full object-cover" />
                </div>
             </div>
             <div className="text-right">
                <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] italic mb-2">Security ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                <div className="w-12 h-1 bg-blue-600 ml-auto" />
             </div>
          </header>

          <div className="mb-12">
             <h1 className="text-4xl font-black tracking-tighter mb-2">{displayName || 'Clinica Elite'}</h1>
             
             {(company || businessName) && (
                <p className="text-white/20 text-[10px] font-bold mt-4 uppercase tracking-[0.3em]">
                   {company || businessName}
                </p>
             )}
             {bio && (
                <p className="mt-8 text-white/40 text-sm leading-relaxed max-w-sm font-medium italic">
                   "{bio}"
                </p>
             )}
          </div>
          
          <div className="space-y-4">
             <p className="text-[10px] text-white/20 font-black tracking-[0.5em] uppercase mb-8">
                Secure Uplink
             </p>
             {email && <StandardContactLink icon={FiMail} value={email} href={`mailto:${email}`} />}
             {phone && <StandardContactLink icon={FiPhone} value={phone} href={`tel:${phone}`} />}
             {website && <StandardContactLink icon={FiGlobe} value={website.replace(/(^\w+:|^)\/\//, '')} href={website.startsWith('http') ? website : `https://${website}`} />}
             {address && <StandardContactLink icon={FiMapPin} value={address} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} />}
          </div>

          {/* SOCIAL MATRIX */}
          <div className="grid grid-cols-4 gap-4 py-12 border-y border-white/5 my-12">
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
          
          <div className="space-y-4">
             {website && (
                <a 
                  href={website.startsWith('http') ? website : `https://${website}`} 
                  className="w-full flex items-center justify-center gap-4 bg-white text-black py-6 rounded-2xl font-black text-xs uppercase tracking-[0.4em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95"
                >
                   Initialize Portal
                </a>
             )}
             <StandardSaveContactButton userData={userData} />
          </div>

          {address && <div className="mt-12"><StandardMapPreview address={address} /></div>}
          
          <div className="mt-16 pb-8 flex justify-between items-center opacity-20">
             <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[7px] font-black tracking-[0.6em] text-white hover:opacity-100 transition-opacity">POWERED BY CARDYN</a>
             <div className="flex gap-1">
                <div className="w-4 h-0.5 bg-white" />
                <div className="w-1 h-0.5 bg-white" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicaElite;
