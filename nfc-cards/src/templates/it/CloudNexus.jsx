import React from 'react';
import * as Fi from 'react-icons/fi';
import * as Fa from 'react-icons/fa';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from '../PoweredBy';

const coverImg = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop';
const profileImg = 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=400&auto=format&fit=crop';
const gallery = [
   'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop',
   'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop',
   'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop'
];

export default function CloudNexus({ userData = {} }) {
   const {
      displayName = 'Mary Arden',
      role = 'Full Stack Developer',
      email = 'jackide@gmail.com',
      phone = '+140528961236',
      whatsapp = '+140528961236',
      website = 'https://example.com',
      address = 'New York, USA',
      facebook = '',
      instagram = '',
      linkedin = '',
      twitter = '',
      github = '',
      logo,
   } = userData;

   const socialLinks = [
      { key: 'whatsapp', icon: Fa.FaWhatsapp, url: `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`, color: 'from-green-400 to-green-600' },
      { key: 'facebook', icon: Fa.FaFacebookF, url: facebook, color: 'from-blue-500 to-blue-700' },
      { key: 'instagram', icon: Fa.FaInstagram, url: instagram, color: 'from-pink-500 to-orange-500' },
      { key: 'linkedin', icon: Fa.FaLinkedinIn, url: linkedin, color: 'from-sky-500 to-blue-700' },
      { key: 'twitter', icon: Fa.FaTwitter, url: twitter, color: 'from-cyan-400 to-sky-600' },
      { key: 'github', icon: Fa.FaGithub, url: github, color: 'from-zinc-700 to-black' }
   ].filter(item => item.url);

   return (
      <div className='min-h-screen bg-gradient-to-br from-slate-100 via-white to-sky-100 py-6 px-3 flex justify-center'>
         <div className='w-full max-w-sm bg-white/95 backdrop-blur-xl rounded-[30px] overflow-hidden shadow-[0_25px_100px_rgba(0,0,0,0.18)] border border-white/70 relative'>
            <div className='absolute top-10 -left-10 w-28 h-28 bg-sky-200 rounded-full blur-3xl opacity-50'></div>
            <div className='absolute bottom-20 -right-10 w-28 h-28 bg-indigo-200 rounded-full blur-3xl opacity-50'></div>

            <div className='relative'>
               <img src={coverImg} className='h-44 w-full object-cover' />
               <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent' />
               <div className='absolute -bottom-14 left-1/2 -translate-x-1/2 w-28 h-28 rounded-3xl p-1 bg-sky-400 shadow-xl'>
                  <img src={logo || profileImg} className='w-full h-full rounded-3xl object-cover' />
               </div>
            </div>

            <div className='pt-16 px-5 text-center'>
               <h1 className='text-2xl font-black text-zinc-800 tracking-tight'>{displayName}</h1>
               <p className='text-zinc-500 text-sm'>{role}</p>

               <div className='flex flex-wrap justify-center gap-3 mt-4'>
                  {socialLinks.map((item, i) => {
                     const Icon = item.icon;
                     return (
                        <a key={i} href={item.url} target='_blank' rel='noreferrer' className={`w-11 h-11 rounded-full bg-gradient-to-r ${item.color} text-white flex items-center justify-center shadow-lg hover:scale-110 hover:-translate-y-1 transition-all duration-300`}>
                           <Icon size={16} />
                        </a>
                     )
                  })}
               </div>

               <p className='text-xs text-zinc-500 leading-5 mt-4'>Creative developer focused on websites, mobile apps, branding solutions, UI/UX design and business growth strategies for modern companies.</p>
            </div>

            <div className='grid grid-cols-2 gap-3 p-5'>
               <Info icon={<Fi.FiMail />} title='E-mail Address' value={email} link={`mailto:${email}`} />
               <Info icon={<Fi.FiPhone />} title='Mobile Number' value={phone} link={`tel:${phone}`} />
               <Info icon={<Fi.FiGlobe />} title='Website' value='Visit Site' link={website} />
               <Info icon={<Fi.FiMapPin />} title='Location' value={address} link={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} />
            </div>



            <Section title='Why Choose Me'>
               <div className='grid grid-cols-3 gap-3 text-center mb-5'>
                  <div className='p-3 rounded-2xl bg-sky-50'><div className='text-xl font-black text-sky-600'>50+</div><div className='text-[10px] text-zinc-500'>Projects</div></div>
                  <div className='p-3 rounded-2xl bg-indigo-50'><div className='text-xl font-black text-indigo-600'>5★</div><div className='text-[10px] text-zinc-500'>Rating</div></div>
                  <div className='p-3 rounded-2xl bg-pink-50'><div className='text-xl font-black text-pink-600'>24/7</div><div className='text-[10px] text-zinc-500'>Support</div></div>
               </div>
            </Section>

            <Section title='Gallery'>
               <div className='grid grid-cols-3 gap-2'>
                  {gallery.map((img, i) => <img key={i} src={img} className='h-24 w-full object-cover rounded-2xl hover:scale-105 transition-all' />)}
               </div>
            </Section>

            <Section title='Testimonials'>
               <div className='bg-gradient-to-r from-sky-500 to-indigo-600 rounded-3xl p-5 text-white text-center mb-5'>
                  <p className='text-sm leading-6'>Amazing developer! Fast delivery, modern design and professional support.</p>
                  <div className='mt-3 font-bold'>— Happy Client</div>
               </div>
            </Section>

            <Section title='Contact Us'>
               <div className='space-y-3'>
                  <input className='input' placeholder='Full Name' />
                  <input className='input' placeholder='E-mail Address' />
                  <textarea className='input h-24 resize-none' placeholder='Type a message here...' />
                  <button className='btn'>Send Message</button>
               </div>
            </Section>

            <div className='px-5 pb-5'>
               <button onClick={() => downloadVCard(userData)} className='btn'>Add To Contact</button>
               <a href={website} target='_blank' rel='noreferrer' className='btn mt-3 text-center block'>Visit Portfolio</a>
            </div>

            <PoweredBy />
         </div>
      </div>
   );
}

function Section({ title, children }) {
   return <div className='px-5 pb-5'><h2 className='text-center text-lg font-black text-zinc-800 mb-4'>{title}</h2>{children}</div>;
}

function Info({ icon, title, value, link }) {
   return (
      <a href={link || '#'} target='_blank' rel='noreferrer' className='block' >
         <div className='bg-gradient-to-br from-white to-slate-50 border border-zinc-100 rounded-2xl p-4 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all min-h-[105px]'>
            <div className='text-sky-500 mb-2'>{icon}</div>
            <div className='text-[10px] text-zinc-400 uppercase'>{title}</div>
            <div className='text-xs font-bold text-zinc-700 mt-1 truncate'>{value}</div>
         </div>
      </a >

   );
}
