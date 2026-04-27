import React, { lazy, Suspense } from 'react';

/**
 * TEMPLATE RENDERER
 * Dynamically loads and renders a template based on the provided ID.
 * Organized by business categories.
 */

// --- BUSINESS ---
const ClassicExecutive = lazy(() => import('./business/ClassicExecutive'));
const ClassicRefined = lazy(() => import('./business/ClassicRefined'));
const ExecutiveMinimal = lazy(() => import('./business/ExecutiveMinimal'));
const CorporateGlass = lazy(() => import('./business/CorporateGlass'));
const BoldEntrepreneur = lazy(() => import('./business/BoldEntrepreneur'));
const ModernLeader = lazy(() => import('./business/ModernLeader'));

// --- LUXURY ---
const JewelryLuxury = lazy(() => import('./jewelry/JewelryLuxury'));
const DiamondElite = lazy(() => import('./jewelry/DiamondElite'));
const VelvetBoutique = lazy(() => import('./jewelry/VelvetBoutique'));
const GoldenGrace = lazy(() => import('./jewelry/GoldenGrace'));
const OpalMinimal = lazy(() => import('./jewelry/OpalMinimal'));

// --- TECHNOLOGY ---
const ITSolutions = lazy(() => import('./it/ITSolutions'));
const QuantumCode = lazy(() => import('./it/QuantumCode'));
const SiliconStream = lazy(() => import('./it/SiliconStream'));
const CloudNexus = lazy(() => import('./it/CloudNexus'));
const DataMatrix = lazy(() => import('./it/DataMatrix'));

// --- AGENCY ---
const CreativeAgency = lazy(() => import('./agency/CreativeAgency'));
const VividStudio = lazy(() => import('./agency/VividStudio'));
const NeoAgency = lazy(() => import('./agency/NeoAgency'));
const PrismCreative = lazy(() => import('./agency/PrismCreative'));
const AbstractMedia = lazy(() => import('./agency/AbstractMedia'));

// --- HEALTHCARE ---
const DoctorPractice = lazy(() => import('./doctor/DoctorPractice'));
const TrustMedical = lazy(() => import('./healthcare/TrustMedical'));
const PureHealth = lazy(() => import('./healthcare/PureHealth'));
const ClinicaElite = lazy(() => import('./healthcare/ClinicaElite'));
const WellnessWay = lazy(() => import('./healthcare/WellnessWay'));

// --- AUTOMOTIVE ---
const CarShowroom = lazy(() => import('./automotive/CarShowroom'));
const CarbonDrive = lazy(() => import('./automotive/CarbonDrive'));
const VelocityElite = lazy(() => import('./automotive/VelocityElite'));
const AeroMotors = lazy(() => import('./automotive/AeroMotors'));
const PinnacleAuto = lazy(() => import('./automotive/PinnacleAuto'));

// --- REAL ESTATE ---
const ModernRealty = lazy(() => import('./real-estate/ModernRealty'));
const GrandEstate = lazy(() => import('./real-estate/GrandEstate'));
const UrbanDwell = lazy(() => import('./real-estate/UrbanDwell'));
const PixelProperty = lazy(() => import('./real-estate/PixelProperty'));
const HorizonLiving = lazy(() => import('./real-estate/HorizonLiving'));

// --- LEGAL ---
const LegalConsultant = lazy(() => import('./legal/LegalConsultant'));
const JusticePartners = lazy(() => import('./legal/JusticePartners'));
const EliteCounsel = lazy(() => import('./legal/EliteCounsel'));
const SovereignLaw = lazy(() => import('./legal/SovereignLaw'));
const LegaNode = lazy(() => import('./legal/LegaNode'));

// --- HOSPITALITY ---
const GourmetRestaurant = lazy(() => import('./hospitality/GourmetRestaurant'));
const UrbanBistro = lazy(() => import('./hospitality/UrbanBistro'));
const LuxeHotel = lazy(() => import('./hospitality/LuxeHotel'));
const ZenCafe = lazy(() => import('./hospitality/ZenCafe'));
const NightConnect = lazy(() => import('./hospitality/NightConnect'));

// --- FITNESS ---
const EliteTrainer = lazy(() => import('./fitness/EliteTrainer'));
const PulseWorkout = lazy(() => import('./fitness/PulseWorkout'));
const IronForge = lazy(() => import('./fitness/IronForge'));
const ZenYoga = lazy(() => import('./fitness/ZenYoga'));
const ApexSport = lazy(() => import('./fitness/ApexSport'));

// --- CONSTRUCTION ---
const ArchConstruction = lazy(() => import('./construction/ArchConstruction'));
const RigidBuild = lazy(() => import('./construction/RigidBuild'));
const SteelFrame = lazy(() => import('./construction/SteelFrame'));
const ConcreteCore = lazy(() => import('./construction/ConcreteCore'));
const VectorStructure = lazy(() => import('./construction/VectorStructure'));

