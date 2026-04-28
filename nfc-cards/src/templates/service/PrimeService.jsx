import React from 'react';
import { FiTriangle, FiPhone, FiMail, FiGlobe, FiMapPin, FiInstagram, FiTwitter, FiYoutube, FiLinkedin, FiUserPlus } from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const PrimeLink = ({ icon: Icon, label, value, href }) => {
  if (!value || value === "" || value.includes('resolving')) return null;
  const Comp = href ? 'a' : 'div';
  return (
    <Comp href={href} target={href && href.startsWith('http') ? "_blank" : undefined} rel={href && href.startsWith('http') ? "noopener noreferrer" : undefined} className="flex items-center justify-between border-2 border-slate-900 py-4 px-6 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-900 hover:bg-slate-900 hover:text-white transition-all group">
       <div className="flex items-center gap-3">
          <Icon size={16} />
          <span>{label}</span>
       </div>
       <span className="truncate max-w-[140px] text-right">{value}</span>
    </Comp>
  );
};

const PrimeSocial = ({ icon: Icon, href }) => {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-900 hover:text-white border-2 border-slate-200 hover:border-slate-900 transition-all shadow-sm">
       <Icon size={18} />
    </a>
  );
};

const PrimeService = ({ userData }) => {
  const { displayName, email, phone, website, address, youtube, linkedin, twitter, instagram, logo } = userData || {};
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-['Inter',sans-serif]">
      <div className="w-full max-w-sm bg-white border-8 border-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden flex flex-col items-center group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-900/5 rotate-45 transform translate-x-12 -translate-y-12 pointer-events-none" />
        <div className="w-16 h-1 bg-slate-900 mb-8 group-hover:w-24 group-hover:bg-blue-600 transition-all" />
        
        <div className="w-24 h-24 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 shadow-xl shadow-slate-900/20 overflow-hidden relative z-10 border-2 border-slate-900">
           {logo ? (
               <img src={logo} alt="Logo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
           ) : (
               <FiTriangle size={36} className="group-hover:rotate-180 transition-transform duration-700" />
           )}
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase text-center leading-none italic mb-2 relative z-10">{displayName || 'Prime Service'}</h1>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] mb-8 relative z-10">Premium Protocol</p>
        
        <div className="w-full space-y-3 mb-6 relative z-10">
           {phone && (
              <a href={`tel:${phone}`} className="flex items-center justify-between bg-slate-900 text-white py-4 px-6 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-slate-900/20">
                 <div className="flex items-center gap-3">
                    <FiPhone size={16} /> <span>Main Line</span>
                 </div>
                 <span>{phone}</span>
              </a>
           )}
           <PrimeLink icon={FiMail} label="Signal Node" value={email} href={`mailto:${email}`} />
           <PrimeLink icon={FiGlobe} label="Portal" value={website} href={website} />
           <PrimeLink icon={FiMapPin} label="Base" value={address} />
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center mb-8 w-full relative z-10">
           <PrimeSocial icon={FiInstagram} href={instagram} />
           <PrimeSocial icon={FiTwitter} href={twitter} />
           <PrimeSocial icon={FiYoutube} href={youtube} />
           <PrimeSocial icon={FiLinkedin} href={linkedin} />
        </div>
        
        <button onClick={() => downloadVCard(userData)} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 relative z-10 active:scale-95">
           <FiUserPlus size={18} /> Save Contact
        </button>
        
        <div className="mt-12 text-center opacity-40 relative z-10 hover:opacity-100 transition-opacity">
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[7px] text-slate-400 font-black tracking-[1.1em] uppercase">Powered by Cardyn</a>
        </div>
      </div>
    </div>
  );
};
export default PrimeService;
