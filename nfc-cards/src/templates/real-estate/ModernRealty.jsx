import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const ModernRealty = ({ userData }) => {
  const { displayName, email, role, mobileNumber, phone, companyName, designation, website, address, city, linkedin, instagram, facebook, twitter, bio, avatar, logo } = userData || {};
  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "Real Estate Agent";
  const finalAddress = address || city;

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter'] pb-12 overflow-x-hidden">
      <div className="bg-emerald-700 text-white p-8 pt-16 rounded-b-[2rem] shadow-lg text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-emerald-800/50" style={{ backgroundImage: 'linear-gradient(45deg, transparent 20%, rgba(255,255,255,0.05) 25%, transparent 30%)', backgroundSize: '10px 10px' }} />
         
         <div className="flex justify-center mb-6 relative z-10">
            <div className="w-28 h-28 bg-white rounded-full p-1 shadow-xl shrink-0">
               <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                  {avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" /> : logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-3" /> : <FiIcons.FiHome size={36} className="text-emerald-700" />}
               </div>
            </div>
         </div>
         <h1 className="text-3xl font-bold tracking-tight relative z-10 px-2 truncate">{displayName || 'Modern Realty'}</h1>
         <p className="text-emerald-200 font-medium tracking-widest text-xs mt-2 uppercase relative z-10 px-2 truncate">{displayRole}</p>
         {companyName && <p className="text-sm font-semibold mt-3 bg-black/20 inline-block px-4 py-1.5 rounded-full relative z-10 px-2 truncate max-w-full">{companyName}</p>}
      </div>

      <div className="px-6 mt-8 space-y-6 max-w-md mx-auto">
         {bio && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
               <FiIcons.FiHeart className="mx-auto text-emerald-500 mb-3" size={24} />
               <p className="text-sm text-slate-600 leading-relaxed">"{bio}"</p>
            </div>
         )}

         {/* Property Highlights */}
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
               <span className="text-2xl font-black text-emerald-700">12+</span>
               <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">Active Listings</span>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
               <span className="text-2xl font-black text-emerald-700">50+</span>
               <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-1">Homes Sold</span>
            </div>
         </div>

         {/* Direct Contact */}
         <div className="space-y-3">
            {displayPhone && (
               <a href={`tel:${displayPhone}`} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-500 transition-colors">
                  <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl shrink-0"><FiIcons.FiPhone size={18} /></div>
                  <div className="overflow-hidden">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Call Me</p>
                     <p className="text-sm font-bold text-slate-800 truncate">{displayPhone}</p>
                  </div>
               </a>
            )}
            {email && (
               <a href={`mailto:${email}`} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-500 transition-colors">
                  <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl shrink-0"><FiIcons.FiMail size={18} /></div>
                  <div className="overflow-hidden">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Me</p>
                     <p className="text-sm font-bold text-slate-800 truncate">{email}</p>
                  </div>
               </a>
            )}
            {finalAddress && (
               <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                  <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl shrink-0"><FiIcons.FiMapPin size={18} /></div>
                  <div className="overflow-hidden">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Office</p>
                     <p className="text-sm font-bold text-slate-800 truncate">{finalAddress}</p>
                  </div>
               </div>
            )}
         </div>

         {website && (
            <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="w-full bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between hover:bg-slate-800 transition-colors shadow-lg group">
               <div className="flex items-center gap-3 overflow-hidden">
                  <FiIcons.FiSearch size={20} className="text-emerald-400 shrink-0" />
                  <span className="font-bold text-sm tracking-wide truncate">Search Properties</span>
               </div>
               <FiIcons.FiArrowRight className="group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
            </a>
         )}

         {/* Social Network */}
         <div className="flex flex-wrap justify-center gap-4 pt-4">
            {[ { icon: FiIcons.FiLinkedin, val: linkedin }, { icon: FiIcons.FiInstagram, val: instagram }, { icon: FiIcons.FiFacebook, val: facebook }, { icon: FiIcons.FiTwitter, val: twitter } ].map((social, idx) => social.val && (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-600 transition-colors bg-white p-3 rounded-xl shadow-sm border border-slate-200 shrink-0">
                  <social.icon size={20} />
               </a>
            ))}
         </div>

         <button onClick={() => downloadVCard(userData)} className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] shadow-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 mt-4 active:scale-[0.98]">
            <FiIcons.FiDownload size={16} /> Save Contact
         </button>
      </div>
    </div>
  );
};
export default ModernRealty;
