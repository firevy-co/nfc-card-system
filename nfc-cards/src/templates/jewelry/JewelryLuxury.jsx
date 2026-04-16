import React from "react";
import {
   FiShare2,
   FiCamera,
   FiMapPin,
   FiPhone,
   FiMail,
   FiGlobe,
   FiUserPlus,
} from "react-icons/fi";

const JewelryLuxury = ({ userData }) => {
   const {
      displayName = "Aurelia Fine Jewelry",
      website = "www.aureliafinejewelry.fr",
      email = "concierge@aurelia.fr",
      phone = "+33 1 42 68 00 00",
      address = "Place Vendôme, Paris",
   } = userData || {};

   return (
      <div className="min-h-screen bg-black flex justify-center items-start py-10 px-4 text-white">
         <div className="w-full max-w-sm">

            {/* LOGO */}
            <div className="flex flex-col items-center text-center">
               <div className="w-24 h-24 border-2 border-cyan-400 rounded-full flex items-center justify-center mb-4">
                  💎
               </div>

               <h1 className="text-xl font-semibold tracking-wide">
                  {displayName}
               </h1>

               <p className="text-xs tracking-[3px] text-gray-400 mt-1">
                  MAISON DE LUXE • PARIS
               </p>

               {/* TAG BUTTONS */}
               <div className="flex gap-2 mt-4 flex-wrap justify-center">
                  <span className="bg-cyan-500/20 text-cyan-300 text-xs px-3 py-1 rounded-full">
                     BESPOKE DESIGNS
                  </span>
                  <span className="bg-cyan-500/20 text-cyan-300 text-xs px-3 py-1 rounded-full">
                     FINE DIAMONDS
                  </span>
                  <span className="bg-cyan-500/20 text-cyan-300 text-xs px-3 py-1 rounded-full">
                     EXPERT CRAFTSMANSHIP
                  </span>
               </div>
            </div>

            {/* PRODUCT GRID */}
            <div className="grid grid-cols-2 gap-4 mt-8">
               <img
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e"
                  className="rounded-xl object-cover h-32 w-full"
               />

               <img
                  src="https://images.unsplash.com/photo-1611652022419-a9419f74343d"
                  className="rounded-xl object-cover h-32 w-full"
               />

               <img
                  src="https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d"
                  className="rounded-xl object-cover h-32 w-full col-span-2"
               />
            </div>

            {/* ACTION BUTTONS */}
            <div className="grid grid-cols-2 gap-4 mt-6">
               <button className="bg-[#0b1b2b] py-3 rounded-xl flex items-center justify-center gap-2">
                  <FiShare2 />
                  OUR COLLECTION
               </button>

               <button className="bg-[#0b1b2b] py-3 rounded-xl flex items-center justify-center gap-2">
                  <FiCamera />
                  BOOK APPOINTMENT
               </button>
            </div>

            {/* CONTACT CARDS */}
            <div className="space-y-3 mt-6">

               <div className="bg-[#0b1b2b] p-4 rounded-xl flex items-center gap-3">
                  <FiGlobe className="text-cyan-400" />
                  <div>
                     <p className="text-xs text-gray-400">WEBSITE</p>
                     <p className="text-sm">{website}</p>
                  </div>
               </div>

               <div className="bg-[#0b1b2b] p-4 rounded-xl flex items-center gap-3">
                  <FiMail className="text-cyan-400" />
                  <div>
                     <p className="text-xs text-gray-400">EMAIL</p>
                     <p className="text-sm">{email}</p>
                  </div>
               </div>

               <div className="bg-[#0b1b2b] p-4 rounded-xl flex items-center gap-3">
                  <FiPhone className="text-cyan-400" />
                  <div>
                     <p className="text-xs text-gray-400">PHONE</p>
                     <p className="text-sm">{phone}</p>
                  </div>
               </div>

               <div className="bg-[#0b1b2b] p-4 rounded-xl flex items-center gap-3">
                  <FiMapPin className="text-cyan-400" />
                  <div>
                     <p className="text-xs text-gray-400">ATELIER</p>
                     <p className="text-sm">{address}</p>
                  </div>
               </div>

            </div>

            {/* SOCIAL ACTIONS */}
            <div className="flex justify-center gap-6 mt-6">
               <button className="bg-[#0b1b2b] p-3 rounded-full">
                  <FiShare2 />
               </button>

               <button className="bg-[#0b1b2b] p-3 rounded-full">
                  <FiCamera />
               </button>

               <button className="bg-[#0b1b2b] p-3 rounded-full">
                  <FiMail />
               </button>
            </div>

            {/* SAVE CONTACT */}
            <button className="mt-6 w-full bg-cyan-300 text-black font-semibold py-4 rounded-xl flex items-center justify-center gap-2">
               <FiUserPlus />
               SAVE CONTACT
            </button>

         </div>
      </div>
   );
};

export default JewelryLuxury;
