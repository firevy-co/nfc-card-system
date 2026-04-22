import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Layout from "../layout/layout";
import { Country, State, City } from "country-state-city";
import * as Fi from "react-icons/fi";

const IconCard = ({ icon: Icon, label, field, onClick }) => (
    <div
        onClick={() => onClick(field)}
        className="p-4 rounded-xl border bg-gray-50 hover:bg-gray-100 cursor-pointer flex flex-col items-center justify-center transition-all active:scale-95"
    >
        <Icon size={18} />
        <span className="text-xs mt-2">{label}</span>
    </div>
);

const Section = ({ title, children }) => (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold mb-4 opacity-60 uppercase tracking-widest">{title}</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {children}
        </div>
    </div>
);

const CompleteProfile = ({ userData }) => {
    const navigate = useNavigate();
    const isAdmin = userData?.role === "Admin";

    const [activeField, setActiveField] = useState(null);
    const [theme, setTheme] = useState("#0f172a");

    const [formData, setFormData] = useState({
        label: "",
        name: "",
        job: "",
        company: "",
        businessRole: "",
        bio: "",
        email: "",
        phone: "",
        website: "",
        address: "",
        logo: "",
        logoType: "file",
        country: "",
        countryCode: "",
        state: "",
        stateCode: "",
        city: "",
        linkedin: "",
        twitter: "",
        instagram: "",
        youtube: "",
        tiktok: "",
        discord: "",
        telegram: "",
        whatsapp: "",
        paypal: "",
        cashapp: "",
        venmo: "",
    });

    useEffect(() => {
        if (userData) {
            setTimeout(() => {
                setFormData((prev) => ({ ...prev, ...userData }));
            }, 0);
        }
    }, [userData]);

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, logo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        await fetch("http://localhost:4000/api/users/onboard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uid: userData.uid, ...formData }),
        });
        navigate("/user/home");
    };

    if (isAdmin) return <Navigate to="/admin/analytics" />;

    return (
        <Layout userData={userData} hideSidebar hideTopNav>
            <div className="max-w-7xl mx-auto p-6 space-y-6">

                {/* LABEL */}
                <div className="bg-white p-5 rounded-xl border shadow-sm">
                    <h3 className="text-sm mb-3 font-semibold opacity-60">Label this card</h3>
                    <input
                        className="w-full p-3 rounded-lg bg-gray-50 border border-transparent focus:border-black/5 outline-none font-bold"
                        placeholder="Work"
                        value={formData.label}
                        onChange={(e) =>
                            setFormData({ ...formData, label: e.target.value })
                        }
                    />
                </div>

                {/* CARD + IMAGE */}
                <div className="bg-white p-6 rounded-xl border shadow-sm grid md:grid-cols-2 gap-6">

                    <div
                        className="rounded-xl p-6 text-white shadow-xl"
                        style={{ background: theme }}
                    >
                        <p className="text-xs opacity-60 font-black tracking-widest">CARDYN</p>
                        <div className="flex flex-col items-center justify-center h-32">
                            <div className="w-16 h-16 rounded-full border border-white/20 bg-white/10 flex items-center justify-center overflow-hidden mb-3">
                                {formData.logo ? (
                                    <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
                                ) : (
                                    <Fi.FiUser size={30} />
                                )}
                            </div>
                            <h3 className="text-lg font-black">{formData.name || "Your Name"}</h3>
                            <p className="text-sm opacity-70">
                                {formData.job || "Your Role"}
                            </p>
                        </div>
                    </div>

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
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
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
                                className="w-full p-4 rounded-lg bg-gray-50 text-[11px] font-bold border border-transparent focus:border-black/5 transition-all outline-none"
                            />
                        )}
                    </div>
                </div>

                {/* THEME */}
                <div className="bg-white p-5 rounded-xl border shadow-sm">
                    <h3 className="text-sm mb-4 font-semibold opacity-60">Identity Theme</h3>
                    <div className="flex flex-wrap gap-3">
                        {[
                            "#22c55e", "#ef4444", "#f97316", "#eab308",
                            "#3b82f6", "#6366f1", "#a855f7", "#0f172a"
                        ].map((c) => (
                            <div
                                key={c}
                                onClick={() => setTheme(c)}
                                className={`w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110 active:scale-90 ${theme === c ? 'ring-2 ring-black ring-offset-2' : ''}`}
                                style={{ background: c }}
                            />
                        ))}
                    </div>
                </div>

                {/* CARD DETAILS */}

                <Section title="Personal Information">
                    <IconCard icon={Fi.FiUser} label="Name" field="name" onClick={setActiveField} />
                    <IconCard icon={Fi.FiBriefcase} label="Job Title" field="job" onClick={setActiveField} />
                    <IconCard icon={Fi.FiHome} label="Company" field="company" onClick={setActiveField} />
                    <IconCard icon={Fi.FiAward} label="Business Role" field="businessRole" onClick={setActiveField} />
                    <IconCard icon={Fi.FiFileText} label="Bio" field="bio" onClick={setActiveField} />
                </Section>

                <Section title="Contact & General">
                    <IconCard icon={Fi.FiMail} label="Email" field="email" onClick={setActiveField} />
                    <IconCard icon={Fi.FiPhone} label="Phone" field="phone" onClick={setActiveField} />
                    <IconCard icon={Fi.FiGlobe} label="Website" field="website" onClick={setActiveField} />
                    <IconCard icon={Fi.FiMapPin} label="Address" field="address" onClick={setActiveField} />
                </Section>

                <Section title="Social Presence">
                    <IconCard icon={Fi.FiLinkedin} label="LinkedIn" field="linkedin" onClick={setActiveField} />
                    <IconCard icon={Fi.FiTwitter} label="X / Twitter" field="twitter" onClick={setActiveField} />
                    <IconCard icon={Fi.FiInstagram} label="Instagram" field="instagram" onClick={setActiveField} />
                    <IconCard icon={Fi.FiYoutube} label="YouTube" field="youtube" onClick={setActiveField} />
                    <IconCard icon={Fi.FiVideo} label="TikTok" field="tiktok" onClick={setActiveField} />
                    <IconCard icon={Fi.FiMoreHorizontal} label="More" field="more" onClick={setActiveField} />
                </Section>

                <div className="grid md:grid-cols-2 gap-6">

                    <Section title="Messaging">
                        <IconCard icon={Fi.FiMessageSquare} label="Discord" field="discord" onClick={setActiveField} />
                        <IconCard icon={Fi.FiSend} label="Telegram" field="telegram" onClick={setActiveField} />
                        <IconCard icon={Fi.FiPhone} label="WhatsApp" field="whatsapp" onClick={setActiveField} />
                    </Section>

                    <Section title="Payment">
                        <IconCard icon={Fi.FiCreditCard} label="PayPal" field="paypal" onClick={setActiveField} />
                        <IconCard icon={Fi.FiDollarSign} label="Cash App" field="cashapp" onClick={setActiveField} />
                        <IconCard icon={Fi.FiCreditCard} label="Venmo" field="venmo" onClick={setActiveField} />
                    </Section>

                </div>

                {/* SAVE */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        className="bg-black text-white px-6 py-3 rounded-lg"
                    >
                        Save
                    </button>
                </div>

                {/* MODAL */}
                {activeField && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-xl w-full max-w-md">
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
                                                address: country.name
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
                                                address: `${state.name}, ${formData.country}`
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
                                                address: `${e.target.value}, ${formData.state}, ${formData.country}`
                                            });
                                        }}
                                        value={formData.city || ""}
                                    >
                                        <option value="">Select City</option>
                                        {formData.countryCode && formData.stateCode && City.getCitiesOfState(formData.countryCode, formData.stateCode).map((c) => (
                                            <option key={c.name} value={c.name}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
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