import React from "react";
import {
   FiMapPin,
   FiPhone,
   FiMail,
   FiGlobe,
   FiInstagram,
   FiLinkedin,
   FiFacebook,
   FiTwitter,
   FiGithub
} from "react-icons/fi";
import { FaGem, FaWhatsapp, FaYoutube, FaTiktok, FaDiscord, FaTelegram, FaSkype, FaPaypal } from "react-icons/fa";
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const JewelryLuxury = ({ userData }) => {
   const {
      displayName, website, email, phone, address, bio,
      whatsapp, facebook, youtube, tiktok, discord, telegram, skype, paypal,
      linkedin, instagram, twitter, github, company, businessName, logo, profileImage,
      role
   } = userData || {};

   return (
      <div className="w-full bg-[#020617] text-white font-['Mulish'] relative overflow-hidden">
         {/* AMBIENT LUXURY NODES */}
         <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-amber-500/5 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-[120px] animate-pulse delay-1000"></div>

         <div className="w-full bg-white/[0.03] border-b border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl relative z-10 overflow-hidden">

            {/* LUXURY HEADER BLOCK */}
            <div className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] p-12 text-center relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/diamond-upholstery.png")' }}></div>

               {/* BRAND IDENTITY NODE */}
               <div className="w-32 h-32 border-4 border-amber-500/20 rounded-full mx-auto mb-8 relative z-10 p-1.5 shadow-[0_0_30px_rgba(245,158,11,0.2)] group-hover:scale-105 transition-transform duration-700">
                  <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center overflow-hidden border-2 border-amber-500/40">
                     <img src={logo || profileImage} alt={displayName} className="w-full h-full object-cover" />
                  </div>
               </div>

               <h1 className="text-4xl font-black tracking-tighter leading-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-2">
                  {displayName || "Maison De Luxe"}
               </h1>

               {(company || businessName) && (
                  <p className="text-white/20 text-[9px] font-bold mt-6 uppercase tracking-[0.3em]">
                     {company || businessName}
                  </p>
               )}

               <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-8 opacity-60"></div>
            </div>

            {/* INTERACTION SUITE */}
            <div className="p-8 space-y-12">

               {/* BIO NODE */}
               {bio && (
                  <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] text-center">
                     <p className="text-sm text-gray-400 leading-relaxed italic font-medium tracking-wide">
                        "{bio}"
                     </p>
                  </div>
               )}

               {/* COLLECTION GALLERY (DYNAMIC PREVIEW) */}
               <div className="grid grid-cols-2 gap-6">
                  <div className="relative group overflow-hidden rounded-3xl border border-white/10 aspect-square">
                     <img
                        src="https://images.unsplash.com/photo-1605100804763-247f67b3557e"
                        alt="Collection 1"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[10px] font-black uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full">Explore</span>
                     </div>
                  </div>
                  <div className="relative group overflow-hidden rounded-3xl border border-white/10 aspect-square">
                     <img
                        src="https://images.unsplash.com/photo-1611652022419-a9419f74343d"
                        alt="Collection 2"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[10px] font-black uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full">Explore</span>
                     </div>
                  </div>
               </div>

               {/* CONTACT INFRASTRUCTURE */}
               <div className="space-y-4">
                  <p className="text-[10px] text-gray-600 font-black tracking-[0.5em] uppercase mb-8 text-center">
                     Global Concierge
                  </p>

                  {website && <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiGlobe size={18} /> <span className="text-sm">Official Boutique</span></a>}
                  {email && <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiMail size={18} /> <span className="text-sm">{email}</span></a>}
                  {phone && <a href={`tel:${phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiPhone size={18} /> <span className="text-sm">{phone}</span></a>}
                  {address && <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiMapPin size={18} /> <span className="text-sm">Flagship Store</span></a>}
               </div>

               {/* LUXURY SOCIAL MATRIX */}
               <div className="grid grid-cols-4 gap-4">
                  {[
                     { id: 'linkedin', val: linkedin, icon: FiLinkedin, color: 'hover:bg-[#0077b5]' },
                     { id: 'instagram', val: instagram, icon: FiInstagram, color: 'hover:bg-[#e1306c]' },
                     { id: 'facebook', val: facebook, icon: FiFacebook, color: 'hover:bg-[#1877f2]' },
                     { id: 'twitter', val: twitter, icon: FiTwitter, color: 'hover:bg-black' },
                     { id: 'whatsapp', val: whatsapp, icon: FaWhatsapp, color: 'hover:bg-[#25d366]' },
                     { id: 'youtube', val: youtube, icon: FaYoutube, color: 'hover:bg-[#ff0000]' },
                     { id: 'telegram', val: telegram, icon: FaTelegram, color: 'hover:bg-[#0088cc]' },
                     { id: 'github', val: github, icon: FiGithub, color: 'hover:bg-zinc-800' }
                  ].map(social => social.val && (
                     <a
                        key={social.id}
                        href={social.id === 'whatsapp' ? `https://wa.me/${social.val.replace(/\D/g, '')}` : (social.val.startsWith('http') ? social.val : `https://${social.id}.com/${social.val}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`aspect-square rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all shadow-lg ${social.color}`}
                     >
                        <social.icon size={22} />
                     </a>
                  ))}
               </div>

               {/* PRIMARY OBJECTIVE (COLLECTION PORTAL) */}
               {website && (
                  <div className="pt-2">
                     <a
                        href={website.startsWith('http') ? website : `https://${website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-4 bg-white text-black py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] hover:bg-amber-500 hover:text-white transition-all shadow-2xl active:scale-95"
                     >
                        Enter Portal
                     </a>
                  </div>
               )}

               {/* MAP PROTOCOL */}
               {address && <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="block w-full py-4 mt-4 border rounded-xl text-center text-xs font-bold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">View on Map</a>}

               {/* SAVE CONTACT PROTOCOL */}
               <div className="pt-2">
                  <button onClick={() => downloadVCard(userData)} className="w-full py-3 mt-4 border rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs opacity-80 hover:opacity-100 transition-opacity">Save Contact</button>
               </div>

               <PoweredBy />
            </div>
         </div>
      </div>
   );
};

export default JewelryLuxury;
