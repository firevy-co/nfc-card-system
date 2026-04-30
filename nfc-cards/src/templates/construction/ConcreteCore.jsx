import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const ConcreteCore = ({ userData }) => {
  const { 
    displayName, email, role, mobileNumber, phone, 
    companyName, designation, website, address, city,
    linkedin, instagram, facebook, twitter, bio, avatar, logo 
  } = userData || {};

  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "Site Manager";
  const finalAddress = address || city;

  return (
    <div className="min-h-screen bg-[#dcdcdc] font-['Inter'] p-4 pb-12 flex flex-col gap-4">
      
      {/* Brutalist Header Bento */}
      <div className="bg-[#111] p-6 rounded-none shadow-[8px_8px_0px_#eab308] border-2 border-[#111] relative overflow-hidden group">
         <div className="absolute -right-10 -top-10 text-[#222] group-hover:text-yellow-500/10 transition-colors">
            <FiIcons.FiSettings size={180} className="animate-[spin_20s_linear_infinite]" />
         </div>
         <div className="relative z-10">
            <div className="w-20 h-20 bg-yellow-400 border-4 border-[#111] mb-6 flex items-center justify-center overflow-hidden shrink-0">
               {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-2 bg-white" /> : avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover grayscale" /> : <span className="text-3xl font-black text-[#111] uppercase">{(displayName || 'C')[0]}</span>}
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-1">{displayName || 'Concrete Core'}</h1>
            <p className="text-[10px] font-black text-yellow-400 uppercase tracking-widest bg-yellow-400/10 inline-block px-2 py-1 mt-2">{displayRole}</p>
         </div>
      </div>

      {companyName && (
         <div className="bg-yellow-400 p-4 border-2 border-[#111] shadow-[4px_4px_0px_#111]">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#111]/60 mb-1">Contractor</p>
            <p className="font-black text-[#111] uppercase text-lg truncate">{companyName}</p>
         </div>
      )}

      {bio && (
         <div className="bg-white p-6 border-2 border-[#111] shadow-[4px_4px_0px_#111]">
            <FiIcons.FiAlertCircle size={24} className="text-yellow-500 mb-3" />
            <p className="text-xs font-bold text-[#111] leading-relaxed uppercase">{bio}</p>
         </div>
      )}

      {/* Safety & Equipment Grid */}
      <div className="grid grid-cols-2 gap-4">
         <div className="bg-[#111] text-white p-5 border-2 border-[#111] shadow-[4px_4px_0px_#eab308] flex flex-col items-center text-center">
            <FiIcons.FiShield size={28} className="text-yellow-400 mb-2" />
            <span className="text-2xl font-black tracking-tighter">0</span>
            <span className="text-[8px] uppercase tracking-widest text-white/50 mt-1">Incidents</span>
         </div>
         <div className="bg-white text-[#111] p-5 border-2 border-[#111] shadow-[4px_4px_0px_#111] flex flex-col items-center text-center">
            <FiIcons.FiTruck size={28} className="text-[#111] mb-2" />
            <span className="text-2xl font-black tracking-tighter">24</span>
            <span className="text-[8px] uppercase tracking-widest text-[#111]/50 mt-1">Active Fleet</span>
         </div>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 gap-4 mt-2">
         {displayPhone && (
            <a href={`tel:${displayPhone}`} className="bg-white border-2 border-[#111] p-5 shadow-[4px_4px_0px_#111] flex items-center justify-between hover:bg-yellow-400 transition-colors">
               <div className="flex items-center gap-4">
                  <FiIcons.FiPhone size={24} className="text-[#111]" />
                  <div>
                     <p className="text-[9px] font-black uppercase tracking-widest text-[#111]/50">Dispatch Line</p>
                     <p className="font-black text-sm text-[#111]">{displayPhone}</p>
                  </div>
               </div>
               <FiIcons.FiArrowUpRight size={20} />
            </a>
         )}
         {email && (
            <a href={`mailto:${email}`} className="bg-white border-2 border-[#111] p-5 shadow-[4px_4px_0px_#111] flex items-center justify-between hover:bg-yellow-400 transition-colors">
               <div className="flex items-center gap-4 overflow-hidden">
                  <FiIcons.FiMail size={24} className="text-[#111] shrink-0" />
                  <div className="overflow-hidden">
                     <p className="text-[9px] font-black uppercase tracking-widest text-[#111]/50">Logistics Email</p>
                     <p className="font-black text-sm text-[#111] truncate">{email}</p>
                  </div>
               </div>
               <FiIcons.FiArrowUpRight size={20} className="shrink-0" />
            </a>
         )}
         {finalAddress && (
            <div className="bg-[#111] text-white border-2 border-[#111] p-5 shadow-[4px_4px_0px_#eab308] flex items-center gap-4">
               <FiIcons.FiMapPin size={24} className="text-yellow-400 shrink-0" />
               <div className="overflow-hidden">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/50">Site Location</p>
                  <p className="font-bold text-xs mt-1 leading-snug truncate">{finalAddress}</p>
               </div>
            </div>
         )}
         {website && (
            <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-[#111] p-5 shadow-[4px_4px_0px_#111] flex items-center justify-between hover:bg-yellow-400 transition-colors">
               <div className="flex items-center gap-4">
                  <FiIcons.FiGlobe size={24} className="text-[#111]" />
                  <span className="font-black text-sm text-[#111] uppercase tracking-wider truncate">Company Portal</span>
               </div>
               <FiIcons.FiExternalLink size={20} className="shrink-0" />
            </a>
         )}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
         {[
            { icon: FiIcons.FiLinkedin, val: linkedin },
            { icon: FiIcons.FiTwitter, val: twitter },
            { icon: FiIcons.FiInstagram, val: instagram },
            { icon: FiIcons.FiFacebook, val: facebook }
         ].map((social, idx) => social.val && (
            <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#111] text-yellow-400 border-2 border-[#111] flex items-center justify-center shadow-[4px_4px_0px_#111] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111] transition-all">
               <social.icon size={20} />
            </a>
         ))}
      </div>

      <button onClick={() => downloadVCard(userData)} className="w-full bg-yellow-400 text-[#111] border-2 border-[#111] py-6 shadow-[4px_4px_0px_#111] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111] transition-all mt-4 active:scale-[0.98]">
         <FiIcons.FiDownload size={18} /> Add to System
      </button>

      <PoweredBy />
    </div>
  );
};
export default ConcreteCore;
