import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from "../common/StandardComponents";

const DiamondElite = ({ userData }) => {
  const { displayName, email, role, phone, website, address, city, instagram, facebook, linkedin, twitter, logo, avatar, designation } = userData || {};

  const displayPhone = phone;
  const displayRole = designation || role || "Identity & Space";
  const finalAddress = address || city;
  const mapImage = "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop";

  const getSocialUrl = (platform, value) => {
    if (!value) return null;
    if (value.startsWith('http')) return value;
    switch (platform) {
      case 'linkedin': return `https://linkedin.com/in/${value.replace('@', '')}`;
      case 'instagram': return `https://instagram.com/${value.replace('@', '')}`;
      case 'twitter': return `https://twitter.com/${value.replace('@', '')}`;
      case 'facebook': return `https://facebook.com/${value}`;
      case 'website': return `https://${value}`;
      default: return `https://${value}`;
    }
  };

  const ActionLink = ({ icon: Icon, label, url }) => {
    if (!url) return null;
    return (
      <a
        href={url}
        target={url.startsWith('http') ? '_blank' : '_self'}
        rel="noopener noreferrer"
        className="w-full bg-[#151515] border border-[#2a2a2a] p-4 rounded-xl flex items-center gap-4 hover:border-[#444] hover:bg-[#1a1a1a] transition-all cursor-pointer shadow-sm group"
      >
        <Icon size={20} className="text-[#0ea5e9]" />
        <span className="text-[13px] font-medium text-[#e0e0e0] group-hover:text-white transition-colors">{label}</span>
        <FiIcons.FiChevronRight size={18} className="text-zinc-600 ml-auto group-hover:text-zinc-300 transition-colors" />
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-[#111111] font-sans pb-12 text-zinc-200 flex flex-col items-center">
      <div className="w-full max-w-[360px] px-6 pt-16 flex flex-col items-center">

        {/* Profile Image */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-[1.5px] border-[#fbbf24] bg-[#111] shadow-[0_0_15px_rgba(251,191,36,0.15)] mb-5 p-[2px]">
          <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
            {avatar ? (
              <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : logo ? (
              <img src={logo} alt="Logo" className="w-full h-full object-contain p-2" />
            ) : (
              <span className="text-4xl text-amber-500 uppercase font-light">{(displayName || 'A')[0]}</span>
            )}
          </div>
        </div>

        {/* Identity Info */}
        <h1 className="text-[28px] font-serif tracking-[0.1em] text-[#f4f4f4] uppercase text-center mb-1">
          {displayName || 'ARCHITECT'}
        </h1>
        <p className="text-[9px] font-bold tracking-[0.2em] text-[#888] uppercase text-center font-sans mb-10">
          {displayRole}
        </p>

        {/* Stacked Links */}
        <div className="w-full flex flex-col gap-3">
          <ActionLink icon={FiIcons.FiGlobe} label="Visit Website" url={website ? getSocialUrl('website', website) : null} />
          <ActionLink icon={FiIcons.FiMail} label="Email Me" url={email ? `mailto:${email}` : null} />
          <ActionLink icon={FiIcons.FiPhone} label="Call Now" url={phone ? `tel:${phone}` : null} />
        </div>

        {/* Social Icons */}
        <div className="w-full mt-8 flex justify-center gap-8 items-center flex-wrap">
          {[
            { icon: FiIcons.FiCamera, platform: 'instagram', val: instagram },
            { icon: FiIcons.FiUsers, platform: 'facebook', val: facebook },
            { icon: FiIcons.FiGlobe, platform: 'website', val: website },
            { icon: FiIcons.FiLinkedin, platform: 'linkedin', val: linkedin },
            { icon: FiIcons.FiTwitter, platform: 'twitter', val: twitter },
          ].map((social, idx) => social.val && (
            <a key={idx} href={getSocialUrl(social.platform, social.val)} target="_blank" rel="noopener noreferrer" className="text-[#0ea5e9] hover:text-white transition-colors">
              <social.icon size={24} />
            </a>
          ))}
          {/* Fallback to show icons even if links aren't provided to match UI presentation exactly if desired */}
          {!instagram && !facebook && !website && (
            <>
              <button className="text-[#0ea5e9] hover:text-white transition-colors"><FiIcons.FiCamera size={24} /></button>
              <button className="text-[#0ea5e9] hover:text-white transition-colors"><FiIcons.FiUsers size={24} /></button>
              <button className="text-[#0ea5e9] hover:text-white transition-colors"><FiIcons.FiGlobe size={24} /></button>
            </>
          )}
        </div>

        {/* View Collection */}
        <button className="w-full mt-8 py-4 border border-[#ea580c] rounded-xl flex justify-center items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-[#ea580c] hover:bg-[#ea580c] hover:text-[#111] transition-colors uppercase">
          View Collection
          <FiIcons.FiGrid size={16} />
        </button>

        {/* Map Block */}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(finalAddress || "5th Ave, Manhattan")}`}
          target="_blank" rel="noopener noreferrer"
          className="w-full h-36 mt-8 rounded-xl overflow-hidden relative group block shadow-lg border border-[#2a2a2a] bg-[#e5e5e5]"
        >
          <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" alt="Map" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
            <div className="max-w-[70%]">
              <p className="text-[9px] font-medium tracking-wide text-zinc-400 uppercase mb-0.5">Principal Office</p>
              <p className="text-[13px] text-white font-medium truncate">{finalAddress || "5th Ave, Manhattan"}</p>
            </div>
            <div className="bg-[#222]/80 backdrop-blur-sm border border-[#333] text-zinc-200 px-3 py-1.5 rounded-md text-[9px] font-bold tracking-widest hover:bg-white hover:text-black transition-colors uppercase">
              Open Map
            </div>
          </div>
        </a>

        {/* Save Contact */}
        <button
          onClick={() => downloadVCard(userData)}
          className="w-full mt-8 py-4 bg-[#0ea5e9] hover:bg-[#0284c7] text-white rounded-xl flex justify-center items-center gap-3 text-[11px] font-bold tracking-[0.1em] uppercase transition-colors shadow-lg"
        >
          <FiIcons.FiUserPlus size={18} />
          Save Contact
        </button>

        {/* Footer */}
        <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block mt-12 text-[8px] font-black tracking-[0.6em] text-[#333] hover:text-[#555] transition-colors uppercase text-center pb-8">
          Powered by Cardyn
        </a>

      </div>
    </div>
  );
};

export default DiamondElite;
