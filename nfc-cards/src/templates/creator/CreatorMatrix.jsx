import React from "react";
import {
   FiPhone,
   FiMail,
   FiGlobe,
   FiLinkedin,
   FiTwitter,
   FiInstagram,
   FiMapPin,
   FiUserPlus,
   FiPlay,
   FiUsers,
   FiEye,
   FiHeart,
   FiShare2
} from "react-icons/fi";

import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

/* ===========================
   FALLBACK IMAGES
=========================== */

const defaultBanner =
   "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80";

const defaultProfile =
   "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=500&q=80";

const contentImages = [
   "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=700&q=80",
   "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=700&q=80",
   "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&w=700&q=80"
];

/* ===========================
   COMPONENTS
=========================== */

const StatCard = ({ icon: Icon, label, value }) => (
   <div className="bg-white p-4 text-center">
      <Icon className="mx-auto text-indigo-500 mb-2" size={18} />
      <p className="font-bold text-gray-800">{value}</p>
      <p className="text-[10px] text-gray-400 uppercase tracking-widest">
         {label}
      </p>
   </div>
);

const SocialCard = ({ icon: Icon, href }) => {
   if (!href) return null;

   return (
      <a
         href={href}
         target="_blank"
         rel="noopener noreferrer"
         className="w-11 h-11 flex items-center justify-center bg-white hover:bg-indigo-500 hover:text-white transition-all"
      >
         <Icon size={18} />
      </a>
   );
};

const InfoRow = ({ icon: Icon, value, href }) => {
   if (!value) return null;

   const Wrapper = href ? "a" : "div";

   return (
      <Wrapper
         href={href || undefined}
         target={href ? "_blank" : undefined}
         className="flex items-center gap-3 bg-white p-3 text-sm text-gray-700"
      >
         <Icon size={16} className="text-indigo-500" />
         <span className="truncate">{value}</span>
      </Wrapper>
   );
};

const ContentCard = ({ title, views, likes, img }) => (
   <div className="bg-white overflow-hidden">
      <img src={img} alt="content" className="w-full h-32 object-cover" />

      <div className="p-3">
         <h3 className="font-bold text-sm text-gray-800 truncate mb-2">
            {title}
         </h3>

         <div className="flex justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
               <FiEye /> {views}
            </span>
            <span className="flex items-center gap-1">
               <FiHeart /> {likes}
            </span>
         </div>
      </div>
   </div>
);

/* ===========================
   MAIN COMPONENT
=========================== */

const CreatorMatrix = ({ userData }) => {
   const {
      displayName,
      email,
      phone,
      website,
      address,
      linkedin,
      twitter,
      instagram,
      logo
   } = userData || {};

   const banner = defaultBanner;
   const profile = logo || defaultProfile;

   return (
      <div className="min-h-screen bg-white">

         <div className="w-full max-w-md mx-auto">

            {/* HERO */}
            <div className="relative h-44">
               <img
                  src={banner}
                  alt="banner"
                  className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* PROFILE */}
            <div className="-mt-14 flex flex-col items-center px-4 text-center">
               <div className="w-24 h-24 rounded-xl bg-white z-10 shadow-md overflow-hidden flex items-center justify-center p-2">
                  <img
                     src={profile}
                     alt="profile"
                     className="w-full h-full object-contain"
                  />
               </div>

               <h1 className="text-lg font-black text-gray-800 mt-3 uppercase">
                  {displayName || "Creator Name"}
               </h1>

               <p className="text-gray-400 text-xs">
                  Digital Creator • Influencer
               </p>
            </div>

            {/* BODY */}
            <div className="p-4 space-y-5">

               {/* STATS */}
               <div className="grid grid-cols-3 gap-2">
                  <StatCard icon={FiUsers} label="Followers" value="120K" />
                  <StatCard icon={FiEye} label="Views" value="2.4M" />
                  <StatCard icon={FiShare2} label="Shares" value="18K" />
               </div>

               {/* CONTACT */}
               <div className="space-y-2">
                  <InfoRow icon={FiPhone} value={phone} href={`tel:${phone}`} />
                  <InfoRow icon={FiMail} value={email} href={`mailto:${email}`} />
                  <InfoRow icon={FiGlobe} value={website} href={website} />
                  <InfoRow icon={FiMapPin} value={address} />
               </div>

               {/* SOCIAL */}
               <div className="flex justify-around">

                  <SocialCard icon={FiInstagram} href={instagram} />
                  <SocialCard icon={FiTwitter} href={twitter} />
                  <SocialCard icon={FiLinkedin} href={linkedin} />
               </div>

               {/* CONTENT */}
               <div>
                  <h2 className="text-sm font-bold text-gray-700 mb-2 uppercase">
                     Latest Content
                  </h2>

                  <div className="grid gap-2">
                     <ContentCard title="Video Growth Tips" views="120K" likes="8K" img={contentImages[0]} />
                     <ContentCard title="Instagram Strategy" views="90K" likes="6K" img={contentImages[1]} />
                     <ContentCard title="Content Planning" views="75K" likes="5K" img={contentImages[2]} />
                  </div>
               </div>

               {/* CTA */}
               <button
                  onClick={() => downloadVCard(userData)}
                  className="w-full py-3 bg-indigo-600 text-white font-bold text-sm uppercase flex items-center justify-center gap-2"
               >
                  <FiUserPlus /> Save Contact
               </button>

               <PoweredBy />
            </div>
         </div>
      </div>
   );
};

export default CreatorMatrix;