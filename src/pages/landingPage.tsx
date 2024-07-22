import HeroSection from '../components/HeroSection';
import CardsSection from '../components/main';
import CarSamplesComponent from '../components/carSamples';

const LandingPage = () => {
  return (
    <div className="flex flex-col bg-gray-900 min-h-screen">
    <main className="flex-grow">
      <HeroSection />
      <CarSamplesComponent />
      <CardsSection />
    </main>
  </div>
  );
};

export default LandingPage;