import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const VelocityElite = ({ userData }) => {
  const { displayName, email, role, mobileNumber, phone, companyName, designation, website, address, city, linkedin, instagram, facebook, twitter, bio, avatar, logo } = userData || {};
  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "Dealership Manager";
  const finalAddress = address || city;

  return (
    <div className="min-h-screen bg-slate-100 font-['Inter'] pb-12 overflow-x-hidden">
      {/* Crisp Header */}
      <div className="bg-slate-900 text-white p-8 pt-16 flex flex-col items-center relative text-center">
         <div className="absolute top-0 w-full h-1 bg-blue-500" />
         <div className="w-24 h-24 bg-white rounded-full p-1 mb-6 shadow-xl shrink-0">
            <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
               {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-2" /> : avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-3xl font-black text-slate-400 uppercase">{(displayName || 'V')[0]}</span>}
            </div>
         </div>
         <h1 className="text-3xl font-bold tracking-tight px-2">{displayName || 'Velocity Elite'}</h1>
         <p className="text-blue-400 font-semibold uppercase tracking-widest text-xs mt-2 px-2">{displayRole}</p>
         {companyName && <p className="text-slate-400 font-medium tracking-wide text-sm mt-1 px-2">{companyName}</p>}
      </div>

      <div className="px-6 mt-8 space-y-6 max-w-md mx-auto">
         {bio && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
               <p className="text-sm text-slate-600 leading-relaxed text-center">"{bio}"</p>
            </div>
         )}

         {/* Dealership Services */}
         <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center gap-2 text-center">
               <FiIcons.FiTool className="text-slate-400" size={24} />
               <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Service Center</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center gap-2 text-center">
               <FiIcons.FiDollarSign className="text-slate-400" size={24} />
               <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Financing</span>
            </div>
         </div>

         {/* Contact List */}
         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {displayPhone && (
               <a href={`tel:${displayPhone}`} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors border-b border-slate-100">
                  <div className="bg-blue-50 text-blue-600 p-2 rounded-lg shrink-0"><FiIcons.FiPhone size={18} /></div>
                  <div className="overflow-hidden">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sales Line</p>
                     <p className="text-sm font-bold text-slate-800 truncate">{displayPhone}</p>
                  </div>
               </a>
            )}
            {email && (
               <a href={`mailto:${email}`} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors border-b border-slate-100">
                  <div className="bg-blue-50 text-blue-600 p-2 rounded-lg shrink-0"><FiIcons.FiMail size={18} /></div>
                  <div className="overflow-hidden">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inquiries</p>
                     <p className="text-sm font-bold text-slate-800 truncate">{email}</p>
                  </div>
               </a>
            )}
            {finalAddress && (
               <div className="flex items-center gap-4 p-4">
                  <div className="bg-blue-50 text-blue-600 p-2 rounded-lg shrink-0"><FiIcons.FiMapPin size={18} /></div>
                  <div className="overflow-hidden">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</p>
                     <p className="text-sm font-bold text-slate-800 truncate">{finalAddress}</p>
                  </div>
               </div>
            )}
         </div>

         {website && (
            <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="w-full bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between hover:bg-slate-800 transition-colors shadow-lg group">
               <span className="font-bold text-sm tracking-wide truncate">Browse Inventory</span>
               <FiIcons.FiArrowRight className="shrink-0 group-hover:translate-x-1 transition-transform" />
            </a>
         )}

         <div className="flex flex-wrap justify-center gap-4 pt-4">
            {[ { icon: FiIcons.FiLinkedin, val: linkedin }, { icon: FiIcons.FiInstagram, val: instagram }, { icon: FiIcons.FiFacebook, val: facebook }, { icon: FiIcons.FiTwitter, val: twitter } ].map((social, idx) => social.val && (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white shadow-sm border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-blue-600 transition-colors shrink-0">
                  <social.icon size={18} />
               </a>
            ))}
         </div>

         <button onClick={() => downloadVCard(userData)} className="w-full py-5 bg-blue-600 text-white rounded-xl font-bold text-[11px] uppercase tracking-[0.2em] shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mt-4 active:scale-[0.98]">
            <FiIcons.FiDownload size={16} /> Save Contact Details
         </button>
         <PoweredBy />
      </div>
    </div>
  );
};
export default VelocityElite;
