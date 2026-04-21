import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const OpalMinimal = ({ userData }) => {
  const { displayName, email, role, phone, website, address, instagram, linkedin } = userData || {};
  return (
    <div className="min-h-screen bg-white flex items-start justify-center py-20 px-6 font-['Mulish']">
      <div className="w-full max-w-sm">
        <div className="h-64 bg-gradient-to-br from-indigo-50 via-pink-50 to-blue-50 rounded-[3rem] mb-[-4rem] relative overflow-hidden flex items-center justify-center">
            {userData?.logo ? (
              <img src={userData.logo} alt="Logo" className="w-24 h-24 object-contain" />
            ) : (
              <div className="w-16 h-16 rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 shadow-sm flex items-center justify-center">
                <span className="text-2xl font-black text-indigo-400 opacity-40">{displayName?.charAt(0) || 'O'}</span>
              </div>
            )}
        </div>
        <div className="bg-white/70 backdrop-blur-3xl border border-white rounded-[3rem] p-10 shadow-2xl shadow-blue-500/5 text-center group">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{displayName || 'Opal Minimal'}</h1>
          <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mt-3 mb-10">{role || 'Studio Lead'}</p>
          
          <div className="space-y-3 text-left">
             <StandardContactLink icon={FiIcons.FiGlobe} value={website} href={website} />
             <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />
             <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />
             <StandardContactLink icon={FiIcons.FiMapPin} value={address} />

             {/* Minimalist Socials */}
             <StandardContactLink icon={FiIcons.FiInstagram} value={instagram} href={instagram} />
             <StandardContactLink icon={FiIcons.FiLinkedin} value={linkedin} href={linkedin} />
          </div>

          <StandardMapPreview address={address} />

          <StandardSaveContactButton />

          <footer className="mt-10 text-center opacity-10">
             <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[7px] text-slate-900 font-black uppercase tracking-[0.6em] hover:opacity-100 transition-opacity">Powered by Cardyn</a>
          </footer>
        </div>
      </div>
    </div>
  );
};
export default OpalMinimal;
