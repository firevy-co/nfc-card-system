/**
 * TEMPLATE REGISTRY - FIREVY IDENTITY NETWORK
 * Central source of truth for all business-specific identity templates.
 */

export const TEMPLATES = [
  // --- PREMIUM ---
  {
    id: "cardyn_classic",
    name: "Classic Refined",
    category: "Luxury",
    description: "Premium tile-based identity with high-impact 'Connect With Us' suite.",
    previewColor: "bg-slate-900",
    tags: ["Premium", "Classic", "Interactive", "Featured"]
  },

  // --- BUSINESS ---
  {
    id: 'business_basic',
    name: 'Classic Executive',
    category: 'Business',
    description: 'Design-forward, professional V-Card layout.',
    previewColor: 'bg-indigo-600',
    tags: ['Corporate', 'Executive', 'Professional']
  },
  {
    id: 'business_minimal',
    name: 'Executive Minimal',
    category: 'Business',
    description: 'Ultra-clean white/black minimalist executive card.',
    previewColor: 'bg-zinc-900',
    tags: ['Minimal', 'Clean', 'Modern']
  },
  {
    id: 'business_glass',
    name: 'Corporate Glass',
    category: 'Business',
    description: 'Premium glassmorphism design with blue gradient highlights.',
    previewColor: 'bg-blue-500',
    tags: ['Glass', 'Premium', 'Corporate']
  },
  {
    id: 'business_bold',
    name: 'Bold Entrepreneur',
    category: 'Business',
    description: 'High-contrast yellow and black design for entrepreneurs.',
    previewColor: 'bg-yellow-400',
    tags: ['Bold', 'Founder', 'Startup']
  },
  {
    id: 'business_leader',
    name: 'Modern Leader',
    category: 'Business',
    description: 'Sleek slate finish with award certification badge.',
    previewColor: 'bg-slate-700',
    tags: ['Auth', 'Leader', 'Award']
  },

  // --- LUXURY / JEWELRY ---
  {
    id: 'jewelry_luxury',
    name: 'Royal Jewelry',
    category: 'Luxury',
    description: 'Gold-accented elegant design for premium jewelry boutiques.',
    previewColor: 'bg-amber-600',
    tags: ['Elegance', 'Luxury', 'Boutique']
  },
  {
    id: 'jewelry_diamond',
    name: 'Diamond Elite',
    category: 'Luxury',
    description: 'Minimalist amber/black aesthetic for high-end jewelers.',
    previewColor: 'bg-amber-500',
    tags: ['Premium', 'Elite', 'Concierge']
  },
  {
    id: 'jewelry_velvet',
    name: 'Velvet Boutique',
    category: 'Luxury',
    description: 'Warm deep tones with gold artisanal accents.',
    previewColor: 'bg-[#251f1e]',
    tags: ['Artisan', 'Boutique', 'Warm']
  },
  {
    id: 'jewelry_grace',
    name: 'Golden Grace',
    category: 'Luxury',
    description: 'Bright cream/gold palette for traditional luxury brands.',
    previewColor: 'bg-[#fdfbf7]',
    tags: ['Grace', 'Light', 'Traditional']
  },
  {
    id: 'jewelry_opal',
    name: 'Opal Minimal',
    category: 'Luxury',
    description: 'Soft pastel gradient design for modern high-end brands.',
    previewColor: 'bg-indigo-50',
    tags: ['Modern', 'Soft', 'Minimal']
  },

  // --- TECHNOLOGY ---
  {
    id: 'it_tech',
    name: 'IT Matrix',
    category: 'Technology',
    description: 'Dynamic tech-focused layout with structural neon accents.',
    previewColor: 'bg-cyan-500',
    tags: ['Tech', 'Dev', 'Cyber']
  },
  {
    id: 'it_quantum',
    name: 'Quantum Code',
    category: 'Technology',
    description: 'Cyber/neon design with monospaced typography.',
    previewColor: 'bg-[#0a0a1f]',
    tags: ['Dev', 'SysOps', 'Neon']
  },
  {
    id: 'it_silicon',
    name: 'Silicon Stream',
    category: 'Technology',
    description: 'Modern structured layout with clean indigo highlights.',
    previewColor: 'bg-indigo-600',
    tags: ['Architect', 'Stream', 'Modern']
  },
  {
    id: 'it_cloud',
    name: 'Cloud Nexus',
    category: 'Technology',
    description: 'Vibrant blue design for cloud native specialists.',
    previewColor: 'bg-blue-600',
    tags: ['DevOps', 'Cloud', 'Networking']
  },
  {
    id: 'it_data',
    name: 'Data Matrix',
    category: 'Technology',
    description: 'Sharp industrial design with emerald data accents.',
    previewColor: 'bg-emerald-500',
    tags: ['Analyst', 'Matrix', 'System']
  },

  // --- AGENCY ---
  {
    id: 'creative_agency',
    name: 'Bold Agency',
    category: 'Agency',
    description: 'Vibrant, high-contrast design for creative studios.',
    previewColor: 'bg-rose-500',
    tags: ['Creative', 'Studio', 'Modern']
  },
  {
    id: 'agency_vivid',
    name: 'Vivid Studio',
    category: 'Agency',
    description: 'Bright pink aesthetic for motion and art directors.',
    previewColor: 'bg-[#ff3366]',
    tags: ['Motion', 'Art', 'Vivid']
  },
  {
    id: 'agency_neo',
    name: 'Neo Agency',
    category: 'Agency',
    description: 'Neo-zinc design for innovation and logic focused agencies.',
    previewColor: 'bg-emerald-500',
    tags: ['Logic', 'Innovation', 'Agency']
  },
  {
    id: 'agency_prism',
    name: 'Prism Creative',
    category: 'Agency',
    description: 'Multi-color gradient aesthetic for visual developers.',
    previewColor: 'bg-violet-600',
    tags: ['Visual', 'Dev', 'Art']
  },
  {
    id: 'agency_abstract',
    name: 'Abstract Media',
    category: 'Agency',
    description: 'Structural black card with vibrant media icons.',
    previewColor: 'bg-black',
    tags: ['Media', 'Production', 'Abstract']
  },

  // --- HEALTHCARE ---
  {
    id: 'doctor_health',
    name: 'Medical Trust',
    category: 'Healthcare',
    description: 'Clean, trust-inspiring layout for healthcare professionals.',
    previewColor: 'bg-blue-600',
    tags: ['Medical', 'Trust', 'Health']
  },
  {
    id: 'health_trust',
    name: 'Trust Medical',
    category: 'Healthcare',
    description: 'Patient-focused blue trust aesthetic for GPs.',
    previewColor: 'bg-blue-500',
    tags: ['Care', 'GP', 'Doctor']
  },
  {
    id: 'health_pure',
    name: 'Pure Health',
    category: 'Healthcare',
    description: 'Serene emerald design for wellness practitioners.',
    previewColor: 'bg-emerald-500',
    tags: ['Wellness', 'Vitals', 'Pure']
  },
  {
    id: 'health_elite',
    name: 'Clinica Elite',
    category: 'Healthcare',
    description: 'Premium dark mode aesthetic for specialist surgeons.',
    previewColor: 'bg-blue-600',
    tags: ['Surgery', 'Elite', 'Medical']
  },
  {
    id: 'health_way',
    name: 'Wellness Way',
    category: 'Healthcare',
    description: 'Neutral soft-focus design for holistic therapy.',
    previewColor: 'bg-stone-200',
    tags: ['Holistic', 'Therapy', 'Harmony']
  },

  // --- AUTOMOTIVE ---
  {
    id: 'car_showroom',
    name: 'Velocity Auto',
    category: 'Automotive',
    description: 'Sleek, dark carbon-fiber design for luxury showrooms.',
    previewColor: 'bg-zinc-800',
    tags: ['Auto', 'Premium', 'Speed']
  },
  {
    id: 'auto_carbon',
    name: 'Carbon Drive',
    category: 'Automotive',
    description: 'Industrial performance aesthetic with red highlights.',
    previewColor: 'bg-red-600',
    tags: ['Carbon', 'Performance', 'Auto']
  },
  {
    id: 'auto_velocity',
    name: 'Velocity Elite',
    category: 'Automotive',
    description: 'High-contrast slate/white automotive brand feel.',
    previewColor: 'bg-slate-900',
    tags: ['Sales', 'Elite', 'Hub']
  },
  {
    id: 'auto_aero',
    name: 'Aero Motors',
    category: 'Automotive',
    description: 'Minimalist indigo design for aerodynamic specialists.',
    previewColor: 'bg-indigo-600',
    tags: ['Aero', 'Design', 'Motors']
  },
  {
    id: 'auto_pinnacle',
    name: 'Pinnacle Auto',
    category: 'Automotive',
    description: 'Hexagon industrial aesthetic for master technicians.',
    previewColor: 'bg-neutral-900',
    tags: ['Pinnacle', 'Tech', 'Auto']
  },

  // --- REAL ESTATE ---
  {
    id: 'real_estate',
    name: 'Modern Realty',
    category: 'Real Estate',
    description: 'Bright, trust-based layout for high-end property agents.',
    previewColor: 'bg-emerald-600',
    tags: ['Property', 'Agent', 'Homes']
  },
  {
    id: 'realty_grand',
    name: 'Grand Estate',
    category: 'Real Estate',
    description: 'High-end sapphire/white theme for luxury agents.',
    previewColor: 'bg-indigo-900',
    tags: ['Grand', 'Estate', 'Luxury']
  },
  {
    id: 'realty_urban',
    name: 'Urban Dwell',
    category: 'Real Estate',
    description: 'Modern architectural aesthetic for urban brokers.',
    previewColor: 'bg-slate-900',
    tags: ['Urban', 'Listing', 'Broker']
  },
  {
    id: 'realty_pixel',
    name: 'Pixel Property',
    category: 'Real Estate',
    description: 'Techno-realtor dark mode aesthetic for digital agents.',
    previewColor: 'bg-emerald-500',
    tags: ['Digital', 'Agent', 'Pixel']
  },
  {
    id: 'realty_horizon',
    name: 'Horizon Living',
    category: 'Real Estate',
    description: 'Soft circular aesthetic for lifestyle property guides.',
    previewColor: 'bg-slate-900',
    tags: ['Horizon', 'Living', 'Guide']
  },

  // --- LEGAL ---
  {
    id: 'legal_consultant',
    name: 'Legal Partners',
    category: 'Legal',
    description: 'Sophisticated traditional design for law firms and counsel.',
    previewColor: 'bg-slate-700',
    tags: ['Lawyer', 'Counsel', 'Legal']
  },
  {
    id: 'legal_justice',
    name: 'Justice Partners',
    category: 'Legal',
    description: 'Traditional beige/gold judicial palette for attorneys.',
    previewColor: 'bg-amber-600',
    tags: ['Justice', 'Counsel', 'Attorney']
  },
  {
    id: 'legal_elite',
    name: 'Elite Counsel',
    category: 'Legal',
    description: 'Boardroom-focused slate contrast for high-stakes counsel.',
    previewColor: 'bg-slate-900',
    tags: ['Elite', 'Chambers', 'Master']
  },
  {
    id: 'legal_sovereign',
    name: 'Sovereign Law',
    category: 'Legal',
    description: 'Minimalist black aesthetic for defense advocates.',
    previewColor: 'bg-black',
    tags: ['Sovereign', 'Defense', 'Law']
  },
  {
    id: 'legal_template',
    name: 'Lega Template',
    category: 'Legal',
    description: 'Ultra-clean modernist structure for compliance officers.',
    previewColor: 'bg-slate-900',
    tags: ['Template', 'Compliance', 'Legal']
  },

  // --- HOSPITALITY ---
  {
    id: 'hospitality_bistro',
    name: 'Bistro Gourmet',
    category: 'Hospitality',
    description: 'Elegant French-chic aesthetic for premium restaurants.',
    previewColor: 'bg-stone-200',
    tags: ['Dining', 'Bistro', 'Chef']
  },
  {
    id: 'hospitality_urban',
    name: 'Urban Bistro',
    category: 'Hospitality',
    description: 'Warm orange accents for modern urban dining hubs.',
    previewColor: 'bg-[#e67e22]',
    tags: ['Bistro', 'Manager', 'Dining']
  },
  {
    id: 'hospitality_luxe',
    name: 'Luxe Hotel',
    category: 'Hospitality',
    description: 'Premium black/gold aesthetic for Elite concierge.',
    previewColor: 'bg-black',
    tags: ['Hotel', 'Concierge', 'Elite']
  },
  {
    id: 'hospitality_zen',
    name: 'Zen Cafe',
    category: 'Hospitality',
    description: 'Serene neutral tones for peaceful barista hubs.',
    previewColor: 'bg-stone-100',
    tags: ['Zen', 'Cafe', 'Barista']
  },
  {
    id: 'hospitality_night',
    name: 'Night Connect',
    category: 'Hospitality',
    description: 'Vibrant indigo neon aesthetic for events and logic.',
    previewColor: 'bg-indigo-600',
    tags: ['Night', 'Events', 'Protocol']
  },

  // --- FITNESS ---
  {
    id: 'fitness_coach',
    name: 'Elite Trainer',
    category: 'Fitness',
    description: 'High-energy neon-industrial design for personal trainers.',
    previewColor: 'bg-lime-500',
    tags: ['Gym', 'Fitness', 'Coach']
  },
  {
    id: 'fitness_pulse',
    name: 'Pulse Workout',
    category: 'Fitness',
    description: 'Neon yellow high-energy protocol for performance coaches.',
    previewColor: 'bg-[#ccff00]',
    tags: ['Pulse', 'Performance', 'Pro']
  },
  {
    id: 'fitness_iron',
    name: 'Iron Forge',
    category: 'Fitness',
    description: 'Raw industrial orange aesthetic for strength specialists.',
    previewColor: 'bg-orange-600',
    tags: ['Iron', 'Strength', 'Forge']
  },
  {
    id: 'fitness_zen',
    name: 'Zen Yoga',
    category: 'Fitness',
    description: 'Peaceful flow aesthetic for holistic practitioners.',
    previewColor: 'bg-slate-100',
    tags: ['Yoga', 'Zen', 'Flow']
  },
  {
    id: 'fitness_apex',
    name: 'Apex Sport',
    category: 'Fitness',
    description: 'High-contrast structural design for apex performance.',
    previewColor: 'bg-slate-900',
    tags: ['Apex', 'Sport', 'Coach']
  },

  // --- CONSTRUCTION ---
  {
    id: 'construction_pro',
    name: 'Ironwood Build',
    category: 'Construction',
    description: 'Rugged industrial design for architects and general contractors.',
    previewColor: 'bg-zinc-900',
    tags: ['Building', 'Site', 'Architect']
  },
  {
    id: 'construction_rigid',
    name: 'Rigid Build',
    category: 'Construction',
    description: 'Safety orange industrial design for project supers.',
    previewColor: 'bg-orange-500',
    tags: ['Rigid', 'Super', 'Build']
  },
  {
    id: 'construction_steel',
    name: 'Steel Frame',
    category: 'Construction',
    description: 'Structural grid aesthetic for steel architects.',
    previewColor: 'bg-slate-900',
    tags: ['Steel', 'Structure', 'Frame']
  },
  {
    id: 'construction_concrete',
    name: 'Concrete Core',
    category: 'Construction',
    description: 'Brutalist minimalist aesthetic for foundation leads.',
    previewColor: 'bg-stone-400',
    tags: ['Concrete', 'Core', 'Brutalist']
  },
  {
    id: 'construction_vector',
    name: 'Vector Structure',
    category: 'Construction',
    description: 'Arch-minimal design for structural directors.',
    previewColor: 'bg-slate-900',
    tags: ['Vector', 'Arch', 'Director']
  },

  // --- BEAUTY ---
  {
    id: 'beauty_stylist',
    name: 'Boutique Salon',
    category: 'Beauty',
    description: 'Elegant soft palette for makeup artists and luxury salons.',
    previewColor: 'bg-rose-400',
    tags: ['Makeup', 'Salon', 'Style']
  },
  {
    id: 'beauty_glow',
    name: 'Glow Studio',
    category: 'Beauty',
    description: 'Soft rose glow aesthetic for master aestheticians.',
    previewColor: 'bg-rose-200',
    tags: ['Glow', 'Studio', 'Master']
  },
  {
    id: 'beauty_velvet',
    name: 'Velvet Skin',
    category: 'Beauty',
    description: 'Deep rose dark mode aesthetic for dermal specialists.',
    previewColor: 'bg-rose-500',
    tags: ['Velvet', 'Skin', 'Premium']
  },
  {
    id: 'beauty_aura',
    name: 'Pure Aura',
    category: 'Beauty',
    description: 'Serene holistic aesthetic for stylized brand owners.',
    previewColor: 'bg-stone-100',
    tags: ['Aura', 'Pure', 'Stylist']
  },
  {
    id: 'beauty_nova',
    name: 'Nova Beauty',
    category: 'Beauty',
    description: 'High-contrast structural brand lead design.',
    previewColor: 'bg-slate-900',
    tags: ['Nova', 'Global', 'Lead']
  },

  // --- CREATOR ---
  {
    id: 'digital_creator',
    name: 'Pixel Nomad',
    category: 'Creator',
    description: 'Dynamic cyberpunk glitch aesthetic for influencers and creators.',
    previewColor: 'bg-blue-600',
    tags: ['Twitch', 'Video', 'Live']
  },
  {
    id: 'creator_stream',
    name: 'Stream Template',
    category: 'Creator',
    description: 'Twitch-inspired purple aesthetic for live streamers.',
    previewColor: 'bg-indigo-600',
    tags: ['Stream', 'Live', 'Broadcast']
  },
  {
    id: 'creator_voxel',
    name: 'Voxel Artist',
    category: 'Creator',
    description: 'Neubrutalist isometric design for 3D digital creators.',
    previewColor: 'bg-[#ff3d00]',
    tags: ['Voxel', '3D', 'Artist']
  },
  {
    id: 'creator_neon',
    name: 'Neon Influence',
    category: 'Creator',
    description: 'Sleek multi-color neon aesthetic for global icons.',
    previewColor: 'bg-black',
    tags: ['Neon', 'Icon', 'Influencer']
  },
  {
    id: 'creator_matrix',
    name: 'Creator Matrix',
    category: 'Creator',
    description: 'Cyber-matrix aesthetic for tech-focused creators.',
    previewColor: 'bg-zinc-900',
    tags: ['Matrix', 'Hub', 'System']
  },

  // --- SERVICE ---
  {
    id: 'service_list',
    name: 'Service Portfolio',
    category: 'Service',
    description: 'Minimal card focus on services and direct contact.',
    previewColor: 'bg-slate-900',
    tags: ['Portfolio', 'Services', 'List']
  },
  {
    id: 'service_task',
    name: 'Task Grid',
    category: 'Service',
    description: 'Checklist focused design for professional service leads.',
    previewColor: 'bg-slate-900',
    tags: ['Task', 'Service', 'Grid']
  },
  {
    id: 'service_expert',
    name: 'Expert Template',
    category: 'Service',
    description: 'Verified partner aesthetic with premium amber contrast.',
    previewColor: 'bg-amber-500',
    tags: ['Expert', 'Verified', 'Partner']
  },
  {
    id: 'service_flow',
    name: 'Skill Flow',
    category: 'Service',
    description: 'Fluid minimalist design for creative solutionists.',
    previewColor: 'bg-indigo-400',
    tags: ['Skill', 'Flow', 'Creative']
  },
  {
    id: 'service_prime',
    name: 'Prime Service',
    category: 'Service',
    description: 'High-impact structural design for global service leads.',
    previewColor: 'bg-slate-900',
    tags: ['Prime', 'Global', 'Lead']
  }
];

export const getTemplateById = (id) => TEMPLATES.find(t => t.id === id);
