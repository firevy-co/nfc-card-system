import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const ExecutiveMinimal = ({ userData }) => {
  const { 
    displayName, email, role, mobileNumber, phone, 
    companyName, designation, website, address, city,
    linkedin, instagram, facebook, twitter, bio, avatar, logo 
  } = userData || {};

  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "Founder & CEO";
  const finalAddress = address || city;

  return (
    <div className="min-h-screen bg-white text-black font-['Inter'] px-8 py-16 flex flex-col justify-center max-w-md mx-auto md:bg-neutral-950 md:items-center py-0 md:py-12">
      
      {/* Minimal Header */}
      <div className="flex justify-between items-start mb-16">
         <div className="w-16 h-16 rounded-full overflow-hidden bg-zinc-100 flex items-center justify-center border border-zinc-200 shrink-0">
            {avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover grayscale" /> : logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-2 grayscale" /> : <span className="text-2xl font-light">{(displayName || 'E')[0]}</span>}
         </div>
         <div className="text-right flex flex-col items-end overflow-hidden ml-4">
            {logo && avatar && (
               <div className="w-8 h-8 mb-2 shrink-0">
                  <img src={logo} alt="Logo" className="w-full h-full object-contain grayscale" />
               </div>
            )}
            <h1 className="text-2xl font-semibold tracking-tight leading-none truncate w-full">{displayName || 'Executive Minimal'}</h1>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mt-2">{displayRole}</p>
            {companyName && <p className="text-xs font-bold text-zinc-800 mt-1 truncate w-full">{companyName}</p>}
         </div>
      </div>

      {bio && (
         <div className="mb-12">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3 border-b border-zinc-100 pb-2">Vision & Strategy</h3>
            <p className="text-sm leading-relaxed text-zinc-700 font-medium">"{bio}"</p>
         </div>
      )}

      {/* High-Level Metrics (Mockup for minimal aesthetic) */}
      <div className="mb-12 flex justify-between border-y border-zinc-100 py-6">
         <div className="text-center">
            <p className="text-2xl font-light tracking-tighter">15+</p>
            <p className="text-[9px] uppercase tracking-widest text-zinc-400 mt-1">Years Exp</p>
         </div>
         <div className="w-px bg-zinc-100" />
         <div className="text-center">
            <p className="text-2xl font-light tracking-tighter">3</p>
            <p className="text-[9px] uppercase tracking-widest text-zinc-400 mt-1">Exits</p>
         </div>
         <div className="w-px bg-zinc-100" />
         <div className="text-center">
            <p className="text-2xl font-light tracking-tighter">$1M+</p>
            <p className="text-[9px] uppercase tracking-widest text-zinc-400 mt-1">Managed</p>
         </div>
      </div>

      {/* Minimal Links */}
      <div className="space-y-6 mb-16">
         {displayPhone && (
            <div className="flex items-center justify-between group">
               <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 shrink-0">Direct</span>
               <a href={`tel:${displayPhone}`} className="text-sm font-medium hover:text-blue-600 transition-colors ml-4 text-right">{displayPhone}</a>
            </div>
         )}
         {email && (
            <div className="flex items-center justify-between group">
               <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 shrink-0">Email</span>
               <a href={`mailto:${email}`} className="text-sm font-medium hover:text-blue-600 transition-colors truncate text-right ml-4">{email}</a>
            </div>
         )}
         {website && (
            <div className="flex items-center justify-between group">
               <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 shrink-0">Website</span>
               <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-blue-600 transition-colors truncate text-right ml-4">{website}</a>
            </div>
         )}
         {finalAddress && (
            <div className="flex items-center justify-between group">
               <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 shrink-0">HQ</span>
               <span className="text-sm font-medium truncate text-right ml-4">{finalAddress}</span>
            </div>
         )}
      </div>

      {/* Network */}
      <div className="flex items-center gap-6 mb-12">
         {[
            { icon: FiIcons.FiLinkedin, val: linkedin },
            { icon: FiIcons.FiTwitter, val: twitter },
            { icon: FiIcons.FiInstagram, val: instagram },
            { icon: FiIcons.FiFacebook, val: facebook }
         ].map((social, idx) => social.val && (
            <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-black transition-colors shrink-0">
               <social.icon size={20} />
            </a>
         ))}
      </div>

      <button onClick={() => downloadVCard(userData)} className="w-full py-5 bg-black text-white font-medium text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 active:scale-[0.98]">
         <FiIcons.FiPlus size={14} /> Add Connection
      </button>

      <PoweredBy />
    </div>
  );
};
export default ExecutiveMinimal;
