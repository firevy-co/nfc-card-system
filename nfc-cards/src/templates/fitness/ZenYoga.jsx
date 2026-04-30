import React from 'react';
import { FiWind, FiPhone, FiMail, FiMapPin, FiGlobe, FiInstagram, FiTwitter, FiLinkedin, FiYoutube, FiUserPlus } from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const ZenSocial = ({ icon: Icon, href }) => {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#f1f1ee] text-slate-500 flex items-center justify-center hover:bg-slate-200 hover:text-slate-800 transition-all shadow-sm">
       <Icon size={18} />
    </a>
  );
};

const ZenLink = ({ icon: Icon, label, value, href }) => {
  if (!value || value === "" || value.includes('resolving')) return null;
  const Comp = href ? 'a' : 'div';
  return (
    <Comp href={href} target={href && href.startsWith('http') ? "_blank" : undefined} rel={href && href.startsWith('http') ? "noopener noreferrer" : undefined} className="w-full flex items-center justify-between py-4 border-b border-[#f1f1ee] group">
       <div className="flex items-center gap-3 text-slate-400 group-hover:text-slate-700 transition-colors">
          <Icon size={16} />
          <span className="text-xs font-bold">{label}</span>
       </div>
       <span className="text-sm font-medium text-slate-600 truncate max-w-[150px]">{value}</span>
    </Comp>
  );
};

const ZenYoga = ({ userData }) => {
  const { displayName, email, phone, website, address, youtube, linkedin, twitter, instagram, logo } = userData || {};
  
  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center p-6 font-['Inter',sans-serif] md:bg-neutral-950 md:items-center py-0 md:py-12">
      <div className="w-full max-w-sm bg-white border border-[#f1f1ee] rounded-[5rem] p-10 shadow-[0_40px_80px_-20px_rgba(180,180,170,0.5)] flex flex-col items-center group">
        
        <div className="w-24 h-24 rounded-full bg-[#f1f1ee] flex items-center justify-center text-slate-400 mb-8 shadow-inner overflow-hidden border-4 border-white relative">
           {logo ? (
               <img src={logo} alt="Logo" className="w-full h-full object-cover" />
           ) : (
               <FiWind size={36} className="group-hover:rotate-180 transition-transform duration-1000" />
           )}
           <div className="absolute inset-0 rounded-full border border-black/5 pointer-events-none" />
        </div>
        
        <h1 className="text-3xl font-black text-slate-800 tracking-tight text-center italic mb-2">{displayName || 'Zen Yoga'}</h1>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-8 text-center">Harmony & Flow</p>
        
        <div className="w-full space-y-2 mb-8">
           <ZenLink icon={FiPhone} label="Call" value={phone} href={`tel:${phone}`} />
           <ZenLink icon={FiMail} label="Email" value={email} href={`mailto:${email}`} />
           <ZenLink icon={FiGlobe} label="Website" value={website} href={website} />
           <ZenLink icon={FiMapPin} label="Location" value={address} />
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center mb-10 w-full">
           <ZenSocial icon={FiInstagram} href={instagram} />
           <ZenSocial icon={FiYoutube} href={youtube} />
           <ZenSocial icon={FiTwitter} href={twitter} />
           <ZenSocial icon={FiLinkedin} href={linkedin} />
        </div>

        <button onClick={() => downloadVCard(userData)} className="w-full flex items-center justify-center gap-3 py-5 rounded-[2.5rem] bg-slate-900 text-white font-bold text-sm hover:brightness-125 active:scale-95 transition-all shadow-xl shadow-slate-900/10">
           <FiUserPlus size={18} /> Save Contact
        </button>
        
        <div className="mt-12 opacity-40 flex items-center gap-3">
           <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
           <p className="text-[7px] font-black tracking-[0.8em] text-slate-500 uppercase">Zen Harmony Registry</p>
           <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
        </div>

        <PoweredBy />
      </div>
    </div>
  );
};
export default ZenYoga;
