import React, { useState } from "react";
import * as FiIcons from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

const ModernRealty = ({ userData }) => {
   const {
      displayName = "Modern Realty",
      email,
      role,
      mobileNumber,
      phone,
      companyName,
      designation,
      website,
      address,
      city,
      linkedin,
      instagram,
      facebook,
      twitter,
      bio,
      avatar,
      logo,
   } = userData || {};

   const displayPhone = mobileNumber || phone;
   const displayRole = designation || role || "Real Estate Consultant";
   const finalAddress = address || city || "Ahmedabad, Gujarat";

   const [openFaq, setOpenFaq] = useState(null);

   const properties = [
      {
         title: "Luxury Villa",
         price: "₹1.2 Cr",
         image:
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
      },
      {
         title: "Modern Apartment",
         price: "₹65 Lakh",
         image:
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80",
      },
      {
         title: "Office Space",
         price: "₹95 Lakh",
         image:
            "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
      },
   ];

   return (
      <div className="min-h-screen bg-slate-100 font-['Inter'] pb-10">
         {/* HERO */}
         <div className="relative h-72 overflow-hidden rounded-b-[2.5rem]">
            <img
               src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80"
               alt="Real Estate"
               className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

            <div className="absolute bottom-16 left-0 right-0 text-center px-5">
               <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-white p-1 shadow-2xl">
                     <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
                        {avatar ? (
                           <img
                              src={avatar}
                              alt="Avatar"
                              className="w-full h-full object-cover"
                           />
                        ) : logo ? (
                           <img
                              src={logo}
                              alt="Logo"
                              className="w-full h-full object-cover"
                           />
                        ) : (
                           <FiIcons.FiHome
                              size={34}
                              className="text-emerald-600"
                           />
                        )}
                     </div>
                  </div>
               </div>

               <h1 className="text-white text-3xl font-black tracking-tight">
                  {displayName}
               </h1>

               {/* <p className="text-white/80 text-sm mt-1">{displayRole}</p> */}

               {companyName && (
                  <span className="inline-block mt-3 px-4 py-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-bold">
                     {companyName}
                  </span>
               )}
            </div>
         </div>

         {/* BODY */}
         <div className="max-w-md mx-auto px-4 -mt-12 space-y-5 relative z-10">

            {/* STATS */}
            <div className="grid grid-cols-3 gap-3">
               {[
                  ["120+", "Projects"],
                  ["85+", "Clients"],
                  ["4.9★", "Rating"],
               ].map((item, i) => (
                  <div
                     key={i}
                     className="bg-white rounded-2xl p-4 shadow-lg shadow-slate-200/50 text-center border border-white hover:-translate-y-1 duration-300"
                  >
                     <h3 className="text-xl font-black text-emerald-600">
                        {item[0]}
                     </h3>
                     <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider">
                        {item[1]}
                     </p>
                  </div>
               ))}
            </div>

            {/* ABOUT */}
            {bio && (
               <div className="bg-white rounded-2xl p-5 shadow-md">
                  <h3 className="font-black text-slate-800 mb-2">
                     About Us
                  </h3>
                  <p className="text-sm text-slate-600 leading-6">
                     {bio}
                  </p>
               </div>
            )}

            {/* FEATURED PROPERTY */}
            <div>
               <h3 className="font-black text-slate-800 mb-3 px-1">
                  Featured Properties
               </h3>

               <div className="space-y-4">
                  {properties.map((item, i) => (
                     <div
                        key={i}
                        className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 border border-white group"
                     >
                        <div className="relative overflow-hidden h-44">
                           <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 duration-700"
                           />
                           <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
                              <p className="text-xs text-emerald-600 font-black">
                                 {item.price}
                              </p>
                           </div>
                        </div>

                        <div className="p-5 flex justify-between items-center">
                           <div>
                              <h4 className="font-black text-slate-800 tracking-tight">
                                 {item.title}
                              </h4>
                              <p className="text-xs text-slate-400 font-medium mt-0.5">
                                 Premium Property
                              </p>
                           </div>

                           <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                              <FiIcons.FiArrowRight />
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* CONTACT */}
            <div className="bg-white rounded-3xl p-5 shadow-xl shadow-slate-200/60 border border-white space-y-3">
               {displayPhone && (
                  <a
                     href={`tel:${displayPhone}`}
                     className="flex items-center gap-4 bg-slate-50/50 hover:bg-emerald-50 rounded-2xl p-4 transition-colors duration-300"
                  >
                     <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-600">
                        <FiIcons.FiPhone />
                     </div>
                     <span className="font-bold text-slate-700">{displayPhone}</span>
                  </a>
               )}

               {email && (
                  <a
                     href={`mailto:${email}`}
                     className="flex items-center gap-4 bg-slate-50/50 hover:bg-emerald-50 rounded-2xl p-4 transition-colors duration-300"
                  >
                     <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-600">
                        <FiIcons.FiMail />
                     </div>
                     <span className="font-bold text-slate-700 truncate">{email}</span>
                  </a>
               )}

               <div className="flex items-center gap-4 bg-slate-50/50 rounded-2xl p-4">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-600">
                     <FiIcons.FiMapPin />
                  </div>
                  <span className="font-bold text-slate-700 leading-tight">{finalAddress}</span>
               </div>
            </div>

            {/* ACTIONS */}
            <div className="space-y-3">
               {website && (
                  <a
                     href={website}
                     target="_blank"
                     rel="noreferrer"
                     className="w-full bg-slate-900 text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-bold"
                  >
                     <FiIcons.FiGlobe />
                     Visit Website
                  </a>
               )}

               <button
                  onClick={() => downloadVCard(userData)}
                  className="w-full bg-emerald-600 text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-bold"
               >
                  <FiIcons.FiDownload />
                  Save Contact
               </button>
            </div>

            {/* FAQ SECTION */}
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/60 border border-white">
               <h3 className="font-black text-slate-800 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                     <FiIcons.FiHelpCircle size={18} />
                  </div>
                  Common Questions
               </h3>
               
               <div className="space-y-3">
                  {[
                     { 
                        q: "How to book a property visit?", 
                        a: "You can coordinate a visit by clicking the 'Save Contact' button and reaching out to us via call or email. We are available 7 days a week." 
                     },
                     { 
                        q: "Do you offer loan assistance?", 
                        a: "Yes, we provide end-to-end support for home loans through our partner financial institutions, including documentation and approval tracking." 
                     },
                     { 
                        q: "What documents are required?", 
                        a: "Typically, ID proof (Aadhar/PAN), address proof, and last 6 months' bank statements are needed. Our team will guide you through the full checklist." 
                     }
                  ].map((item, index) => (
                     <div key={index} className={`rounded-2xl transition-all duration-300 ${openFaq === index ? 'bg-slate-50 p-4' : 'bg-white'}`}>
                        <button 
                           onClick={() => setOpenFaq(openFaq === index ? null : index)}
                           className="w-full text-left flex justify-between items-center gap-3"
                        >
                           <h4 className={`text-sm font-bold tracking-tight transition-colors duration-300 ${openFaq === index ? 'text-emerald-600' : 'text-slate-800'}`}>
                              {item.q}
                           </h4>
                           <FiIcons.FiChevronDown className={`shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-emerald-600' : 'text-slate-400'}`} />
                        </button>
                        
                        <div className={`overflow-hidden transition-all duration-500 ${openFaq === index ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                           <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-200/50 pt-3">
                              {item.a}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* SOCIAL */}
            <div className="flex justify-center gap-3 flex-wrap">
               {linkedin && (
                  <a href={linkedin} className="p-3 bg-white rounded-xl shadow">
                     <FiIcons.FiLinkedin />
                  </a>
               )}
               {instagram && (
                  <a href={instagram} className="p-3 bg-white rounded-xl shadow">
                     <FiIcons.FiInstagram />
                  </a>
               )}
               {facebook && (
                  <a href={facebook} className="p-3 bg-white rounded-xl shadow">
                     <FiIcons.FiFacebook />
                  </a>
               )}
               {twitter && (
                  <a href={twitter} className="p-3 bg-white rounded-xl shadow">
                     <FiIcons.FiTwitter />
                  </a>
               )}
            </div>

            <PoweredBy />
         </div>
      </div>
   );
};

export default ModernRealty;