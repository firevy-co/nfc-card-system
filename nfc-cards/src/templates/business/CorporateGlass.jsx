import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const CorporateGlass = ({ userData }) => {
  const { displayName, email, role, phone, website, address, bio, linkedin, facebook } = userData || {};
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-500/30 overflow-hidden">
               {userData?.logo ? (
                 <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
               ) : (
                 displayName?.charAt(0) || 'C'
               )}
            </div>
            <div>
              <h1 className="text-xl font-black text-white capitalize leading-none">{displayName || 'Corporate Lead'}</h1>
              <p className="text-blue-300 text-[10px] font-black uppercase tracking-widest mt-2">{role || 'Director'}</p>
            </div>
          </div>
          {bio && <p className="text-white/60 text-[11px] font-bold mb-8 leading-relaxed italic border-l-2 border-blue-500/30 pl-4">{bio}</p>}
          
          <div className="space-y-3">
             <StandardContactLink icon={FiIcons.FiGlobe} value={website} href={website} />
             <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />
             <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />
             <StandardContactLink icon={FiIcons.FiMapPin} value={address} />

             {/* Corporate Socials */}
             <StandardContactLink icon={FiIcons.FiLinkedin} value={linkedin} href={linkedin} />
             <StandardContactLink icon={FiIcons.FiFacebook} value={facebook} href={facebook} />
          </div>

          <div className="mt-8">
             <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-500/30 hover:scale-[1.02] transition-all">Connect Now</button>
          </div>

          <StandardMapPreview address={address} />

          <StandardSaveContactButton />

          <footer className="mt-10 text-center opacity-10">
             <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] text-white font-black tracking-[0.5em] uppercase hover:opacity-100 transition-opacity">Powered by Cardyn</a>
          </footer>
        </div>
      </div>
    </div>
  );
};
export default CorporateGlass;
