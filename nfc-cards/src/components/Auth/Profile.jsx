import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from '@/firebase.config';
import { useNavigate } from 'react-router-dom';
import { signOut, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import {
    FiActivity,
    FiBriefcase,
    FiMail,
    FiPhone,
    FiMapPin,
    FiX,
    FiEdit3,
    FiLinkedin,
    FiInstagram,
    FiTwitter,
    FiSend,
    FiMessageCircle,
    FiGlobe,
    FiLayout,
    FiUser,
    FiUpload
} from 'react-icons/fi';
import { Country, State, City } from "country-state-city";
import { TEMPLATES } from '../../templates/templateRegistry';
import TemplateRenderer from '../../templates/TemplateRenderer';
import Layout from '../layout/layout';
import toast from 'react-hot-toast';
import { HexColorPicker } from "react-colorful";
import * as Fa from 'react-icons/fa';

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

    const SocialIcons = ({ formData, light }) => {
        const icons = [
            { id: 'linkedin', icon: FiLinkedin },
            { id: 'instagram', icon: FiInstagram },
            { id: 'twitter', icon: FiTwitter },
            { id: 'telegram', icon: FiSend },
            { id: 'youtube', icon: Fa.FaYoutube },
            { id: 'tiktok', icon: Fa.FaTiktok },
        ].filter(social => formData[social.id]);

        if (icons.length === 0) return null;

        return (
            <div className="flex flex-wrap justify-center gap-3 mt-6">
                {icons.map(social => {
                    const Icon = social.icon;
                    return (
                        <div key={social.id} className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all hover:scale-110 ${light ? 'bg-black/5 border-black/5' : 'bg-white/10 border-white/5 text-white'}`}>
                            <Icon size={14} />
                        </div>
                    );
                })}
            </div>
        );
    };

    const LocationDisplay = ({ formData, light }) => {
        const addressText = formData.address || `${formData.city}${formData.city && formData.state ? ', ' : ''}${formData.state}${(formData.city || formData.state) && formData.country ? ' | ' : ''}${formData.country}`;
        if (!addressText || addressText.trim() === '' || addressText.trim() === ',' || addressText.trim() === '|') return null;

        return (
            <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 w-full p-6 rounded-[2rem] border flex flex-col items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer ${light ? 'bg-black/5 border-black/5' : 'bg-white/10 border-white/5 backdrop-blur-md'}`}
            >
                <FiMapPin size={24} className="text-[#b8955d] mb-1" />
                <p className={`text-[8px] font-black uppercase tracking-[0.3em] ${light ? 'text-black/40' : 'text-[#b8955d]'}`}>Head Office</p>
                <p className="text-[11px] font-bold text-center leading-tight">
                    {addressText}
                </p>
            </a>
        );
    };

    const renderLayout = () => {
        switch (formData.templateId) {
            case 'layout_2': // HERO
                return (
                    <div className="flex flex-col h-full">
                        <div className="h-24 -mx-6 -mt-6 mb-16 relative" style={{ background: 'rgba(255,255,255,0.1)' }}>
                            <div className="absolute left-1/2 -translate-x-1/2 top-10">
                                <div className={`w-24 h-24 rounded-full border-4 ${light ? 'border-white bg-gray-100 shadow-xl' : 'border-zinc-900 bg-zinc-800 shadow-2xl'} overflow-hidden`}>
                                    {formData.logo ? <img src={formData.logo} className="w-full h-full object-cover" /> : <FiUser className="m-auto mt-6" size={36} />}
                                </div>
                            </div>
                        </div>
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-black">{formData.displayName || "Your Name"}</h3>
                            <p className="opacity-60 text-[10px] font-black uppercase tracking-widest">{formData.businessRole || "Your Role"}</p>
                            <LocationDisplay formData={formData} light={light} />
                        </div>
                        <div className="space-y-2">
                            <a href={`tel:${formData.phone}`} className={`p-3 rounded-2xl flex items-center gap-3 border transition-all active:scale-95 ${light ? 'bg-black/5 border-black/5' : 'bg-white/10 border-white/5'}`}>
                                <Fa.FaPhoneAlt className="text-[#b8955d]" size={14} />
                                <span className="text-[9px] font-black uppercase">{formData.phone || "Phone Number"}</span>
                            </a>
                            {formData.whatsapp && (
                                <a href={`https://wa.me/${formData.whatsapp}`} target="_blank" rel="noopener noreferrer" className={`p-3 rounded-2xl flex items-center gap-3 border transition-all active:scale-95 ${light ? 'bg-black/5 border-black/5' : 'bg-white/10 border-white/5'}`}>
                                    <Fa.FaWhatsapp className="text-[#b8955d]" size={16} />
                                    <span className="text-[9px] font-black uppercase">WhatsApp</span>
                                </a>
                            )}
                        </div>
                        <SocialIcons formData={formData} light={light} />
                        <button className={`mt-auto w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg ${light ? 'bg-black text-white' : 'bg-white text-black'}`}>
                            Save Contact
                        </button>
                    </div>
                );
            case 'layout_3': // MATRIX
                return (
                    <div className="flex flex-col h-full gap-6">
                        <div className="grid grid-cols-2 gap-3">
                            <a href={`tel:${formData.phone}`} className={`aspect-square rounded-[2rem] flex flex-col items-center justify-center gap-2 border transition-all active:scale-95 ${light ? 'bg-black/5 border-black/5' : 'bg-white/10 border-white/5'}`}>
                                <Fa.FaPhoneAlt size={20} className="text-[#b8955d]" />
                                <span className="text-[8px] font-black uppercase tracking-widest">Call</span>
                            </a>
                            {formData.whatsapp && (
                                <a href={`https://wa.me/${formData.whatsapp}`} target="_blank" rel="noopener noreferrer" className={`aspect-square rounded-[2rem] flex flex-col items-center justify-center gap-2 border transition-all active:scale-95 ${light ? 'bg-black/5 border-black/5' : 'bg-white/10 border-white/5'}`}>
                                    <Fa.FaWhatsapp size={22} className="text-[#b8955d]" />
                                    <span className="text-[8px] font-black uppercase tracking-widest">Chat</span>
                                </a>
                            )}
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <div className={`w-18 h-18 rounded-2xl rotate-3 mb-4 overflow-hidden border-2 ${light ? 'border-black/10' : 'border-white/20'}`}>
                                {formData.logo && <img src={formData.logo} className="w-full h-full object-cover" />}
                            </div>
                            <h3 className="text-lg font-black leading-tight">{formData.displayName || "Your Name"}</h3>
                            <p className="text-[10px] opacity-60 font-bold uppercase tracking-widest">{formData.businessRole}</p>
                            <LocationDisplay formData={formData} light={light} />
                        </div>
                        <SocialIcons formData={formData} light={light} />
                        <button className={`w-full py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest shadow-lg ${light ? 'bg-black text-white' : 'bg-white text-black'}`}>
                            Save Contact
                        </button>
                    </div>
                );
            case 'layout_4': // LEAD
                return (
                    <div className="flex flex-col h-full">
                        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                            <div className={`w-24 h-24 rounded-full border-4 ${light ? 'border-black/5 bg-black/5' : 'border-white/10 bg-white/10'} p-1 mb-6 transition-transform duration-500 hover:scale-110 shadow-xl`}>
                                <div className="w-full h-full rounded-full overflow-hidden">
                                    {formData.logo ? <img src={formData.logo} className="w-full h-full object-cover" /> : <FiUser className="m-auto mt-6" size={32} />}
                                </div>
                            </div>
                            <h3 className="text-xl font-black mb-1">{formData.displayName || "Your Name"}</h3>
                            <p className="text-[10px] opacity-60 font-black uppercase tracking-[0.2em]">{formData.businessRole || "Industry Expert"}</p>
                            <LocationDisplay formData={formData} light={light} />
                            <div className={`h-1 w-8 rounded-full mt-4 ${light ? 'bg-black/10' : 'bg-white/20'}`} />
                        </div>
                        <div className="space-y-3">
                            <a href={`tel:${formData.phone}`} className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 border transition-all active:scale-95 ${light ? 'bg-black text-white border-black shadow-lg' : 'bg-white text-black border-white shadow-xl'}`}>
                                <Fa.FaPhoneAlt size={12} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Connect Now</span>
                            </a>
                            <div className="grid grid-cols-2 gap-3">
                                {formData.whatsapp && (
                                    <a href={`https://wa.me/${formData.whatsapp}`} target="_blank" rel="noopener noreferrer" className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 ${light ? 'bg-black/5 border-black/5' : 'bg-white/10 border-white/5'}`}>
                                        <Fa.FaWhatsapp size={16} className="text-[#b8955d]" />
                                        <span className="text-[8px] font-black uppercase">WhatsApp</span>
                                    </a>
                                )}
                                <div className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 ${light ? 'bg-black/5 border-black/5' : 'bg-white/10 border-white/5'} ${!formData.whatsapp && 'col-span-2'}`}>
                                    <FiGlobe size={16} className="text-[#b8955d]" />
                                    <span className="text-[8px] font-black uppercase">Website</span>
                                </div>
                            </div>
                        </div>
                        <SocialIcons formData={formData} light={light} />
                    </div>
                );
            case 'layout_5': // ULTRA
                return (
                    <div className="flex flex-col h-full relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
                        <div className="flex-1 flex flex-col pt-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 ${light ? 'border-black/10 bg-white/50' : 'border-white/20 bg-black/20'} backdrop-blur-md overflow-hidden rotate-3`}>
                                    {formData.logo ? <img src={formData.logo} className="w-full h-full object-cover p-2" /> : <FiActivity size={24} />}
                                </div>
                                <div>
                                    <h3 className="text-lg font-black leading-tight">{formData.displayName || "Your Name"}</h3>
                                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-60">{formData.company || "Identity Enterprise"}</p>
                                </div>
                            </div>
                            <LocationDisplay formData={formData} light={light} />
                            <div className={`flex-1 mt-6 rounded-[2.5rem] ${light ? 'bg-black/5' : 'bg-white/5'} border border-white/10 p-6 flex flex-col justify-center gap-4 backdrop-blur-sm`}>
                                <div className={`space-y-1 ${!formData.phone && 'hidden'}`}>
                                    <p className="text-[8px] font-black uppercase tracking-widest opacity-40">Direct Line</p>
                                    <p className="text-sm font-bold">{formData.phone}</p>
                                </div>
                                <SocialIcons formData={formData} light={light} />
                                <button className={`mt-4 w-full py-4 rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] shadow-xl transition-all hover:scale-105 ${light ? 'bg-black text-white' : 'bg-white text-black'}`}>
                                    Save Contact
                                </button>
                            </div>
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
                                    <FiUser size={30} />
                                )}
                            </div>
                            <h3 className="text-lg font-black">{formData.displayName || "Your Name"}</h3>
                            <p className={`${light ? "text-gray-500" : "opacity-70"} text-sm`}>
                                {formData.businessRole || formData.job || "Your Role"}
                            </p>
                        </div>
                        <div className="mt-8 space-y-4">
                            <div className={`flex items-center gap-4 mb-2 ${(formData.phone || formData.whatsapp) ? '' : 'hidden'}`}>
                                <span className={`text-[8px] font-black uppercase tracking-[0.2em] whitespace-nowrap ${light ? 'text-black/30' : 'text-white/30'}`}>Connect with us</span>
                                <div className={`h-[1px] w-full ${light ? 'bg-black/10' : 'bg-white/10'}`}></div>
                            </div>
                            <div className={`grid ${formData.whatsapp ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
                                {formData.phone && (
                                    <a href={`tel:${formData.phone}`} className={`p-4 rounded-[1.5rem] flex flex-col items-center justify-center gap-2 border transition-all active:scale-95 ${light ? 'bg-black/5 border-black/5' : 'bg-white/5 border-white/5'}`}>
                                        <Fa.FaPhoneAlt size={20} className="text-[#b8955d]" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Call Now</span>
                                    </a>
                                )}
                                {formData.whatsapp && (
                                    <a href={`https://wa.me/${formData.whatsapp}`} target="_blank" rel="noopener noreferrer" className={`p-4 rounded-[1.5rem] flex flex-col items-center justify-center gap-2 border transition-all active:scale-95 ${light ? 'bg-black/5 border-black/5' : 'bg-white/10 border-white/5'}`}>
                                        <Fa.FaWhatsapp size={22} className="text-[#b8955d]" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">WhatsApp</span>
                                    </a>
                                )}
                            </div>
                            <LocationDisplay formData={formData} light={light} />
                            {formData.website && (
                                <a href={formData.website.startsWith('http') ? formData.website : `https://${formData.website}`} target="_blank" rel="noopener noreferrer" className={`w-full py-4 rounded-[1.5rem] flex items-center justify-center border transition-all hover:scale-[1.02] active:scale-95 shadow-lg font-black text-[10px] uppercase tracking-widest ${light ? 'bg-black/5 border-black/10 text-black' : 'bg-white/5 border-white/10 text-white'}`}>
                                    Visit Website
                                </a>
                            )}
                        </div>
                        <SocialIcons formData={formData} light={light} />
                        <button className={`mt-8 w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-[1.02] active:scale-95 ${light ? 'bg-black text-white' : 'bg-white text-black'}`}>
                            Save Contact
                        </button>
                    </>
                );
        }
    };

    return (
        <div className={`rounded-3xl w-full max-w-[320px] scale-[0.9] sm:scale-100 min-h-[520px] p-6 shadow-2xl transition-all duration-700 relative overflow-hidden flex flex-col ${light ? "text-gray-900" : "text-white"}`} style={{ background: themeColor }}>
            {renderLayout()}
            <div className="mt-auto pt-8 pb-2 text-center">
                <a href="https://cardyn.shop" target="_blank" rel="noopener noreferrer" className={`text-[9px] font-black uppercase tracking-[0.2em] transition-all hover:opacity-100 ${light ? "text-black/30" : "text-white/30"}`}>
                    Powered by cardyn
                </a>
            </div>
        </div>
    );
};

