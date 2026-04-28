import React from 'react';
import { FiActivity, FiPhone, FiMail, FiMapPin, FiCalendar, FiGlobe, FiInstagram, FiTwitter, FiLinkedin, FiYoutube, FiUserPlus } from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const PulseLink = ({ icon: Icon, label, value, href }) => {
  if (!value || value === "" || value.includes('resolving')) return null;
  const Comp = href ? 'a' : 'div';
  return (
    <Comp href={href} target={href && href.startsWith('http') ? "_blank" : undefined} rel={href && href.startsWith('http') ? "noopener noreferrer" : undefined} className="flex items-center justify-between border-b border-white/5 pb-4 pt-2 group/link">
       <div className="flex items-center gap-3 text-white/40 group-hover/link:text-[#ccff00] transition-colors">
          <Icon size={16} />
          <span className="text-[10px] font-black tracking-widest uppercase">{label}</span>
       </div>
       <span className="text-white font-bold text-sm truncate max-w-[150px] text-right">{value}</span>
    </Comp>
  );
};

const PulseSocial = ({ icon: Icon, href }) => {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[3rem] h-12 flex items-center justify-center bg-white/5 rounded-xl text-white/40 hover:bg-[#ccff00] hover:text-black transition-all">
       <Icon size={18} />
    </a>
  );
};

const PulseWorkout = ({ userData }) => {
  const { displayName, email, phone, website, address, youtube, linkedin, twitter, instagram, logo } = userData || {};
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 font-['Mulish',sans-serif]">
      <div className="w-full max-w-sm bg-zinc-900 border border-white/5 rounded-[2.5rem] p-1 shadow-2xl overflow-hidden group">
        <div className="bg-[#ccff00] p-10 rounded-[2.3rem] text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-5 group-hover:opacity-10 transition-opacity">
              <FiActivity size={200} className="absolute -top-10 -left-10" />
           </div>
           
           <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center text-[#ccff00] mx-auto mb-6 relative z-10 shadow-2xl overflow-hidden border-4 border-black group-hover:scale-105 transition-transform">
              {logo ? (
                  <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                  <FiActivity size={36} />
              )}
           </div>
           
           <h1 className="text-3xl font-black text-black tracking-tighter uppercase leading-none relative z-10 mb-2">{displayName || 'Pulse Pro'}</h1>
           <p className="text-[10px] text-black/60 font-black uppercase tracking-[0.4em] relative z-10">High Energy Protocol</p>
        </div>
        
        <div className="p-8 space-y-4">
           {/* Primary Actions Grid */}
           <div className="grid grid-cols-2 gap-3 pb-2">
              <a href={`tel:${phone}`} className={`bg-white/5 p-4 rounded-2xl flex flex-col items-center gap-2 border border-white/5 hover:border-[#ccff00] transition-all group/icon ${!phone ? 'hidden' : ''}`}>
                 <FiPhone size={20} className="text-[#ccff00]" />
                 <span className="text-[8px] font-black uppercase tracking-widest text-white/40 group-hover/icon:text-[#ccff00]">Call Now</span>
              </a>
              <a href={`mailto:${email}`} className={`bg-white/5 p-4 rounded-2xl flex flex-col items-center gap-2 border border-white/5 hover:border-[#ccff00] transition-all group/icon ${!email ? 'hidden' : ''}`}>
                 <FiMail size={20} className="text-[#ccff00]" />
                 <span className="text-[8px] font-black uppercase tracking-widest text-white/40 group-hover/icon:text-[#ccff00]">Email</span>
              </a>
           </div>
           
           {/* Secondary Info Links */}
           <div className="space-y-2 mb-4">
              <PulseLink icon={FiGlobe} label="Portal" value={website} href={website} />
              <PulseLink icon={FiMapPin} label="Location" value={address} />
           </div>
           
           {/* Socials Grid */}
           <div className="flex flex-wrap gap-2 pt-2 pb-4">
              <PulseSocial icon={FiInstagram} href={instagram} />
              <PulseSocial icon={FiYoutube} href={youtube} />
              <PulseSocial icon={FiTwitter} href={twitter} />
              <PulseSocial icon={FiLinkedin} href={linkedin} />
           </div>
           
           <button onClick={() => downloadVCard(userData)} className="w-full py-5 bg-white text-black rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-[#ccff00] active:scale-95 transition-all shadow-xl shadow-white/5">
              <FiUserPlus size={18} /> Connect Profile
           </button>
           
           {website && (
              <a href={website} target="_blank" rel="noopener noreferrer" className="w-full py-4 mt-3 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
                 <FiCalendar size={14} className="text-[#ccff00]" /> Book Session
              </a>
           )}
           
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-center text-[7px] text-white/10 font-bold tracking-[0.8em] pt-8 uppercase italic hover:text-white/40 transition-colors">Powered by Cardyn</a>
        </div>
      </div>
    </div>
  );
};
export default PulseWorkout;
