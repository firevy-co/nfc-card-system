import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FiPhone, FiMail, FiGlobe, FiMapPin, FiInstagram, FiTwitter,
   FiChevronLeft, FiChevronRight, FiPlay, FiPlus, FiVideo,
   FiCalendar, FiClock, FiStar, FiUser
} from 'react-icons/fi';
import { FaFacebookF, FaWhatsapp, FaLinkedinIn, FaQuoteLeft, FaQuoteRight, FaCameraRetro } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Theme Colors ---
const ORANGE = "#FF7F00";
const DARK_CARD = "#151515";
const DARK_BG = "#0A0A0A";

// --- Sub-components replicating the image UI ---

const SectionTitle = ({ title }) => (
   <div className="flex items-center mb-6 -ml-6">
      <div className="w-2 h-6" style={{ backgroundColor: ORANGE }} />
      <h2 className="ml-4 text-[17px] font-bold text-white tracking-wide">{title}</h2>
   </div>
);

const ContactBox = ({ icon: Icon, label, value, link }) => (
   <a href={link || null} target="_blank" rel="noopener noreferrer" className="bg-[#151515] rounded-xl p-3 flex items-center gap-3">
      <div className="w-8 h-8 rounded-md bg-[#222] flex items-center justify-center shrink-0">
         <Icon className="text-white" size={14} />
      </div>
      <div className="overflow-hidden">
         <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
         <p className="text-xs text-white font-medium truncate">{value}</p>
      </div>
   </a>
);

// --- Main Component ---