const Profile = ({ userData }) => {
    const navigate = useNavigate();
    const user = auth.currentUser;
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const [prevUserData, setPrevUserData] = useState(null);
    const [formData, setFormData] = useState({
        displayName: "",
        job: "",
        businessRole: "",
        company: "",
        email: "",
        phone: "",
        logo: "",
        logoType: "file",
        country: "",
        countryCode: "",
        state: "",
        stateCode: "",
        city: "",
        website: "",
        linkedin: "",
        instagram: "",
        twitter: "",
        youtube: "",
        tiktok: "",
        discord: "",
        telegram: "",
        whatsapp: "",
        venmo: "",
        cashapp: "",
        paypal: "",
        zipCode: "",
        address: "",
        bio: "",
        profileImage: "",
        profileImageType: "file",
        templateId: "layout_1",
        themeColor: "#0f172a"
    });

    const [locationData, setLocationData] = useState({
        countries: Country.getAllCountries(),
        states: [],
        cities: [],
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

        if (userData.countryCode) {
            const states = State.getStatesOfCountry(userData.countryCode);
            setLocationData((prev) => ({ ...prev, states }));

            if (userData.stateCode) {
                const cities = City.getCitiesOfState(userData.countryCode, userData.stateCode);
                setLocationData((prev) => ({ ...prev, cities }));
            }
        }
        setPrevUserData(userData);
    }

    const handleCountryChange = (e) => {
        const countryCode = e.target.value;
        const country = locationData.countries.find((c) => c.isoCode === countryCode);
        const states = State.getStatesOfCountry(countryCode);

        setFormData({
            ...formData,
            country: country ? country.name : "",
            countryCode,
            state: "",
            stateCode: "",
            city: "",
        });

        setLocationData({ ...locationData, states, cities: [] });
    };

    const handleStateChange = (e) => {
        const stateCode = e.target.value;
        const state = locationData.states.find((s) => s.isoCode === stateCode);
        const cities = City.getCitiesOfState(formData.countryCode, stateCode);

        setFormData({
            ...formData,
            state: state ? state.name : "",
            stateCode,
            city: "",
        });

        setLocationData({ ...locationData, cities });
    };

    const handleLogout = () => signOut(auth);

    const handleSave = async () => {
        if (!user) return;

        const commonFields = {
            email: 'Email',
            phone: 'Phone',
            businessRole: 'Business Category',
            country: 'Country',
            state: 'State',
            city: 'City'
        };

        const missingCommon = Object.keys(commonFields).filter(field => !formData[field]);

        if (missingCommon.length > 0) {
            const labels = missingCommon.map(f => commonFields[f]);
            toast.error(`Common Required: ${labels.join(', ')}`);
            return;
        }

        const isPersonalComplete = formData.displayName;
        const isBusinessComplete = formData.company && formData.job;

        if (!isPersonalComplete && !isBusinessComplete) {
            toast.error("Please fill either Personal (Name) or Business (Company & Job) info.");
            return;
        }

        setIsSaving(true);
        const savePromise = (async () => {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                ...formData,
                lastUpdated: new Date().toISOString()
            });

            if (formData.displayName !== user.displayName) {
                await updateProfile(user, { displayName: formData.displayName });
            }

            setIsEditing(false);
            setIsSaving(false);
        })();

        toast.promise(savePromise, {
            loading: 'Updating cloud profile...',
            success: 'Synchronized successfully!',
            error: 'Failed to synchronize.'
        });
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

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

    const inputClasses = `w-full bg-white border border-gray-200 rounded-full px-6 py-4 text-sm font-medium text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all placeholder:text-gray-300 disabled:bg-gray-50 disabled:text-gray-600 cursor-pointer`;
    const labelClasses = `text-sm font-bold text-gray-900 mb-3 block px-1`;



    return (
        <Layout userData={userData}>
            <div className="w-[92%] lg:w-[95%] max-w-7xl mx-auto font-['Mulish'] bg-white min-h-screen rounded-t-[3rem] shadow-2xl border-x border-zinc-50 overflow-hidden">

                {/* --- PREMIUM SOCIAL BANNER HEADER --- */}
                <div className="relative mb-32">
                    <div
                        className="h-64 md:h-80 w-full rounded-t-[3rem] relative overflow-hidden shadow-inner"
                        style={{ background: 'linear-gradient(90deg, #5f5bff 0%, #8f88ff 30%, #d6d2ff 55%, #f1d6e6 80%, #f6eaf1 100%)' }}
                    >
                        <div className="absolute top-10 left-20 w-32 h-32 bg-white/20 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-10 right-40 w-64 h-64 bg-white/30 rounded-full blur-[100px]" />

                        <div className="absolute top-8 right-8 z-20 flex gap-4">
                            {isSaving && (
                                <div className="flex items-center gap-2 text-white font-black text-[10px] uppercase tracking-widest bg-black/20 backdrop-blur-md px-5 py-3 rounded-full border border-white/20">
                                    <FiActivity className="animate-spin" size={12} />
                                    <span>Syncing Node</span>
                                </div>
                            )}
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-10 py-4 rounded-full bg-white text-black font-black text-[11px] uppercase tracking-widest hover:scale-105 shadow-2xl transition-all active:scale-95"
                                >
                                    Edit Identity
                                </button>
                            ) : (
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-8 py-4 rounded-full bg-black/40 backdrop-blur-md text-white font-black text-[11px] uppercase tracking-widest hover:bg-black/60 transition-all border border-white/10"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-10 py-4 rounded-full bg-white text-black font-black text-[11px] uppercase tracking-widest hover:scale-105 shadow-2xl transition-all"
                                    >
                                        Apply Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="absolute -bottom-24 left-8 md:left-16 lg:left-24 flex flex-col md:flex-row items-end gap-10">
                        <div className="relative group">
                            {/* Avatar Container */}
                            <div className="w-48 h-48 rounded-full border-[12px] border-white shadow-2xl overflow-hidden bg-gray-50 flex items-center justify-center transition-transform group-hover:scale-[1.02] duration-500">
                                {formData.profileImage ? (
                                    <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <FiUser size={64} className="text-gray-200" />
                                )}
                            </div>

                            {/* Actions Overlay */}
                            {isEditing && (
                                <>
                                    {/* Upload Button */}
                                    <label className="absolute -bottom-2 -right-2 w-12 h-12 bg-black rounded-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all shadow-xl border-4 border-white">
                                        <FiEdit3 className="text-white w-5 h-5" />
                                        <input type="file" className="hidden" accept="image/*" onChange={handleProfileImageUpload} />
                                    </label>

                                    {/* Remove Button */}
                                    {formData.profileImage && (
                                        <button
                                            onClick={() => handleInputChange('profileImage', '')}
                                            className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all shadow-xl border-4 border-white text-red-500 z-10"
                                            title="Remove Image"
                                        >
                                            <FiX size={16} />
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                        <div className="lg:col-span-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">

                                {/* --- NEW INTEGRATED BRANDING HUB --- */}
                                <div className="md:col-span-2 mb-12">
                                    <div className="bg-gray-100 p-12 rounded-2xl shadow-md border border-gray-50 flex flex-col md:flex-row items-center gap-12">
                                        <div className="flex-shrink-0 relative group">
                                            {/* Logo Preview Container */}
                                            <div className="w-40 h-40 rounded-2xl bg-white shadow-md border border-gray-50 flex items-center justify-center overflow-hidden group relative">
                                                {formData.logo ? (
                                                    <img src={formData.logo} alt="Logo" className="w-full h-full object-contain p-6" />
                                                ) : (
                                                    <FiActivity size={32} className="text-gray-200" />
                                                )}
                                            </div>

                                            {/* Remove Logo Button */}
                                            {isEditing && formData.logo && (
                                                <button
                                                    onClick={() => handleInputChange('logo', '')}
                                                    className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all shadow-xl border-4 border-white text-red-500 z-10"
                                                    title="Remove Logo"
                                                >
                                                    <FiX size={16} />
                                                </button>
                                            )}
                                        </div>

                                        <div className="flex-grow w-full space-y-6">
                                            <div>
                                                <h4 className="text-sm font-black uppercase tracking-[0.3em] text-gray-900 mb-2">Identity Branding</h4>
                                                <p className="text-xs font-bold text-gray-400">Configure your primary brand mark or corporate logo.</p>
                                            </div>

                                            {isEditing ? (
                                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                                    <select
                                                        value={formData.logoType}
                                                        onChange={(e) => handleInputChange('logoType', e.target.value)}
                                                        className="w-full sm:w-auto text-[10px] font-black uppercase tracking-widest bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/10"
                                                    >
                                                        <option value="file">File Upload</option>
                                                        <option value="url">External URL</option>
                                                    </select>

                                                    {formData.logoType === 'url' ? (
                                                        <input
                                                            type="text"
                                                            value={formData.logo}
                                                            onChange={(e) => handleInputChange('logo', e.target.value)}
                                                            className={`${inputClasses} !rounded-2xl`}
                                                            placeholder="Paste Secure Image Link"
                                                        />
                                                    ) : (
                                                        <label className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gray-50 border border-dashed border-gray-200 cursor-pointer hover:bg-gray-100 transition-all border-2">
                                                            <FiUpload size={16} className="text-gray-400" />
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Select Asset</span>
                                                            <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                                                        </label>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full border ${formData.logo ? 'text-emerald-500 bg-emerald-50 border-emerald-100' : 'text-gray-400 bg-gray-50 border-gray-100'}`}>
                                                        {formData.logo ? "Branding Active" : "No Branding Set"}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Transparent Logo Note */}
                                            <p className="text-[10px] font-bold text-red-500/60 flex items-center gap-2">
                                                <FiActivity size={10} />
                                                <span>Note: Transparent background (PNG/SVG) recommended for optimal template results.</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* --- NEW IDENTITY STUDIO SECTION --- */}
                                <div className="md:col-span-2 mb-16">
                                    <div className="bg-white p-6 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden relative">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[100px] -mr-32 -mt-32 opacity-50" />

                                        <div className="flex items-center gap-4 mb-12 relative z-10">
                                            <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-lg">
                                                <FiLayout className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-gray-900 tracking-tight">Identity Studio</h3>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Template & Branding Engine</p>
                                            </div>
                                        </div>

                                        <div className="grid lg:grid-cols-2 gap-16 items-start relative z-10">
                                            {/* LIVE PREVIEW */}
                                            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white rounded-[3rem] p-4 md:p-12 border border-dashed border-gray-200 overflow-hidden">
                                                <CardPreview formData={formData} />
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mt-8">Real-time Identity Preview</p>
                                            </div>

                                            {/* DESIGN CONTROLS */}
                                            <div className="space-y-12">
                                                {/* THEME ENGINE */}
                                                <div className="space-y-6">
                                                    <h4 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600">01. Theme Engine</h4>
                                                    <div className="flex flex-col sm:flex-row items-center gap-10">
                                                        <div className="react-colorful-container shadow-2xl rounded-[2rem] overflow-hidden border-8 border-white">
                                                            <HexColorPicker color={formData.themeColor} onChange={(c) => handleInputChange('themeColor', c)} />
                                                        </div>
                                                        <div className="flex flex-col items-center gap-6">
                                                            <div className={`w-24 h-24 rounded-3xl shadow-2xl border-8 border-white flex flex-col items-center justify-center overflow-hidden transition-all duration-500 scale-110 ${isLight(formData.themeColor) ? "text-gray-900" : "text-white"}`} style={{ background: formData.themeColor }}>
                                                                {formData.profileImage ? (
                                                                    <img src={formData.profileImage} className="w-full h-full object-cover" alt="Theme Preview" />
                                                                ) : (
                                                                    <FiUser size={32} />
                                                                )}
                                                            </div>
                                                            <div className="flex gap-3">
                                                                {["#0f172a", "#3b82f6", "#ef4444", "#22c55e", "#f59e0b", "#6366f1"].map(c => (
                                                                    <div key={c} onClick={() => handleInputChange('themeColor', c)} className={`w-6 h-6 rounded-full cursor-pointer border-2 border-white shadow-lg hover:scale-125 transition-all ${formData.themeColor === c ? 'scale-125 ring-2 ring-offset-2 ring-blue-500' : ''}`} style={{ background: c }} />
                                                                ))}
                                                            </div>
                                                            <input
                                                                type="text"
                                                                disabled={!isEditing}
                                                                value={formData.themeColor}
                                                                onChange={(e) => handleInputChange('themeColor', e.target.value)}
                                                                className="w-28 px-4 py-3 rounded-xl bg-gray-50 border text-[10px] font-black text-center uppercase tracking-widest outline-none focus:ring-2 focus:ring-blue-500/10"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* LAYOUT ARCHITECTURE */}
                                                <div className="space-y-6">
                                                    <h4 className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">02. Layout Architecture</h4>
                                                    <div className="grid grid-cols-5 gap-4">
                                                        {[
                                                            { id: 'layout_1', name: 'Standard' },
                                                            { id: 'layout_2', name: 'Hero' },
                                                            { id: 'layout_3', name: 'Matrix' },
                                                            { id: 'layout_4', name: 'Lead' },
                                                            { id: 'layout_5', name: 'Ultra' },
                                                        ].map((layout) => {
                                                            const isSelected = formData.templateId === layout.id;
                                                            return (
                                                                <div 
                                                                    key={layout.id} 
                                                                    onClick={() => {
                                                                        if (!isEditing) setIsEditing(true);
                                                                        handleInputChange('templateId', layout.id);
                                                                    }} 
                                                                    className="cursor-pointer group"
                                                                >
                                                                    <div className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all duration-300 ${isSelected ? 'border-blue-600 bg-white shadow-xl scale-105' : 'border-gray-100 bg-gray-50 opacity-60 group-hover:opacity-100'}`}>
                                                                        <div className="w-full h-full p-2 flex flex-col gap-1 opacity-40">
                                                                            {layout.id === 'layout_1' && (
                                                                                <div className="flex flex-col items-center gap-1">
                                                                                    <div className="w-4 h-4 rounded-full bg-gray-400" />
                                                                                    <div className="w-full h-1 bg-gray-300 rounded" />
                                                                                    <div className="w-full h-4 bg-gray-200 rounded" />
                                                                                    <div className="w-full h-4 bg-gray-200 rounded" />
                                                                                </div>
                                                                            )}
                                                                            {layout.id === 'layout_2' && (
                                                                                <div className="flex flex-col gap-1">
                                                                                    <div className="w-full h-6 bg-gray-300 rounded" />
                                                                                    <div className="w-4 h-4 rounded-full bg-gray-400 mx-auto -mt-3" />
                                                                                    <div className="w-full h-4 bg-gray-200 rounded mt-1" />
                                                                                </div>
                                                                            )}
                                                                            {layout.id === 'layout_3' && (
                                                                                <div className="grid grid-cols-2 gap-1">
                                                                                    <div className="aspect-square bg-gray-300 rounded" />
                                                                                    <div className="aspect-square bg-gray-300 rounded" />
                                                                                    <div className="col-span-2 h-4 bg-gray-200 rounded" />
                                                                                </div>
                                                                            )}
                                                                            {layout.id === 'layout_4' && (
                                                                                <div className="flex flex-col items-center gap-1">
                                                                                    <div className="w-6 h-6 rounded-full bg-gray-300" />
                                                                                    <div className="w-full h-2 bg-gray-200 rounded" />
                                                                                    <div className="w-full h-6 bg-gray-400 rounded mt-1" />
                                                                                </div>
                                                                            )}
                                                                            {layout.id === 'layout_5' && (
                                                                                <div className="flex flex-col gap-1">
                                                                                    <div className="flex gap-1 items-center">
                                                                                        <div className="w-4 h-4 bg-gray-400 rounded" />
                                                                                        <div className="flex-1 h-2 bg-gray-200 rounded" />
                                                                                    </div>
                                                                                    <div className="w-full h-10 bg-gray-200 rounded-xl mt-1" />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        {isSelected && (
                                                                            <div className="absolute inset-0 bg-blue-600/5 flex items-center justify-center">
                                                                                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <p className={`text-[7px] font-black uppercase text-center mt-2 tracking-widest ${isSelected ? 'text-blue-600' : 'text-gray-400'}`}>{layout.name}</p>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* IDENTITY SECTION */}
                                <div className="md:col-span-2 mb-4">
                                    <h4 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-2">Primary Identity</h4>
                                    <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
                                </div>

                                <div className="space-y-1">
                                    <label className={labelClasses}>Full Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        disabled={!isEditing}
                                        value={formData.displayName}
                                        onChange={(e) => handleInputChange('displayName', e.target.value)}
                                        className={inputClasses}
                                        placeholder="e.g. Dharmik Prajapati"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className={labelClasses}>Business Category <span className="text-red-500">*</span></label>
                                    <select
                                        disabled={!isEditing}
                                        value={formData.businessRole}
                                        onChange={(e) => handleInputChange('businessRole', e.target.value)}
                                        className={`${inputClasses} appearance-none`}
                                    >
                                        <option value="">Select Category</option>
                                        {['Business', 'Luxury', 'Technology', 'Agency', 'Healthcare', 'Automotive', 'Real Estate', 'Legal', 'Hospitality', 'Fitness', 'Construction', 'Beauty', 'Creator', 'Service'].map(role => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className={labelClasses}>Job Title</label>
                                    <input
                                        type="text"
                                        disabled={!isEditing}
                                        value={formData.job}
                                        onChange={(e) => handleInputChange('job', e.target.value)}
                                        className={inputClasses}
                                        placeholder="e.g. Lead Developer"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className={labelClasses}>Company</label>
                                    <input
                                        type="text"
                                        disabled={!isEditing}
                                        value={formData.company}
                                        onChange={(e) => handleInputChange('company', e.target.value)}
                                        className={inputClasses}
                                        placeholder="Company Name"
                                    />
                                </div>

                                <div className="md:col-span-2 mt-8 mb-4">
                                    <h4 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-600 mb-2">Direct Channels</h4>
                                    <div className="h-1 w-12 bg-emerald-600 rounded-full"></div>
                                </div>

                                <div className="space-y-1">
                                    <label className={labelClasses}>Identity Email <span className="text-red-500">*</span></label>
                                    <input
                                        type="email"
                                        disabled={!isEditing}
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className={inputClasses}
                                        placeholder="hello@identity.co"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className={labelClasses}>Authorized Phone <span className="text-red-500">*</span></label>
                                    <input
                                        type="tel"
                                        disabled={!isEditing}
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        className={inputClasses}
                                        placeholder="+1 (xxx) xxx-xxxx"
                                    />
                                </div>

                                <div className="md:col-span-2 mt-8 mb-4">
                                    <h4 className="text-sm font-black uppercase tracking-[0.3em] text-orange-500 mb-2">Regional Hub</h4>
                                    <div className="h-1 w-12 bg-orange-500 rounded-full"></div>
                                </div>

                                <div className="space-y-1">
                                    <label className={labelClasses}>Country <span className="text-red-500">*</span></label>
                                    <select
                                        disabled={!isEditing}
                                        value={formData.countryCode}
                                        onChange={handleCountryChange}
                                        className={`${inputClasses} appearance-none`}
                                    >
                                        <option value="">Select Country</option>
                                        {locationData.countries.map(c => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className={labelClasses}>State <span className="text-red-500">*</span></label>
                                    <select
                                        disabled={!isEditing || !formData.countryCode}
                                        value={formData.stateCode}
                                        onChange={handleStateChange}
                                        className={`${inputClasses} appearance-none`}
                                    >
                                        <option value="">Select State</option>
                                        {locationData.states.map(s => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className={labelClasses}>City <span className="text-red-500">*</span></label>
                                    <select
                                        disabled={!isEditing || !formData.stateCode}
                                        value={formData.city}
                                        onChange={(e) => handleInputChange('city', e.target.value)}
                                        className={`${inputClasses} appearance-none`}
                                    >
                                        <option value="">Select City</option>
                                        {locationData.cities.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                                    </select>
                                </div>

                                <div className="md:col-span-2 space-y-1">
                                    <label className={labelClasses}>Precise Identity Address</label>
                                    <textarea
                                        disabled={!isEditing}
                                        rows={2}
                                        value={formData.address || ""}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        className={`${inputClasses} rounded-3xl resize-none min-h-[80px] leading-relaxed`}
                                        placeholder="e.g. 123 Tech Avenue, Silicon Valley, CA"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className={labelClasses}>Zip Code</label>
                                    <input
                                        type="text"
                                        disabled={!isEditing}
                                        value={formData.zipCode || ""}
                                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                                        className={inputClasses}
                                        placeholder="e.g. 10001"
                                    />
                                </div>

                                <div className="md:col-span-2 mt-8 space-y-1">
                                    <label className={labelClasses}>Identity Manifesto (Bio)</label>
                                    <textarea
                                        disabled={!isEditing}
                                        rows={4}
                                        value={formData.bio}
                                        onChange={(e) => handleInputChange('bio', e.target.value)}
                                        className={`${inputClasses} rounded-3xl resize-none min-h-[120px] leading-relaxed`}
                                        placeholder="Write your professional narrative..."
                                    />
                                </div>

                                <div className="md:col-span-2 pt-16 border-t border-gray-100 mt-10">
                                    <div className="mb-10">
                                        <h3 className="text-2xl font-black text-gray-900 tracking-tight">Digital Ecosystem</h3>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Global Network Distribution</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                        {[
                                            { id: 'website', label: 'Primary Network Hub (Website)', icon: FiGlobe },
                                            { id: 'linkedin', label: 'LinkedIn', icon: FiLinkedin },
                                            { id: 'instagram', label: 'Instagram', icon: FiInstagram },
                                            { id: 'twitter', label: 'X / Twitter', icon: FiTwitter },
                                            { id: 'whatsapp', label: 'WhatsApp', icon: FiPhone },
                                            { id: 'telegram', label: 'Telegram', icon: FiSend },
                                            { id: 'skype', label: 'Skype', icon: FiMessageCircle },
                                        ].map((node) => (
                                            <div key={node.id} className="space-y-1">
                                                <label className={labelClasses}>{node.label}</label>
                                                <div className="relative">
                                                    <node.icon className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" size={16} />
                                                    <input
                                                        type="text"
                                                        disabled={!isEditing}
                                                        value={formData[node.id] || ''}
                                                        onChange={(e) => handleInputChange(node.id, e.target.value)}
                                                        className={`${inputClasses} pl-14`}
                                                        placeholder={`Enter ${node.id} link...`}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-gray-100 pt-10 flex flex-col items-center text-center">
                    <div className="max-w-md bg-red-50/50 p-8 rounded-[2.5rem] border border-red-100/50">
                        <h4 className="text-lg font-black text-red-600 mb-1">Authority Terminal</h4>
                        <p className="text-[11px] font-bold text-red-400 leading-relaxed mb-6">Termination of this session will de-synchronize your current cloud access.</p>
                        <button
                            onClick={handleLogout}
                            className="w-full px-12 py-4 rounded-full bg-red-500 text-white font-black text-[11px] uppercase tracking-widest hover:brightness-110 shadow-xl transition-all"
                        >
                            Terminate Session
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
