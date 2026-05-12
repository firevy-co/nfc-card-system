import React, { useState } from 'react';
import {
   FiPhone, FiMail, FiGlobe, FiTarget, FiMapPin, FiInstagram, FiTwitter, FiLinkedin,
   FiUserPlus, FiActivity, FiPlay, FiMessageSquare, FiShare2, FiPlus,
   FiCalendar, FiDownload, FiHeart, FiAward, FiClock
} from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const SectionTitle = ({ children }) => (
   <div className="flex items-center justify-center gap-4 my-8">
      <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#A2FF00]" />
      <h2 className="text-sm font-black uppercase tracking-wider text-white select-none">{children}</h2>
      <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#A2FF00]" />
   </div>
);

const SocialBtn = ({ icon: Icon, href }) => {
   if (!href) return null;
   return (
      <a
         href={href || null}
         target="_blank"
         rel="noopener noreferrer"
         className="w-10 h-10 rounded-xl bg-[#141920] border border-slate-800 text-slate-400 hover:text-[#A2FF00] hover:border-[#A2FF00] hover:bg-[#0c0f13] flex items-center justify-center transition-all hover:scale-105"
      >
         <Icon size={18} />
      </a>
   );
};

const ContactCard = ({ icon: Icon, label, value, href }) => {
   if (!value || value === "" || value.includes('resolving')) return null;
   const Comp = href ? 'a' : 'div';
   return (
      <Comp
         href={href || null}
         target={href ? "_blank" : undefined}
         rel={href ? "noopener noreferrer" : undefined}
         className="flex flex-col bg-[#141920] border border-slate-800/60 hover:border-[#A2FF00]/40 p-4 rounded-2xl transition-all hover:shadow-md hover:shadow-[#A2FF00]/5 group select-none cursor-pointer"
      >
         <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#0c0f13] text-[#A2FF00] flex items-center justify-center group-hover:scale-105 transition-transform border border-slate-800">
               <Icon size={16} />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#A2FF00] font-bold">
               {label}
            </span>
         </div>
         <span className="text-xs font-semibold text-slate-300 truncate pl-1">{value}</span>
      </Comp>
   );
};

const ServiceCard = ({ icon: Icon, title, desc }) => (
   <div className="bg-[#141920] border border-slate-800/60 p-5 rounded-2xl hover:border-[#A2FF00]/40 transition-all group select-none">
      <div className="w-12 h-12 rounded-xl bg-[#0c0f13] border border-slate-800 text-[#A2FF00] flex items-center justify-center mb-4 group-hover:scale-105 transition-all">
         <Icon size={22} />
      </div>
      <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">{title}</h3>
      <p className="text-xs text-slate-400 leading-5">{desc}</p>
   </div>
);

