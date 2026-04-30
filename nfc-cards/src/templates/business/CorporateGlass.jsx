import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const CorporateGlass = ({ userData }) => {
  const { 
    displayName, email, role, mobileNumber, phone, 
    companyName, designation, website, address, city,
    linkedin, instagram, facebook, twitter, bio, avatar, logo 
  } = userData || {};

  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "Tech Executive";
  const finalAddress = address || city;

  return (
    <div className="w-full min-h-screen bg-slate-900 font-['Outfit'] pb-12 relative overflow-x-hidden">
      {/* Deep Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-cyan-500/30 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] bg-indigo-500/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="pt-16 px-6 relative z-10 space-y-6">
         {/* Identity Glass Panel */}
         <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[2rem] shadow-2xl flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border border-white/30 p-1 mb-6 bg-white/5 shadow-inner shrink-0">
               <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden relative">
                  {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-2" /> : avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" /> : <FiIcons.FiBox size={32} className="text-blue-400" />}
               </div>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight text-center">{displayName || 'Corporate Glass'}</h1>
            <div className="mt-3 bg-blue-500/20 border border-blue-400/30 px-4 py-1.5 rounded-full">
               <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest text-center">{displayRole}</p>
            </div>
            {companyName && <p className="text-sm font-semibold text-slate-300 mt-4 uppercase tracking-wider text-center">{companyName}</p>}
         </div>

         {/* Bio / Mission */}
         {bio && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] text-center">
               <FiIcons.FiTarget size={20} className="text-cyan-400 mb-3 mx-auto" />
               <p className="text-sm font-medium text-slate-300 leading-relaxed">"{bio}"</p>
            </div>
         )}

         {/* Global Divisions Mockup */}
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-400/5 border border-white/10 p-5 rounded-[1.5rem] backdrop-blur-md flex flex-col justify-center items-center text-center">
               <FiIcons.FiGlobe size={24} className="text-blue-400 mb-2" />
               <span className="text-lg font-black text-white">12+</span>
               <span className="text-[8px] uppercase tracking-widest text-slate-400 mt-1">Global Regions</span>
            </div>
            <div className="bg-gradient-to-br from-indigo-500/20 to-purple-400/5 border border-white/10 p-5 rounded-[1.5rem] backdrop-blur-md flex flex-col justify-center items-center text-center">
               <FiIcons.FiUsers size={24} className="text-indigo-400 mb-2" />
               <span className="text-lg font-black text-white">5k+</span>
               <span className="text-[8px] uppercase tracking-widest text-slate-400 mt-1">Team Members</span>
            </div>
         </div>

         {/* Communication Nodes */}
         <div className="space-y-3">
            {[
               { val: displayPhone, href: displayPhone ? `tel:${displayPhone}` : null, icon: FiIcons.FiPhone, label: "Phone" },
               { val: email, href: email ? `mailto:${email}` : null, icon: FiIcons.FiMail, label: "Email" },
               { val: website, href: website?.startsWith('http') ? website : `https://${website}`, icon: FiIcons.FiLink, label: "Portal" },
               { val: finalAddress, href: null, icon: FiIcons.FiMapPin, label: "HQ" }
            ].map((link, idx) => link.val && (
               <a key={idx} href={link.href} target={link.href?.startsWith('http') ? '_blank' : undefined} className={`flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-[1.5rem] ${link.href ? 'hover:bg-white/10 hover:border-blue-400/50 cursor-pointer' : 'cursor-default'} transition-all`}>
                  <div className="bg-blue-500/20 p-2.5 rounded-xl text-blue-400 shrink-0"><link.icon size={18} /></div>
                  <div className="overflow-hidden">
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{link.label}</p>
                     <p className="text-sm font-semibold text-white truncate">{link.val}</p>
                  </div>
               </a>
            ))}
         </div>

         {/* Social Cluster */}
         <div className="flex flex-wrap justify-center gap-4 py-4">
            {[
               { icon: FiIcons.FiLinkedin, val: linkedin },
               { icon: FiIcons.FiTwitter, val: twitter },
               { icon: FiIcons.FiFacebook, val: facebook },
               { icon: FiIcons.FiInstagram, val: instagram }
            ].map((social, idx) => social.val && (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-slate-300 hover:text-white hover:bg-blue-500 transition-all shadow-lg shrink-0">
                  <social.icon size={20} />
               </a>
            ))}
         </div>

         <button onClick={() => downloadVCard(userData)} className="w-full py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_40px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
            <FiIcons.FiDatabase size={16} /> Sync Identity
         </button>
         
         <PoweredBy />
      </div>
    </div>
  );
};
export default CorporateGlass;
