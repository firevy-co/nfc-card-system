import React from "react";
import {
   FiTriangle,
   FiPhone,
   FiMail,
   FiGlobe,
   FiMapPin,
   FiInstagram,
   FiTwitter,
   FiYoutube,
   FiLinkedin,
   FiUserPlus,
   FiClock,
   FiShield,
   FiCheckCircle,
   FiArrowRight,
} from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

/* INFO LINK */
const PrimeLink = ({ icon: Icon, label, value, href }) => {
   if (!value || value === "" || value.includes("resolving")) return null;

   const Comp = href ? "a" : "div";

   return (
      <Comp
         href={href}
         target={href && href.startsWith("http") ? "_blank" : undefined}
         rel={href && href.startsWith("http") ? "noopener noreferrer" : undefined}
         className="flex items-center justify-between bg-slate-50 rounded-2xl px-5 py-4 hover:bg-slate-100 transition-all"
      >
         <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-700">
               <Icon size={16} />
            </div>

            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {label}
               </p>
               <p className="text-sm font-bold text-slate-800 truncate max-w-[130px]">
                  {value}
               </p>
            </div>
         </div>

         {href && <FiArrowRight className="text-slate-400" />}
      </Comp>
   );
};

const PrimeSocial = ({ icon: Icon, href }) => {
   if (!href) return null;

   return (
      <a
         href={href}
         target="_blank"
         rel="noopener noreferrer"
         className="w-12 h-12 rounded-xl bg-slate-50 hover:bg-blue-600 text-slate-600 hover:text-white flex items-center justify-center transition-all shadow-sm"
      >
         <Icon size={18} />
      </a>
   );
};

const PrimeService = ({ userData }) => {
   const {
      displayName = "Prime Service",
      email = "hello@primeservice.com",
      phone = "+91 99999 99999",
      website = "https://www.primeservice.com",
      address = "Ahmedabad, Gujarat",
      youtube,
      linkedin,
      twitter,
      instagram,
      logo,
      timing = "Open • 9 AM to 9 PM",
      experience = "12+ Years Experience",
   } = userData || {};

   const services = [
      "AC Repairing",
      "Fridge Repair",
      "Washing Machine",
      "Electrical Work",
   ];

   /* NEW IMAGES */
   const gallery = [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=900&q=80",
   ];

   return (
      <div className="min-h-screen bg-white md:bg-neutral-950 flex justify-center font-['Inter',sans-serif]">
         <div className="w-full max-w-sm min-h-screen bg-white shadow-2xl overflow-hidden">

            {/* HERO */}
            <div className="relative h-52">
               <img
                  src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=80"
                  alt="Service Team"
                  className="w-full h-full object-cover"
               />

               <div className="absolute inset-0 bg-slate-900/40"></div>

               <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                     <p className="text-white/80 text-xs uppercase tracking-[0.25em] font-bold">
                        Premium Service
                     </p>

                     <h1 className="text-white text-2xl font-black italic mt-1">
                        {displayName}
                     </h1>
                  </div>

                  <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-xl overflow-hidden">
                     {logo ? (
                        <img
                           src={logo}
                           alt="Logo"
                           className="w-full h-full object-cover rounded-xl"
                        />
                     ) : (
                        <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center text-white">
                           <FiTriangle size={28} />
                        </div>
                     )}
                  </div>
               </div>
            </div>

            <div className="px-4 py-5">

               {/* QUICK INFO */}
               <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-2xl p-4 text-center">
                     <FiClock className="mx-auto text-blue-600 mb-2" />
                     <p className="text-[11px] font-black text-slate-700">{timing}</p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 text-center">
                     <FiShield className="mx-auto text-blue-600 mb-2" />
                     <p className="text-[11px] font-black text-slate-700">{experience}</p>
                  </div>
               </div>

               {/* CONTACT */}
               <div className="space-y-3 mt-5">
                  <a
                     href={`tel:${phone}`}
                     className="flex items-center justify-between bg-blue-600 text-white rounded-2xl px-5 py-4 shadow-lg"
                  >
                     <div className="flex items-center gap-3">
                        <FiPhone />
                        <span className="font-black uppercase text-[11px] tracking-widest">
                           Call Now
                        </span>
                     </div>

                     <span className="text-sm font-bold">{phone}</span>
                  </a>

                  <PrimeLink icon={FiMail} label="Email" value={email} href={`mailto:${email}`} />
                  <PrimeLink icon={FiGlobe} label="Website" value={website} href={website} />
                  <PrimeLink icon={FiMapPin} label="Location" value={address} />
               </div>

               {/* NEW IMAGE SECTION */}
               <div className="mt-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 mb-3">
                     Our Work Gallery
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                     {gallery.map((img, index) => (
                        <div
                           key={index}
                           className="rounded-2xl overflow-hidden bg-slate-100 shadow-sm"
                        >
                           <img
                              src={img}
                              alt="Service"
                              className="w-full h-28 object-cover hover:scale-110 transition-all duration-500"
                           />
                        </div>
                     ))}
                  </div>
               </div>

               {/* SERVICES */}
               <div className="mt-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 mb-3">
                     Services
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                     {services.map((item, index) => (
                        <div key={index} className="bg-slate-50 rounded-2xl p-4 text-center">
                           <FiCheckCircle className="mx-auto text-blue-600 mb-2" />
                           <p className="text-[11px] font-black text-slate-700">{item}</p>
                        </div>
                     ))}
                  </div>
               </div>

               {/* SOCIAL */}
               <div className="flex justify-center gap-2 flex-wrap mt-6">
                  <PrimeSocial icon={FiInstagram} href={instagram} />
                  <PrimeSocial icon={FiTwitter} href={twitter} />
                  <PrimeSocial icon={FiYoutube} href={youtube} />
                  <PrimeSocial icon={FiLinkedin} href={linkedin} />
               </div>

               {/* SAVE CONTACT */}
               <button
                  onClick={() => downloadVCard(userData)}
                  className="w-full mt-6 bg-slate-900 text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-[0.25em] text-[11px]"
               >
                  <FiUserPlus size={18} />
                  Save Contact
               </button>

               <div className="mt-7">
                  <PoweredBy />
               </div>

            </div>
         </div>
      </div>
   );
};

export default PrimeService;