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
          <div className="min-h-[400px] flex items-center justify-center text-muted-foreground p-10 text-center">
            <div className="max-w-md space-y-6">
              <div className="w-16 h-16 bg-muted/30 border border-border rounded-full mx-auto flex items-center justify-center mb-6">
                <span className="text-xl font-black">?</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Protocol Error: Unrecognized Template Identifier</p>
              <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Template Design Not Found</h2>
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