const PureAura = ({ userData }) => {
   // Completely Fictional Persona: High-End Bridal & Event MUA
   const fictionalData = {
      displayName: "Isabella Vance",
      role: "Luxury Event & Bridal MUA",
      phone: "+1 (424) 555-0192",
      email: "booking@isabellavance.com",
      website: "www.isabellavance.com",
      address: "Rodeo Drive, Beverly Hills, CA",
      businessName: "Isabella Vance Beauty",
      facebook: "isabellavancebeauty",
      whatsapp: "14245550192",
      linkedin: "isabellavance",
      instagram: "isabella.vance.glam",
      twitter: "isabellaglams",
      bio: "Specializing in high-end bridal makeup, celebrity red carpets, and editorial events. Bringing out your inner glow with premium cosmetics, expert techniques, and flawless execution for your most important moments.",
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      bannerImage: "https://images.unsplash.com/photo-1516975080661-460d3d57d23a?w=1200&h=600&fit=crop",
      services: [
         { title: "Bridal Masterpiece", desc: "Comprehensive bridal styling, including a 2-hour trial, premium skin prep, and luxury HD airbrush application designed to last 16+ hours.", icon: FiStar },
         { title: "Editorial Glamour", desc: "High-fashion, creative makeup designed specifically for studio lighting, runway shows, and professional photography.", icon: FaCameraRetro }
      ],
      products: [
         { title: "Luminous Setting Mist", price: "$45", category: "Skin Prep", img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop" },
         { title: "Velvet Matte Rouge", price: "$32", category: "Cosmetics", img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop" }
      ],
      galleryImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=500&fit=crop",
      testimonial: {
         text: "Isabella is absolutely incredible. She handled the makeup for my entire bridal party of 8 people flawlessly. We all looked stunning and the makeup didn't budge once.",
         name: "Sophia Martinez",
         role: "Bridal Client"
      },
      blog: {
         title: "The Ultimate Guide to Pre-Wedding Skin Prep",
         date: "Oct 12, 2026",
         img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop"
      },
      hours: [
         { day: "Sunday", hours: "08:00 - 14:00" },
         { day: "Monday", hours: "09:00 - 18:00" },
         { day: "Tuesday", hours: "09:00 - 18:00" },
         { day: "Wednesday", hours: "09:00 - 18:00" },
         { day: "Thursday", hours: "09:00 - 18:00" },
         { day: "Friday", hours: "09:00 - 20:00" },
         { day: "Saturday", hours: "Closed" }
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
      youtube: userData?.youtube || fictionalData.youtube,
      tiktok: userData?.tiktok || fictionalData.tiktok,
      telegram: userData?.telegram || fictionalData.telegram,
      bio: userData?.bio || fictionalData.bio,
      profileImage: userData?.profileImage || userData?.avatar || userData?.logo || fictionalData.profileImage || fictionalData.avatar || fictionalData.defaultAvatar,
      avatar: userData?.profileImage || userData?.avatar || userData?.logo || fictionalData.profileImage || fictionalData.avatar || fictionalData.defaultAvatar,
      logo: userData?.logo || userData?.profileImage || fictionalData.logo,
      bannerImage: userData?.coverPhoto || fictionalData.bannerImage || fictionalData.coverImage,
   };
   return (
      <div className="w-full min-h-screen bg-[#050505] text-gray-300 font-['Poppins',sans-serif] flex justify-center pb-12 selection:bg-[#FF7F00] selection:text-white">

         {/* Container with Golden Bokeh Background */}
         <div className="w-full max-w-[480px] bg-[#0A0A0A] relative shadow-[0_0_50px_rgba(0,0,0,0.8)] min-h-screen border-x border-[#1A1A1A] overflow-hidden flex flex-col">

            {/* Immersive Bokeh Background Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen bg-[url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center bg-fixed" />
            <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />

            <div className="relative z-10">

               {/* ================= HERO BANNER ================= */}
               <div className="w-full h-[220px] relative">
                  <img src={data.bannerImage} alt="Event" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
               </div>

               {/* ================= PROFILE HEADER ================= */}
               <div className="px-6 flex items-center gap-4 -mt-10 mb-8 relative">
                  <div className="w-20 h-20 rounded-full border-2 border-white shadow-lg overflow-hidden shrink-0 bg-white">
                     <img src={data.profileImage} alt={data.displayName} className="w-full h-full object-cover" />
                  </div>
                  <div className="pt-8">
                     <h1 className="text-xl font-bold text-white tracking-wide">{data.displayName}</h1>
                     <p className="text-[11px] font-semibold text-[#FF7F00]">{data.role}</p>
                  </div>
               </div>

               <div className="px-6 mb-8 text-center">
                  <p className="text-[11px] text-gray-300 leading-relaxed font-medium">
                     {data.bio}
                  </p>
               </div>

               {/* ================= SOCIAL ICONS (Exact Image Style) ================= */}
               <div className="flex justify-center gap-5 px-6 mb-10">
                  {[
                     { val: data.facebook, icon: FaFacebookF, link: `https://facebook.com/${data.facebook}` },
                     { val: data.whatsapp, icon: FaWhatsapp, link: `https://wa.me/${data.whatsapp}` },
                     { val: data.linkedin, icon: FaLinkedinIn, link: `https://linkedin.com/in/${data.linkedin}` },
                     { val: data.instagram, icon: FiInstagram, link: `https://instagram.com/${data.instagram}` },
                     { val: data.twitter, icon: FiTwitter, link: `https://twitter.com/${data.twitter}` }
                  ].map((social, i) => social.val && (
                     <a key={i} href={social.link || null} target="_blank" rel="noopener noreferrer" className="text-[#FF7F00] hover:text-white transition-colors">
                        <social.icon size={18} />
                     </a>
                  ))}
               </div>

               <div className="px-6">

                  {/* ================= CONTACT ================= */}
                  <SectionTitle title="Contact" />
                  <div className="grid grid-cols-2 gap-3 mb-10">
                     {data.email && <ContactBox icon={FiMail} label="Email Address" value={data.email} link={`mailto:${data.email}`} />}
                     {data.phone && <ContactBox icon={FiPhone} label="Mobile Number" value={data.phone} link={`tel:${data.phone}`} />}
                     {data.website && <ContactBox icon={FiGlobe} label="Website" value={data.website} link={`https://${data.website}`} />}
                     {data.address && <ContactBox icon={FiMapPin} label="Location" value={data.address} link={`https://maps.google.com/?q=${data.address}`} />}
                  </div>

                  {/* ================= OUR SERVICES ================= */}
                  <SectionTitle title="Our Services" />
                  <div className="space-y-4 mb-10">
                     {fictionalData.services.map((svc, i) => (
                        <div key={i} className="flex gap-4 items-start">
                           <div className="w-10 h-10 rounded-md bg-[#FF7F00]/10 border border-[#FF7F00]/20 flex items-center justify-center shrink-0">
                              <svc.icon className="text-[#FF7F00]" size={16} />
                           </div>
                           <div>
                              <h4 className="text-sm font-bold text-white mb-1.5">{svc.title}</h4>
                              <p className="text-[10px] text-gray-400 leading-relaxed pr-2">{svc.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* ================= MAKE AN APPOINTMENT ================= */}
                  <SectionTitle title="Make an Appointment" />
                  <div className="mb-10">
                     <div className="flex items-center bg-[#151515] border border-white/5 rounded-md px-4 py-3 mb-3">
                        <span className="text-[11px] text-gray-500 w-16">Date:</span>
                        <input type="text" placeholder="Select Date" className="bg-transparent w-full text-xs text-white focus:outline-none" readOnly />
                        <FiCalendar className="text-gray-500" size={14} />
                     </div>
                     <div className="flex items-start bg-[#151515] border border-white/5 rounded-md px-4 py-3 mb-4">
                        <span className="text-[11px] text-gray-500 w-16 pt-1">Time:</span>
                        <div className="grid grid-cols-2 gap-2 w-full">
                           {["10:00 - 11:00", "11:00 - 12:00", "14:00 - 15:00", "15:00 - 16:00"].map((time, idx) => (
                              <div key={idx} className="bg-[#222] text-center py-2 rounded text-[10px] text-gray-300 hover:bg-[#FF7F00] hover:text-white cursor-pointer transition-colors">
                                 {time}
                              </div>
                           ))}
                        </div>
                     </div>
                     <button className="w-full py-3.5 bg-[#FF7F00] text-white rounded-md text-xs font-bold hover:bg-[#E67200] transition-colors">
                        Book an Appointment
                     </button>
                  </div>

                  {/* ================= GALLERY (SLIDER MOCKUP) ================= */}
                  <SectionTitle title="Gallery" />
                  <div className="relative w-full h-48 rounded-xl overflow-hidden mb-10 border border-white/10">
                     <img src={fictionalData.galleryImage} alt="Gallery" className="w-full h-full object-cover opacity-80" />
                     <div className="absolute inset-0 flex items-center justify-between px-2">
                        <div className="w-6 h-6 bg-black/50 backdrop-blur-sm flex items-center justify-center cursor-pointer">
                           <FiChevronLeft className="text-white" size={14} />
                        </div>
                        <div className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer shadow-lg">
                           <FiPlay className="text-black ml-0.5" size={18} />
                        </div>
                        <div className="w-6 h-6 bg-[#FF7F00] flex items-center justify-center cursor-pointer">
                           <FiChevronRight className="text-white" size={14} />
                        </div>
                     </div>
                  </div>

                  {/* ================= PRODUCTS ================= */}
                  <SectionTitle title="Products" />
                  <div className="grid grid-cols-2 gap-4 mb-10">
                     {fictionalData.products.map((prod, i) => (
                        <div key={i} className="bg-[#151515] rounded-xl overflow-hidden border border-white/5 relative">
                           <div className="h-32 w-full">
                              <img src={prod.img} alt={prod.title} className="w-full h-full object-cover" />
                           </div>
                           <div className="p-3">
                              <div className="flex justify-between items-start mb-1">
                                 <h4 className="text-xs font-bold text-white truncate pr-2">{prod.title}</h4>
                                 <span className="text-[#FF7F00] text-xs font-bold">{prod.price}</span>
                              </div>
                              <p className="text-[9px] text-gray-500">{prod.category}</p>
                           </div>
                           {/* Floating Add Button */}
                           <div className="absolute bottom-2 right-2 w-7 h-7 bg-[#FF7F00] rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg">
                              <FiPlus size={14} />
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* ================= TESTIMONIAL ================= */}
                  <SectionTitle title="Testimonial" />
                  <div className="mb-10 px-4">
                     <FaQuoteLeft className="text-[#FF7F00] mb-2" size={20} />
                     <div className="bg-[#151515] p-6 rounded-xl border border-white/5 mx-2">
                        <p className="text-xs text-gray-300 leading-relaxed text-center mb-4 italic">
                           "{fictionalData.testimonial.text}"
                        </p>
                        <div className="flex items-center justify-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-gray-600 overflow-hidden">
                              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="Client" className="w-full h-full object-cover" />
                           </div>
                           <div className="text-left">
                              <p className="text-xs font-bold text-white leading-tight">{fictionalData.testimonial.name}</p>
                              <p className="text-[9px] text-[#FF7F00]">{fictionalData.testimonial.role}</p>
                           </div>
                        </div>
                     </div>
                     <FaQuoteRight className="text-[#FF7F00] mt-2 ml-auto" size={20} />
                  </div>

                  {/* ================= BLOG ================= */}
                  <SectionTitle title="Blog" />
                  <div className="flex overflow-x-auto gap-4 hide-scrollbar mb-10">
                     <div className="min-w-[280px] bg-[#151515] border border-white/5 rounded-xl overflow-hidden snap-center">
                        <div className="h-36 w-full relative">
                           <img src={fictionalData.blog.img} alt="Blog" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                           <h4 className="text-sm font-bold text-white mb-2">{fictionalData.blog.title}</h4>
                           <p className="text-[10px] text-gray-400 line-clamp-2">{fictionalData.blog.desc}</p>
                           <div className="flex justify-center gap-1 mt-4">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7F00]" />
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* ================= QR CODE ================= */}
                  <div className="flex flex-col items-center mb-10">
                     <h2 className="text-sm font-bold text-white tracking-wide mb-4">QR Code</h2>
                     <div className="bg-white p-4 rounded-xl w-48 h-48 flex items-center justify-center relative shadow-lg">
                        {/* Simulated QR Pattern */}
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://vcard.link" alt="QR Code" className="w-full h-full" />
                        {/* Center Profile Image in QR */}
                        <div className="absolute w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-white">
                           <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                     </div>
                     <button className="mt-4 px-6 py-2.5 bg-[#FF7F00] text-white rounded text-xs font-bold hover:bg-[#E67200] transition-colors">
                        Download My VCard
                     </button>
                  </div>

                  {/* ================= BUSINESS HOURS ================= */}
                  <SectionTitle title="Business Hours" />
                  <div className="bg-[#151515] p-5 rounded-xl border border-white/5 mb-10">
                     {fictionalData.hours.map((bh, i) => (
                        <div key={i} className="flex justify-between items-center py-2 text-xs">
                           <span className="text-gray-400 font-medium">{bh.day}</span>
                           <span className={bh.hours === 'Closed' ? 'text-[#FF7F00]' : 'text-white'}>{bh.hours}</span>
                        </div>
                     ))}
                  </div>

                  {/* ================= CONTACT US MOCK FORM ================= */}
                  <SectionTitle title="Contact Us" />
                  <div className="space-y-3 mb-10">
                     <div className="flex gap-3">
                        <div className="flex-1 bg-[#151515] border border-white/10 rounded px-4 py-3 flex items-center">
                           <FiUser className="text-gray-500 mr-3 shrink-0" size={14} />
                           <input type="text" placeholder="Full Name" className="bg-transparent w-full text-xs text-white focus:outline-none placeholder-gray-600" />
                        </div>
                        <div className="flex-1 bg-[#151515] border border-white/10 rounded px-4 py-3 flex items-center">
                           <FiPhone className="text-gray-500 mr-3 shrink-0" size={14} />
                           <input type="text" placeholder="Phone Number" className="bg-transparent w-full text-xs text-white focus:outline-none placeholder-gray-600" />
                        </div>
                     </div>
                     <div className="bg-[#151515] border border-white/10 rounded px-4 py-3 flex items-center">
                        <input type="email" placeholder="Email Address" className="bg-transparent w-full text-xs text-white focus:outline-none placeholder-gray-600" />
                     </div>
                     <div className="bg-[#151515] border border-white/10 rounded px-4 py-3 flex items-start">
                        <textarea placeholder="Your Message" rows="3" className="bg-transparent w-full text-xs text-white focus:outline-none placeholder-gray-600 resize-none"></textarea>
                     </div>
                     <div className="flex justify-center mt-2">
                        <button className="px-8 py-3 bg-[#FF7F00] text-white rounded text-xs font-bold hover:bg-[#E67200] transition-colors">
                           Send Message
                        </button>
                     </div>
                  </div>

                  {/* ================= CREATE YOUR VCARD (SAVE CONTACT) ================= */}
                  <SectionTitle title="Create Your VCard" />
                  <div className="bg-[#151515] border border-white/10 rounded-lg px-4 py-3.5 flex justify-between items-center mb-6">
                     <span className="text-xs text-gray-400 truncate">https://vcard.link/isabella-vance...</span>
                     <FiGlobe className="text-[#FF7F00] shrink-0" size={16} />
                  </div>

                  <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={() => downloadVCard(vCardData)}
                     className="w-full py-4 bg-[#FF7F00] text-white rounded-lg font-bold text-sm shadow-[0_4px_15px_rgba(255,127,0,0.4)] hover:bg-[#E67200] transition-colors mb-10"
                  >
                     Add To Contact
                  </motion.button>

               </div>

               <div className="pb-8 text-center text-white/50">
                  <PoweredBy />
               </div>

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

export default PureAura;