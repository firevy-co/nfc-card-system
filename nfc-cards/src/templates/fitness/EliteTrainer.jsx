import React, { useState } from "react";
import * as FiIcons from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

const EliteTrainer = ({ userData }) => {
   const [date, setDate] = useState("");

   const {
      displayName,
      website,
      email,
      phone,
      address,
      linkedin,
      instagram,
      youtube,
      twitter,
      logo,
   } = userData || {};

   const gallery = [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
      "https://images.unsplash.com/photo-1599058917765-a780eda07a3e",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
   ];

   const products = [
      {
         name: "Dumbbells Set",
         price: "$19.99",
         image:
            "https://images.unsplash.com/photo-1599058917765-a780eda07a3e",
      },
      {
         name: "Kettlebell",
         price: "$29.99",
         image:
            "https://images.unsplash.com/photo-1518611012118-696072aa579a",
      },
   ];

   return (
      <div className="min-h-screen bg-[#0a0f16] text-white font-['Mulish']">
         <div className="max-w-sm mx-auto bg-[#0e141d] overflow-hidden">

            {/* HERO */}
            <div className="relative h-72">
               <img
                  src={

                     "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
                  }
                  alt="Gym"
                  className="w-full h-full object-cover opacity-40"
               />

               <div className="absolute inset-0 bg-gradient-to-t from-[#0e141d] to-transparent"></div>

               <div className="absolute bottom-6 left-5 right-5 flex items-end gap-4">
                  <img
                     src={
                        logo ||
                        "https://images.unsplash.com/photo-1567013127542-490d757e51fc"
                     }
                     alt="Trainer"
                     className="w-20 h-20 rounded-md object-cover border border-white/10"
                  />

                  <div>
                     <h1 className="text-2xl font-bold">
                        {displayName || "Richard Madden"}
                     </h1>
                     <p className="text-green-400 text-sm">Gym Trainer</p>

                     <div className="flex gap-3 mt-3 text-white/80">
                        <FiIcons.FiFacebook />
                        <FiIcons.FiInstagram />
                        <FiIcons.FiYoutube />
                        <FiIcons.FiTwitter />
                     </div>
                  </div>
               </div>
            </div>

            {/* ABOUT */}
            <div className="px-5 py-6 text-sm text-gray-400 leading-7">
               Lorem Ipsum is simply dummy text of the printing and typesetting
               industry. Lorem Ipsum has been the industry's standard dummy text ever.
            </div>

            {/* CONTACT */}
            <SectionTitle title="Contact" />

            <div className="grid grid-cols-2 gap-4 px-5 mt-6">
               <InfoCard icon="FiMail" label="Email" value={email || "trainer@gmail.com"} />
               <InfoCard icon="FiPhone" label="Phone" value={phone || "+49 95864 12484"} />
               <InfoCard icon="FiGift" label="Birth" value="4 Dec 1995" />
               <InfoCard icon="FiMapPin" label="Location" value={address || "Berlin"} />
            </div>

            {/* APPOINTMENT */}
            <SectionTitle title="Make an Appointment" />

            <div className="px-5 mt-6">
               <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#131a23] px-4 py-3 text-sm outline-none"
               />

               <div className="grid grid-cols-2 gap-3 mt-4">
                  {["8:10 - 20:00", "9:10 - 20:00", "10:10 - 20:00", "11:10 - 20:00"].map(
                     (time, i) => (
                        <button
                           key={i}
                           className="bg-[#131a23] py-3 text-xs hover:bg-green-500 transition"
                        >
                           {time}
                        </button>
                     )
                  )}
               </div>
            </div>

            {/* SERVICES */}
            <SectionTitle title="Our Services" />

            <div className="grid grid-cols-2 gap-4 px-5 mt-6">
               <ServiceCard
                  icon="FiActivity"
                  title="Physical Fitness"
                  desc="Improve stamina and strength training."
               />
               <ServiceCard
                  icon="FiTarget"
                  title="Fat Loss"
                  desc="Weight reduction with smart plans."
               />
            </div>

            {/* GALLERY */}
            <SectionTitle title="Gallery" />

            <div className="grid grid-cols-3 gap-2 px-5 mt-6">
               {gallery.map((img, i) => (
                  <img
                     key={i}
                     src={img}
                     className="h-28 w-full object-cover"
                     alt="gallery"
                  />
               ))}
            </div>

            {/* PRODUCTS */}
            <SectionTitle title="Products" />

            <div className="grid grid-cols-2 gap-4 px-5 mt-6">
               {products.map((item, i) => (
                  <div key={i} className="bg-[#131a23]">
                     <img
                        src={item.image}
                        alt={item.name}
                        className="h-36 w-full object-cover"
                     />
                     <div className="p-3">
                        <h3 className="text-sm">{item.name}</h3>
                        <p className="text-green-400 font-bold mt-1">{item.price}</p>
                     </div>
                  </div>
               ))}
            </div>

            {/* TESTIMONIAL */}
            <SectionTitle title="Testimonial" />

            <div className="px-5 mt-6 text-center text-gray-400 pb-6">
               <div className="text-4xl text-green-400 mb-3">❝</div>
               Lorem Ipsum is simply dummy text of the printing industry.
               <div className="mt-4 text-white font-semibold">Shane Watson</div>
               <div className="text-xs text-gray-500">Member</div>
            </div>

            {/* BUSINESS HOURS */}
            <SectionTitle title="Business Hours" />

            <div className="px-5 mt-6 pb-6 text-sm text-gray-300 space-y-2">
               <HourRow day="Sunday" time="8:10 - 20:00" />
               <HourRow day="Monday" time="8:10 - 20:00" />
               <HourRow day="Tuesday" time="8:10 - 20:00" />
               <HourRow day="Wednesday" time="8:10 - 20:00" />
               <HourRow day="Thursday" time="8:10 - 20:00" />
               <HourRow day="Friday" time="8:10 - 20:00" />
               <HourRow day="Saturday" time="Closed" />
            </div>

            {/* CONTACT FORM */}
            <SectionTitle title="Contact Us" />

            <div className="px-5 mt-6 space-y-3">
               <input
                  placeholder="Your Name"
                  className="w-full bg-[#131a23] px-4 py-3 outline-none"
               />
               <input
                  placeholder="Email"
                  className="w-full bg-[#131a23] px-4 py-3 outline-none"
               />
               <input
                  placeholder="Phone"
                  className="w-full bg-[#131a23] px-4 py-3 outline-none"
               />
               <textarea
                  rows="4"
                  placeholder="Message"
                  className="w-full bg-[#131a23] px-4 py-3 outline-none"
               ></textarea>

               <button className="w-full bg-green-500 py-3 font-semibold text-black">
                  Send Message
               </button>
            </div>

            {/* VCARD */}
            <SectionTitle title="Create Your VCard" />

            <div className="px-5 py-6">
               <button
                  onClick={() => downloadVCard(userData)}
                  className="w-full bg-green-500 py-3 text-black font-bold"
               >
                  Add to Contact
               </button>
            </div>

            <PoweredBy />
         </div>
      </div>
   );
};

const SectionTitle = ({ title }) => (
   <div className="flex items-center gap-4 px-5 mt-10">
      <div className="flex-1 h-px bg-green-500/50"></div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="flex-1 h-px bg-green-500/50"></div>
   </div>
);

const InfoCard = ({ icon, label, value }) => {
   const Icon = FiIcons[icon];
   return (
      <div className="bg-[#131a23] p-4">
         <Icon className="text-green-400 mb-2" />
         <p className="text-xs text-gray-500">{label}</p>
         <p className="text-sm mt-1">{value}</p>
      </div>
   );
};

const ServiceCard = ({ icon, title, desc }) => {
   const Icon = FiIcons[icon];
   return (
      <div className="bg-[#131a23] p-5">
         <Icon size={28} className="text-green-400 mb-4" />
         <h3 className="font-semibold">{title}</h3>
         <p className="text-xs text-gray-400 mt-2 leading-6">{desc}</p>
      </div>
   );
};

const HourRow = ({ day, time }) => (
   <div className="flex justify-between">
      <span>{day}</span>
      <span>{time}</span>
   </div>
);

export default EliteTrainer;