import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const CarShowroom = ({ userData }) => {
  const { displayName, email, role, mobileNumber, phone, companyName, designation, website, address, city, linkedin, instagram, facebook, twitter, bio, avatar, logo } = userData || {};
  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "Sales Executive";
  const finalAddress = address || city;

  return (
    <div className="w-full min-h-screen bg-zinc-900 font-['Outfit'] text-slate-300 pb-12 relative overflow-x-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 pointer-events-none" />
      
      {/* Showroom Header */}
      <div className="relative h-72 bg-black overflow-hidden flex flex-col justify-end p-6 border-b-4 border-red-600 shadow-[0_10px_30px_rgba(220,38,38,0.2)]">
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
         <div className="relative z-20 flex justify-between items-end">
            <div className="w-24 h-24 rounded-2xl bg-zinc-800 border-2 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.4)] flex items-center justify-center overflow-hidden shrink-0 relative">
               {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-2" /> : avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" /> : <FiIcons.FiKey size={32} className="text-red-600" />}
            </div>
            <div className="text-right overflow-hidden ml-4">
               <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-1 truncate">{displayName || 'Velocity Auto'}</h1>
               <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest truncate">{displayRole}</p>
            </div>
         </div>
      </div>

      <div className="px-6 mt-6 space-y-6 relative z-20">
         {companyName && (
            <div className="bg-red-600 text-white p-3 rounded-xl flex items-center justify-center gap-2 shadow-lg">
               <FiIcons.FiShield size={16} className="shrink-0" />
               <span className="font-bold text-xs uppercase tracking-widest truncate">{companyName}</span>
            </div>
         )}

         {bio && (
            <div className="bg-zinc-800/80 backdrop-blur-md p-6 rounded-2xl border border-zinc-700/50">
               <p className="text-sm text-zinc-300 leading-relaxed">"{bio}"</p>
            </div>
         )}

         {/* Showroom Actions */}
         <div className="grid grid-cols-2 gap-4">
            <a href={`tel:${displayPhone}`} className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 p-5 rounded-2xl flex flex-col items-center justify-center hover:border-red-500 transition-all group cursor-pointer">
               <FiIcons.FiPhone size={24} className="text-red-500 mb-2 group-hover:scale-110 transition-transform" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 text-center">Sales Line</span>
            </a>
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 p-5 rounded-2xl flex flex-col items-center justify-center hover:border-red-500 transition-all group">
               <FiIcons.FiCalendar size={24} className="text-red-500 mb-2 group-hover:scale-110 transition-transform" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 text-center">Test Drive</span>
            </div>
         </div>

         {/* Data Grid */}
         <div className="space-y-3">
            {email && (
               <a href={`mailto:${email}`} className="flex items-center gap-4 bg-zinc-800/80 p-4 rounded-2xl border border-zinc-700/50 hover:bg-zinc-800 transition-colors">
                  <div className="bg-zinc-900 p-3 rounded-xl text-red-500 shrink-0"><FiIcons.FiMail size={18} /></div>
                  <div className="overflow-hidden">
                     <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Email</p>
                     <p className="text-sm font-semibold text-white truncate">{email}</p>
                  </div>
               </a>
            )}
            {finalAddress && (
               <div className="flex items-center gap-4 bg-zinc-800/80 p-4 rounded-2xl border border-zinc-700/50">
                  <div className="bg-zinc-900 p-3 rounded-xl text-red-500 shrink-0"><FiIcons.FiMapPin size={18} /></div>
                  <div className="overflow-hidden">
                     <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Showroom Location</p>
                     <p className="text-sm font-semibold text-white truncate">{finalAddress}</p>
                  </div>
               </div>
            )}
            {website && (
               <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-zinc-800/80 p-4 rounded-2xl border border-zinc-700/50 hover:bg-zinc-800 transition-colors group">
                  <div className="flex items-center gap-4 overflow-hidden">
                     <div className="bg-zinc-900 p-3 rounded-xl text-red-500 shrink-0"><FiIcons.FiGlobe size={18} /></div>
                     <p className="text-sm font-semibold text-white truncate">View Inventory</p>
                  </div>
                  <FiIcons.FiArrowUpRight className="text-zinc-500 group-hover:text-red-500 shrink-0" />
               </a>
            )}
         </div>

         {/* Social Links */}
         <div className="flex justify-center gap-4 py-4 border-t border-zinc-800 flex-wrap">
            {[ { icon: FiIcons.FiLinkedin, val: linkedin }, { icon: FiIcons.FiInstagram, val: instagram }, { icon: FiIcons.FiFacebook, val: facebook }, { icon: FiIcons.FiTwitter, val: twitter } ].map((social, idx) => social.val && (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-red-500 transition-colors p-3 bg-zinc-800 rounded-xl shrink-0">
                  <social.icon size={20} />
               </a>
            ))}
         </div>

         <button onClick={() => downloadVCard(userData)} className="w-full py-5 bg-red-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-red-700 transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
            <FiIcons.FiDownload size={16} /> Save VIP Contact
         </button>
         <PoweredBy />
      </div>
    </div>
  );
};
export default CarShowroom;
