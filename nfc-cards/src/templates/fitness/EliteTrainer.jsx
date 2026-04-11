import React from "react";
import {
   FiShare2,
   FiZap,
   FiActivity,
   FiMapPin,
   FiPhone,
   FiMail,
   FiGlobe,
   FiUserPlus,
   FiInstagram,
   FiYoutube,
} from "react-icons/fi";

const EliteTrainer = ({ userData }) => {
   const {
      displayName = "Elite Performance Lab",
      website = "www.elitetrainer.com",
      email = "coach@elitetrainer.com",
      phone = "+44 20 7946 0000",
      address = "Gymbox, London",
   } = userData || {};

   return (
      <div className="min-h-screen bg-[#050505] flex justify-center items-start py-8 px-4 text-white font-['Plus_Jakarta_Sans']">
         <div className="w-full max-w-sm bg-gradient-to-br from-[#111] to-[#000] rounded-[3.5rem] shadow-2xl overflow-hidden border border-[#222] p-8 relative">
            
            {/* POWER STRIPE DECORATION */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/10 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-lime-500/10 rounded-full blur-[80px]"></div>

            {/* COACH HEADER */}
            <div className="flex flex-col items-center text-center mt-4">
               <div className="w-24 h-24 bg-[#111] border-2 border-lime-500 rounded-3xl flex items-center justify-center mb-6 rotate-3 hover:rotate-0 transition-transform duration-500 shadow-lg shadow-lime-500/20">
                  <FiZap size={32} className="text-lime-500 fill-lime-500/10" />
               </div>

               <h1 className="text-4xl font-black text-white tracking-tight capitalize leading-none mb-1 italic">
                  {displayName}
               </h1>

               <div className="flex items-center gap-2 text-lime-500 rounded-full text-[10px] font-black capitalize tracking-[0.4em] mb-10 italic">
                  Level 4 • Tactical Trainer
               </div>
            </div>

            {/* METRICS STACK */}
            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="p-5 bg-[#111] rounded-3xl border border-[#222] flex flex-col items-center gap-2 group transition-all hover:bg-lime-500">
                  <span className="text-[9px] font-black capitalize tracking-widest text-zinc-500 group-hover:text-black">Availability</span>
                  <span className="text-sm font-black group-hover:text-black">10 spots left</span>
               </div>
               <div className="p-5 bg-[#111] rounded-3xl border border-[#222] flex flex-col items-center gap-2 group transition-all hover:bg-lime-500">
                  <span className="text-[9px] font-black capitalize tracking-widest text-zinc-500 group-hover:text-black">Specialty</span>
                  <span className="text-sm font-black group-hover:text-black">HYROX Pro</span>
               </div>
            </div>

            {/* SOCIAL FEED CTA */}
            <div className="flex gap-4 mb-10">
               <button className="flex-1 h-14 bg-white text-black rounded-full shadow-lg flex items-center justify-center gap-3 font-black text-[10px] capitalize tracking-widest hover:bg-lime-500 transition-colors">
                  <FiInstagram size={20} />
                  @Coach_Elite
               </button>
               <button className="w-14 h-14 bg-[#111] rounded-full border border-[#222] flex items-center justify-center text-white hover:text-red-500 transition-colors group">
                  <FiYoutube size={24} className="group-hover:scale-110 transition-transform" />
               </button>
            </div>

            {/* ACTION STACK */}
            <button className="w-full h-16 bg-lime-500 hover:bg-lime-600 text-black font-black flex items-center justify-center gap-3 capitalize tracking-widest text-xs rounded-3xl mb-8 transform active:scale-95 transition-all shadow-xl shadow-lime-500/20">
               <FiActivity size={20} />
               Start Protocol
            </button>

            {/* CONTACT MINIMALIST STACK */}
            <div className="space-y-4 mb-4">
               <div className="group flex items-center gap-5 p-4 bg-[#111] rounded-[2rem] border border-[#222] transition-all hover:border-lime-500/40">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-lime-500">
                     <FiGlobe size={20} />
                  </div>
                  <div className="flex-1">
                     <p className="text-[8px] text-zinc-600 font-black capitalize tracking-widest leading-none mb-1">Elite Portal</p>
                     <p className="text-xs font-bold font-mono tracking-tighter">{website}</p>
                  </div>
               </div>
               <div className="group flex items-center gap-5 p-4 bg-[#111] rounded-[2rem] border border-[#222] transition-all hover:border-lime-500/40">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-lime-500">
                     <FiPhone size={20} />
                  </div>
                  <div className="flex-1">
                     <p className="text-[8px] text-zinc-600 font-black capitalize tracking-widest leading-none mb-1">Urgent Wire</p>
                     <p className="text-xs font-bold font-mono tracking-tighter">{phone}</p>
                  </div>
               </div>
            </div>

         </div>
      </div>
   );
};

export default EliteTrainer;
