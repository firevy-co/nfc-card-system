import React from "react";
import * as FiIcons from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const HospitalCard = ({ userData }) => {
   const {
      displayName,
      website,
      email,
      phone,
      address,
      linkedin,
      instagram
   } = userData || {};

   return (
      <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4 font-['Mulish']">
         <div className="w-full max-w-sm bg-[#F4F6F7] rounded-[3rem] shadow-xl p-8 relative overflow-hidden">

            {/* IMAGE */}
            <div className="flex justify-center relative mb-8">
               <div className="w-28 h-28 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                  {userData?.logo ? (
                    <img src={userData.logo} alt="hospital" className="w-full h-full object-contain p-2" />
                  ) : (
                    <img
                       src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
                       alt="hospital"
                       className="w-full h-full object-cover"
                    />
                  )}
               </div>
               <div className="absolute bottom-0 right-[32%] bg-teal-600 p-2.5 rounded-full text-white shadow-xl border-2 border-white">
                  <FiIcons.FiAward size={16} />
               </div>
            </div>

            {/* TITLE */}
            <div className="text-center mb-8">
               <h1 className="text-2xl font-black text-gray-800 tracking-tight leading-none">
                  {displayName || "City Central Hospital"}
               </h1>
               <p className="text-[10px] text-teal-600 font-black uppercase tracking-[0.3em] mt-3 opacity-80 uppercase">
                  Leading Excellence In Healthcare
               </p>
            </div>

            {/* TAGS */}
            <div className="flex justify-center gap-2 mb-10 flex-wrap">
               <span className="px-3 py-1.5 text-[8px] font-black bg-teal-600/10 text-teal-700 rounded-full border border-teal-600/10 tracking-widest uppercase">
                  SURGERY
               </span>
               <span className="px-3 py-1.5 text-[8px] font-black bg-teal-600/10 text-teal-700 rounded-full border border-teal-600/10 tracking-widest uppercase">
                  PEDIATRICS
               </span>
               <span className="px-3 py-1.5 text-[8px] font-black bg-teal-600/10 text-teal-700 rounded-full border border-teal-600/10 tracking-widest uppercase">
                  ER
               </span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mb-10">
               <button className="flex-1 bg-teal-700 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-teal-700/20 active:scale-95 transition-all">
                  Book Consult
               </button>
            </div>

            {/* CONTACT LIST */}
            <div className="space-y-3 mb-10">
               <StandardContactLink icon={FiIcons.FiGlobe} value={website} href={website} />
               <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />
               <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />
               <StandardContactLink icon={FiIcons.FiMapPin} value={address} />

               {/* Medical Socials */}
               <StandardContactLink icon={FiIcons.FiLinkedin} value={linkedin} href={linkedin} />
               <StandardContactLink icon={FiIcons.FiInstagram} value={instagram} href={instagram} />
            </div>

            <StandardMapPreview address={address} />

            <StandardSaveContactButton />

            <footer className="mt-12 text-center opacity-20">
               <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] font-black tracking-[0.5em] text-gray-400 hover:text-teal-700 transition-colors uppercase">Powered by Cardyn</a>
            </footer>
         </div>
      </div>
   );
};

export default HospitalCard;
