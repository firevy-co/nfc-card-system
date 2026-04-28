import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from "../common/StandardComponents";

const UrbanDwell = ({ userData }) => {
  const { displayName, email, role, mobileNumber, phone, companyName, designation, website, address, city, linkedin, instagram, facebook, twitter, bio, avatar, logo } = userData || {};
  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "Urban Broker";
  const finalAddress = address || city;

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-200 pb-12 overflow-x-hidden">
      {/* Architectural Header */}
      <div className="relative h-64 bg-black overflow-hidden flex flex-col justify-end p-8">
         <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(45deg, #334155 25%, transparent 25%, transparent 75%, #334155 75%, #334155), linear-gradient(45deg, #334155 25%, transparent 25%, transparent 75%, #334155 75%, #334155)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }} />
         
         <div className="relative z-10">
            <div className="w-20 h-20 bg-slate-800 border-2 border-white mb-4 shrink-0 flex items-center justify-center overflow-hidden">
               {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-2 bg-white" /> : avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover grayscale" /> : <FiIcons.FiBriefcase size={28} className="text-white" />}
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white leading-none mb-2 truncate px-1">{displayName || 'Urban Dwell'}</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 truncate">{displayRole}</p>
         </div>
      </div>

      <div className="px-8 mt-8 space-y-8 max-w-md mx-auto">
         {companyName && (
            <div className="border-l-4 border-white pl-4">
               <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Agency</p>
               <p className="text-sm font-bold text-white uppercase tracking-wider truncate">{companyName}</p>
            </div>
         )}

         {bio && (
            <div className="bg-slate-800/50 p-6 border border-slate-700/50">
               <p className="text-sm text-slate-300 leading-relaxed">"{bio}"</p>
            </div>
         )}

         {/* Property Types */}
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800 border border-slate-700 p-5 flex flex-col items-center text-center hover:bg-slate-700 transition-colors">
               <FiIcons.FiLayout size={24} className="text-white mb-2" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">City Lofts</span>
            </div>
            <div className="bg-slate-800 border border-slate-700 p-5 flex flex-col items-center text-center hover:bg-slate-700 transition-colors">
               <FiIcons.FiMap size={24} className="text-white mb-2" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Local Guides</span>
            </div>
         </div>

         {/* Action Links */}
         <div className="space-y-4">
            {displayPhone && (
               <a href={`tel:${displayPhone}`} className="flex items-center justify-between p-5 bg-white text-slate-900 font-bold uppercase tracking-wider hover:bg-slate-200 transition-colors text-xs group">
                  <div className="flex items-center gap-3 overflow-hidden">
                     <FiIcons.FiPhone className="shrink-0" />
                     <span className="truncate">{displayPhone}</span>
                  </div>
                  <FiIcons.FiArrowUpRight className="shrink-0 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
               </a>
            )}
            {email && (
               <a href={`mailto:${email}`} className="flex items-center justify-between p-5 border border-slate-700 text-white font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors text-xs group">
                  <div className="flex items-center gap-3 overflow-hidden">
                     <FiIcons.FiMail className="shrink-0" />
                     <span className="truncate">{email}</span>
                  </div>
                  <FiIcons.FiArrowUpRight className="shrink-0 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
               </a>
            )}
            {website && (
               <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 border border-slate-700 text-white font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors text-xs group">
                  <div className="flex items-center gap-3 overflow-hidden">
                     <FiIcons.FiGlobe className="shrink-0" />
                     <span className="truncate">View Listings</span>
                  </div>
                  <FiIcons.FiArrowUpRight className="shrink-0 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
               </a>
            )}
            {finalAddress && (
               <div className="flex items-center gap-3 p-5 bg-slate-800/50 border border-slate-700/50 text-slate-300 font-bold uppercase tracking-wider text-xs">
                  <FiIcons.FiMapPin className="shrink-0 text-slate-500" />
                  <span className="truncate">{finalAddress}</span>
               </div>
            )}
         </div>

         {/* Social Nodes */}
         <div className="flex flex-wrap gap-4 pt-4 justify-center">
            {[ { icon: FiIcons.FiLinkedin, val: linkedin }, { icon: FiIcons.FiInstagram, val: instagram }, { icon: FiIcons.FiFacebook, val: facebook }, { icon: FiIcons.FiTwitter, val: twitter } ].map((social, idx) => social.val && (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-white transition-colors shrink-0">
                  <social.icon size={20} />
               </a>
            ))}
         </div>

         <button onClick={() => downloadVCard(userData)} className="w-full py-5 bg-slate-800 border border-slate-600 text-white font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-700 transition-colors flex items-center justify-center gap-3 mt-4 active:scale-[0.98]">
            <FiIcons.FiDownload size={16} /> Save Identity
         </button>
      </div>
    </div>
  );
};
export default UrbanDwell;
