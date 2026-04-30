import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const VectorStructure = ({ userData }) => {
  const { 
    displayName, email, role, mobileNumber, phone, 
    companyName, designation, website, address, city,
    linkedin, instagram, facebook, twitter, bio, avatar, logo 
  } = userData || {};

  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "Site Engineer";
  const finalAddress = address || city;

  return (
    <div className="w-full min-h-screen bg-[#0f172a] text-[#38bdf8] font-mono p-4 pb-12 relative overflow-x-hidden">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      <div className="relative z-10 border-2 border-[#38bdf8]/50 p-4 min-h-[90vh]">
         {/* Top Data Spec */}
         <div className="border-b-2 border-[#38bdf8]/50 pb-4 mb-6 flex justify-between items-start">
            <div className="overflow-hidden">
               <p className="text-[10px] uppercase tracking-widest opacity-70 mb-1">DOC NO: 01A</p>
               <h1 className="text-2xl font-bold uppercase tracking-tight text-white truncate">{displayName || 'Vector Structure'}</h1>
            </div>
            <div className="text-right shrink-0 ml-4">
               <p className="text-[10px] uppercase tracking-widest opacity-70 mb-1">REV: 02</p>
               <p className="text-[10px] font-bold uppercase tracking-wider text-white">{displayRole}</p>
            </div>
         </div>

         {/* Technical Visual */}
         <div className="flex flex-col items-center mb-8 border border-[#38bdf8]/30 p-4 bg-[#0f172a]/80 backdrop-blur-sm relative">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#38bdf8]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#38bdf8]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#38bdf8]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#38bdf8]" />
            
            <div className="w-32 h-32 border-2 border-[#38bdf8]/50 flex items-center justify-center p-1 bg-[#1e293b]">
               <div className="w-full h-full bg-[#0f172a] flex items-center justify-center overflow-hidden">
                  {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-2" /> : avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover mix-blend-luminosity opacity-80" /> : <span className="text-4xl font-black text-[#38bdf8] uppercase">{(displayName || 'V')[0]}</span>}
               </div>
            </div>
            {companyName && <p className="mt-4 text-xs font-bold tracking-widest uppercase text-white bg-[#38bdf8]/20 px-3 py-1 border border-[#38bdf8]/30 text-center">{companyName}</p>}
         </div>

         {/* Specifications Bio */}
         {bio && (
            <div className="mb-6">
               <p className="text-[10px] uppercase tracking-widest opacity-70 border-b border-[#38bdf8]/30 pb-1 mb-2">Technical Summary</p>
               <p className="text-xs leading-relaxed text-white/80 uppercase">"{bio}"</p>
            </div>
         )}

         {/* Connection Interfaces */}
         <div className="mb-8">
            <p className="text-[10px] uppercase tracking-widest opacity-70 border-b border-[#38bdf8]/30 pb-1 mb-3">Communication Interfaces</p>
            <div className="space-y-2">
               {displayPhone && (
                  <a href={`tel:${displayPhone}`} className="flex items-center gap-3 p-3 border border-[#38bdf8]/30 hover:bg-[#38bdf8]/10 transition-colors">
                     <FiIcons.FiPhone size={14} className="shrink-0" />
                     <span className="text-xs uppercase tracking-wider text-white">TEL: {displayPhone}</span>
                  </a>
               )}
               {email && (
                  <a href={`mailto:${email}`} className="flex items-center gap-3 p-3 border border-[#38bdf8]/30 hover:bg-[#38bdf8]/10 transition-colors">
                     <FiIcons.FiMail size={14} className="shrink-0" />
                     <span className="text-xs uppercase tracking-wider text-white truncate">EML: {email}</span>
                  </a>
               )}
               {website && (
                  <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 border border-[#38bdf8]/30 hover:bg-[#38bdf8]/10 transition-colors">
                     <FiIcons.FiGlobe size={14} className="shrink-0" />
                     <span className="text-xs uppercase tracking-wider text-white truncate">WEB: {website}</span>
                  </a>
               )}
               {finalAddress && (
                  <div className="flex items-center gap-3 p-3 border border-[#38bdf8]/30 bg-[#38bdf8]/5">
                     <FiIcons.FiMapPin size={14} className="shrink-0" />
                     <span className="text-xs uppercase tracking-wider text-white truncate">{finalAddress}</span>
                  </div>
               )}
            </div>
         </div>

         {/* External Links */}
         <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {[
               { icon: FiIcons.FiLinkedin, val: linkedin, label: "LNKD" },
               { icon: FiIcons.FiTwitter, val: twitter, label: "TWTR" },
               { icon: FiIcons.FiInstagram, val: instagram, label: "INST" },
               { icon: FiIcons.FiFacebook, val: facebook, label: "FCBK" }
            ].map((social, idx) => social.val && (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-[#38bdf8]/50 px-3 py-2 hover:bg-[#38bdf8] hover:text-[#0f172a] transition-all text-[10px] font-bold uppercase shrink-0">
                  <social.icon size={12} /> {social.label}
               </a>
            ))}
         </div>

         <button onClick={() => downloadVCard(userData)} className="w-full py-4 border-2 border-[#38bdf8] bg-[#38bdf8]/10 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#38bdf8] hover:text-[#0f172a] transition-all flex justify-center items-center gap-2 active:scale-[0.98]">
            <FiIcons.FiDownload size={14} /> Extract V-Card Data
         </button>
         
         <PoweredBy />
      </div>
    </div>
  );
};
export default VectorStructure;
