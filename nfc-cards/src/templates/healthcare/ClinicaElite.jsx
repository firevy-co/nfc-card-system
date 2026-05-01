import React, { useState } from "react";
import {
   FiPhone,
   FiMail,
   FiGlobe,
   FiMapPin,
   FiChevronDown,
   FiChevronUp,
   FiStar,
   FiUserPlus,
   FiHeart,
   FiShield,
   FiClock,
   FiActivity,
   FiInstagram,
   FiLinkedin,
   FiTwitter,
} from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

const SectionTitle = ({ title }) => (
   <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mt-6 border-b border-gray-100 pb-2">
      {title}
   </h2>
);

const Info = ({ icon: Icon, text, link }) => {
   if (!text) return null;
   const Comp = link ? "a" : "div";
   return (
      <Comp
         href={link}
         target={link?.startsWith("http") ? "_blank" : undefined}
         rel={link?.startsWith("http") ? "noopener noreferrer" : undefined}
         className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
         <Icon className="text-amber-600 shrink-0" size={18} />
         <span className="truncate">{text}</span>
      </Comp>
   );
};

const Service = ({ icon: Icon, text }) => (
   <div className="flex items-center gap-2 bg-amber-50 border border-amber-100/50 rounded-2xl p-3">
      <Icon className="text-amber-600 shrink-0" size={18} />
      <span className="text-xs font-semibold text-gray-700">{text}</span>
   </div>
);

const Stars = () => (
   <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
         <FiStar key={i} size={14} className="text-yellow-500 fill-yellow-500" />
      ))}
   </div>
);

const Social = ({ icon: Icon, link }) => {
   if (!link) return null;
   return (
      <a
         href={link.startsWith("http") ? link : `https://${link}`}
         target="_blank"
         rel="noopener noreferrer"
         className="w-10 h-10 rounded-full bg-gray-100 hover:bg-amber-600 hover:text-white transition-all flex items-center justify-center text-gray-600"
      >
         <Icon size={18} />
      </a>
   );
};

export const ClinicaElite = ({ userData }) => {
   const {
      displayName,
      phone,
      email,
      website,
      address,
      logo,
      instagram,
      linkedin,
      twitter,
   } = userData || {};

   const [open, setOpen] = useState(null);

   const faq = [
      {
         q: "Do you offer private dining?",
         a: "Yes, private and corporate event bookings are available.",
      },
      {
         q: "Can I view the menu online?",
         a: "Yes, our complete seasonal menu is available through our website.",
      },
      {
         q: "Do you have vegetarian options?",
         a: "Yes, we offer curated vegan and organic dishes.",
      },
   ];

   return (
      <div className="min-h-screen bg-gray-100 flex justify-center font-sans">
         <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl">
            <img
               src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
               className="h-64 w-full object-cover"
               alt=""
            />

            <div className="p-6">
               <div className="w-20 h-20 rounded-3xl bg-white shadow-xl mt-4 mb-4 overflow-hidden border-4 border-white">
                  <img
                     src={logo || "https://images.pexels.com/photos/8460372/pexels-photo-8460372.jpeg"}
                     className="w-full h-full object-cover"
                     alt=""
                  />
               </div>

               <h1 className="text-2xl font-black text-gray-800">
                  {displayName || "Gourmet Terrace"}
               </h1>
               <p className="text-sm text-gray-500 mt-1">Premium Culinary Experience</p>

               <div className="space-y-3 mt-6">
                  {phone && <Info icon={FiPhone} text={phone} link={`tel:${phone}`} />}
                  {email && <Info icon={FiMail} text={email} link={`mailto:${email}`} />}
                  {website && <Info icon={FiGlobe} text={website} link={website} />}
                  {address && <Info icon={FiMapPin} text={address} />}
               </div>

               <SectionTitle title="Offerings" />

               <div className="grid grid-cols-2 gap-3 mt-3">
                  <Service icon={FiHeart} text="Chef Specials" />
                  <Service icon={FiShield} text="Wine Tasting" />
                  <Service icon={FiClock} text="Late Night Dining" />
                  <Service icon={FiActivity} text="Fresh Ingredients" />
               </div>

               <SectionTitle title="Guest Reviews" />

               <div className="bg-gray-100 rounded-2xl p-4 mt-3">
                  <Stars />
                  <p className="text-sm mt-2 text-gray-600">
                     Absolutely stunning presentation and flavors. An unforgettable dining journey.
                  </p>
                  <p className="text-xs mt-2 font-bold text-gray-500">
                     - Sophia Reynolds
                  </p>
               </div>

               <SectionTitle title="FAQ" />

               <div className="mt-3 space-y-2">
                  {faq.map((item, i) => (
                     <div key={i} className="border rounded-2xl overflow-hidden bg-white">
                        <button
                           onClick={() => setOpen(open === i ? null : i)}
                           className="w-full px-4 py-3 flex justify-between items-center font-semibold text-sm text-gray-700 text-left"
                        >
                           {item.q}
                           {open === i ? <FiChevronUp /> : <FiChevronDown />}
                        </button>

                        {open === i && (
                           <div className="px-4 pb-4 text-xs text-gray-600">
                              {item.a}
                           </div>
                        )}
                     </div>
                  ))}
               </div>

               <button
                  onClick={() => downloadVCard(userData)}
                  className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-2 text-sm shadow-xl transition active:scale-95 duration-150"
               >
                  <FiUserPlus /> Save Contact
               </button>

               <div className="flex justify-center gap-3 mt-5">
                  <Social icon={FiInstagram} link={instagram} />
                  <Social icon={FiLinkedin} link={linkedin} />
                  <Social icon={FiTwitter} link={twitter} />
               </div>

               <div className="mt-5">
                  <PoweredBy />
               </div>
            </div>
         </div>
      </div>
   );
};

export default ClinicaElite;