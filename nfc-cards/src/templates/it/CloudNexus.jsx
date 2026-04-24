import React from 'react';
import * as Fi from 'react-icons/fi';
import * as Fa from 'react-icons/fa';
import { StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

/**
 * CLOUD NEXUS IDENTITY ARCHITECTURE
 * A high-fidelity, glassmorphic design optimized for cloud architects and DevOps professionals.
 * Features a decentralized node aesthetic with dynamic identity projection.
 */
const CloudNexus = ({ userData }) => {
   const themeColor = userData?.themeColor || "#2563eb";

   // NORMALIZE DATA
   const {
      displayName,
      email,
      role,
      phone,
      website,
      address,
      bio,
      logo
   } = userData || {};

   return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 font-['Inter'] relative overflow-hidden">
         {/* AMBIENT BACKGROUND NODES */}
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>

         {/* MAIN ARCHITECTURE CONTAINER */}
         <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-[3rem] p-1 shadow-[0_0_50px_rgba(0,0,0,0.3)] backdrop-blur-3xl overflow-hidden relative z-10">

            {/* IDENTITY HEADER BLOCK */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2.8rem] text-center relative overflow-hidden group">
               {/* NEXUS PATTERN OVERLAY */}
               <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
               </div>

               {/* BRAND IDENTITY NODE */}
               <div className="w-24 h-24 rounded-[2rem] bg-white p-0.5 shadow-2xl mx-auto mb-6 relative z-10 transform group-hover:rotate-3 transition-transform duration-500">
                  <div className="w-full h-full rounded-[1.8rem] bg-white flex items-center justify-center overflow-hidden">
                     {logo ? (
                        <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                     ) : (
                        <Fi.FiCloud size={40} className="text-blue-600" />
                     )}
                  </div>
                  {/* Status Beacon */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-blue-600 rounded-full"></div>
               </div>

               <h1 className="text-2xl font-black text-white tracking-tighter leading-none relative z-10">{displayName || 'Cloud Architect'}</h1>
            </div>

            {/* INTERACTION SUITE */}
            <div className="p-6 space-y-3">
               {/* BIO NODE */}
               {bio && (
                  <div className="bg-white/[0.03] border border-white/5 p-5 rounded-2xl mb-4">
                     <p className="text-[11px] text-white/50 leading-relaxed italic font-medium">
                        "{bio}"
                     </p>
                  </div>
               )}

               {/* ACTION TILES */}
               <div className="grid grid-cols-2 gap-3">
                  <a href={`tel:${phone}`} className="flex flex-col items-center justify-center gap-2 bg-white/[0.03] border border-white/5 p-5 rounded-3xl hover:bg-white/[0.08] transition-all group active:scale-95">
                     <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shadow-inner group-hover:text-blue-300">
                        <Fa.FaPhoneAlt size={16} />
                     </div>
                     <span className="text-[9px] font-black uppercase text-white/40 tracking-widest">Deploy Call</span>
                  </a>
                  <a href={`mailto:${email}`} className="flex flex-col items-center justify-center gap-2 bg-white/[0.03] border border-white/5 p-5 rounded-3xl hover:bg-white/[0.08] transition-all group active:scale-95">
                     <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shadow-inner group-hover:text-blue-300">
                        <Fi.FiMail size={20} />
                     </div>
                     <span className="text-[9px] font-black uppercase text-white/40 tracking-widest">Send Signal</span>
                  </a>
               </div>

               {/* PRIMARY OBJECTIVE (WEBSITE) */}
               <a href={website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-white text-blue-700 py-4.5 rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all mt-4">
                  <Fi.FiGlobe size={18} /> Access Portal
               </a>

               {/* LOCATION NODE */}
               {address && (
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-5 rounded-3xl hover:bg-white/[0.05] transition-all group">
                     <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:text-cyan-300">
                        <Fi.FiMapPin size={18} />
                     </div>
                     <div className="flex-1">
                        <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">Deployment Zone</p>
                        <p className="text-[10px] font-bold text-white/70 truncate">{address}</p>
                     </div>
                  </a>
               )}

               {/* SOCIAL MATRIX */}
               <div className="flex items-center justify-center gap-3 pt-4">
                  {[
                     { id: 'linkedin', icon: Fa.FaLinkedin, color: 'text-blue-400' },
                     { id: 'instagram', icon: Fa.FaInstagram, color: 'text-pink-400' },
                     { id: 'twitter', icon: Fa.FaTwitter, color: 'text-sky-400' },
                     { id: 'github', icon: Fa.FaGithub, color: 'text-white' },
                  ].map(social => userData[social.id] && (
                     <a key={social.id} href={social.id === 'github' ? `https://github.com/${userData[social.id]}` : `https://www.linkedin.com/in/${userData[social.id]}`} className={`w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center ${social.color} hover:bg-white/10 transition-all shadow-lg`}>
                        <social.icon size={16} />
                     </a>
                  ))}
               </div>

               {/* SAVE CONTACT PROTOCOL */}
               <div className="pt-4">
                  <StandardSaveContactButton userData={userData} />
               </div>
            </div>

            {/* BRANDING FOOTER */}
            <div className="pb-8 pt-4 text-center">
               <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[7px] text-white/20 font-black tracking-[0.6em] uppercase hover:text-white/40 transition-colors">
                  Powered by Cardyn Identity Network
               </a>
            </div>
         </div>
      </div>
   );
};

export default CloudNexus;
