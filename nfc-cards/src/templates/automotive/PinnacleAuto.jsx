import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from "../common/StandardComponents";

const PinnacleAuto = ({ userData }) => {
  const { displayName, email, role, mobileNumber, phone, companyName, designation, website, address, city, linkedin, instagram, facebook, twitter, bio, avatar, logo } = userData || {};
  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "Master Technician";
  const finalAddress = address || city;

  return (
    <div className="min-h-screen bg-neutral-900 font-mono text-neutral-300 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      
      <div className="p-6 relative z-10">
         {/* Hex Header */}
         <div className="flex flex-col items-center pt-8 pb-6 border-b border-neutral-800 mb-8">
            <div className="w-24 h-24 bg-neutral-800 border-2 border-emerald-500 flex items-center justify-center mb-6 shrink-0" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
               <div className="w-[88px] h-[88px] bg-neutral-900 flex items-center justify-center overflow-hidden" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                  {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-2 bg-white" /> : avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover grayscale" /> : <span className="text-3xl font-bold text-emerald-500 uppercase">{(displayName || 'P')[0]}</span>}
               </div>
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-wider text-white text-center px-2">{displayName || 'Pinnacle Auto'}</h1>
            <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2 text-center px-2">{displayRole}</p>
            {companyName && <p className="text-neutral-500 text-xs uppercase tracking-widest mt-2 text-center px-2">{companyName}</p>}
         </div>

         {bio && (
            <div className="bg-neutral-800/50 p-5 border-l-2 border-emerald-500 mb-8">
               <p className="text-xs leading-relaxed text-neutral-400">"{bio}"</p>
            </div>
         )}

         {/* Tools & Certs */}
         <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-neutral-800/50 border border-neutral-700/50 p-4 text-center">
               <FiIcons.FiCpu className="mx-auto text-emerald-500 mb-2" size={20} />
               <p className="text-[9px] uppercase tracking-widest font-bold">Diagnostics</p>
            </div>
            <div className="bg-neutral-800/50 border border-neutral-700/50 p-4 text-center">
               <FiIcons.FiAward className="mx-auto text-emerald-500 mb-2" size={20} />
               <p className="text-[9px] uppercase tracking-widest font-bold">Certified</p>
            </div>
         </div>

         {/* System Interfaces */}
         <div className="space-y-3 mb-8">
            {displayPhone && (
               <a href={`tel:${displayPhone}`} className="flex items-center gap-4 bg-neutral-800/50 border border-neutral-700/50 p-4 hover:border-emerald-500 transition-colors">
                  <FiIcons.FiPhone size={18} className="text-emerald-500 shrink-0" />
                  <span className="text-sm uppercase tracking-wider text-white truncate">{displayPhone}</span>
               </a>
            )}
            {email && (
               <a href={`mailto:${email}`} className="flex items-center gap-4 bg-neutral-800/50 border border-neutral-700/50 p-4 hover:border-emerald-500 transition-colors">
                  <FiIcons.FiMail size={18} className="text-emerald-500 shrink-0" />
                  <span className="text-sm uppercase tracking-wider text-white truncate">{email}</span>
               </a>
            )}
            {finalAddress && (
               <div className="flex items-center gap-4 bg-neutral-800/50 border border-neutral-700/50 p-4">
                  <FiIcons.FiMapPin size={18} className="text-emerald-500 shrink-0" />
                  <span className="text-sm uppercase tracking-wider text-white truncate">{finalAddress}</span>
               </div>
            )}
            {website && (
               <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-emerald-600 text-neutral-900 p-4 hover:bg-emerald-500 transition-colors mt-4">
                  <FiIcons.FiGlobe size={18} className="shrink-0" />
                  <span className="text-xs uppercase font-bold tracking-widest truncate">Access Web Portal</span>
               </a>
            )}
         </div>

         <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[ { icon: FiIcons.FiLinkedin, val: linkedin }, { icon: FiIcons.FiTwitter, val: twitter }, { icon: FiIcons.FiInstagram, val: instagram }, { icon: FiIcons.FiFacebook, val: facebook } ].map((social, idx) => social.val && (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-emerald-500 transition-colors shrink-0">
                  <social.icon size={24} />
               </a>
            ))}
         </div>

         <button onClick={() => downloadVCard(userData)} className="w-full py-5 border-2 border-neutral-700 text-neutral-300 font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-neutral-800 hover:text-white hover:border-neutral-500 transition-colors flex items-center justify-center gap-3 active:scale-[0.98]">
            <FiIcons.FiHardDrive size={16} /> Sync Master Data
         </button>
      </div>
    </div>
  );
};
export default PinnacleAuto;
