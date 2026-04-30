import React, { useState } from 'react';
import {
   FiGlobe,
   FiMail,
   FiPhone,
   FiMapPin,
   FiLinkedin,
   FiCpu,
   FiArrowUpRight,
   FiInstagram,
   FiDownload,
   FiShield,
   FiLayers,
   FiCode,
   FiDatabase,
   FiCloud,
   FiCheckCircle,
   FiBarChart2,
   FiMonitor,
   FiSettings,
   FiChevronDown
} from 'react-icons/fi';

import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from '../PoweredBy';

const ITSolutions = ({ userData = {} }) => {
   const [openFaq, setOpenFaq] = useState(null);

   const {
      displayName = 'Aiden Brooks',
      role = 'Technology Strategist',
      website = 'https://example.com',
      email = 'admin@gmail.com',
      phone = '+1 555 555 5555',
      address = 'New York, USA',
      linkedin = '',
      instagram = '',
      logo,
      banner = 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop'
   } = userData;

   const links = [
      { icon: FiGlobe, label: 'Website', value: 'Open Site', url: website },
      { icon: FiMail, label: 'Email', value: email, url: `mailto:${email}` },
      { icon: FiPhone, label: 'Phone', value: phone, url: `tel:${phone}` },
      { icon: FiLinkedin, label: 'LinkedIn', value: 'View Profile', url: linkedin },
      { icon: FiInstagram, label: 'Instagram', value: 'Follow Now', url: instagram },
      {
         icon: FiMapPin,
         label: 'Location',
         value: address,
         url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
      }
   ].filter((x) => x.url);

   const services = [
      {
         icon: FiShield,
         title: 'Cyber Security',
         text: 'Advanced protection systems, firewall setup, penetration testing, and threat monitoring.'
      },
      {
         icon: FiCloud,
         title: 'Cloud Infrastructure',
         text: 'AWS, Azure, Google Cloud deployment, scaling, migration, and maintenance.'
      },
      {
         icon: FiCode,
         title: 'Software Development',
         text: 'Custom websites, web apps, mobile apps, enterprise portals, dashboards.'
      },
      {
         icon: FiDatabase,
         title: 'Database Solutions',
         text: 'MySQL, PostgreSQL, MongoDB architecture, optimization, backup systems.'
      },
      {
         icon: FiMonitor,
         title: 'UI / UX Design',
         text: 'Premium modern interfaces with responsive and user-friendly experiences.'
      },
      {
         icon: FiSettings,
         title: 'Automation',
         text: 'CRM, ERP, workflow automation, API integrations and AI tools.'
      }
   ];

   const industries = [
      'Healthcare IT',
      'Finance & Banking',
      'E-commerce',
      'Manufacturing',
      'Education',
      'Real Estate',
      'Government',
      'Startups'
   ];

   const technologies = [
      'React JS',
      'Node JS',
      'Python',
      '.NET',
      'Laravel',
      'MongoDB',
      'AWS',
      'Azure'
   ];

   const faq = [
      {
         q: 'Do you build custom software?',
         a: 'Yes, we create custom web apps, CRM systems, ERP software, mobile apps and dashboards.'
      },
      {
         q: 'Do you offer IT support?',
         a: 'Yes, we provide maintenance, monitoring, server management and security support.'
      },
      {
         q: 'Can you migrate to cloud?',
         a: 'Yes, we migrate businesses to AWS, Azure and modern cloud platforms.'
      }
   ];

   return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white px-4 py-8 flex justify-center">
         <div className="w-full max-w-sm rounded-[34px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.45)]">

            {/* HERO */}
            <div className="relative h-56">
               <img src={banner} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

               <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.35em] text-amber-300 font-bold">
                  IT SOLUTIONS
               </div>

               <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-3xl p-1 bg-gradient-to-br from-amber-300 to-yellow-600 shadow-2xl">
                  <div className="w-full h-full rounded-3xl overflow-hidden bg-zinc-900 flex items-center justify-center">
                     {logo ? (
                        <img src={logo} className="w-full h-full object-cover" />
                     ) : (
                        <FiCpu size={34} className="text-amber-300" />
                     )}
                  </div>
               </div>
            </div>

            {/* PROFILE */}
            <div className="pt-16 px-5 text-center">
               <h1 className="text-3xl font-black tracking-tight">{displayName}</h1>
               <p className="text-amber-300 text-xs uppercase tracking-[0.3em] mt-2">{role}</p>
               <p className="text-zinc-400 text-sm leading-6 mt-4">
                  Helping businesses scale through software engineering, cybersecurity,
                  cloud systems and enterprise digital transformation.
               </p>
            </div>

            {/* QUICK LINKS */}
            <div className="px-5 mt-6 grid gap-3">
               {links.map((item, i) => {
                  const Icon = item.icon;
                  return (
                     <a
                        key={i}
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-center gap-4 hover:bg-white/[0.07] transition-all"
                     >
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-300 to-yellow-600 text-black flex items-center justify-center shadow-lg">
                           <Icon size={18} />
                        </div>

                        <div className="flex-1 text-left">
                           <div className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                              {item.label}
                           </div>
                           <div className="font-semibold text-sm text-white truncate">
                              {item.value}
                           </div>
                        </div>

                        <FiArrowUpRight className="text-zinc-500 group-hover:text-amber-300" />
                     </a>
                  );
               })}
            </div>

            {/* STATS */}
            <div className="px-5 mt-7">
               <div className="rounded-2xl p-4 bg-gradient-to-r from-amber-300/10 to-transparent border border-amber-300/20">
                  <div className="text-center font-black text-lg">Company Highlights</div>

                  <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                     <div>
                        <div className="text-amber-300 font-black text-xl">250+</div>
                        <div className="text-[10px] text-zinc-400">Projects</div>
                     </div>

                     <div>
                        <div className="text-amber-300 font-black text-xl">15+</div>
                        <div className="text-[10px] text-zinc-400">Years</div>
                     </div>

                     <div>
                        <div className="text-amber-300 font-black text-xl">24/7</div>
                        <div className="text-[10px] text-zinc-400">Support</div>
                     </div>
                  </div>
               </div>
            </div>

            {/* SERVICES */}
            <div className="px-5 mt-7">
               <h2 className="text-center font-black text-lg mb-4">IT Services</h2>

               <div className="space-y-3">
                  {services.map((s, i) => {
                     const Icon = s.icon;

                     return (
                        <div
                           key={i}
                           className="rounded-2xl p-4 bg-gradient-to-r from-zinc-900 to-zinc-800 border border-white/10 flex gap-4"
                        >
                           <div className="w-11 h-11 rounded-2xl bg-amber-300/10 text-amber-300 flex items-center justify-center">
                              <Icon />
                           </div>

                           <div>
                              <div className="font-bold">{s.title}</div>
                              <div className="text-xs text-zinc-400 mt-1 leading-5">
                                 {s.text}
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>

            {/* INDUSTRIES */}
            <div className="px-5 mt-7">
               <h2 className="text-center font-black text-lg mb-4">Industries We Serve</h2>

               <div className="grid grid-cols-2 gap-2">
                  {industries.map((item, i) => (
                     <div
                        key={i}
                        className="rounded-xl px-3 py-3 bg-white/[0.03] border border-white/10 text-sm text-zinc-300 text-center"
                     >
                        {item}
                     </div>
                  ))}
               </div>
            </div>

            {/* TECHNOLOGY STACK */}
            <div className="px-5 mt-7">
               <h2 className="text-center font-black text-lg mb-4">Technology Stack</h2>

               <div className="flex flex-wrap gap-2 justify-center">
                  {technologies.map((tech, i) => (
                     <span
                        key={i}
                        className="px-3 py-2 rounded-full bg-amber-300/10 border border-amber-300/20 text-amber-300 text-xs font-semibold"
                     >
                        {tech}
                     </span>
                  ))}
               </div>
            </div>

            {/* CLIENT SATISFACTION */}
            <div className="px-5 mt-7">
               <div className="rounded-2xl p-4 bg-white/[0.03] border border-white/10 text-center">
                  <div className="text-sm text-zinc-400">Client Satisfaction</div>

                  <div className="mt-3 h-2 rounded-full bg-zinc-800 overflow-hidden">
                     <div className="h-full w-[97%] bg-gradient-to-r from-amber-300 to-yellow-600"></div>
                  </div>

                  <div className="mt-2 text-amber-300 font-bold">
                     97% Positive Reviews
                  </div>
               </div>
            </div>

            {/* FAQ */}
            <div className="px-5 mt-7">
               <h2 className="text-center font-black text-lg mb-4">FAQ</h2>

               <div className="space-y-3">
                  {faq.map((item, i) => (
                     <div
                        key={i}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
                     >
                        <button
                           onClick={() => setOpenFaq(openFaq === i ? null : i)}
                           className="w-full px-4 py-4 flex justify-between items-center text-left"
                        >
                           <span className="font-semibold text-sm">{item.q}</span>
                           <FiChevronDown
                              className={`transition-all ${openFaq === i ? 'rotate-180 text-amber-300' : ''
                                 }`}
                           />
                        </button>

                        {openFaq === i && (
                           <div className="px-4 pb-4 text-sm text-zinc-400 leading-6">
                              {item.a}
                           </div>
                        )}
                     </div>
                  ))}
               </div>
            </div>

            {/* SAVE CONTACT */}
            <div className="px-5 mt-7">
               <button
                  onClick={() => downloadVCard(userData)}
                  className="w-full h-12 rounded-2xl bg-gradient-to-r from-amber-300 to-yellow-600 text-black font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
               >
                  <FiDownload />
                  Save Contact
               </button>
            </div>

            {/* FOOTER */}
            <div className="px-5 py-6">
               <PoweredBy />
            </div>
         </div>
      </div>
   );
};

export default ITSolutions;