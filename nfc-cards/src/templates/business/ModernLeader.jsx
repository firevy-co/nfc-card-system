import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaYoutube, FaTiktok, FaDiscord, FaTelegram, FaSkype, FaPaypal } from 'react-icons/fa';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const ModernLeader = ({ userData }) => {
  const { 
    displayName, email, role, phone, website, address, bio, 
    whatsapp, facebook, youtube, tiktok, discord, telegram, skype, paypal,
    linkedin, instagram, twitter, github, company, businessName
  } = userData || {};

  const socialNodes = [
    { id: 'linkedin', icon: FiIcons.FiLinkedin, label: 'LinkedIn' },
    { id: 'instagram', icon: FiIcons.FiInstagram, label: 'Instagram' },
    { id: 'facebook', icon: FaFacebook, label: 'Facebook' },
    { id: 'twitter', icon: FiIcons.FiTwitter, label: 'Twitter' },
    { id: 'youtube', icon: FaYoutube, label: 'YouTube' },
    { id: 'github', icon: FiIcons.FiGithub, label: 'GitHub' },
    { id: 'whatsapp', icon: FaWhatsapp, label: 'WhatsApp' },
    { id: 'telegram', icon: FaTelegram, label: 'Telegram' },
    { id: 'discord', icon: FaDiscord, label: 'Discord' },
    { id: 'tiktok', icon: FaTiktok, label: 'TikTok' },
    { id: 'skype', icon: FaSkype, label: 'Skype' },
    { id: 'paypal', icon: FaPaypal, label: 'PayPal' },
  ].filter(node => userData?.[node.id]);

  return (
    <div className="w-full bg-slate-50 font-['Mulish']">
      <div className="w-full bg-white border-b border-slate-200 shadow-2xl overflow-hidden group">

        {/* EXECUTIVE HEADER BLOCK */}
        <div className="bg-slate-900 p-10 text-center text-white relative">
          <div className="absolute top-4 right-8">
            <FiIcons.FiAward size={24} className="text-slate-700 animate-pulse" />
          </div>

          {/* BRAND IDENTITY NODE */}
          <div className="w-32 h-32 rounded-3xl border-2 border-slate-700 mx-auto mb-6 flex items-center justify-center text-5xl font-black bg-slate-800 overflow-hidden shadow-2xl">
            <img src={userData.logo || userData.profileImage} alt={displayName} className="w-full h-full object-cover" />
          </div>

          <h1 className="text-3xl font-black tracking-tight leading-tight uppercase mb-2">
            {displayName || 'Director Identity'}
          </h1>
          
          {(company || businessName) && (
             <p className="text-slate-500 text-[10px] font-bold mt-4 uppercase tracking-widest">
                {company || businessName}
             </p>
          )}
        </div>

        {/* INTERACTION SUITE */}
        <div className="p-8 space-y-10">

          {/* BIO / VISION BLOCK */}
          {bio && (
            <div className="text-center px-4">
              <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
                "{bio}"
              </p>
            </div>
          )}

          {/* SOCIAL MEDIA MATRIX (ICON ROW) */}
          {socialNodes.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-4 py-6 border-y border-slate-50">
              {socialNodes.map(node => (
                <a
                  key={node.id}
                  href={node.id === 'whatsapp' ? `https://wa.me/${userData[node.id].replace(/\D/g, '')}` : (userData[node.id].startsWith('http') ? userData[node.id] : `https://${node.id}.com/${userData[node.id]}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white hover:scale-110 transition-all shadow-sm"
                  title={node.label}
                >
                  <node.icon size={20} />
                </a>
              ))}
            </div>
          )}

          {/* CONTACT INFRASTRUCTURE (LIST) */}
          <div className="space-y-4">
            {email && <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />}
            {phone && <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />}
            {address && <StandardContactLink icon={FiIcons.FiMapPin} value={address} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} />}
          </div>

          {/* MAP PROTOCOL */}
          {address && <StandardMapPreview address={address} />}

          {/* PRIMARY COMMAND: WEBSITE BUTTON */}
          {website && (
            <div className="pt-2">
              <a
                href={website.startsWith('http') ? website : `https://${website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center bg-slate-900 text-white py-5 rounded-2xl font-black text-xs tracking-[0.2em] uppercase hover:bg-black transition-all active:scale-95 shadow-xl"
              >
                Launch Protocol
              </a>
            </div>
          )}

          {/* SAVE CONTACT PROTOCOL */}
          <div className="pt-2">
            <StandardSaveContactButton userData={userData} />
          </div>

          {/* BRANDING FOOTER */}
          <div className="text-center pt-10 pb-10">
             <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="inline-block text-[9px] text-slate-300 font-black tracking-[0.5em] hover:text-slate-900 transition-colors uppercase py-2 px-6 border border-slate-100 rounded-full">
               Powered by Cardyn Identity
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernLeader;
