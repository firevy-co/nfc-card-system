import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from "../common/StandardComponents";

const CarbonDrive = ({ userData }) => {
  const { displayName, email, role, mobileNumber, phone, companyName, designation, website, address, city, linkedin, instagram, facebook, twitter, bio, avatar, logo } = userData || {};
  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "Performance Specialist";
  const finalAddress = address || city;

  return (
    <div className="min-h-screen bg-[#111] text-white font-mono pb-12 overflow-x-hidden">
      <div className="p-6">
         {/* Racing Header */}
         <div className="border-l-4 border-red-600 pl-4 py-2 mb-8">
            <div className="flex justify-between items-start">
               <div className="overflow-hidden pr-4">
                  <h1 className="text-2xl font-black uppercase tracking-tighter truncate">{displayName || 'Carbon Drive'}</h1>
                  <p className="text-xs text-red-500 mt-1 uppercase tracking-widest truncate">{displayRole}</p>
               </div>
               <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 overflow-hidden">
                  {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-2" /> : avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover grayscale" /> : <span className="text-xl font-bold text-red-600 uppercase">{(displayName || 'C')[0]}</span>}
               </div>
            </div>
            {companyName && <div className="mt-4 bg-zinc-900 inline-block px-3 py-1 text-[10px] uppercase tracking-widest border border-zinc-800 truncate max-w-full">{companyName}</div>}
         </div>

         {bio && (
            <div className="mb-8">
               <p className="text-xs text-zinc-400 uppercase tracking-widest mb-2 border-b border-zinc-800 pb-1">Driver Bio</p>
               <p className="text-sm leading-relaxed text-zinc-300">"{bio}"</p>
            </div>
         )}

         {/* Performance Stats */}
         <div className="grid grid-cols-3 gap-2 mb-8">
            <div className="bg-zinc-900 border border-zinc-800 p-3 text-center">
               <p className="text-xs text-zinc-500 uppercase">Class</p>
               <p className="font-black text-red-500">GT3</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-3 text-center">
               <p className="text-xs text-zinc-500 uppercase">Wins</p>
               <p className="font-black text-white">12</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-3 text-center">
               <p className="text-xs text-zinc-500 uppercase">Exp</p>
               <p className="font-black text-white">5 YR</p>
            </div>
         </div>

         {/* Comms Panel */}
         <div className="space-y-2 mb-8">
            <p className="text-xs text-zinc-400 uppercase tracking-widest mb-2 border-b border-zinc-800 pb-1">Pit Crew Comms</p>
            {displayPhone && (
               <a href={`tel:${displayPhone}`} className="flex items-center gap-4 bg-zinc-900 p-4 border border-zinc-800 hover:border-red-600 transition-colors">
                  <FiIcons.FiPhone size={16} className="text-red-500 shrink-0" />
                  <span className="text-sm uppercase">{displayPhone}</span>
               </a>
            )}
            {email && (
               <a href={`mailto:${email}`} className="flex items-center gap-4 bg-zinc-900 p-4 border border-zinc-800 hover:border-red-600 transition-colors">
                  <FiIcons.FiMail size={16} className="text-red-500 shrink-0" />
                  <span className="text-sm uppercase truncate">{email}</span>
               </a>
            )}
            {finalAddress && (
               <div className="flex items-center gap-4 bg-zinc-900 p-4 border border-zinc-800">
                  <FiIcons.FiMapPin size={16} className="text-red-500 shrink-0" />
                  <span className="text-sm uppercase truncate">{finalAddress}</span>
               </div>
            )}
            {website && (
               <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-4 bg-red-600 p-4 border border-red-500 text-white hover:bg-red-700 transition-colors mt-4">
                  <FiIcons.FiLink size={16} className="shrink-0" />
                  <span className="text-sm uppercase font-bold truncate">Telemetry Data Link</span>
               </a>
            )}
         </div>

         {/* Sponsors (Socials) */}
         <p className="text-xs text-zinc-400 uppercase tracking-widest mb-2 text-center">Network</p>
         <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[ { icon: FiIcons.FiLinkedin, val: linkedin }, { icon: FiIcons.FiTwitter, val: twitter }, { icon: FiIcons.FiInstagram, val: instagram }, { icon: FiIcons.FiFacebook, val: facebook } ].map((social, idx) => social.val && (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="bg-zinc-900 p-3 border border-zinc-800 text-zinc-400 hover:text-red-500 shrink-0">
                  <social.icon size={16} />
               </a>
            ))}
         </div>

         <button onClick={() => downloadVCard(userData)} className="w-full py-4 border-2 border-red-600 text-red-500 font-black text-xs uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
            <FiIcons.FiDownload size={14} /> Download File
         </button>
      </div>
    </div>
  );
};
export default CarbonDrive;
