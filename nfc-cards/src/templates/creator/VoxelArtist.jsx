import React from 'react';
import { FiBox, FiPhone, FiMail, FiGlobe, FiYoutube, FiTwitter, FiInstagram, FiLinkedin, FiTwitch, FiMapPin, FiUserPlus, FiImage } from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const VoxelLink = ({ icon: Icon, value, href }) => {
  if (!value || value === "" || value.includes('resolving')) return null;
  const Comp = href ? 'a' : 'div';
  return (
    <Comp href={href} target={href && href.startsWith('http') ? "_blank" : undefined} rel={href && href.startsWith('http') ? "noopener noreferrer" : undefined} className="flex items-center gap-4 bg-white p-4 rounded-xl border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition-all group/link shadow-[4px_4px_0px_#0f172a] hover:shadow-[0px_0px_0px_#0f172a] hover:translate-x-[4px] hover:translate-y-[4px]">
       <Icon size={18} className="text-slate-500 group-hover/link:text-white transition-colors" />
       <span className="text-sm font-bold truncate">{value}</span>
    </Comp>
  );
};

const VoxelSocial = ({ icon: Icon, href }) => {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-white border-2 border-slate-900 rounded-xl hover:bg-[#ff3d00] hover:text-white transition-all shadow-[4px_4px_0px_#0f172a] hover:shadow-[0px_0px_0px_#0f172a] hover:translate-x-[4px] hover:translate-y-[4px] text-slate-900">
       <Icon size={20} />
    </a>
  );
};

const VoxelArtist = ({ userData }) => {
  const { displayName, email, phone, website, address, youtube, linkedin, twitter, twitch, instagram, logo } = userData || {};
  
  return (
    <div className="min-h-screen bg-[#f0f0f5] flex items-center justify-center p-6 font-['Space_Grotesk',sans-serif] md:bg-neutral-950 md:items-center py-0 md:py-12">
      <div className="w-full max-w-sm bg-white border-2 border-slate-900 rounded-[2.5rem] p-8 shadow-[10px_10px_0px_#0f172a] relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-slate-900/5 rounded-full pointer-events-none" />
        
        <div className="mb-10 text-center relative z-10">
           <div className="w-24 h-24 rounded-[1.5rem] border-2 border-slate-900 bg-slate-900 text-white flex items-center justify-center mx-auto mb-6 shadow-[5px_5px_0px_#ff3d00] group-hover:-rotate-6 transition-transform overflow-hidden">
              {logo ? (
                  <img src={logo} alt="Logo" className="w-full h-full object-cover bg-white" />
              ) : (
                  <FiBox size={36} />
              )}
           </div>
           
           <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none italic mb-2">{displayName || 'Voxel Artist'}</h1>
           <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">3D / Digital Creator</p>
        </div>
        
        <div className="space-y-4 mb-8 relative z-10">
           <VoxelLink icon={FiPhone} value={phone} href={`tel:${phone}`} />
           <VoxelLink icon={FiMail} value={email} href={`mailto:${email}`} />
           <VoxelLink icon={FiMapPin} value={address} />
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center mb-8 relative z-10">
           <VoxelSocial icon={FiInstagram} href={instagram} />
           <VoxelSocial icon={FiYoutube} href={youtube} />
           <VoxelSocial icon={FiTwitch} href={twitch} />
           <VoxelSocial icon={FiTwitter} href={twitter} />
           <VoxelSocial icon={FiLinkedin} href={linkedin} />
        </div>
        
        <div className="space-y-4 relative z-10">
           {website && (
              <a href={website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-4 text-center bg-slate-900 text-white rounded-xl border-2 border-slate-900 font-black text-[11px] uppercase tracking-[0.2em] shadow-[5px_5px_0px_#0f172a] hover:shadow-[0px_0px_0px_#0f172a] hover:translate-x-[5px] hover:translate-y-[5px] transition-all">
                 <FiGlobe size={16} /> Launch Gallery
              </a>
           )}
           <button onClick={() => downloadVCard(userData)} className="flex items-center justify-center gap-3 w-full py-4 text-center bg-[#ff3d00] text-white rounded-xl border-2 border-slate-900 font-black text-[11px] uppercase tracking-[0.2em] shadow-[5px_5px_0px_#0f172a] hover:shadow-[0px_0px_0px_#0f172a] hover:translate-x-[5px] hover:translate-y-[5px] transition-all">
              <FiUserPlus size={16} /> Save Contact
           </button>
        </div>
        
        <PoweredBy />
      </div>
    </div>
  );
};
export default VoxelArtist;
