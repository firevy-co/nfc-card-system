import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
   FiPhone, FiMail, FiMapPin, FiInstagram, FiLinkedin,
   FiTwitter, FiUserPlus, FiCalendar, FiClock, FiStar,
   FiChevronRight, FiChevronLeft
} from 'react-icons/fi';
import { FaWhatsapp, FaFacebookF, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Theme Colors ---
const BRAND_COLOR = "#7C3B2E"; // Deep Reddish-Brown
const BG_LIGHT = "#FAF7F5";    // Off-white/Cream
const CARD_BG = "#FDFBFA";     // Slightly lighter cream for cards

// --- Reusable Sub-components ---

const SectionDivider = ({ title }) => (
   <div className="flex items-center justify-center gap-4 mt-10 mb-6">
      <div className="h-[1px] bg-[#7C3B2E]/30 w-10 sm:w-16" />
      <h2 className="text-[15px] font-bold text-[#2A2A2A] uppercase tracking-widest">{title}</h2>
      <div className="h-[1px] bg-[#7C3B2E]/30 w-10 sm:w-16" />
   </div>
);

// --- Main Component ---

const NovaBeauty = ({ userData }) => {
   // Completely Fictional Persona: Celebrity Makeup Artist
   const fictionalData = {
      displayName: "Elena Rossi",
      role: "Master Make-up Artist",
      phone: "+1 (310) 555-0199",
      email: "booking@elenarossi.beauty",
      website: "www.elenarossi.beauty",
      address: "125 Glamour Blvd, Suite 4B, Los Angeles",
      dob: "Sept 14, 1992",
      businessName: "Elena Rossi Beauty Studio",
      twitter: "elenarossimua",
      instagram: "elenarossi.beauty",
      linkedin: "elenarossimua",
      whatsapp: "13105550199",
      facebook: "elenarossibeauty",
      bio: "Enhancing natural beauty with a touch of modern elegance. Specializing in bridal, editorial, and red-carpet makeup applications. My goal is to make you feel like the most confident, radiant version of yourself.",
      profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      bannerImage: "https://images.unsplash.com/photo-1512496115841-a45e43a948e7?w=1200&h=600&fit=crop",
      gallery: [
         { img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=400&fit=crop" },
         { img: "https://images.unsplash.com/photo-1526868660851-f7623315a639?w=600&h=400&fit=crop" },
         { img: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=600&h=400&fit=crop" }
      ],
      products: [
         { title: "Glow Serum Kit", desc: "The essential kit for radiant, glass-skin prep.", price: "$120", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop" },
         { title: "Matte Lipstick", desc: "Long-lasting, velvet matte finish in signature shades.", price: "$45", img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop" }
      ],
      services: [
         { title: "Bridal Makeup", desc: "Full luxury bridal glam including skin prep, trial session, and premium lashes." },
         { title: "Editorial Glam", desc: "High-fashion, creative makeup designed specifically for studio lighting and photography." }
      ],
      blog: {
         title: "5 Skincare Secrets for Flawless Makeup",
         desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
         img: "https://femina.wwmindia.com/content/2019/jun/skin-care-tips-1560149905.jpg"
      },
      testimonial: {
         quote: "Elena is an absolute visionary. She understood exactly what I wanted for my wedding day and executed it flawlessly. My makeup stayed perfect for 14 hours!",
         name: "Sarah Jenkins"
      },
      hours: [
         { day: "Monday", hours: "09:00 - 18:00" },
         { day: "Tuesday", hours: "09:00 - 18:00" },
         { day: "Wednesday", hours: "09:00 - 18:00" },
         { day: "Thursday", hours: "09:00 - 18:00" },
         { day: "Friday", hours: "09:00 - 20:00" },
         { day: "Saturday", hours: "08:00 - 16:00" },
         { day: "Sunday", hours: "Closed" }
      ]
   };

   const vCardData = { ...userData, ...fictionalData };


   // ✅ MERGE: userData takes priority over fictional placeholders
   
   // ✅ MERGE: userData takes priority over fictional placeholders
   const data = {
      ...fictionalData,
      displayName: userData?.displayName || fictionalData.displayName,
      role: userData?.designation || userData?.job || userData?.businessRole || userData?.role || fictionalData.role || fictionalData.jobTitle,
      phone: userData?.phone || userData?.mobileNumber || fictionalData.phone,
      email: userData?.email || fictionalData.email,
      website: userData?.website || fictionalData.website,
      address: userData?.address || [userData?.city, userData?.state, userData?.country].filter(Boolean).join(', ') || fictionalData.address,
      businessName: userData?.companyName || userData?.company || userData?.businessName || fictionalData.businessName || fictionalData.company,
      whatsapp: userData?.whatsapp || fictionalData.whatsapp,
      linkedin: userData?.linkedin || fictionalData.linkedin,
      twitter: userData?.twitter || fictionalData.twitter,
      instagram: userData?.instagram || fictionalData.instagram,
      facebook: userData?.facebook || fictionalData.facebook,
      github: userData?.github || fictionalData.github,
      telegram: userData?.telegram || fictionalData.telegram,
      bio: userData?.bio || fictionalData.bio,
      profileImage: userData?.profileImage || userData?.avatar || userData?.logo || fictionalData.profileImage || fictionalData.avatar || fictionalData.defaultAvatar,
      avatar: userData?.profileImage || userData?.avatar || userData?.logo || fictionalData.profileImage || fictionalData.avatar || fictionalData.defaultAvatar,
      logo: userData?.logo || userData?.profileImage || fictionalData.logo,
      bannerImage: userData?.coverPhoto || fictionalData.bannerImage || fictionalData.coverImage };
   return (
      <div className="w-full min-h-screen bg-[#F0EBE6] text-[#2A2A2A] font-['Poppins',sans-serif] selection:bg-[#7C3B2E] selection:text-white flex justify-center pb-12">

         {/* Main Container */}
         <div className="w-full max-w-[480px] bg-[#FAF7F5] relative shadow-2xl min-h-screen overflow-hidden flex flex-col">

            {/* Subtle Background Abstract Decor (Mimicking scattered makeup) */}
            <div className="absolute top-[20%] left-[-10%] w-32 h-32 rounded-full border-[10px] border-[#7C3B2E]/5 opacity-50 pointer-events-none" />
            <div className="absolute top-[60%] right-[-10%] w-48 h-48 rounded-full bg-[#E8DCCB]/30 opacity-50 pointer-events-none" />

            {/* ================= HERO & PROFILE ================= */}
            <div className="w-full h-[220px] relative">
               <img src={data.bannerImage} alt="Cosmetics Flatlay" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-white/10" />
            </div>

            <div className="px-6 relative z-10 -mt-10 flex gap-4 items-end mb-6">
               <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-md bg-white shrink-0">
                  <img src={data.profileImage} alt={data.displayName} className="w-full h-full object-cover" />
               </div>
               <div className="pb-1">
                  <h1 className="text-xl font-bold text-[#7C3B2E] tracking-tight leading-tight">
                     {data.displayName}
                  </h1>
                  <p className="text-sm font-semibold text-[#2A2A2A] mt-0.5">
                     {data.role}
                  </p>
               </div>
            </div>

            {/* ================= BIO ================= */}
            <div className="px-6 mb-6">
               <p className="text-xs text-[#555] leading-relaxed text-center font-medium">
                  {data.bio}
               </p>
            </div>

            {/* ================= CONTACT INFO GRID ================= */}
            <div className="px-6 grid grid-cols-2 gap-3 mb-8">
               {data.email && (
                  <div className="bg-[#F6EFEA] p-3 rounded-xl flex items-center gap-3 shadow-sm border border-[#E8DCCB]">
                     <FiMail className="text-[#7C3B2E] shrink-0" size={16} />
                     <div className="overflow-hidden">
                        <p className="text-[9px] font-bold uppercase text-[#7C3B2E]">Email Address</p>
                        <p className="text-[10px] text-[#444] font-medium truncate">{data.email}</p>
                     </div>
                  </div>
               )}
               {data.phone && (
                  <div className="bg-[#F6EFEA] p-3 rounded-xl flex items-center gap-3 shadow-sm border border-[#E8DCCB]">
                     <FiPhone className="text-[#7C3B2E] shrink-0" size={16} />
                     <div className="overflow-hidden">
                        <p className="text-[9px] font-bold uppercase text-[#7C3B2E]">Mobile Number</p>
                        <p className="text-[10px] text-[#444] font-medium truncate">{data.phone}</p>
                     </div>
                  </div>
               )}
               {fictionalData.dob && (
                  <div className="bg-[#F6EFEA] p-3 rounded-xl flex items-center gap-3 shadow-sm border border-[#E8DCCB]">
                     <FiCalendar className="text-[#7C3B2E] shrink-0" size={16} />
                     <div className="overflow-hidden">
                        <p className="text-[9px] font-bold uppercase text-[#7C3B2E]">Date of Birth</p>
                        <p className="text-[10px] text-[#444] font-medium truncate">{fictionalData.dob}</p>
                     </div>
                  </div>
               )}
               {data.address && (
                  <div className="bg-[#F6EFEA] p-3 rounded-xl flex items-center gap-3 shadow-sm border border-[#E8DCCB]">
                     <FiMapPin className="text-[#7C3B2E] shrink-0" size={16} />
                     <div className="overflow-hidden">
                        <p className="text-[9px] font-bold uppercase text-[#7C3B2E]">Location</p>
                        <p className="text-[10px] text-[#444] font-medium truncate">{data.address}</p>
                     </div>
                  </div>
               )}
            </div>

            {/* ================= SOCIAL ICONS ================= */}
            <div className="flex justify-center gap-5 px-6 mb-4">
               {[
                  { val: data.facebook, icon: FaFacebookF, link: `https://facebook.com/${data.facebook}` },
                  { val: data.whatsapp, icon: FaWhatsapp, link: `https://wa.me/${data.whatsapp}` },
                  { val: data.linkedin, icon: FiLinkedin, link: `https://linkedin.com/in/${data.linkedin}` },
                  { val: data.instagram, icon: FiInstagram, link: `https://instagram.com/${data.instagram}` },
                  { val: data.twitter, icon: FiTwitter, link: `https://twitter.com/${data.twitter}` }
               ].map((social, i) => social.val && (
                  <a
                     key={i} href={social.link || null} target="_blank" rel="noopener noreferrer"
                     className="w-10 h-10 rounded-full flex items-center justify-center text-[#7C3B2E] hover:bg-[#7C3B2E] hover:text-white transition-all"
                  >
                     <social.icon size={18} />
                  </a>
               ))}
            </div>

            <div className="px-6">

               {/* ================= GALLERY ================= */}
               <SectionDivider title="Gallery" />
               <div className="w-full rounded-2xl overflow-hidden shadow-sm relative group cursor-pointer">
                  {/* Simulating the slider from the image */}
                  <img src={fictionalData.gallery[0].img} alt="Gallery" className="w-full h-48 object-cover" />
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
                     <span className="w-2 h-2 rounded-full bg-white/50 shadow-sm" />
                     <span className="w-2 h-2 rounded-full bg-white/50 shadow-sm" />
                  </div>
               </div>

               {/* ================= PRODUCTS ================= */}
               <SectionDivider title="Products" />
               <div className="grid grid-cols-2 gap-4">
                  {fictionalData.products.map((prod, idx) => (
                     <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-[#E8DCCB] shadow-sm flex flex-col">
                        <div className="h-32 w-full">
                           <img src={prod.img} alt={prod.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3 text-center flex flex-col justify-between flex-1">
                           <div>
                              <h4 className="text-xs font-bold text-[#2A2A2A] mb-1">{prod.title}</h4>
                              <p className="text-[9px] text-[#666] leading-tight mb-3 line-clamp-2">{prod.desc}</p>
                           </div>
                           <button className="w-full py-1.5 border border-[#7C3B2E] text-[#7C3B2E] text-xs font-bold rounded-full hover:bg-[#7C3B2E] hover:text-white transition-colors">
                              {prod.price}
                           </button>
                        </div>
                     </div>
                  ))}
               </div>

               {/* ================= OUR SERVICES ================= */}
               <SectionDivider title="Our Services" />
               <div className="grid grid-cols-2 gap-4">
                  {fictionalData.services.map((svc, idx) => (
                     <div key={idx} className="bg-white border border-[#E8DCCB] rounded-2xl p-4 text-center shadow-sm relative pt-8">
                        {/* Floating Icon effect like the image */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-white border border-[#E8DCCB] rounded-full flex items-center justify-center text-[#7C3B2E]">
                           <FiStar size={16} className="fill-current" />
                        </div>
                        <h4 className="text-sm font-bold text-[#2A2A2A] mb-2">{svc.title}</h4>
                        <p className="text-[10px] text-[#666] leading-relaxed">{svc.desc}</p>
                     </div>
                  ))}
               </div>

               {/* ================= APPOINTMENT MOCK FORM ================= */}
               <SectionDivider title="Make An Appointment" />
               <div className="bg-transparent space-y-4">
                  <div>
                     <label className="block text-xs font-semibold text-[#444] mb-1">Date *</label>
                     <div className="w-full bg-white border border-[#E8DCCB] rounded-lg px-3 py-2.5 flex justify-between items-center text-sm text-gray-400">
                        <span>Select Date</span>
                        <FiCalendar className="text-[#7C3B2E]" />
                     </div>
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-[#444] mb-1">Time *</label>
                     <div className="grid grid-cols-4 gap-2">
                        {["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00"].map((slot, i) => (
                           <div key={i} className="bg-white border border-[#E8DCCB] text-[#7C3B2E] text-[8px] font-semibold text-center py-2 rounded-lg cursor-pointer hover:bg-[#7C3B2E] hover:text-white transition-colors">
                              {slot}
                           </div>
                        ))}
                     </div>
                  </div>
                  <button className="w-full bg-[#7C3B2E] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#683226] transition-colors mt-2">
                     Book Appointment
                  </button>
               </div>

               {/* ================= BLOG ================= */}
               <SectionDivider title="Blog" />
               <div className="bg-white rounded-2xl overflow-hidden border border-[#E8DCCB] shadow-sm">
                  <div className="h-40 w-full">
                     <img src={fictionalData.blog.img} alt="Blog" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                     <h4 className="text-[#7C3B2E] text-sm font-bold uppercase tracking-wide mb-2">{fictionalData.blog.title}</h4>
                     <p className="text-[11px] text-[#555] leading-relaxed">{fictionalData.blog.desc}</p>
                  </div>
               </div>

               {/* ================= TESTIMONIALS ================= */}
               <SectionDivider title="Testimonials" />
               <div className="bg-transparent text-center px-4 relative">
                  <FaQuoteLeft className="absolute top-0 left-0 text-[#E8DCCB]" size={30} />
                  <FaQuoteRight className="absolute bottom-10 right-0 text-[#E8DCCB]" size={30} />

                  <div className="w-16 h-16 mx-auto rounded-xl overflow-hidden shadow-md mb-4 border-2 border-white">
                     <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop" alt="Client" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs text-[#444] font-medium leading-relaxed italic mb-4 relative z-10">
                     "{fictionalData.testimonial.quote}"
                  </p>
                  <h4 className="text-sm font-bold text-[#7C3B2E]">{fictionalData.testimonial.name}</h4>
                  <div className="flex justify-center gap-1 mt-1 text-[#D4AF37]">
                     <FiStar size={12} className="fill-current" /><FiStar size={12} className="fill-current" /><FiStar size={12} className="fill-current" /><FiStar size={12} className="fill-current" /><FiStar size={12} className="fill-current" />
                  </div>
               </div>

               {/* ================= QR CODE MOCK ================= */}
               <SectionDivider title="QR Code" />
               <div className="flex justify-center gap-4 mb-6">
                  <div className="w-28 h-28 rounded-xl overflow-hidden shadow-sm border border-[#E8DCCB]">
                     <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-28 h-28 bg-white rounded-xl shadow-sm border-2 border-[#7C3B2E] p-2 flex items-center justify-center">
                     {/* Mock QR Code Pattern using generic API image for visual completeness */}
                     <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://vcard.link" alt="QR" className="w-full h-full" />
                  </div>
               </div>
               <button className="w-full bg-[#7C3B2E] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#683226] transition-colors">
                  Download My QR Code
               </button>

               {/* ================= BUSINESS HOURS ================= */}
               <SectionDivider title="Business Hours" />
               <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {fictionalData.hours.map((bh, i) => (
                     <div key={i} className="text-center text-[11px]">
                        <p className="text-[#2A2A2A] font-semibold">{bh.day}</p>
                        <p className="text-[#666]">{bh.hours}</p>
                     </div>
                  ))}
               </div>

               {/* ================= CONTACT US MOCK FORM ================= */}
               <SectionDivider title="Contact Us" />
               <div className="bg-transparent space-y-3 mb-8">
                  <div className="flex gap-3">
                     <input type="text" placeholder="Full Name" className="w-full bg-white border border-[#E8DCCB] rounded-lg px-3 py-2.5 text-xs focus:outline-none" />
                     <input type="email" placeholder="Email Address" className="w-full bg-white border border-[#E8DCCB] rounded-lg px-3 py-2.5 text-xs focus:outline-none" />
                  </div>
                  <input type="text" placeholder="Phone Number" className="w-full bg-white border border-[#E8DCCB] rounded-lg px-3 py-2.5 text-xs focus:outline-none" />
                  <textarea placeholder="Your Message" rows="3" className="w-full bg-white border border-[#E8DCCB] rounded-lg px-3 py-2.5 text-xs focus:outline-none resize-none"></textarea>
                  <button className="w-full bg-[#7C3B2E] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#683226] transition-colors">
                     Send Message
                  </button>
               </div>

               {/* ================= SAVE CONTACT BUTTON (INSIDE FLOW) ================= */}
               <SectionDivider title="Create Your Vcard" />
               <div className="bg-white border border-[#E8DCCB] rounded-xl p-4 flex justify-between items-center mb-4">
                  <span className="text-xs text-gray-400 truncate pr-4">https://vcard.link/elena-rossi...</span>
                  <FiUserPlus className="text-[#7C3B2E] shrink-0" />
               </div>
               <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => downloadVCard(vCardData)}
                  className="w-full bg-[#7C3B2E] text-white py-3.5 rounded-lg font-bold text-sm shadow-lg hover:bg-[#683226] transition-all flex items-center justify-center gap-2 mb-10"
               >
                  Save Contact Details
               </motion.button>

            </div>

            {/* ================= FOOTER ================= */}
            <div className="pb-8 pt-4 text-center">
               <PoweredBy />
            </div>

         </div>

         <style dangerouslySetInnerHTML={{
            __html: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      </div>
   );
};

export default NovaBeauty;