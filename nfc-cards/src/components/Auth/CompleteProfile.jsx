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
    FiBriefcase
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
        "w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-blue-500";

    return (
        <Layout userData={userData} title="Complete Profile" hideSidebar={true}>
            <div className="max-w-3xl sm:max-w-7xl mx-auto py-12 px-6">

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-xl shadow space-y-10"
                >

                    {/* Personal Section */}

                    <div>

                        <div className="flex justify-between mb-4">
                            <h3 className="font-semibold text-gray-700">
                                Personal & Professional
                            </h3>
                            <span className="text-xs text-blue-500 font-semibold">
                                REQUIRED
                            </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">

                            <div className="relative">
                                <FiBriefcase className="absolute left-4 top-3.5 text-gray-400" />
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
                                <FiBriefcase className="absolute left-4 top-3.5 text-gray-400" />
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

                        <div className="flex justify-between mb-4">
                            <h3 className="font-semibold text-gray-700">
                                Contact Details
                            </h3>
                            <span className="text-xs text-gray-400 font-semibold">
                                GLOBAL
                            </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">

                            <div className="relative">
                                <FiMail className="absolute left-4 top-3.5 text-gray-400" />
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
                                <FiPhone className="absolute left-4 top-3.5 text-gray-400" />
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

                        <div className="flex justify-between mb-4">
                            <h3 className="font-semibold text-gray-700">
                                Location
                            </h3>
                            <span className="text-xs text-gray-400">
                                OPTIONAL
                            </span>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">

                            <select
                                value={formData.countryCode}
                                onChange={handleCountryChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-sm"
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
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-sm"
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
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-sm"
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

                        <div className="flex justify-between mb-4">
                            <h3 className="font-semibold text-gray-700">
                                Digital Ecosystem
                            </h3>
                            <span className="text-xs text-gray-400">
                                OPTIONAL
                            </span>
                        </div>

                        <div className="relative mb-4">
                            <FiGlobe className="absolute left-4 top-3.5 text-gray-400" />
                            <input
                                type="text"
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                placeholder="Website URL"
                                className={inputWithIcon}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">

                            <div className="relative">
                                <FiLinkedin className="absolute left-4 top-3.5 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.linkedin}
                                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                    placeholder="LinkedIn"
                                    className={inputWithIcon}
                                />
                            </div>

                            <div className="relative">
                                <FiInstagram className="absolute left-4 top-3.5 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.instagram}
                                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                                    placeholder="Instagram"
                                    className={inputWithIcon}
                                />
                            </div>

                            <div className="relative">
                                <FiTwitter className="absolute left-4 top-3.5 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.twitter}
                                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                                    placeholder="Twitter"
                                    className={inputWithIcon}
                                />
                            </div>

                            <div className="relative">
                                <FiFacebook className="absolute left-4 top-3.5 text-gray-400" />
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

                    <div className="flex justify-between pt-6">

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="text-blue-500 text-sm font-medium"
                        >
                            Save For Later
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
                        >
                            {loading ? "Saving..." : "Continue"}
                        </button>

                    </div>

                </form>
            </div>
        </Layout>
    );
};

export default CompleteProfile;