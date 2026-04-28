import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from "../common/StandardComponents";

const PureAura = ({ userData }) => {
  const { 
    displayName, email, role, mobileNumber, phone, 
    companyName, designation, website, address, city,
    linkedin, instagram, facebook, twitter, bio, avatar, logo 
  } = userData || {};

  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "Wellness Specialist";
  const finalAddress = address || city;

  return (
    <div className="w-full min-h-screen bg-[#fcfcf7] font-['Outfit'] pb-16">
      {/* Header Profile */}
      <div className="pt-16 pb-10 flex flex-col items-center px-8 border-b border-[#f0f0e5]">
         <div className="w-32 h-32 rounded-full bg-white shadow-xl shadow-slate-200/50 mb-8 p-2 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full rounded-full bg-[#f4f4f0] flex items-center justify-center overflow-hidden relative">
               {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-2" /> : avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" /> : <FiIcons.FiWind size={40} className="text-slate-300" />}
            </div>
         </div>
         <h1 className="text-4xl font-black text-slate-900 tracking-tight text-center mb-2">{displayName || 'Pure Aura'}</h1>
         <p className="text-xs font-bold text-rose-400 uppercase tracking-widest text-center">{displayRole}</p>
         {companyName && <p className="text-xs font-semibold text-slate-500 mt-3 border border-slate-200 px-4 py-1 rounded-full">{companyName}</p>}
      </div>

      <div className="px-8 mt-10 space-y-10">
         
         {/* Philosophy / Bio */}
         {bio && (
            <div className="text-center">
               <FiIcons.FiFeather className="mx-auto text-rose-300 mb-4" size={24} />
               <p className="text-[13px] text-slate-600 leading-relaxed italic font-light">"{bio}"</p>
            </div>
         )}

         {/* Services / Offerings Layout */}
         <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 text-center">Holistic Offerings</h3>
            <div className="space-y-4">
               {[
                  { title: "Deep Relaxation", duration: "60 Min", icon: FiIcons.FiMoon },
                  { title: "Aura Cleansing", duration: "45 Min", icon: FiIcons.FiSun },
                  { title: "Energy Healing", duration: "90 Min", icon: FiIcons.FiActivity }
               ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-white p-5 rounded-[2rem] border border-[#f0f0e5] shadow-sm">
                     <div className="flex items-center gap-4">
                        <div className="bg-rose-50 p-3 rounded-full text-rose-400"><item.icon size={18} /></div>
                        <span className="font-bold text-slate-700 text-sm">{item.title}</span>
                     </div>
                     <span className="text-[10px] font-bold text-slate-400 uppercase">{item.duration}</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Contact Links List */}
         <div className="bg-white rounded-[2.5rem] p-6 border border-[#f0f0e5] shadow-lg shadow-slate-200/20 space-y-2">
            {[
               { val: displayPhone, href: displayPhone ? `tel:${displayPhone}` : null, label: "Call Us", icon: FiIcons.FiPhone },
               { val: email, href: email ? `mailto:${email}` : null, label: "Email", icon: FiIcons.FiMail },
               { val: website, href: website?.startsWith('http') ? website : `https://${website}`, label: "Visit Portal", icon: FiIcons.FiGlobe },
               { val: finalAddress, href: null, label: "Location", icon: FiIcons.FiMapPin }
            ].map((link, idx) => link.val && (
               <div key={idx}>
                  <a href={link.href} target={link.href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={`flex items-center justify-between p-4 rounded-2xl transition-colors group ${link.href ? 'hover:bg-slate-50 cursor-pointer' : 'cursor-default'}`}>
                     <div className="flex items-center gap-4 text-slate-700 group-hover:text-rose-400 transition-colors">
                        <link.icon size={18} className="shrink-0" />
                        <span className="font-semibold text-sm truncate max-w-[150px]">{link.val}</span>
                     </div>
                     {link.href && <FiIcons.FiArrowRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-transform" />}
                  </a>
                  {idx !== 3 && <div className="h-px bg-slate-100 mx-4" />}
               </div>
            ))}
         </div>

         {/* Social Network */}
         <div className="flex justify-center gap-6">
            {[
               { icon: FiIcons.FiInstagram, val: instagram },
               { icon: FiIcons.FiFacebook, val: facebook },
               { icon: FiIcons.FiLinkedin, val: linkedin },
               { icon: FiIcons.FiTwitter, val: twitter }
            ].map((social, idx) => social.val && (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-rose-400 transition-all hover:-translate-y-1">
                  <social.icon size={24} />
               </a>
            ))}
         </div>

         <button onClick={() => downloadVCard(userData)} className="w-full py-5 bg-slate-900 text-white rounded-[2.5rem] font-bold text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-3">
            <FiIcons.FiPlus size={16} /> Add to Device
         </button>

         <p className="text-center text-[8px] font-black tracking-[0.8em] text-slate-300 uppercase mt-12">Powered by Cardyn</p>
      </div>
    </div>
  );
};
export default PureAura;
