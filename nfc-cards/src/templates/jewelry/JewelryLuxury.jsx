import React from "react";
import {
   FiMapPin,
   FiPhone,
   FiMail,
   FiGlobe,
   FiInstagram,
   FiLinkedin,
   FiFacebook,
} from "react-icons/fi";
import { FaGem } from "react-icons/fa";
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

/**
 * ROYAL JEWELRY IDENTITY ARCHITECTURE
 * A high-fidelity, luxury design featuring gold accents, diamond nodes, and ambient lighting.
 * Optimized for premium jewelry boutiques and artisanal craftsmen.
 */
const JewelryLuxury = ({ userData }) => {
   const {
      displayName,
      website,
      email,
      phone,
      address,
      bio
   } = userData || {};

   return (
    <div className="min-h-screen bg-[#020617] flex justify-center items-start py-16 px-4 text-white font-['Mulish'] relative overflow-hidden">
         {/* AMBIENT LUXURY NODES */}
         <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-500/5 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px] animate-pulse delay-1000"></div>

         <div className="w-full max-w-sm bg-white/[0.03] border border-white/10 rounded-[3rem] p-1 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl relative z-10 overflow-hidden">
            
            {/* LUXURY HEADER BLOCK */}
            <div className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] p-10 rounded-[2.8rem] text-center relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/diamond-upholstery.png")' }}></div>
               
               {/* BRAND IDENTITY NODE */}
               <div className="w-28 h-28 border-4 border-amber-500/20 rounded-full mx-auto mb-8 relative z-10 p-1.5 shadow-[0_0_30px_rgba(245,158,11,0.2)] group-hover:scale-105 transition-transform duration-700">
                  <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center overflow-hidden border-2 border-amber-500/40">
                     {userData?.logo ? (
                       <img src={userData.logo} alt="Logo" className="w-full h-full object-cover" />
                     ) : (
                       <FaGem size={40} className="text-amber-500 animate-pulse" />
                     )}
                  </div>
               </div>

               <h1 className="text-3xl font-black tracking-tighter leading-none uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
                  {displayName || "Maison De Luxe"}
               </h1>

               <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-6 opacity-60"></div>
            </div>

            {/* INTERACTION SUITE */}
            <div className="p-8 space-y-4">
               
               {/* BIO NODE */}
               {bio && (
                 <div className="bg-white/5 border border-white/5 p-6 rounded-[2rem] mb-6 text-center">
                    <p className="text-[11px] text-gray-400 leading-relaxed italic font-medium tracking-wide">
                       "{bio}"
                    </p>
                 </div>
               )}

               {/* COLLECTION GALLERY (DYNAMIC PREVIEW) */}
               <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="relative group overflow-hidden rounded-3xl border border-white/10 aspect-square">
                     <img
                        src="https://images.unsplash.com/photo-1605100804763-247f67b3557e"
                        alt="Collection 1"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[8px] font-black uppercase tracking-widest border border-white/20 px-3 py-1.5 rounded-full">Explore</span>
                     </div>
                  </div>
                  <div className="relative group overflow-hidden rounded-3xl border border-white/10 aspect-square">
                     <img
                        src="https://images.unsplash.com/photo-1611652022419-a9419f74343d"
                        alt="Collection 2"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[8px] font-black uppercase tracking-widest border border-white/20 px-3 py-1.5 rounded-full">Explore</span>
                     </div>
                  </div>
               </div>

               {/* PRIMARY OBJECTIVE (COLLECTION PORTAL) */}
               {website && (
                  <a 
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 bg-white text-black py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-amber-500 hover:text-white transition-all shadow-[0_15px_40px_rgba(255,255,255,0.1)] active:scale-95 mb-8"
                  >
                     Explore Collection
                  </a>
               )}

               {/* CONTACT INFRASTRUCTURE */}
               <div className="space-y-3">
                  <p className="text-[9px] text-gray-600 font-black tracking-[0.4em] uppercase mb-6 text-center">
                     Global Concierge
                  </p>

                  <StandardContactLink icon={FiGlobe} value="Official Boutique" href={website} />
                  <StandardContactLink icon={FiMail} value={email} href={`mailto:${email}`} />
                  <StandardContactLink icon={FiPhone} value={phone} href={`tel:${phone}`} />
                  <StandardContactLink icon={FiMapPin} value="Flagship Store" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} />
               </div>

               {/* LUXURY SOCIAL MATRIX */}
               <div className="flex items-center justify-center gap-4 pt-6">
                  {[
                     { id: 'linkedin', icon: FiLinkedin },
                     { id: 'instagram', icon: FiInstagram },
                     { id: 'facebook', icon: FiFacebook },
                  ].map(social => userData[social.id] && (
                     <a key={social.id} href={userData[social.id]} className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-amber-500 hover:border-amber-500/30 transition-all shadow-lg">
                        <social.icon size={18} />
                     </a>
                  ))}
               </div>

               {/* MAP PROTOCOL */}
               {address && <StandardMapPreview address={address} />}

               {/* SAVE CONTACT PROTOCOL */}
               <div className="pt-4">
                  <StandardSaveContactButton userData={userData} />
               </div>
            </div>

            {/* BRANDING FOOTER */}
            <div className="pb-10 pt-4 text-center">
               <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[7px] text-white/10 font-black tracking-[0.6em] uppercase hover:text-white/30 transition-colors">
                  Powered by Cardyn Identity Network
               </a>
            </div>
         </div>
    </div>
   );
};

export default JewelryLuxury;
