import React from 'react';
import { FiCoffee, FiPhone, FiMail, FiMapPin, FiGlobe, FiInstagram, FiTwitter, FiLinkedin, FiYoutube, FiUserPlus } from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const BistroLink = ({ icon: Icon, label, value, href }) => {
  if (!value || value === "" || value.includes('resolving')) return null;
  const Comp = href ? 'a' : 'div';
  return (
    <Comp href={href} target={href && href.startsWith('http') ? "_blank" : undefined} rel={href && href.startsWith('http') ? "noopener noreferrer" : undefined} className="flex items-center justify-between bg-[#fcfaf7] p-4 rounded-2xl border border-[#ede3d8] hover:border-[#e67e22]/30 hover:bg-white transition-all group/link">
       <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#ede3d8]/50 flex items-center justify-center text-[#e67e22] shadow-sm group-hover/link:bg-[#e67e22] group-hover/link:text-white transition-colors">
             <Icon size={16} />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-[#2c3e50]/60 group-hover/link:text-[#2c3e50]">{label}</span>
       </div>
       <span className="text-sm font-bold text-[#2c3e50] truncate max-w-[120px] text-right">{value}</span>
    </Comp>
  );
};

const BistroSocial = ({ icon: Icon, href }) => {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-[#ede3d8] text-[#e67e22] hover:bg-[#e67e22] hover:text-white hover:border-[#e67e22] transition-all shadow-sm">
       <Icon size={20} />
    </a>
  );
};

const UrbanBistro = ({ userData }) => {
  const { displayName, email, phone, website, address, youtube, linkedin, twitter, instagram, logo } = userData || {};
  
  return (
    <div className="min-h-screen bg-[#f3f1ed] flex items-center justify-center p-6 font-['Inter',sans-serif] md:bg-neutral-950 md:items-center py-0 md:py-12">
      <div className="w-full max-w-sm bg-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 text-[#e67e22] opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
           <FiCoffee size={180} />
        </div>
        
        <div className="mb-10 text-center relative z-10">
           <div className="w-24 h-24 rounded-3xl bg-[#e67e22] text-white flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#e67e22]/20 overflow-hidden border-[3px] border-white group-hover:-translate-y-2 transition-transform">
              {logo ? (
                  <img src={logo} alt="Logo" className="w-full h-full object-cover bg-white" />
              ) : (
                  <FiCoffee size={36} />
              )}
           </div>
           <h1 className="text-3xl font-black text-[#2c3e50] tracking-tighter mb-1">{displayName || 'Urban Bistro'}</h1>
           <p className="text-[10px] text-[#e67e22] font-bold uppercase tracking-[0.3em]">Cafe & Kitchen</p>
        </div>
        
        <div className="space-y-3 mb-8 relative z-10">
           <BistroLink icon={FiPhone} label="Call" value={phone} href={`tel:${phone}`} />
           <BistroLink icon={FiMail} label="Email" value={email} href={`mailto:${email}`} />
           <BistroLink icon={FiGlobe} label="Menu" value={website} href={website} />
           <BistroLink icon={FiMapPin} label="Visit" value={address} />
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center mb-8 relative z-10">
           <BistroSocial icon={FiInstagram} href={instagram} />
           <BistroSocial icon={FiYoutube} href={youtube} />
           <BistroSocial icon={FiTwitter} href={twitter} />
           <BistroSocial icon={FiLinkedin} href={linkedin} />
        </div>
        
        <div className="relative z-10">
           <button onClick={() => downloadVCard(userData)} className="w-full flex items-center justify-center gap-3 py-5 bg-[#2c3e50] text-[#fcfaf7] rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-[#1a252f] active:scale-95 transition-all shadow-xl shadow-[#2c3e50]/20">
              <FiUserPlus size={18} /> Save Contact
           </button>
        </div>
        
        <div className="mt-12 text-center opacity-30 relative z-10">
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] font-black tracking-[0.5em] text-[#2c3e50] uppercase italic hover:opacity-100 transition-opacity">Powered by Cardyn</a>
        </div>
      </div>
    </div>
  );
};
export default UrbanBistro;
