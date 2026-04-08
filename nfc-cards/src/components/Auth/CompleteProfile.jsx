import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { auth } from '../../firebase.config';
import Layout from '../layout/layout';
import { Country, State, City } from 'country-state-city';
import { FiBriefcase, FiMapPin, FiGlobe, FiPhone, FiMail, FiCheck } from 'react-icons/fi';

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

    // ADIM LOCK: Admins have no business here
    if (isAdmin) {
        return <Navigate to="/admin/analytics" />;
    }

    const inputClasses = "w-full px-6 py-4 rounded-2xl bg-muted/30 border border-border text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium shadow-inner placeholder:text-muted-foreground/30";

    return (
        <Layout userData={userData} title="Identity Setup" hideSidebar={true}>
            <div className="max-w-4xl mx-auto py-12 px-6">
                <header className="mb-14 text-center">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                        <FiGlobe className="text-primary animate-pulse" />
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Network Onboarding</span>
                    </div>
                    <h2 className="text-4xl font-black text-foreground tracking-tight uppercase font-['Outfit'] mb-4">Complete Your Identity</h2>
                    <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-xl mx-auto opacity-70">
                        Architect your professional presence within the Firevy network. These details will form your core digital node.
                    </p>
                </header>

                <form onSubmit={handleUpdate} className="space-y-10">
                    {/* Section 1: Core Credentials */}
                    <div className="bg-card border border-border p-10 rounded-[2.5rem] shadow-premium space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full"></div>
                        <div className="flex items-center gap-3 mb-2">
                             <FiBriefcase className="text-primary" />
                             <h3 className="text-xl font-black text-foreground uppercase tracking-tight font-['Outfit']">Core Credentials</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Organization Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.companyName || ''}
                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    placeholder="ACME CORP INDUSTRIES"
                                    className={inputClasses}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Business Designation</label>
                                <input
                                    type="text"
                                    value={formData.businessName || ''}
                                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                    placeholder="ACME DIGITAL SOLUTIONS"
                                    className={inputClasses}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Contact Protocol (Mobile)</label>
                                <div className="relative">
                                    <FiPhone className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground opacity-40" />
                                    <input
                                        type="tel"
                                        required
                                        value={formData.mobileNumber || ''}
                                        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                                        placeholder="+1 (555) 000-0000"
                                        className={`${inputClasses} pl-14`}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Operational Email</label>
                                <div className="relative">
                                    <FiMail className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground opacity-40" />
                                    <input
                                        type="email"
                                        required
                                        value={formData.omailAddress || ''}
                                        onChange={(e) => setFormData({ ...formData, omailAddress: e.target.value })}
                                        placeholder="ops@acme.hub"
                                        className={`${inputClasses} pl-14`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Geographic Parameters */}
                    <div className="bg-card border border-border p-10 rounded-[2.5rem] shadow-premium space-y-8 relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-2">
                             <FiMapPin className="text-primary" />
                             <h3 className="text-xl font-black text-foreground uppercase tracking-tight font-['Outfit']">Geographic Parameters</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Country</label>
                                <select
                                    required
                                    value={formData.countryCode || ''}
                                    onChange={handleCountryChange}
                                    className={`${inputClasses} appearance-none cursor-pointer`}
                                >
                                    <option value="" className="bg-card">Select Identity</option>
                                    {locationData.countries.map(c => <option key={c.isoCode} value={c.isoCode} className="bg-card">{c.name}</option>)}
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Region / State</label>
                                <select
                                    required
                                    value={formData.stateCode || ''}
                                    onChange={handleStateChange}
                                    disabled={!formData.countryCode}
                                    className={`${inputClasses} appearance-none cursor-pointer disabled:opacity-40`}
                                >
                                    <option value="" className="bg-card">Select Region</option>
                                    {locationData.states.map(s => <option key={s.isoCode} value={s.isoCode} className="bg-card">{s.name}</option>)}
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">City Hub</label>
                                <select
                                    required
                                    value={formData.city || ''}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    disabled={!formData.stateCode}
                                    className={`${inputClasses} appearance-none cursor-pointer disabled:opacity-40`}
                                >
                                    <option value="" className="bg-card">Select City</option>
                                    {locationData.cities.map(c => <option key={c.name} value={c.name} className="bg-card">{c.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Digital Handles */}
                    <div className="bg-card border border-border p-10 rounded-[2.5rem] shadow-premium space-y-8">
                        <div className="flex items-center gap-3 mb-2">
                             <FiGlobe className="text-primary" />
                             <h3 className="text-xl font-black text-foreground uppercase tracking-tight font-['Outfit']">Digital Handles</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           {['Website', 'LinkedIn', 'GitHub', 'Instagram', 'Twitter', 'Facebook'].map((field) => (
                               <div key={field} className="space-y-3">
                                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">{field}</label>
                                   <input
                                       type="text"
                                       value={formData[field.toLowerCase()] || ''}
                                       onChange={(e) => setFormData({ ...formData, [field.toLowerCase()]: e.target.value })}
                                       placeholder={`PROTOCOL // ${field.toUpperCase()}`}
                                       className={inputClasses}
                                   />
                               </div>
                           ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-8 pt-6">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-all"
                        >Discard Draft</button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-14 py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center gap-3"
                        >
                            {loading ? 'Synchronizing...' : (
                                <>
                                    <FiCheck size={18} />
                                    Synchronize Identity
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default CompleteProfile;
