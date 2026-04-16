import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import Layout from "../layout/layout";
import { Country, State, City } from "country-state-city";

import {
    FiMail,
    FiPhone,
    FiGlobe,
    FiLinkedin,
    FiInstagram,
    FiTwitter,
    FiFacebook,
    FiBriefcase,
    FiArrowLeft
} from "react-icons/fi";

const CompleteProfile = ({ userData }) => {
    const navigate = useNavigate();
    const isAdmin = userData?.role === "Admin";

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
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
        github: "",
        instagram: "",
        twitter: "",
        facebook: "",
    });

    const [locationData, setLocationData] = useState({
        countries: Country.getAllCountries(),
        states: [],
        cities: [],
    });

    useEffect(() => {
        if (userData) {
            setFormData((prev) => ({ ...prev, ...userData }));

            if (userData.countryCode) {
                const states = State.getStatesOfCountry(userData.countryCode);

                setLocationData((prev) => ({
                    ...prev,
                    states,
                }));

                if (userData.stateCode) {
                    const cities = City.getCitiesOfState(
                        userData.countryCode,
                        userData.stateCode
                    );

                    setLocationData((prev) => ({
                        ...prev,
                        cities,
                    }));
                }
            }
        }
    }, [userData]);

    const handleCountryChange = (e) => {
        const countryCode = e.target.value;

        const country = locationData.countries.find(
            (c) => c.isoCode === countryCode
        );

        const states = State.getStatesOfCountry(countryCode);

        setFormData({
            ...formData,
            country: country ? country.name : "",
            countryCode,
            state: "",
            stateCode: "",
            city: "",
        });

        setLocationData({
            ...locationData,
            states,
            cities: [],
        });
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

        setLocationData({
            ...locationData,
            cities,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:4000/api/users/onboard",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        uid: userData.uid,
                        ...formData,
                    }),
                }
            );

            if (response.ok) {
                navigate("/user/home");
            } else {
                throw new Error("API error");
            }
        } catch (error) {
            console.error("Profile update error:", error);
        }

        setLoading(false);
    };

    if (isAdmin) {
        return <Navigate to="/admin/analytics" />;
    }

    const inputWithIcon =
        "w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-[#003636] border border-gray-100 dark:border-[#005a5a]/30 text-sm font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#7BB9D4] focus:border-[#7BB9D4]/50 transition-all";

    return (
        <Layout userData={userData} title="Complete Profile" hideSidebar={true}>
            <div className="max-w-3xl sm:max-w-7xl mx-auto py-12 px-6">
                <div className="mb-8">
                     <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-400 hover:text-[#7BB9D4] transition-colors font-bold group mb-4"
                     >
                        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] uppercase tracking-widest font-black">Back to Dashboard</span>
                     </button>
                     <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">Complete Your Profile</h2>
                     <p className="text-gray-500 mt-2 font-bold opacity-60 dark:text-white/40">Finalize your professional identity to activate your digital ecosystem.</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-[#004242] p-10 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 dark:shadow-none space-y-12 border border-gray-100 dark:border-[#005a5a]/30"
                >

                    {/* Personal Section */}

                    <div>

                        <div className="flex justify-between items-end mb-6 border-b border-gray-50 dark:border-white/5 pb-4">
                            <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-gray-900 dark:text-white">
                                Personal & Professional
                            </h3>
                            <span className="text-[9px] text-[#7BB9D4] font-black uppercase tracking-widest">
                                REQUIRED STAGE
                            </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div className="relative">
                                <FiBriefcase className="absolute left-4 top-3.5 text-[#7BB9D4] opacity-40" />
                                <input
                                    required
                                    type="text"
                                    value={formData.companyName}
                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    placeholder="Company Name"
                                    className={inputWithIcon}
                                />
                            </div>

                            <div className="relative">
                                <FiBriefcase className="absolute left-4 top-3.5 text-[#7BB9D4] opacity-40" />
                                <input
                                    type="text"
                                    value={formData.businessName}
                                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                    placeholder="Business Role"
                                    className={inputWithIcon}
                                />
                            </div>

                        </div>

                    </div>


                    {/* Contact */}

                    <div>

                        <div className="flex justify-between items-end mb-6 border-b border-gray-50 dark:border-white/5 pb-4">
                            <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-gray-900 dark:text-white">
                                Contact Details
                            </h3>
                            <span className="text-[9px] text-gray-400 dark:text-white/40 font-black uppercase tracking-widest">
                                GLOBAL NODES
                            </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div className="relative">
                                <FiMail className="absolute left-4 top-3.5 text-[#7BB9D4] opacity-40" />
                                <input
                                    required
                                    type="email"
                                    value={formData.omailAddress}
                                    onChange={(e) => setFormData({ ...formData, omailAddress: e.target.value })}
                                    placeholder="Email Address"
                                    className={inputWithIcon}
                                />
                            </div>

                            <div className="relative">
                                <FiPhone className="absolute left-4 top-3.5 text-[#7BB9D4] opacity-40" />
                                <input
                                    required
                                    type="tel"
                                    value={formData.mobileNumber}
                                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                                    placeholder="Mobile Number"
                                    className={inputWithIcon}
                                />
                            </div>

                        </div>

                    </div>


                    {/* Location */}

                    <div>

                        <div className="flex justify-between items-end mb-6 border-b border-gray-50 dark:border-white/5 pb-4">
                            <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-gray-900 dark:text-white">
                                Location
                            </h3>
                            <span className="text-[9px] text-gray-400 dark:text-white/40 font-black uppercase tracking-widest">
                                SPATIAL REGISTRY
                            </span>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">

                            <select
                                value={formData.countryCode}
                                onChange={handleCountryChange}
                                className="w-full px-5 py-3.5 rounded-xl bg-gray-50 dark:bg-[#003636] border border-gray-100 dark:border-[#005a5a]/30 text-sm font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#7BB9D4] appearance-none cursor-pointer transition-all"
                            >
                                <option value="">Country</option>
                                {locationData.countries.map((c) => (
                                    <option key={c.isoCode} value={c.isoCode}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={formData.stateCode}
                                onChange={handleStateChange}
                                disabled={!formData.countryCode}
                                className="w-full px-5 py-3.5 rounded-xl bg-gray-50 dark:bg-[#003636] border border-gray-100 dark:border-[#005a5a]/30 text-sm font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#7BB9D4] appearance-none disabled:opacity-40 cursor-pointer transition-all"
                            >
                                <option value="">State</option>
                                {locationData.states.map((s) => (
                                    <option key={s.isoCode} value={s.isoCode}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                disabled={!formData.stateCode}
                                className="w-full px-5 py-3.5 rounded-xl bg-gray-50 dark:bg-[#003636] border border-gray-100 dark:border-[#005a5a]/30 text-sm font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#7BB9D4] appearance-none disabled:opacity-40 cursor-pointer transition-all"
                            >
                                <option value="">City</option>
                                {locationData.cities.map((c) => (
                                    <option key={c.name}>{c.name}</option>
                                ))}
                            </select>

                        </div>

                    </div>


                    {/* Digital Ecosystem */}

                    <div>

                        <div className="flex justify-between items-end mb-6 border-b border-gray-50 dark:border-white/5 pb-4">
                            <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-gray-900 dark:text-white">
                                Digital Ecosystem
                            </h3>
                            <span className="text-[9px] text-gray-400 dark:text-white/40 font-black uppercase tracking-widest">
                                BROADCAST NODES
                            </span>
                        </div>

                        <div className="relative mb-6">
                            <FiGlobe className="absolute left-4 top-3.5 text-[#7BB9D4] opacity-40" />
                            <input
                                type="text"
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                placeholder="Website URL"
                                className={inputWithIcon}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div className="relative">
                                <FiLinkedin className="absolute left-4 top-3.5 text-[#7BB9D4] opacity-40" />
                                <input
                                    type="text"
                                    value={formData.linkedin}
                                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                    placeholder="LinkedIn"
                                    className={inputWithIcon}
                                />
                            </div>

                            <div className="relative">
                                <FiInstagram className="absolute left-4 top-3.5 text-[#7BB9D4] opacity-40" />
                                <input
                                    type="text"
                                    value={formData.instagram}
                                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                                    placeholder="Instagram"
                                    className={inputWithIcon}
                                />
                            </div>

                            <div className="relative">
                                <FiTwitter className="absolute left-4 top-3.5 text-[#7BB9D4] opacity-40" />
                                <input
                                    type="text"
                                    value={formData.twitter}
                                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                                    placeholder="Twitter"
                                    className={inputWithIcon}
                                />
                            </div>

                            <div className="relative">
                                <FiFacebook className="absolute left-4 top-3.5 text-[#7BB9D4] opacity-40" />
                                <input
                                    type="text"
                                    value={formData.facebook}
                                    onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                                    placeholder="Facebook"
                                    className={inputWithIcon}
                                />
                            </div>

                        </div>

                    </div>


                    {/* Buttons */}

                    <div className="flex justify-between items-center pt-8 border-t border-gray-50 dark:border-white/5">

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="text-gray-400 hover:text-[#7BB9D4] text-[10px] font-black uppercase tracking-widest transition-colors"
                        >
                            Save For Later
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#7BB9D4] text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#7BB9D4]/30 hover:scale-[1.02] transition-all disabled:opacity-50"
                        >
                            {loading ? "Synchronizing..." : "Continue"}
                        </button>

                    </div>

                </form>
            </div>
        </Layout>
    );
};

export default CompleteProfile;
