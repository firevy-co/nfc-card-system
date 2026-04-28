import React from 'react';
import { FiTv, FiPhone, FiMail, FiGlobe, FiYoutube, FiTwitter, FiInstagram, FiLinkedin, FiTwitch, FiMapPin, FiUserPlus, FiMonitor } from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const StreamLink = ({ icon: Icon, label, value, href }) => {
  if (!value || value === "" || value.includes('resolving')) return null;
  const Comp = href ? 'a' : 'div';
  return (
    <Comp href={href} target={href && href.startsWith('http') ? "_blank" : undefined} rel={href && href.startsWith('http') ? "noopener noreferrer" : undefined} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all font-bold text-sm text-white/80 group">
       <div className="flex items-center gap-3">
          <Icon size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40 italic">{label}</span>
       </div>
       <span className="truncate max-w-[140px] text-right">{value}</span>
    </Comp>
  );
};

const StreamSocial = ({ icon: Icon, href }) => {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[3.5rem] h-14 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-white/40 hover:text-[#6441a5] hover:bg-white transition-all cursor-pointer">
       <Icon size={22} />
    </a>
  );
};

const StreamNode = ({ userData }) => {
  const { displayName, email, phone, website, address, youtube, linkedin, twitter, twitch, instagram, logo } = userData || {};
  
  const mainStreamLink = twitch || youtube || website;
  const hasSocials = youtube || twitter || instagram || linkedin || (mainStreamLink !== twitch && twitch);
  
  return (
    <div className="min-h-screen bg-[#6441a5] flex items-center justify-center p-6 font-['Mulish',sans-serif] md:bg-neutral-950 md:items-center py-0 md:py-12">
      <div className="w-full max-w-sm bg-[#19171c] border border-white/10 rounded-[2.5rem] p-1 shadow-2xl overflow-hidden group">
        <div className="bg-[#6441a5] p-10 rounded-[2.3rem] text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
              <FiTv size={200} className="absolute -bottom-10 -right-10 rotate-12" />
           </div>
           
           <div className="w-24 h-24 rounded-[2rem] bg-white text-[#6441a5] flex items-center justify-center mx-auto mb-6 shadow-2xl relative z-10 transition-transform group-hover:scale-105 overflow-hidden">
              {logo ? (
                  <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                  <FiMonitor size={36} />
              )}
           </div>
           
           <h1 className="text-3xl font-black text-white tracking-tighter uppercase leading-none relative z-10 mb-2">{displayName || 'Stream Node'}</h1>
           <p className="text-[10px] text-white/70 font-black uppercase tracking-[0.3em] relative z-10">Live Broadcaster</p>
        </div>
        
        <div className="p-8 space-y-4">
           {/* Primary Actions */}
           <div className="flex gap-3 flex-col sm:flex-row">
              {mainStreamLink && (
                  <a href={mainStreamLink} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white text-[#6441a5] py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-white/5">
                     {twitch ? <FiTwitch size={18} /> : (youtube ? <FiYoutube size={18} /> : <FiGlobe size={18} />)} Live Now
                  </a>
              )}
              <button onClick={() => downloadVCard(userData)} className="flex-1 bg-[#6441a5] text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-[#6441a5]/20">
                 <FiUserPlus size={18} /> Connect
              </button>
           </div>
           
           {/* Socials Grid */}
           {hasSocials && (
               <div className="flex flex-wrap gap-3 pt-2">
                  <StreamSocial icon={FiTwitch} href={mainStreamLink === twitch ? null : twitch} />
                  <StreamSocial icon={FiYoutube} href={mainStreamLink === youtube ? null : youtube} />
                  <StreamSocial icon={FiInstagram} href={instagram} />
                  <StreamSocial icon={FiTwitter} href={twitter} />
                  <StreamSocial icon={FiLinkedin} href={linkedin} />
               </div>
           )}
           
           {/* Contact Links */}
           <div className="space-y-3 pt-2">
              <StreamLink icon={FiPhone} label="Direct" value={phone} href={`tel:${phone}`} />
              <StreamLink icon={FiMail} label="Signal" value={email} href={`mailto:${email}`} />
              {website !== mainStreamLink && <StreamLink icon={FiGlobe} label="Portal" value={website} href={website} />}
              <StreamLink icon={FiMapPin} label="Base" value={address} />
           </div>
        </div>
        
        <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-center text-[7px] text-white/10 font-black tracking-[1em] pb-8 uppercase italic hover:text-white/40 transition-colors">Powered by Cardyn</a>
      </div>
    </div>
  );
};
export default StreamNode;
