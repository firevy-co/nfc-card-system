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
} from "react-icons/fi";
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const GourmetRestaurant = ({ userData }) => {
   const {
      displayName,
      website,
      email,
      phone,
      address,
   } = userData || {};

   return (
      <div className="min-h-screen bg-[#FDFCF8] flex justify-center items-start py-10 px-4 text-[#2C2C2C] font-['Mulish']">
         <div className="w-full max-w-sm bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-[#EDECE4] p-8 relative">
            
            {/* HERITAGE LOGO SECTION */}
            <div className="flex flex-col items-center text-center mt-6">
               <div className="w-20 h-20 border-[1.5px] border-[#D1B16B] rounded-3xl flex items-center justify-center mb-8 shadow-sm">
                  {userData?.logo ? (
                    <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                  ) : (
                    <FiCoffee size={32} className="text-[#D1B16B]" />
                  )}
               </div>

               <h1 className="text-3xl font-black text-[#1A1A1A] tracking-tighter capitalize leading-none mb-1">
                  {displayName || "Bistro Luxe & Terrace"}
               </h1>

               <div className="flex items-center gap-2 text-[#D1B16B] rounded-full text-[10px] font-black capitalize tracking-[0.3em] mb-12">
                  Fine Dining & Parisian Bistro
               </div>
            </div>

            {/* QUICK ACTIONS GRID */}
            <div className="grid grid-cols-2 gap-3 mb-10">
               <button className="h-28 bg-[#FDFCF8] hover:bg-[#D1B16B] hover:text-white rounded-[2.5rem] border border-[#EDECE4] transition-all flex flex-col items-center justify-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#D1B16B] transition-colors group-hover:bg-[#1A1A1A] group-hover:text-white">
                     <FiMenu size={20} />
                  </div>
                  <span className="text-[9px] font-black capitalize tracking-widest">Le Menu</span>
               </button>
               <button className="h-28 bg-[#FDFCF8] hover:bg-[#D1B16B] hover:text-white rounded-[2.5rem] border border-[#EDECE4] transition-all flex flex-col items-center justify-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#D1B16B] transition-colors group-hover:bg-[#1A1A1A] group-hover:text-white">
                     <FiCalendar size={20} />
                  </div>
                  <span className="text-[9px] font-black capitalize tracking-widest">Bookings</span>
               </button>
            </div>

            {/* OPENING HOURS */}
            <div className="bg-[#1A1A1A] rounded-[2.5rem] p-8 mb-10 text-white relative overflow-hidden group">
               <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-[#D1B16B]/10 rounded-full blur-3xl transition-all group-hover:bg-[#D1B16B]/20"></div>
               <div className="flex items-center gap-3 mb-6">
                  <FiClock className="text-[#D1B16B]" />
                  <span className="text-[10px] font-black capitalize tracking-widest text-[#D1B16B]">Service Hours</span>
               </div>
               <div className="space-y-4">
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
            <div className="space-y-3 relative z-10 mb-10">
               <StandardContactLink icon={FiGlobe} value={website} href={website} />
               <StandardContactLink icon={FiMail} value={email} href={`mailto:${email}`} />
               <StandardContactLink icon={FiPhone} value={phone} href={`tel:${phone}`} />
               <StandardContactLink icon={FiMapPin} value={address} />

               {/* Hospitality Socials */}
               <StandardContactLink icon={FiLinkedin} value={userData?.linkedin} href={userData?.linkedin} />
               <StandardContactLink icon={FiInstagram} value={userData?.instagram} href={userData?.instagram} />
            </div>

            <StandardMapPreview address={address} />

            <StandardSaveContactButton userData={userData} />

            <footer className="mt-12 text-center opacity-40">
               <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] font-black tracking-[0.5em] text-[#D1B16B] hover:text-[#1A1A1A] transition-colors uppercase">Powered by Cardyn</a>
            </footer>
         </div>
      </div>
   );
};

export default GourmetRestaurant;
