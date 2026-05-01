import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";
import { FaQuoteLeft } from 'react-icons/fa';

const ModernLeader = ({ userData }) => {
  const { 
    displayName, email, role, mobileNumber, phone, 
    companyName, designation, website, address, city,
    linkedin, instagram, facebook, twitter, bio, avatar, logo, tags
  } = userData || {};

  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role;
  const finalAddress = address || city;

  return (
    <div className="w-full min-h-screen bg-slate-800 text-slate-100 font-['Outfit'] pb-12 relative overflow-x-hidden">
      
      {/* Elegance Header */}
      <div className="bg-slate-900 pt-16 pb-32 px-8 rounded-b-[4rem] text-center shadow-xl relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
         
         <div className="flex justify-center mb-6 relative z-10">
            <div className="w-32 h-32 rounded-full bg-slate-800 p-1 border border-slate-700 shadow-2xl shrink-0">
               <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                  {avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" /> : logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-4 bg-white" /> : <FiIcons.FiAward size={48} className="text-blue-400" />}
               </div>
            </div>
         </div>

         <h1 className="text-3xl font-bold tracking-tight text-white mb-2 relative z-10 px-2">{displayName}</h1>
         <div className="flex items-center justify-center gap-2 text-blue-400 font-semibold text-xs tracking-widest uppercase relative z-10 flex-wrap px-2">
            <FiIcons.FiShield fill="currentColor" size={14} className="text-blue-500 shrink-0" />
            <span className="text-center">{displayRole}</span>
         </div>
         {companyName && <p className="text-sm text-slate-400 mt-4 tracking-wide font-medium relative z-10 px-2">{companyName}</p>}
      </div>

      <div className="px-6 -mt-20 relative z-20 space-y-6">
         
         {/* Bio & Credibility */}
         {bio && (
            <div className="bg-white text-slate-800 p-8 rounded-3xl shadow-xl shadow-black/20 text-center">
               <FaQuoteLeft className="mx-auto text-blue-300 mb-4" size={28} />
               <p className="text-sm leading-relaxed font-medium">"{bio}"</p>
            </div>
         )}

         {/* Awards / Certifications - Only shown if tags exist */}
         {tags && tags.length > 0 && (
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 pt-2 px-2 snap-x">
               {tags.map((tag, i) => (
                  <div key={i} className="min-w-[150px] bg-slate-700/50 border border-slate-600 rounded-2xl p-4 flex items-center gap-3 shrink-0 backdrop-blur-sm snap-center">
                     <div className="bg-blue-500/20 text-blue-400 p-2 rounded-lg shrink-0"><FiIcons.FiAward size={16} /></div>
                     <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">{tag}</span>
                  </div>
               ))}
            </div>
         )}

         {/* Contacts List */}
         <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-lg space-y-2">
            {[
               { val: displayPhone, href: displayPhone ? `tel:${displayPhone}` : null, icon: FiIcons.FiPhone, label: "Direct Consult" },
               { val: email, href: email ? `mailto:${email}` : null, icon: FiIcons.FiMail, label: "Speaking Inquiries" },
               { val: website, href: website?.startsWith('http') ? website : `https://${website}`, icon: FiIcons.FiLink, label: "Publications" },
               { val: finalAddress, href: null, icon: FiIcons.FiMapPin, label: "Primary Office" }
            ].map((link, idx) => link.val && (
               <div key={idx}>
                  <a href={link.href} target={link.href?.startsWith('http') ? '_blank' : undefined} className={`flex items-center justify-between p-4 rounded-xl transition-colors ${link.href ? 'hover:bg-slate-800 group cursor-pointer' : 'cursor-default'}`}>
                     <div className="flex items-center gap-4 overflow-hidden">
                        <link.icon size={20} className="text-blue-400 shrink-0" />
                        <div className="overflow-hidden">
                           <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 truncate">{link.label}</p>
                           <p className="text-sm font-semibold text-slate-200 truncate mt-1">{link.val}</p>
                        </div>
                     </div>
                     {link.href && <FiIcons.FiArrowRight size={16} className="text-slate-600 group-hover:text-blue-400 transition-colors shrink-0 ml-2" />}
                  </a>
                  {idx !== 3 && <div className="h-px bg-slate-800 mx-4" />}
               </div>
            ))}
         </div>

         {/* Social Links */}
         <div className="flex flex-wrap justify-center gap-4 py-4">
            {[
               { icon: FiIcons.FiLinkedin, val: linkedin },
               { icon: FiIcons.FiTwitter, val: twitter },
               { icon: FiIcons.FiInstagram, val: instagram },
               { icon: FiIcons.FiFacebook, val: facebook }
            ].map((social, idx) => social.val && (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-transform hover:scale-110 shrink-0 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <social.icon size={20} />
               </a>
            ))}
         </div>

         <button onClick={() => downloadVCard(userData)} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-colors flex items-center justify-center gap-3 active:scale-[0.98]">
            <FiIcons.FiDownload size={18} /> Download Profile
         </button>

         <PoweredBy />
      </div>
      <style dangerouslySetInnerHTML={{__html: `.hide-scrollbar::-webkit-scrollbar { display: none; }`}} />
    </div>
  );
};
export default ModernLeader;
