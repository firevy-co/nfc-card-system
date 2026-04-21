import React from "react";
import {
   FiShare2,
   FiZap,
   FiVideo,
   FiTwitter,
   FiTwitch,
   FiGlobe,
   FiUserPlus,
   FiMessageCircle,
   FiHeart,
} from "react-icons/fi";

const DigitalCreator = ({ userData }) => {
   const {
      displayName = "Pixel Nomad",
      website = "www.pixelnomad.media",
      email = "hello@pixelnomad.media",
      phone = "+44 7911 123456",
      address = "The Hub, Berlin",
   } = userData || {};

   return (
      <div className="min-h-screen bg-[#050505] flex justify-center items-start py-10 px-4 text-white font-['Mulish']">
         <div className="w-full max-w-sm bg-gradient-to-t from-[#111] to-[#000] rounded-none shadow-2xl overflow-hidden border-2 border-[#1E90FF] p-8 relative">
            
            {/* RETRO GLITCH DECORATION */}
            <div className="absolute top-4 right-4 text-[#1E90FF]/20 text-[10px] font-mono select-none">SYSTEM.BOOT (0x24)</div>
            <div className="absolute bottom-4 left-4 text-[#1E90FF]/20 text-[10px] font-mono select-none">LOG_PIXEL_NOMAD_VER.1</div>

            {/* AVATAR/LOGO */}
            <div className="flex flex-col items-center text-center mt-6">
               <div className="w-24 h-24 bg-[#111] border-b-4 border-r-4 border-[#1E90FF] flex items-center justify-center mb-8 hover:translate-x-1 hover:translate-y-1 transition-all duration-300">
                  <FiVideo size={40} className="text-[#1E90FF]" />
               </div>

               <h1 className="text-4xl font-black text-white italic tracking-tighter capitalize leading-none mb-1">
                  {displayName}
               </h1>

               <div className="flex items-center gap-2 text-[#1E90FF]/60 px-4 py-1.5 rounded-full text-[10px] font-black capitalize tracking-[0.4em] mb-12">
                  Digital Media Alchemist
               </div>
            </div>

            {/* SOCIAL GRID - GLITCH STYLE */}
            <div className="grid grid-cols-2 gap-4 mb-10">
               <button className="h-20 bg-[#111] border border-white/5 hover:border-[#1E90FF] flex flex-col items-center justify-center group transition-all">
                  <FiTwitter size={24} className="text-zinc-500 group-hover:text-[#1E90FF]" />
                  <span className="text-[8px] font-black capitalize mt-2 opacity-50 group-hover:opacity-100">Live Feed</span>
               </button>
               <button className="h-20 bg-[#111] border border-white/5 hover:border-[#8E44AD] flex flex-col items-center justify-center group transition-all">
                  <FiTwitch size={24} className="text-zinc-500 group-hover:text-[#8E44AD]" />
                  <span className="text-[8px] font-black capitalize mt-2 opacity-50 group-hover:opacity-100">Twitch</span>
               </button>
            </div>

            {/* ACTION STACK */}
            <button className="w-full bg-[#1E90FF] hover:bg-[#1C86EE] text-white font-black py-5 flex items-center justify-center gap-3 transition-all capitalize tracking-[0.3em] text-[10px] mb-8">
               <FiZap size={18} />
               Collaborate Now
            </button>

            {/* CONTACT LINKS - MONO STYLE */}
            <div className="space-y-4 mb-4 font-mono">
               <div className="group flex items-center gap-5 p-4 border border-white/5 bg-[#111] hover:border-[#1E90FF]/30 transition-all">
                  <FiGlobe className="text-[#1E90FF]" />
                  <div className="flex-1 overflow-hidden">
                     <p className="text-[10px] font-bold text-zinc-600 truncate capitalize">Digital HQ</p>
                     <p className="text-[11px] font-bold truncate text-[#1E90FF]">{website}</p>
                  </div>
               </div>
               <div className="group flex items-center gap-5 p-4 border border-white/5 bg-[#111] hover:border-[#1E90FF]/30 transition-all">
                  <FiMessageCircle className="text-[#1E90FF]" />
                  <div className="flex-1 overflow-hidden">
                     <p className="text-[10px] font-bold text-zinc-600 truncate capitalize">Private Node</p>
                     <p className="text-[11px] font-bold truncate text-[#1E90FF]">{email}</p>
                  </div>
               </div>
            </div>


          <div className="mt-8 mb-2 text-center">
            <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black tracking-[0.2em] text-gray-300 hover:text-gray-500 transition-colors uppercase font-mulish">Powered by Cardyn</a>
          </div>
         </div>
      </div>
   );
};

export default DigitalCreator;
