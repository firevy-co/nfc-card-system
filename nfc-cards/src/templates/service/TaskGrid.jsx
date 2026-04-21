import React from 'react';
import { FiCheckCircle, FiPhone, FiMail, FiGlobe, FiTool, FiMapPin, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const TaskGrid = ({ userData }) => {
  const { displayName, email, role, phone, website, address } = userData || {};
  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center py-8 px-6 font-['Mulish'] text-slate-900">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 text-slate-100 opacity-20"><FiTool size={120} /></div>
        
        <div className="mb-10 relative z-10 flex flex-col items-center text-center">
           <div className="w-20 h-20 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-8 shadow-xl group-hover:rotate-6 transition-transform">
              {userData?.logo ? (
                <img src={userData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
              ) : (
                <FiCheckCircle size={32} />
              )}
           </div>
           <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-none uppercase">{displayName || 'Expert Node'}</h1>
           <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mt-3">{role || 'Professional Services'}</p>
        </div>
        
        <div className="space-y-3 relative z-10 mb-8">
           <StandardContactLink icon={FiGlobe} value={website} href={website} />
           <StandardContactLink icon={FiMail} value={email} href={`mailto:${email}`} />
           <StandardContactLink icon={FiPhone} value={phone} href={`tel:${phone}`} />
           <StandardContactLink icon={FiMapPin} value={address} />
           
           {/* Social Integrations */}
           <StandardContactLink icon={FiLinkedin} value={userData?.linkedin} href={userData?.linkedin} />
           <StandardContactLink icon={FiInstagram} value={userData?.instagram} href={userData?.instagram} />
        </div>
        
        <div className="flex flex-col gap-3 mb-8">
           <button className="w-full bg-slate-900 text-white py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:brightness-125 transition-all">
              Verify Credentials
           </button>
        </div>

        <StandardMapPreview address={address} />
        
        <StandardSaveContactButton />
        
        <footer className="mt-12 text-center opacity-40">
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] font-black tracking-[0.5em] text-slate-400 hover:text-slate-900 transition-colors uppercase">Powered by Cardyn</a>
        </footer>
      </div>
    </div>
  );
};
export default TaskGrid;
