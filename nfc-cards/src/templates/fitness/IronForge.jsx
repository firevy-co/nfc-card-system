import React from 'react';
import { FiSquare, FiPhone, FiMail, FiMapPin, FiGlobe, FiInstagram, FiTwitter, FiLinkedin, FiYoutube, FiUserPlus, FiActivity } from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const ForgeLink = ({ icon: Icon, label, value, href }) => {
  if (!value || value === "" || value.includes('resolving')) return null;
  const Comp = href ? 'a' : 'div';
  return (
    <Comp href={href} target={href && href.startsWith('http') ? "_blank" : undefined} rel={href && href.startsWith('http') ? "noopener noreferrer" : undefined} className="flex items-center justify-between border-b border-white/5 pb-4 pt-2 group/link">
       <div className="flex flex-col gap-1">
          <span className="text-[9px] font-black text-white/30 tracking-widest uppercase group-hover/link:text-orange-600 transition-colors flex items-center gap-2">
             <Icon size={10} /> {label}
          </span>
       </div>
       <span className="text-white font-bold truncate max-w-[160px] text-right">{value}</span>
    </Comp>
  );
};

const ForgeSocial = ({ icon: Icon, href }) => {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-white/5 text-white/40 hover:bg-orange-600 hover:text-black transition-all rounded-lg">
       <Icon size={20} />
    </a>
  );
};

const IronForge = ({ userData }) => {
  const { displayName, email, phone, website, address, youtube, linkedin, twitter, instagram, logo } = userData || {};
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-['Space_Grotesk',sans-serif]">
      <div className="w-full max-w-sm bg-[#0a0a0a] border border-white/5 rounded-3xl p-10 shadow-2xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-600/10 to-transparent pointer-events-none" />
        
        <div className="mb-10 relative z-10">
           <div className="w-12 h-1 bg-orange-600 mb-8" />
           
           <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-xl mb-6 flex items-center justify-center overflow-hidden shadow-2xl">
              {logo ? (
                  <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                  <FiActivity size={36} className="text-orange-600" />
              )}
           </div>
           
           <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none mb-2">{displayName || 'Iron Forge'}</h1>
           <p className="text-[10px] text-white/40 font-mono uppercase tracking-[0.2em]">Strength Protocol</p>
        </div>
        
        <div className="space-y-1 relative z-10 mb-8">
           <ForgeLink icon={FiPhone} label="Direct Input" value={phone} href={`tel:${phone}`} />
           <ForgeLink icon={FiMail} label="Digital Comms" value={email} href={`mailto:${email}`} />
           <ForgeLink icon={FiGlobe} label="Portal Access" value={website} href={website} />
           <ForgeLink icon={FiMapPin} label="Base Location" value={address} />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-8 relative z-10">
           <ForgeSocial icon={FiInstagram} href={instagram} />
           <ForgeSocial icon={FiYoutube} href={youtube} />
           <ForgeSocial icon={FiTwitter} href={twitter} />
           <ForgeSocial icon={FiLinkedin} href={linkedin} />
        </div>
        
        <div className="relative z-10">
           <button onClick={() => downloadVCard(userData)} className="w-full py-5 bg-orange-600 text-black rounded-2xl font-black text-[12px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-orange-600/20 flex items-center justify-center gap-3">
              <FiUserPlus size={18} /> Initialize Strength
           </button>
        </div>
        
        <div className="mt-16 opacity-30 flex justify-between items-center relative z-10">
           <p className="text-[7px] font-black tracking-[0.8em] text-white">Iron Framework v4</p>
           <FiSquare size={16} className="rotate-45" />
        </div>

        <div className="mt-8 mb-2 text-center relative z-10">
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-[0.2em] text-gray-500 hover:text-white transition-colors uppercase font-mulish">Powered by Cardyn</a>
        </div>
      </div>
    </div>
  );
};
export default IronForge;
