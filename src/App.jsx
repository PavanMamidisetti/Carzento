import { useState } from 'react';
import { ThemeProvider } from './ThemeContext';
import TopNav from './components/TopNav';
import HeroBanner from './components/HeroBanner';
import PopularCars from './components/PopularCars';
import MostUsedCars from './components/MostUsedCars';
import CarSpecsModal from './components/CarSpecsModal';
import NewLaunchesAIModal from './components/NewLaunchesAIModal';
import AIChatbotModal from './components/AIChatbotModal';
import FindDealersModal from './components/FindDealersModal';
import UpcomingCarsModal from './components/UpcomingCarsModal';
import ElectricCarsModal from './components/ElectricCarsModal';
import CarImagesGalleryModal from './components/CarImagesGalleryModal';
import PopularBrandsModal from './components/PopularBrandsModal';
import IntroSplashScreen from './components/IntroSplashScreen';
import AutomotiveResourcesSection from './components/AutomotiveResourcesSection';
import FooterSection from './components/FooterSection';

/**
 * App — Root layout for the CarWale-style interface.
 */
export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [selectedCarForSpecs, setSelectedCarForSpecs] = useState(null);
  const [isNewLaunchesOpen, setIsNewLaunchesOpen] = useState(false);
  const [isAIChatbotOpen, setIsAIChatbotOpen] = useState(false);
  const [isFindDealersOpen, setIsFindDealersOpen] = useState(false);
  const [isUpcomingCarsOpen, setIsUpcomingCarsOpen] = useState(false);
  const [isElectricCarsOpen, setIsElectricCarsOpen] = useState(false);
  const [isCarImagesOpen, setIsCarImagesOpen] = useState(false);
  const [isPopularBrandsOpen, setIsPopularBrandsOpen] = useState(false);

  return (
    <ThemeProvider>
      {/* ─── 3-Second Glowing Title Intro Splash for Recruiters ─── */}
      {showIntro && <IntroSplashScreen onFinish={() => setShowIntro(false)} />}

      <div
        className="min-h-screen transition-colors duration-300"
        style={{ background: 'var(--color-base)' }}
      >
        <TopNav
          onSelectCar={setSelectedCarForSpecs}
          onOpenNewLaunches={() => setIsNewLaunchesOpen(true)}
          onOpenAIChatbot={() => setIsAIChatbotOpen(true)}
          onOpenFindDealers={() => setIsFindDealersOpen(true)}
          onOpenUpcomingCars={() => setIsUpcomingCarsOpen(true)}
          onOpenElectricCars={() => setIsElectricCarsOpen(true)}
          onOpenCarImages={() => setIsCarImagesOpen(true)}
          onOpenPopularBrands={() => setIsPopularBrandsOpen(true)}
        />
        <HeroBanner />
        <PopularCars onSelectCar={setSelectedCarForSpecs} />

        {/* ─── Clear Gap & Section Divider Above Most Used Cars ─── */}
        <div
          className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8"
          style={{ paddingTop: '50px', paddingBottom: '50px' }}
        >
          <div
            style={{
              height: '1.5px',
              width: '100%',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(30, 165, 153, 0.35) 20%, rgba(255, 255, 255, 0.25) 50%, rgba(30, 165, 153, 0.35) 80%, transparent 100%)',
            }}
          />
        </div>

        <MostUsedCars onSelectCar={setSelectedCarForSpecs} />

        {/* ─── Glowing Divider Below Most Used Cars ─── */}
        <div
          className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8"
          style={{ paddingTop: '50px', paddingBottom: '30px' }}
        >
          <div
            style={{
              height: '1.5px',
              width: '100%',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(30, 165, 153, 0.45) 20%, rgba(45, 212, 191, 0.6) 50%, rgba(30, 165, 153, 0.45) 80%, transparent 100%)',
              boxShadow: '0 0 15px rgba(30, 165, 153, 0.35)',
            }}
          />
        </div>

        {/* ─── Automotive Resources & Financial Suite ─── */}
        <div id="resources">
          <AutomotiveResourcesSection
            onOpenAIChatbot={() => setIsAIChatbotOpen(true)}
            onOpenFindDealers={() => setIsFindDealersOpen(true)}
          />
        </div>

        {/* ─── Executive Portal Footer ─── */}
        <FooterSection
          onOpenAIChatbot={() => setIsAIChatbotOpen(true)}
          onOpenNewLaunches={() => setIsNewLaunchesOpen(true)}
          onOpenFindDealers={() => setIsFindDealersOpen(true)}
          onOpenUpcomingCars={() => setIsUpcomingCarsOpen(true)}
          onOpenElectricCars={() => setIsElectricCarsOpen(true)}
          onOpenPopularBrands={() => setIsPopularBrandsOpen(true)}
        />

        {/* ─── Image-Free Technical Specifications & Variants Modal ─── */}
        {selectedCarForSpecs && (
          <CarSpecsModal
            car={selectedCarForSpecs}
            onClose={() => setSelectedCarForSpecs(null)}
          />
        )}

        {/* ─── AI-Powered New Launches Modal ─── */}
        <NewLaunchesAIModal
          isOpen={isNewLaunchesOpen}
          onClose={() => setIsNewLaunchesOpen(false)}
          onSelectCar={(car) => {
            setIsNewLaunchesOpen(false);
            setSelectedCarForSpecs(car);
          }}
        />

        {/* ─── AI Car Assistant & Search Chatbot Modal ─── */}
        <AIChatbotModal
          isOpen={isAIChatbotOpen}
          onClose={() => setIsAIChatbotOpen(false)}
          onSelectCar={(car) => {
            setIsAIChatbotOpen(false);
            setSelectedCarForSpecs(car);
          }}
        />

        {/* ─── Find Authorized Dealerships Modal ─── */}
        <FindDealersModal
          isOpen={isFindDealersOpen}
          onClose={() => setIsFindDealersOpen(false)}
        />

        {/* ─── Upcoming Cars 2024-2025 Modal ─── */}
        <UpcomingCarsModal
          isOpen={isUpcomingCarsOpen}
          onClose={() => setIsUpcomingCarsOpen(false)}
        />

        {/* ─── Electric Cars (EV) Explorer Modal ─── */}
        <ElectricCarsModal
          isOpen={isElectricCarsOpen}
          onClose={() => setIsElectricCarsOpen(false)}
          onSelectCar={(car) => {
            setIsElectricCarsOpen(false);
            setSelectedCarForSpecs(car);
          }}
        />

        {/* ─── HD Car Images & Studio Gallery Modal ─── */}
        <CarImagesGalleryModal
          isOpen={isCarImagesOpen}
          onClose={() => setIsCarImagesOpen(false)}
        />

        {/* ─── Popular Automotive Brands Hub Modal ─── */}
        <PopularBrandsModal
          isOpen={isPopularBrandsOpen}
          onClose={() => setIsPopularBrandsOpen(false)}
          onSelectCar={(car) => {
            setIsPopularBrandsOpen(false);
            setSelectedCarForSpecs(car);
          }}
        />
      </div>
    </ThemeProvider>
  );
}
