import React from 'react';
import { FiZap, FiPhone, FiMail, FiGlobe, FiYoutube, FiLinkedin, FiTwitter, FiInstagram, FiTwitch, FiMapPin, FiUserPlus } from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const NeonLink = ({ icon: Icon, label, value, href }) => {
  if (!value || value === "" || value.includes('resolving')) return null;
  const Comp = href ? 'a' : 'div';
  return (
    <Comp href={href} target={href && href.startsWith('http') ? "_blank" : undefined} rel={href && href.startsWith('http') ? "noopener noreferrer" : undefined} className="w-full flex items-center justify-between py-4 px-6 rounded-[2.5rem] bg-white/5 border border-white/5 text-white hover:bg-white hover:text-black transition-all group/link mb-3">
       <div className="flex items-center gap-3">
          <Icon size={16} className="text-white/50 group-hover/link:text-black transition-colors" />
          <span className="opacity-40 group-hover/link:opacity-100 italic font-black text-[9px] uppercase tracking-widest">{label}</span>
       </div>
       <span className="font-bold text-sm truncate max-w-[150px]">{value}</span>
    </Comp>
  );
};

const NeonSocial = ({ icon: Icon, href, hoverColor }) => {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`text-white/20 hover:${hoverColor} transition-all duration-300 transform hover:scale-110`}>
       <Icon size={22} />
    </a>
  );
};

const NeonInfluence = ({ userData }) => {
  const { displayName, email, phone, website, address, youtube, linkedin, twitter, twitch, instagram, logo } = userData || {};
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-['Outfit',sans-serif] md:bg-neutral-950 md:items-center py-0 md:py-12">
      <div className="w-full max-w-sm bg-black border border-white/5 rounded-[4rem] p-1 shadow-2xl relative overflow-hidden flex flex-col items-center group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-rose-500 to-amber-500" />
        
        <div className="mt-12 w-24 h-24 rounded-[2.5rem] bg-white text-black flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(255,255,255,0.2)] group-hover:scale-105 transition-transform overflow-hidden">
           {logo ? (
               <img src={logo} alt="Logo" className="w-full h-full object-cover" />
           ) : (
               <FiZap size={36} />
           )}
        </div>
        
        <h1 className="text-3xl font-black text-white tracking-[0.2em] uppercase text-center leading-none italic px-4 mb-2">{displayName || 'Neon Icon'}</h1>
        <p className="text-[9px] text-white/40 font-black uppercase tracking-[0.4em] mb-8 text-center">Digital Creator</p>
        
        <div className="w-full px-4 mb-6">
           <NeonLink icon={FiPhone} label="Connect" value={phone} href={`tel:${phone}`} />
           <NeonLink icon={FiMail} label="Signal" value={email} href={`mailto:${email}`} />
           <NeonLink icon={FiGlobe} label="Website" value={website} href={website} />
           <NeonLink icon={FiMapPin} label="Location" value={address} />
        </div>

        <div className="w-full px-4 mb-8">
           <button onClick={() => downloadVCard(userData)} className="w-full py-4 bg-gradient-to-r from-cyan-500 via-rose-500 to-amber-500 text-white rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.2em] hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
              <FiUserPlus size={16} /> Save Contact
           </button>
        </div>
        
        <div className="flex items-center gap-6 justify-center pt-2 pb-4">
           <NeonSocial icon={FiInstagram} href={instagram} hoverColor="text-rose-500" />
           <NeonSocial icon={FiYoutube} href={youtube} hoverColor="text-red-500" />
           <NeonSocial icon={FiTwitch} href={twitch} hoverColor="text-purple-500" />
           <NeonSocial icon={FiTwitter} href={twitter} hoverColor="text-cyan-400" />
           <NeonSocial icon={FiLinkedin} href={linkedin} hoverColor="text-blue-500" />
        </div>
        
        <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block mt-6 text-[7px] text-white/10 font-black tracking-[1em] uppercase pb-8 hover:text-white/40 transition-colors">Powered by Cardyn</a>
      </div>
    </div>
  );
};
export default NeonInfluence;
