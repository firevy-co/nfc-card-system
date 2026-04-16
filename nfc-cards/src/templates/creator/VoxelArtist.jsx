import React from 'react';
import { FiBox, FiPhone, FiMail, FiGlobe, FiCommand } from 'react-icons/fi';

const VoxelArtist = ({ userData }) => {
  const { displayName, email, role, mobileNumber, website } = userData || {};
  return (
    <div className="min-h-screen bg-[#f0f0f5] flex items-center justify-center p-6 font-['Space Grotesk']">
      <div className="w-full max-w-sm bg-white border-2 border-slate-900 rounded-3xl p-8 shadow-[10px_10px_0px_#0f172a] relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-slate-900/5 rounded-full" />
        <div className="mb-10 text-center">
           <div className="w-20 h-20 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:rotate-12 transition-transform">
              <FiBox size={36} />
           </div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none italic">{displayName || 'Voxel Artist'}</h1>
           <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mt-3">3D / Digital Creator</p>
        </div>
        
        <div className="space-y-4">
           <a href={`tel:${mobileNumber}`} className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:bg-slate-900 hover:text-white transition-all group/link shadow-sm">
              <FiPhone size={18} className="text-slate-400 group-hover/link:text-white" />
              <span className="text-sm font-bold">{mobileNumber || 'Connect'}</span>
           </a>
           <a href={`mailto:${email}`} className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:bg-slate-900 hover:text-white transition-all group/link shadow-sm">
              <FiMail size={18} className="text-slate-400 group-hover/link:text-white" />
              <span className="text-sm font-bold truncate">{email || 'Email'}</span>
           </a>
           <a href={website} className="block w-full py-5 text-center bg-[#ff3d00] text-white rounded-2xl border-2 border-slate-900 font-black text-[11px] uppercase tracking-[0.4em] shadow-[5px_5px_0px_#0f172a] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">Launch Gallery</a>
        </div>
        
        <div className="mt-12 text-center opacity-20">
           <p className="text-[7px] font-black tracking-[0.5em] text-slate-900 uppercase italic">Voxel Node v2.0 · Firevy</p>
        </div>
      </div>
    </div>
  );
};
export default VoxelArtist;
