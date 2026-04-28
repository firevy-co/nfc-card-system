import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from "../common/StandardComponents";

const GrandEstate = ({ userData }) => {
  const { displayName, email, role, mobileNumber, phone, companyName, designation, website, address, city, linkedin, instagram, facebook, twitter, bio, avatar, logo } = userData || {};
  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "Luxury Broker";
  const finalAddress = address || city;

  return (
    <div className="min-h-screen bg-indigo-950 font-serif pb-16 overflow-x-hidden">
      
      {/* Luxury Header */}
      <div className="pt-20 pb-12 px-8 flex flex-col items-center border-b border-indigo-900/50 bg-black/20 relative">
         <div className="w-24 h-24 mb-6 overflow-hidden rounded-full border-2 border-indigo-300/30 bg-indigo-900 flex items-center justify-center shadow-2xl shrink-0">
            {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-3 bg-white" /> : avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-3xl text-indigo-300 font-light uppercase">{(displayName || 'G')[0]}</span>}
         </div>
         <h1 className="text-3xl font-normal tracking-wide text-white mb-2 text-center px-2 truncate w-full">{displayName || 'Grand Estate'}</h1>
         <div className="h-px w-16 bg-indigo-500/50 my-3" />
         <p className="text-xs font-['Inter'] text-indigo-300 uppercase tracking-[0.3em] text-center px-2 truncate w-full">{displayRole}</p>
         {companyName && <p className="text-[10px] font-['Inter'] font-semibold text-indigo-400/70 uppercase tracking-[0.4em] mt-4 text-center px-2 truncate w-full">{companyName}</p>}
      </div>

      <div className="px-6 mt-12 space-y-8 max-w-md mx-auto relative z-10">
         
         {/* Bio */}
         {bio && (
            <div className="text-center px-4 mb-12 bg-indigo-900/20 p-6 rounded-2xl border border-indigo-800/30 backdrop-blur-sm">
               <FiIcons.FiFeather size={20} className="mx-auto text-indigo-400 mb-3 opacity-50" />
               <p className="text-sm leading-relaxed text-indigo-200/80 font-light italic">"{bio}"</p>
            </div>
         )}

         {/* Elite Services */}
         <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="border border-indigo-800/50 rounded-xl p-5 flex flex-col items-center justify-center text-center bg-indigo-900/10">
               <FiIcons.FiKey size={20} className="text-indigo-400 mb-2 opacity-70" />
               <span className="text-[10px] font-['Inter'] uppercase tracking-widest text-indigo-300">Exclusive Estates</span>
            </div>
            <div className="border border-indigo-800/50 rounded-xl p-5 flex flex-col items-center justify-center text-center bg-indigo-900/10">
               <FiIcons.FiStar size={20} className="text-indigo-400 mb-2 opacity-70" />
               <span className="text-[10px] font-['Inter'] uppercase tracking-widest text-indigo-300">Concierge Sales</span>
            </div>
         </div>

         {/* Directory */}
         <div className="space-y-4">
            {displayPhone && (
               <a href={`tel:${displayPhone}`} className="flex flex-col items-center gap-1 group bg-indigo-900/20 py-4 rounded-xl border border-indigo-800/30 hover:bg-indigo-800/40 transition-colors px-4">
                  <span className="text-[9px] font-['Inter'] uppercase tracking-[0.3em] text-indigo-400/60">Private Line</span>
                  <span className="text-lg text-indigo-100 group-hover:text-white transition-colors truncate w-full text-center">{displayPhone}</span>
               </a>
            )}
            
            {email && (
               <a href={`mailto:${email}`} className="flex flex-col items-center gap-1 group bg-indigo-900/20 py-4 rounded-xl border border-indigo-800/30 hover:bg-indigo-800/40 transition-colors px-4">
                  <span className="text-[9px] font-['Inter'] uppercase tracking-[0.3em] text-indigo-400/60">Correspondence</span>
                  <span className="text-sm text-indigo-100 group-hover:text-white transition-colors tracking-wider text-center truncate w-full">{email}</span>
               </a>
            )}

            {website && (
               <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 group bg-indigo-900/20 py-4 rounded-xl border border-indigo-800/30 hover:bg-indigo-800/40 transition-colors px-4">
                  <span className="text-[9px] font-['Inter'] uppercase tracking-[0.3em] text-indigo-400/60">Portfolio</span>
                  <div className="flex items-center gap-2 overflow-hidden w-full justify-center">
                     <span className="text-sm text-indigo-100 group-hover:text-white transition-colors tracking-wider text-center truncate">{website}</span>
                     <FiIcons.FiArrowUpRight size={14} className="text-indigo-400 shrink-0" />
                  </div>
               </a>
            )}

            {finalAddress && (
               <div className="flex flex-col items-center gap-1 bg-indigo-900/20 py-4 rounded-xl border border-indigo-800/30 px-4">
                  <span className="text-[9px] font-['Inter'] uppercase tracking-[0.3em] text-indigo-400/60">Brokerage</span>
                  <p className="text-sm text-indigo-200 leading-relaxed text-center max-w-full truncate">{finalAddress}</p>
               </div>
            )}
         </div>

         {/* Social Icons */}
         <div className="flex flex-wrap justify-center gap-6 pt-8 border-t border-indigo-900/50">
            {[ { icon: FiIcons.FiLinkedin, val: linkedin }, { icon: FiIcons.FiInstagram, val: instagram }, { icon: FiIcons.FiFacebook, val: facebook }, { icon: FiIcons.FiTwitter, val: twitter } ].map((social, idx) => social.val && (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="text-indigo-400/60 hover:text-indigo-200 transition-colors shrink-0 bg-indigo-900/30 p-4 rounded-full">
                  <social.icon size={18} />
               </a>
            ))}
         </div>

         <div className="pt-6">
            <button onClick={() => downloadVCard(userData)} className="w-full py-5 bg-indigo-100 text-indigo-950 font-['Inter'] font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 flex items-center justify-center gap-3 rounded-xl active:scale-[0.98]">
               Save to Contacts
            </button>
         </div>

         <p className="text-center text-[7px] font-['Inter'] font-bold tracking-[0.6em] text-indigo-500/40 uppercase mt-12">Grand Estate Profile</p>
      </div>
    </div>
  );
};
export default GrandEstate;
