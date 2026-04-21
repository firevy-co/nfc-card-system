import React from "react";
import * as FiIcons from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const BoutiqueStylist = ({ userData }) => {
   const {
      displayName,
      website,
      email,
      phone,
      address,
      instagram,
      linkedin
   } = userData || {};

   return (
      <div className="min-h-screen bg-[#FFF0F5] flex justify-center items-start py-8 px-4 text-[#D35D92] font-['Mulish']">
         <div className="w-full max-w-sm bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-[#FFDDF0] p-8 relative">
            
            {/* FLOATING DECORATIONS */}
            <div className="absolute top-10 right-10 flex gap-2">
               <FiIcons.FiStar className="text-[#FFDDF0]" />
               <FiIcons.FiHeart className="text-[#FFDDF0]" />
            </div>

            {/* ARTIST HEADER */}
            <div className="flex flex-col items-center text-center mt-6">
               <div className="w-28 h-28 bg-[#FFF9FB] border border-[#FFDDF0] rounded-full flex items-center justify-center mb-6 shadow-inner transition-transform hover:scale-105 duration-700 overflow-hidden">
                  {userData?.logo ? (
                     <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                  ) : (
                     <FiIcons.FiHeart size={36} className="text-[#D35D92] fill-[#D35D92]/5" />
                  )}
               </div>

               <h1 className="text-3xl font-black text-[#8E44AD] tracking-tighter leading-none mb-1">
                  {displayName || "Aria Vogue Studio"}
               </h1>

               <div className="flex items-center gap-2 text-[#D35D92] bg-[#FFF0F5] px-4 py-1.5 rounded-full text-[10px] font-black capitalize tracking-[0.2em] mb-12">
                  Makeup & Bridal Mastery
               </div>
            </div>

            {/* CONTACT STACK */}
            <div className="space-y-3 mb-10">
               <StandardContactLink icon={FiIcons.FiGlobe} value={website} href={website} />
               <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />
               <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />
               <StandardContactLink icon={FiIcons.FiMapPin} value={address} />
               
               {/* Beauty Socials */}
               <StandardContactLink icon={FiIcons.FiInstagram} value={instagram} href={instagram} />
               <StandardContactLink icon={FiIcons.FiLinkedin} value={linkedin} href={linkedin} />
            </div>

            {/* PRIMARY CTA */}
            <button className="w-full bg-[#8E44AD] hover:bg-[#D35D92] text-white font-black py-5 rounded-[2.5rem] flex items-center justify-center gap-3 transition-all capitalize tracking-[0.2em] text-[10px] shadow-lg shadow-[#8E44AD]/20 mb-4">
               <FiIcons.FiShoppingBag size={18} />
               Secure Your Booking
            </button>

            <StandardMapPreview address={address} />

            <StandardSaveContactButton />

            <footer className="mt-8 text-center opacity-30">
               <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[8px] font-black tracking-[0.4em] text-gray-400 hover:text-[#D35D92] transition-colors uppercase">Powered by Cardyn</a>
            </footer>
         </div>
      </div>
   );
};

export default BoutiqueStylist;
