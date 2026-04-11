import React, { lazy, Suspense } from 'react';

/**
 * TEMPLATE RENDERER
 * Dynamically loads and renders a template based on the provided ID.
 * Organized by business categories.
 */

// Business Category
const ClassicExecutive = lazy(() => import('./business/ClassicExecutive'));

// Service Category
const ServicePortfolio = lazy(() => import('./service/ServicePortfolio'));

// Luxury/Jewelry Category
const JewelryLuxury = lazy(() => import('./jewelry/JewelryLuxury'));

// Technology Category
const ITSolutions = lazy(() => import('./it/ITSolutions'));

// Agency Category
const CreativeAgency = lazy(() => import('./agency/CreativeAgency'));

// Healthcare Category
const DoctorPractice = lazy(() => import('./doctor/DoctorPractice'));

// Automotive Category
const CarShowroom = lazy(() => import('./automotive/CarShowroom'));

// Real Estate Category
const ModernRealty = lazy(() => import('./real-estate/ModernRealty'));

// Legal Category
const LegalConsultant = lazy(() => import('./legal/LegalConsultant'));

// Hospitality Category
const GourmetRestaurant = lazy(() => import('./hospitality/GourmetRestaurant'));

// Fitness Category
const EliteTrainer = lazy(() => import('./fitness/EliteTrainer'));

// Construction Category
const ArchConstruction = lazy(() => import('./construction/ArchConstruction'));

// Beauty Category
const BoutiqueStylist = lazy(() => import('./beauty/BoutiqueStylist'));

// Creator Category
const DigitalCreator = lazy(() => import('./creator/DigitalCreator'));

const TemplateRenderer = ({ templateId, userData }) => {
  
  const renderTemplate = () => {
    switch (templateId) {
      case 'business_basic':
        return <ClassicExecutive userData={userData} />;
      case 'service_list':
        return <ServicePortfolio userData={userData} />;
      case 'jewelry_luxury':
        return <JewelryLuxury userData={userData} />;
      case 'it_tech':
        return <ITSolutions userData={userData} />;
      case 'creative_agency':
        return <CreativeAgency userData={userData} />;
      case 'doctor_health':
        return <DoctorPractice userData={userData} />;
      case 'car_showroom':
        return <CarShowroom userData={userData} />;
      case 'real_estate':
        return <ModernRealty userData={userData} />;
      case 'legal_consultant':
        return <LegalConsultant userData={userData} />;
      case 'hospitality_bistro':
        return <GourmetRestaurant userData={userData} />;
      case 'fitness_coach':
        return <EliteTrainer userData={userData} />;
      case 'construction_pro':
        return <ArchConstruction userData={userData} />;
      case 'beauty_stylist':
        return <BoutiqueStylist userData={userData} />;
      case 'digital_creator':
        return <DigitalCreator userData={userData} />;
      default:
        return (
          <div className="min-h-[400px] flex items-center justify-center bg-gray-50 p-10 text-center">
            <div className="max-w-xs space-y-4">
              <div className="w-14 h-14 bg-gray-100 border border-gray-200 rounded-2xl mx-auto flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <h2 className="text-base font-bold text-gray-800">No Preview Available</h2>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">
                The design blueprint <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">"{templateId}"</span> is not yet linked to a visual template.
              </p>
              <p className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">
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
