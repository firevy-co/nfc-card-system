import React from 'react';
import * as Fa from 'react-icons/fa';
import * as Fi from 'react-icons/fi';
import { downloadVCard } from "../common/StandardComponents";

const isLight = (color) => {
    if (!color || typeof color !== 'string' || color.length < 7) return false;
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
};

const ClassicRefined = ({ userData }) => {
    const themeColor = userData?.themeColor || "#0f172a";

    return (
        <div
            className={`min-h-screen w-full p-6 flex flex-col items-center transition-all duration-500 ${isLight(themeColor) ? "text-gray-900" : "text-white"}`}
            style={{ background: themeColor }}
        >
            {/* Profile Image / Logo Slot */}
            <div className="flex flex-col items-center justify-center mt-12 mb-8">
                <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center overflow-hidden mb-4 shadow-2xl ${isLight(themeColor) ? 'border-black/10 bg-black/5' : 'border-white/20 bg-white/10'}`}>
                    <img src={userData.logo} alt={userData.displayName} className="w-full h-full object-cover" />
                </div>
                <h1 className="text-2xl font-black tracking-tight">{userData.displayName || "Your Name"}</h1>
            </div>

            {/* Connect With Us Section */}
            <div className="w-full max-w-md space-y-6">
                <div className="flex items-center gap-3 px-2">
                    <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] ${isLight(themeColor) ? "text-black/40" : "text-white/40"}`}>Connect with Us</h4>
                    <div className={`flex-1 h-[1px] ${isLight(themeColor) ? "bg-black/10" : "bg-white/10"}`}></div>
                </div>

                {/* Action Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <a
                        href={`tel:${userData.phone}`}
                        className={`p-6 rounded-[2rem] flex flex-col items-center justify-center gap-3 border transition-all hover:scale-[1.02] active:scale-95 shadow-lg ${isLight(themeColor) ? 'bg-black/5 border-black/5' : 'bg-white/5 border-white/5'}`}
                    >
                        <Fa.FaPhone size={24} className="text-[#b8955d]" />
                        <span className="text-[11px] font-black uppercase tracking-widest">Call Now</span>
                    </a>
                    {userData.whatsapp && (
                        <a
                            href={`https://wa.me/${userData.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-6 rounded-[2rem] flex flex-col items-center justify-center gap-3 border transition-all hover:scale-[1.02] active:scale-95 shadow-lg ${isLight(themeColor) ? 'bg-black/5 border-black/5' : 'bg-white/5 border-white/5'}`}
                        >
                            <Fa.FaWhatsapp size={26} className="text-[#b8955d]" />
                            <span className="text-[11px] font-black uppercase tracking-widest">WhatsApp</span>
                        </a>
                    )}
                </div>

                {/* Location Card */}
                {userData.address && (
                    <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(userData.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-6 rounded-[2rem] flex flex-col items-center justify-center gap-3 border transition-all hover:scale-[1.01] active:scale-98 shadow-lg ${isLight(themeColor) ? 'bg-black/5 border-black/5' : 'bg-white/5 border-white/5'}`}
                    >
                        <Fa.FaMapMarkerAlt size={24} className="text-[#b8955d]" />
                        <div className="text-center">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#b8955d] mb-1">Head Office</h5>
                            <p className="text-[11px] font-bold leading-relaxed max-w-[240px] mx-auto opacity-90">{userData.address}</p>
                        </div>
                    </a>
                )}
            </div>

            {/* Social Matrix */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-10 px-4">
                {[
                    { id: 'website', icon: Fa.FaGlobe, url: '' },
                    { id: 'linkedin', icon: Fa.FaLinkedin, url: 'https://linkedin.com/in/' },
                    { id: 'instagram', icon: Fa.FaInstagram, url: 'https://instagram.com/' },
                    { id: 'twitter', icon: Fa.FaTwitter, url: 'https://twitter.com/' },
                    { id: 'facebook', icon: Fa.FaFacebook, url: 'https://facebook.com/' },
                    { id: 'youtube', icon: Fa.FaYoutube, url: 'https://youtube.com/' },
                ].map(social => userData[social.id] && (
                    <a
                        key={social.id}
                        href={social.id === 'website' ? (userData.website.startsWith('http') ? userData.website : `https://${userData.website}`) : `${social.url}${userData[social.id]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-xl ${isLight(themeColor) ? "bg-black/5 text-gray-800 border border-black/5" : "bg-white/10 text-white border border-white/5"}`}
                    >
                        <social.icon size={18} />
                    </a>
                ))}
            </div>

            <button 
                onClick={() => downloadVCard(userData)}
                className={`mt-12 w-full max-w-sm py-5 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl transition-all hover:scale-[1.02] active:scale-95 ${isLight(themeColor) ? 'bg-black text-white' : 'bg-white text-black'}`}
            >
                Save Contact
            </button>

            {/* Branding */}
            <div className="mt-auto pt-16 pb-8 text-center">
                <p className={`text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ${isLight(themeColor) ? "text-black" : "text-white"}`}>
                    Powered by Cardyn
                </p>
            </div>
        </div>
    );
};

export default ClassicRefined;
