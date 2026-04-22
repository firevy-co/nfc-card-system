import React from 'react';
import { FiPhone, FiMail, FiMapPin, FiStar, FiGlobe, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const EliteCounsel = ({ userData }) => {
  const { displayName, email, role, phone, website, address } = userData || {};
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 font-['Mulish']">
      <div className="w-full max-w-sm bg-slate-900 rounded-[3rem] p-1 shadow-2xl overflow-hidden group">
        <div className="bg-white p-10 rounded-[2.8rem] text-center relative overflow-hidden">
           <div className="absolute top-4 right-10 text-slate-100"><FiStar size={40} /></div>
           
           <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white text-3xl font-black mb-8 mx-auto shadow-2xl transition-transform group-hover:scale-110 overflow-hidden">
              {userData?.logo ? (
                <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
              ) : (
                displayName?.charAt(0) || 'C'
              )}
           </div>
           
           <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase mb-2">{displayName || 'Elite Counsel'}</h1>
           <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12">{role || 'Senior Managing Partner'}</p>
           
           <div className="space-y-3 relative z-10 text-left">
              <StandardContactLink icon={FiGlobe} value={website} href={website} />
              <StandardContactLink icon={FiMail} value={email} href={`mailto:${email}`} />
              <StandardContactLink icon={FiPhone} value={phone} href={`tel:${phone}`} />
              <StandardContactLink icon={FiMapPin} value={address} />

              {/* Legal Social Matrix */}
              <StandardContactLink icon={FiLinkedin} value={userData?.linkedin} href={userData?.linkedin} />
              <StandardContactLink icon={FiInstagram} value={userData?.instagram} href={userData?.instagram} />
           </div>
           
           <div className="mt-8 flex flex-col gap-3">
              <button className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] hover:brightness-125 transition-all shadow-xl shadow-slate-900/20 active:scale-95">
                Schedule Chambers Call
              </button>
           </div>
           
           <StandardMapPreview address={address} />
           
           <StandardSaveContactButton userData={userData} />
        </div>
        <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-center text-[7px] text-white/20 font-black tracking-[0.8em] py-8 uppercase hover:opacity-70 transition-opacity">Powered by Cardyn</a>
      </div>
    </div>
  );
};
export default EliteCounsel;
