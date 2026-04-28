import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';

const ClassicRefined = ({ userData }) => {
   const {
      displayName, email, role, mobileNumber, phone,
      companyName, designation, website, address, city,
      linkedin, instagram, facebook, twitter, bio, avatar, logo,
      coverPhoto, tags
   } = userData || {};

   const displayPhone = mobileNumber || phone;
   const displayRole = designation || role || "Creative Director";
   const finalAddress = address || city;

   const bgImage = coverPhoto || "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80";

   const expertiseTags = tags && tags.length > 0 ? tags : ["Brand Strategy", "UX Design", "Visual Identity", "Editorial"];

   const getSocialUrl = (platform, value) => {
      if (!value) return null;
      if (value.startsWith('http')) return value;
      switch (platform) {
         case 'linkedin': return `https://linkedin.com/in/${value.replace('@', '')}`;
         case 'instagram': return `https://instagram.com/${value.replace('@', '')}`;
         case 'twitter': return `https://twitter.com/${value.replace('@', '')}`;
         case 'facebook': return `https://facebook.com/${value}`;
         case 'website': return `https://${value}`;
         default: return `https://${value}`;
      }
   };

   return (
      <div className="min-h-screen bg-[#0a0a0a] font-sans pb-16 text-zinc-200 selection:bg-[#c2a05f]/30">

         {/* Banner */}
         <div
            className="w-full h-56 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${bgImage})` }}
         >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent"></div>
         </div>

         <div className="px-6 max-w-md mx-auto relative z-10 -mt-16 flex flex-col items-center">
            {/* Profile Image */}
            <div className="w-28 h-28 rounded-full overflow-hidden border-[2px] border-[#c2a05f] bg-[#0a0a0a] shadow-[0_0_30px_rgba(194,160,95,0.15)] mb-5 flex items-center justify-center p-[3px]">
               <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 flex items-center justify-center">
                  {avatar ? (
                     <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : logo ? (
                     <img src={logo} alt="Logo" className="w-full h-full object-contain p-2" />
                  ) : (
                     <span className="text-4xl text-zinc-600 uppercase font-light">{(displayName || 'J')[0]}</span>
                  )}
               </div>
            </div>

            {/* Identity Info */}
            <h1 className="text-2xl font-serif tracking-[0.15em] text-white uppercase text-center mb-1">
               {displayName || 'Julian Sterling'}
            </h1>
            {companyName && (
               <p className="text-[13px] text-zinc-400 mt-2 text-center tracking-wide font-serif">
                  {companyName || 'Sterling & Co.'}
               </p>
            )}

            {/* Action Buttons */}
            <div className="flex w-full gap-4 mt-8">
               <button
                  onClick={() => downloadVCard(userData)}
                  className="flex-1 py-3.5 border border-[#c2a05f] text-[#c2a05f] hover:bg-[#c2a05f] hover:text-black transition-all rounded-[0.25rem] flex items-center justify-center gap-2 text-[10px] font-bold tracking-[0.15em] uppercase"
               >
                  <FiIcons.FiCreditCard size={14} />
                  Save Card
               </button>
               <button
                  onClick={() => displayPhone ? window.open(`https://wa.me/${displayPhone.replace(/[^0-9+]/g, '')}`) : email ? window.open(`mailto:${email}`) : null}
                  className="flex-1 py-3.5 border border-zinc-800 bg-[#141414] text-zinc-300 hover:border-zinc-600 transition-all rounded-[0.25rem] flex items-center justify-center gap-2 text-[10px] font-bold tracking-[0.15em] uppercase shadow-md"
               >
                  <FiIcons.FiSend size={14} />
                  Message
               </button>
            </div>

            {/* Digital HQ */}
            <div className="w-full mt-6 bg-[#141414] border border-[#2a2a2a] p-5 rounded-[0.25rem] shadow-lg">
               <p className="text-[9px] font-bold tracking-[0.15em] text-[#c2a05f] uppercase mb-2">Digital HQ</p>
               {email ? (
                  <a href={`mailto:${email}`} className="text-lg font-serif text-zinc-200 hover:text-white transition-colors truncate block">
                     {email}
                  </a>
               ) : (
                  <p className="text-lg font-serif text-zinc-500 italic">julian@sterling.co</p>
               )}
            </div>

            {/* 2-Column Grid */}
            <div className="w-full grid grid-cols-2 gap-4 mt-4">
               <div className="bg-[#141414] border border-[#2a2a2a] p-5 rounded-[0.25rem] shadow-lg flex flex-col justify-between">
                  <FiIcons.FiPhoneCall size={18} className="text-[#c2a05f] mb-6" />
                  <div>
                     <p className="text-[8px] font-bold tracking-[0.15em] text-zinc-600 uppercase mb-1">Direct</p>
                     {displayPhone ? (
                        <a href={`tel:${displayPhone}`} className="text-[13px] text-zinc-200 hover:text-white transition-colors font-medium">
                           {displayPhone}
                        </a>
                     ) : (
                        <span className="text-[13px] text-zinc-200">+1 212 555 0198</span>
                     )}
                  </div>
               </div>

               <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(finalAddress || "Manhattan, NY")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="bg-[#141414] border border-[#2a2a2a] p-5 rounded-[0.25rem] shadow-lg flex flex-col justify-between hover:border-zinc-600 transition-all cursor-pointer group block"
               >
                  <FiIcons.FiMapPin size={18} className="text-[#c2a05f] mb-6 group-hover:scale-110 transition-transform" />
                  <div>
                     <p className="text-[8px] font-bold tracking-[0.15em] text-zinc-600 uppercase mb-1">Studio</p>
                     <p className="text-[13px] text-zinc-200 font-medium truncate group-hover:text-white transition-colors">
                        {finalAddress || "Manhattan, NY"}
                     </p>
                  </div>
               </a>
            </div>

            {/* Website Button */}
            {website && (
               <a
                  href={getSocialUrl('website', website)}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full mt-4 bg-[#141414] border border-[#2a2a2a] p-5 rounded-[0.25rem] shadow-lg flex items-center justify-between hover:border-zinc-600 transition-all cursor-pointer group"
               >
                  <div>
                     <p className="text-[9px] font-bold tracking-[0.15em] text-[#c2a05f] uppercase mb-1">Official Website</p>
                     <p className="text-lg font-[Mulish] text-zinc-200 group-hover:text-white transition-colors truncate">
                        Visit site
                     </p>
                  </div>
                  <FiIcons.FiArrowRight size={20} className="text-[#c2a05f] group-hover:translate-x-1 transition-transform" />
               </a>
            )}

            {/* Portfolio & Presence */}
            <div className="w-full mt-10 text-center">
               <p className="text-[9px] font-bold tracking-[0.15em] text-zinc-500 uppercase mb-6">Portfolio & Presence</p>
               <div className="flex justify-center gap-8 items-center flex-wrap">
                  {[
                     { icon: FiIcons.FiLinkedin, platform: 'linkedin', val: linkedin },
                     { icon: FiIcons.FiInstagram, platform: 'instagram', val: instagram },
                     { icon: FiIcons.FiTwitter, platform: 'twitter', val: twitter },
                     { icon: FiIcons.FiFacebook, platform: 'facebook', val: facebook },
                  ].map((social, idx) => social.val && (
                     <a key={idx} href={getSocialUrl(social.platform, social.val)} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-[#c2a05f] transition-colors">
                        <social.icon size={22} />
                     </a>
                  ))}
                  {!linkedin && !instagram && !twitter && !facebook && (
                     <span className="text-[10px] text-zinc-600 italic">No social links connected</span>
                  )}
               </div>
            </div>

            {/* Core Expertise */}
            <div className="w-full mt-12 text-center">
               <p className="text-[9px] font-bold tracking-[0.15em] text-[#c2a05f] uppercase mb-4">Core Expertise</p>
               <div className="flex flex-wrap justify-center gap-3">
                  {expertiseTags.map((tag, idx) => (
                     <span
                        key={idx}
                        className="px-4 py-2 bg-transparent border border-[#2a2a2a] rounded-full text-[9px] font-bold tracking-[0.1em] text-zinc-400 uppercase"
                     >
                        {tag}
                     </span>
                  ))}
               </div>
            </div>

            {/* Bio / Quote */}
            <div className="w-full mt-12 px-4 text-center">
               <p className="text-[13px] leading-relaxed text-zinc-500 font-serif italic">
                  "{bio || "Design is the silent ambassador of your brand."}"
               </p>
            </div>

            {/* Footer */}
            <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block mt-12 text-[8px] font-black tracking-[0.5em] text-zinc-600 hover:text-[#c2a05f] transition-colors uppercase text-center pb-8">
               Powered by Cardyn
            </a>

         </div>
      </div>
   );
};
export default ClassicRefined;
