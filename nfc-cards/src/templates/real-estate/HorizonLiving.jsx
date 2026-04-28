import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from "../common/StandardComponents";

const HorizonLiving = ({ userData }) => {
  const { displayName, email, role, mobileNumber, phone, companyName, designation, website, address, city, linkedin, instagram, facebook, twitter, bio, avatar, logo } = userData || {};
  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "Property Guide";
  const finalAddress = address || city;

  return (
    <div className="min-h-screen bg-orange-50 font-['Outfit'] text-slate-800 pb-12 overflow-x-hidden">
      
      {/* Soft Sunset Header */}
      <div className="pt-20 pb-16 px-6 bg-gradient-to-br from-orange-200 via-rose-100 to-orange-50 rounded-b-[4rem] text-center relative overflow-hidden shadow-sm">
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full blur-2xl" />
         
         <div className="flex justify-center mb-6 relative z-10">
            <div className="w-32 h-32 rounded-full p-2 bg-white/50 backdrop-blur-md shadow-xl shrink-0">
               <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border border-orange-100">
                  {avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" /> : logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-4" /> : <FiIcons.FiSun size={40} className="text-orange-400" />}
               </div>
            </div>
         </div>
         
         <h1 className="text-3xl font-black tracking-tight text-slate-800 relative z-10 px-2 truncate">{displayName || 'Horizon Living'}</h1>
         <p className="text-orange-600 font-bold tracking-widest text-xs mt-2 uppercase relative z-10 px-2 truncate">{displayRole}</p>
         {companyName && <p className="text-sm font-semibold text-slate-600 mt-3 relative z-10 px-2 truncate max-w-full">{companyName}</p>}
      </div>

      <div className="px-6 mt-8 space-y-6 max-w-md mx-auto">
         
         {bio && (
            <div className="text-center px-4">
               <p className="text-sm text-slate-600 leading-relaxed font-medium">"{bio}"</p>
            </div>
         )}

         {/* Soft Feature Pillars */}
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-orange-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
               <div className="bg-orange-50 p-3 rounded-full mb-2"><FiIcons.FiUsers size={20} className="text-orange-500" /></div>
               <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Family Homes</span>
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-orange-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
               <div className="bg-orange-50 p-3 rounded-full mb-2"><FiIcons.FiCoffee size={20} className="text-orange-500" /></div>
               <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Amenities</span>
            </div>
         </div>

         {/* Rounded Contact Blocks */}
         <div className="space-y-3">
            {displayPhone && (
               <a href={`tel:${displayPhone}`} className="flex items-center justify-between bg-white p-5 rounded-[2rem] shadow-sm border border-orange-100 hover:border-orange-300 transition-colors group">
                  <div className="flex items-center gap-4 overflow-hidden">
                     <FiIcons.FiPhone className="text-orange-500 shrink-0" size={20} />
                     <span className="font-bold text-slate-800 truncate">{displayPhone}</span>
                  </div>
                  <div className="bg-orange-50 p-2 rounded-full shrink-0 group-hover:bg-orange-100 transition-colors"><FiIcons.FiArrowUpRight size={14} className="text-orange-600" /></div>
               </a>
            )}
            {email && (
               <a href={`mailto:${email}`} className="flex items-center justify-between bg-white p-5 rounded-[2rem] shadow-sm border border-orange-100 hover:border-orange-300 transition-colors group">
                  <div className="flex items-center gap-4 overflow-hidden">
                     <FiIcons.FiMail className="text-orange-500 shrink-0" size={20} />
                     <span className="font-bold text-slate-800 truncate">{email}</span>
                  </div>
                  <div className="bg-orange-50 p-2 rounded-full shrink-0 group-hover:bg-orange-100 transition-colors"><FiIcons.FiArrowUpRight size={14} className="text-orange-600" /></div>
               </a>
            )}
            {website && (
               <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-orange-500 text-white p-5 rounded-[2rem] shadow-md hover:bg-orange-600 transition-colors group">
                  <div className="flex items-center gap-4 overflow-hidden">
                     <FiIcons.FiHome className="text-white shrink-0" size={20} />
                     <span className="font-bold tracking-wide truncate">View Properties</span>
                  </div>
                  <FiIcons.FiArrowRight className="shrink-0 group-hover:translate-x-1 transition-transform" />
               </a>
            )}
            {finalAddress && (
               <div className="flex items-center gap-4 bg-white p-5 rounded-[2rem] shadow-sm border border-orange-100">
                  <FiIcons.FiMapPin className="text-orange-500 shrink-0" size={20} />
                  <span className="font-semibold text-sm text-slate-600 truncate">{finalAddress}</span>
               </div>
            )}
         </div>

         {/* Social Links */}
         <div className="flex flex-wrap justify-center gap-3 pt-6 border-t border-orange-200">
            {[ { icon: FiIcons.FiLinkedin, val: linkedin }, { icon: FiIcons.FiInstagram, val: instagram }, { icon: FiIcons.FiFacebook, val: facebook }, { icon: FiIcons.FiTwitter, val: twitter } ].map((social, idx) => social.val && (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full shadow-sm border border-orange-100 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:border-orange-300 transition-colors shrink-0">
                  <social.icon size={20} />
               </a>
            ))}
         </div>

         <div className="pt-4">
            <button onClick={() => downloadVCard(userData)} className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-bold text-[11px] uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-3 active:scale-[0.98]">
               <FiIcons.FiDownload size={18} /> Download Info
            </button>
         </div>
      </div>
    </div>
  );
};
export default HorizonLiving;
