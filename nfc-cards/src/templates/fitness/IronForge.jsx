import React, { useMemo } from "react";
import {
   FiSquare,
   FiPhone,
   FiMail,
   FiMapPin,
   FiGlobe,
   FiInstagram,
   FiTwitter,
   FiLinkedin,
   FiYoutube,
   FiUserPlus,
   FiActivity,
   FiArrowRight,
   FiClock,
   FiAward,
   FiTarget,
   FiHeart,
   FiTrendingUp,
   FiStar,
   FiCheckCircle,
   FiCalendar,
   FiShield
} from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

/* ======================================================
   REUSABLE CHIP
====================================================== */
const Chip = ({ children }) => (
   <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-[10px] font-bold uppercase tracking-widest">
      {children}
   </span>
);

/* ======================================================
   SECTION TITLE
====================================================== */
const SectionTitle = ({ title, sub }) => (
   <div className="mb-4">
      <h2 className="text-xl font-black text-slate-800">{title}</h2>
      {sub && <p className="text-sm text-slate-500 mt-1">{sub}</p>}
   </div>
);

/* ======================================================
   SOCIAL
====================================================== */
const SocialBtn = ({ icon: Icon, href }) => {
   if (!href) return null;
   return (
      <a
         href={href || null}
         target="_blank"
         rel="noopener noreferrer"
         className="w-11 h-11 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all"
      >
         <Icon size={18} />
      </a>
   );
};

/* ======================================================
   INFO CARD
====================================================== */
const InfoCard = ({ icon: Icon, label, value, href }) => {
   if (!value) return null;
   const Comp = href ? "a" : "div";

   return (
      <Comp
         href={href || null}
         target={href ? "_blank" : undefined}
         rel={href ? "noopener noreferrer" : undefined}
         className="bg-white rounded-3xl border border-slate-200 p-4 flex items-center gap-4 hover:shadow-md transition-all"
      >
         <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Icon size={20} />
         </div>

         <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
               {label}
            </p>
            <p className="text-sm font-semibold text-slate-800 truncate">{value}</p>
         </div>
      </Comp>
   );
};

/* ======================================================
   STAT CARD
====================================================== */
const StatCard = ({ icon: Icon, value, label }) => (
   <div className="bg-white rounded-3xl border border-slate-200 p-4 text-center">
      <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto mb-3">
         <Icon size={20} />
      </div>
      <h3 className="text-xl font-black text-slate-800">{value}</h3>
      <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">
         {label}
      </p>
   </div>
);

/* ======================================================
   SERVICE CARD
====================================================== */
const ServiceCard = ({ icon: Icon, title, desc }) => (
   <div className="bg-white rounded-3xl border border-slate-200 p-5 hover:shadow-md transition-all">
      <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4">
         <Icon size={20} />
      </div>

      <h3 className="font-bold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500 mt-2 leading-6">{desc}</p>
   </div>
);

/* ======================================================
   PLAN CARD
====================================================== */
const PlanCard = ({ title, price, features, highlight }) => (
   <div
      className={`rounded-3xl p-5 border ${highlight
         ? "bg-cyan-500 text-white border-cyan-500"
         : "bg-white text-slate-800 border-slate-200"
         }`}
   >
      <div className="flex items-center justify-between mb-3">
         <h3 className="font-black">{title}</h3>
         {highlight && <Chip>Popular</Chip>}
      </div>

      <div className="text-3xl font-black mb-4">{price}</div>

      <div className="space-y-3">
         {features.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
               <FiCheckCircle size={16} />
               <span className="text-sm">{item}</span>
            </div>
         ))}
      </div>
   </div>
);

/* ======================================================
   TESTIMONIAL
====================================================== */
const Testimonial = ({ name, text }) => (
   <div className="bg-white rounded-3xl border border-slate-200 p-5">
      <div className="flex gap-1 text-amber-400 mb-3">
         <FiStar />
         <FiStar />
         <FiStar />
         <FiStar />
         <FiStar />
      </div>
      <p className="text-sm text-slate-600 leading-6">{text}</p>
      <p className="font-bold text-slate-800 mt-4">{name}</p>
   </div>
);

