import React from 'react';
import { FiActivity, FiPhone, FiMail, FiMapPin, FiGlobe, FiInstagram, FiTwitter, FiLinkedin, FiYoutube, FiUserPlus } from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const PureLink = ({ icon: Icon, label, value, href }) => {
  if (!value || value === "" || value.includes('resolving')) return null;
  const Comp = href ? 'a' : 'div';
  return (
    <Comp href={href} target={href && href.startsWith('http') ? "_blank" : undefined} rel={href && href.startsWith('http') ? "noopener noreferrer" : undefined} className="flex items-center justify-between bg-white p-4 rounded-3xl border border-emerald-100/50 hover:bg-emerald-50 hover:border-emerald-200 transition-all font-bold text-sm text-slate-700 group">
       <div className="flex items-center gap-3">
          <Icon size={16} className="text-emerald-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-600 transition-colors">{label}</span>
       </div>
       <span className="truncate max-w-[150px]">{value}</span>
    </Comp>
  );
};

const PureSocial = ({ icon: Icon, href }) => {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white border border-emerald-100/50 flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
       <Icon size={20} />
    </a>
  );
};

const PureHealth = ({ userData }) => {
  const { displayName, email, phone, website, address, youtube, linkedin, twitter, instagram, logo } = userData || {};
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-['Inter',sans-serif] md:bg-neutral-950 md:items-center py-0 md:py-12">
      <div className="w-full max-w-sm mt-8 relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20">
           <div className="w-28 h-28 rounded-full bg-emerald-500 border-[8px] border-white flex items-center justify-center text-white shadow-2xl overflow-hidden group">
              {logo ? (
                  <img src={logo} alt="Logo" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              ) : (
                  <FiActivity size={36} className="group-hover:rotate-180 transition-transform duration-700" />
              )}
           </div>
        </div>
        
        <div className="bg-emerald-50 rounded-[3rem] p-8 pt-20 border border-emerald-100 shadow-xl text-center relative z-10">
           <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{displayName || 'Pure Health'}</h1>
           <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.2em] mb-8">Wellness Practice</p>
           
           <div className="space-y-3 mb-6">
              <PureLink icon={FiPhone} label="Call" value={phone} href={`tel:${phone}`} />
              <PureLink icon={FiMail} label="Email" value={email} href={`mailto:${email}`} />
              <PureLink icon={FiGlobe} label="Portal" value={website} href={website} />
              <PureLink icon={FiMapPin} label="Clinic" value={address} />
           </div>
           
           <div className="flex flex-wrap gap-3 justify-center mb-8">
              <PureSocial icon={FiInstagram} href={instagram} />
              <PureSocial icon={FiYoutube} href={youtube} />
              <PureSocial icon={FiTwitter} href={twitter} />
              <PureSocial icon={FiLinkedin} href={linkedin} />
           </div>
           
           <button onClick={() => downloadVCard(userData)} className="w-full flex items-center justify-center gap-3 py-5 rounded-[2rem] bg-emerald-500 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-600 active:scale-95 transition-all shadow-lg shadow-emerald-500/20">
              <FiUserPlus size={18} /> Save Contact
           </button>
           
           <div className="mt-10 border-t border-emerald-100 pt-8 flex justify-center gap-2 opacity-30">
              <div className="w-2 h-2 rounded-full bg-emerald-600" />
              <div className="w-2 h-2 rounded-full bg-emerald-600" />
              <div className="w-2 h-2 rounded-full bg-emerald-600" />
           </div>
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block mt-4 text-[8px] font-black tracking-[0.6em] uppercase text-emerald-900/30 hover:opacity-100 transition-opacity">Powered by Cardyn</a>
        </div>
      </div>
    </div>
  );
};
export default PureHealth;
