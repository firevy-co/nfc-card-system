/**
 * TEMPLATE REGISTRY - FIREVY IDENTITY NETWORK
 * Central source of truth for all business-specific identity templates.
 */

export const TEMPLATES = [
  {
    id: 'jewelry_luxury',
    name: 'Royal Jewelry',
    category: 'Luxury',
    description: 'Gold-accented elegant design for premium jewelry boutiques.',
    previewColor: 'bg-amber-600',
    tags: ['Elegance', 'Luxury', 'Boutique']
  },
  {
    id: 'it_tech',
    name: 'IT Matrix',
    category: 'Technology',
    description: 'Dynamic tech-focused layout with structural neon accents.',
    previewColor: 'bg-cyan-500',
    tags: ['Tech', 'Dev', 'Cyber']
  },
  {
    id: 'creative_agency',
    name: 'Bold Agency',
    category: 'Agency',
    description: 'Vibrant, high-contrast design for creative studios.',
    previewColor: 'bg-rose-500',
    tags: ['Creative', 'Studio', 'Modern']
  },
  {
    id: 'doctor_health',
    name: 'Medical Trust',
    category: 'Healthcare',
    description: 'Clean, trust-inspiring layout for healthcare professionals.',
    previewColor: 'bg-blue-600',
    tags: ['Medical', 'Trust', 'Health']
  },
  {
    id: 'car_showroom',
    name: 'Velocity Auto',
    category: 'Automotive',
    description: 'Sleek, dark carbon-fiber design for luxury showrooms.',
    previewColor: 'bg-zinc-800',
    tags: ['Auto', 'Premium', 'Speed']
  },
  {
    id: 'real_estate',
    name: 'Modern Realty',
    category: 'Real Estate',
    description: 'Bright, trust-based layout for high-end property agents.',
    previewColor: 'bg-emerald-600',
    tags: ['Property', 'Agent', 'Homes']
  },
  {
    id: 'legal_consultant',
    name: 'Legal Partners',
    category: 'Legal',
    description: 'Sophisticated traditional design for law firms and counsel.',
    previewColor: 'bg-slate-700',
    tags: ['Lawyer', 'Counsel', 'Legal']
  },
  {
    id: 'hospitality_bistro',
    name: 'Bistro Gourmet',
    category: 'Hospitality',
    description: 'Elegant French-chic aesthetic for premium restaurants.',
    previewColor: 'bg-stone-200',
    tags: ['Dining', 'Bistro', 'Chef']
  },
  {
    id: 'fitness_coach',
    name: 'Elite Trainer',
    category: 'Fitness',
    description: 'High-energy neon-industrial design for personal trainers.',
    previewColor: 'bg-lime-500',
    tags: ['Gym', 'Fitness', 'Coach']
  },
  {
    id: 'construction_pro',
    name: 'Ironwood Build',
    category: 'Construction',
    description: 'Rugged industrial design for architects and general contractors.',
    previewColor: 'bg-zinc-900',
    tags: ['Building', 'Site', 'Architect']
  },
  {
    id: 'beauty_stylist',
    name: 'Boutique Salon',
    category: 'Beauty',
    description: 'Elegant soft palette for makeup artists and luxury salons.',
    previewColor: 'bg-rose-400',
    tags: ['Makeup', 'Salon', 'Style']
  },
  {
    id: 'digital_creator',
    name: 'Pixel Nomad',
    category: 'Creator',
    description: 'Dynamic cyberpunk glitch aesthetic for influencers and creators.',
    previewColor: 'bg-blue-600',
    tags: ['Twitch', 'Video', 'Live']
  }
];

export const getTemplateById = (id) => TEMPLATES.find(t => t.id === id);
