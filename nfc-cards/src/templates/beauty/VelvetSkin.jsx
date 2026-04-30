import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const VelvetSkin = ({ userData }) => {
  const { 
    displayName, email, role, mobileNumber, phone, 
    companyName, designation, website, address, city,
    linkedin, instagram, facebook, twitter, bio, avatar, logo 
  } = userData || {};

  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "Aesthetician";
  const finalAddress = address || city;

  return (
    <div className="w-full min-h-screen bg-[#111] font-['Mulish'] pb-12 relative overflow-x-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      {/* Hero Visual Block */}
      <div className="w-full pt-16 px-6 relative z-10 flex flex-col items-center">
         <div className="w-32 h-32 rounded-full border-2 border-rose-500/30 p-1 mb-6 shadow-[0_0_40px_rgba(244,63,94,0.2)]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
               {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-4" /> : avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-4xl font-light text-rose-500 uppercase">{(displayName || 'V')[0]}</span>}
            </div>
         </div>
         <h1 className="text-4xl font-light text-white tracking-[0.2em] uppercase text-center mb-2">{displayName || 'Velvet Skin'}</h1>
         <div className="h-px w-24 bg-gradient-to-r from-transparent via-rose-500 to-transparent mb-4" />
         <p className="text-[10px] font-bold text-rose-400 tracking-[0.3em] uppercase text-center mb-2">{displayRole}</p>
         {companyName && <p className="text-xs font-light text-white/50 tracking-widest uppercase text-center">{companyName}</p>}
      </div>

      <div className="px-6 mt-10 space-y-8 relative z-10">
         {/* Introduction Block */}
         {bio && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8">
               <FiIcons.FiStar className="text-rose-500 mb-4" size={24} />
               <p className="text-sm text-white/70 leading-relaxed font-light">"{bio}"</p>
            </div>
         )}

         {/* Premium Memberships / Services */}
         <div>
            <h3 className="text-[9px] font-bold text-white/40 tracking-[0.4em] uppercase mb-4 pl-2">Exclusive Treatments</h3>
            <div className="grid grid-cols-1 gap-3">
               {[
                  { title: "24k Gold Facial", price: "$250", desc: "Ultimate luxury and skin rejuvenation." },
                  { title: "Velvet Laser", price: "$180", desc: "Painless, permanent, perfect." }
               ].map((item, i) => (
                  <div key={i} className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-6 rounded-[2rem] flex justify-between items-center group hover:border-rose-500/50 transition-colors">
                     <div>
                        <h4 className="text-white font-medium text-lg tracking-wide">{item.title}</h4>
                        <p className="text-xs text-white/50 mt-1">{item.desc}</p>
                     </div>
                     <span className="text-rose-400 font-light text-xl tracking-wider">{item.price}</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Contact Grid */}
         <div className="grid grid-cols-2 gap-3">
            {displayPhone && (
               <a href={`tel:${displayPhone}`} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex flex-col items-center justify-center gap-3 hover:bg-rose-500/20 hover:border-rose-500/50 transition-all text-white">
                  <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500"><FiIcons.FiPhone size={20} /></div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-center">{displayPhone}</span>
               </a>
            )}
            {email && (
               <a href={`mailto:${email}`} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex flex-col items-center justify-center gap-3 hover:bg-rose-500/20 hover:border-rose-500/50 transition-all text-white">
                  <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500"><FiIcons.FiMail size={20} /></div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-center truncate max-w-full">Bookings</span>
               </a>
            )}
            {website && (
               <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="col-span-2 bg-white/5 border border-white/10 p-5 rounded-[2rem] flex items-center justify-between hover:bg-rose-500/20 transition-all group">
                  <div className="flex items-center gap-4 overflow-hidden">
                     <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500 shrink-0"><FiIcons.FiGlobe /></div>
                     <span className="text-xs font-bold text-white uppercase tracking-[0.2em] truncate">{website}</span>
                  </div>
                  <FiIcons.FiArrowRight className="text-white/30 group-hover:text-rose-500 transition-colors shrink-0" />
               </a>
            )}
            {finalAddress && (
               <div className="col-span-2 bg-white/5 border border-white/10 p-6 rounded-[2rem] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500 shrink-0"><FiIcons.FiMapPin /></div>
                  <div className="overflow-hidden">
                     <p className="text-[9px] font-bold text-white/40 tracking-[0.3em] uppercase mb-1">VIP Location</p>
                     <p className="text-sm text-white/90 leading-relaxed font-light truncate">{finalAddress}</p>
                  </div>
               </div>
            )}
         </div>

         {/* Social Links */}
         <div className="flex justify-center gap-4 pt-4">
            {[
               { icon: FiIcons.FiInstagram, val: instagram },
               { icon: FiIcons.FiFacebook, val: facebook },
               { icon: FiIcons.FiTwitter, val: twitter },
               { icon: FiIcons.FiLinkedin, val: linkedin }
            ].map((social, idx) => social.val && (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-rose-500 hover:border-rose-500 hover:text-white transition-all">
                  <social.icon size={20} />
               </a>
            ))}
         </div>

         <button onClick={() => downloadVCard(userData)} className="w-full py-6 bg-gradient-to-r from-rose-600 to-rose-400 text-white rounded-[2rem] font-bold text-[11px] uppercase tracking-[0.4em] shadow-[0_10px_30px_rgba(244,63,94,0.3)] hover:shadow-[0_15px_40px_rgba(244,63,94,0.4)] transition-all flex items-center justify-center gap-3 mt-4">
            <FiIcons.FiCreditCard size={18} /> Acquire Identity
         </button>

         <PoweredBy />
      </div>
    </div>
  );
};
export default VelvetSkin;
