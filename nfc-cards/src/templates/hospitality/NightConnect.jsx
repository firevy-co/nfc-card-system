import React from 'react';
import { FiTriangle, FiPhone, FiMail, FiGlobe, FiZap, FiMapPin, FiInstagram, FiTwitter, FiYoutube, FiLinkedin, FiUserPlus } from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const NightLink = ({ icon: Icon, label, value, href }) => {
  if (!value || value === "" || value.includes('resolving')) return null;
  const Comp = href ? 'a' : 'div';
  return (
    <Comp href={href} target={href && href.startsWith('http') ? "_blank" : undefined} rel={href && href.startsWith('http') ? "noopener noreferrer" : undefined} className="flex items-center justify-between border border-white/10 py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-widest text-white hover:bg-white/10 transition-all group">
       <div className="flex items-center gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
          <Icon size={16} />
          <span>{label}</span>
       </div>
       <span className="truncate max-w-[150px] text-right">{value}</span>
    </Comp>
  );
};

const NightSocial = ({ icon: Icon, href }) => {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-xl transition-all shadow-lg">
       <Icon size={20} />
    </a>
  );
};

const NightConnect = ({ userData }) => {
  const { displayName, email, phone, website, address, youtube, linkedin, twitter, instagram, logo } = userData || {};
  
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-['Inter',sans-serif]">
      <div className="w-full max-w-sm bg-gradient-to-b from-indigo-900/20 to-transparent border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        
        <div className="w-24 h-24 rounded-[2rem] bg-indigo-600 flex items-center justify-center text-white mb-8 shadow-xl shadow-indigo-600/20 relative z-10 overflow-hidden border-2 border-indigo-500 group">
           {logo ? (
               <img src={logo} alt="Logo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
           ) : (
               <FiZap size={36} className="animate-pulse" />
           )}
        </div>
        
        <h1 className="text-3xl font-black text-white tracking-widest uppercase italic text-center leading-none mb-2">{displayName || 'Club Nexus'}</h1>
        <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.4em] mb-8 text-center">Nightlife Portal</p>
        
        <div className="w-full space-y-3 mb-6 relative z-10">
           {phone && (
              <a href={`tel:${phone}`} className="flex items-center justify-between bg-white text-black py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-lg">
                 <div className="flex items-center gap-3 opacity-60">
                    <FiPhone size={16} /> <span>Call</span>
                 </div>
                 <span>{phone}</span>
              </a>
           )}
           <NightLink icon={FiMail} label="Direct" value={email} href={`mailto:${email}`} />
           <NightLink icon={FiGlobe} label="Portal" value={website} href={website} />
           <NightLink icon={FiMapPin} label="Venue" value={address} />
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center mb-8 relative z-10">
           <NightSocial icon={FiInstagram} href={instagram} />
           <NightSocial icon={FiTwitter} href={twitter} />
           <NightSocial icon={FiYoutube} href={youtube} />
           <NightSocial icon={FiLinkedin} href={linkedin} />
        </div>
        
        <button onClick={() => downloadVCard(userData)} className="w-full flex items-center justify-center gap-3 py-5 rounded-[2rem] bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.3em] hover:brightness-125 active:scale-95 transition-all shadow-xl shadow-indigo-600/30 relative z-10">
           <FiUserPlus size={18} /> Save Contact
        </button>
        
        <div className="mt-12 text-center opacity-30 relative z-10">
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] text-white font-black tracking-[1em] uppercase hover:opacity-100 transition-opacity">Powered by Cardyn</a>
        </div>
      </div>
    </div>
  );
};
export default NightConnect;
