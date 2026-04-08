import React from "react";
import {
   FiShare2,
   FiHome,
   FiMapPin,
   FiPhone,
   FiMail,
   FiGlobe,
   FiUserPlus,
   FiArrowRight,
} from "react-icons/fi";

const ModernRealty = ({ userData }) => {
   const {
      displayName = "Apex Reality Group",
      website = "www.apexrealty.com",
      email = "listings@apexrealty.com",
      phone = "+1 555-REALEST",
      address = "123 Skyline Terrace, New York",
   } = userData || {};

   return (
      <div className="min-h-screen bg-zinc-50 flex justify-center items-start py-8 px-4 text-zinc-900 font-['Plus_Jakarta_Sans']">
         <div className="w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-zinc-200">
            
            {/* HERO SECTION */}
            <div className="relative h-48 bg-zinc-900">
               <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa" 
                  className="w-full h-full object-cover opacity-70"
                  alt="Modern House"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
               <div className="absolute bottom-4 left-6">
                  <div className="flex items-center gap-2 text-white bg-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
                     <FiHome size={10} />
                     PREMIUM LISTINGS
                  </div>
                  <h1 className="text-xl font-bold text-white tracking-tight leading-none uppercase">
                     {displayName}
                  </h1>
               </div>
            </div>

            <div className="p-6">
               <p className="text-[11px] text-zinc-500 font-medium tracking-wide uppercase mb-6">
                  CURATING EXTRAORDINARY SPACES • REAL ESTATE EXCELLENCE
               </p>

               {/* FEATURED PROPERTIES */}
               <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="relative rounded-2xl overflow-hidden h-24">
                     <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750" className="w-full h-full object-cover" alt="Luxury Villa" />
                     <div className="absolute bottom-2 left-2 text-white text-[8px] font-black uppercase bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">Luxe Villa</div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden h-24">
                     <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858" className="w-full h-full object-cover" alt="Modern Loft" />
                     <div className="absolute bottom-2 left-2 text-white text-[8px] font-black uppercase bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">Modern Loft</div>
                  </div>
               </div>

               {/* CONTACT STACK */}
               <div className="space-y-3">
                  <div className="group bg-zinc-50 hover:bg-blue-50 p-4 rounded-2xl transition-all border border-transparent hover:border-blue-100 flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                        <FiGlobe size={18} />
                     </div>
                     <div className="flex-1">
                        <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">Digital Portfolio</p>
                        <p className="text-sm font-semibold">{website}</p>
                     </div>
                     <FiArrowRight className="text-zinc-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>

                  <div className="group bg-zinc-50 hover:bg-green-50 p-4 rounded-2xl transition-all border border-transparent hover:border-green-100 flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-green-600 transition-colors group-hover:bg-green-600 group-hover:text-white">
                        <FiPhone size={18} />
                     </div>
                     <div className="flex-1">
                        <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">Connect Directly</p>
                        <p className="text-sm font-semibold">{phone}</p>
                     </div>
                     <FiArrowRight className="text-zinc-300 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                  </div>

                  <div className="group bg-zinc-50 hover:bg-zinc-100 p-4 rounded-2xl transition-all border border-transparent hover:border-zinc-200 flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-zinc-600 transition-colors group-hover:bg-zinc-900 group-hover:text-white">
                        <FiMapPin size={18} />
                     </div>
                     <div className="flex-1">
                        <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">Our Office</p>
                        <p className="text-sm font-semibold">{address}</p>
                     </div>
                     <FiArrowRight className="text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all" />
                  </div>
               </div>

               {/* PRIMARY CTA */}
               <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 transition-all uppercase tracking-widest text-xs">
                  <FiUserPlus size={18} />
                  Book Viewing
               </button>

            </div>
         </div>
      </div>
   );
};

export default ModernRealty;
