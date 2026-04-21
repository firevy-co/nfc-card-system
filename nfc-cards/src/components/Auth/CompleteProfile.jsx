import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import Layout from "../layout/layout";
import { Country, State, City } from "country-state-city";

import * as FiIcons from "react-icons/fi";

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
            setTimeout(() => {
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
            }, 0);
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
        "w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-emerald-50/50 border border-gray-100 dark:border-emerald-100/50 text-sm font-bold text-gray-900 dark:text-emerald-900 outline-none focus:ring-2 focus:ring-[#7BB9D4] focus:border-[#7BB9D4]/50 transition-all";

    return (
        <Layout userData={userData} title="Complete Profile" hideSidebar={true} hideTopNav={true}>
            <div className="max-w-3xl sm:max-w-7xl mx-auto py-12 px-6">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-white/90 p-10 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 dark:shadow-emerald-900/5 space-y-12 border border-gray-100 dark:border-emerald-100"
                >

                    {/* Personal Section */}

                    <div>

                        <div className="flex justify-between items-end mb-6 border-b border-gray-50 dark:border-emerald-100 pb-4">
                            <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-gray-900 dark:text-emerald-800">
                                Personal & Professional
                            </h3>
                            <span className="text-[9px] text-[#7BB9D4] font-black uppercase tracking-widest">
                                REQUIRED STAGE
                            </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div className="relative">
                                <FiIcons.FiBriefcase className="absolute left-4 top-3.5 text-[#7BB9D4] opacity-40" />
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
                                <FiIcons.FiBriefcase className="absolute left-4 top-3.5 text-[#7BB9D4] opacity-40" />
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

                        <div className="flex justify-between items-end mb-6 border-b border-gray-50 dark:border-emerald-100 pb-4">
                            <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-gray-900 dark:text-emerald-800">
                                Contact Details
                            </h3>
                            <span className="text-[9px] text-gray-400 dark:text-emerald-950/40 font-black uppercase tracking-widest">
                                GLOBAL NODES
                            </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div className="relative">
                                <FiIcons.FiMail className="absolute left-4 top-3.5 text-[#7BB9D4] opacity-40" />
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
                                <FiIcons.FiPhone className="absolute left-4 top-3.5 text-[#7BB9D4] opacity-40" />
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

                        <div className="flex justify-between items-end mb-6 border-b border-gray-50 dark:border-emerald-100 pb-4">
                            <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-gray-900 dark:text-emerald-800">
                                Location
                            </h3>
                            <span className="text-[9px] text-gray-400 dark:text-emerald-950/40 font-black uppercase tracking-widest">
                                SPATIAL REGISTRY
                            </span>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">

                            <select
                                value={formData.countryCode}
                                onChange={handleCountryChange}
                                className="w-full px-5 py-3.5 rounded-xl bg-gray-50 dark:bg-emerald-50/50 border border-gray-100 dark:border-emerald-100/50 text-sm font-bold text-gray-900 dark:text-emerald-900 outline-none focus:ring-2 focus:ring-[#7BB9D4] appearance-none cursor-pointer transition-all"
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
                                className="w-full px-5 py-3.5 rounded-xl bg-gray-50 dark:bg-emerald-50/50 border border-gray-100 dark:border-emerald-100/50 text-sm font-bold text-gray-900 dark:text-emerald-900 outline-none focus:ring-2 focus:ring-[#7BB9D4] appearance-none disabled:opacity-40 cursor-pointer transition-all"
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
                                className="w-full px-5 py-3.5 rounded-xl bg-gray-50 dark:bg-emerald-50/50 border border-gray-100 dark:border-emerald-100/50 text-sm font-bold text-gray-900 dark:text-emerald-900 outline-none focus:ring-2 focus:ring-[#7BB9D4] appearance-none disabled:opacity-40 cursor-pointer transition-all"
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

                        <div className="flex justify-between items-end mb-6 border-b border-gray-50 dark:border-emerald-100 pb-4">
                            <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-gray-900 dark:text-emerald-800">
                                Digital Ecosystem
                            </h3>
                            <span className="text-[9px] text-gray-400 dark:text-emerald-950/40 font-black uppercase tracking-widest">
                                BROADCAST NODES
                            </span>
                        </div>

                        <div className="relative mb-6">
                            <FiIcons.FiGlobe className="absolute left-4 top-3.5 text-[#7BB9D4] opacity-40" />
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
                                <FiIcons.FiLinkedin className="absolute left-4 top-3.5 text-[#7BB9D4] opacity-40" />
                                <input
                                    type="text"
                                    value={formData.linkedin}
                                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                    placeholder="LinkedIn"
                                    className={inputWithIcon}
                                />
                            </div>

                            <div className="relative">
                                <FiIcons.FiInstagram className="absolute left-4 top-3.5 text-[#7BB9D4] opacity-40" />
                                <input
                                    type="text"
                                    value={formData.instagram}
                                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                                    placeholder="Instagram"
                                    className={inputWithIcon}
                                />
                            </div>

                            <div className="relative">
                                <FiIcons.FiTwitter className="absolute left-4 top-3.5 text-[#7BB9D4] opacity-40" />
                                <input
                                    type="text"
                                    value={formData.twitter}
                                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                                    placeholder="Twitter"
                                    className={inputWithIcon}
                                />
                            </div>

                            <div className="relative">
                                <FiIcons.FiFacebook className="absolute left-4 top-3.5 text-[#7BB9D4] opacity-40" />
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

                    <div className="flex justify-end items-center pt-8 border-t border-gray-50 dark:border-emerald-100">
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
