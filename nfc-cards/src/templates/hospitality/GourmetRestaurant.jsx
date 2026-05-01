import React, { useState } from "react";
import {
   FiMail,
   FiPhone,
   FiMapPin,
   FiGlobe,
   FiCalendar,
   FiClock,
   FiFacebook,
   FiTwitter,
   FiLinkedin,
   FiInstagram,
   FiCopy,
   FiCheck,
   FiHeart,
   FiShield,
   FiUsers,
   FiPlusCircle,
} from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

const GourmetRestaurant = ({ userData }) => {
   const {
      displayName,
      website,
      email,
      phone,
      address,
      instagram,
      linkedin,
      facebook,
      twitter,
      logo,
      coverImage,
      gallery,
      designation,
      bio,
   } = userData || {};

   const [copied, setCopied] = useState(false);

   const primary = "#0B2E4F";
   const lightBg = "#F5F9FC";

   const heroImage =
      coverImage ||
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80";

   const profileImage =
      logo ||
      "https://images.unsplash.com/photo-1612277795421-9bc7706a4a41?auto=format&fit=crop&w=500&q=80";

   const images = gallery || [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
      "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=800",
   ];

   const copyLink = () => {
      navigator.clipboard.writeText(
         website || "https://vcard.com/city-care-hospital"
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   return (
      <div
         className="w-full min-h-screen font-['Mulish',sans-serif]"
         style={{ backgroundColor: lightBg }}
      >
         {/* HERO SECTION */}
         <div className="relative h-[320px] overflow-hidden">
            <img
               src={heroImage}
               alt="Hospital"
               className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-[#000]/45"></div>

            <div className="absolute bottom-0 left-0 w-full px-6 pb-6">
               <div className="flex items-end gap-4">
                  <div
                     className="w-24 h-24 rounded-full bg-white p-1 shadow-xl"
                     style={{ border: `3px solid ${primary}` }}
                  >
                     <img
                        src={profileImage}
                        alt="Hospital Logo"
                        className="w-full h-full rounded-full object-cover"
                     />
                  </div>

                  <div className="text-white pb-2">
                     <h1 className="text-2xl font-bold">
                        {displayName || "City Care Hospital"}
                     </h1>
                     <p className="text-sm opacity-90">
                        {designation || "24/7 Multi-Speciality Healthcare"}
                     </p>
                  </div>
               </div>
            </div>
         </div>

         {/* ABOUT */}
         <div className="bg-white px-6 py-6">
            <p className="text-sm text-gray-500 text-center leading-relaxed">
               {bio ||
                  "Providing advanced healthcare services with expert doctors, emergency support, and compassionate patient care."}
            </p>

            <div className="flex justify-center gap-5 mt-5">
               {facebook && (
                  <a href={facebook} style={{ color: primary }}>
                     <FiFacebook size={18} />
                  </a>
               )}
               {twitter && (
                  <a href={twitter} style={{ color: primary }}>
                     <FiTwitter size={18} />
                  </a>
               )}
               {linkedin && (
                  <a href={linkedin} style={{ color: primary }}>
                     <FiLinkedin size={18} />
                  </a>
               )}
               {instagram && (
                  <a href={instagram} style={{ color: primary }}>
                     <FiInstagram size={18} />
                  </a>
               )}
            </div>
         </div>

         {/* CONTACT INFO */}
         <div className="grid grid-cols-2 gap-3 p-4">
            {[
               {
                  icon: <FiMail />,
                  title: "Email",
                  value: email || "support@citycare.com",
               },
               {
                  icon: <FiPhone />,
                  title: "Emergency",
                  value: phone || "+91 98765 43210",
               },
               {
                  icon: <FiGlobe />,
                  title: "Website",
                  value: website || "www.citycare.com",
               },
               {
                  icon: <FiMapPin />,
                  title: "Address",
                  value: address || "Ahmedabad, Gujarat",
               },
            ].map((item, i) => (
               <div
                  key={i}
                  className="rounded-2xl p-4 text-white shadow-lg"
                  style={{ backgroundColor: primary }}
               >
                  <div className="mb-2">{item.icon}</div>
                  <p className="text-[10px] opacity-70">{item.title}</p>
                  <p className="text-xs font-bold truncate">{item.value}</p>
               </div>
            ))}
         </div>

         {/* SERVICES */}
         <div className="bg-white p-5 mt-4">
            <h2
               className="text-center text-lg font-bold mb-5"
               style={{ color: primary }}
            >
               Our Services
            </h2>

            <div className="grid grid-cols-2 gap-3">
               {[
                  { icon: <FiHeart />, name: "Cardiology" },
                  { icon: <FiShield />, name: "Emergency" },
                  { icon: <FiUsers />, name: "Pediatrics" },
                  { icon: <FiPlusCircle />, name: "General Surgery" },
               ].map((item, i) => (
                  <div
                     key={i}
                     className="border rounded-2xl p-4 text-center"
                  >
                     <div
                        className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3"
                        style={{ backgroundColor: "#EAF4FF", color: primary }}
                     >
                        {item.icon}
                     </div>
                     <p className="text-sm font-semibold">{item.name}</p>
                  </div>
               ))}
            </div>
         </div>

         {/* GALLERY */}
         <div className="bg-white p-5 mt-4">
            <h2
               className="text-center text-lg font-bold mb-5"
               style={{ color: primary }}
            >
               Hospital Gallery
            </h2>

            <div className="grid grid-cols-2 gap-3">
               {images.map((img, i) => (
                  <div key={i} className="h-36 rounded-2xl overflow-hidden">
                     <img
                        src={img}
                        alt="Gallery"
                        className="w-full h-full object-cover hover:scale-110 duration-300"
                     />
                  </div>
               ))}
            </div>
         </div>

         {/* APPOINTMENT */}
         <div className="bg-white p-6 mt-4">
            <h2
               className="text-center text-lg font-bold mb-5"
               style={{ color: primary }}
            >
               Book Appointment
            </h2>

            <div className="space-y-3">
               <input
                  placeholder="Patient Name"
                  className="w-full border p-4 rounded-xl text-sm"
               />

               <input
                  placeholder="Phone Number"
                  className="w-full border p-4 rounded-xl text-sm"
               />

               <div className="grid grid-cols-2 gap-3">
                  <div className="border p-4 rounded-xl flex justify-between items-center text-sm">
                     <span>08 May 2026</span>
                     <FiCalendar />
                  </div>

                  <div className="border p-4 rounded-xl flex justify-between items-center text-sm">
                     <span>10:30 AM</span>
                     <FiClock />
                  </div>
               </div>

               <button
                  className="w-full py-4 rounded-xl text-white font-bold"
                  style={{ backgroundColor: primary }}
               >
                  Confirm Booking
               </button>
            </div>
         </div>

         {/* HOURS */}
         <div className="p-6 mt-4">
            <div
               className="rounded-3xl p-6 text-white"
               style={{ backgroundColor: primary }}
            >
               <h2 className="text-center text-lg font-bold mb-5">
                  Working Hours
               </h2>

               {[
                  "Monday - Friday",
                  "Saturday",
                  "Sunday",
               ].map((day, i) => (
                  <div
                     key={i}
                     className="flex justify-between border-b border-white/10 py-3 text-sm"
                  >
                     <span>{day}</span>
                     <span>
                        {day === "Sunday"
                           ? "Emergency Only"
                           : "08:00 AM - 10:00 PM"}
                     </span>
                  </div>
               ))}
            </div>
         </div>

         {/* FOOTER */}
         <div className="bg-white p-6">
            <h2
               className="text-center font-bold mb-4"
               style={{ color: primary }}
            >
               Share Digital Card
            </h2>

            <div className="flex items-center bg-gray-100 rounded-xl p-4 text-sm">
               <span className="truncate flex-1">
                  {website || "https://vcard.com/city-care-hospital"}
               </span>

               <button onClick={copyLink}>
                  {copied ? <FiCheck /> : <FiCopy />}
               </button>
            </div>

            <button
               onClick={() => downloadVCard(userData)}
               className="w-full mt-4 py-4 rounded-xl text-white font-bold"
               style={{ backgroundColor: primary }}
            >
               Save Contact
            </button>

            <div className="mt-5">
               <PoweredBy />
            </div>
         </div>
      </div>
   );
};

export default GourmetRestaurant;