/* ======================================================
   MAIN
====================================================== */
const IronForge = ({ userData }) => {
   const {
      displayName,
      email,
      phone,
      website,
      address,
      youtube,
      linkedin,
      twitter,
      instagram,
      logo
   } = userData || {};

   const hero =
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80";

   const gallery = useMemo(
      () => [
         "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=700&q=80",
         "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=700&q=80",
         "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=700&q=80",
         "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=700&q=80"
      ],
      []
   );

   return (
      <div className="min-h-screen bg-slate-100 font-['Space_Grotesk',sans-serif] text-slate-800">
         <div className="w-full max-w-sm mx-auto bg-slate-50 min-h-screen shadow-2xl">

            {/* =========================================
            HERO
        ========================================== */}
            <header className="relative overflow-hidden">
               <img
                  src={hero}
                  alt="Gym Hero"
                  className="w-full h-[360px] object-cover"
               />

               <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-white/10 to-transparent" />

               {/* LOGO */}
               <div className="absolute top-6 left-5">
                  <div className="w-16 h-16 rounded-3xl bg-white shadow-lg overflow-hidden border border-white">
                     {logo ? (
                        <img
                           src={logo}
                           alt="Logo"
                           className="w-full h-full object-cover"
                        />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-cyan-600">
                           <FiActivity size={24} />
                        </div>
                     )}
                  </div>
               </div>

               {/* TEXT */}
               <div className="absolute left-5 right-5 bottom-12">
                  <Chip>Wave Fitness Studio</Chip>

                  <h1 className="text-4xl font-black mt-3 text-white drop-shadow">
                     {displayName || "Iron Forge"}
                  </h1>

                  <p className="text-white/90 text-sm leading-6 mt-3 max-w-xs">
                     Premium personal training, body transformation and strength
                     systems with expert guidance.
                  </p>

                  <div className="flex gap-2 mt-4">
                     <SocialBtn icon={FiInstagram} href={instagram || null} />
                     <SocialBtn icon={FiYoutube} href={youtube || null} />
                     <SocialBtn icon={FiTwitter} href={twitter || null} />
                     <SocialBtn icon={FiLinkedin} href={linkedin || null} />
                  </div>
               </div>

               {/* WAVE */}
               <svg
                  viewBox="0 0 1440 320"
                  className="absolute bottom-0 left-0 w-full h-20 fill-slate-50"
               >
                  <path d="M0,128L60,144C120,160,240,192,360,202.7C480,213,600,203,720,176C840,149,960,107,1080,96C1200,85,1320,107,1380,117.3L1440,128L1440,320L0,320Z"></path>
               </svg>
            </header>

            {/* CONTENT */}
            <div className="px-5 pb-10 space-y-6 -mt-2">

               {/* STATS */}
               <div className="grid grid-cols-3 gap-3">
                  <StatCard icon={FiAward} value="15+" label="Years" />
                  <StatCard icon={FiTarget} value="1200+" label="Clients" />
                  <StatCard icon={FiClock} value="24/7" label="Support" />
               </div>

               {/* ABOUT */}
               <section>
                  <SectionTitle
                     title="About Us"
                     sub="Why clients trust our coaching system"
                  />

                  <div className="bg-white rounded-3xl border border-slate-200 p-5 text-sm text-slate-600 leading-7">
                     We combine science-based programming, custom meal guidance and
                     motivational coaching to help members lose fat, build muscle and
                     improve confidence.
                  </div>
               </section>

               {/* CONTACT */}
               <section>
                  <SectionTitle title="Contact Details" />

                  <div className="space-y-3">
                     <InfoCard
                        icon={FiPhone}
                        label="Phone"
                        value={phone}
                        href={phone ? `tel:${phone}` : null}
                     />

                     <InfoCard
                        icon={FiMail}
                        label="Email"
                        value={email}
                        href={email ? `mailto:${email}` : null}
                     />

                     <InfoCard
                        icon={FiGlobe}
                        label="Website"
                        value={website}
                        href={website || null}
                     />

                     <InfoCard
                        icon={FiMapPin}
                        label="Address"
                        value={address}
                     />
                  </div>
               </section>

               {/* SERVICES */}
               <section>
                  <SectionTitle
                     title="Our Services"
                     sub="Designed for every fitness goal"
                  />

                  <div className="grid grid-cols-2 gap-3">
                     <ServiceCard
                        icon={FiTrendingUp}
                        title="Muscle Gain"
                        desc="Structured hypertrophy workouts."
                     />

                     <ServiceCard
                        icon={FiHeart}
                        title="Fat Loss"
                        desc="Cardio + nutrition based programs."
                     />

                     <ServiceCard
                        icon={FiShield}
                        title="Mobility"
                        desc="Recovery and flexibility routines."
                     />

                     <ServiceCard
                        icon={FiCalendar}
                        title="1-on-1 Coach"
                        desc="Private online & offline sessions."
                     />
                  </div>
               </section>

               {/* GALLERY */}
               <section>
                  <SectionTitle title="Gym Environment" />

                  <div className="grid grid-cols-2 gap-3">
                     {gallery.map((img, i) => (
                        <img
                           key={i}
                           src={img}
                           alt="Gym"
                           className="rounded-3xl h-32 w-full object-cover border border-slate-200"
                        />
                     ))}
                  </div>
               </section>

               {/* PRICING */}
               <section>
                  <SectionTitle title="Membership Plans" />

                  <div className="space-y-3">
                     <PlanCard
                        title="Starter"
                        price="$49"
                        features={[
                           "Gym Access",
                           "Basic Program",
                           "Community Support"
                        ]}
                     />

                     <PlanCard
                        title="Pro"
                        price="$99"
                        highlight
                        features={[
                           "Personal Coach",
                           "Diet Plan",
                           "Progress Tracking"
                        ]}
                     />
                  </div>
               </section>

               {/* TESTIMONIALS */}
               <section>
                  <SectionTitle title="Testimonials" />

                  <div className="space-y-3">
                     <Testimonial
                        name="Rahul Patel"
                        text="Lost 12kg in 3 months and gained confidence."
                     />

                     <Testimonial
                        name="Aisha Khan"
                        text="Best trainer, clear plan and real motivation."
                     />
                  </div>
               </section>

               {/* HOURS */}
               <section>
                  <SectionTitle title="Opening Hours" />

                  <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 text-sm">
                     <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>06:00 - 22:00</span>
                     </div>

                     <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>07:00 - 20:00</span>
                     </div>

                     <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>Closed</span>
                     </div>
                  </div>
               </section>

               {/* ACTION BUTTONS */}
               <section className="space-y-3 pt-2">
                  <button
                     onClick={() => downloadVCard(userData)}
                     className="w-full py-5 bg-cyan-500 text-white rounded-3xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-cyan-600 transition-all"
                  >
                     <FiUserPlus size={18} />
                     Add To Contact
                  </button>

                  {website && (
                     <a
                        href={website || null}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-5 bg-white border border-slate-200 rounded-3xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-100 transition-all"
                     >
                        Start Training
                        <FiArrowRight />
                     </a>
                  )}
               </section>

               {/* FOOTER */}
               <div className="pt-2 flex justify-between items-center text-slate-400">
                  <p className="text-[10px] uppercase tracking-[0.4em]">
                     Iron Framework
                  </p>
                  <FiSquare size={14} className="rotate-45" />
               </div>

               <PoweredBy />
            </div>
         </div>
      </div>
   );
};

export default IronForge;