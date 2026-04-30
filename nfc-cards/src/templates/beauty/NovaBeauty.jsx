import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const NovaBeauty = ({ userData }) => {
  const { 
    displayName, email, role, mobileNumber, phone, 
    companyName, designation, website, address, city,
    linkedin, instagram, facebook, twitter, bio, avatar, logo 
  } = userData || {};

  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "Beauty Architect";
  const finalAddress = address || city;

  return (
    <div className="w-full bg-slate-100 font-['Inter'] p-4 min-h-screen pb-12">
      <div className="grid grid-cols-2 gap-4">
         
         {/* Main Identity Box */}
         <div className="col-span-2 bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rotate-45 transform translate-x-12 -translate-y-12" />
            <div className="flex justify-between items-start mb-12">
               <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                  {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-2" /> : avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-2xl font-black text-slate-900">{(displayName || 'N')[0]}</span>}
               </div>
               <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center shrink-0">
                  <FiIcons.FiZap fill="white" />
               </div>
            </div>
            <h1 className="text-3xl font-black tracking-tighter uppercase leading-none mb-2">{displayName || 'Nova Beauty'}</h1>
            <p className="text-[10px] font-black tracking-widest text-rose-400 uppercase">{displayRole}</p>
            {companyName && <p className="text-sm font-bold text-white/60 mt-2">{companyName}</p>}
         </div>

         {/* Bio / Quote Bento */}
         {bio && (
            <div className="col-span-2 bg-white rounded-[2rem] p-6 border-4 border-slate-900 flex items-center gap-4">
               <FiIcons.FiMessageSquare size={32} className="text-rose-500 shrink-0" />
               <p className="text-xs font-bold text-slate-700 leading-relaxed uppercase">{bio}</p>
            </div>
         )}

         {/* Call Action */}
         <a href={`tel:${displayPhone}`} className={`col-span-1 rounded-[2rem] p-6 flex flex-col justify-between aspect-square transition-all ${displayPhone ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
            <FiIcons.FiPhone size={24} />
            <div>
               <p className="text-[9px] font-black uppercase tracking-widest opacity-80">Direct Line</p>
               <p className="text-sm font-bold truncate mt-1">{displayPhone || 'N/A'}</p>
            </div>
         </a>

         {/* Email Action */}
         <a href={`mailto:${email}`} className={`col-span-1 rounded-[2rem] p-6 flex flex-col justify-between aspect-square transition-all ${email ? 'bg-white border-4 border-slate-900 text-slate-900 hover:bg-slate-50' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
            <FiIcons.FiMail size={24} />
            <div>
               <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Cloud Signal</p>
               <p className="text-sm font-bold truncate mt-1">{email || 'N/A'}</p>
            </div>
         </a>

         {/* Location */}
         {finalAddress && (
            <div className="col-span-2 bg-slate-900 text-white rounded-[2rem] p-6 flex items-center justify-between">
               <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-rose-400">Headquarters</p>
                  <p className="text-sm font-bold mt-1 max-w-[200px] truncate">{finalAddress}</p>
               </div>
               <FiIcons.FiMapPin size={24} className="opacity-50 shrink-0" />
            </div>
         )}

         {/* Website */}
         {website && (
            <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="col-span-2 bg-white rounded-[2rem] p-6 border-4 border-slate-900 flex items-center justify-between group hover:bg-slate-900 hover:text-white transition-colors">
               <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover:text-rose-400">Digital Portal</p>
                  <p className="text-sm font-bold mt-1 max-w-[200px] truncate">{website}</p>
               </div>
               <FiIcons.FiGlobe size={24} className="group-hover:animate-pulse shrink-0" />
            </a>
         )}

         {/* Social Grid */}
         <div className="col-span-2 grid grid-cols-4 gap-4">
            {[
               { icon: FiIcons.FiInstagram, val: instagram },
               { icon: FiIcons.FiTwitter, val: twitter },
               { icon: FiIcons.FiLinkedin, val: linkedin },
               { icon: FiIcons.FiFacebook, val: facebook }
            ].map((social, idx) => social.val ? (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="bg-white border-4 border-slate-900 text-slate-900 flex items-center justify-center aspect-square rounded-[1.5rem] hover:bg-rose-500 hover:border-rose-500 hover:text-white transition-all">
                  <social.icon size={24} />
               </a>
            ) : (
               <div key={idx} className="bg-slate-200 border-4 border-slate-300 text-slate-400 flex items-center justify-center aspect-square rounded-[1.5rem]">
                  <social.icon size={24} />
               </div>
            ))}
         </div>

         <button onClick={() => downloadVCard(userData)} className="col-span-2 bg-slate-900 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] flex justify-center items-center gap-3 active:scale-95 transition-transform mt-4">
            <FiIcons.FiDownloadCloud size={20} /> Sync Node
         </button>
      </div>

       <PoweredBy />
    </div>
  );
};
export default NovaBeauty;
