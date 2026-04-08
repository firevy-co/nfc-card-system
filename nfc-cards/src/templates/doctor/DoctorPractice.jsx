import React from "react";
import {
   FiGlobe,
   FiMail,
   FiPhone,
   FiMapPin,
   FiShare2,
   FiCamera,
   FiUsers,
   FiEdit2,
   FiChevronRight
} from "react-icons/fi";

const HospitalCard = ({ userData }) => {
   const {
      hospitalName = "City Central Hospital",
      tagline = "LEADING EXCELLENCE IN HEALTHCARE",
      website = "citycentral.com/chen",
      email = "s.chen@citycentral.org",
      phone = "+1 (555) 012-3456",
      location = "San Francisco, CA",
      image = "https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
   } = userData || {};

   return (
      <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
         <div className="w-full max-w-sm bg-[#F4F6F7] rounded-3xl shadow-xl p-6">

            {/* IMAGE */}
            <div className="flex justify-center relative">
               <div className="w-24 h-24 rounded-full overflow-hidden shadow-md">
                  <img
                     src={image}
                     alt="hospital"
                     className="w-full h-full object-cover"
                  />
               </div>

               <div className="absolute bottom-0 right-[34%] bg-teal-600 p-2 rounded-full text-white shadow">
                  <FiEdit2 size={14} />
               </div>
            </div>

            {/* TITLE */}
            <div className="text-center mt-4">
               <h1 className="text-xl font-bold text-gray-800">
                  {hospitalName}
               </h1>
               <p className="text-xs text-teal-600 font-semibold tracking-wide mt-1">
                  {tagline}
               </p>
            </div>

            {/* TAGS */}
            <div className="flex justify-center gap-2 mt-4">
               <span className="px-3 py-1 text-xs bg-teal-200 text-teal-800 rounded-full">
                  SURGERY
               </span>
               <span className="px-3 py-1 text-xs bg-teal-200 text-teal-800 rounded-full">
                  PEDIATRICS
               </span>
               <span className="px-3 py-1 text-xs bg-teal-200 text-teal-800 rounded-full">
                  ER
               </span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mt-6">
               <button className="flex-1 bg-teal-700 text-white py-3 rounded-full font-medium shadow">
                  Book Consult
               </button>

               <button className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-full font-medium">
                  View Papers
               </button>
            </div>

            {/* CONTACT LIST */}
            <div className="mt-6 space-y-3">

               {/* WEBSITE */}
               <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3">
                     <FiGlobe className="text-teal-700" />
                     <div>
                        <p className="text-xs text-gray-400">WEBSITE</p>
                        <p className="text-sm font-medium text-gray-700">
                           {website}
                        </p>
                     </div>
                  </div>
                  <FiChevronRight className="text-gray-400" />
               </div>

               {/* EMAIL */}
               <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3">
                     <FiMail className="text-teal-700" />
                     <div>
                        <p className="text-xs text-gray-400">EMAIL</p>
                        <p className="text-sm font-medium text-gray-700">
                           {email}
                        </p>
                     </div>
                  </div>
                  <FiChevronRight className="text-gray-400" />
               </div>

               {/* PHONE */}
               <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3">
                     <FiPhone className="text-teal-700" />
                     <div>
                        <p className="text-xs text-gray-400">PHONE</p>
                        <p className="text-sm font-medium text-gray-700">
                           {phone}
                        </p>
                     </div>
                  </div>
                  <FiChevronRight className="text-gray-400" />
               </div>

               {/* LOCATION */}
               <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3">
                     <FiMapPin className="text-teal-700" />
                     <div>
                        <p className="text-xs text-gray-400">LOCATION</p>
                        <p className="text-sm font-medium text-gray-700">
                           {location}
                        </p>
                     </div>
                  </div>
                  <FiChevronRight className="text-gray-400" />
               </div>

            </div>

            {/* BOTTOM ICONS */}
            <div className="flex justify-center gap-6 mt-6">
               <button className="bg-gray-200 p-3 rounded-full">
                  <FiShare2 />
               </button>

               <button className="bg-gray-200 p-3 rounded-full">
                  <FiCamera />
               </button>

               <button className="bg-gray-200 p-3 rounded-full">
                  <FiUsers />
               </button>
            </div>

         </div>
      </div>
   );
};

export default HospitalCard;