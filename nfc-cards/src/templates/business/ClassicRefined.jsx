import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from "../common/StandardComponents";

const ClassicRefined = ({ userData }) => {
  const { 
    displayName, email, role, mobileNumber, phone, 
    companyName, designation, website, address, city,
    linkedin, instagram, facebook, twitter, bio, avatar, logo 
  } = userData || {};

  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "Managing Partner";
  const finalAddress = address || city;

  return (
    <div className="min-h-screen bg-zinc-900 font-serif pb-16">
      
      {/* Luxury Minimal Header */}
      <div className="pt-20 pb-12 px-8 flex flex-col items-center border-b border-zinc-800 bg-black/20">
         <div className="w-24 h-24 mb-8 overflow-hidden rounded-sm border border-zinc-700 bg-black flex items-center justify-center shrink-0">
            {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-3 bg-white" /> : avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover grayscale" /> : <span className="text-3xl text-zinc-500 font-light uppercase">{(displayName || 'C')[0]}</span>}
         </div>
         <h1 className="text-3xl font-light tracking-wide text-zinc-100 mb-3 text-center">{displayName || 'Classic Refined'}</h1>
         <div className="h-px w-12 bg-zinc-600 mb-4" />
         <p className="text-xs font-['Inter'] text-zinc-400 uppercase tracking-[0.3em] text-center">{displayRole}</p>
         {companyName && <p className="text-[10px] font-['Inter'] font-semibold text-zinc-500 uppercase tracking-[0.4em] mt-4 text-center">{companyName}</p>}
      </div>

      <div className="px-6 mt-12 space-y-12 max-w-md mx-auto">
         
         {/* Bio */}
         {bio && (
            <div className="text-center px-4">
               <p className="text-sm leading-loose text-zinc-400 font-light italic">"{bio}"</p>
            </div>
         )}

         {/* Refined Contact List */}
         <div className="space-y-6">
            <h3 className="text-[9px] font-['Inter'] uppercase tracking-[0.4em] text-zinc-600 text-center border-b border-zinc-800 pb-4 mb-8">Private Directory</h3>
            
            {displayPhone && (
               <div className="flex flex-col items-center gap-2 group">
                  <span className="text-[9px] font-['Inter'] uppercase tracking-[0.3em] text-zinc-500 text-center">Direct Contact</span>
                  <a href={`tel:${displayPhone}`} className="text-lg text-zinc-200 hover:text-white transition-colors text-center">{displayPhone}</a>
               </div>
            )}
            
            {email && (
               <div className="flex flex-col items-center gap-2 group pt-4">
                  <span className="text-[9px] font-['Inter'] uppercase tracking-[0.3em] text-zinc-500 text-center">Electronic Mail</span>
                  <a href={`mailto:${email}`} className="text-sm text-zinc-200 hover:text-white transition-colors tracking-wider text-center truncate w-full px-4">{email}</a>
               </div>
            )}

            {website && (
               <div className="flex flex-col items-center gap-2 group pt-4">
                  <span className="text-[9px] font-['Inter'] uppercase tracking-[0.3em] text-zinc-500 text-center">Private Portal</span>
                  <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-200 hover:text-white transition-colors tracking-wider text-center flex items-center justify-center gap-2 truncate w-full px-4">
                     <span className="truncate">{website}</span> <FiIcons.FiArrowUpRight size={12} className="text-zinc-600 shrink-0" />
                  </a>
               </div>
            )}

            {finalAddress && (
               <div className="flex flex-col items-center gap-2 pt-4">
                  <span className="text-[9px] font-['Inter'] uppercase tracking-[0.3em] text-zinc-500 text-center">Offices</span>
                  <p className="text-sm text-zinc-300 leading-relaxed text-center max-w-[250px] truncate">{finalAddress}</p>
               </div>
            )}
         </div>

         {/* Social Icons */}
         <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-zinc-800">
            {[
               { icon: FiIcons.FiLinkedin, val: linkedin },
               { icon: FiIcons.FiTwitter, val: twitter },
               { icon: FiIcons.FiInstagram, val: instagram },
               { icon: FiIcons.FiFacebook, val: facebook }
            ].map((social, idx) => social.val && (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-300 transition-colors shrink-0">
                  <social.icon size={20} />
               </a>
            ))}
         </div>

         <div className="pt-8">
            <button onClick={() => downloadVCard(userData)} className="w-full py-5 border border-zinc-700 bg-transparent text-zinc-300 font-['Inter'] font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-3 active:scale-[0.98]">
               Acquire Card
            </button>
         </div>

         <p className="text-center text-[7px] font-['Inter'] font-bold tracking-[0.6em] text-zinc-700 uppercase mt-12">Cardyn Exclusive</p>
      </div>
    </div>
  );
};
export default ClassicRefined;
