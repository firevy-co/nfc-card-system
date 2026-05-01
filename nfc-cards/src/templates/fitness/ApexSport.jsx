import React from 'react';
import { FiTriangle, FiPhone, FiMail, FiGlobe, FiTarget, FiMapPin, FiInstagram, FiTwitter, FiLinkedin, FiYoutube, FiUserPlus, FiActivity } from 'react-icons/fi';
import { downloadVCard } from '../common/StandardComponents';
import PoweredBy from "../PoweredBy";

const ApexLink = ({ icon: Icon, label, value, href, isPrimary }) => {
   if (!value || value === "" || value.includes('resolving')) return null;
   const Comp = href ? 'a' : 'div';

   if (isPrimary) {
      return (
         <Comp href={href} target={href && href.startsWith('http') ? "_blank" : undefined} rel={href && href.startsWith('http') ? "noopener noreferrer" : undefined} className="flex items-center justify-between bg-slate-900 text-white py-5 px-8 rounded-2xl font-black text-[12px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-slate-900/20">
            <div className="flex items-center gap-3">
               <Icon size={16} />
               <span>{label}</span>
            </div>
            <span className="truncate ml-4">{value}</span>
         </Comp>
      );
   }

   return (
      <Comp href={href} target={href && href.startsWith('http') ? "_blank" : undefined} rel={href && href.startsWith('http') ? "noopener noreferrer" : undefined} className="flex items-center justify-between border-2 border-slate-900 py-5 px-8 rounded-2xl font-black text-[12px] uppercase tracking-widest text-slate-900 hover:bg-slate-900 hover:text-white transition-all active:scale-95">
         <div className="flex items-center gap-3">
            <Icon size={16} />
            <span>{label}</span>
         </div>
         <span className="truncate max-w-[120px] text-right">{value}</span>
      </Comp>
   );
};

const ApexSocial = ({ icon: Icon, href }) => {
   if (!href) return null;
   return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-slate-50 border-2 border-slate-200 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-95">
         <Icon size={20} />
      </a>
   );
};

const ApexSport = ({ userData }) => {
   const { displayName, email, phone, website, address, youtube, linkedin, twitter, instagram, logo } = userData || {};

   return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-['Inter',sans-serif] md:bg-neutral-950 md:items-center py-0 md:py-12">
         <div className="w-full max-w-sm bg-white border-8 border-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-900/5 rotate-45 transform translate-x-12 -translate-y-12 pointer-events-none" />
            <div className="w-16 h-1 bg-slate-900 mb-10" />

            <div className="w-24 h-24 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 shadow-xl overflow-hidden group">
               {logo ? (
                  <img src={logo} alt="Logo" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
               ) : (
                  <FiTriangle size={36} className="group-hover:rotate-180 transition-transform duration-500" />
               )}
            </div>

            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase text-center leading-none mb-2">{displayName || 'Apex Sport'}</h1>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mb-10">High Performance</p>

            <div className="w-full space-y-4 mb-6">
               <ApexLink icon={FiPhone} label="Cell" value={phone} href={`tel:${phone}`} />
               <ApexLink icon={FiMail} label="Signal" value={email} href={`mailto:${email}`} isPrimary={true} />
               <ApexLink icon={FiGlobe} label="Portal" value={website} href={website} />
               <ApexLink icon={FiMapPin} label="Base" value={address} />
            </div>

            <div className="flex flex-wrap gap-3 justify-center mb-6 w-full">
               <ApexSocial icon={FiInstagram} href={instagram} />
               <ApexSocial icon={FiTwitter} href={twitter} />
               <ApexSocial icon={FiYoutube} href={youtube} />
               <ApexSocial icon={FiLinkedin} href={linkedin} />
            </div>

            <button onClick={() => downloadVCard(userData)} className="w-full bg-slate-50 text-slate-500 py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-[0.4em] hover:text-slate-900 hover:bg-slate-100 transition-all border-2 border-slate-100 active:scale-95 shadow-sm">
               <FiUserPlus size={16} /> Save Contact
            </button>

            <PoweredBy />
         </div>
      </div>
   );
};
export default ApexSport;
