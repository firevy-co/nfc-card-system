import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from "../common/StandardComponents";

const PixelProperty = ({ userData }) => {
  const { displayName, email, role, mobileNumber, phone, companyName, designation, website, address, city, linkedin, instagram, facebook, twitter, bio, avatar, logo } = userData || {};
  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "Digital Agent";
  const finalAddress = address || city;

  return (
    <div className="min-h-screen bg-[#050505] font-mono text-emerald-400 pb-12 overflow-x-hidden relative">
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

      <div className="p-6 relative z-10 max-w-md mx-auto">
         {/* Tech Header */}
         <div className="border border-emerald-500/30 bg-emerald-950/20 p-6 mb-8 mt-4 backdrop-blur-sm relative">
            <div className="absolute top-0 left-0 w-2 h-2 bg-emerald-500" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-emerald-500" />
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-emerald-500" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500" />

            <div className="flex flex-col items-center">
               <div className="w-24 h-24 mb-6 border-2 border-emerald-500/50 p-1 shrink-0 bg-black">
                  <div className="w-full h-full bg-emerald-950/50 flex items-center justify-center overflow-hidden">
                     {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-2 bg-white" /> : avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover mix-blend-luminosity opacity-80" /> : <FiIcons.FiMonitor size={32} className="text-emerald-500" />}
                  </div>
               </div>
               <h1 className="text-2xl font-bold uppercase tracking-tight text-emerald-400 text-center px-2 w-full truncate">{displayName || 'Pixel Property'}</h1>
               <p className="text-emerald-600 text-xs mt-2 uppercase tracking-widest text-center px-2 w-full truncate">{displayRole}</p>
               {companyName && <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-emerald-200/50 bg-emerald-500/10 px-3 py-1 text-center px-2 w-full truncate">{companyName}</p>}
            </div>
         </div>

         {bio && (
            <div className="mb-8 border-l-2 border-emerald-500/50 pl-4 py-1">
               <p className="text-[10px] uppercase tracking-widest text-emerald-600 mb-2">SYS_BIO</p>
               <p className="text-xs leading-relaxed text-emerald-300/80">"{bio}"</p>
            </div>
         )}

         {/* Digital Tools */}
         <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-emerald-950/30 border border-emerald-500/20 p-4 text-center hover:bg-emerald-900/40 transition-colors">
               <FiIcons.FiVideo className="mx-auto text-emerald-500 mb-2" size={20} />
               <p className="text-[9px] uppercase tracking-widest">Virtual Tours</p>
            </div>
            <div className="bg-emerald-950/30 border border-emerald-500/20 p-4 text-center hover:bg-emerald-900/40 transition-colors">
               <FiIcons.FiFileText className="mx-auto text-emerald-500 mb-2" size={20} />
               <p className="text-[9px] uppercase tracking-widest">Digital Escrow</p>
            </div>
         </div>

         {/* Data Links */}
         <div className="space-y-3 mb-8">
            <p className="text-[10px] uppercase tracking-widest text-emerald-600 mb-2 pl-1">CONNECT_NODES</p>
            {displayPhone && (
               <a href={`tel:${displayPhone}`} className="flex items-center gap-4 bg-black border border-emerald-500/30 p-4 hover:bg-emerald-950/50 transition-colors">
                  <FiIcons.FiPhone size={16} className="text-emerald-500 shrink-0" />
                  <span className="text-xs uppercase tracking-wider text-emerald-300 truncate w-full">{displayPhone}</span>
               </a>
            )}
            {email && (
               <a href={`mailto:${email}`} className="flex items-center gap-4 bg-black border border-emerald-500/30 p-4 hover:bg-emerald-950/50 transition-colors px-4">
                  <FiIcons.FiMail size={16} className="text-emerald-500 shrink-0" />
                  <span className="text-xs uppercase tracking-wider text-emerald-300 truncate w-full">{email}</span>
               </a>
            )}
            {website && (
               <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 bg-emerald-600/10 border border-emerald-500 p-4 hover:bg-emerald-600/20 transition-colors px-4 group">
                  <div className="flex items-center gap-4 overflow-hidden">
                     <FiIcons.FiGlobe size={16} className="text-emerald-400 shrink-0" />
                     <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 truncate">Explore Listings</span>
                  </div>
                  <FiIcons.FiArrowRight size={16} className="text-emerald-500 group-hover:translate-x-1 transition-transform shrink-0" />
               </a>
            )}
            {finalAddress && (
               <div className="flex items-center gap-4 bg-black border border-emerald-500/30 p-4 px-4">
                  <FiIcons.FiMapPin size={16} className="text-emerald-500/50 shrink-0" />
                  <span className="text-xs uppercase tracking-wider text-emerald-500/70 truncate w-full">{finalAddress}</span>
               </div>
            )}
         </div>

         <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[ { icon: FiIcons.FiLinkedin, val: linkedin, label: "LNKD" }, { icon: FiIcons.FiTwitter, val: twitter, label: "TWTR" }, { icon: FiIcons.FiInstagram, val: instagram, label: "INST" }, { icon: FiIcons.FiFacebook, val: facebook, label: "FCBK" } ].map((social, idx) => social.val && (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="text-emerald-500/70 border border-emerald-500/30 hover:bg-emerald-950 hover:text-emerald-400 transition-colors px-3 py-2 text-[10px] uppercase font-bold flex items-center gap-2 shrink-0">
                  <social.icon size={12} /> {social.label}
               </a>
            ))}
         </div>

         <button onClick={() => downloadVCard(userData)} className="w-full py-4 border-2 border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-500 hover:text-black transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
            <FiIcons.FiDownload size={14} /> EXTRACT_DATA
         </button>
      </div>
    </div>
  );
};
export default PixelProperty;
