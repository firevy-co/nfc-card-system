import React, { useState } from "react";
import {
  FiWind,
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiInstagram,
  FiTwitter,
  FiLinkedin,
  FiYoutube,
  FiUserPlus,
  FiSun,
  FiHeart,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiCheckCircle,
} from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

/* ---------------- LINK ---------------- */
const WellnessLink = ({ icon: Icon, label, value, href }) => {
  if (!value) return null;

  const Tag = href ? "a" : "div";

  return (
    <Tag
      href={href}
      target={href && href.startsWith("http") ? "_blank" : undefined}
      rel={href && href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="w-full bg-white/90 backdrop-blur border border-orange-100 rounded-2xl px-4 py-3 flex items-center justify-between shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
          <Icon className="text-orange-500" size={16} />
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            {label}
          </p>
          <p className="text-sm font-semibold text-gray-700">{value}</p>
        </div>
      </div>
    </Tag>
  );
};

/* ---------------- SOCIAL ---------------- */
const WellnessSocial = ({ icon: Icon, href }) => {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-11 h-11 rounded-xl bg-white border border-orange-100 flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition-all shadow-sm"
    >
      <Icon size={17} />
    </a>
  );
};

/* ---------------- MAIN ---------------- */
const WellnessWay = ({ userData }) => {
  const {
    displayName,
    email,
    phone,
    website,
    address,
    youtube,
    linkedin,
    twitter,
    instagram,
    logo,
  } = userData || {};

  const services = [
    "Morning Yoga",
    "Meditation",
    "Nutrition Plan",
    "Stress Relief",
    "Fitness Coaching",
    "Breathing Therapy",
  ];

  const features = [
    "Nature Space",
    "Healthy Diet",
    "Certified Trainers",
    "Online Session",
  ];

  const gallery = [
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
  ];

  const reviews = [
    {
      name: "Riya",
      text: "Morning yoga sessions changed my daily routine.",
      rating: 5,
    },
    {
      name: "Amit",
      text: "Very peaceful and refreshing wellness center.",
      rating: 5,
    },
    {
      name: "Neha",
      text: "Best place for fitness and stress relief.",
      rating: 4,
    },
  ];

  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % reviews.length);
  const prev = () =>
    setIndex((index - 1 + reviews.length) % reviews.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-lime-50 flex justify-center font-['Outfit']">
      <div className="w-full max-w-sm bg-white shadow-2xl overflow-hidden">

        {/* HERO */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80"
            alt="wellness"
            className="w-full h-56 object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* CURVE */}
          <svg
            viewBox="0 0 500 80"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full h-16"
          >
            <path
              d="M0,50 C150,0 350,100 500,50 L500,80 L0,80 Z"
              className="fill-white"
            />
          </svg>

          <div className="absolute top-5 left-5 right-5 flex justify-between">
            <div>
              <h1 className="text-2xl font-black text-white">
                {displayName || "Wellness Way"}
              </h1>
              <p className="text-xs text-orange-100 tracking-[3px] uppercase">
                Morning Healthcare
              </p>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-white p-1 shadow-xl overflow-hidden">
              {logo ? (
                <img
                  src={logo}
                  alt="logo"
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : (
                <div className="w-full h-full bg-orange-50 rounded-xl flex items-center justify-center">
                  <FiSun className="text-orange-500" size={24} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-4 pb-6">

          {/* ABOUT */}
          <div className="mt-4 bg-orange-50 rounded-2xl p-4">
            <h3 className="text-sm font-black text-orange-600 mb-2">
              Healthy Lifestyle
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Start your day with wellness routines, yoga, fitness,
              meditation, and healthy habits designed for body and mind.
            </p>
          </div>

          {/* CONTACT */}
          <div className="space-y-3 mt-4">
            <WellnessLink icon={FiPhone} label="Call" value={phone} href={`tel:${phone}`} />
            <WellnessLink icon={FiMail} label="Email" value={email} href={`mailto:${email}`} />
            <WellnessLink icon={FiGlobe} label="Website" value={website} href={website} />
            <WellnessLink icon={FiMapPin} label="Visit" value={address} />
          </div>

          {/* SERVICES */}
          <div className="mt-5">
            <h3 className="text-sm font-black text-gray-700 mb-3">
              Wellness Programs
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {services.map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-orange-100 rounded-xl p-3 text-center text-xs font-semibold text-gray-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* FEATURES */}
          <div className="mt-5">
            <h3 className="text-sm font-black text-gray-700 mb-3">
              Features
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {features.map((item, i) => (
                <div
                  key={i}
                  className="bg-lime-50 rounded-xl p-3 text-center text-xs font-semibold text-lime-700 flex items-center justify-center gap-1"
                >
                  <FiCheckCircle size={12} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* GALLERY */}
          <div className="mt-5">
            <h3 className="text-sm font-black text-gray-700 mb-3">
              Daily Activities
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="gallery"
                  className="h-24 w-full object-cover rounded-2xl"
                />
              ))}
            </div>
          </div>

          {/* REVIEW */}
          <div className="mt-5 bg-white border border-orange-100 rounded-2xl p-4">
            <h3 className="text-sm font-black text-gray-700 mb-2">
              Member Review
            </h3>

            <div className="flex gap-1 text-yellow-500 mb-2">
              {[...Array(reviews[index].rating)].map((_, k) => (
                <FiStar key={k} size={14} />
              ))}
            </div>

            <p className="text-sm text-gray-600">
              "{reviews[index].text}"
            </p>

            <p className="text-xs font-bold text-gray-400 mt-2">
              - {reviews[index].name}
            </p>

            <div className="flex justify-between mt-3">
              <button
                onClick={prev}
                className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600"
              >
                <FiChevronLeft />
              </button>

              <button
                onClick={next}
                className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>

          {/* SOCIAL */}
          <div className="flex justify-center gap-3 mt-5">
            <WellnessSocial icon={FiInstagram} href={instagram} />
            <WellnessSocial icon={FiYoutube} href={youtube} />
            <WellnessSocial icon={FiTwitter} href={twitter} />
            <WellnessSocial icon={FiLinkedin} href={linkedin} />
          </div>

          {/* BUTTON */}
          <button
            onClick={() => downloadVCard(userData)}
            className="w-full mt-5 bg-orange-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <FiUserPlus size={18} />
            Save Contact
          </button>

          <div className="mt-5 text-center">
            <PoweredBy />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessWay;