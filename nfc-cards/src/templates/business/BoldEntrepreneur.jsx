import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const BoldEntrepreneur = ({ userData }) => {
  const { 
    displayName, email, role, mobileNumber, phone, 
    companyName, designation, website, address, city,
    linkedin, instagram, facebook, twitter, bio, avatar, logo 
  } = userData || {};

  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "Founder & Disruptor";
  const finalAddress = address || city;

  return (
    <div className="w-full min-h-screen bg-yellow-400 font-['Inter'] pb-12 flex flex-col justify-center px-4 md:bg-neutral-950 md:items-center py-0 md:py-12">
      
      {/* High Impact Card Bento */}
      <div className="bg-black rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl mt-8">
         
         {/* Typographic Background */}
         <div className="absolute top-4 right-4 text-[100px] font-black text-white/5 select-none leading-none tracking-tighter pointer-events-none uppercase">
            Hustle
         </div>

         <div className="flex justify-between items-start mb-12 relative z-10">
            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center overflow-hidden border-4 border-black shrink-0 shadow-[0_0_20px_rgba(250,204,21,0.3)]">
               {avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" /> : logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-2 bg-white" /> : <span className="text-3xl font-black text-black uppercase">{(displayName || 'B')[0]}</span>}
            </div>
            <div className="bg-yellow-400 text-black px-3 py-1 rounded-full flex items-center gap-2 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-yellow-400/20 shrink-0 ml-4">
               <FiIcons.FiZap fill="currentColor" size={12} /> Active
            </div>
         </div>

         <h1 className="text-4xl font-black uppercase tracking-tighter leading-[0.9] mb-3 relative z-10">{displayName || 'Bold Founder'}</h1>
         <p className="text-yellow-400 font-bold uppercase tracking-widest text-xs relative z-10">{displayRole}</p>
         {companyName && <p className="text-white/50 font-bold uppercase tracking-widest text-xs mt-2 relative z-10 border-l-2 border-yellow-400 pl-2">{companyName}</p>}

         {bio && (
            <div className="mt-8 bg-white/5 p-5 rounded-2xl border border-white/10 relative z-10">
               <p className="text-sm font-medium leading-relaxed">"{bio}"</p>
            </div>
         )}

         {/* Venture Grid */}
         <div className="grid grid-cols-2 gap-3 mt-6 relative z-10">
            {displayPhone && (
               <a href={`tel:${displayPhone}`} className="bg-yellow-400 text-black p-4 rounded-2xl flex flex-col items-center justify-center hover:bg-yellow-300 transition-colors gap-2 text-center">
                  <FiIcons.FiPhoneCall size={24} />
                  <span className="font-black text-[10px] uppercase tracking-widest mt-1">Pitch Line</span>
               </a>
            )}
            {email && (
               <a href={`mailto:${email}`} className="bg-white/10 text-white border border-white/20 p-4 rounded-2xl flex flex-col items-center justify-center hover:bg-white/20 transition-colors gap-2 text-center overflow-hidden">
                  <FiIcons.FiMail size={24} className="text-yellow-400 shrink-0" />
                  <span className="font-black text-[10px] uppercase tracking-widest mt-1 truncate w-full">Collab Inbox</span>
               </a>
            )}
            {website && (
               <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="col-span-2 bg-white text-black p-4 rounded-2xl flex items-center justify-between hover:bg-gray-100 transition-colors group">
                  <div className="flex items-center gap-3 font-black text-xs uppercase tracking-widest overflow-hidden">
                     <FiIcons.FiGlobe size={20} className="text-yellow-500 shrink-0" />
                     <span className="truncate">Current Venture</span>
                  </div>
                  <FiIcons.FiArrowRight size={20} className="shrink-0 group-hover:translate-x-1 transition-transform" />
               </a>
            )}
            {finalAddress && (
               <div className="col-span-2 bg-white/5 text-white/70 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
                  <FiIcons.FiMapPin size={20} className="text-yellow-500 shrink-0" />
                  <span className="font-bold text-xs uppercase tracking-widest leading-relaxed truncate">{finalAddress}</span>
               </div>
            )}
         </div>

         {/* Social Bar */}
         <div className="flex flex-wrap gap-3 mt-6 relative z-10 pt-2 border-t border-white/10 justify-center">
            {[
               { icon: FiIcons.FiTwitter, val: twitter },
               { icon: FiIcons.FiLinkedin, val: linkedin },
               { icon: FiIcons.FiInstagram, val: instagram },
               { icon: FiIcons.FiFacebook, val: facebook }
            ].map((social, idx) => social.val && (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="shrink-0 w-12 h-12 rounded-full border border-yellow-400/30 text-yellow-400 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-colors">
                  <social.icon size={20} />
               </a>
            ))}
         </div>

         <button onClick={() => downloadVCard(userData)} className="w-full mt-8 py-5 border-2 border-yellow-400 text-yellow-400 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-yellow-400 hover:text-black transition-colors flex items-center justify-center gap-3 relative z-10 active:scale-[0.98]">
            <FiIcons.FiPlus size={18} /> Connect Profile
         </button>

      </div>
      
      <PoweredBy />
    </div>
  );
};
export default BoldEntrepreneur;
