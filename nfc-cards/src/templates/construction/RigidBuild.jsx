import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const RigidBuild = ({ userData }) => {
  const { 
    displayName, email, role, mobileNumber, phone, 
    companyName, designation, website, address, city,
    linkedin, instagram, facebook, twitter, bio, avatar, logo 
  } = userData || {};

  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "Structural Engineer";
  const finalAddress = address || city;

  return (
    <div className="min-h-screen bg-slate-100 font-['Outfit'] text-slate-800 pb-12">
      {/* Header Banner */}
      <div className="bg-[#1e293b] text-white p-8 pt-16 flex flex-col items-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
         
         <div className="w-28 h-28 bg-slate-800 border-4 border-cyan-500 mb-6 flex items-center justify-center relative z-10 overflow-hidden shadow-2xl">
            {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-2 bg-white" /> : avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-4xl font-black text-cyan-500 uppercase">{(displayName || 'R')[0]}</span>}
         </div>
         
         <h1 className="text-3xl font-black uppercase tracking-wider relative z-10 text-center">{displayName || 'Rigid Build'}</h1>
         <div className="w-12 h-1 bg-cyan-500 my-4 relative z-10" />
         <p className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em] relative z-10 text-center">{displayRole}</p>
         {companyName && <p className="text-sm font-medium text-slate-300 uppercase tracking-widest mt-2 relative z-10 text-center">{companyName}</p>}
      </div>

      <div className="px-6 mt-8 space-y-8">
         {bio && (
            <div className="border-l-4 border-cyan-500 pl-4 py-2">
               <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"{bio}"</p>
            </div>
         )}

         {/* Core Capabilities Timeline */}
         <div>
            <div className="flex items-center gap-3 mb-6">
               <FiIcons.FiCpu className="text-cyan-600" size={24} />
               <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Core Capabilities</h3>
            </div>
            
            <div className="relative border-l-2 border-slate-300 ml-3 space-y-6 pb-4">
               {[
                  { title: "Structural Integrity", desc: "Advanced Frameworks", icon: FiIcons.FiAnchor },
                  { title: "Material Sourcing", desc: "Industrial Grade", icon: FiIcons.FiLayers },
                  { title: "Site Supervision", desc: "Quality Assurance", icon: FiIcons.FiEye }
               ].map((item, i) => (
                  <div key={i} className="relative pl-6">
                     <div className="absolute -left-[17px] top-0 w-8 h-8 bg-slate-100 border-2 border-cyan-500 rounded-full flex items-center justify-center text-cyan-600">
                        <item.icon size={12} />
                     </div>
                     <div className="bg-white p-4 border border-slate-200 shadow-sm ml-4 rounded-r-xl">
                        <h4 className="text-sm font-bold text-slate-800 uppercase">{item.title}</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{item.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Communication Grid */}
         <div className="grid grid-cols-1 gap-3">
            {displayPhone && (
               <a href={`tel:${displayPhone}`} className="flex items-center justify-between bg-white p-5 border border-slate-200 hover:border-cyan-500 transition-colors group rounded-xl">
                  <div className="flex items-center gap-4">
                     <div className="bg-cyan-50 p-3 text-cyan-600 rounded-lg"><FiIcons.FiPhone size={18} /></div>
                     <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Office Line</p>
                        <p className="text-sm font-bold text-slate-800">{displayPhone}</p>
                     </div>
                  </div>
                  <FiIcons.FiArrowRight className="text-slate-300 group-hover:text-cyan-500" />
               </a>
            )}
            {email && (
               <a href={`mailto:${email}`} className="flex items-center justify-between bg-white p-5 border border-slate-200 hover:border-cyan-500 transition-colors group rounded-xl">
                  <div className="flex items-center gap-4 overflow-hidden">
                     <div className="bg-cyan-50 p-3 text-cyan-600 rounded-lg shrink-0"><FiIcons.FiMail size={18} /></div>
                     <div className="overflow-hidden">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Digital Mail</p>
                        <p className="text-sm font-bold text-slate-800 truncate">{email}</p>
                     </div>
                  </div>
                  <FiIcons.FiArrowRight className="text-slate-300 group-hover:text-cyan-500 shrink-0" />
               </a>
            )}
            {finalAddress && (
               <div className="flex items-center gap-4 bg-white p-5 border border-slate-200 rounded-xl">
                  <div className="bg-cyan-50 p-3 text-cyan-600 shrink-0 rounded-lg"><FiIcons.FiMapPin size={18} /></div>
                  <div className="overflow-hidden">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Base Operations</p>
                     <p className="text-xs font-bold text-slate-800 mt-1 truncate">{finalAddress}</p>
                  </div>
               </div>
            )}
            {website && (
               <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-[#1e293b] text-white p-5 rounded-xl hover:bg-slate-800 transition-colors gap-3 group">
                  <FiIcons.FiGlobe size={18} className="text-cyan-400 group-hover:animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest">View Master Plan</span>
               </a>
            )}
         </div>

         {/* Social Nodes */}
         <div className="flex flex-wrap justify-center gap-3 py-4 border-t border-slate-200">
            {[
               { icon: FiIcons.FiLinkedin, val: linkedin },
               { icon: FiIcons.FiTwitter, val: twitter },
               { icon: FiIcons.FiInstagram, val: instagram },
               { icon: FiIcons.FiFacebook, val: facebook }
            ].map((social, idx) => social.val && (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-colors rounded-xl">
                  <social.icon size={18} />
               </a>
            ))}
         </div>

         <button onClick={() => downloadVCard(userData)} className="w-full py-5 bg-cyan-600 text-white font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-600/20 rounded-xl active:scale-[0.98]">
            <FiIcons.FiHardDrive size={18} /> Sync Credentials
         </button>

         <p className="text-center text-[8px] font-black tracking-[0.5em] text-slate-400 uppercase pt-4">Powered by Cardyn</p>
      </div>
    </div>
  );
};
export default RigidBuild;
