import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase.config';
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
    FiYoutube,
    FiVideo,
    FiSend,
    FiMessageSquare,
    FiCreditCard,
    FiDollarSign,
    FiGlobe,
    FiLayout
} from 'react-icons/fi';
import { Country, State, City } from "country-state-city";
import { TEMPLATES } from '../../templates/templateRegistry';
import Layout from '../layout/layout';
import toast from 'react-hot-toast';

const Profile = ({ userData }) => {
    const navigate = useNavigate();
    const user = auth.currentUser;
    const [isEditing, setIsEditing] = useState(false);
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
        paypal: "",
        cashapp: "",
        venmo: "",
        bio: ""
    });

    const [locationData, setLocationData] = useState({
        countries: Country.getAllCountries(),
        states: [],
        cities: [],
    });

    // Synchronize local form state with global user data
    useEffect(() => {
        if (userData && !isEditing) {
            setTimeout(() => {
                setFormData((prev) => ({
                    ...prev,
                    ...userData,
                    displayName: userData.displayName || user?.displayName || ""
                }));

                if (userData.countryCode) {
                    const states = State.getStatesOfCountry(userData.countryCode);
                    setLocationData((prev) => ({ ...prev, states }));

                    if (userData.stateCode) {
                        const cities = City.getCitiesOfState(userData.countryCode, userData.stateCode);
                        setLocationData((prev) => ({ ...prev, cities }));
                    }
                }
            }, 0);
        }
    }, [userData, isEditing, user?.displayName]);

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
                setFormData({ ...formData, logo: reader.result, logoType: 'file' });
            };
            reader.readAsDataURL(file);
        }
    };

    // CLASSIC PREMIUM UI TOKENS
    const cardClasses = `bg-white border border-zinc-100 rounded-3xl p-8 shadow-sm transition-all duration-300`;
    const inputClasses = `w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-3.5 text-sm font-bold text-black outline-none focus:border-black/20 focus:ring-4 focus:ring-black/5 transition-all placeholder:text-zinc-300`;
    const labelClasses = `text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2.5 block px-1`;

    return (
        <Layout userData={userData}>
            <div className="w-full mb-20 space-y-8 animate-in fade-in duration-1000">
                {/* Hub Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div className="space-y-1">
                        <h2 className="text-4xl font-black text-black tracking-tighter">Profile Configuration</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        {isEditing ? (
                            <div className="flex gap-3">
                                <button onClick={() => setIsEditing(false)} className="px-8 py-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-black font-black text-[10px] uppercase tracking-widest hover:bg-zinc-100 transition-all">
                                    Discard
                                </button>
                                <button onClick={handleSave} className="px-10 py-3.5 rounded-xl bg-black text-white font-black text-[10px] uppercase tracking-widest hover:brightness-110 shadow-xl transition-all">
                                    Apply Changes
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="px-10 py-3.5 rounded-xl bg-black text-white font-black text-[10px] uppercase tracking-widest hover:brightness-110 shadow-xl transition-all">
                                Edit Identity
                            </button>
                        )}
                    </div>
                </header>

                <div className="max-w-8xl mx-auto space-y-5 p-4">
                    {/* IDENTITY BRANDING (LOGO) */}
                    <div className={cardClasses}>
                        <div className="flex items-center justify-between mb-8 border-b border-zinc-50 pb-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-zinc-950 text-white shadow-lg">
                                    <FiActivity className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-black tracking-tight">Identity Branding</h3>
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Logo Configuration</p>
                                </div>
                            </div>
                            {isEditing && (
                                <div className="flex items-center gap-1 bg-zinc-50 p-1 rounded-xl border border-zinc-100">
                                    <button
                                        onClick={() => handleInputChange('logoType', 'url')}
                                        className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${formData.logoType === 'url' ? 'bg-white shadow-sm text-black border border-zinc-100' : 'text-zinc-400'}`}
                                    >URL</button>
                                    <button
                                        onClick={() => handleInputChange('logoType', 'file')}
                                        className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${formData.logoType === 'file' ? 'bg-white shadow-sm text-black border border-zinc-100' : 'text-zinc-400'}`}
                                    >FILE</button>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-3xl bg-zinc-50 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden transition-all duration-500 hover:scale-[1.02]">
                                    {formData.logo ? (
                                        <img src={formData.logo} alt="Identity Logo" className="w-full h-full object-contain p-4" />
                                    ) : (
                                        <div className="text-center p-4">
                                            <FiActivity size={24} className="text-zinc-200 mx-auto mb-2" />
                                            <p className="text-[8px] font-black text-zinc-300 uppercase tracking-widest leading-none">Not Set</p>
                                        </div>
                                    )}
                                </div>
                                {isEditing && formData.logo && (
                                    <button
                                        onClick={() => handleInputChange('logo', '')}
                                        className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all z-20"
                                    >
                                        <FiX size={14} />
                                    </button>
                                )}
                            </div>

                            <div className="flex-1 space-y-4">
                                {isEditing ? (
                                    <>
                                        {formData.logoType === 'url' ? (
                                            <div className="space-y-1">
                                                <label className={labelClasses}>Secure URL</label>
                                                <input
                                                    type="text"
                                                    value={formData.logo}
                                                    onChange={(e) => handleInputChange('logo', e.target.value)}
                                                    className={inputClasses}
                                                    placeholder="Image URL..."
                                                />
                                            </div>
                                        ) : (
                                            <div className="space-y-1">
                                                <label className={labelClasses}>Upload Asset</label>
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleLogoUpload}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    />
                                                    <div className="w-full bg-zinc-50 border border-zinc-200 border-dashed rounded-xl px-4 py-6 text-center transition-all hover:bg-zinc-100">
                                                        <FiEdit3 size={20} className="mx-auto text-zinc-300 mb-1" />
                                                        <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Pick File</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${formData.logo ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`} />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                                {formData.logo ? 'Active Branding' : 'Logo Pending'}
                                            </span>
                                        </div>
                                        <p className="text-[11px] font-bold text-zinc-500 leading-relaxed max-w-[200px]">This mark will be visible on your digital card templates.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* AVATAR & PRIMARY INFO */}
                    <div className={cardClasses}>
                        <div className="flex items-center gap-8 h-full">
                            <div className="w-32 h-32 rounded-[2.5rem] flex items-center justify-center bg-zinc-50 border-4 border-white shadow-xl text-4xl font-black text-black">
                                {formData?.displayName?.charAt(0) || 'U'}
                            </div>
                            <div className="flex-1 space-y-4">
                                {isEditing ? (
                                    <div className="space-y-1">
                                        <label className={labelClasses}>Display Name</label>
                                        <input type="text" value={formData.displayName} onChange={(e) => handleInputChange('displayName', e.target.value)} className={inputClasses} placeholder="Full Name" />
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-3xl font-black text-black tracking-tighter capitalize leading-tight">{formData?.displayName || 'Authorized Member'}</h3>
                                            {formData?.label && (
                                                <span className="px-3 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-400 text-[8px] font-black uppercase tracking-[0.2em]">{formData.label}</span>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="px-4 py-1.5 rounded-full bg-black text-white text-[9px] font-black uppercase tracking-widest">{userData?.role || 'User'}</span>
                                            <span className="px-4 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-400 text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-2">
                                                <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                                                Verified Node
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 1. PERSONAL & PROFESSIONAL */}
                    <div className={cardClasses}>
                        <div className="flex items-center gap-4 mb-8 border-b border-zinc-50 pb-6">
                            <div className="p-3 rounded-2xl bg-zinc-50 text-black border border-zinc-100">
                                <FiBriefcase className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-black tracking-tight">Professional Role</h3>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Official Credentials</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className={labelClasses}>Job Title</label>
                                    {isEditing ? (
                                        <input type="text" value={formData.job} onChange={(e) => handleInputChange('job', e.target.value)} className={inputClasses} placeholder="Job Title" />
                                    ) : (
                                        <div className="text-sm font-bold text-black px-1">{formData.job || 'Not Declared'}</div>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <label className={labelClasses}>Company</label>
                                    {isEditing ? (
                                        <input type="text" value={formData.company} onChange={(e) => handleInputChange('company', e.target.value)} className={inputClasses} placeholder="Company Name" />
                                    ) : (
                                        <div className="text-sm font-bold text-black px-1">{formData.company || 'Not Declared'}</div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className={labelClasses}>Business Category (Industry)</label>
                                {isEditing ? (
                                    <select 
                                        value={formData.businessRole} 
                                        onChange={(e) => handleInputChange('businessRole', e.target.value)} 
                                        className={`${inputClasses} appearance-none`}
                                    >
                                        <option value="">Select Industry</option>
                                        {['Business', 'Luxury', 'Technology', 'Agency', 'Healthcare', 'Automotive', 'Real Estate', 'Legal', 'Hospitality', 'Fitness', 'Construction', 'Beauty', 'Creator', 'Service'].map(role => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <div className="flex items-center gap-2 px-1">
                                        <span className="text-sm font-bold text-black">{formData.businessRole || 'General Identity'}</span>
                                        {formData.businessRole && (
                                            <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-[8px] font-black uppercase text-zinc-400 tracking-tighter">Verified Category</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 2. CONTACT DETAILS */}
                    <div className={cardClasses}>
                        <div className="flex items-center gap-4 mb-8 border-b border-zinc-50 pb-6">
                            <div className="p-3 rounded-2xl bg-zinc-50 text-black border border-zinc-100">
                                <FiMail className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-black tracking-tight">Direct Channels</h3>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Communication Nodes</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-1">
                                <label className={labelClasses}>Identity Email</label>
                                {isEditing ? (
                                    <input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className={inputClasses} placeholder="Email Address" />
                                ) : (
                                    <div className="text-sm font-bold text-black px-1">{formData.email || 'No Email Set'}</div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <label className={labelClasses}>Authorized Phone</label>
                                {isEditing ? (
                                    <input type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className={inputClasses} placeholder="Phone Number" />
                                ) : (
                                    <div className="text-sm font-bold text-black px-1">{formData.phone || 'Inactive Node'}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 3. LOCATION */}
                    <div className={cardClasses}>
                        <div className="flex items-center gap-4 mb-8 border-b border-zinc-50 pb-6">
                            <div className="p-3 rounded-2xl bg-zinc-50 text-black border border-zinc-100">
                                <FiMapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-black tracking-tight">Regional Hub</h3>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Geographic Access</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-1">
                                <label className={labelClasses}>Country</label>
                                {isEditing ? (
                                    <select value={formData.countryCode} onChange={handleCountryChange} className={`${inputClasses} appearance-none`}>
                                        <option value="">Country</option>
                                        {locationData.countries.map(c => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
                                    </select>
                                ) : (
                                    <div className="text-sm font-bold text-black px-1">{formData.country || '—'}</div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <label className={labelClasses}>State</label>
                                {isEditing ? (
                                    <select value={formData.stateCode} onChange={handleStateChange} disabled={!formData.countryCode} className={`${inputClasses} appearance-none`}>
                                        <option value="">State</option>
                                        {locationData.states.map(s => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}
                                    </select>
                                ) : (
                                    <div className="text-sm font-bold text-black px-1">{formData.state || '—'}</div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <label className={labelClasses}>City</label>
                                {isEditing ? (
                                    <select value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} disabled={!formData.stateCode} className={`${inputClasses} appearance-none`}>
                                        <option value="">City</option>
                                        {locationData.cities.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                                    </select>
                                ) : (
                                    <div className="text-sm font-bold text-black px-1">{formData.city || '—'}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* MANIFESTO (Bio) */}
                    <div className={cardClasses}>
                        <div className="flex items-center gap-4 mb-8 border-b border-zinc-50 pb-6">
                            <div className="p-3 rounded-2xl bg-zinc-50 text-black border border-zinc-100">
                                <FiActivity className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-black tracking-tight">Identity Manifesto</h3>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Professional Narrative</p>
                            </div>
                        </div>
                        {isEditing ? (
                            <textarea rows={4} value={formData.bio} onChange={(e) => handleInputChange('bio', e.target.value)} className={`${inputClasses} resize-none min-h-[120px] leading-relaxed`} placeholder="Define your manifesto..." />
                        ) : (
                            <div className="text-sm font-bold text-black/60 leading-relaxed bg-zinc-50 p-6 rounded-2xl border border-zinc-100 italic">
                                "{formData?.bio || "No manifesto synchronized. The network awaits your narrative."}"
                            </div>
                        )}
                    </div>

                    {/* TEMPLATE RECOMMENDATIONS (DISCOVERY ALL 2) */}
                    <div className={cardClasses}>
                        <div className="flex items-center justify-between mb-8 border-b border-zinc-50 pb-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-black text-white shadow-lg">
                                    <FiLayout className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-black tracking-tight">Discovery: All 2</h3>
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Niche-Matched Templates</p>
                                </div>
                            </div>
                            <span className="px-4 py-2 rounded-xl bg-zinc-50 border border-zinc-100 text-[10px] font-black text-black uppercase tracking-widest">
                                Role: {formData.businessRole || 'General'}
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {(() => {
                                const matches = TEMPLATES.filter(t => t.category === formData.businessRole).slice(0, 2);
                                const defaults = TEMPLATES.slice(0, 2);
                                const displays = matches.length === 2 ? matches : defaults;

                                return displays.map(t => (
                                    <div key={t.id} className="group relative bg-zinc-50 rounded-[2rem] p-6 border border-zinc-100 transition-all hover:border-black/10 overflow-hidden">
                                        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${t.previewColor} opacity-5 blur-2xl group-hover:scale-150 transition-all duration-700`} />
                                        <div className="relative z-10 flex flex-col justify-between h-full">
                                            <div>
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="px-3 py-1 rounded-lg bg-white border border-zinc-200 text-[8px] font-black uppercase text-zinc-400 tracking-widest">{t.category}</span>
                                                    <div className={`w-3 h-3 rounded-full ${t.previewColor} shadow-lg`} />
                                                </div>
                                                <h4 className="text-lg font-black text-black tracking-tight mb-2 uppercase">{t.name}</h4>
                                                <p className="text-xs font-bold text-zinc-400 leading-relaxed mb-6">{t.description}</p>
                                            </div>
                                            <button 
                                                onClick={() => navigate(`/user/templates`)}
                                                className="w-full py-3.5 rounded-xl bg-white border border-zinc-200 text-black font-black text-[9px] uppercase tracking-widest hover:bg-black hover:text-white hover:border-black transition-all"
                                            >
                                                Preview Blueprint
                                            </button>
                                        </div>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>

                    {/* 4. DIGITAL ECOSYSTEM */}
                    <div className={cardClasses}>
                        <div className="flex items-center gap-4 mb-10 border-b border-zinc-50 pb-8">
                            <div className="p-3 rounded-2xl bg-zinc-950 text-white shadow-lg">
                                <FiGlobe className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-black tracking-tight">Digital Ecosystem</h3>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Global Network Distribution</p>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="max-w-2xl">
                                <label className={labelClasses}>Primary Network Hub (Website)</label>
                                {isEditing ? (
                                    <div className="relative">
                                        <FiGlobe className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300 pointer-events-none" />
                                        <input type="text" value={formData.website} onChange={(e) => handleInputChange('website', e.target.value)} className={`${inputClasses} pl-12`} placeholder="www.yourhub.com" />
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-4 group cursor-pointer">
                                        <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-black group-hover:text-white transition-all">
                                            <FiGlobe size={20} />
                                        </div>
                                        <span className="text-sm font-black text-black group-hover:translate-x-2 transition-all">{formData.website || 'Hub Offline'}</span>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10">
                                {[
                                    { id: 'linkedin', icon: FiLinkedin, color: 'text-blue-600', bg: 'bg-blue-50' },
                                    { id: 'instagram', icon: FiInstagram, color: 'text-rose-500', bg: 'bg-rose-50' },
                                    { id: 'twitter', icon: FiTwitter, color: 'text-sky-500', bg: 'bg-sky-50' },
                                    { id: 'youtube', icon: FiYoutube, color: 'text-red-500', bg: 'bg-red-50' },
                                    { id: 'tiktok', icon: FiVideo, color: 'text-black', bg: 'bg-zinc-100' },
                                    { id: 'whatsapp', icon: FiPhone, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                                    { id: 'telegram', icon: FiSend, color: 'text-sky-500', bg: 'bg-sky-50' },
                                    { id: 'discord', icon: FiMessageSquare, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                                    { id: 'paypal', icon: FiCreditCard, color: 'text-blue-700', bg: 'bg-blue-50' },
                                    { id: 'venmo', icon: FiCreditCard, color: 'text-sky-600', bg: 'bg-sky-50' },
                                    { id: 'cashapp', icon: FiDollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' }
                                ].map((node) => (
                                    <div key={node.id} className="space-y-4">
                                        <label className={labelClasses}>{node.id}</label>
                                        {isEditing ? (
                                            <div className="relative">
                                                <node.icon className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300 pointer-events-none" />
                                                <input type="text" value={formData[node.id] || ''} onChange={(e) => handleInputChange(node.id, e.target.value)} className={`${inputClasses} pl-12 text-xs`} placeholder={`Define ${node.id}...`} />
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg ${node.bg} ${node.color} flex items-center justify-center`}>
                                                    <node.icon size={14} />
                                                </div>
                                                <span className="text-[11px] font-bold text-black truncate max-w-[120px]">{formData?.[node.id] || 'Inactive'}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* DANGER ZONE (MODERN TERMINATION) */}
                    <div className="pt-10 border-t border-zinc-100">
                        <div className="max-w-md mx-auto bg-red-50 rounded-[2rem] p-10 border border-red-100 flex flex-col items-center text-center">
                            <h4 className="text-xl font-black text-red-600 tracking-tight mb-2">Authority Terminal</h4>
                            <p className="text-xs font-bold text-red-400 leading-relaxed mb-8">Termination of this operational node will purge all global identity syncs.</p>
                            <button onClick={handleLogout} className="w-full py-4 rounded-xl bg-red-500 text-white font-black text-[10px] uppercase tracking-widest hover:brightness-110 shadow-lg transition-all">
                                Terminate Node Session
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
