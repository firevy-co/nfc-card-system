import React from 'react';
import { FiCheckCircle, FiPhone, FiMail, FiGlobe, FiTool, FiMapPin, FiLinkedin, FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi';
import { StandardContactLink, StandardSaveContactButton, StandardMapPreview } from "../common/StandardComponents";

const TaskGrid = ({ userData }) => {
  const { displayName, email, phone, website, address, linkedin, instagram, facebook, twitter, youtube, logo } = userData || {};
  
  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center py-8 px-6 font-['Mulish',sans-serif] text-slate-900">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 text-slate-100 opacity-20 pointer-events-none"><FiTool size={120} /></div>
        
        <div className="mb-10 relative z-10 flex flex-col items-center text-center">
           <div className="w-24 h-24 rounded-[1.5rem] bg-slate-900 text-white flex items-center justify-center mb-6 shadow-xl group-hover:rotate-6 transition-transform overflow-hidden p-1 border-2 border-slate-900">
              {logo ? (
                <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-xl bg-white" />
              ) : (
                <FiCheckCircle size={36} />
              )}
           </div>
           <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-none uppercase">{displayName || 'Expert Node'}</h1>
           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-3">Technical Specialist</p>
        </div>
        
        <div className="space-y-3 relative z-10 mb-8">
           <StandardContactLink icon={FiGlobe} value={website} href={website} />
           <StandardContactLink icon={FiMail} value={email} href={`mailto:${email}`} />
           <StandardContactLink icon={FiPhone} value={phone} href={`tel:${phone}`} />
           <StandardContactLink icon={FiMapPin} value={address} />
           
           {/* Social Integrations */}
           <StandardContactLink icon={FiInstagram} value={instagram} href={instagram} />
           <StandardContactLink icon={FiLinkedin} value={linkedin} href={linkedin} />
           <StandardContactLink icon={FiTwitter} value={twitter} href={twitter} />
           <StandardContactLink icon={FiFacebook} value={facebook} href={facebook} />
           <StandardContactLink icon={FiYoutube} value={youtube} href={youtube} />
        </div>
        
        {website && (
            <div className="flex flex-col gap-3 mb-8 relative z-10">
               <a href={website} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-slate-900 text-white py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:brightness-125 active:scale-95 transition-all">
                  Verify Credentials
               </a>
            </div>
        )}

        <div className="mt-6 relative z-10">
           <StandardMapPreview address={address} />
        </div>
        
        <div className="mt-6 relative z-10">
           <StandardSaveContactButton userData={userData} />
        </div>
        
        <footer className="mt-12 text-center opacity-40 hover:opacity-100 transition-opacity">
           <a href="https://cardyn.shop/" target="_blank" rel="noopener noreferrer" className="block text-[8px] font-black tracking-[0.5em] text-slate-400 hover:text-slate-900 uppercase">Powered by Cardyn</a>
        </footer>
      </div>
    </div>
  );
};
export default TaskGrid;
