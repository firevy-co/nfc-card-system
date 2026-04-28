import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from "../common/StandardComponents";

const AeroMotors = ({ userData }) => {
  const { displayName, email, role, mobileNumber, phone, companyName, designation, website, address, city, linkedin, instagram, facebook, twitter, bio, avatar, logo } = userData || {};
  const displayPhone = mobileNumber || phone;
  const displayRole = designation || role || "EV Specialist";
  const finalAddress = address || city;

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800 font-['Inter'] pb-12 overflow-x-hidden">
      <div className="bg-indigo-600 text-white p-8 pt-16 rounded-b-[3rem] shadow-xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
         
         <div className="flex justify-between items-center relative z-10">
            <div className="overflow-hidden pr-4">
               <h1 className="text-3xl font-bold tracking-tight truncate">{displayName || 'Aero Motors'}</h1>
               <p className="text-indigo-200 font-medium uppercase tracking-widest text-xs mt-1 truncate">{displayRole}</p>
            </div>
            <div className="w-16 h-16 bg-white rounded-2xl p-1 shadow-lg shrink-0">
               <div className="w-full h-full rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                  {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-1" /> : avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-2xl font-bold text-indigo-600 uppercase">{(displayName || 'A')[0]}</span>}
               </div>
            </div>
         </div>
         {companyName && <p className="mt-6 text-sm font-semibold bg-white/20 inline-block px-4 py-1.5 rounded-full relative z-10 truncate max-w-full">{companyName}</p>}
      </div>

      <div className="px-6 -mt-6 relative z-20 space-y-4">
         {/* EV Stats Mockup */}
         <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex justify-around text-center">
            <div>
               <FiIcons.FiBatteryCharging className="mx-auto text-indigo-500 mb-2" size={24} />
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Network</p>
            </div>
            <div className="w-px bg-slate-100" />
            <div>
               <FiIcons.FiWind className="mx-auto text-indigo-500 mb-2" size={24} />
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Efficiency</p>
            </div>
         </div>

         {bio && (
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
               <p className="text-sm text-slate-600 leading-relaxed font-medium">"{bio}"</p>
            </div>
         )}

         {/* Connection Module */}
         <div className="grid gap-3">
            {displayPhone && (
               <a href={`tel:${displayPhone}`} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:border-indigo-500 transition-colors">
                  <div className="bg-indigo-50 text-indigo-600 p-3 rounded-2xl shrink-0"><FiIcons.FiPhone size={20} /></div>
                  <div className="overflow-hidden">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Direct Line</p>
                     <p className="text-sm font-bold text-slate-800 truncate">{displayPhone}</p>
                  </div>
               </a>
            )}
            {email && (
               <a href={`mailto:${email}`} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:border-indigo-500 transition-colors">
                  <div className="bg-indigo-50 text-indigo-600 p-3 rounded-2xl shrink-0"><FiIcons.FiMail size={20} /></div>
                  <div className="overflow-hidden">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Contact</p>
                     <p className="text-sm font-bold text-slate-800 truncate">{email}</p>
                  </div>
               </a>
            )}
            {finalAddress && (
               <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="bg-indigo-50 text-indigo-600 p-3 rounded-2xl shrink-0"><FiIcons.FiMapPin size={20} /></div>
                  <div className="overflow-hidden">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Headquarters</p>
                     <p className="text-sm font-bold text-slate-800 truncate">{finalAddress}</p>
                  </div>
               </div>
            )}
            {website && (
               <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between hover:border-indigo-500 transition-colors group">
                  <div className="flex items-center gap-4 overflow-hidden">
                     <div className="bg-indigo-50 text-indigo-600 p-3 rounded-2xl shrink-0"><FiIcons.FiGlobe size={20} /></div>
                     <span className="font-bold text-sm text-slate-800 truncate">Visit Portal</span>
                  </div>
                  <FiIcons.FiArrowRight className="text-slate-400 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
               </a>
            )}
         </div>

         <div className="flex flex-wrap justify-center gap-4 pt-4">
            {[ { icon: FiIcons.FiLinkedin, val: linkedin }, { icon: FiIcons.FiTwitter, val: twitter }, { icon: FiIcons.FiInstagram, val: instagram }, { icon: FiIcons.FiFacebook, val: facebook } ].map((social, idx) => social.val && (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-indigo-600 hover:text-white transition-colors shrink-0">
                  <social.icon size={20} />
               </a>
            ))}
         </div>

         <button onClick={() => downloadVCard(userData)} className="w-full py-5 bg-indigo-600 text-white rounded-3xl font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-3 mt-4 active:scale-[0.98]">
            <FiIcons.FiUserPlus size={18} /> Add Contact
         </button>
      </div>
    </div>
  );
};
export default AeroMotors;
