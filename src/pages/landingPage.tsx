import HeroSection from '../components/HeroSection';
import CardsSection from '../components/mainPage';


const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
    <main className="flex-grow">
      <HeroSection />
      <CardsSection />
    </main>
  </div>
  );
};

export default LandingPage;