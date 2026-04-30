import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const SteelFrame = ({ userData }) => {
  const { 
    displayName, email, role, mobileNumber, phone, 
    companyName, designation, website, address, city,
    linkedin, instagram, facebook, twitter, bio, avatar, logo 
  } = userData || {};

  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "Foreman";
  const finalAddress = address || city;

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] font-['Outfit'] text-slate-300 pb-12 relative overflow-x-hidden">
      {/* Background Textures */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="pt-16 px-6 relative z-10">
         {/* Identity Panel */}
         <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center relative overflow-hidden shadow-2xl shadow-black">
            <div className="absolute top-0 left-0 w-full h-2 bg-orange-600" />
            
            <div className="w-28 h-28 rounded-full border-2 border-white/10 mb-6 flex items-center justify-center bg-black/50 overflow-hidden relative shadow-[0_0_30px_rgba(234,88,12,0.2)] shrink-0">
               {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-4" /> : avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-4xl font-black text-orange-500 uppercase">{(displayName || 'S')[0]}</span>}
            </div>
            
            <h1 className="text-3xl font-black text-white uppercase tracking-wider text-center">{displayName || 'Steel Frame'}</h1>
            <div className="bg-orange-600/20 text-orange-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mt-4 text-center">
               {displayRole}
            </div>
            {companyName && <p className="text-xs font-bold text-white/50 uppercase tracking-widest mt-3 text-center">{companyName}</p>}
         </div>

         {/* Bio Module */}
         {bio && (
            <div className="mt-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 text-center">
               <FiIcons.FiPenTool className="mx-auto text-orange-500 mb-3" size={20} />
               <p className="text-sm text-white/70 leading-relaxed font-light">"{bio}"</p>
            </div>
         )}

         {/* Development Stats (Mockup) */}
         <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-orange-600/20 to-transparent border border-orange-600/30 rounded-3xl p-6 flex flex-col items-center justify-center">
               <FiIcons.FiHome size={24} className="text-orange-500 mb-2" />
               <span className="text-white font-black text-xl">15+</span>
               <span className="text-[8px] font-bold uppercase tracking-widest text-orange-500/80 mt-1">Commercial</span>
            </div>
            <div className="bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center">
               <FiIcons.FiBox size={24} className="text-white/50 mb-2" />
               <span className="text-white font-black text-xl">42</span>
               <span className="text-[8px] font-bold uppercase tracking-widest text-white/50 mt-1">Residential</span>
            </div>
         </div>

         {/* Communications Interface */}
         <div className="mt-4 space-y-3">
            {displayPhone && (
               <a href={`tel:${displayPhone}`} className="flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-3xl hover:bg-white/10 hover:border-orange-500/50 transition-all group">
                  <div className="w-12 h-12 bg-black/50 rounded-2xl flex items-center justify-center text-orange-500 shrink-0"><FiIcons.FiPhone size={20} /></div>
                  <div className="overflow-hidden">
                     <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Comms Line</p>
                     <p className="text-sm font-bold text-white mt-1">{displayPhone}</p>
                  </div>
               </a>
            )}
            {email && (
               <a href={`mailto:${email}`} className="flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-3xl hover:bg-white/10 hover:border-orange-500/50 transition-all group">
                  <div className="w-12 h-12 bg-black/50 rounded-2xl flex items-center justify-center text-orange-500 shrink-0"><FiIcons.FiMail size={20} /></div>
                  <div className="overflow-hidden">
                     <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Data Uplink</p>
                     <p className="text-sm font-bold text-white mt-1 truncate">{email}</p>
                  </div>
               </a>
            )}
            {finalAddress && (
               <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-3xl">
                  <div className="w-12 h-12 bg-black/50 rounded-2xl flex items-center justify-center text-orange-500 shrink-0"><FiIcons.FiMapPin size={20} /></div>
                  <div className="overflow-hidden">
                     <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Sector</p>
                     <p className="text-sm font-bold text-white mt-1 leading-snug truncate">{finalAddress}</p>
                  </div>
               </div>
            )}
            {website && (
               <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-white/5 border border-white/10 p-5 rounded-3xl hover:bg-orange-600 hover:text-white transition-all gap-3 group text-white/70">
                  <FiIcons.FiGlobe size={20} className="text-orange-500 group-hover:text-white" />
                  <span className="text-xs font-bold uppercase tracking-widest">System Portal</span>
               </a>
            )}
         </div>

         {/* Network Nodes */}
         <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
               { icon: FiIcons.FiLinkedin, val: linkedin },
               { icon: FiIcons.FiTwitter, val: twitter },
               { icon: FiIcons.FiInstagram, val: instagram },
               { icon: FiIcons.FiFacebook, val: facebook }
            ].map((social, idx) => social.val && (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-black/50 border border-white/10 text-white/50 flex items-center justify-center hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all shrink-0">
                  <social.icon size={18} />
               </a>
            ))}
         </div>

         <button onClick={() => downloadVCard(userData)} className="w-full py-6 mt-8 bg-orange-600 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.4em] shadow-[0_10px_30px_rgba(234,88,12,0.3)] hover:bg-orange-500 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
            <FiIcons.FiDatabase size={18} /> Save Contact Data
         </button>

         <PoweredBy />
      </div>
    </div>
  );
};
export default SteelFrame;