const ProductCard = ({ img, name, price }) => (
   <div className="bg-[#141920] border border-slate-800/60 p-4 rounded-2xl hover:border-[#A2FF00]/40 transition-all group relative flex flex-col justify-between select-none">
      <div>
         <div className="aspect-square bg-[#0c0f13] border border-slate-800 rounded-xl overflow-hidden mb-3 relative group">
            <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-slate-700 text-slate-300 hover:text-[#A2FF00] hover:border-[#A2FF00] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
               <FiShare2 size={13} />
            </button>
         </div>
         <h4 className="text-xs font-bold text-white tracking-wide mb-1 line-clamp-1 group-hover:text-[#A2FF00] transition-colors">{name}</h4>
         <p className="text-xs font-black text-[#A2FF00]">{price}</p>
      </div>

      <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
         <button className="w-7 h-7 rounded-full bg-[#A2FF00] text-black hover:bg-white flex items-center justify-center transition-all shadow-lg shadow-[#A2FF00]/20">
            <FiPlus size={14} />
         </button>
      </div>
   </div>
);

const ApexSport = ({ userData }) => {
   const {
      displayName, email, phone, website, address,
      linkedin, twitter, instagram, logo
   } = userData || {};

   const [selectedTime, setSelectedTime] = useState("");
   const [selectedDate, setSelectedDate] = useState("");

   const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
   const [sent, setSent] = useState(false);

   const handleSend = (e) => {
      e.preventDefault();
      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSent(false), 3500);
   };

   return (
      <div className="min-h-screen bg-[#080b0e] flex items-center justify-center font-['Inter',sans-serif] md:bg-neutral-950">
         <div className="w-full max-w-md bg-[#0c0f13] border border-slate-800/80 shadow-2xl relative overflow-hidden flex flex-col min-h-screen md:min-h-0 md:my-6 md:border-2">

            {/* =========================================
               HERO HEADER SECTION
            ========================================== */}
            <header className="relative w-full h-[360px] overflow-hidden shrink-0">
               <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
                  alt="Cover"
                  className="w-full h-full object-cover select-none"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f13] via-[#0c0f13]/50 to-black/30" />

               <div className="absolute bottom-5 left-5 right-5 flex items-end gap-4">
                  <div className="w-20 h-20 rounded-xl bg-[#141920] border-2 border-[#A2FF00] overflow-hidden shrink-0 shadow-xl group">
                     {logo ? (
                        <img src={logo} alt="Profile" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                     ) : (
                        <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=80" alt="Profile" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                     )}
                  </div>

                  <div className="flex-1 min-w-0">
                     <h1 className="text-xl font-black text-white tracking-tight truncate">
                        {displayName || "Richard Madden"}
                     </h1>
                     <p className="text-xs font-bold text-[#A2FF00] uppercase tracking-widest mt-1 select-none">
                        Gym Trainer
                     </p>
                     {/* Social Buttons */}
                     <div className="flex flex-wrap gap-2 mt-3 select-none">
                        <SocialBtn icon={FiInstagram} href={instagram || null} />
                        <SocialBtn icon={FiTwitter} href={twitter || null} />
                        <SocialBtn icon={FiLinkedin} href={linkedin || null} />

                     </div>
                  </div>
               </div>
            </header>

            {/* Content body with responsive scrolling or natural flex flow */}
            <div className="px-5 pb-8 space-y-2 -mt-1 flex-1 flex flex-col">

               {/* BIO */}
               <p className="text-slate-400 text-xs leading-6 pt-5 pb-2 text-center max-w-sm mx-auto select-none">
                  Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
               </p>

               {/* =========================================
                  CONTACT SECTION
               ========================================== */}
               <SectionTitle>Contact</SectionTitle>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <ContactCard icon={FiMail} label="Email" value={email} href={email ? `mailto:${email}` : null} />
                  <ContactCard icon={FiPhone} label="Mobile" value={phone} href={phone ? `tel:${phone}` : null} />
                  <ContactCard icon={FiMapPin} label="Location" value={address || "California, USA"} />
                  <ContactCard icon={FiGlobe} label="Website" value={website} href={website || null} />
               </div>

               {/* =========================================
                  MAKE AN APPOINTMENT SECTION
               ========================================== */}
               <SectionTitle>Make an Appointment</SectionTitle>
               <div className="bg-[#141920] border border-slate-800/60 p-4.5 p-5 rounded-2xl space-y-4">
                  <div>
                     <label className="text-[10px] uppercase tracking-wider text-[#A2FF00] font-black block mb-2">
                        Date
                     </label>
                     <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-[#0c0f13] border border-slate-800 text-slate-300 text-xs rounded-xl px-4 py-3 outline-none focus:border-[#A2FF00] transition-all"
                     />
                  </div>

                  <div>
                     <label className="text-[10px] uppercase tracking-wider text-[#A2FF00] font-black block mb-2">
                        Time
                     </label>
                     <div className="grid grid-cols-2 gap-2">
                        {["10:00 AM", "11:00 AM", "01:00 PM", "04:00 PM"].map((time, idx) => (
                           <button
                              key={idx}
                              onClick={() => setSelectedTime(time)}
                              className={`py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border ${selectedTime === time
                                 ? "bg-[#A2FF00] text-black border-[#A2FF00]"
                                 : "bg-[#0c0f13] text-slate-400 border-slate-800 hover:text-white"
                                 }`}
                           >
                              {time}
                           </button>
                        ))}
                     </div>
                  </div>
               </div>

               {/* =========================================
                  SERVICES SECTION
               ========================================== */}
               <SectionTitle>Our Services</SectionTitle>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <ServiceCard
                     icon={FiActivity}
                     title="Physical Fitness"
                     desc="Custom personalized training routines to build overall strength and mobility."
                  />
                  <ServiceCard
                     icon={FiHeart}
                     title="Fat Loss"
                     desc="Nutritional and cardio routines specifically tailored for accelerated fat loss."
                  />
               </div>

               {/* =========================================
                  GALLERY SECTION
               ========================================== */}
               <SectionTitle>Gallery</SectionTitle>
               <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 aspect-video bg-[#141920] border border-slate-800 rounded-xl overflow-hidden relative group cursor-pointer">
                     <img
                        src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=500&q=80"
                        alt="Gallery 1"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     />
                     <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center border border-white/20 group-hover:scale-105 transition-all group-hover:text-[#A2FF00] group-hover:border-[#A2FF00]/40">
                           <FiPlay size={14} className="fill-white" />
                        </div>
                     </div>
                  </div>
                  <div className="col-span-1 aspect-square bg-[#141920] border border-slate-800 rounded-xl overflow-hidden group cursor-pointer">
                     <img
                        src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=300&q=80"
                        alt="Gallery 2"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     />
                  </div>
               </div>

               {/* =========================================
                  PRODUCTS SECTION
               ========================================== */}
               <SectionTitle>Products</SectionTitle>
               <div className="grid grid-cols-2 gap-3.5">
                  <ProductCard
                     img="https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&w=400&q=80"
                     name="Premium Dumbbells"
                     price="$120.00"
                  />
                  <ProductCard
                     img="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=400&q=80"
                     name="Kettlebell Set"
                     price="$75.00"
                  />
               </div>

               {/* =========================================
                  TESTIMONIALS SECTION
               ========================================== */}
               <SectionTitle>Testimonials</SectionTitle>
               <div className="bg-[#141920] border border-slate-800/60 p-6 rounded-2xl relative overflow-hidden flex flex-col items-center text-center group select-none">
                  <div className="absolute -top-3 right-6 text-slate-800/25 select-none pointer-events-none text-7xl font-serif">
                     “
                  </div>
                  <FiMessageSquare size={32} className="text-[#A2FF00] mb-3 group-hover:scale-105 transition-transform" />
                  <p className="text-slate-400 text-xs italic leading-6 mb-4 max-w-sm">
                     "The tailored fitness plan completely transformed my athletic capabilities. Exceptional and highly scientific coaching style."
                  </p>
                  <div className="flex items-center gap-3">
                     <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Reviewer" className="w-9 h-9 rounded-full object-cover border border-slate-700 select-none" />
                     <div className="text-left">
                        <h5 className="text-xs font-black uppercase text-white tracking-wider">Aisha Khan</h5>
                        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Marathon Runner</p>
                     </div>
                  </div>
               </div>

               {/* =========================================
                  BLOG SECTION
               ========================================== */}
               <SectionTitle>Blog</SectionTitle>
               <div className="bg-[#141920] border border-slate-800/60 rounded-2xl overflow-hidden flex hover:border-[#A2FF00]/40 transition-all group select-none cursor-pointer">
                  <div className="w-24 h-24 shrink-0 overflow-hidden relative">
                     <img src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80" alt="Blog" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3.5 flex flex-col justify-center flex-1">
                     <span className="text-[8px] uppercase tracking-widest text-[#A2FF00] font-black">Workout Tips</span>
                     <h4 className="text-xs font-bold text-white tracking-wide mt-1 line-clamp-2">The Ultimate High Performance Full-Body Workout Routine</h4>
                     <span className="text-[9px] text-slate-500 mt-2 flex items-center gap-1.5 font-semibold">
                        <FiCalendar size={10} /> May 02, 2026
                     </span>
                  </div>
               </div>

               {/* =========================================
                  QR CODE SECTION
               ========================================== */}
               <SectionTitle>QR Code</SectionTitle>
               <div className="bg-[#141920] border border-slate-800/60 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5 group hover:border-[#A2FF00]/40 transition-all">
                  <div className="flex-1 text-center sm:text-left select-none">
                     <h4 className="text-xs font-black uppercase text-white tracking-wider mb-2">Please scan QR Code</h4>
                     <p className="text-xs text-slate-400 max-w-[200px] mx-auto sm:mx-0 mb-3.5">Instantly transfer my profile information to your smartphone contact list.</p>
                     <button
                        onClick={() => downloadVCard(userData)}
                        className="inline-flex items-center gap-2 bg-[#A2FF00] hover:bg-white text-black text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-md shadow-[#A2FF00]/10"
                     >
                        <FiDownload size={13} /> Save Contact
                     </button>
                  </div>
                  <div className="shrink-0 w-28 h-28 bg-white rounded-xl p-2.5 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                     <svg className="w-full h-full text-black" viewBox="0 0 100 100" fill="none">
                        <rect x="0" y="0" width="100" height="100" fill="white" />
                        <rect x="10" y="10" width="30" height="30" stroke="black" strokeWidth="6" fill="none" />
                        <rect x="18" y="18" width="14" height="14" fill="black" />
                        <rect x="60" y="10" width="30" height="30" stroke="black" strokeWidth="6" fill="none" />
                        <rect x="68" y="18" width="14" height="14" fill="black" />
                        <rect x="10" y="60" width="30" height="30" stroke="black" strokeWidth="6" fill="none" />
                        <rect x="18" y="68" width="14" height="14" fill="black" />
                        <rect x="55" y="55" width="8" height="8" fill="black" />
                        <rect x="65" y="65" width="10" height="10" fill="black" />
                        <rect x="55" y="75" width="12" height="6" fill="black" />
                        <rect x="75" y="75" width="15" height="15" fill="black" />
                        <rect x="85" y="55" width="5" height="12" fill="black" />
                     </svg>
                  </div>
               </div>

               {/* =========================================
                  BUSINESS HOURS SECTION
               ========================================== */}
               <SectionTitle>Business Hours</SectionTitle>
               <div className="bg-[#141920] border border-slate-800/60 p-5 rounded-2xl space-y-3.5 select-none relative overflow-hidden group">
                  <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none select-none text-[#A2FF00]">
                     <FiClock size={40} />
                  </div>
                  {[
                     { day: "Monday - Friday", hours: "06:00 - 22:00" },
                     { day: "Saturday", hours: "07:00 - 20:00" },
                     { day: "Sunday", hours: "Closed" }
                  ].map((item, i) => (
                     <div key={i} className="flex justify-between items-center text-xs border-b border-slate-800/40 last:border-0 pb-2 last:pb-0">
                        <span className="text-slate-300 font-bold uppercase tracking-wider">{item.day}</span>
                        <span className={`font-black uppercase tracking-wider ${item.hours === 'Closed' ? 'text-red-400' : 'text-[#A2FF00]'}`}>{item.hours}</span>
                     </div>
                  ))}
               </div>

               {/* =========================================
                  CONTACT US FORM SECTION
               ========================================== */}
               <SectionTitle>Contact Us</SectionTitle>
               <form onSubmit={handleSend} className="bg-[#141920] border border-slate-800/60 p-5 rounded-2xl space-y-3.5 select-none">
                  <div>
                     <input
                        type="text"
                        placeholder="First Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-[#0c0f13] border border-slate-800 text-slate-300 text-xs px-4 py-3 rounded-xl outline-none focus:border-[#A2FF00] transition-all"
                        required
                     />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                     <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-[#0c0f13] border border-slate-800 text-slate-300 text-xs px-4 py-3 rounded-xl outline-none focus:border-[#A2FF00] transition-all"
                        required
                     />
                     <input
                        type="tel"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-[#0c0f13] border border-slate-800 text-slate-300 text-xs px-4 py-3 rounded-xl outline-none focus:border-[#A2FF00] transition-all"
                     />
                  </div>
                  <div>
                     <textarea
                        placeholder="Your Message"
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-[#0c0f13] border border-slate-800 text-slate-300 text-xs px-4 py-3 rounded-xl outline-none focus:border-[#A2FF00] transition-all resize-none"
                        required
                     />
                  </div>
                  <button type="submit" className="w-full bg-[#A2FF00] hover:bg-white text-black text-xs font-black uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md shadow-[#A2FF00]/10 hover:scale-[1.01] active:scale-[0.98]">
                     {sent ? "Message Sent!" : "Send Message"}
                  </button>
               </form>

               {/* =========================================
                  CREATE YOUR VCARD SECTION
               ========================================== */}
               <SectionTitle>Create Your VCard</SectionTitle>
               <div className="bg-[#141920] border border-slate-800/60 p-5 rounded-2xl space-y-4">
                  {/* <div className="bg-[#0c0f13] border border-slate-800 p-3 rounded-xl text-center select-all cursor-pointer group">
                     <p className="text-[11px] text-slate-400 break-all select-all hover:text-white transition-all font-mono tracking-tight leading-4">
                        {window.location.href}
                     </p>
                  </div> */}
                  <button
                     onClick={() => downloadVCard(userData)}
                     className="w-full bg-[#A2FF00] hover:bg-white text-black text-xs font-black uppercase tracking-widest py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#A2FF00]/20 hover:scale-[1.01] active:scale-[0.98]"
                  >
                     <FiUserPlus size={15} /> Save VCard / Add to Contact
                  </button>
               </div>

               {/* PoweredBy Component Footer */}
               <div className="pt-4 flex flex-col items-center select-none">
                  <PoweredBy />
               </div>
            </div>
         </div>
      </div>
   );
};

export default ApexSport;

