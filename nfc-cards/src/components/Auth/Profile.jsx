import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase.config';
import { signOut, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { FiActivity, FiBriefcase, FiMail, FiPhone, FiGlobe, FiLinkedin, FiInstagram, FiTwitter, FiFacebook, FiMapPin, FiSave, FiX, FiEdit3 } from 'react-icons/fi';
import { Country, State, City } from "country-state-city";
import Layout from '../layout/layout';
import toast from 'react-hot-toast';

const Profile = ({ userData }) => {
    const user = auth.currentUser;
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        displayName: "",
        companyName: "",
        businessName: "",
        omailAddress: "",
        mobileNumber: "",
        country: "",
        countryCode: "",
        state: "",
        stateCode: "",
        city: "",
        website: "",
        linkedin: "",
        instagram: "",
        twitter: "",
        facebook: "",
        bio: ""
    });

    const [locationData, setLocationData] = useState({
        countries: Country.getAllCountries(),
        states: [],
        cities: [],
    });

    // Synchronize local form state with global user data
    useEffect(() => {
        if (userData) {
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
        }
    }, [userData, isEditing]);

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

    // SHARED STYLES - FORCED WHITE BACKGROUNDS FOR EVERYTHING (DARK SESSION REQUIREMENT)
    const cardClasses = `bg-white dark:bg-white border border-slate-100 dark:border-slate-100 rounded-[2.5rem] p-6 md:p-8 shadow-xl relative overflow-hidden transition-all duration-500`;
    const inputClasses = `w-full bg-slate-50/50 dark:bg-slate-50/50 border border-slate-200/60 dark:border-slate-200/60 rounded-xl px-5 py-3.5 text-sm font-bold text-foreground dark:text-black outline-none focus:ring-4 focus:ring-[#7BB9D4]/10 transition-all placeholder:opacity-30`;
    const labelClasses = `text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2 block px-1 dark:text-black/60`;

    return (
        <Layout userData={userData}>
            <div className="w-full mb-20 space-y-8 animate-in fade-in duration-1000">
                {/* Hub Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-black/[0.05] dark:border-black/[0.1] pb-8">
                    <div className="space-y-1">
                        <h2 className="text-4xl font-black text-foreground dark:text-black tracking-tighter">Profile Identity</h2>
                        <p className="text-muted-foreground font-bold tracking-tight text-sm opacity-50 dark:text-black/40">Manage your comprehensive digital identity with 1:1 onboarding synchronization.</p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        {isEditing ? (
                            <div className="flex gap-3 w-full">
                                <button onClick={() => setIsEditing(false)} className="flex-1 md:flex-none px-8 py-3.5 rounded-xl bg-black/5 dark:bg-black/5 border border-black/10 dark:border-black/10 text-foreground dark:text-black font-black text-[10px] uppercase tracking-widest hover:bg-black/10 transition-all">
                                    Discard
                                </button>
                                <button onClick={handleSave} className={`flex-1 md:flex-none px-10 py-3.5 rounded-xl bg-[#7BB9D4] text-white font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] shadow-xl shadow-[#7BB9D4]/30 transition-all`}>
                                    Sync Profile
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className={`w-full md:w-auto px-10 py-3.5 rounded-xl bg-[#7BB9D4] text-white font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] shadow-xl shadow-[#7BB9D4]/30 transition-all`}>
                                Adjust Credentials
                            </button>
                        )}
                    </div>
                </header>

                <div className="space-y-8">
                    {/* AVATAR & PRIMARY INFO */}
                    <div className={cardClasses}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7BB9D4]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                            <img src={userData?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData?.displayName || 'User'}`} className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-white shadow-xl" alt="Identity" />
                            <div className="flex-1 space-y-4 w-full text-center md:text-left">
                                {isEditing ? (
                                    <div className="space-y-1">
                                        <label className={labelClasses}>Full Identity Name</label>
                                        <input type="text" value={formData.displayName} onChange={(e) => handleInputChange('displayName', e.target.value)} className={inputClasses} placeholder="Full Name" />
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <h3 className="text-3xl font-black text-foreground dark:text-black tracking-tighter capitalize leading-tight">{userData?.displayName || 'Authorized Member'}</h3>
                                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                                            <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[9px] font-black uppercase tracking-widest">{userData?.role || 'Field User'}</span>
                                            <span className="px-4 py-1.5 rounded-full bg-black/5 dark:bg-black/5 border border-black/5 dark:border-black/10 text-muted-foreground dark:text-black/40 text-[9px] font-black uppercase tracking-widest">Node: {user?.uid?.slice(0, 10)}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 1. PERSONAL & PROFESSIONAL */}
                    <div className={cardClasses}>
                        <div className="flex items-center gap-4 mb-6 border-b border-black/[0.03] dark:border-black/[0.05] pb-4">
                            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                                <FiBriefcase className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-black text-foreground dark:text-black tracking-tight">Personal & Professional</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-1">
                                <label className={labelClasses}>Company Name</label>
                                {isEditing ? (
                                    <input type="text" value={formData.companyName} onChange={(e) => handleInputChange('companyName', e.target.value)} className={inputClasses} placeholder="Company Name" />
                                ) : (
                                    <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-50/50 rounded-xl font-bold border border-slate-200/60 dark:border-slate-200/60 text-sm tracking-tight dark:text-black">{userData?.companyName || 'Not Declared'}</div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <label className={labelClasses}>Business Role</label>
                                {isEditing ? (
                                    <input type="text" value={formData.businessName} onChange={(e) => handleInputChange('businessName', e.target.value)} className={inputClasses} placeholder="Business Role" />
                                ) : (
                                    <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-50/50 rounded-xl font-bold border border-slate-200/60 dark:border-slate-200/60 text-sm tracking-tight dark:text-black">{userData?.businessName || 'Not Declared'}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 2. CONTACT DETAILS */}
                    <div className={cardClasses}>
                        <div className="flex items-center gap-4 mb-6 border-b border-black/[0.03] dark:border-black/[0.05] pb-4">
                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                                <FiMail className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-black text-foreground dark:text-black tracking-tight">Contact Details</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-1">
                                <label className={labelClasses}>Email Address</label>
                                {isEditing ? (
                                    <input type="email" value={formData.omailAddress} onChange={(e) => handleInputChange('omailAddress', e.target.value)} className={inputClasses} placeholder="Email Address" />
                                ) : (
                                    <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-50/50 rounded-xl font-bold border border-slate-200/60 dark:border-slate-200/60 text-sm tracking-tight dark:text-black">{userData?.omailAddress || userData?.email}</div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <label className={labelClasses}>Mobile Number</label>
                                {isEditing ? (
                                    <input type="tel" value={formData.mobileNumber} onChange={(e) => handleInputChange('mobileNumber', e.target.value)} className={inputClasses} placeholder="Mobile Number" />
                                ) : (
                                    <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-50/50 rounded-xl font-bold border border-slate-200/60 dark:border-slate-200/60 text-sm tracking-tight dark:text-black">{userData?.mobileNumber || 'Link Inactive'}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 3. LOCATION */}
                    <div className={cardClasses}>
                        <div className="flex items-center gap-4 mb-6 border-b border-black/[0.03] dark:border-black/[0.05] pb-4">
                            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                                <FiMapPin className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-black text-foreground dark:text-black tracking-tight">Location</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-1">
                                <label className={labelClasses}>Country</label>
                                {isEditing ? (
                                    <select value={formData.countryCode} onChange={handleCountryChange} className={`${inputClasses} px-4 appearance-none`}>
                                        <option value="">Country</option>
                                        {locationData.countries.map(c => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
                                    </select>
                                ) : (
                                    <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-50/50 rounded-xl font-bold border border-slate-200/60 dark:border-slate-200/60 text-center text-sm dark:text-black">{userData?.country || '—'}</div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <label className={labelClasses}>State</label>
                                {isEditing ? (
                                    <select value={formData.stateCode} onChange={handleStateChange} disabled={!formData.countryCode} className={`${inputClasses} px-4 appearance-none`}>
                                        <option value="">State</option>
                                        {locationData.states.map(s => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}
                                    </select>
                                ) : (
                                    <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-50/50 rounded-xl font-bold border border-slate-200/60 dark:border-slate-200/60 text-center text-sm dark:text-black">{userData?.state || '—'}</div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <label className={labelClasses}>City</label>
                                {isEditing ? (
                                    <select value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} disabled={!formData.stateCode} className={`${inputClasses} px-4 appearance-none`}>
                                        <option value="">City</option>
                                        {locationData.cities.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                                    </select>
                                ) : (
                                    <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-50/50 rounded-xl font-bold border border-slate-200/60 dark:border-slate-200/60 text-center text-sm dark:text-black">{userData?.city || '—'}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 4. DIGITAL ECOSYSTEM */}
                    <div className={cardClasses}>
                        <div className="flex items-center gap-4 mb-6 border-b border-black/[0.03] dark:border-black/[0.05] pb-4">
                            <div className="p-2 rounded-lg bg-[#7BB9D4]/10 text-[#7BB9D4]">
                                <FiActivity className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-black text-foreground dark:text-black tracking-tight">Digital Ecosystem</h3>
                        </div>
                        <div className="space-y-8">
                            <div className="space-y-1">
                                <label className={labelClasses}>Website URL</label>
                                {isEditing ? (
                                    <div className="relative">
                                        <FiGlobe className="absolute left-5 top-4 opacity-30 text-[#7BB9D4]" />
                                        <input type="text" value={formData.website} onChange={(e) => handleInputChange('website', e.target.value)} className={`${inputClasses} pl-12`} placeholder="Website URL" />
                                    </div>
                                ) : (
                                    <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-50/50 rounded-xl font-bold border border-slate-200/60 dark:border-slate-200/60 flex items-center gap-4 text-sm transition-all hover:border-[#7BB9D4]/40 dark:text-black">
                                        <FiGlobe className="opacity-40 text-[#7BB9D4]" />
                                        <span>{userData?.website || 'Inactive Node'}</span>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { id: 'linkedin', icon: FiLinkedin, color: 'text-blue-600', bg: 'bg-blue-500/10' },
                                    { id: 'instagram', icon: FiInstagram, color: 'text-rose-500', bg: 'bg-rose-500/10' },
                                    { id: 'twitter', icon: FiTwitter, color: 'text-sky-400', bg: 'bg-sky-400/10' },
                                    { id: 'facebook', icon: FiFacebook, color: 'text-indigo-600', bg: 'bg-indigo-600/10' }
                                ].map((node) => (
                                    <div key={node.id} className="space-y-1">
                                        <label className={labelClasses}>{node.id}</label>
                                        {isEditing ? (
                                            <div className="relative">
                                                <node.icon className="absolute left-5 top-4 opacity-30" />
                                                <input type="text" value={formData[node.id] || ''} onChange={(e) => handleInputChange(node.id, e.target.value)} className={`${inputClasses} pl-12`} placeholder={node.id.charAt(0).toUpperCase() + node.id.slice(1)} />
                                            </div>
                                        ) : (
                                            <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-50/50 rounded-xl font-bold border border-slate-200/60 dark:border-slate-200/60 flex items-center gap-3 tracking-tight text-xs transition-all hover:border-[#7BB9D4]/40 dark:text-black">
                                                <div className={`p-1.5 rounded-md ${node.bg} ${node.color}`}>
                                                    <node.icon className="w-3.5 h-3.5" />
                                                </div>
                                                <span className="truncate">{userData?.[node.id] || 'Inactive'}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* MANIFESTO & ACCESS */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
                        <div className={cardClasses}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500">
                                    <FiActivity className="w-4 h-4" />
                                </div>
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 block dark:text-black/60">Identity Manifesto (Bio)</label>
                            </div>
                            {isEditing ? (
                                <textarea rows={4} value={formData.bio} onChange={(e) => handleInputChange('bio', e.target.value)} className={`${inputClasses} resize-none min-h-[140px] leading-relaxed mt-1`} placeholder="Define your professional narrative..." />
                            ) : (
                                <div className="px-8 py-6 bg-slate-50/50 dark:bg-slate-50/50 rounded-3xl border border-slate-200/60 dark:border-slate-200/60 text-base font-bold leading-relaxed text-foreground dark:text-black/80 min-h-[140px] mt-1 shadow-inner flex items-center">
                                    {userData?.bio || "Synchronize your manifesto to stabilize network core identity."}
                                </div>
                            )}
                        </div>

                        <div className="bg-rose-500/[0.02] dark:bg-rose-500/[0.01] border border-rose-500/10 rounded-[2.5rem] p-10 flex flex-col justify-between shadow-xl relative overflow-hidden group">
                             <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-rose-500/10 rounded-full blur-[60px] group-hover:scale-150 transition-all duration-1000" />
                             <div className="relative z-10 space-y-4">
                                <h4 className="text-2xl font-black text-rose-500 tracking-tight">Authority Terminal</h4>
                                <p className="text-sm font-bold text-rose-500/60 leading-relaxed max-w-sm opacity-60">Flush local secure authority nodes and terminate the global identity broadcast.</p>
                                <button onClick={handleLogout} className="w-full py-5 rounded-xl bg-rose-500 text-white font-black text-xs uppercase tracking-widest hover:brightness-110 shadow-2xl shadow-rose-500/20 transition-all mt-6">
                                    Deauthorize Portal
                                </button>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
