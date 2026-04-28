import React from 'react';
import { FiWind, FiPhone, FiMail, FiMapPin, FiGlobe, FiInstagram, FiTwitter, FiLinkedin, FiYoutube, FiUserPlus } from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const WellnessLink = ({ icon: Icon, label, value, href }) => {
  if (!value || value === "" || value.includes('resolving')) return null;
  const Comp = href ? 'a' : 'div';
  return (
    <Comp href={href} target={href && href.startsWith('http') ? "_blank" : undefined} rel={href && href.startsWith('http') ? "noopener noreferrer" : undefined} className="w-full flex items-center justify-between p-4 rounded-3xl border border-[#f0ede5] text-gray-700 font-bold text-sm bg-white hover:bg-[#f0ede5] transition-all group">
       <div className="flex items-center gap-3 text-gray-400 group-hover:text-gray-700 transition-colors">
          <Icon size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
       </div>
       <span className="truncate max-w-[140px]">{value}</span>
    </Comp>
  );
};

const WellnessSocial = ({ icon: Icon, href }) => {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#f0ede5] text-gray-500 hover:bg-gray-800 hover:text-white transition-all shadow-sm">
       <Icon size={18} />
    </a>
  );
};

const WellnessWay = ({ userData }) => {
  const { displayName, email, phone, website, address, youtube, linkedin, twitter, instagram, logo } = userData || {};
  
  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center p-6 font-['Outfit',sans-serif]">
      <div className="w-full max-w-sm bg-white border border-[#f0ede5] rounded-[4rem] p-10 shadow-[0_40px_80px_-20px_rgba(235,230,215,0.7)] flex flex-col items-center group">
        
        <div className="w-24 h-24 rounded-[2rem] bg-[#f0ede5] flex items-center justify-center text-[#8e8d8a] mb-8 shadow-inner overflow-hidden border-4 border-white relative group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all">
           {logo ? (
               <img src={logo} alt="Logo" className="w-full h-full object-cover" />
           ) : (
               <FiWind size={36} className="animate-pulse" />
           )}
        </div>
        
        <h1 className="text-3xl font-black text-gray-800 tracking-tight text-center mb-2">{displayName || 'Wellness Way'}</h1>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mb-8 text-center">Holistic Practice</p>
        
        <div className="w-full space-y-3 mb-8">
           <WellnessLink icon={FiPhone} label="Call" value={phone} href={`tel:${phone}`} />
           <WellnessLink icon={FiMail} label="Email" value={email} href={`mailto:${email}`} />
           <WellnessLink icon={FiGlobe} label="Web" value={website} href={website} />
           <WellnessLink icon={FiMapPin} label="Visit" value={address} />
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center mb-8 w-full">
           <WellnessSocial icon={FiInstagram} href={instagram} />
           <WellnessSocial icon={FiYoutube} href={youtube} />
           <WellnessSocial icon={FiTwitter} href={twitter} />
           <WellnessSocial icon={FiLinkedin} href={linkedin} />
        </div>

        <button onClick={() => downloadVCard(userData)} className="w-full flex items-center justify-center gap-3 py-5 rounded-[2.5rem] bg-gray-800 text-white font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-gray-800/10">
           <FiUserPlus size={18} /> Save Contact
        </button>
        
        <div className="mt-12 opacity-30 flex items-center gap-3">
           <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
           <p className="text-[7px] font-black uppercase tracking-[0.8em]">Wellness Registry</p>
           <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
        </div>

        <div className="mt-8 mb-2 text-center opacity-40 hover:opacity-100 transition-opacity">
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[9px] font-bold tracking-[0.2em] text-gray-500 uppercase font-mulish">Powered by Cardyn</a>
        </div>
      </div>
    </div>
  );
};
export default WellnessWay;
