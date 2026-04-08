import React from "react";
import {
   FiShare2,
   FiHeart,
   FiMapPin,
   FiPhone,
   FiMail,
   FiGlobe,
   FiUserPlus,
   FiStar,
   FiInstagram,
   FiShoppingBag,
} from "react-icons/fi";

const BoutiqueStylist = ({ userData }) => {
   const {
      displayName = "Aria Vogue Studio",
      website = "www.ariavogue.com",
      email = "hello@ariavogue.com",
      phone = "+44 7911 123456",
      address = "Bond Street, London",
   } = userData || {};

   return (
      <div className="min-h-screen bg-[#FFF0F5] flex justify-center items-start py-8 px-4 text-[#D35D92] font-['Plus_Jakarta_Sans']">
         <div className="w-full max-w-sm bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-[#FFDDF0] p-8 relative">
            
            {/* FLOATING DECORATIONS */}
            <div className="absolute top-10 right-10 flex gap-2">
               <FiStar className="text-[#FFDDF0]" />
               <FiHeart className="text-[#FFDDF0]" />
            </div>

            {/* ARTIST HEADER */}
            <div className="flex flex-col items-center text-center mt-6">
               <div className="w-28 h-28 bg-[#FFF9FB] border border-[#FFDDF0] rounded-full flex items-center justify-center mb-6 shadow-inner transition-transform hover:scale-105 duration-700">
                  <FiHeart size={36} className="text-[#D35D92] fill-[#D35D92]/5" />
               </div>

               <h1 className="text-3xl font-black text-[#8E44AD] tracking-tighter leading-none mb-1">
                  {displayName}
               </h1>

               <div className="flex items-center gap-2 text-[#D35D92] bg-[#FFF0F5] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-12">
                  Makeup & Bridal Mastery
               </div>
            </div>

            {/* SERVICES CIRCLES */}
            <div className="flex justify-center gap-4 mb-10">
               <div className="p-4 bg-[#FFF9FB] rounded-full flex items-center justify-center shadow-sm border border-[#FFDDF0] group transition-all hover:bg-[#8E44AD]">
                  <FiInstagram className="group-hover:text-white" />
               </div>
               <div className="p-4 bg-[#FFF9FB] rounded-full flex items-center justify-center shadow-sm border border-[#FFDDF0] group transition-all hover:bg-[#D35D92]">
                  <FiShoppingBag className="group-hover:text-white" />
               </div>
               <div className="p-4 bg-[#FFF9FB] rounded-full flex items-center justify-center shadow-sm border border-[#FFDDF0] group transition-all hover:bg-[#8E44AD]">
                  <FiGlobe className="group-hover:text-white" />
               </div>
            </div>

            {/* CONTACT MINIMALIST GRID */}
            <div className="space-y-4 mb-10">
               <div className="flex items-center gap-4 py-4 px-6 bg-[#FFF9FB] rounded-[2rem] border border-[#FFDDF0]">
                  <FiInstagram size={18} />
                  <div className="flex-1">
                     <p className="text-[9px] font-black uppercase text-[#D35D92]/50 tracking-widest">Portfolio</p>
                     <p className="text-xs font-black">@AriaVogue_Official</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 py-4 px-6 bg-[#FFF9FB] rounded-[2rem] border border-[#FFDDF0]">
                  <FiMapPin size={18} />
                  <div className="flex-1">
                     <p className="text-[9px] font-black uppercase text-[#D35D92]/50 tracking-widest">Studio Location</p>
                     <p className="text-xs font-black italic">{address}</p>
                  </div>
               </div>
            </div>

            {/* PRIMARY CTA */}
            <button className="w-full bg-[#8E44AD] hover:bg-[#D35D92] text-white font-black py-5 rounded-[2.5rem] flex items-center justify-center gap-3 transition-all uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-[#8E44AD]/20">
               <FiUserPlus size={18} />
               Secure Your Booking
            </button>

         </div>
      </div>
   );
};

export default BoutiqueStylist;
