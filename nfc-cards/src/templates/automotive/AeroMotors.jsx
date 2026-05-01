import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FiPhone, FiMail, FiGlobe, FiMapPin, FiInstagram, FiLinkedin,
   FiTwitter, FiUserPlus, FiChevronDown, FiStar, FiClock, FiCalendar,
   FiImage, FiVideo, FiMessageSquare, FiSend, FiCreditCard
} from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaYoutube, FaPinterest } from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

// --- Tapwave-Style Sub-components ---

const SectionCard = ({ children, title, icon: Icon, delay = 0 }) => (
   <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-3xl p-6 shadow-[0_2px_15px_rgba(0,0,0,0.03)] mb-4 border border-gray-50"
   >
      {title && (
         <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
            {Icon && (
               <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon size={16} />
               </div>
            )}
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
         </div>
      )}
      {children}
   </motion.div>
);

const FaqItem = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className="mb-3 last:mb-0 border border-gray-100 rounded-2xl overflow-hidden">
         <button onClick={() => setIsOpen(!isOpen)} className="w-full p-4 flex justify-between items-center text-left bg-gray-50/50 hover:bg-gray-50 transition-colors">
            <span className="font-semibold text-sm text-gray-800 pr-4">{question}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
               <FiChevronDown size={18} className="text-gray-500" />
            </motion.div>
         </button>
         <AnimatePresence>
            {isOpen && (
               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <p className="p-4 pt-2 text-gray-600 text-sm leading-relaxed bg-gray-50/50">{answer}</p>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

// --- Main Component ---

const ModernVCard = ({ userData }) => {
   // Fictional Persona: Luxury Event Planner
   const fictionalData = {
      displayName: "Sophia Sterling",
      role: "Founder & Lead Curator",
      company: "Sterling Luxury Events",
      phone: "+1 (310) 555-0199",
      email: "sophia@sterlingevents.co",
      website: "www.sterlingevents.co",
      address: "Rodeo Drive, Beverly Hills, CA 90210",
      bio: "Curating unforgettable, high-end experiences. From celebrity weddings to exclusive corporate galas, we bring your most extravagant visions to life with flawless execution.",
      profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      bannerImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=400&fit=crop",
      whatsapp: "13105550199",
      instagram: "sterling_events",
      linkedin: "sophiasterling",
      pinterest: "sterlingevents",
      youtube: "sterlingevents",
      services: [
         { title: "Luxury Weddings", desc: "Full-service wedding planning, design, and coordination.", price: "Starts at $15k", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop" },
         { title: "Corporate Galas", desc: "Brand launches, award ceremonies, and VIP corporate retreats.", price: "Custom Quote", img: "https://images.unsplash.com/photo-1505369711641-bc303b60c888?w=400&h=300&fit=crop" },
         { title: "Private Soirées", desc: "Exclusive milestone birthdays, anniversaries, and yacht parties.", price: "Starts at $5k", img: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&h=300&fit=crop" }
      ],
      gallery: [
         "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=400&fit=crop",
         "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=400&fit=crop",
         "https://images.unsplash.com/photo-1530103862676-de8892bb6bf3?w=400&h=400&fit=crop",
         "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400&h=400&fit=crop"
      ],
      testimonials: [
         { name: "Jessica & Mark", text: "Sophia orchestrated our dream wedding in Tuscany. Every detail was perfection. We didn't have to stress about a single thing." },
         { name: "TechCorp Inc.", text: "Sterling Events handled our annual shareholder gala. The level of professionalism and the stunning decor blew our executives away." }
      ],
      businessHours: [
         { day: "Mon - Fri", hours: "09:00 AM - 06:00 PM" },
         { day: "Saturday", hours: "By Appointment Only" },
         { day: "Sunday", hours: "Closed / On-Site Events" }
      ],
      paymentDetails: {
         bankName: "Chase Bank",
         accountName: "Sterling Events LLC",
         accountNumber: "XXXX-XXXX-8921",
         routingNumber: "122XXXXXX",
         qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://paypal.me/sterlingevents"
      },
      faqs: [
         { question: "Do you travel for destination events?", answer: "Yes, we handle events globally. We have extensive experience executing seamless events across Europe, the Caribbean, and Asia." },
         { question: "How far in advance should we book?", answer: "For full-service weddings, we recommend 12-18 months. For corporate and private events, 3-6 months is ideal." }
      ]
   };

   const vCardData = { ...userData, ...fictionalData };

   return (
      <div className="w-full min-h-screen bg-[#F3F4F6] text-gray-800 font-['Inter',sans-serif] pb-24 flex justify-center">

         {/* App Container */}
         <div className="w-full max-w-[480px] bg-[#F3F4F6] relative shadow-2xl min-h-screen border-x border-gray-200/50">

            {/* ================= 1. HEADER & PROFILE ================= */}
            <div className="bg-white rounded-b-[2rem] shadow-sm pb-8 mb-4 relative z-10">
               {/* Banner */}
               <div className="h-56 w-full relative">
                  <img src={fictionalData.bannerImage} alt="Banner" className="w-full h-full object-cover rounded-b-[2rem]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-b-[2rem]" />
                  {/* Top Share Icon Mock */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-white/40">
                     <FiSend size={18} />
                  </div>
               </div>

               {/* Profile Picture (Overlapping) */}
               <div className="relative flex justify-center -mt-16">
                  <div className="w-32 h-32 rounded-full p-1.5 bg-white shadow-lg">
                     <img src={fictionalData.profileImage} alt={fictionalData.displayName} className="w-full h-full object-cover rounded-full" />
                  </div>
                  {/* Verified/Status Tick */}
                  <div className="absolute bottom-2 right-[35%] w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                     <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
               </div>

               {/* Identity */}
               <div className="text-center mt-4 px-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{fictionalData.displayName}</h1>
                  <p className="text-blue-600 font-medium text-sm mb-3">{fictionalData.role}</p>

                  <div className="inline-block bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
                     {fictionalData.company}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 justify-center">
                     <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => downloadVCard(vCardData)}
                        className="flex-1 bg-blue-600 text-white py-3.5 rounded-full font-semibold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                     >
                        <FiUserPlus size={18} /> Save Contact
                     </motion.button>
                     <motion.a
                        whileTap={{ scale: 0.95 }}
                        href={`https://wa.me/${fictionalData.whatsapp}`}
                        target="_blank" rel="noopener noreferrer"
                        className="w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/20 shrink-0"
                     >
                        <FaWhatsapp size={22} />
                     </motion.a>
                  </div>
               </div>
            </div>

            <div className="px-4">

               {/* ================= 2. ABOUT US ================= */}
               <SectionCard delay={0.1}>
                  <p className="text-gray-600 text-sm leading-relaxed text-center">
                     {fictionalData.bio}
                  </p>
               </SectionCard>

               {/* ================= 3. CONTACT INFO ================= */}
               <SectionCard title="Contact Details" icon={FiPhone} delay={0.2}>
                  <div className="space-y-4">
                     <a href={`tel:${fictionalData.phone}`} className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                           <FiPhone size={20} />
                        </div>
                        <div className="border-b border-gray-100 pb-4 w-full group-hover:border-blue-200 transition-colors">
                           <p className="text-xs text-gray-500 font-medium mb-0.5">Mobile</p>
                           <p className="text-sm font-semibold text-gray-800">{fictionalData.phone}</p>
                        </div>
                     </a>

                     <a href={`mailto:${fictionalData.email}`} className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                           <FiMail size={20} />
                        </div>
                        <div className="border-b border-gray-100 pb-4 w-full group-hover:border-blue-200 transition-colors">
                           <p className="text-xs text-gray-500 font-medium mb-0.5">Email</p>
                           <p className="text-sm font-semibold text-gray-800">{fictionalData.email}</p>
                        </div>
                     </a>

                     <a href={`https://${fictionalData.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                           <FiGlobe size={20} />
                        </div>
                        <div className="border-b border-gray-100 pb-4 w-full group-hover:border-blue-200 transition-colors">
                           <p className="text-xs text-gray-500 font-medium mb-0.5">Website</p>
                           <p className="text-sm font-semibold text-gray-800">{fictionalData.website}</p>
                        </div>
                     </a>

                     <a href={`https://maps.google.com/?q=${encodeURIComponent(fictionalData.address)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                           <FiMapPin size={20} />
                        </div>
                        <div className="w-full">
                           <p className="text-xs text-gray-500 font-medium mb-0.5">Location</p>
                           <p className="text-sm font-semibold text-gray-800 leading-snug">{fictionalData.address}</p>
                        </div>
                     </a>
                  </div>
               </SectionCard>

               {/* ================= 4. SOCIAL MEDIA ================= */}
               <SectionCard title="Social Links" icon={FiGlobe} delay={0.3}>
                  <div className="grid grid-cols-4 gap-4">
                     {[
                        { icon: FiInstagram, link: `https://instagram.com/${fictionalData.instagram}`, color: 'bg-pink-50 text-pink-600 hover:bg-pink-600' },
                        { icon: FiLinkedin, link: `https://linkedin.com/in/${fictionalData.linkedin}`, color: 'bg-blue-50 text-blue-600 hover:bg-blue-600' },
                        { icon: FaYoutube, link: `https://youtube.com/${fictionalData.youtube}`, color: 'bg-red-50 text-red-600 hover:bg-red-600' },
                        { icon: FaPinterest, link: `https://pinterest.com/${fictionalData.pinterest}`, color: 'bg-rose-50 text-rose-600 hover:bg-rose-600' }
                     ].map((social, idx) => (
                        <a key={idx} href={social.link} target="_blank" rel="noopener noreferrer" className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center transition-colors group ${social.color.split(' ')[0]} ${social.color.split(' ')[1]} ${social.color.split(' ')[2]} hover:text-white`}>
                           <social.icon size={22} />
                        </a>
                     ))}
                  </div>
               </SectionCard>

               {/* ================= 5. PRODUCTS / SERVICES ================= */}
               <SectionCard title="Our Services" icon={FiStar} delay={0.4}>
                  <div className="space-y-4">
                     {fictionalData.services.map((svc, idx) => (
                        <div key={idx} className="flex gap-4 p-3 border border-gray-100 rounded-2xl hover:shadow-md transition-shadow cursor-pointer">
                           <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                              <img src={svc.img} alt={svc.title} className="w-full h-full object-cover" />
                           </div>
                           <div className="flex flex-col justify-center">
                              <h4 className="font-bold text-gray-800 mb-1 leading-tight">{svc.title}</h4>
                              <p className="text-xs text-gray-500 line-clamp-2 mb-2">{svc.desc}</p>
                              <span className="inline-block bg-green-50 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-md self-start">{svc.price}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </SectionCard>

               {/* ================= 6. GALLERY ================= */}
               <SectionCard title="Gallery" icon={FiImage} delay={0.5}>
                  <div className="grid grid-cols-2 gap-3">
                     {fictionalData.gallery.map((img, idx) => (
                        <div key={idx} className="aspect-square rounded-2xl overflow-hidden">
                           <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer" />
                        </div>
                     ))}
                  </div>
               </SectionCard>

               {/* ================= 7. PAYMENT DETAILS ================= */}
               <SectionCard title="Bank Details & Payment" icon={FiCreditCard} delay={0.6}>
                  <div className="flex flex-col items-center">
                     <div className="w-32 h-32 p-2 border border-gray-200 rounded-2xl mb-4 bg-white shadow-sm">
                        <img src={fictionalData.paymentDetails.qrCode} alt="Scan to Pay" className="w-full h-full" />
                     </div>
                     <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Scan to Pay</p>

                     <div className="w-full bg-gray-50 rounded-xl p-4 border border-gray-100 text-sm">
                        <div className="flex justify-between mb-2">
                           <span className="text-gray-500">Bank Name</span>
                           <span className="font-bold text-gray-800">{fictionalData.paymentDetails.bankName}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                           <span className="text-gray-500">Account Name</span>
                           <span className="font-bold text-gray-800">{fictionalData.paymentDetails.accountName}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                           <span className="text-gray-500">Account No.</span>
                           <span className="font-bold text-gray-800">{fictionalData.paymentDetails.accountNumber}</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-500">Routing No.</span>
                           <span className="font-bold text-gray-800">{fictionalData.paymentDetails.routingNumber}</span>
                        </div>
                     </div>
                  </div>
               </SectionCard>

               {/* ================= 8. TESTIMONIALS ================= */}
               <SectionCard title="Testimonials" icon={FiMessageSquare} delay={0.7}>
                  <div className="space-y-4">
                     {fictionalData.testimonials.map((test, idx) => (
                        <div key={idx} className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                           <div className="flex text-yellow-400 mb-3 gap-1">
                              <FiStar size={14} className="fill-current" /><FiStar size={14} className="fill-current" /><FiStar size={14} className="fill-current" /><FiStar size={14} className="fill-current" /><FiStar size={14} className="fill-current" />
                           </div>
                           <p className="text-sm text-gray-700 italic mb-3">"{test.text}"</p>
                           <p className="text-xs font-bold text-gray-900">— {test.name}</p>
                        </div>
                     ))}
                  </div>
               </SectionCard>

               {/* ================= 9. BUSINESS HOURS ================= */}
               <SectionCard title="Business Hours" icon={FiClock} delay={0.8}>
                  <div className="space-y-3">
                     {fictionalData.businessHours.map((bh, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                           <span className="text-sm font-semibold text-gray-600">{bh.day}</span>
                           <span className="text-sm font-bold text-gray-900">{bh.hours}</span>
                        </div>
                     ))}
                  </div>
               </SectionCard>

               {/* ================= 10. FAQ ================= */}
               <SectionCard title="Frequently Asked Questions" icon={FiMessageSquare} delay={0.9}>
                  <div>
                     {fictionalData.faqs.map((faq, index) => <FaqItem key={index} question={faq.question} answer={faq.answer} />)}
                  </div>
               </SectionCard>

               {/* ================= 11. ENQUIRY FORM (Visual Mockup) ================= */}
               <SectionCard title="Send an Enquiry" icon={FiSend} delay={1.0}>
                  <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                     <input type="text" placeholder="Your Name" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" />
                     <input type="email" placeholder="Your Email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" />
                     <textarea placeholder="Your Message" rows="3" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 resize-none"></textarea>
                     <button className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl text-sm hover:bg-black transition-colors">Submit Enquiry</button>
                  </form>
               </SectionCard>

            </div>

            {/* Footer */}
            <div className="pb-8 pt-4">
               <PoweredBy />
            </div>
         </div>
      </div>
   );
};

export default ModernVCard;