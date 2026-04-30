import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Layout from "../layout/layout";
import { Country, State, City } from "country-state-city";
import * as Fi from "react-icons/fi";
import * as Fa from "react-icons/fa";
import { HexColorPicker } from "react-colorful";
import { auth } from "@/firebase.config";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../config/api";



const IconCard = ({ icon: _Icon, label, field, onClick, required }) => (
    <div
        onClick={() => onClick(field)}
        className="p-4 rounded-xl border bg-gray-50 hover:bg-gray-100 cursor-pointer flex flex-col items-center justify-center transition-all active:scale-95 relative"
    >
        {required && <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />}
        <_Icon size={18} />
        <span className="text-xs mt-2">{label}</span>
    </div>
);

const Section = ({ title, children }) => (
    <div className="bg-white border rounded-xl p-4 sm:p-5 shadow-sm">
        <h3 className="text-xs sm:text-sm font-semibold mb-4 opacity-60 uppercase tracking-widest">{title}</h3>
        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {children}
        </div>
    </div>
);

const isLight = (color) => {
    if (!color || typeof color !== 'string' || color.length < 7) return false;
    try {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 180;
    } catch (e) {
        return false;
    }
};

const CardPreview = ({ formData }) => {
    const themeColor = formData.themeColor || "#0f172a";
    const light = isLight(themeColor);

    const renderLayout = () => {
        switch (formData.templateId) {
            case 'layout_2': // HERO
                return (
                    <div className="flex flex-col h-full">
                        <div className="h-24 -mx-6 -mt-6 mb-16 relative" style={{ background: 'rgba(255,255,255,0.1)' }}>
                            <div className="absolute left-1/2 -translate-x-1/2 top-10">
                                <div className={`w-24 h-24 rounded-full border-4 ${light ? 'border-white bg-gray-100 shadow-xl' : 'border-zinc-900 bg-zinc-800 shadow-2xl'} overflow-hidden`}>
                                    {formData.logo ? <img src={formData.logo} className="w-full h-full object-cover" /> : <Fi.FiUser className="m-auto mt-6" size={36} />}
                                </div>
                            </div>
                        </div>
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-black">{formData.name || "Your Name"}</h3>
                            <p className="opacity-60 text-[10px] font-black uppercase tracking-widest">{formData.businessRole || "Your Role"}</p>
                        </div>
                        <div className="space-y-2">
                            <a
                                href={`tel:${formData.phone}`}
                                className={`p-3 rounded-2xl flex items-center gap-3 border transition-all active:scale-95 ${light ? 'bg-black/5 border-black/5' : 'bg-white/10 border-white/5'}`}
                            >
                                <Fa.FaPhoneAlt className="text-[#b8955d]" size={14} />
                                <span className="text-[9px] font-black uppercase">{formData.phone || "Phone Number"}</span>
                            </a>
                            {formData.whatsapp && (
                                <a
                                    href={`https://wa.me/${formData.whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-3 rounded-2xl flex items-center gap-3 border transition-all active:scale-95 ${light ? 'bg-black/5 border-black/5' : 'bg-white/10 border-white/5'}`}
                                >
                                    <Fa.FaWhatsapp className="text-[#b8955d]" size={16} />
                                    <span className="text-[9px] font-black uppercase">WhatsApp</span>
                                </a>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                            {[
                                { id: 'website', icon: Fa.FaGlobe, prefix: '' },
                                { id: 'linkedin', icon: Fa.FaLinkedin, prefix: 'https://linkedin.com/in/' },
                                { id: 'instagram', icon: Fa.FaInstagram, prefix: 'https://instagram.com/' },
                                { id: 'twitter', icon: Fa.FaTwitter, prefix: 'https://twitter.com/' },
                                { id: 'facebook', icon: Fa.FaFacebook, prefix: 'https://facebook.com/' },
                            ].map(social => formData[social.id] && (
                                <a
                                    key={social.id}
                                    href={social.id === 'website' ? (formData.website.startsWith('http') ? formData.website : `https://${formData.website}`) : `${social.prefix}${formData[social.id]}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all hover:scale-110 ${light ? "bg-black/5 border-black/5" : "bg-white/10 border-white/5"}`}
                                >
                                    <social.icon size={12} />
                                </a>
                            ))}
                        </div>
                        <button className={`mt-6 w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg ${light ? 'bg-black text-white' : 'bg-white text-black'}`}>
                            Save Contact
                        </button>
                    </div>
                );
            case 'layout_3': // MATRIX
                return (
                    <div className="flex flex-col h-full gap-6">
                        <div className="grid grid-cols-2 gap-3">
                            <a
                                href={`tel:${formData.phone}`}
                                className={`aspect-square rounded-[2rem] flex flex-col items-center justify-center gap-2 border transition-all active:scale-95 ${light ? 'bg-black/5 border-black/5' : 'bg-white/10 border-white/5'}`}
                            >
                                <Fa.FaPhoneAlt size={20} className="text-[#b8955d]" />
                                <span className="text-[8px] font-black uppercase tracking-widest">Call</span>
                            </a>
                            {formData.whatsapp && (
                                <a
                                    href={`https://wa.me/${formData.whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`aspect-square rounded-[2rem] flex flex-col items-center justify-center gap-2 border transition-all active:scale-95 ${light ? 'bg-black/5 border-black/5' : 'bg-white/10 border-white/5'}`}
                                >
                                    <Fa.FaWhatsapp size={22} className="text-[#b8955d]" />
                                    <span className="text-[8px] font-black uppercase tracking-widest">Chat</span>
                                </a>
                            )}
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <div className={`w-18 h-18 rounded-2xl rotate-3 mb-4 overflow-hidden border-2 ${light ? 'border-black/10' : 'border-white/20'}`}>
                                {formData.logo && <img src={formData.logo} className="w-full h-full object-cover" />}
                            </div>
                            <h3 className="text-lg font-black leading-tight">{formData.name || "Your Name"}</h3>
                            <p className="text-[10px] opacity-60 font-bold uppercase tracking-widest">{formData.businessRole}</p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                            {[
                                { id: 'linkedin', icon: Fa.FaLinkedin, prefix: 'https://linkedin.com/in/' },
                                { id: 'instagram', icon: Fa.FaInstagram, prefix: 'https://instagram.com/' },
                                { id: 'facebook', icon: Fa.FaFacebook, prefix: 'https://facebook.com/' },
                            ].map(social => formData[social.id] && (
                                <a
                                    key={social.id}
                                    href={`${social.prefix}${formData[social.id]}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all hover:scale-110 ${light ? "bg-black/5 border-black/5" : "bg-white/10 border-white/5"}`}
                                >
                                    <social.icon size={12} />
                                </a>
                            ))}
                        </div>
                        <button className={`w-full py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest shadow-lg ${light ? 'bg-black text-white' : 'bg-white text-black'}`}>
                            Save Contact
                        </button>
                    </div>
                );
            case 'layout_4': // LEAD
                return (
                    <div className="flex flex-col h-full pt-2">
                        <div className={`w-full py-4 rounded-[1.5rem] mb-6 flex items-center justify-center font-black text-[9px] uppercase tracking-[0.2em] shadow-xl ${light ? 'bg-black text-white' : 'bg-white text-black'}`}>
                            Save Identity
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-black italic tracking-tighter">{formData.name || "Your Name"}</h3>
                                <div className="h-1 w-10 bg-[#b8955d] mt-1"></div>
                            </div>
                            <p className="text-[10px] opacity-80 leading-relaxed font-bold">{formData.bio || "Crafting digital experiences through innovative architecture templates."}</p>
                            <div className="pt-4 border-t border-current border-opacity-10 space-y-3">
                                <a
                                    href={`mailto:${formData.email}`}
                                    className="flex items-center gap-3 opacity-70 transition-all hover:opacity-100"
                                >
                                    <Fi.FiMail size={12} />
                                    <span className="text-[9px] font-black uppercase tracking-widest">{formData.email || "hello@identity.com"}</span>
                                </a>
                                {formData.address && (
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.address)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 opacity-70 transition-all hover:opacity-100"
                                    >
                                        <Fi.FiMapPin size={12} />
                                        <span className="text-[9px] font-black uppercase tracking-widest">{formData.address || "Global Presence"}</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                );
            case 'layout_5': // ULTRA
                return (
                    <div className="flex flex-col h-full relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/20 to-transparent rounded-full -mr-12 -mt-12 blur-xl"></div>
                        <div className="z-10 mt-4">
                            <div className="flex items-end gap-3 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#b8955d] to-[#8a6d3b] p-0.5 shadow-2xl">
                                    <div className="w-full h-full rounded-[0.9rem] overflow-hidden bg-zinc-900">
                                        {formData.logo ? <img src={formData.logo} className="w-full h-full object-cover" /> : <Fi.FiUser className="m-auto mt-3 text-white" size={24} />}
                                    </div>
                                </div>
                                <div className="pb-1">
                                    <h3 className="text-lg font-black tracking-tighter leading-none">{formData.name || "NAME"}</h3>
                                    <p className="text-[8px] font-black uppercase text-[#b8955d] tracking-[0.2em] mt-1">Authorized Template</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-2 mb-8">
                                {[
                                    { id: 'phone', icon: Fa.FaPhoneAlt, href: `tel:${formData.phone}` },
                                    { id: 'whatsapp', icon: Fa.FaWhatsapp, href: `https://wa.me/${formData.whatsapp}` },
                                    { id: 'website', icon: Fa.FaGlobe, href: formData.website?.startsWith('http') ? formData.website : `https://${formData.website}` },
                                    { id: 'linkedin', icon: Fa.FaLinkedin, href: `https://linkedin.com/in/${formData.linkedin}` },
                                ].map((item, i) => formData[item.id] && (
                                    <a
                                        key={i}
                                        href={item.href}
                                        target={item.id !== 'phone' ? "_blank" : undefined}
                                        rel={item.id !== 'phone' ? "noopener noreferrer" : undefined}
                                        className={`aspect-square rounded-xl flex items-center justify-center border transition-all hover:scale-110 active:scale-90 ${light ? 'bg-black/5 border-black/5' : 'bg-white/10 border-white/10'}`}
                                    >
                                        <item.icon size={14} />
                                    </a>
                                ))}
                            </div>
                            <div className={`p-5 rounded-[2rem] backdrop-blur-md border ${light ? 'bg-black/5 border-black/5' : 'bg-white/5 border-white/10'}`}>
                                <p className="text-[8px] font-black opacity-40 mb-1 uppercase tracking-widest">Primary Objective</p>
                                <p className="text-[10px] font-black leading-relaxed italic">{formData.job || "Strategic Leadership & Identity Deployment"}</p>
                            </div>
                            <button className={`mt-6 w-full py-4 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl ${light ? 'bg-black text-white' : 'bg-white text-black'}`}>
                                Save Contact
                            </button>
                        </div>
                    </div>
                );
            default: // STANDARD (LAYOUT 1)
                return (
                    <>
                        <div className="flex flex-col items-center justify-center h-34 mt-4">
                            <div className={`w-18 h-18 rounded-full border flex items-center justify-center overflow-hidden mb-3 ${light ? 'border-black/10 bg-black/5' : 'border-white/20 bg-white/10'}`}>
                                {formData.logo ? (
                                    <img src={formData.logo} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <Fi.FiUser size={30} />
                                )}
                            </div>
                            <h3 className="text-lg font-black">{formData.name || "Your Name"}</h3>
                            <p className={`${light ? "text-gray-500" : "opacity-70"} text-sm`}>
                                {formData.businessRole || formData.job || "Your Role"}
                            </p>
                        </div>
                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-3">
                                <h4 className={`text-[10px] font-black uppercase tracking-widest ${light ? "text-black/40" : "text-white/40"}`}>Connect with Us</h4>
                                <div className={`flex-1 h-[1px] ${light ? "bg-black/10" : "bg-white/10"}`}></div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <a
                                    href={`tel:${formData.phone}`}
                                    className={`p-4 rounded-[1.5rem] flex flex-col items-center justify-center gap-2 border transition-all active:scale-95 ${light ? 'bg-black/5 border-black/5' : 'bg-white/5 border-white/5'}`}
                                >
                                    <Fa.FaPhoneAlt size={20} className="text-[#b8955d]" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Call Now</span>
                                </a>
                                {formData.whatsapp && (
                                    <a
                                        href={`https://wa.me/${formData.whatsapp}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-4 rounded-[1.5rem] flex flex-col items-center justify-center gap-2 border transition-all active:scale-95 ${light ? 'bg-black/5 border-black/5' : 'bg-white/10 border-white/5'}`}
                                    >
                                        <Fa.FaWhatsapp size={22} className="text-[#b8955d]" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">WhatsApp</span>
                                    </a>
                                )}
                            </div>
                            {formData.address && (
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-5 rounded-[1.5rem] flex flex-col items-center justify-center gap-2 border transition-all active:scale-98 ${light ? 'bg-black/5 border-black/5' : 'bg-white/10 border-white/5'}`}
                                >
                                    <Fa.FaMapMarkerAlt size={20} className="text-[#b8955d]" />
                                    <p className="text-[10px] font-bold text-center opacity-90">{formData.address}</p>
                                </a>
                            )}
                            {formData.website && (
                                <a
                                    href={formData.website.startsWith('http') ? formData.website : `https://${formData.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full py-4 rounded-[1.5rem] flex items-center justify-center border transition-all hover:scale-[1.02] active:scale-95 shadow-lg font-black text-[10px] uppercase tracking-widest ${light ? 'bg-black/5 border-black/10 text-black' : 'bg-white/5 border-white/10 text-white'}`}
                                >
                                    Visit Website
                                </a>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                            {[
                                { id: 'linkedin', icon: Fa.FaLinkedin, prefix: 'https://linkedin.com/in/' },
                                { id: 'instagram', icon: Fa.FaInstagram, prefix: 'https://instagram.com/' },
                                { id: 'twitter', icon: Fa.FaTwitter, prefix: 'https://twitter.com/' },
                                { id: 'facebook', icon: Fa.FaFacebook, prefix: 'https://facebook.com/' },
                                { id: 'youtube', icon: Fa.FaYoutube, prefix: 'https://youtube.com/' },
                                { id: 'tiktok', icon: Fa.FaTiktok, prefix: 'https://tiktok.com/@' },
                                { id: 'telegram', icon: Fa.FaTelegram, prefix: 'https://t.me/' },
                                { id: 'discord', icon: Fi.FiMessageSquare, prefix: '' },
                                { id: 'skype', icon: Fi.FiMessageCircle, prefix: 'skype:' },
                            ].map(social => formData[social.id] && (
                                <a
                                    key={social.id}
                                    href={`${social.prefix}${formData[social.id]}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 ${light ? "text-black/20 hover:text-black" : "text-white/20 hover:text-white"}`}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                        <button className={`mt-8 w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-[1.02] active:scale-95 ${light ? 'bg-black text-white' : 'bg-white text-black'}`}>
                            Save Contact
                        </button>
                    </>
                );
        }
    };

    return (
        <div className={`rounded-3xl w-full max-w-[320px] min-h-[520px] p-6 shadow-2xl transition-all duration-700 relative overflow-hidden flex flex-col ${light ? "text-gray-900" : "text-white"}`} style={{ background: themeColor }}>
            {renderLayout()}
            <div className="mt-auto pt-8 pb-2 text-center">
                <a href="https://cardyn.shop" target="_blank" rel="noopener noreferrer" className={`text-[9px] font-black uppercase tracking-[0.2em] transition-all hover:opacity-100 ${light ? "text-black/30" : "text-white/30"}`}>
                    Powered by cardyn
                </a>
            </div>
        </div>
    );
};

const CompleteProfile = ({ userData }) => {
    const navigate = useNavigate();
    const isAdmin = userData?.role === "Admin";

    const [activeTab, setActiveTab] = useState("personal");
    const [activeField, setActiveField] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [prevUserData, setPrevUserData] = useState(null);

    const [formData, setFormData] = useState(() => {
        const backup = localStorage.getItem("onboarding_backup");
        const baseData = {
            label: "Work Identity",
            templateId: "layout_1",
            themeColor: "#0f172a",
            name: "",
            email: "",
            phone: "",
            whatsapp: "",
            businessRole: "",
            bio: "",
            address: "",
            job: "",
            company: "",
            logo: "",
            website: "",
            linkedin: "",
            twitter: "",
            instagram: "",
            facebook: "",
            youtube: "",
            tiktok: "",
            telegram: "",
            discord: "",
            skype: "",
            country: "",
            countryCode: "",
            state: "",
            stateCode: "",
            city: "",
        };

        if (backup) {
            try {
                return { ...baseData, ...JSON.parse(backup) };
            } catch (e) {
                console.error("Backup parse failed", e);
            }
        }
        return baseData;
    });

    // 2. MERGE CLOUD DATA - Sync during render for React 19 compliance
    if (userData && userData !== prevUserData) {
        let changed = false;
        const merged = { ...formData };
        Object.keys(userData).forEach(key => {
            if (userData[key] && userData[key] !== "" && formData[key] !== userData[key]) {
                merged[key] = userData[key];
                changed = true;
            }
        });
        if (changed) {
            setFormData(merged);
        }
        setPrevUserData(userData);
    }

    // Save to localStorage on change - GUARDED
    useEffect(() => {
        if (prevUserData) {
            localStorage.setItem("onboarding_backup", JSON.stringify(formData));
        }
    }, [formData, prevUserData]);

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, logo: reader.result, logoType: 'file' }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, profileImage: reader.result, profileImageType: 'file' }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        // Validation: Identity Mode Enforcement
        // Common fields required for ALL identities
        const commonFields = ['email', 'phone', 'businessRole', 'address'];
        const missingCommon = commonFields.filter(field => !formData[field]);

        if (missingCommon.length > 0) {
            toast.error(`Required: ${missingCommon.join(', ')}`);
            return;
        }

        // Conditional validation based on the active tab/intent
        const isPersonalComplete = formData.name && formData.bio;
        const isBusinessComplete = formData.company && formData.job;

        if (!isPersonalComplete && !isBusinessComplete) {
            toast.error("Please complete either Personal info (Name & Bio) or Business info (Company & Job).");
            return;
        }

        const savePromise = (async () => {
            const response = await fetch(`${API_BASE_URL}/api/users/onboard`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    uid: userData.uid, 
                    ...formData
                }),
            });
            if (!response.ok) throw new Error("Onboarding failed");
            
            // Clear backup on success
            localStorage.removeItem("onboarding_backup");
            
            navigate("/user/home");
        })();

        toast.promise(savePromise, {
            loading: 'Architecting your identity...',
            success: 'Identity Hub Online!',
            error: 'Failed to deploy identity.'
        });
    };

    if (isAdmin) return <Navigate to="/admin/analytics" />;
    if (userData?.onboarded) return <Navigate to="/user/home" />;



    return (
        <Layout userData={userData} hideSidebar hideTopNav>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
                <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-4">
                    <button
                        onClick={() => setActiveTab("personal")}
                        className={`px-4 py-2 rounded-lg transition-all font-['Mulish'] shadow-md cursor-pointer text-sm sm:text-base ${activeTab === "personal" ? "bg-black text-white shadow-lg" : "bg-gray-100 text-gray-900"}`}
                    >
                        Personal
                    </button>
                    <button
                        onClick={() => setActiveTab("business")}
                        className={`px-4 py-2 rounded-lg transition-all font-['Mulish'] shadow-md cursor-pointer text-sm sm:text-base ${activeTab === "business" ? "bg-black text-white shadow-lg" : "bg-gray-100 text-gray-900"}`}
                    >
                        Business
                    </button>
                </div>
                <hr />

                {/* LABEL */}
                <div className="bg-white p-4 sm:p-5 rounded-xl border shadow-sm">
                    <h3 className="text-sm mb-3 font-semibold opacity-60">Label this card</h3>
                    <input
                        className="w-full p-3 rounded-lg bg-gray-50 border border-transparent focus:border-black/5 outline-none font-bold text-sm sm:text-base"
                        placeholder="Work"
                        value={formData.label}
                        onChange={(e) =>
                            setFormData({ ...formData, label: e.target.value })
                        }
                    />
                </div>

                {/* --- SIMPLIFIED IDENTITY STUDIO --- */}
                <div className="bg-white p-4 sm:p-6 rounded-xl border shadow-sm grid lg:grid-cols-2 gap-8">

                    {/* LEFT: THE LIVE PREVIEW */}
                    <div className="flex flex-col items-center">
                        <CardPreview formData={formData} />
                    </div>

                    {/* RIGHT: THE DESIGN CONTROLS */}
                    <div className="space-y-8">

                        {/* 1. BRANDING */}
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setFormData({ ...formData, logoType: 'file' })}
                                    className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${formData.logoType === 'file' ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}
                                >
                                    Upload
                                </button>
                                <button
                                    onClick={() => setFormData({ ...formData, logoType: 'url' })}
                                    className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${formData.logoType === 'url' ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}
                                >
                                    Remote URL
                                </button>
                            </div>

                            {formData.logoType === 'file' ? (
                                <div className="relative border-2 border-dashed p-10 text-center rounded-lg cursor-pointer hover:border-black/20 transition-all bg-gray-50/50">
                                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                        {formData.logo ? "Logo Loaded" : "+ Click to Dispatch Logo"}
                                    </span>
                                </div>
                            ) : (
                                <input
                                    type="text"
                                    placeholder="Paste Identity Logo URL..."
                                    value={formData.logo}
                                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                                    className="w-full p-4 rounded-lg bg-gray-50 text-[11px] font-bold border border-transparent focus:border-black/5 outline-none"
                                />
                            )}
                            <p className="text-[11px] font-bold text-zinc-500 leading-relaxed">
                                <span className='text-red-500'>Note:</span> Logo should be without background or transparent background.
                            </p>
                        </div>

                        {/* 2. THEME */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold opacity-60">Identity Theme</h3>
                            <div className="flex items-center gap-4 sm:gap-6 overflow-hidden">
                                <div className="react-colorful-container">
                                    <HexColorPicker color={formData.themeColor} onChange={(c) => setFormData(prev => ({ ...prev, themeColor: c }))} />
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Live Result</div>
                                    <div className={`w-20 h-20 rounded-2xl shadow-xl border-4 border-white flex flex-col items-center justify-center p-2 transition-all duration-300 ${isLight(formData.themeColor) ? "text-gray-900" : "text-white"}`} style={{ background: formData.themeColor }}>
                                        <Fi.FiUser size={18} />
                                    </div>
                                    <div className="flex gap-2">
                                        {["#0f172a", "#3b82f6", "#ef4444", "#22c55e"].map(c => (
                                            <div key={c} onClick={() => setFormData(prev => ({ ...prev, themeColor: c }))} className="w-5 h-5 rounded-full cursor-pointer border border-white shadow-sm" style={{ background: c }} />
                                        ))}
                                    </div>
                                    <input type="text" value={formData.themeColor} onChange={(e) => setFormData(prev => ({ ...prev, themeColor: e.target.value }))} className="w-24 px-3 py-2 rounded-lg bg-gray-50 border text-xs font-bold text-center uppercase" />
                                </div>
                            </div>
                        </div>

                        {/* 3. LAYOUT */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold opacity-60">Structural Architecture</h3>
                                <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-gray-100 rounded text-gray-500">ID: {formData.templateId}</span>
                            </div>
                            <div className="grid grid-cols-5 gap-2 sm:gap-3">
                                {[
                                    { id: 'layout_1', name: 'Standard' },
                                    { id: 'layout_2', name: 'Hero' },
                                    { id: 'layout_3', name: 'Matrix' },
                                    { id: 'layout_4', name: 'Lead' },
                                    { id: 'layout_5', name: 'Ultra' },
                                ].map((layout) => {
                                    const isSelected = formData.templateId === layout.id;
                                    return (
                                        <div key={layout.id} onClick={() => setFormData(prev => ({ ...prev, templateId: layout.id }))} className="cursor-pointer">
                                            <div className={`relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${isSelected ? 'border-black' : 'border-gray-100 bg-gray-50'}`}>
                                                <div className="w-full h-full p-1.5 flex flex-col gap-1 opacity-20">
                                                    <div className="w-4 h-4 rounded-full bg-gray-400 mx-auto" />
                                                    <div className="w-full h-1 bg-gray-300 rounded" />
                                                    <div className="w-full h-4 bg-white rounded" />
                                                </div>
                                            </div>
                                            <p className={`text-[8px] font-black uppercase text-center mt-1 ${isSelected ? 'text-black' : 'text-gray-400'}`}>{layout.name}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Activate Design Architecture Button */}
                            <button 
                                onClick={handleSave}
                                className="w-full mt-6 py-4 bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Fi.FiCheckCircle size={14} />
                                Activate Design Architecture
                            </button>
                        </div>
                    </div>
                </div>

                {/* CARD DETAILS */}

                {activeTab === "personal" && (
                    <>
                        <Section title="Personal Information">
                            <IconCard icon={Fi.FiUser} label="Name" field="name" onClick={setActiveField} required />
                            <IconCard icon={Fi.FiAward} label="Business Role" field="businessRole" onClick={setActiveField} required />
                            <IconCard icon={Fi.FiFileText} label="Bio" field="bio" onClick={setActiveField} required />
                        </Section>

                        <Section title="Contact & General">
                            <IconCard icon={Fi.FiMail} label="Email" field="email" onClick={setActiveField} required />
                            <IconCard icon={Fi.FiPhone} label="Phone" field="phone" onClick={setActiveField} required />
                            <IconCard icon={Fi.FiMapPin} label="Address" field="address" onClick={setActiveField} required />
                            <IconCard icon={Fi.FiGlobe} label="Website" field="website" onClick={setActiveField} />
                        </Section>

                        <Section title="Social Presence">
                            <IconCard icon={Fi.FiLinkedin} label="LinkedIn" field="linkedin" onClick={setActiveField} />
                            <IconCard icon={Fi.FiTwitter} label="X / Twitter" field="twitter" onClick={setActiveField} />
                            <IconCard icon={Fi.FiInstagram} label="Instagram" field="instagram" onClick={setActiveField} />
                        </Section>

                        <Section title="Messaging">
                            <IconCard icon={Fi.FiMessageSquare} label="Discord" field="discord" onClick={setActiveField} />
                            <IconCard icon={Fi.FiSend} label="Telegram" field="telegram" onClick={setActiveField} />
                            <IconCard icon={Fi.FiPhone} label="WhatsApp" field="whatsapp" onClick={setActiveField} />
                            <IconCard icon={Fi.FiMessageCircle} label="Skype" field="skype" onClick={setActiveField} />
                        </Section>
                    </>
                )}

                {activeTab === "business" && (
                    <>
                        <Section title="Company Information">
                            <IconCard icon={Fi.FiHome} label="Company Name" field="company" onClick={setActiveField} required />
                            <IconCard icon={Fi.FiBriefcase} label="Job Title" field="job" onClick={setActiveField} required />
                            <IconCard icon={Fi.FiAward} label="Business Role" field="businessRole" onClick={setActiveField} required />
                        </Section>

                        <Section title="Contact & General">
                            <IconCard icon={Fi.FiMail} label="Email" field="email" onClick={setActiveField} required />
                            <IconCard icon={Fi.FiPhone} label="Phone" field="phone" onClick={setActiveField} required />
                            <IconCard icon={Fi.FiMapPin} label="Address" field="address" onClick={setActiveField} required />
                            <IconCard icon={Fi.FiGlobe} label="Website" field="website" onClick={setActiveField} />
                        </Section>

                        <Section title="Social Presence">
                            <IconCard icon={Fi.FiLinkedin} label="LinkedIn" field="linkedin" onClick={setActiveField} />
                            <IconCard icon={Fi.FiTwitter} label="X / Twitter" field="twitter" onClick={setActiveField} />
                            <IconCard icon={Fi.FiInstagram} label="Instagram" field="instagram" onClick={setActiveField} />
                        </Section>

                        <Section title="Messaging">
                            <IconCard icon={Fi.FiMessageSquare} label="Discord" field="discord" onClick={setActiveField} />
                            <IconCard icon={Fi.FiSend} label="Telegram" field="telegram" onClick={setActiveField} />
                            <IconCard icon={Fi.FiPhone} label="WhatsApp" field="whatsapp" onClick={setActiveField} />
                            <IconCard icon={Fi.FiMessageCircle} label="Skype" field="skype" onClick={setActiveField} />
                        </Section>
                    </>
                )}

                {/* SAVE & BACK */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 sm:gap-6 items-center">
                    <button
                        onClick={async () => {
                            await signOut(auth);
                            navigate("/signup");
                        }}
                        className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors w-full sm:w-auto justify-center"
                    >
                        <Fi.FiArrowLeft size={16} />
                        Back to Register
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-black text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-2xl hover:brightness-110 transition-all active:scale-95 w-full sm:w-auto"
                    >
                        Save & Continue
                    </button>
                </div>

                {/* MODAL */}
                {activeField && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000] p-4 backdrop-blur-sm">
                        <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh] animate-in fade-in zoom-in duration-300">
                            <h3 className="mb-3 capitalize">{activeField}</h3>

                            {activeField === 'address' ? (
                                <div className="space-y-4">
                                    <select
                                        className="w-full p-3 border rounded-lg"
                                        onChange={(e) => {
                                            const country = Country.getCountryByCode(e.target.value);
                                            setFormData({
                                                ...formData,
                                                country: country.name,
                                                countryCode: country.isoCode,
                                                state: "",
                                                stateCode: "",
                                                city: "",
                                                address: `${formData.exactLocation}${formData.exactLocation ? ', ' : ''}${country.name}`
                                            });
                                        }}
                                        value={formData.countryCode || ""}
                                    >
                                        <option value="">Select Country</option>
                                        {Country.getAllCountries().map((c) => (
                                            <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                                        ))}
                                    </select>

                                    <select
                                        disabled={!formData.countryCode}
                                        className="w-full p-3 border rounded-lg disabled:opacity-40"
                                        onChange={(e) => {
                                            const state = State.getStateByCodeAndCountry(e.target.value, formData.countryCode);
                                            setFormData({
                                                ...formData,
                                                state: state.name,
                                                stateCode: state.isoCode,
                                                city: "",
                                                address: `${formData.exactLocation}${formData.exactLocation ? ', ' : ''}${state.name}, ${formData.country}`
                                            });
                                        }}
                                        value={formData.stateCode || ""}
                                    >
                                        <option value="">Select State</option>
                                        {formData.countryCode && State.getStatesOfCountry(formData.countryCode).map((s) => (
                                            <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
                                        ))}
                                    </select>

                                    <select
                                        disabled={!formData.stateCode}
                                        className="w-full p-3 border rounded-lg disabled:opacity-40"
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                city: e.target.value,
                                                address: `${formData.exactLocation}${formData.exactLocation ? ', ' : ''}${e.target.value}, ${formData.state}, ${formData.country}`
                                            });
                                        }}
                                        value={formData.city || ""}
                                    >
                                        <option value="">Select City</option>
                                        {formData.countryCode && formData.stateCode && City.getCitiesOfState(formData.countryCode, formData.stateCode).map((c) => (
                                            <option key={c.name} value={c.name}>{c.name}</option>
                                        ))}
                                    </select>
                                    <textarea
                                        className="w-full p-3 border rounded-lg mt-4 shadow-sm focus:border-black outline-none transition-all"
                                        placeholder="Exact Location (Street, Building, Apartment, etc.)"
                                        rows={3}
                                        value={formData.exactLocation || ""}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setFormData({
                                                ...formData,
                                                exactLocation: val,
                                                address: `${val}${val ? ', ' : ''}${formData.city ? formData.city + ', ' : ''}${formData.state ? formData.state + ', ' : ''}${formData.country}`
                                            });
                                        }}
                                    />
                                </div>
                            ) : activeField === 'businessRole' ? (
                                <select
                                    className="w-full p-3 border rounded-lg"
                                    value={formData.businessRole || ""}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            businessRole: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Select Industry</option>
                                    {['Business', 'Luxury', 'Technology', 'Agency', 'Healthcare', 'Automotive', 'Real Estate', 'Legal', 'Hospitality', 'Fitness', 'Construction', 'Beauty', 'Creator', 'Service'].map(role => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    className="w-full p-3 border rounded-lg"
                                    value={formData[activeField] || ""}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            [activeField]: e.target.value,
                                        })
                                    }
                                />
                            )}

                            <div className="flex justify-end gap-3 mt-4">
                                <button onClick={() => setActiveField(null)}>
                                    Cancel
                                </button>
                                <button
                                    onClick={() => setActiveField(null)}
                                    className="bg-black text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default CompleteProfile;