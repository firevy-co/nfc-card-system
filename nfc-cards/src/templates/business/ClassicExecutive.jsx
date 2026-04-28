import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from "../common/StandardComponents";

const ClassicExecutive = ({ userData }) => {
  const { 
    displayName, email, role, mobileNumber, phone, 
    companyName, designation, website, address, city,
    linkedin, instagram, facebook, twitter, bio, avatar, logo 
  } = userData || {};

  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "Senior Executive";
  const finalAddress = address || city;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800 font-['Inter'] pb-16">
      {/* Formal Header */}
      <div className="bg-[#0f172a] text-white pt-16 pb-24 px-8 text-center relative shadow-xl">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')]" />
         <div className="relative z-10 flex flex-col items-center">
            {logo ? (
               <div className="bg-white p-4 rounded-lg shadow-lg mb-6 max-w-[120px]">
                  <img src={logo} alt="Company Logo" className="w-full h-auto object-contain" />
               </div>
            ) : null}
            <h1 className="text-3xl font-bold tracking-tight mb-2 font-serif">{displayName || 'Jonathan Sterling'}</h1>
            <p className="text-sm text-blue-300 font-medium tracking-wide uppercase">{displayRole}</p>
            {companyName && <p className="text-xs text-slate-400 mt-2 uppercase tracking-widest">{companyName}</p>}
         </div>
      </div>

      <div className="px-6 -mt-16 relative z-20 space-y-6 max-w-lg mx-auto">
         {/* Profile / Avatar Overlap */}
         <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-md -mt-16 mb-4 bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
               {avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" /> : <FiIcons.FiUser size={40} className="text-slate-400" />}
            </div>
            {bio ? (
               <div className="text-center">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Executive Summary</p>
                  <p className="text-sm text-slate-600 leading-relaxed">"{bio}"</p>
               </div>
            ) : (
               <p className="text-sm text-slate-400 italic">No summary provided.</p>
            )}
         </div>

         {/* Areas of Expertise */}
         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-100 pb-2">Core Competencies</h3>
            <div className="grid grid-cols-2 gap-4">
               {[
                  { title: "Strategic Planning", icon: FiIcons.FiTrendingUp },
                  { title: "Global Operations", icon: FiIcons.FiGlobe },
                  { title: "Corporate Finance", icon: FiIcons.FiPieChart },
                  { title: "Board Leadership", icon: FiIcons.FiUsers }
               ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                     <div className="text-blue-600 bg-blue-50 p-2 rounded-lg"><item.icon size={16} /></div>
                     <span className="text-xs font-semibold text-slate-700">{item.title}</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Corporate Contact Suite */}
         <div className="space-y-3">
            {displayPhone && (
               <a href={`tel:${displayPhone}`} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition-all group">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0"><FiIcons.FiPhoneCall /></div>
                  <div className="overflow-hidden">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Direct Line</p>
                     <p className="text-sm font-semibold text-slate-800">{displayPhone}</p>
                  </div>
               </a>
            )}
            {email && (
               <a href={`mailto:${email}`} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition-all group">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0"><FiIcons.FiMail /></div>
                  <div className="overflow-hidden">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Corporate Email</p>
                     <p className="text-sm font-semibold text-slate-800 truncate">{email}</p>
                  </div>
               </a>
            )}
            {website && (
               <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition-all group">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0"><FiIcons.FiGlobe /></div>
                  <div className="overflow-hidden">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enterprise Portal</p>
                     <p className="text-sm font-semibold text-slate-800 truncate">{website}</p>
                  </div>
               </a>
            )}
            {finalAddress && (
               <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 shrink-0"><FiIcons.FiBriefcase /></div>
                  <div className="overflow-hidden">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Headquarters</p>
                     <p className="text-sm font-semibold text-slate-800 leading-snug truncate">{finalAddress}</p>
                  </div>
               </div>
            )}
         </div>

         {/* Professional Network */}
         <div className="flex justify-center gap-4 py-2 border-t border-slate-200 pt-6">
            {[
               { icon: FiIcons.FiLinkedin, val: linkedin },
               { icon: FiIcons.FiTwitter, val: twitter },
               { icon: FiIcons.FiInstagram, val: instagram },
               { icon: FiIcons.FiFacebook, val: facebook }
            ].map((social, idx) => social.val && (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors p-2 bg-white rounded-full shadow-sm border border-slate-100">
                  <social.icon size={20} />
               </a>
            ))}
         </div>

         <button onClick={() => downloadVCard(userData)} className="w-full py-4 bg-[#0f172a] text-white rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2 mt-4 active:scale-[0.98]">
            <FiIcons.FiUserPlus size={16} /> Save to Contacts
         </button>
         
         <p className="text-center text-[9px] font-bold tracking-[0.5em] text-slate-300 uppercase mt-8 pb-4">Powered by Cardyn</p>
      </div>
    </div>
  );
};
export default ClassicExecutive;
