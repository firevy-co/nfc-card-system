import React, { useState, useEffect } from 'react';
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
import Layout from '../layout/layout';
import toast from 'react-hot-toast';

const Profile = ({ userData }) => {
    const navigate = useNavigate();
    const user = auth.currentUser;
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
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
        bio: "",
        profileImage: "",
        profileImageType: "file"
    });

    const [locationData, setLocationData] = useState({
        countries: Country.getAllCountries(),
        states: [],
        cities: [],
    });

    useEffect(() => {
        if (userData && !isEditing) {
            setFormData((prev) => ({
                ...prev,
                ...userData,
                displayName: userData.displayName || user?.displayName || "",
                logoType: userData.logoType || 'file',
                profileImageType: userData.profileImageType || 'file'
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
            <div className="w-full max-w-8xl mx-auto font-['Mulish'] bg-white min-h-screen rounded-t-[4rem]">

                {/* --- PREMIUM SOCIAL BANNER HEADER --- */}
                <div className="relative mb-32">
                    <div
                        className="h-64 md:h-80 w-full rounded-t-[4rem] relative overflow-hidden shadow-inner"
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

                    <div className="absolute -bottom-24 left-12 md:left-20 flex flex-col md:flex-row items-end gap-10">
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

                <div className="px-10 py-20">
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

                <div className="mt-32 border-t border-gray-100 pt-20 flex flex-col items-center text-center">
                    <div className="max-w-md bg-red-50/50 p-10 rounded-[3rem] border border-red-100/50">
                        <h4 className="text-xl font-black text-red-600 mb-2">Authority Terminal</h4>
                        <p className="text-xs font-bold text-red-400 leading-relaxed mb-8">Termination of this session will de-synchronize your current cloud access.</p>
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
