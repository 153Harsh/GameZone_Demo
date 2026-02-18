import Navbar from '@/components/sections/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import GameTypes from '@/components/sections/GameTypes';
import PricingTable from '@/components/sections/PricingTable';
import BookingSection from '@/components/sections/BookingSection';
import Gallery from '@/components/sections/Gallery';
import Reviews from '@/components/sections/Reviews';
import LocationInfo from '@/components/sections/LocationInfo';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-neonPurple/30 selection:text-white">
      <Navbar />
      <div className="relative z-0">
        <HeroSection />
        <GameTypes />
        <PricingTable />
        <BookingSection />
        <Gallery />
        <Reviews />
        <LocationInfo />
        <Footer />
      </div>
    </main>
  );
}
