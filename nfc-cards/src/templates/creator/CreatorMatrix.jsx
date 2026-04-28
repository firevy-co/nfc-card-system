import React from 'react';
import { FiLayout, FiPhone, FiMail, FiGlobe, FiYoutube, FiLinkedin, FiTwitter, FiInstagram, FiTwitch, FiMapPin, FiUserPlus, FiCpu } from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const MatrixLink = ({ icon: Icon, label, value, href }) => {
  if (!value || value === "" || value.includes('resolving')) return null;
  const Comp = href ? 'a' : 'div';
  return (
    <Comp href={href} target={href && href.startsWith('http') ? "_blank" : undefined} rel={href && href.startsWith('http') ? "noopener noreferrer" : undefined} className="group flex items-center justify-between border-b border-white/10 pb-4 hover:border-white transition-all">
        <div className="flex items-center gap-3">
            <Icon size={14} className="text-white/30 group-hover:text-white transition-colors" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-white transition-colors">{label}</span>
        </div>
        <span className="text-white font-mono text-sm tracking-tighter truncate max-w-[140px] uppercase text-right">{value}</span>
    </Comp>
  );
};

const CreatorMatrix = ({ userData }) => {
  const { displayName, email, phone, website, address, youtube, linkedin, twitter, twitch, instagram, logo } = userData || {};
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-['Space_Grotesk',sans-serif] md:bg-neutral-950 md:items-center py-0 md:py-12">
      <div className="w-full max-w-sm border-2 border-white/5 bg-zinc-950 rounded-[3rem] p-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
           <div className="grid grid-cols-10 gap-2 h-full">
              {Array.from({length: 100}).map((_, i) => (
                 <div key={i} className="w-1 h-1 bg-white rounded-full opacity-20" />
              ))}
           </div>
        </div>
        
        <div className="mb-10 relative z-10">
           <div className="w-12 h-1 bg-white mb-8" />
           
           <div className="w-20 h-20 bg-white/5 border border-white/20 mb-6 flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl group-hover:border-white/50 transition-all">
              {logo ? (
                  <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                  <FiCpu size={32} className="text-white/50" />
              )}
           </div>

           <h1 className="text-4xl font-black text-white tracking-widest uppercase italic leading-none mb-2">{displayName || 'Matrix Node'}</h1>
           <p className="text-[10px] text-white/50 font-mono uppercase tracking-[0.3em]">SYSTEM // ACTIVE</p>
        </div>
        
        <div className="space-y-4 relative z-10 mb-8">
           <MatrixLink icon={FiPhone} label="Neural Link" value={phone} href={`tel:${phone}`} />
           <MatrixLink icon={FiMail} label="Signal Hive" value={email} href={`mailto:${email}`} />
           <MatrixLink icon={FiGlobe} label="Cyber Net" value={website} href={website} />
           <MatrixLink icon={FiMapPin} label="Coordinates" value={address} />
           
           <MatrixLink icon={FiYoutube} label="Vid Stream" value={youtube ? "YouTube" : null} href={youtube} />
           <MatrixLink icon={FiTwitch} label="Live Feed" value={twitch ? "Twitch" : null} href={twitch} />
           <MatrixLink icon={FiTwitter} label="Broadcast" value={twitter ? "Twitter" : null} href={twitter} />
           <MatrixLink icon={FiInstagram} label="Holo Net" value={instagram ? "Instagram" : null} href={instagram} />
           <MatrixLink icon={FiLinkedin} label="Corpo Net" value={linkedin ? "LinkedIn" : null} href={linkedin} />
        </div>

        <div className="relative z-10">
           <button onClick={() => downloadVCard(userData)} className="w-full py-5 bg-white text-black rounded-3xl font-black text-[11px] uppercase tracking-[0.6em] hover:brightness-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
              <FiUserPlus size={16} /> Enter Hive
           </button>
        </div>
        
        <div className="mt-16 flex justify-between items-center opacity-10 relative z-10">
           <p className="text-[7px] font-black tracking-[0.8em] text-white italic transition-all group-hover:tracking-[1.2em]">Matrix Protocol v9.0</p>
           <FiLayout size={16} />
        </div>

        <div className="mt-8 mb-2 text-center relative z-10">
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-[0.2em] text-gray-500 hover:text-white transition-colors uppercase font-mulish">Powered by Cardyn</a>
        </div>
      </div>
    </div>
  );
};
export default CreatorMatrix;
