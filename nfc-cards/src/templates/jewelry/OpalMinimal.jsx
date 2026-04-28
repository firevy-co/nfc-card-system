import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const OpalMinimal = ({ userData }) => {
  const {
    displayName,
    email,
    role,
    phone,
    website,
    address,
    instagram,
    linkedin
  } = userData || {};

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

  const SpineLink = ({ icon: Icon, label, url, showArrow }) => {
    if (!url) return null;
    const words = label.split(' ');
    const firstWord = words[0];
    const restWords = words.slice(1).join(' ') || "CONNECT";

    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center w-[85%] mx-auto py-2 group">

        {/* Icon Box */}
        <div className="w-[60px] h-[60px] bg-[#fbf6e8] border border-[#f0e4cc] rounded-[22px] flex items-center justify-center shadow-sm group-hover:bg-[#f6ebd4] transition-colors shrink-0">
          <Icon size={22} className="text-[#c79d45]" />
        </div>

        {/* Text */}
        <div className="ml-6 flex-1 text-left">
          <p className="text-[#c79d45] text-[10px] font-bold tracking-[0.3em] uppercase leading-[1.6]">
            {firstWord}<br />{restWords}
          </p>
        </div>

        {showArrow && (
          <div className="ml-2 shrink-0">
            <FiIcons.FiArrowUpRight size={20} className="text-[#c79d45] opacity-70" />
          </div>
        )}
      </a>
    );
  };

  const CustomMapPreview = ({ address }) => {
    if (!address || address === "" || address.includes("resolving")) return null;
    const encodedAddress = encodeURIComponent(address);

    return (
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative w-full h-52 rounded-[32px] overflow-hidden group shadow-md border border-slate-100"
      >
        <img
          src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80"
          alt="Showroom"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent"></div>

        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-[#dca54c] text-[10px] font-bold uppercase tracking-[0.25em] mb-1">
            Visit Showroom
          </p>
          <p className="text-white text-[17px] font-medium truncate mb-4">
            {address}
          </p>
          <div className="inline-block bg-[#dca54c] text-black px-6 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] shadow-lg group-hover:bg-[#ebbb67] transition-colors">
            Open Map
          </div>
        </div>
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-5 py-14 font-['Mulish'] md:bg-neutral-950 md:items-center py-0 md:py-12">
      <div className="w-full max-w-md">

        {/* Main Card */}
        <div className="bg-white rounded-[36px] shadow-[0_20px_80px_rgba(15,23,42,0.08)] overflow-hidden border border-slate-100">

          {/* Header */}
          <div className="relative px-8 pt-10 pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">

            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-pink-500/20 rounded-full blur-3xl"></div>

            <p className="text-white/60 text-xs uppercase tracking-[0.4em] font-semibold relative z-10">
              Digital Profile
            </p>

            <h1 className="text-white text-3xl font-black mt-4 relative z-10 leading-tight">
              {displayName || "Opal Minimal"}
            </h1>

            {role && (
              <p className="text-white/70 text-sm mt-2 font-medium relative z-10">
                {role}
              </p>
            )}

            {/* Logo */}
            <div className="absolute left-8 -bottom-12 z-20">
              <div className="w-24 h-24 rounded-[28px] bg-white shadow-xl border border-slate-100 flex items-center justify-center overflow-hidden">
                {userData?.logo ? (
                  <img
                    src={userData.logo}
                    alt="Logo"
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <span className="text-3xl font-black text-slate-800">
                    {displayName?.charAt(0) || "O"}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Body with Custom Spine UI */}
          <div className="px-6 pt-20 pb-8 bg-white relative">

            {/* Contact Info */}
            <div className="mb-8 space-y-3">
              <SpineLink icon={FiIcons.FiGlobe} label="Visit Website" url={website ? getSocialUrl('website', website) : null} />
              <SpineLink icon={FiIcons.FiMail} label="Email Me" url={email ? `mailto:${email}` : null} />
              <SpineLink icon={FiIcons.FiPhone} label="Call Now" url={phone ? `tel:${phone}` : null} showArrow={true} />
            </div>

            {/* Social Section */}
            {(instagram || linkedin) && (
              <div className="mb-8 space-y-3 mt-10">
                <div className="w-[85%] mx-auto">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-[#8e9ab2] font-bold mb-5">
                    Social Links
                  </p>
                </div>

                <SpineLink icon={FiIcons.FiInstagram} label="Instagram Profile" url={getSocialUrl('instagram', instagram)} />
                <SpineLink icon={FiIcons.FiLinkedin} label="LinkedIn Profile" url={getSocialUrl('linkedin', linkedin)} />
              </div>
            )}

            {/* Map */}
            {address && (
              <div className="mt-10 px-4">
                <CustomMapPreview address={address} />
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 px-4">
              <button onClick={() => downloadVCard(userData)} className="w-full py-3 mt-4 border rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs opacity-80 hover:opacity-100 transition-opacity">Save Contact</button>
            </div>

            {/* Footer */}
            <footer className="mt-10 pt-6 border-t border-slate-100 text-center">
              <a
                href="https://cardyn.shop/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] uppercase tracking-[0.4em] font-bold text-slate-300 hover:text-slate-500 transition-colors"
              >
                Powered by Cardyn
              </a>
            </footer>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OpalMinimal;