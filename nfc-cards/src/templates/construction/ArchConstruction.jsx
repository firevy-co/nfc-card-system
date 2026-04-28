import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const ArchConstruction = ({ userData }) => {
  const { 
    displayName, email, role, mobileNumber, phone, 
    companyName, designation, website, address, city,
    linkedin, instagram, facebook, twitter, bio, avatar, logo 
  } = userData || {};

  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "Chief Architect";
  const finalAddress = address || city;

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-slate-800 font-['Outfit'] pb-12">
      {/* Architectural Header */}
      <div className="relative h-64 bg-slate-900 overflow-hidden">
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
         <div className="absolute -bottom-16 left-8 right-8 bg-white p-6 rounded-t-3xl shadow-xl flex items-end gap-6">
            <div className="w-24 h-24 bg-slate-100 rounded-xl border-4 border-white shadow-lg shrink-0 overflow-hidden relative">
               {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-2" /> : avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-orange-500 text-white flex items-center justify-center text-3xl font-black uppercase">{(displayName || 'A')[0]}</div>}
            </div>
            <div className="pb-2">
               <h1 className="text-2xl font-black tracking-tight text-slate-900 leading-none mb-1">{displayName || 'Arch Design'}</h1>
               <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{displayRole}</p>
            </div>
         </div>
      </div>

      <div className="pt-24 px-6 space-y-6">
         {companyName && (
            <div className="bg-slate-900 text-white p-4 rounded-xl border-l-4 border-orange-500 shadow-sm">
               <p className="text-[9px] text-slate-400 uppercase tracking-widest mb-1">Affiliation</p>
               <p className="font-bold tracking-wide">{companyName}</p>
            </div>
         )}

         {bio && (
            <p className="text-sm text-slate-600 leading-relaxed font-medium bg-white p-6 rounded-2xl shadow-sm border border-slate-100">"{bio}"</p>
         )}

         {/* Project Milestones */}
         <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 pl-2">Project Methodology</h3>
            <div className="space-y-3">
               {[
                  { title: "Conceptual Design", icon: FiIcons.FiPenTool, desc: "Blueprint & Planning" },
                  { title: "Structural Engineering", icon: FiIcons.FiLayers, desc: "Framework Execution" },
                  { title: "Final Delivery", icon: FiIcons.FiCheckSquare, desc: "Inspection & Handover" }
               ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                     <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                        <item.icon size={20} />
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">{item.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Contact Hub */}
         <div className="grid grid-cols-2 gap-3">
            {displayPhone && (
               <a href={`tel:${displayPhone}`} className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-orange-500 transition-colors group">
                  <FiIcons.FiPhone size={20} className="text-slate-400 group-hover:text-orange-500 transition-colors" />
                  <span className="text-xs font-bold text-slate-700">{displayPhone}</span>
               </a>
            )}
            {email && (
               <a href={`mailto:${email}`} className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-orange-500 transition-colors group">
                  <FiIcons.FiMail size={20} className="text-slate-400 group-hover:text-orange-500 transition-colors" />
                  <span className="text-xs font-bold text-slate-700 truncate max-w-[120px]">Email Us</span>
               </a>
            )}
            {website && (
               <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="col-span-2 bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between hover:bg-slate-800 transition-colors">
                  <div className="flex items-center gap-3">
                     <FiIcons.FiGlobe className="text-orange-500" size={20} />
                     <span className="text-sm font-bold truncate">Project Portal</span>
                  </div>
                  <FiIcons.FiArrowRight className="text-slate-500" />
               </a>
            )}
            {finalAddress && (
               <div className="col-span-2 bg-orange-50 text-orange-900 p-5 rounded-2xl flex items-center gap-4">
                  <FiIcons.FiMapPin size={24} className="text-orange-500 shrink-0" />
                  <span className="text-sm font-bold leading-snug">{finalAddress}</span>
               </div>
            )}
         </div>

         <div className="flex justify-center gap-3 pt-4">
            {[
               { icon: FiIcons.FiLinkedin, val: linkedin },
               { icon: FiIcons.FiTwitter, val: twitter },
               { icon: FiIcons.FiInstagram, val: instagram },
               { icon: FiIcons.FiFacebook, val: facebook }
            ].map((social, idx) => social.val && (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-500 border border-slate-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all">
                  <social.icon size={18} />
               </a>
            ))}
         </div>

         <button onClick={() => downloadVCard(userData)} className="w-full bg-slate-900 text-white py-5 rounded-xl font-bold text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-orange-500 transition-colors mt-4 shadow-lg shadow-slate-900/20">
            <FiIcons.FiDownload size={16} /> Save Identity
         </button>
      </div>
      <p className="text-center text-[8px] font-black tracking-[0.8em] text-slate-400 uppercase mt-12 pb-4">Powered by Cardyn</p>
    </div>
  );
};
export default ArchConstruction;
