import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const GlowStudio = ({ userData }) => {
  const { 
    displayName, email, role, mobileNumber, phone, 
    companyName, designation, website, address, city,
    linkedin, instagram, facebook, twitter, bio, avatar, logo 
  } = userData || {};

  const displayPhone = mobileNumber || phone;
  const finalAddress = address || city;

  return (
    <div className="w-full bg-[#fffbfb] font-['Outfit'] pb-12 overflow-hidden">
      {/* Immersive Header Image Area */}
      <div className="h-64 bg-gradient-to-br from-rose-200 to-rose-50 relative">
         <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
         <div className="absolute -bottom-12 left-8 right-8 flex justify-center z-10">
            <div className="w-32 h-32 rounded-[2rem] bg-white p-2 shadow-2xl shadow-rose-200/50 rotate-3 hover:rotate-0 transition-transform">
               <div className="w-full h-full rounded-[1.6rem] bg-rose-50 flex items-center justify-center overflow-hidden">
                  {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain p-2" /> : avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-4xl font-black text-rose-300">{(displayName || 'G')[0]}</span>}
               </div>
            </div>
         </div>
      </div>

      <div className="pt-20 px-6 text-center space-y-6">
         <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">{displayName || 'Glow Studio'}</h1>
            <p className="text-rose-400 font-bold text-sm tracking-widest uppercase mt-1">{designation || role || "Beauty Professional"}</p>
            {companyName && <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-2">{companyName}</p>}
         </div>

         {bio && (
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-rose-50">
               <p className="text-sm text-slate-500 leading-relaxed font-medium">"{bio}"</p>
            </div>
         )}

         {/* Package / Details Slider Concept */}
         <div className="text-left space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">Featured Packages</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 px-2 snap-x hide-scrollbar">
               {[
                  { title: "Glow Routine", price: "$120", icon: FiIcons.FiSun },
                  { title: "Luxe Facial", price: "$85", icon: FiIcons.FiSmile },
                  { title: "Brow Lamination", price: "$60", icon: FiIcons.FiEye }
               ].map((pkg, i) => (
                  <div key={i} className="min-w-[140px] bg-white p-5 rounded-[2rem] border border-rose-100 shadow-sm snap-center shrink-0 text-center flex flex-col items-center gap-2">
                     <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center text-rose-400"><pkg.icon /></div>
                     <h4 className="text-sm font-bold text-slate-700">{pkg.title}</h4>
                     <p className="text-xs font-black text-rose-400">{pkg.price}</p>
                  </div>
               ))}
            </div>
         </div>

         {/* Communications Stack */}
         <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white space-y-4 shadow-xl">
            <h3 className="text-xs font-black uppercase tracking-widest text-white/50 text-left mb-4">Direct Links</h3>
            {displayPhone && (
               <a href={`tel:${displayPhone}`} className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl hover:bg-rose-500 transition-colors">
                  <div className="bg-white/20 p-2 rounded-xl shrink-0"><FiIcons.FiPhone /></div>
                  <div className="text-left overflow-hidden">
                     <p className="text-[9px] uppercase tracking-widest text-white/60">Call</p>
                     <p className="text-sm font-bold">{displayPhone}</p>
                  </div>
               </a>
            )}
            {email && (
               <a href={`mailto:${email}`} className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl hover:bg-rose-500 transition-colors">
                  <div className="bg-white/20 p-2 rounded-xl shrink-0"><FiIcons.FiMail /></div>
                  <div className="text-left overflow-hidden">
                     <p className="text-[9px] uppercase tracking-widest text-white/60">Email</p>
                     <p className="text-sm font-bold truncate max-w-[200px]">{email}</p>
                  </div>
               </a>
            )}
            {website && (
               <a href={website?.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl hover:bg-rose-500 transition-colors">
                  <div className="bg-white/20 p-2 rounded-xl shrink-0"><FiIcons.FiGlobe /></div>
                  <div className="text-left overflow-hidden">
                     <p className="text-[9px] uppercase tracking-widest text-white/60">Website</p>
                     <p className="text-sm font-bold truncate max-w-[200px]">{website}</p>
                  </div>
               </a>
            )}
            {finalAddress && (
               <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl">
                  <div className="bg-white/20 p-2 rounded-xl shrink-0"><FiIcons.FiMapPin /></div>
                  <div className="text-left overflow-hidden">
                     <p className="text-[9px] uppercase tracking-widest text-white/60">Location</p>
                     <p className="text-sm font-bold truncate max-w-[200px]">{finalAddress}</p>
                  </div>
               </div>
            )}
         </div>

         <div className="flex justify-center gap-4 py-2">
            {[
               { icon: FiIcons.FiInstagram, val: instagram },
               { icon: FiIcons.FiFacebook, val: facebook },
               { icon: FiIcons.FiTwitter, val: twitter },
               { icon: FiIcons.FiLinkedin, val: linkedin }
            ].map((social, idx) => social.val && (
               <a key={idx} href={social.val.startsWith('http') ? social.val : `https://${social.val}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-rose-400 shadow-sm border border-rose-50 hover:scale-110 transition-transform">
                  <social.icon size={20} />
               </a>
            ))}
         </div>

         <button onClick={() => downloadVCard(userData)} className="w-full bg-rose-400 text-white py-5 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-rose-400/30 flex justify-center items-center gap-2 hover:bg-rose-500 transition-colors mt-4">
            <FiIcons.FiDownload size={16} /> Save Identity
         </button>

         <p className="text-[7px] font-black tracking-[0.6em] text-rose-200 uppercase italic mt-8">Powered by Cardyn</p>
      </div>
      <style dangerouslySetInnerHTML={{__html: `.hide-scrollbar::-webkit-scrollbar { display: none; }`}} />
    </div>
  );
};
export default GlowStudio;
