import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { auth } from '../../firebase.config';
import Layout from '../layout/layout';
import { Country, State, City } from 'country-state-city';

const CompleteProfile = ({ userData }) => {
    const isAdmin = userData?.role === 'Admin';
    const navigate = useNavigate();

    // Form States
    const [formData, setFormData] = useState({
        companyName: '',
        businessName: '',
        omailAddress: '',
        mobileNumber: '',
        country: '',
        countryCode: '',
        state: '',
        stateCode: '',
        city: '',
        website: '',
        linkedin: '',
        github: '',
        instagram: '',
        twitter: '',
        facebook: ''
    });

    const [locationData, setLocationData] = useState({
        countries: Country.getAllCountries(),
        states: [],
        cities: []
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userData) {
            setFormData(prev => ({ ...prev, ...userData }));
            // Pre-seed location lists if existing data exists
            if (userData.countryCode) {
                const s = State.getStatesOfCountry(userData.countryCode);
                setLocationData(prev => ({ ...prev, states: s }));
                if (userData.stateCode) {
                    setLocationData(prev => ({ ...prev, cities: City.getCitiesOfState(userData.countryCode, userData.stateCode) }));
                }
            }
        }
    }, [userData]);

    const handleCountryChange = (e) => {
        const country = locationData.countries.find(c => c.isoCode === e.target.value);
        const states = State.getStatesOfCountry(e.target.value);
        setFormData({ ...formData, country: country ? country.name : '', countryCode: e.target.value, state: '', stateCode: '', city: '' });
        setLocationData({ ...locationData, states, cities: [] });
    };

    const handleStateChange = (e) => {
        const state = locationData.states.find(s => s.isoCode === e.target.value);
        const cities = City.getCitiesOfState(formData.countryCode, e.target.value);
        setFormData({ ...formData, state: state ? state.name : '', stateCode: e.target.value, city: '' });
        setLocationData({ ...locationData, cities });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:4000/api/users/onboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    uid: auth.currentUser.uid,
                    ...formData
                })
            });

            if (response.ok) {
                console.log("[IDENTITY]: Profile synchronized via Backend Pipeline.");
                navigate(isAdmin ? '/admin/analytics' : '/user/home');
            } else {
                throw new Error("API Handshake Failure");
            }
        } catch (error) {
            console.error("Profile Sync Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const FormContent = (
        <div className="max-w-[1400px] mx-auto py-10 px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Header Header */}
            <header className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full">Identity Setup</span>
                </div>
                <h2 className="text-3xl font-black text-foreground tracking-tight mb-3">Organization Profile</h2>
                <p className="text-muted-foreground text-xs font-medium leading-relaxed max-w-3xl opacity-70 italic font-sans italic">
                    Customize your organization's presence across our platform. Ensure your contact details and digital handles are up to date for better networking.
                </p>
            </header>

            <form onSubmit={handleUpdate} className="space-y-4">
                {/* Section 1: Organization Information */}
                <div className="bg-card border border-border/40 rounded-xl p-4 shadow-sm space-y-4">
                    <h3 className="text-md font-bold text-foreground">Organization Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Company Name</label>
                            <input
                                type="text"
                                value={formData.companyName || ''}
                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                placeholder="e.g. Acme Corp Industries"
                                className="w-full bg-transparent border-b border-border py-4 px-2 text-foreground focus:outline-none focus:border-blue-600 transition-colors placeholder:text-muted-foreground/30 font-medium"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Business Name</label>
                            <input
                                type="text"
                                value={formData.businessName || ''}
                                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                placeholder="e.g. Acme Digital"
                                className="w-full bg-transparent border-b border-border py-4 px-2 text-foreground focus:outline-none focus:border-blue-600 transition-colors placeholder:text-muted-foreground/30 font-medium"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 2: Contact Details */}
                <div className="bg-card border border-border/40 rounded-xl p-4 shadow-sm space-y-4">
                    <h3 className="text-md font-bold text-foreground">Contact Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">OMail Address</label>
                            <input
                                type="email"
                                value={formData.omailAddress || ''}
                                onChange={(e) => setFormData({ ...formData, omailAddress: e.target.value })}
                                placeholder="contact@gmail.com"
                                className="w-full bg-transparent border-b border-border py-4 px-2 text-foreground focus:outline-none focus:border-blue-600 transition-colors placeholder:text-muted-foreground/30 font-medium"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Mobile Number</label>
                            <input
                                type="tel"
                                value={formData.mobileNumber || ''}
                                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                                placeholder="+1 (555) 000-0000"
                                className="w-full bg-transparent border-b border-border py-4 px-2 text-foreground focus:outline-none focus:border-blue-600 transition-colors placeholder:text-muted-foreground/30 font-medium"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 3: Location Details */}
                <div className="bg-card border border-border/40 rounded-xl p-4 shadow-sm space-y-4">
                    <h3 className="text-md font-bold text-foreground">Location Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Country</label>
                            <select
                                value={formData.countryCode || ''}
                                onChange={handleCountryChange}
                                className="w-full bg-transparent border-b border-border py-4 px-2 text-foreground focus:outline-none focus:border-blue-600 transition-colors appearance-none cursor-pointer font-medium"
                            >
                                <option value="" className="bg-background">Select Country</option>
                                {locationData.countries.map(c => <option key={c.isoCode} value={c.isoCode} className="bg-background">{c.name}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">State</label>
                            <select
                                value={formData.stateCode || ''}
                                onChange={handleStateChange}
                                disabled={!formData.countryCode}
                                className="w-full bg-transparent border-b border-border py-4 px-2 text-foreground focus:outline-none focus:border-blue-600 transition-colors appearance-none cursor-pointer font-medium disabled:opacity-50"
                            >
                                <option value="" className="bg-background">Select State</option>
                                {locationData.states.map(s => <option key={s.isoCode} value={s.isoCode} className="bg-background">{s.name}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">City</label>
                            <select
                                value={formData.city || ''}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                disabled={!formData.stateCode}
                                className="w-full bg-transparent border-b border-border py-4 px-2 text-foreground focus:outline-none focus:border-blue-600 transition-colors appearance-none cursor-pointer font-medium disabled:opacity-50"
                            >
                                <option value="" className="bg-background">Select City</option>
                                {locationData.cities.map(c => <option key={c.name} value={c.name} className="bg-background">{c.name}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Section 4: Digital Presence */}
                <div className="bg-card border border-border/40 rounded-xl p-4 shadow-sm space-y-4">
                    <h3 className="text-md font-bold text-foreground">Digital Presence</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Website Link</label>
                            <input
                                type="url"
                                value={formData.website || ''}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                placeholder="https://www.yourwebsite.com"
                                className="w-full bg-transparent border-b border-border py-4 px-2 text-foreground focus:outline-none focus:border-blue-600 transition-colors placeholder:text-muted-foreground/30 font-medium"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">LinkedIn</label>
                            <input
                                type="text"
                                value={formData.linkedin || ''}
                                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                placeholder="linkedin.com/company/acme"
                                className="w-full bg-transparent border-b border-border py-4 px-2 text-foreground focus:outline-none focus:border-blue-600 transition-colors placeholder:text-muted-foreground/30 font-medium"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">GitHub</label>
                            <input
                                type="text"
                                value={formData.github || ''}
                                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                placeholder="github.com/acmeorg"
                                className="w-full bg-transparent border-b border-border py-4 px-2 text-foreground focus:outline-none focus:border-blue-600 transition-colors placeholder:text-muted-foreground/30 font-medium"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Instagram</label>
                            <input
                                type="text"
                                value={formData.instagram || ''}
                                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                                placeholder="@acme_corp"
                                className="w-full bg-transparent border-b border-border py-4 px-2 text-foreground focus:outline-none focus:border-blue-600 transition-colors placeholder:text-muted-foreground/30 font-medium"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Twitter / X</label>
                            <input
                                type="text"
                                value={formData.twitter || ''}
                                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                                placeholder="@acmex"
                                className="w-full bg-transparent border-b border-border py-4 px-2 text-foreground focus:outline-none focus:border-blue-600 transition-colors placeholder:text-muted-foreground/30 font-medium"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Facebook</label>
                            <input
                                type="text"
                                value={formData.facebook || ''}
                                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                                placeholder="facebook.com/acme"
                                className="w-full bg-transparent border-b border-border py-4 px-2 text-foreground focus:outline-none focus:border-blue-600 transition-colors placeholder:text-muted-foreground/30 font-medium"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-10 pt-12">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                        Discard Changes
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-12 py-5 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Synchronizing...' : 'Add details'}
                    </button>
                </div>
            </form>
        </div>
    );

    // ADIM LOCK: Admins have no business here
    if (isAdmin) {
        return <Navigate to="/admin/analytics" />;
    }

    return (
        <div className="min-h-screen bg-[#FDFDFD] text-foreground">
            {FormContent}
        </div>
    );
};

export default CompleteProfile;
