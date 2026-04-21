import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const ModernLeader = ({ userData }) => {
  const { displayName, email, role, phone, website, address } = userData || {};
  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center py-16 px-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-[3rem] p-1 shadow-2xl overflow-hidden group">
        <div className="bg-slate-900 p-8 rounded-[2.8rem] text-center text-white relative">
          <div className="absolute top-4 right-8"><FiIcons.FiAward size={20} className="text-slate-700" /></div>
          <div className="w-24 h-24 rounded-2xl border-2 border-slate-700 mx-auto mb-6 flex items-center justify-center text-4xl font-black bg-slate-800 overflow-hidden">
            {userData?.logo ? (
              <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
            ) : (
              displayName?.charAt(0) || 'L'
            )}
          </div>
          <h1 className="text-2xl font-black tracking-tight leading-none uppercase">{displayName || 'Modern Leader'}</h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mt-3">{role || 'Executive Protocol'}</p>
        </div>
        
        <div className="p-8 space-y-3">
           <StandardContactLink icon={FiIcons.FiGlobe} value={website} href={website} />
           <StandardContactLink icon={FiIcons.FiMail} value={email} href={`mailto:${email}`} />
           <StandardContactLink icon={FiIcons.FiPhone} value={phone} href={`tel:${phone}`} />
           <StandardContactLink icon={FiIcons.FiMapPin} value={address} />

           {/* Social Uplinks */}
           <StandardContactLink icon={FiIcons.FiLinkedin} value={userData?.linkedin} href={userData?.linkedin} />
           <StandardContactLink icon={FiIcons.FiInstagram} value={userData?.instagram} href={userData?.instagram} />
           <StandardContactLink icon={FiIcons.FiFacebook} value={userData?.facebook} href={userData?.facebook} />
           <StandardContactLink icon={FiIcons.FiTwitter} value={userData?.twitter} href={userData?.twitter} />
           
           <div className="pt-6">
              <button className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:brightness-125 transition-all shadow-xl shadow-slate-900/20 active:scale-95">
                 Access Portal
              </button>
           </div>

           <StandardMapPreview address={address} />

           <StandardSaveContactButton userData={userData} />

           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] text-center text-slate-300 font-black tracking-[0.5em] pt-8 hover:opacity-70 transition-opacity uppercase">Powered by Cardyn</a>
        </div>
      </div>
    </div>
  );
};
export default ModernLeader;
