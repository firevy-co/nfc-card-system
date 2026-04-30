import React from "react";
import {
   FiPhone,
   FiMail,
   FiMapPin,
   FiStar,
   FiCheckCircle,
   FiClock,
   FiTool,
   FiHome,
   FiWind,
   FiDroplet,
   FiDownload,
} from "react-icons/fi";
import PoweredBy from "../PoweredBy";
import {
   StandardSaveContactButton,
} from "../common/StandardComponents";

const ServicePortfolio = ({ userData }) => {
   const {
      displayName = "QuickFix Services",
      role = "AC • Fridge • Washing Machine Repair",
      phone = "+91 99999 99999",
      email = "support@quickfix.com",
      address = "Ahmedabad, Gujarat",
      website = "www.quickfixservices.in",
      experience = "8+ Years Experience",
      timing = "9:00 AM - 9:00 PM",
   } = userData || {};

   const serviceCards = [
      {
         title: "AC Repairing",
         desc: "Cooling issue, gas filling & installation",
         icon: <FiWind />,
         image:
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
      },
      {
         title: "Fridge Repairing",
         desc: "Compressor, cooling & leakage repair",
         icon: <FiHome />,
         image:
            "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
      },
      {
         title: "Washing Machine",
         desc: "Motor issue & maintenance service",
         icon: <FiDroplet />,
         image:
            "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=800&q=80",
      },
      {
         title: "Microwave Repair",
         desc: "Heating & electrical fixing",
         icon: <FiTool />,
         image:
            "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80",
      },
   ];

   const reviews = [
      {
         name: "Rakesh Patel",
         msg: "Very fast AC repair service. Highly recommended.",
      },
      {
         name: "Neha Shah",
         msg: "Affordable price and technician was professional.",
      },
      {
         name: "Amit Joshi",
         msg: "My fridge repaired same day. Great support.",
      },
   ];

   return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#172033] to-[#1e293b] text-white">
         <div className="w-full max-w-md mx-auto min-h-screen pb-8">

            {/* TOP IMAGE SECTION */}
            <div className="px-4 pt-4">
               <div className="grid grid-cols-2 gap-4">
                  {serviceCards.slice(0, 2).map((item, index) => (
                     <div
                        key={index}
                        className="rounded-3xl overflow-hidden bg-white/5 shadow-xl hover:scale-105 transition-all duration-500"
                     >
                        <img
                           src={item.image}
                           alt={item.title}
                           className="w-full h-36 object-cover hover:scale-110 duration-700"
                        />
                        <div className="p-3">
                           <h3 className="font-bold text-sm">{item.title}</h3>
                           <p className="text-xs text-white/60 mt-1">{item.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* MAIN CARD */}
            <div className="px-4 pt-5">
               <div className="bg-white/5 backdrop-blur-2xl rounded-[2rem] p-5 shadow-2xl border border-white/10">

                  {/* BUSINESS DETAILS */}
                  <h1 className="text-3xl font-black">{displayName}</h1>
                  {/* <p className="text-sm text-white/70 mt-2">{role}</p> */}

                  {/* SAVE CONTACT BUTTON */}
                  <div className="mt-5">
                     <StandardSaveContactButton
                        userData={userData}
                        className="w-full !bg-yellow-500 !text-black !font-bold !rounded-2xl !py-4 hover:scale-[1.03] transition-all"
                     >
                        <div className="flex items-center justify-center gap-2">
                           <FiDownload />
                           Save Contact
                        </div>
                     </StandardSaveContactButton>
                  </div>

                  {/* INFO BOXES */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                     <div className="bg-white/5 rounded-2xl p-4 text-center">
                        <FiClock className="mx-auto mb-2 text-yellow-400" />
                        <p className="text-xs">{timing}</p>
                     </div>

                     <div className="bg-white/5 rounded-2xl p-4 text-center">
                        <FiCheckCircle className="mx-auto mb-2 text-green-400" />
                        <p className="text-xs">{experience}</p>
                     </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="space-y-3 mt-5">
                     <a
                        href={`tel:${phone}`}
                        className="block bg-yellow-500 text-black text-center font-bold py-4 rounded-2xl hover:scale-[1.03] transition-all"
                     >
                        📞 Call Now - {phone}
                     </a>

                     <a
                        href={`mailto:${email}`}
                        className="block bg-white/10 text-center py-4 rounded-2xl hover:bg-white/15 transition-all"
                     >
                        ✉ {email}
                     </a>
                  </div>

                  {/* SERVICES */}
                  <h2 className="mt-7 font-bold text-lg">Our Services</h2>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                     {serviceCards.map((item, index) => (
                        <div
                           key={index}
                           className="bg-white/5 rounded-2xl overflow-hidden hover:scale-105 transition-all"
                        >
                           <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-24 object-cover"
                           />

                           <div className="p-3">
                              <div className="flex items-center gap-2 text-yellow-400">
                                 {item.icon}
                                 <h4 className="font-bold text-xs text-white">
                                    {item.title}
                                 </h4>
                              </div>

                              <p className="text-[11px] text-white/60 mt-2">
                                 {item.desc}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* REVIEWS */}
                  <div className="mt-7">
                     <h3 className="font-bold text-lg mb-3">Customer Reviews</h3>

                     <div className="space-y-3">
                        {reviews.map((review, index) => (
                           <div
                              key={index}
                              className="bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-all"
                           >
                              <div className="flex items-center gap-1 text-yellow-400 mb-2">
                                 <FiStar />
                                 <FiStar />
                                 <FiStar />
                                 <FiStar />
                                 <FiStar />
                              </div>

                              <p className="text-xs text-white/70">{review.msg}</p>
                              <p className="text-xs mt-2 font-bold">{review.name}</p>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* ADDRESS */}
                  <div className="mt-6 bg-white/5 rounded-2xl p-4 text-sm text-white/70">
                     <div className="flex items-center gap-2">
                        <FiMapPin className="text-yellow-400" />
                        {address}
                     </div>
                  </div>

                  {/* WEBSITE */}
                  <div className="mt-3 text-center text-xs text-white/50">
                     {website}
                  </div>
               </div>
            </div>

            {/* FOOTER */}
            <div className="px-4 pt-6">
               <PoweredBy />
            </div>

         </div>
      </div>
   );
};

export default ServicePortfolio;