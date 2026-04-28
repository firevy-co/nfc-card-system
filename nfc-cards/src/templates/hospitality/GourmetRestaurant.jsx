import React from "react";
import {
   FiCoffee,
   FiMenu,
   FiMapPin,
   FiPhone,
   FiMail,
   FiGlobe,
   FiClock,
   FiCalendar,
   FiLinkedin,
   FiInstagram,
   FiTwitter,
   FiFacebook
} from "react-icons/fi";
import { downloadVCard } from '../common/StandardComponents';

const GourmetRestaurant = ({ userData }) => {
   const {
      displayName,
      website,
      email,
      phone,
      address,
      instagram,
      linkedin,
      facebook,
      twitter,
      logo
   } = userData || {};

   return (
      <div className="min-h-screen bg-[#FDFCF8] flex justify-center items-start py-10 px-4 text-[#2C2C2C] font-['Mulish',sans-serif]">
         <div className="w-full max-w-sm bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-[#EDECE4] p-8 relative">
            
            {/* HERITAGE LOGO SECTION */}
            <div className="flex flex-col items-center text-center mt-6">
               <div className="w-24 h-24 border-[1.5px] border-[#D1B16B] rounded-3xl flex items-center justify-center mb-8 shadow-sm overflow-hidden p-1">
                  {logo ? (
                    <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-[20px]" />
                  ) : (
                    <FiCoffee size={32} className="text-[#D1B16B]" />
                  )}
               </div>

               <h1 className="text-3xl font-black text-[#1A1A1A] tracking-tighter capitalize leading-none mb-2">
                  {displayName || "Bistro Luxe & Terrace"}
               </h1>

               <div className="flex items-center gap-2 text-[#D1B16B] rounded-full text-[10px] font-black capitalize tracking-[0.3em] mb-12">
                  Fine Dining & Parisian Bistro
               </div>
            </div>

            {/* QUICK ACTIONS GRID */}
            <div className="grid grid-cols-2 gap-3 mb-10">
               <a href={website ? website : '#'} target={website ? "_blank" : undefined} rel="noopener noreferrer" className="h-28 bg-[#FDFCF8] hover:bg-[#D1B16B] hover:text-white rounded-[2.5rem] border border-[#EDECE4] transition-all flex flex-col items-center justify-center gap-3 group active:scale-95">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#D1B16B] transition-colors group-hover:bg-[#1A1A1A] group-hover:text-white">
                     <FiMenu size={20} />
                  </div>
                  <span className="text-[9px] font-black capitalize tracking-widest">Le Menu</span>
               </a>
               <a href={`mailto:${email}`} className="h-28 bg-[#FDFCF8] hover:bg-[#D1B16B] hover:text-white rounded-[2.5rem] border border-[#EDECE4] transition-all flex flex-col items-center justify-center gap-3 group active:scale-95">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#D1B16B] transition-colors group-hover:bg-[#1A1A1A] group-hover:text-white">
                     <FiCalendar size={20} />
                  </div>
                  <span className="text-[9px] font-black capitalize tracking-widest">Bookings</span>
               </a>
            </div>

            {/* OPENING HOURS */}
            <div className="bg-[#1A1A1A] rounded-[2.5rem] p-8 mb-10 text-white relative overflow-hidden group">
               <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-[#D1B16B]/10 rounded-full blur-3xl transition-all group-hover:bg-[#D1B16B]/20"></div>
               <div className="flex items-center gap-3 mb-6">
                  <FiClock className="text-[#D1B16B]" />
                  <span className="text-[10px] font-black capitalize tracking-widest text-[#D1B16B]">Service Hours</span>
               </div>
               <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-zinc-400 font-medium">Lundi - Vendredi</span>
                     <span className="font-bold">12:00 — 23:00</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-zinc-400 font-medium">Weekends</span>
                     <span className="font-bold underline decoration-[#D1B16B] underline-offset-4 decoration-2">11:00 — 00:00</span>
                  </div>
               </div>
            </div>

            {/* CONTACT STACK - MINIMALIST */}
            <div className="space-y-3 relative z-10 mb-8">
               {website && <a href={website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiGlobe size={18} /> <span className="text-sm">{website}</span></a>}
               {email && <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiMail size={18} /> <span className="text-sm">{email}</span></a>}
               {phone && <a href={`tel:${phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiPhone size={18} /> <span className="text-sm">{phone}</span></a>}
               {address && <div className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80"><FiMapPin size={18} /> <span className="text-sm">{address}</span></div>}

               {/* Hospitality Socials */}
               {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiInstagram size={18} /> <span className="text-sm">{instagram}</span></a>}
               {facebook && <a href={facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiFacebook size={18} /> <span className="text-sm">{facebook}</span></a>}
               {twitter && <a href={twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiTwitter size={18} /> <span className="text-sm">{twitter}</span></a>}
               {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-white/10 opacity-80 hover:opacity-100 transition-opacity"><FiLinkedin size={18} /> <span className="text-sm">{linkedin}</span></a>}
            </div>

            {address && (<a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="block w-full py-4 mt-4 border rounded-xl text-center text-xs font-bold uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity">View on Map</a>)}

            <div className="mt-8">
               <button onClick={() => downloadVCard(userData)} className="w-full py-3 mt-4 border rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs opacity-80 hover:opacity-100 transition-opacity">Save Contact</button>
            </div>

            <footer className="mt-12 text-center opacity-40 hover:opacity-100 transition-opacity">
               <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] font-black tracking-[0.5em] text-[#D1B16B] hover:text-[#1A1A1A] transition-colors uppercase">Powered by Cardyn</a>
            </footer>
         </div>
      </div>
   );
};

export default GourmetRestaurant;