// --- BEAUTY ---
const BoutiqueStylist = lazy(() => import('./beauty/BoutiqueStylist'));
const GlowStudio = lazy(() => import('./beauty/GlowStudio'));
const VelvetSkin = lazy(() => import('./beauty/VelvetSkin'));
const PureAura = lazy(() => import('./beauty/PureAura'));
const NovaBeauty = lazy(() => import('./beauty/NovaBeauty'));

// --- CREATOR ---
const DigitalCreator = lazy(() => import('./creator/DigitalCreator'));
const StreamNode = lazy(() => import('./creator/StreamNode'));
const VoxelArtist = lazy(() => import('./creator/VoxelArtist'));
const NeonInfluence = lazy(() => import('./creator/NeonInfluence'));
const CreatorMatrix = lazy(() => import('./creator/CreatorMatrix'));

// --- SERVICE ---
const ServicePortfolio = lazy(() => import('./service/ServicePortfolio'));
const TaskGrid = lazy(() => import('./service/TaskGrid'));
const ExpertNode = lazy(() => import('./service/ExpertNode'));
const SkillFlow = lazy(() => import('./service/SkillFlow'));
const PrimeService = lazy(() => import('./service/PrimeService'));

import defaultLogo from '../assets/logo (2).png';

const TemplateRenderer = ({ templateId, userData: rawUserData }) => {
  
  // NORMALIZE USER DATA - Bridging discrepancies between Form fields and Template expectations
  const userData = rawUserData ? {
    ...rawUserData,
    // Contact Mapping
    phone: rawUserData.phone || rawUserData.mobileNumber || "",
    email: rawUserData.email || rawUserData.omailAddress || "",
    
    // Identity & Role Mapping
    displayName: rawUserData.displayName || "Unauthorized Entity",
    role: rawUserData.role || rawUserData.businessName || "Authorized Member",
    
    // Location Synthesis (Building 'address' from City, State, Country nodes)
    address: rawUserData.address || [
      rawUserData.city,
      rawUserData.state,
      rawUserData.country
    ].filter(Boolean).join(', ') || "Global Satellite Node",
    
    // Website & Bio
    website: rawUserData.website || "",
    bio: rawUserData.bio || rawUserData.description || "",
    
    // Social Integrity
    linkedin: rawUserData.linkedin || "",
    instagram: rawUserData.instagram || "",
    facebook: rawUserData.facebook || "",
    twitter: rawUserData.twitter || "",
    youtube: rawUserData.youtube || "",
    github: rawUserData.github || "",
    
    // Theme & Branding
    themeColor: rawUserData.themeColor || "#0f172a",
    logo: rawUserData.logo || rawUserData.profileImage || defaultLogo,
    profileImage: rawUserData.profileImage || rawUserData.logo || defaultLogo
  } : {};

  const renderTemplate = () => {
    // RESOLUTION LAYER: Handle dynamic node IDs by checking for underlying blueprint references
    let activeId = (templateId?.startsWith('node_') || !templateId) 
      ? (userData.templateId || 'cardyn_classic') 
      : templateId;

    // FAIL-SAFE: If activeId is still a dynamic node ID (resolution failed), default to a reliable blueprint
    if (activeId?.startsWith('node_')) {
      activeId = 'cardyn_classic';
    }

    switch (activeId) {
      // --- BUSINESS ---
      case 'cardyn_classic': return <ClassicRefined userData={userData} />;
      case 'business_basic': return <ClassicExecutive userData={userData} />;
      case 'business_minimal': return <ExecutiveMinimal userData={userData} />;
      case 'business_glass': return <CorporateGlass userData={userData} />;
      case 'business_bold': return <BoldEntrepreneur userData={userData} />;
      case 'business_leader': return <ModernLeader userData={userData} />;

      // --- LUXURY ---
      case 'jewelry_luxury': return <JewelryLuxury userData={userData} />;
      case 'jewelry_diamond': return <DiamondElite userData={userData} />;
      case 'jewelry_velvet': return <VelvetBoutique userData={userData} />;
      case 'jewelry_grace': return <GoldenGrace userData={userData} />;
      case 'jewelry_opal': return <OpalMinimal userData={userData} />;

      // --- TECHNOLOGY ---
      case 'it_tech': return <ITSolutions userData={userData} />;
      case 'it_quantum': return <QuantumCode userData={userData} />;
      case 'it_silicon': return <SiliconStream userData={userData} />;
      case 'it_cloud': return <CloudNexus userData={userData} />;
      case 'it_data': return <DataMatrix userData={userData} />;

      // --- AGENCY ---
      case 'creative_agency': return <CreativeAgency userData={userData} />;
      case 'agency_vivid': return <VividStudio userData={userData} />;
      case 'agency_neo': return <NeoAgency userData={userData} />;
      case 'agency_prism': return <PrismCreative userData={userData} />;
      case 'agency_abstract': return <AbstractMedia userData={userData} />;

      // --- HEALTHCARE ---
      case 'doctor_health': return <DoctorPractice userData={userData} />;
      case 'health_trust': return <TrustMedical userData={userData} />;
      case 'health_pure': return <PureHealth userData={userData} />;
      case 'health_elite': return <ClinicaElite userData={userData} />;
      case 'health_way': return <WellnessWay userData={userData} />;

      // --- AUTOMOTIVE ---
      case 'car_showroom': return <CarShowroom userData={userData} />;
      case 'auto_carbon': return <CarbonDrive userData={userData} />;
      case 'auto_velocity': return <VelocityElite userData={userData} />;
      case 'auto_aero': return <AeroMotors userData={userData} />;
      case 'auto_pinnacle': return <PinnacleAuto userData={userData} />;

      // --- REAL ESTATE ---
      case 'real_estate': return <ModernRealty userData={userData} />;
      case 'realty_grand': return <GrandEstate userData={userData} />;
      case 'realty_urban': return <UrbanDwell userData={userData} />;
      case 'realty_pixel': return <PixelProperty userData={userData} />;
      case 'realty_horizon': return <HorizonLiving userData={userData} />;

      // --- LEGAL ---
      case 'legal_consultant': return <LegalConsultant userData={userData} />;
      case 'legal_justice': return <JusticePartners userData={userData} />;
      case 'legal_elite': return <EliteCounsel userData={userData} />;
      case 'legal_sovereign': return <SovereignLaw userData={userData} />;
      case 'legal_node': return <LegaNode userData={userData} />;

      // --- HOSPITALITY ---
      case 'hospitality_bistro': return <GourmetRestaurant userData={userData} />;
      case 'hospitality_urban': return <UrbanBistro userData={userData} />;
      case 'hospitality_luxe': return <LuxeHotel userData={userData} />;
      case 'hospitality_zen': return <ZenCafe userData={userData} />;
      case 'hospitality_night': return <NightConnect userData={userData} />;

      // --- FITNESS ---
      case 'fitness_coach': return <EliteTrainer userData={userData} />;
      case 'fitness_pulse': return <PulseWorkout userData={userData} />;
      case 'fitness_iron': return <IronForge userData={userData} />;
      case 'fitness_zen': return <ZenYoga userData={userData} />;
      case 'fitness_apex': return <ApexSport userData={userData} />;

      // --- CONSTRUCTION ---
      case 'construction_pro': return <ArchConstruction userData={userData} />;
      case 'construction_rigid': return <RigidBuild userData={userData} />;
      case 'construction_steel': return <SteelFrame userData={userData} />;
      case 'construction_concrete': return <ConcreteCore userData={userData} />;
      case 'construction_vector': return <VectorStructure userData={userData} />;

      // --- BEAUTY ---
      case 'beauty_stylist': return <BoutiqueStylist userData={userData} />;
      case 'beauty_glow': return <GlowStudio userData={userData} />;
      case 'beauty_velvet': return <VelvetSkin userData={userData} />;
      case 'beauty_aura': return <PureAura userData={userData} />;
      case 'beauty_nova': return <NovaBeauty userData={userData} />;

      // --- CREATOR ---
      case 'digital_creator': return <DigitalCreator userData={userData} />;
      case 'creator_stream': return <StreamNode userData={userData} />;
      case 'creator_voxel': return <VoxelArtist userData={userData} />;
      case 'creator_neon': return <NeonInfluence userData={userData} />;
      case 'creator_matrix': return <CreatorMatrix userData={userData} />;

      // --- SERVICE ---
      case 'service_list': return <ServicePortfolio userData={userData} />;
      case 'service_task': return <TaskGrid userData={userData} />;
      case 'service_expert': return <ExpertNode userData={userData} />;
      case 'service_flow': return <SkillFlow userData={userData} />;
      case 'service_prime': return <PrimeService userData={userData} />;

      default:
        return (
          <div className="min-h-[400px] flex items-center justify-center bg-gray-50 p-10 text-center">
            <div className="max-w-xs space-y-4">
              <div className="w-14 h-14 bg-gray-100 border border-gray-200 rounded-2xl mx-auto flex items-center justify-center">
                <span className="text-sm font-black text-slate-300">No Design</span>
              </div>
              <h2 className="text-base font-bold text-gray-800">No Preview Available</h2>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">
                The design blueprint <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">"{templateId}"</span> is not yet linked to a visual template.
              </p>
              <p className="text-[10px] text-gray-300 capitalize tracking-widest font-bold">
                Select a valid Architecture Blueprint in the template settings.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <Suspense fallback={
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    }>
      {renderTemplate()}
    </Suspense>
  );
};

export default TemplateRenderer;
