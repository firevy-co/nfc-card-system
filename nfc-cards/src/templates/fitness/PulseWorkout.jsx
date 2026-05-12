import React from "react";
import {
   FiActivity,
   FiPhone,
   FiMail,
   FiMapPin,
   FiCalendar,
   FiGlobe,
   FiInstagram,
   FiTwitter,
   FiLinkedin,
   FiUserPlus,
   FiArrowRight,
   FiAward,
   FiClock,
   FiTarget
} from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

/* ===========================
   INFO LINK
=========================== */
const PulseLink = ({ icon: Icon, label, value, href }) => {
   if (!value || value === "" || value.includes("resolving")) return null;

   const Comp = href ? "a" : "div";

   return (
      <Comp
         href={href || null}
         target={href ? "_blank" : undefined}
         rel={href ? "noopener noreferrer" : undefined}
         className="flex items-center justify-between bg-white/5 rounded-2xl px-4 py-4 hover:bg-white/10 transition-all"
      >
         <div className="flex items-center gap-3 text-lime-400">
            <Icon size={18} />
            <span className="text-xs uppercase tracking-widest font-bold">
               {label}
            </span>
         </div>

         <span className="text-white text-sm font-semibold truncate max-w-[150px] text-right">
            {value}
         </span>
      </Comp>
   );
};

/* ===========================
   SOCIAL BUTTON
=========================== */
const PulseSocial = ({ icon: Icon, href }) => {
   if (!href) return null;

   return (
      <a
         href={href || null}
         target="_blank"
         rel="noopener noreferrer"
         className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-lime-400 hover:text-black transition-all"
      >
         <Icon size={17} />
      </a>
   );
};

/* ===========================
   MAIN COMPONENT
=========================== */
const PulseWorkout = ({ userData }) => {
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

   /* Gym Images */
   const banner =
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80";

   const gymOne =
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=700&q=80";

   const gymTwo =
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=700&q=80";

   return (
      <div className="min-h-screen bg-black text-white font-['Mulish',sans-serif]">

         <div className="w-full max-w-sm mx-auto bg-[#0f0f0f] min-h-screen overflow-hidden">

            {/* HERO */}
            <div className="relative h-[380px]">

               <img
                  src={banner}
                  alt="Gym"
                  className="w-full h-full object-cover"
               />

               <div className="absolute inset-0 bg-black/60"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent"></div>

               {/* Dynamic Logo */}
               <div className="absolute top-6 left-5">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/20 bg-black">
                     {logo ? (
                        <img
                           src={logo}
                           alt="logo"
                           className="w-full h-full object-cover"
                        />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center">
                           <FiActivity className="text-lime-400" size={24} />
                        </div>
                     )}
                  </div>
               </div>

               {/* Bottom Content */}
               <div className="absolute bottom-6 left-5 right-5">

                  <p className="text-lime-400 uppercase text-xs tracking-[0.3em] mb-2 font-bold">
                     Fitness Coach
                  </p>

                  <h1 className="text-3xl font-black uppercase leading-none">
                     {displayName || "Pulse Workout"}
                  </h1>

                  <p className="text-sm text-gray-300 mt-3 leading-6">
                     Build strength, burn fat and transform your body with professional
                     gym training programs.
                  </p>

                  <div className="flex gap-2 mt-4">
                     <PulseSocial icon={FiInstagram} href={instagram || null} />

                     <PulseSocial icon={FiTwitter} href={twitter || null} />
                     <PulseSocial icon={FiLinkedin} href={linkedin || null} />
                  </div>
               </div>
            </div>

            {/* CONTENT */}
            <div className="px-5 py-6 space-y-5">

               {/* Stats */}
               <div className="grid grid-cols-3 gap-3">

                  <div className="bg-white/5 rounded-2xl p-4 text-center">
                     <FiAward className="mx-auto text-lime-400 mb-2" />
                     <h3 className="font-black text-lg">10+</h3>
                     <p className="text-[10px] text-gray-400 uppercase">Years</p>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-4 text-center">
                     <FiTarget className="mx-auto text-lime-400 mb-2" />
                     <h3 className="font-black text-lg">500+</h3>
                     <p className="text-[10px] text-gray-400 uppercase">Clients</p>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-4 text-center">
                     <FiClock className="mx-auto text-lime-400 mb-2" />
                     <h3 className="font-black text-lg">24/7</h3>
                     <p className="text-[10px] text-gray-400 uppercase">Support</p>
                  </div>

               </div>

               {/* Contact Buttons */}
               <div className="grid grid-cols-2 gap-3">

                  {phone && (
                     <a
                        href={`tel:${phone}`}
                        className="bg-lime-400 text-black rounded-2xl py-4 flex flex-col items-center gap-2 font-bold"
                     >
                        <FiPhone size={18} />
                        <span className="text-xs uppercase">Call Now</span>
                     </a>
                  )}

                  {email && (
                     <a
                        href={`mailto:${email}`}
                        className="bg-white text-black rounded-2xl py-4 flex flex-col items-center gap-2 font-bold"
                     >
                        <FiMail size={18} />
                        <span className="text-xs uppercase">Email</span>
                     </a>
                  )}

               </div>

               {/* Links */}
               <PulseLink
                  icon={FiGlobe}
                  label="Website"
                  value={website || "www.pulsefitness.com"}
                  href={website || null}
               />

               <PulseLink
                  icon={FiMapPin}
                  label="Location"
                  value={address || "Berlin, Germany"}
               />

               {/* Services */}
               <div className="grid grid-cols-2 gap-3">

                  <div className="rounded-2xl overflow-hidden bg-white/5">
                     <img
                        src={gymOne}
                        alt="Workout"
                        className="h-28 w-full object-cover"
                     />
                     <div className="p-4">
                        <h3 className="font-bold">Body Building</h3>
                        <p className="text-xs text-gray-400 mt-2">
                           Muscle gain & advanced strength programs.
                        </p>
                     </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden bg-white/5">
                     <img
                        src={gymTwo}
                        alt="Fat Loss"
                        className="h-28 w-full object-cover"
                     />
                     <div className="p-4">
                        <h3 className="font-bold">Fat Loss</h3>
                        <p className="text-xs text-gray-400 mt-2">
                           Cardio + nutrition based transformation.
                        </p>
                     </div>
                  </div>

               </div>

               {/* CTA */}
               <button
                  onClick={() => downloadVCard(userData)}
                  className="w-full bg-lime-400 text-black rounded-2xl py-5 font-black uppercase tracking-widest flex items-center justify-center gap-3"
               >
                  <FiUserPlus size={18} />
                  Add To Contact
               </button>

               {/* Booking */}
               {website && (
                  <a
                     href={website || null}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="w-full bg-white/5 rounded-2xl py-5 flex items-center justify-center gap-2 uppercase text-sm font-bold hover:bg-white/10 transition-all"
                  >
                     Book Session <FiArrowRight />
                  </a>
               )}

               {/* Hours */}
               <div className="bg-white/5 rounded-2xl p-5">
                  <h3 className="font-bold mb-4">Opening Hours</h3>

                  <div className="space-y-2 text-sm text-gray-300">
                     <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>06:00 - 22:00</span>
                     </div>

                     <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>07:00 - 20:00</span>
                     </div>

                     <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>Closed</span>
                     </div>
                  </div>
               </div>

               <PoweredBy />
            </div>
         </div>
      </div>
   );
};

export default PulseWorkout;