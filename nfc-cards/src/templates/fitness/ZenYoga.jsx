import React, { useMemo } from "react";
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
  FiArrowRight,
  FiHeart,
  FiSun,
  FiClock,
  FiStar,
  FiCheckCircle,
  FiCalendar,
  FiSmile
} from "react-icons/fi";
import { downloadVCard } from "../common/StandardComponents";
import PoweredBy from "../PoweredBy";

/* ===================================================
   TITLE
=================================================== */
const SectionTitle = ({ title, sub }) => (
  <div className="mb-4">
    <h2 className="text-xl font-black text-[#3d3b35]">{title}</h2>
    {sub && <p className="text-sm text-[#7b776e] mt-1">{sub}</p>}
  </div>
);

/* ===================================================
   SOCIAL BUTTON
=================================================== */
const ZenSocial = ({ icon: Icon, href }) => {
  if (!href) return null;

  return (
    <a
      href={href || null}
      target="_blank"
      rel="noopener noreferrer"
      className="w-11 h-11 rounded-full bg-white border border-[#ece7de] shadow-sm flex items-center justify-center text-[#6d675d] hover:bg-[#c8b59b] hover:text-white transition-all"
    >
      <Icon size={18} />
    </a>
  );
};

/* ===================================================
   INFO CARD
=================================================== */
const ZenLink = ({ icon: Icon, label, value, href }) => {
  if (!value) return null;

  const Comp = href ? "a" : "div";

  return (
    <Comp
      href={href || null}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className="bg-white rounded-3xl border border-[#efe9de] p-4 flex items-center gap-4 hover:shadow-md transition-all"
    >
      <div className="w-12 h-12 rounded-2xl bg-[#f8f3ea] text-[#a7875d] flex items-center justify-center">
        <Icon size={18} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-[#b6afa3] font-bold">
          {label}
        </p>
        <p className="text-sm font-semibold text-[#4b463f] truncate">
          {value}
        </p>
      </div>
    </Comp>
  );
};

/* ===================================================
   SERVICE CARD
=================================================== */
const ServiceCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-white rounded-3xl border border-[#efe9de] p-5 hover:shadow-md transition-all">
    <div className="w-12 h-12 rounded-2xl bg-[#f8f3ea] text-[#a7875d] flex items-center justify-center mb-4">
      <Icon size={20} />
    </div>

    <h3 className="font-bold text-[#4b463f]">{title}</h3>
    <p className="text-sm text-[#7b776e] mt-2 leading-6">{desc}</p>
  </div>
);

/* ===================================================
   TESTIMONIAL
=================================================== */
const Testimonial = ({ name, text }) => (
  <div className="bg-white rounded-3xl border border-[#efe9de] p-5">
    <div className="flex gap-1 text-amber-400 mb-3">
      <FiStar />
      <FiStar />
      <FiStar />
      <FiStar />
      <FiStar />
    </div>

    <p className="text-sm text-[#6f6a60] leading-6">{text}</p>

    <p className="font-bold text-[#3d3b35] mt-4">{name}</p>
  </div>
);

/* ===================================================
   PLAN CARD
=================================================== */
const PlanCard = ({ title, price, features, active }) => (
  <div
    className={`rounded-3xl p-5 border ${active
      ? "bg-[#c8b59b] text-white border-[#c8b59b]"
      : "bg-white text-[#4b463f] border-[#efe9de]"
      }`}
  >
    <h3 className="font-black">{title}</h3>
    <div className="text-3xl font-black mt-2 mb-4">{price}</div>

    <div className="space-y-3">
      {features.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <FiCheckCircle size={16} />
          <span className="text-sm">{item}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ===================================================
   MAIN
=================================================== */
const ZenYoga = ({ userData }) => {
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
    logo
  } = userData || {};

  /* IMAGES */
  const hero =
    "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80";

  const gallery = useMemo(
    () => [
      "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&w=800&q=80"
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#f7f2ea] font-['Inter',sans-serif] text-[#4b463f]">
      <div className="w-full max-w-sm mx-auto bg-[#fcfaf6] min-h-screen shadow-2xl">

        {/* HERO */}
        <header className="relative overflow-hidden">
          <img
            src={hero}
            alt="Yoga"
            className="w-full h-[360px] object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#fcfaf6] via-transparent to-black/10" />

          {/* LOGO */}
          <div className="absolute top-6 left-5">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white shadow-xl border-4 border-white">
              {logo ? (
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#a7875d]">
                  <FiWind size={24} />
                </div>
              )}
            </div>
          </div>

          {/* HERO CONTENT */}
          <div className="absolute left-5 right-5 bottom-12">
            <p className="text-[#a7875d] text-xs uppercase tracking-[0.35em] font-bold">
              Peace • Balance • Energy
            </p>

            <h1 className="text-4xl font-black text-white drop-shadow mt-3">
              {displayName || "Zen Yoga"}
            </h1>

            <p className="text-white/90 text-sm mt-3 leading-6 max-w-xs">
              Restore your body and mind with guided yoga sessions, meditation
              practices and wellness coaching.
            </p>

            <div className="flex gap-2 mt-4">
              <ZenSocial icon={FiInstagram} href={instagram || null} />
              <ZenSocial icon={FiYoutube} href={youtube || null} />
              <ZenSocial icon={FiTwitter} href={twitter || null} />
              <ZenSocial icon={FiLinkedin} href={linkedin || null} />
            </div>
          </div>

          {/* WAVE */}
          <svg
            viewBox="0 0 1440 320"
            className="absolute bottom-0 left-0 w-full h-20 fill-[#fcfaf6]"
          >
            <path d="M0,160L60,176C120,192,240,224,360,224C480,224,600,192,720,165.3C840,139,960,117,1080,122.7C1200,128,1320,160,1380,176L1440,192L1440,320L0,320Z"></path>
          </svg>
        </header>

        {/* BODY */}
        <div className="px-5 pb-10 space-y-6">

          {/* ABOUT */}
          <section>
            <SectionTitle
              title="About Studio"
              sub="A mindful journey to better living"
            />

            <div className="bg-white rounded-3xl border border-[#efe9de] p-5 text-sm leading-7 text-[#6f6a60]">
              Our yoga studio helps people reduce stress, improve flexibility,
              gain strength and build peaceful daily habits through expert-led
              sessions.
            </div>
          </section>

          {/* STATS */}
          <section>
            <div className="grid grid-cols-3 gap-3">

              <div className="bg-white rounded-3xl border border-[#efe9de] p-4 text-center">
                <FiHeart className="mx-auto text-[#a7875d] mb-2" />
                <h3 className="font-black text-lg">10+</h3>
                <p className="text-[10px] uppercase text-[#b6afa3]">Years</p>
              </div>

              <div className="bg-white rounded-3xl border border-[#efe9de] p-4 text-center">
                <FiSmile className="mx-auto text-[#a7875d] mb-2" />
                <h3 className="font-black text-lg">950+</h3>
                <p className="text-[10px] uppercase text-[#b6afa3]">Members</p>
              </div>

              <div className="bg-white rounded-3xl border border-[#efe9de] p-4 text-center">
                <FiClock className="mx-auto text-[#a7875d] mb-2" />
                <h3 className="font-black text-lg">Daily</h3>
                <p className="text-[10px] uppercase text-[#b6afa3]">Classes</p>
              </div>

            </div>
          </section>

          {/* CONTACT */}
          <section>
            <SectionTitle title="Contact Details" />

            <div className="space-y-3">
              <ZenLink
                icon={FiPhone}
                label="Phone"
                value={phone}
                href={phone ? `tel:${phone}` : null}
              />

              <ZenLink
                icon={FiMail}
                label="Email"
                value={email}
                href={email ? `mailto:${email}` : null}
              />

              <ZenLink
                icon={FiGlobe}
                label="Website"
                value={website}
                href={website || null}
              />

              <ZenLink
                icon={FiMapPin}
                label="Location"
                value={address}
              />
            </div>
          </section>

          {/* SERVICES */}
          <section>
            <SectionTitle
              title="Programs"
              sub="Wellness designed for everyone"
            />

            <div className="grid grid-cols-2 gap-3">

              <ServiceCard
                icon={FiSun}
                title="Morning Yoga"
                desc="Start your day with energy and balance."
              />

              <ServiceCard
                icon={FiHeart}
                title="Meditation"
                desc="Breathing and mindfulness practices."
              />

              <ServiceCard
                icon={FiCalendar}
                title="Private Class"
                desc="1-on-1 sessions with expert teacher."
              />

              <ServiceCard
                icon={FiWind}
                title="Flexibility"
                desc="Stretching and mobility improvement."
              />

            </div>
          </section>

          {/* GALLERY */}
          <section>
            <SectionTitle title="Studio Moments" />

            <div className="grid grid-cols-2 gap-3">
              {gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="Yoga"
                  className="rounded-3xl h-32 w-full object-cover border border-[#efe9de]"
                />
              ))}
            </div>
          </section>

          {/* PRICING */}
          <section>
            <SectionTitle title="Membership Plans" />

            <div className="space-y-3">

              <PlanCard
                title="Basic"
                price="$39"
                features={[
                  "3 Classes / Week",
                  "Meditation Access",
                  "Community Support"
                ]}
              />

              <PlanCard
                title="Premium"
                price="$79"
                active
                features={[
                  "Unlimited Classes",
                  "Private Guidance",
                  "Diet Wellness Tips"
                ]}
              />

            </div>
          </section>

          {/* TESTIMONIALS */}
          <section>
            <SectionTitle title="Happy Members" />

            <div className="space-y-3">

              <Testimonial
                name="Riya Shah"
                text="I feel calmer, stronger and healthier after joining."
              />

              <Testimonial
                name="Neha Joshi"
                text="Beautiful studio, peaceful energy and great instructors."
              />

            </div>
          </section>

          {/* HOURS */}
          <section>
            <SectionTitle title="Class Timings" />

            <div className="bg-white rounded-3xl border border-[#efe9de] p-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>06:00 - 21:00</span>
              </div>

              <div className="flex justify-between">
                <span>Saturday</span>
                <span>07:00 - 18:00</span>
              </div>

              <div className="flex justify-between">
                <span>Sunday</span>
                <span>08:00 - 14:00</span>
              </div>
            </div>
          </section>

          {/* ACTIONS */}
          <section className="space-y-3">

            <button
              onClick={() => downloadVCard(userData)}
              className="w-full py-5 rounded-3xl bg-[#3d3b35] text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:opacity-90 transition-all"
            >
              <FiUserPlus size={18} />
              Save Contact
            </button>

            {website && (
              <a
                href={website || null}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 rounded-3xl bg-white border border-[#efe9de] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#f8f3ea] transition-all"
              >
                Join Class
                <FiArrowRight />
              </a>
            )}

          </section>

          <PoweredBy />
        </div>
      </div>
    </div>
  );
};

export default ZenYoga;